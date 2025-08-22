import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchPhotos } from "./fetchPhotos";
import { Button, Flex, Image, Input, Loader, Text } from "@chakra-ui/react";
import Logo from "./assets/Logo.svg";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useFavorites } from "./zustandStore";
import { useNavigate } from "react-router";
import { Modal } from "./Modal";
import { Masonry } from "./Masonry";
import { ImageCard } from "./ImageCard";
import { DetailView } from "./DetailView";

export function App() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selected, setSelected] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef(1);
  const UNSPLASH_KEY = "txppfk0bKUk0LGIlOjYPwxRUbd0VNJAATQCNkBjFef0";

  const perPage = 24;

  const canFetch = useMemo(() => Boolean(UNSPLASH_KEY), []);

  const sentinelRef = useRef(null);

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  const favorites = useFavorites((s) => s.items);
  const favCount = Object.keys(favorites).length;

  const columns = useColumns();

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const list = await fetchPhotos({ page, perPage, query });

      setPhotos((prev) => [...prev, ...list]);
      setHasMore(list.length === perPage);

      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [page, query, hasMore, isLoading]);

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);

    setPhotos([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);

    fetchPhotos({ page: 1, perPage, query })
      .then((list) => {
        setPhotos(list);
        setHasMore(list.length === perPage);
        setPage(2);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadMore();
        }
      },
      { rootMargin: "800px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <Flex w={"100%"} h={"100%"} direction={"column"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        p={4}
        position={"fixed"}
        zIndex={100}
        w={"100%"}
        shadow={"md"}
        bg="rgba(255, 255, 255, 0.2)"
        backdropFilter="blur(10px)"
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Image w={"45px"} src={Logo} />
          <Text color={"#e60023"} fontWeight={"extrabold"}>
            MarkThink
          </Text>
        </Flex>
        <Flex>
          <Button
            onClick={() => navigate("/")}
            alignItems={"center"}
            fontSize={"12px"}
            justifyContent={"center"}
            borderRadius={"20px"}
            p={4}
            color={"#211932"}
          >
            Explore
          </Button>
        </Flex>
        <Flex w={"60%"}>
          <Input
            color={"#333"}
            justifyContent={"center"}
            borderRadius={"20px"}
            alignItems={"center"}
            fontSize={"12px"}
            ref={inputRef}
            pl={4}
            pr={4}
            pt={2}
            pb={2}
            placeholder="Search for easy dinners, fashion, etc."
            w={"60%"}
            onChange={() => {
              setQuery(inputRef.current!.value.trim().toLowerCase());
            }}
          />
        </Flex>

        <Button onClick={() => alert(`Favorit sayı: ${favCount}`)}>
          Favorites {favCount}
        </Button>
        <Button
          className="hidden sm:inline-flex"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Up↑{" "}
        </Button>
        <Flex alignItems={"center"} gap={2}>
          <MdSunny onClick={() => toggleDarkMode(false)} />/
          <FaMoon onClick={() => toggleDarkMode(true)} />
        </Flex>
      </Flex>
      <Flex
        p={8}
        gap={8}
        justifyContent={"center"}
        w={"100%"}
        direction={"column"}
        mt={"125px"}
      >
        <Flex>
          <Text
            fontWeight={"700"}
            fontSize={"36px"}
            letterSpacing={"-0.5px"}
            lineHeight={"39.6px"}
            textAlign={"left"}
          >
            Explore the best of MarkThink
          </Text>
        </Flex>
        <Modal open={!!selected} onClose={() => setSelected(null)}>
          {selected && (
            <Flex
              position={"fixed"}
              top={"75px"}
              right={"10px"}
              justifyContent={"end"}
              h={"500px"}
              mt={"150px"}
              zIndex={10}
            >
              <DetailView photo={selected} onClose={() => setSelected(null)} />
            </Flex>
          )}
        </Modal>
      </Flex>
      <main
        style={{
          width: "100%",
        }}
      >
        <Flex
          w={"100%"}
          mt={"125px"}
          direction={"column"}
          justifyContent={"center"}
        >
          {!canFetch && (
            <Flex
              mb={4}
              p={4}
              borderRadius={"2xl"}
              border={"1px solid yellow-200"}
            >
              <Text fontSize={"md"}>Can not find UnsTextlash key.</Text>
              <Text fontSize={"sm"}>
                <code className="font-mono">VITE_UNSPLASH_ACCESS_KEY</code> or
                <code className="font-mono">
                  NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
                </code>
                .
              </Text>
            </Flex>
          )}
          <Flex w={"100%"} justifyContent={"center"} p={4} gap={4}>
            <Masonry
              items={photos}
              columnCount={columns}
              gap={16}
              renderItem={(p) => (
                <ImageCard key={p.id} photo={p} onOpen={setSelected} />
              )}
            />
          </Flex>
          <div ref={sentinelRef} style={{ height: "1px", width: "100%" }}></div>
          {isLoading && <Loader />}
          {!hasMore && <Text>Last result</Text>}
        </Flex>
      </main>
    </Flex>
  );
}

function useColumns() {
  const [columns, setColumns] = useState(4);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setColumns(w < 480 ? 2 : w < 768 ? 3 : w < 1024 ? 4 : 5);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return columns;
}

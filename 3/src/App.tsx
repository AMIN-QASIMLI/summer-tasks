import { Flex, Text, Image, Input, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaMoon, FaPlus } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import Logo from "./assets/InstaMin_logo.svg";

export const App = () => {
  const plusRef = useRef<HTMLDivElement>(null);
  const postMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const handlePlusClick = () => {
    if (postMenuRef.current) {
      postMenuRef.current.style.display =
        postMenuRef.current.style.display === "none" ? "flex" : "none";
    }
  };

  const handlePostButtonClick = () => {
    if (fileInputRef.current && descriptionInputRef.current) {
      const file = fileInputRef.current.files?.[0];
      const description = descriptionInputRef.current.value;
      if (!file) {
        alert("Please select a file.");
        return;
      }
      setSharedPosts((prev) => [
        ...prev,
        {
          profile: "https://picsum.photos/40/40?random=1",
          file: URL.createObjectURL(file!),
          description: description || "No description provided",
        },
      ]);
    } else {
      alert("Please select a file and enter a description.");
    }
    fileInputRef.current!.value = "";
    descriptionInputRef.current!.value = "";
  };

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
  }, []);

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  const [sharedPosts, setSharedPosts] = useState<
    { profile: string; file: string; description: string }[]
  >([]);

  const posts: [{ profile: string; url: string }] = [
    {
      profile: "https://picsum.photos/40/40?random=1",
      url: "https://picsum.photos/800/500?random=1",
    },
    {
      profile: "https://picsum.photos/40/40?random=2",
      url: "https://picsum.photos/800/500?random=2",
    },
    {
      profile: "https://picsum.photos/40/40?random=3",
      url: "https://picsum.photos/800/500?random=3",
    },
    {
      profile: "https://picsum.photos/40/40?random=4",
      url: "https://picsum.photos/800/500?random=4",
    },
    {
      profile: "https://picsum.photos/40/40?random=5",
      url: "https://picsum.photos/800/500?random=5",
    },
    {
      profile: "https://picsum.photos/40/40?random=15",
      url: "https://picsum.photos/800/500?random=15",
    },
    {
      profile: "https://picsum.photos/40/40?random=13",
      url: "https://picsum.photos/800/500?random=13",
    },
    {
      profile: "https://picsum.photos/40/40?random=8",
      url: "https://picsum.photos/800/500?random=8",
    },
    {
      profile: "https://picsum.photos/40/40?random=14",
      url: "https://picsum.photos/800/500?random=14",
    },
    {
      profile: "https://picsum.photos/40/40?random=16",
      url: "https://picsum.photos/800/500?random=16",
    },
    {
      profile: "https://picsum.photos/40/40?random=11",
      url: "https://picsum.photos/800/500?random=11",
    },
    {
      profile: "https://picsum.photos/40/40?random=12",
      url: "https://picsum.photos/800/500?random=12",
    },
  ];
  return (
    <Flex>
      <header
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p={4}
          boxShadow="md"
        >
          <Flex
            bg="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
            p={2}
            borderRadius="md"
            gap={2}
          >
            <MdSunny size={24} onClick={() => toggleDarkMode(false)} />/
            <FaMoon size={24} onClick={() => toggleDarkMode(true)} />
          </Flex>
          <Flex
            align={"center"}
            gap={2}
            bg="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
            p={2}
            borderRadius="md"
          >
            <Image src={Logo} alt="Logo" w={"60px"} />
            <Text
              fontWeight={"extrabold"}
              fontSize={"40px"}
              fontFamily={"Playwrite AU QLD"}
            >
              InstaMin
            </Text>
          </Flex>
          <Flex
            bg="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
            p={2}
            borderRadius="md"
            ref={plusRef}
            onClick={handlePlusClick}
          >
            <FaPlus size={24} />
          </Flex>
        </Flex>
        <Flex>
          <Flex
            ref={postMenuRef}
            boxShadow="md"
            borderRadius="md"
            p={8}
            gap={2}
            display="none"
            bg="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
          >
            <Text>Post Menu</Text>
            <Input type="file" ref={fileInputRef}></Input>
            <Input
              placeholder="Write a description..."
              ref={descriptionInputRef}
            ></Input>
            <Button colorScheme="blue" mt={2} onClick={handlePostButtonClick}>
              Post
            </Button>
          </Flex>
        </Flex>
      </header>
      <main style={{ marginTop: "80px", width: "100%" }}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          direction={"column"}
        >
          {sharedPosts.map((post, idx) => (
            <Flex
              key={idx}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              boxShadow="md"
              mb={4}
              p={5}
              wrap={"wrap"}
              borderRadius={"lg"}
              maxW={"900px"}
              gap={4}
            >
              <Flex gap={4} boxShadow="md" borderRadius={"lg"} p={2}>
                <Image
                  src={post.profile}
                  alt="random"
                  borderRadius={"lg"}
                  gap={4}
                  boxShadow="md"
                  clipPath={"circle(50%)"}
                />
                <Text>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </Text>
              </Flex>
              <Image src={post.file} alt="random" />
              <Text>{post.description}</Text>
            </Flex>
          ))}
          {posts.map((post, idx) => (
            <Flex
              key={idx}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              boxShadow="md"
              mb={4}
              p={5}
              wrap={"wrap"}
              borderRadius={"lg"}
              maxW={"900px"}
              gap={4}
            >
              <Flex gap={4} boxShadow="md" borderRadius={"lg"} p={2}>
                <Image
                  src={post.profile}
                  alt="random"
                  borderRadius={"lg"}
                  gap={4}
                  boxShadow="md"
                  clipPath={"circle(50%)"}
                />
                <Text>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </Text>
              </Flex>
              <Image src={post.url} alt="random" />
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                laboriosam earum voluptatibus ea eaque pariatur culpa beatae
                asperiores impedit, veniam dolor in deserunt. Labore nobis ipsam
                blanditiis eligendi nihil! Veniam.
              </Text>
            </Flex>
          ))}
        </Flex>
      </main>
    </Flex>
  );
};

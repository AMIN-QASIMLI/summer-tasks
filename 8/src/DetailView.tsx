import { Button, Flex, Image } from "@chakra-ui/react";
import { useFavorites } from "./zustandStore";

export function DetailView({ photo, onClose }) {
  const toggle = useFavorites((s) => s.toggle);
  const favorites = useFavorites((s) => s.items);
  const isFav = Boolean(favorites[photo.id]);

  return (
    <Flex
      boxShadow={"md"}
      p={4}
      direction={"column"}
      justifyContent={"end"}
      bg="rgba(255, 255, 255, 0.2)"
      backdropFilter="blur(10px)"
      minH={"550px"}
    >
      <Flex maxH={"300px"} maxW={"400px"}>
        <Image
          maxH={"300px"}
          maxW={"400px"}
          src={photo.urls.regular}
          alt={photo.alt_description || "Unsplash Photo"}
        />
      </Flex>
      <Flex p={4} direction={"column"} justifyContent={"center"}>
        <Flex gap={4} justifyContent={"center"}>
          {photo.user?.profile_image?.small ? (
            <img
              src={photo.user.profile_image.small}
              className="w-10 h-10 rounded-full"
            />
          ) : null}
          <Flex>
            <Flex fontSize={"2xl"} direction={"column"}>
              {photo.user?.name}
            </Flex>
            <a
              className="text-sm text-blue-600 hover:underline"
              href={`https://unsplash.com/@${photo.user?.username}`}
              target="_blank"
              rel="noreferrer"
            >
              @{photo.user?.username}
            </a>
          </Flex>
          <Flex direction={"column"} alignItems={"center"} gap={4}>
            <Button onClick={() => toggle(photo)}>
              {isFav ? "Saved" : "Save"}
            </Button>
            <Button onClick={onClose}>Bağla</Button>
          </Flex>
        </Flex>
        <Flex direction={"column"}>
          <Flex blur={"md"}>
            {photo.alt_description || "No Description found!"}
          </Flex>
          <Flex className="text-xs opacity-60">
            Size: {photo.width} × {photo.height}
          </Flex>
          <a
            className="inline-block text-sm text-blue-600 hover:underline"
            href={photo.links.html}
            target="_blank"
            rel="noreferrer"
          >
            Unsplash-da bax
          </a>
        </Flex>
      </Flex>
    </Flex>
  );
}

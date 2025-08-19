import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";

export const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleLikeButtonClicked = () => {
    setLiked(!liked);
  };

  return (
    <Flex
      color={liked ? "#c4223aff" : "inherit"}
      cursor="pointer"
      onClick={handleLikeButtonClicked}
    >
      {liked ? <BiSolidLike size={32} /> : <AiOutlineLike size={32} />}
    </Flex>
  );
};

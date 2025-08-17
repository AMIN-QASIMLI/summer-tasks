import { Flex, Input, Button, Image, Text, Loader } from "@chakra-ui/react";
import axios from "axios";
import { MdSunny } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { FaMoon, FaPlus, FaShoppingCart } from "react-icons/fa";
import Logo from "./assets/logo.svg";
import { useNavigate } from "react-router";
import { useRef, useEffect, useState } from "react";
import { useGetInCartsQuery, useRemoveFromCartMutation } from "./api";

export const InCart = () => {
  const { data, isFetching } = useGetInCartsQuery();
  const [deleteProduct] = useRemoveFromCartMutation();
  const sellMenuRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchElement, setSearchElement] = useState("");
  const navigate = useNavigate();
  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };
  const handleSellMenuOpener = () => {
    if (sellMenuRef.current!.style.display === "none") {
      sellMenuRef.current!.style.display = "block";
    } else {
      sellMenuRef.current!.style.display = "none";
    }
  };

  const handleDeleteButton = async (id: number) => {
    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      console.error("Error while delete:", err);
    }
  };

  const handleSellButtonClicked = async () => {
    if (
      imgInputRef.current &&
      descriptionInputRef.current &&
      titleInputRef.current &&
      priceInputRef.current
    ) {
      const file = imgInputRef.current.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("title", titleInputRef.current.value);
        formData.append("price", priceInputRef.current.value);
        formData.append("description", descriptionInputRef.current.value);
        formData.append("image", file);
        formData.append("isDeletable", "true");

        try {
          await axios.post("http://localhost:3001/products", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } catch (err) {
          console.error("Add product error:", err);
        }
      }
    }
  };

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
  }, []);
  return (
    <Flex>
      <header style={{ width: "100%", position: "fixed", zIndex: "1000" }}>
        <Flex
          p={4}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
          boxShadow={"md"}
        >
          <Flex gap={2} alignItems={"center"}>
            <Flex
              clipPath={"circle(50% at 50% 50%)"}
              backgroundColor={"#1E90FF"}
              p={2}
              onClick={() => navigate(-1)}
            >
              <MdOutlineArrowBackIosNew />
            </Flex>
            <MdSunny size={24} onClick={() => toggleDarkMode(false)} />/
            <FaMoon size={24} onClick={() => toggleDarkMode(true)} />
          </Flex>
          <Flex>
            <Image onClick={() => navigate("/")} src={Logo} width={"150px"} />
          </Flex>
          <Flex
            gap={1}
            alignItems={"center"}
            onChange={() => setSearchElement(searchInputRef.current!.value)}
          >
            <Input placeholder="Search in site..." ref={searchInputRef}></Input>
          </Flex>
          <Flex gap={4}>
            <Flex onClick={handleSellMenuOpener}>
              <FaPlus />
            </Flex>
            <Flex onClick={() => navigate("/inCart")}>
              <FaShoppingCart />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          p={4}
          gap={4}
          flexDirection={"column"}
          ref={sellMenuRef}
          display={"none"}
        >
          <Flex gap={2} flexDirection={"column"}>
            <Text>Tittle :</Text>
            <Input
              placeholder="Please write a tittle..."
              ref={titleInputRef}
            ></Input>
          </Flex>
          <Flex gap={2} flexDirection={"column"}>
            <Text>Add a image :</Text>
            <Input type="file" p={2} ref={imgInputRef}></Input>
          </Flex>
          <Flex gap={2} flexDirection={"column"}>
            <Text>Add a Price :</Text>
            <Input
              p={2}
              ref={priceInputRef}
              placeholder="Please add a price..."
              type="number"
            ></Input>
          </Flex>
          <Flex gap={2} flexDirection={"column"}>
            <Text>Please write a description :</Text>
            <Input
              placeholder="Please write a description..."
              ref={descriptionInputRef}
            ></Input>
          </Flex>
          <Flex p={2}>
            <Button onClick={handleSellButtonClicked}>Sell!</Button>
          </Flex>
        </Flex>
      </header>
      <main style={{ width: "100%", height: "100%" }}>
        <Flex
          wrap={"wrap"}
          width={"100%"}
          height={"100%"}
          p={4}
          gap={4}
          mt={"100px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {isFetching ? (
            <Loader />
          ) : searchElement !== "" ? (
            data
              ?.filter((product) =>
                product.title
                  .toLowerCase()
                  .replace(" ", "")
                  .includes(searchElement)
              )
              .map((inCart) => (
                <Flex
                  direction={"column"}
                  p={4}
                  gap={4}
                  backgroundColor={"#cccbcb"}
                  borderRadius={"md"}
                  key={inCart.id}
                  minW={"300px"}
                  maxW={"600px"}
                  minH={"550px"}
                  transitionDuration={"700ms"}
                  onClick={() => navigate(`/product/${inCart.id}`)}
                  _hover={{
                    padding: 12,
                  }}
                >
                  <Flex>
                    <Text fontSize={"32px"}>{inCart.title}</Text>
                  </Flex>
                  <Flex alignItems={"center"} justifyContent={"center"}>
                    <Image src={inCart.image} />
                  </Flex>
                  <Flex direction={"column"} p={4} gap={4}>
                    <Text fontSize={"24px"}>{inCart.price}₼</Text>
                    <Text>{inCart.description}</Text>
                  </Flex>

                  <Button onClick={() => handleDeleteButton(inCart.id)}>
                    Delet it!
                  </Button>
                </Flex>
              ))
          ) : (
            data
              ?.filter((product) =>
                product.title
                  .toLowerCase()
                  .replace(" ", "")
                  .includes(searchElement)
              )
              .map((inCart) => (
                <Flex
                  direction={"column"}
                  p={4}
                  gap={4}
                  backgroundColor={"#cccbcb"}
                  borderRadius={"md"}
                  key={inCart.id}
                  minW={"300px"}
                  maxW={"600px"}
                  minH={"550px"}
                  transitionDuration={"700ms"}
                  onClick={() => navigate(`/product/${inCart.id}`)}
                  _hover={{
                    padding: 12,
                  }}
                >
                  <Flex>
                    <Text fontSize={"32px"}>{inCart.title}</Text>
                  </Flex>
                  <Flex alignItems={"center"} justifyContent={"center"}>
                    <Image src={inCart.image} />
                  </Flex>
                  <Flex direction={"column"} p={4} gap={4}>
                    <Text fontSize={"24px"}>{inCart.price}₼</Text>
                    <Text>{inCart.description}</Text>
                  </Flex>

                  <Button onClick={() => handleDeleteButton(inCart.id)}>
                    Delet it!
                  </Button>
                </Flex>
              ))
          )}
        </Flex>
        <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Button onClick={() => alert("You can not buy!")}>Buy!</Button>
        </Flex>
      </main>
    </Flex>
  );
};

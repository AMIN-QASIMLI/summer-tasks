import { Flex, Image, Text, Input, Button, Loader } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef } from "react";
import { FaMoon, FaPlus, FaShoppingCart } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import {
  useGetProductsQuery,
  useAddToCartMutation,
  useDeleteProductMutation,
} from "./api";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Logo from "./assets/logo.svg";
import { useNavigate } from "react-router";

export const Product = () => {
  const { data, isFetching } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const [addToCart] = useAddToCartMutation();
  const sellMenuRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const productId = window.location.toString().split("/").pop();

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
        formData.append("isDeletable", "false");

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

  interface Product {
    title: string;
    price: number;
    description?: string;
    image?: string;
    isDeletable?: boolean;
  }

  const handleAddToCartButtonClicked = async (product: Product) => {
    try {
      await addToCart({
        title: product.title,
        image: product.image,
        price: product.price,
        description: product.description,
      });
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
  }, []);

  return (
    <Flex width={"100%"} height={"100%"}>
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
        ) : (
          data
            ?.filter((product) => product.id == productId)
            .map((product) => (
              <Flex borderRadius={"md"} backgroundColor={"#1E90FF"} p={16}>
                <Image src={product.image} />
                <Flex direction={"column"} gap={4} p={4}>
                  <Text fontSize={"32px"}>{product.title}</Text>
                  <Text fontSize={"24px"}>{product.price}₼</Text>
                  <Text>{product.description}</Text>
                  {product.isDeletable == false ? (
                    <Button onClick={() => handleDeleteButton(product.id)}>
                      Delete!
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddToCartButtonClicked(product)}
                    >
                      Add to cart!
                    </Button>
                  )}
                </Flex>
              </Flex>
            ))
        )}
      </Flex>
    </Flex>
  );
};

import { Flex, Text, Button, Loader } from "@chakra-ui/react";
import { Link } from "react-router";
import { useGetUserQuery } from "./api";
import { useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useAuthStore } from "./zustand_store";

export const App = () => {
  const { data, isFetching } = useGetUserQuery();
  const logout = useAuthStore((s) => s.logout)

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
  }, []);
  return (
    <Flex p={4} gap={8} direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Flex gap={4}>
        <MdSunny onClick={() => toggleDarkMode(false)} />/
        <FaMoon onClick={() => toggleDarkMode(true)} />
        <Link to={"login"}>Token is expired? Get here!</Link>
      </Flex>
      {isFetching ? (
        <Loader />
      ) : (
        data && (
          <Flex direction={"column"} alignItems={"center"} justifyContent={"center"}>
            <Text>User Name: {data.user?.first_name}</Text>
            <Text>User Last Name: {data.user?.last_name}</Text>
            <Text>User Email: {data.user?.email}</Text>
            <Text>User Password: {data.user?.password}</Text>
            <Text>User Company Name: {data.user?.companyName}</Text>
            <Text>User Mobile: {data.user?.Mobile}</Text>
          </Flex>
        )
      )}
      <Button onClick={() => logout()} maxW={"300px"}>Log out</Button>
    </Flex>
  );
};

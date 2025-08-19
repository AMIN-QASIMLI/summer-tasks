import { Button, Flex, Input, InputGroup, Text, Image } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import Logo from "./assets/Logo.svg";
import { useAuthStore } from "./zustand_store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const fields: Fields[][] = [
  [
    {
      type: "text",
      name: "email",
      label: "Email Id",
      placeHolder: "Enter your email...",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeHolder: "Enter your password...",
    },
  ],
];

interface Fields {
  type: string;
  placeHolder: string;
  label: string;
  name: keyof FormValues;
}

interface FormValues {
  email: string;
  password: string;
}

const schema = object({
  email: string().email().required(),
  password: string().required("Password is required"),
});

export const Login = () => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const email = watch("email");
  const password = watch("password");

  const [visible, setVisible] = useState(false);

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login is unsaccesfull");
    }
  };

  return (
    <Flex minH="100vh" justifyContent={"center"} alignItems="center">
      <Flex
        maxW={{ base: "100%", xl: "825px" }}
        height={"100vh"}
        direction="column"
        justifyContent={"center"}
        alignItems="center"
        as="form"
        onSubmit={onSubmit}
        boxShadow={"md"}
      >
        <Flex>
          <MdSunny onClick={() => toggleDarkMode(false)} />
          <FaMoon onClick={() => toggleDarkMode(true)} />
        </Flex>
        <Image src={Logo} width={"142px"}></Image>
        <Flex>
          <Text
            fontSize={"32px"}
            fontFamily={"DM Serif Text"}
            fontWeight={400}
            fontStyle={"italic"}
          >
            A ©
          </Text>
        </Flex>
        <Flex flexWrap="wrap" mt="60px" justifyContent="center" gap="24px">
          {fields.map((field) => (
            <Flex
              direction={"column"}
              justifyContent="left"
              gap="24px"
              px="24px"
            >
              {field.map(({ label, name, placeHolder, type }) => (
                <Flex direction="column">
                  <Text color="#555555">{label}</Text>

                  {name === "password" ? (
                    <InputGroup
                      endAddon={
                        visible ? (
                          <FiEyeOff onClick={() => setVisible(false)} />
                        ) : (
                          <FiEye onClick={() => setVisible(true)} />
                        )
                      }
                    >
                      <Input
                        placeholder={placeHolder}
                        borderRadius="4px"
                        bg="#EEEEEE"
                        border="none"
                        maxWidth="336px"
                        minW="296px"
                        minH="51px"
                        type={visible ? "text" : type}
                        {...register(name)}
                      />
                    </InputGroup>
                  ) : (
                    <Input
                      placeholder={placeHolder}
                      borderRadius="4px"
                      bg="#EEEEEE"
                      border="none"
                      maxWidth="336px"
                      minW="296px"
                      minH="51px"
                      type={type}
                      {...register(name)}
                    />
                  )}

                  <Text color="red">{errors[name]?.message}</Text>
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button
          type="submit"
          mt="24px"
          minW="180px"
          minH="40px"
          fontSize="16px"
          bg="#1E2772"
          disabled={!isValid}
        >
          Sign up
        </Button>
      </Flex>
    </Flex>
  );
};

import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  Separator,
  Text,
  Image,
} from "@chakra-ui/react";
import Signup from "./assets/Signup.svg";
import Logo from "./assets/Logo.svg";
import Vector from "./assets/Vector.svg";
import Vector_black from "./assets/Vector_black.svg";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Link } from "react-router";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useAddUserMutation } from "./api";
import { useNavigate } from "react-router";

const fields: Fields[][] = [
  [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      placeHolder: "Enter your name..",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      placeHolder: "Enter your last name..",
    },
  ],
  [
    {
      type: "text",
      name: "email",
      label: "Email Id",
      placeHolder: "Enter your email..",
    },
    {
      type: "text",
      name: "mobile",
      label: "Mobile No",
      placeHolder: "Enter your number..",
    },
  ],
  [
    {
      type: "password",
      name: "password",
      label: "Password",
      placeHolder: "Enter your password..",
    },
    {
      type: "text",
      name: "companyName",
      label: "Company name",
      placeHolder: "Enter your company name..",
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
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  companyName: string;
}

const schema = object({
  firstName: string().required("Salam"),
  lastName: string().required(),
  email: string().email().required(),
  mobile: string().required(),
  companyName: string().required(),
  password: string().required("Password is required"),
});

export const Registration = () => {
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();
  const [darkMode, setDarkMode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [visible, setVisible] = useState(false);

  const onSubmit = async (data: FormValues) => {
    if (data) {
      try {
        await addUser({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
          companyName: data.companyName,
          mobile: data.mobile,
        });
      navigate("/login")
      } catch (err: any) {
        console.error("Error:", err.response?.data || err.message);
      }
    }
  };

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
    setDarkMode(darkMode);
  };

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
    setDarkMode(darkMode);
  }, []);

  return (
    <Flex minH="100vh">
      <Flex
        maxW={{ base: "100%", xl: "825px" }}
        direction="column"
        alignItems="center"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
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
              direction={{ base: "column", md: "row" }}
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
                        maxWidth="296px"
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
                      minW="336px"
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
        <HStack w="100%" mt="24px">
          <Separator flex="1" />
          <Text borderBottom="1px solid" flexShrink="0" color="#555555">
            <Link to="/login">Already have an account?</Link>
          </Text>
          <Separator flex="1" />
        </HStack>
      </Flex>
      <Flex
        display={{ base: "none", xl: "flex" }}
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Flex position={"relative"}>
          {darkMode ? (
            <Image
              backgroundSize={"cover"}
              height={"400px"}
              width={"800px"}
              src={Vector_black}
              clipPath={
                "polygon(88% 59%, 89% 77%, 79% 86%, 54% 78%, 26% 76%, 16% 70%, 7% 61%, 7% 49%, 11% 40%, 16% 33%, 25% 34%, 33% 30%, 40% 25%, 45% 20%, 49% 15%, 56% 9%, 65% 9%, 78% 17%, 84% 31%);"
              }
            ></Image>
          ) : (
            <Image
              backgroundSize={"cover"}
              src={Vector}
              clipPath={
                "polygon(88% 59%, 89% 77%, 79% 86%, 54% 78%, 26% 76%, 16% 70%, 7% 61%, 7% 49%, 11% 40%, 16% 33%, 25% 34%, 33% 30%, 40% 25%, 45% 20%, 49% 15%, 56% 9%, 65% 9%, 78% 17%, 84% 31%);"
              }
            ></Image>
          )}
          <Image
            ml={"100px"}
            position={"absolute"}
            width={"400px"}
            src={Signup}
          ></Image>
        </Flex>
      </Flex>
    </Flex>
  );
};

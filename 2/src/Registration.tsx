import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  Separator,
  Text,
} from "@chakra-ui/react";
import { Vector, Signup, Logo } from "./components/icons";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from "yup";
import { Link } from "react-router";

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
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      placeHolder: "Enter your password again..",
    },
  ],
  [
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
  confirmPassword: string;
  companyName: string;
}

const schema = object({
  firstName: string().required("Salam"),
  lastName: string().required(),
  email: string().email().required(),
  mobile: string().required(),
  companyName: string().required(),
  password: string().required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password"), undefined], "Passwords must match")
    .required(),
});

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [visible, setVisible] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Flex minH="100vh" bgColor="#F4F4F4">
      <Flex
        maxW={{ base: "100%", xl: "825px" }}
        bg="white"
        direction="column"
        alignItems="center"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Logo />
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

                  {name === "confirmPassword" || name === "password" ? (
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
        <Flex position="relative">
          <Vector />
          <Flex maxW="478px" position="absolute">
            <Signup />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

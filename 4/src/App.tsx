import { useEffect, useRef, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { Flex, Image, Input, Button } from "@chakra-ui/react";
import Logo from "./assets/logo.svg";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export const App = () => {
  const emojiRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [choosenuser, setChoosen] = useState<string>("user1");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const onEmojiClick = (emojiData: EmojiClickData) => {
    if (inputRef) {
      inputRef.current!.value += emojiData.emoji || "";
    }
    if (emojiRef.current) {
      emojiRef.current.style.display = "none";
    }
  };
  const handleEmojiMenuOpener = () => {
    if (emojiRef.current) {
      emojiRef.current.style.display =
        emojiRef.current.style.display === "none" ? "flex" : "none";
    }
  };

  const handleMassageSend = () => {
    const message = inputRef.current?.value.trim();
    if (message) {
      const newMessage = {
        massage: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        user: 2,
        profile: "https://picsum.photos/40/40?random=2",
      };
      if (choosenuser === "user1") {
        setUser1((prev) => [...prev, newMessage]);
        setMassages((prev) => [...prev, newMessage]);
        inputRef.current!.value = "";
      } else if (choosenuser === "user2") {
        setUser2((prev) => [...prev, newMessage]);
        setMassages((prev) => [...prev, newMessage]);
        inputRef.current!.value = "";
      } else if (choosenuser === "user3") {
        setUser3((prev) => [...prev, newMessage]);
        setMassages((prev) => [...prev, newMessage]);
        inputRef.current!.value = "";
      } else if (choosenuser === "user4") {
        setUser4((prev) => [...prev, newMessage]);
        setMassages((prev) => [...prev, newMessage]);
        inputRef.current!.value = "";
      } else if (choosenuser === "user5") {
        setUser5((prev) => [...prev, newMessage]);
        setMassages((prev) => [...prev, newMessage]);
        inputRef.current!.value = "";
      } else if (choosenuser === "user6") {
        setUser6((prev) => [...prev, newMessage]);
        setMassages((prev) => [...prev, newMessage]);
        inputRef.current!.value = "";
      }
    }
  };

  const handleUserClick = (userIndex: number) => {
    if (userIndex === 1) {
      setMassages(user1);
      setChoosen("user1");
    } else if (userIndex === 2) {
      setMassages(user2);
      setChoosen("user2");
    } else if (userIndex === 3) {
      setMassages(user3);
      setChoosen("user3");
    } else if (userIndex === 4) {
      setMassages(user4);
      setChoosen("user4");
    } else if (userIndex === 5) {
      setMassages(user5);
      setChoosen("user5");
    } else if (userIndex === 6) {
      setMassages(user6);
      setChoosen("user6");
    }
  };

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  const userList = [
    {
      userName: "Akif Agayev",
      profile: "https://picsum.photos/40/40?random=1",
    },
    {
      userName: "Gulmemmed Vasifov",
      profile: "https://picsum.photos/40/40?random=2",
    },
    {
      userName: "Tofiq Behremov",
      profile: "https://picsum.photos/40/40?random=3",
    },
    { userName: "Pis Dost😡", profile: "https://picsum.photos/40/40?random=4" },
    { userName: "Ana", profile: "https://picsum.photos/40/40?random=5" },
    { userName: "Boji🧞‍♀️", profile: "https://picsum.photos/40/40?random=6" },
  ];
  const [user1, setUser1] = useState([
    {
      massage: "Salam, necəsən?",
      time: "10:00 AM",
      user: 1,
      profile: "https://picsum.photos/40/40?random=1",
    },
    {
      massage: "Yaxşıyam, sən?",
      time: "10:01 AM",
      user: 2,
      profile: "https://picsum.photos/40/40?random=2",
    },
    {
      massage: "İşlər necə gedir?",
      time: "10:02 AM",
      user: 1,
      profile: "https://picsum.photos/40/40?random=1",
    },
  ]);
  const [user2, setUser2] = useState([
    {
      massage: "Salam men! Necəsən?",
      time: "10:01 AM",
      user: 2,
      profile: "https://picsum.photos/40/40?random=2",
    },
    {
      massage: "Elayam Dostum, sən necəsən?",
      time: "10:02 AM",
      user: 2,
      profile: "https://picsum.photos/40/40?random=2",
    },
  ]);
  const [user3, setUser3] = useState([
    {
      massage: "Nomremi haradan tapdın?",
      time: "10:01 AM",
      user: 1,
      profile: "https://picsum.photos/40/40?random=3",
    },
    {
      massage: "😁",
      time: "10:02 AM",
      user: 2,
      profile: "https://picsum.photos/40/40?random=2",
    },
  ]);
  const [user4, setUser4] = useState([
    {
      massage: "Adimi ne qoymusan?",
      time: "10:01 AM",
      user: 1,
      profile: "https://picsum.photos/40/40?random=4",
    },
    {
      massage: "Pis Dost😡",
      time: "10:02 AM",
      user: 2,
      profile: "https://picsum.photos/40/40?random=2",
    },
    {
      massage: "Yaxshi. Birdeyqe ne?",
      time: "10:03 AM",
      user: 1,
      profile: "https://picsum.photos/40/40?random=4",
    },
  ]);
  const [user5, setUser5] = useState([
    {
      massage: "Eve gelende 2 dene corek alarsan",
      time: "10:01 AM",
      user: 1,
      profile: "https://picsum.photos/40/40?random=5",
    },
    {
      massage: "Oldu!",
      time: "10:02 AM",
      user: 2,
      profile: "https://picsum.photos/40/40?random=2",
    },
  ]);
  const [user6, setUser6] = useState([
    {
      massage: "Boji men tukana gedecem nese isteyirsen?",
      time: "10:01 AM",
      user: 2,
      profile: "https://picsum.photos/40/40?random=2",
    },
    {
      massage: "Yox, sagol!",
      time: "10:02 AM",
      user: 1,
      profile: "https://picsum.photos/40/40?random=6",
    },
  ]);
  type MassageType = {
    massage: string;
    time: string;
    user: number;
    profile: string;
  };

  const [massages, setMassages] = useState<MassageType[]>(user1);

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
    scrollToBottom();
  }, [massages]);

  return (
    <Flex w="100%" h="100vh" flexDirection="column">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={4}
        bg="gray.500"
        boxShadow="md"
      >
        <Flex gap={2}>
          <MdSunny size={24} onClick={() => toggleDarkMode(false)} />/
          <FaMoon size={24} onClick={() => toggleDarkMode(true)} />
        </Flex>
        <Image src={Logo} width="150px" />
      </Flex>
      <Flex flex="1" overflow="hidden">
        <Flex
          flex="0 0 250px"
          bg="gray.500"
          flexDirection="column"
          boxShadow="md"
          overflowY="auto"
        >
          {userList.map((user, index) => (
            <Flex
              key={index}
              p={4}
              borderBottom="1px solid gray"
              alignItems="center"
              gap={2}
              cursor="pointer"
              _hover={{ bg: "gray.200" }}
              onClick={() => handleUserClick(index + 1)}
            >
              <Image
                src={user.profile}
                borderRadius="full"
                alt={user.userName}
              />
              {user.userName}
            </Flex>
          ))}
        </Flex>
        <Flex flex="1" flexDirection="column" p={4} overflow="hidden">
          <Flex flex="1" flexDirection="column" overflowY="auto" gap={2}>
            {massages.map((msg, index) =>
              msg.user === 1 ? (
                <Flex key={index} alignItems="center" gap={2}>
                  <Image
                    src={msg.profile}
                    borderRadius="full"
                    alt={msg.profile}
                  />
                  <Flex
                    flexDirection="column"
                    background="linear-gradient(90deg,rgba(247, 2, 27, 1) 0%, rgba(245, 127, 0, 1) 100%)"
                    p={3}
                    borderRadius="md"
                  >
                    <span>{msg.massage}</span>
                    <span style={{ fontSize: "0.8em", color: "gray" }}>
                      {msg.time}
                    </span>
                  </Flex>
                </Flex>
              ) : (
                <Flex
                  key={index}
                  justifyContent="flex-end"
                  gap={2}
                  alignItems="center"
                >
                  <Flex
                    flexDirection="column"
                    background="linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 100%)"
                    p={3}
                    borderRadius="md"
                  >
                    <span>{msg.massage}</span>
                    <span style={{ fontSize: "0.8em", color: "gray" }}>
                      {msg.time}
                    </span>
                  </Flex>
                  <Image
                    src={msg.profile}
                    borderRadius="full"
                    alt={msg.profile}
                  />
                </Flex>
              )
            )}
            <div ref={messagesEndRef} />
          </Flex>
          <Flex ref={emojiRef} display="none">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </Flex>
          <Flex mt={2} alignItems="center" gap={2}>
            <Button onClick={handleEmojiMenuOpener}>😀</Button>
            <Input placeholder="Write a message..." ref={inputRef} />
            <Button onClick={handleMassageSend}>→</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

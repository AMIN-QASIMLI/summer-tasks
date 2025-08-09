import { Input, Button, Flex, Checkbox, Text } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [notes, setNotes] = useState<[string, boolean][]>(() => {
    const storedNotes = window.localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
  }, []);

  const handleAddNote = () => {
    if (inputRef.current?.value) {
      const note: [string, boolean] = [inputRef.current.value, false];
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes, note];
        window.localStorage.setItem("notes", JSON.stringify(updatedNotes));
        return updatedNotes;
      });
      inputRef.current.value = "";
    } else {
      alert("Input is empty");
    }
  };

  const handleDeleteNote = (index: number) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((_, i) => i !== index);
      window.localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      padding={16}
      gap={8}
    >
      <Flex>
        <MdSunny size={24} onClick={() => toggleDarkMode(false)} />/
        <FaMoon size={24} onClick={() => toggleDarkMode(true)} />
      </Flex>
      <Flex direction={"column"} gap={4} width={"100%"} maxWidth={400}>
        <Input placeholder="Note whatever you want!" ref={inputRef}></Input>
        <Button onClick={handleAddNote}>Add!</Button>
      </Flex>
      <Flex
        direction={"column"}
        padding={10}
        gap={4}
        width={"100%"}
        height={"100vh"}
        maxWidth={400}
        border={"1px solid #ccc"}
        borderRadius={8}
      >
        {notes.map((note, index) => (
          <Flex
            key={index}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={2}
            borderBottom={"1px solid #eee"}
          >
            <span>{note[0]}</span>
            <Button onClick={() => handleDeleteNote(index)}>Delete</Button>
            <Text>Done!</Text>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label />
            </Checkbox.Root>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
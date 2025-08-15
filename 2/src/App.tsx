import {
  useGetNotesQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from "./api";
import { useRef, useEffect } from "react";
import { Button, Flex, Loader, Text, Input, Checkbox } from "@chakra-ui/react";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

export const App = () => {
  const { data = [], isFetching } = useGetNotesQuery(undefined);
  const [addNote] = useAddNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const inputref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
  }, []);

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  const handlleAddNote = async () => {
    if (!inputref.current?.value) return;
    try {
      await addNote({
        title: inputref.current.value,
        name: inputref.current.value,
        lifetime: null,
        userId: 1,
        completed: false,
      }).unwrap();
      inputref.current.value = "";
    } catch (err) {
      console.error("Add note error:", err);
    }
  };

  const handleToggleCompleted = async (note: Note) => {
    try {
      await updateNote({
        id: note.id,
        title: note.title,
        name: note.title,
        lifetime: null,
        userId: note.userId,
        completed: !note.completed,
      }).unwrap();
    } catch (err) {
      console.error("Toggle completed error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id).unwrap();
    } catch (err) {
      console.error("Silinmə zamanı xəta:", err);
    }
  };

  type Note = {
    id: number;
    name: string;
    lifetime: null;
    title: string;
    userId: number;
    completed: boolean;
  };

  return (
    <>
      <Flex direction="column" gap="20px" p="20px">
        <Flex>
          <MdSunny size={24} onClick={() => toggleDarkMode(false)} />/
          <FaMoon size={24} onClick={() => toggleDarkMode(true)} />
        </Flex>
        <Flex border={"3px dotted blue"}>
          <Input placeholder="Add anything!" ref={inputref}></Input>
          <Button onClick={handlleAddNote}>Add!</Button>
        </Flex>
        <Flex direction={"column"} border={"3px dashed blue"} p="20px">
          {isFetching ? (
            <Loader />
          ) : (
            data.map((note: Note) => (
              <Flex
                direction="column"
                gap="10px"
                p="10px"
                border="1px solid lightblue"
                key={note.id}
              >
                <Text>ID: {note.id}</Text>
                <Text>Note: {note.title}</Text>
                <Text>USERID: {note.userId}</Text>
                {note.completed && (
                  <>
                    <Text color="green">Completed</Text>
                    <Checkbox.Root
                      checked={note.completed}
                      onChange={() => handleToggleCompleted(note)}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label />
                    </Checkbox.Root>
                  </>
                )}
                {!note.completed && (
                  <>
                    <Text color="red">Not Completed</Text>
                    <Checkbox.Root
                      checked={note.completed}
                      onChange={() => handleToggleCompleted(note)}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label />
                    </Checkbox.Root>
                  </>
                )}
                <Button onClick={() => handleDelete(note.id)}>Delete!</Button>
              </Flex>
            ))
          )}
        </Flex>
      </Flex>
    </>
  );
};

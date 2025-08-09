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
  const lastNoteId = data.length > 0 ? data[data.length - 1].id : 0;

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
  }, []);

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  const handlleAddNote = async () => {
    await addNote({
      id: lastNoteId + 1,
      title: inputref.current?.value || "",
      userId: 1,
      completed: false,
    }).unwrap();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id).unwrap();
    } catch (err) {
      console.error("Silinmə zamanı xəta:", err);
    }
  };

  type Note = {
    _id: string;
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  };

  const handleToggleCompleted = async (note: Note) => {
    await updateNote({
      id: note._id,
      title: note.title,
      userId: note.userId,
      completed: !note.completed,
    });
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
            data.map(
              (note: {
                _id: string;
                id: number;
                title: string;
                userId: number;
                completed: boolean;
              }) => (
                <Flex
                  direction="column"
                  gap="10px"
                  p="10px"
                  border="1px solid lightblue"
                  key={note._id}
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
                  <Button onClick={() => handleDelete(note._id)}>
                    Delete!
                  </Button>
                </Flex>
              )
            )
          )}
        </Flex>
      </Flex>
    </>
  );
};

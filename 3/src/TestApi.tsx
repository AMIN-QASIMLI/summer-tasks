import { Button, Flex, Loader, Text } from "@chakra-ui/react";
import { useGetImgsQuery, useLazyGetImgsQuery } from "./api";

export const TestApi = () => {
  const [getImgs, { isFetching: isFetchingLazy, data: dataLazy }] =
    useLazyGetImgsQuery();
  const { isFetching, data } = useGetImgsQuery({});
  console.log("data", data);
  console.log("dataLazy", dataLazy);
  return (
    <Flex gap="50px" justifyContent="space-between">
      <Flex direction="column" border="1px solid blue">
        <Text fontSize="32px">With lazy</Text>
        {isFetchingLazy ? (
          <Loader />
        ) : (
          <>
            {" "}
            <Button
              onClick={() => {
                getImgs({});
              }}
            >
              Get Posts
            </Button>
            {dataLazy?.map((img, idx) => (
              <Flex key={idx} direction="column" border="1px solid red">
                <img
                  src={typeof img === "string" ? img : img.url}
                  alt="random"
                />
              </Flex>
            ))}
          </>
        )}
      </Flex>
      <Flex direction="column" border="1px solid blue">
        <Text fontSize="32px">Without lazy</Text>
        {isFetching ? (
          <Loader />
        ) : (
          data?.map((img, idx) => (
            <Flex key={idx} direction="column" border="1px solid red">
              <img src={typeof img === "string" ? img : img.url} alt="random" />
            </Flex>
          ))
        )}
      </Flex>
    </Flex>
  );
};

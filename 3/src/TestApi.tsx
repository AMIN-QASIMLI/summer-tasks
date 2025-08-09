import { Button, Flex, Loader, Text } from "@chakra-ui/react";
import { useGetPostsQuery, useLazyGetPostsQuery } from "./api";

export const TestApi = () => {
  const [getPosts, { isFetching: isFetchingLazy, data: dataLazy }] =
    useLazyGetPostsQuery();
  const { isFetching, data } = useGetPostsQuery();

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
                getPosts();
              }}
            >
              Get Posts
            </Button>
            {dataLazy?.map((post) => (
              <Flex direction="column" border="1px solid red">
                <Text>{post.id}</Text>
                <Text>{post.title}</Text>
                <Text>{post.userId}</Text>
                <Text>{post.body}</Text>
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
          data?.map((post) => (
            <Flex direction="column" border="1px solid red">
              <Text>{post.id}</Text>
              <Text>{post.title}</Text>
              <Text>{post.userId}</Text>
              <Text>{post.body}</Text>
            </Flex>
          ))
        )}
      </Flex>
    </Flex>
  );
};

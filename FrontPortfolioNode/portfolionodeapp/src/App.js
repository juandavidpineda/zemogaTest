import React from "react";
import {
  SimpleGrid,
  Flex,
  Avatar,
  Box,
  Text,
  Divider,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [users, setUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState();
  React.useEffect(() => {
    async function callService() {
      const result = await getUsers();
      setUsers(result.message);
    }
    callService();
  }, []);

  async function callServiceByUser(userName) {
    const result = await getUserById(userName);
    setCurrentUser(result.message);
  }

  return (
    <Flex m={10}>
      <SimpleGrid columns={1} spacing={5} w="300px" h="100%">
        {users != undefined &&
          users.map((user) => {
            return (
              <Stack
                cursor="pointer"
                direction="column"
                onClick={() => {
                  callServiceByUser(user.twitterUsername);
                }}
                key={user.twitterUsername}
              >
                <Divider orientation="horizontal" />
                <Text fontWeight="bold">{user.title}</Text>
                <Text fontSize="sm">@{user.twitterUsername}</Text>
              </Stack>
            );
          })}
      </SimpleGrid>
      <Flex flexDirection="column" w="400px">
        {currentUser !== undefined && (
          <Box>
            <Text fontWeight="bold">
              {currentUser?.title} || @{currentUser?.twitterUsername}{" "}
            </Text>
            <Avatar size="2xl" src={currentUser?.image} />
            <Text fontSize="sm">{currentUser?.textDescription}</Text>
          </Box>
        )}
        {currentUser !== undefined &&
          currentUser.tweets.length > 0 &&
          currentUser.tweets.map((tweet) => {
            return (
              <Stack key={tweet.id} direction="column">
                <Divider orientation="horizontal" />
                <Text fontWeight="bold">{tweet.text}</Text>
                <Text fontSize="sm">{tweet.created_at}</Text>
              </Stack>
            );
          })}
      </Flex>
    </Flex>
  );
}

function getUsers() {
  return axios
    .get(
      "https://biz5lq14e0.execute-api.us-east-1.amazonaws.com/dev/getAllUsers"
    )
    .then(({ data }) => {
      return data;
    });
}

function getUserById(userName) {
  return axios
    .get(
      `https://biz5lq14e0.execute-api.us-east-1.amazonaws.com/dev/getInfoUser/${userName}`
    )
    .then(({ data }) => {
      return data;
    });
}

export default App;

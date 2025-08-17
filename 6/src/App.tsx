import { Flex, Text, Table, For } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { MdOutlineQueryStats } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { useGetStaticsQuery } from "./api";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router";
import { DoughnutChart } from "./Doughnut";
import { Map } from "./map";

export const App = () => {
  const { data: usersData } = useGetStaticsQuery();
  const [latestUsers, setLatestUsers] = useState([]);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  useEffect(() => {
    const run = async () => {
      if (!usersData) return;
      setLatestUsers([...usersData]);
    };
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    run();
    return () => window.removeEventListener("resize", handleResize);
  }, [usersData]);
  if (windowWidth > 732) {
    return (
      <Flex width={"100%"} height={"100%"} flexGrow={1}>
        <header
          style={{
            height: "100%",
            display: "flex",
            flexGrow: 1,
            position: "fixed",
            zIndex: 1000,
          }}
        >
          <Flex
            height={"100vh"}
            backgroundColor={"rgba(255, 51, 0, 1)"}
            gap={4}
            alignItems={"center"}
            justifyContent={"start"}
            p={2}
            flexDirection={"column"}
            color={"#ffffff"}
            flexGrow={1}
            boxShadow={"lg"}
          >
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <MdSunny size={24} onClick={() => toggleDarkMode(false)} />
              ——
              <FaMoon size={24} onClick={() => toggleDarkMode(true)} />
            </Flex>
            <Flex onClick={() => navigate("/")}>
              <IoStatsChart
                style={{
                  fontSize: "28px",
                }}
              />
            </Flex>
            <Flex onClick={() => navigate("/stats")}>
              <MdOutlineQueryStats
                style={{
                  fontSize: "32px",
                }}
              />
            </Flex>
          </Flex>
        </header>
        <main>
          <Flex alignItems={"center"} gap={8} p={4} wrap={"wrap"} ml={"100px"}>
            <Flex
              minH={"400px"}
              maxH={"800px"}
              minW={"600px"}
              borderRadius={"lg"}
              alignItems={"center"}
              boxShadow={"lg"}
              backgroundColor={"#0bb3b3ff"}
              p={4}
              gap={4}
              flexDirection={"column"}
              flexGrow={1}
            >
              <Text fontSize={"32px"}>Users in map:</Text>
              <Map />
            </Flex>
            <Flex
              minH={"400px"}
              maxH={"400px"}
              minW={"600px"}
              borderRadius={"lg"}
              alignItems={"center"}
              boxShadow={"lg"}
              backgroundColor={"#0bb3b3ff"}
              p={4}
              gap={4}
              flexDirection={"column"}
              overflow={"auto"}
              flexGrow={1}
            >
              <For each={["outline"]}>
                {(variant) => (
                  <Table.Root key={variant} size="lg" variant={variant}>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>User</Table.ColumnHeader>
                        <Table.ColumnHeader>Country</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">
                          Joined Time
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {usersData?.map((user) => (
                        <Table.Row key={user.id} gap={4} p={4}>
                          <Table.Cell>{user.name}</Table.Cell>
                          <Table.Cell>{user.country}</Table.Cell>
                          <Table.Cell textAlign="end">{user.joined}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                )}
              </For>
            </Flex>
            <Flex
              minH={"400px"}
              maxH={"400px"}
              minW={"600px"}
              borderRadius={"lg"}
              alignItems={"center"}
              boxShadow={"lg"}
              backgroundColor={"#0bb3b3ff"}
              p={4}
              gap={4}
              flexDirection={"column"}
              overflow={"auto"}
              flexGrow={1}
            >
              <For each={["outline"]}>
                {(variant) => (
                  <Table.Root key={variant} size="lg" variant={variant}>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>
                          Last Joined User
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>Country</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">
                          Joined Time
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {latestUsers
                        ?.sort(
                          (a, b) => new Date(b.joined) - new Date(a.joined)
                        )
                        .slice(0, 20)
                        .map((user) => (
                          <Table.Row key={user.id} gap={4} p={4}>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.country}</Table.Cell>
                            <Table.Cell textAlign="end">
                              {user.joined}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table.Root>
                )}
              </For>
            </Flex>
            <Flex
              minH={"400px"}
              maxH={"800px"}
              minW={"700px"}
              borderRadius={"lg"}
              alignItems={"center"}
              boxShadow={"lg"}
              backgroundColor={"#0bb3b3ff"}
              p={4}
              gap={4}
              flexDirection={"column"}
              overflow={"auto"}
              flexGrow={1}
            >
              <DoughnutChart />
            </Flex>
          </Flex>
        </main>
      </Flex>
    );
  } else {
    return (
      <Flex width={"100%"} height={"100%"} flexGrow={1}>
        <header
          style={{
            width: "100%",
            position: "fixed",
            zIndex: 1000,
          }}
        >
          <Flex
            backgroundColor={"rgba(255, 51, 0, 1)"}
            gap={4}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={2}
            color={"#ffffff"}
            flexGrow={1}
            boxShadow={"lg"}
            width={"100%"}
          >
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <MdSunny size={24} onClick={() => toggleDarkMode(false)} />
              /
              <FaMoon size={24} onClick={() => toggleDarkMode(true)} />
            </Flex>
            <Flex onClick={() => navigate("/")}>
              <IoStatsChart
                style={{
                  fontSize: "28px",
                }}
              />
            </Flex>
            <Flex onClick={() => navigate("/stats")}>
              <MdOutlineQueryStats
                style={{
                  fontSize: "32px",
                }}
              />
            </Flex>
          </Flex>
        </header>
        <main>
          <Flex alignItems={"center"} gap={8} p={4} wrap={"wrap"} mt={"100px"}>
            <Flex
              minH={"250px"}
              maxH={"175px"}
              minW={"50px"}
              borderRadius={"lg"}
              alignItems={"center"}
              boxShadow={"lg"}
              backgroundColor={"#0bb3b3ff"}
              p={4}
              gap={4}
              flexDirection={"column"}
              flexGrow={1}
              overflow={"auto"}
            >
              <Text fontSize={"32px"}>Users in map:</Text>
              <Map />
            </Flex>
            <Flex
              minH={"250px"}
              maxH={"175px"}
              minW={"50px"}
              borderRadius={"lg"}
              alignItems={"center"}
              boxShadow={"lg"}
              backgroundColor={"#0bb3b3ff"}
              p={4}
              gap={4}
              flexDirection={"column"}
              overflow={"auto"}
              flexGrow={1}
            >
              <For each={["outline"]}>
                {(variant) => (
                  <Table.Root key={variant} size="lg" variant={variant}>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>User</Table.ColumnHeader>
                        <Table.ColumnHeader>Country</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">
                          Joined Time
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {usersData?.map((user) => (
                        <Table.Row key={user.id} gap={4} p={4}>
                          <Table.Cell>{user.name}</Table.Cell>
                          <Table.Cell>{user.country}</Table.Cell>
                          <Table.Cell textAlign="end">{user.joined}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                )}
              </For>
            </Flex>
            <Flex
              minH={"250px"}
              maxH={"175px"}
              minW={"50px"}
              borderRadius={"lg"}
              alignItems={"center"}
              boxShadow={"lg"}
              backgroundColor={"#0bb3b3ff"}
              p={4}
              gap={4}
              flexDirection={"column"}
              overflow={"auto"}
              flexGrow={1}
            >
              <For each={["outline"]}>
                {(variant) => (
                  <Table.Root key={variant} size="lg" variant={variant}>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>
                          Last Joined User
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>Country</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">
                          Joined Time
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {latestUsers
                        ?.sort(
                          (a, b) => new Date(b.joined) - new Date(a.joined)
                        )
                        .slice(0, 20)
                        .map((user) => (
                          <Table.Row key={user.id} gap={4} p={4}>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.country}</Table.Cell>
                            <Table.Cell textAlign="end">
                              {user.joined}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table.Root>
                )}
              </For>
            </Flex>
            <Flex
              minH={"250px"}
              maxH={"175px"}
              minW={"50px"}
              borderRadius={"lg"}
              alignItems={"center"}
              boxShadow={"lg"}
              backgroundColor={"#0bb3b3ff"}
              p={4}
              gap={4}
              flexDirection={"column"}
              overflow={"auto"}
              flexGrow={1}
            >
              <DoughnutChart />
            </Flex>
          </Flex>
        </main>
      </Flex>
    );
  }
};

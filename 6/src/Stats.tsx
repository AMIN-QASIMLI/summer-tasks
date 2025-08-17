import { Flex, Text } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { MdOutlineQueryStats } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { useGetStatsQuery } from "./api";
import Chart from "chart.js/auto";
import {
  ChoroplethController,
  GeoFeature,
  ColorScale,
  ProjectionScale,
} from "chartjs-chart-geo";
import { useNavigate } from "react-router";
import { DoughnutChartStats } from "./DoughnutStats";
import { DashboardCharts } from "./DoughnutRevenue";

Chart.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale);

export const Stats = () => {
  const { data } = useGetStatsQuery();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleDarkMode = (darkMode: boolean) => {
    document.body.classList.toggle("dark-mode", darkMode);
    window.localStorage.setItem("darkMode", String(darkMode));
  };

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkMode);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <Flex onClick={() => navigate("/")}>
              <MdOutlineQueryStats
                style={{
                  fontSize: "32px",
                }}
              />
            </Flex>
          </Flex>
        </header>
        <main>
          <Flex
            alignItems={"center"}
            gap={8}
            p={4}
            flexWrap={"wrap"}
            ml={"100px"}
          >
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
              <DoughnutChartStats />
            </Flex>
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
              <DashboardCharts />
            </Flex>
          </Flex>
        </main>
      </Flex>
    );
  } else {
    return (
      <Flex width={"100%"} height={"100%"} direction={"column"}>
        <header
          style={{
            display: "flex",
            position: "fixed",
            zIndex: 1000,
            flexDirection: 'column',
            width: "100%"
          }}
        >
          <Flex
            alignItems={"center"}
            backgroundColor={"rgba(255, 51, 0, 1)"}
            gap={4}
            justifyContent={"space-between"}
            p={2}
            color={"#ffffff"}
            boxShadow={"lg"}
          >
            <Flex
              gap={2}
              alignItems={"center"}
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
            <Flex onClick={() => navigate("/")}>
              <MdOutlineQueryStats
                style={{
                  fontSize: "32px",
                }}
              />
            </Flex>
          </Flex>
        </header>
        <main>
          <Flex
            alignItems={"center"}
            gap={8}
            p={4}
            flexWrap={"wrap"}
            mt={"100px"}
          >
            <Flex
              minH={"250px"}
              maxw={"175px"}
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
              <Text fontSize={"32px"}>Online Users</Text>
              <DoughnutChartStats />
            </Flex>
            <Flex
              minH={"250px"}
              maxw={"175px"}
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
              <Text fontSize={"32px"}>Dashboard</Text>
              <DashboardCharts />
            </Flex>
          </Flex>
        </main>
      </Flex>
    );
  }
};

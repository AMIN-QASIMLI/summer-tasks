import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import {
  ChoroplethController,
  GeoFeature,
  ColorScale,
  ProjectionScale,
} from "chartjs-chart-geo";
import { getRelativePosition } from "chart.js/helpers";
import world from "world-atlas/countries-50m.json";
import { feature } from "topojson-client";
import { Text } from "@chakra-ui/react";
import { useGetStaticsQuery } from "./api";

Chart.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale);

export const Map = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { data: usersData } = useGetStaticsQuery();
  const countryMap = {
    AZ: "Azerbaijan",
    TR: "Turkey",
    US: "United States of America",
    DE: "Germany",
    FR: "France",
    GB: "United  Kingdom",
    JP: "Japan",
    BR: "Brazil",
    CN: "China",
    IN: "India",
  };

  useEffect(() => {
    const run = async () => {
      if (!canvasRef.current || !usersData) return;
      const countries = feature(world, world.objects.countries).features;

      const data = Object.values(
        usersData.reduce((acc: any, user: any) => {
          const countryName = countryMap[user.country] || user.country;
          if (!acc[countryName]) {
            acc[countryName] = { country: countryName, users: 0 };
          }
          acc[countryName].users += 1;
          return acc;
        }, {})
      );

      const chart = new Chart(canvasRef.current, {
        type: "choropleth",
        data: {
          labels: countries.map((d: any) => d.properties.name),
          datasets: [
            {
              label: "Users by country",
              data: countries.map((d: any) => {
                const found = data.find(
                  (c: any) => c.country === d.properties.name
                );
                return {
                  feature: d,
                  value: found ? found.users : 0,
                };
              }),
            },
          ],
        },
        options: {
          scales: {
            projection: {
              axis: "x",
              projection: "equalEarth",
            },
          },
        },
      });

      return () => chart.destroy();
    };

    run();
  }, [usersData]);
  return (
      <canvas ref={canvasRef} />
  );
};

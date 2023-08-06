import { useQuery } from "@tanstack/react-query";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { getMonthlyReservationInfo } from "../../api/dashboardResourceAPi";
import DashboardContainer from "../../components/DashboardContainer";

const LineCharts = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery(["getMonthlyReservationInfo-key"], getMonthlyReservationInfo);

  console.log(data);

  const state = {
    type: "bar",
    height: 350,
    series: [
      {
        name: "Reservation",
        data: data?.map((item) => item.count),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      // title: {
      //   text: "Monthly reservations",
      //   align: "left",
      // },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: data?.map((item) => item.startDate),
      },
    },
  };

  return (
    <DashboardContainer
      loading={isLoading}
      title={"Monthly Reservation Report"}
      error={error}
      height="460px"
    >
      <ReactApexChart {...state} />
    </DashboardContainer>
  );
};

export default LineCharts;

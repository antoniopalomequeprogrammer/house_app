import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ filtroGrafico }) => {
  console.log({ filtroGrafico });

  const minimo = filtroGrafico.minimo;
  const maximo = filtroGrafico.maximo;
  const intervalo = filtroGrafico.intervalo;

  const range = (minimo, maximo) => {
    const rangeArray = [];
    for (let index = minimo; index <= maximo; index++) {
      rangeArray.push(index + parseInt(intervalo));
    }
    return rangeArray;
  };

  let rango = range(15, 28);

  const lineChartData = {
    labels: rango,
    datasets: [
      {
        data: [15],
        backgroundColor: ["rgba(54, 162, 235, 0.6)"],
        label: "Mínimo",
        borderColor: "black",
        fill: true,
        lineTension: 0.5,
      },
      {
        data: [20],
        backgroundColor: ["rgba(255, 99, 132, 0.6)"],
        label: "Máximo",
        borderColor: "black",
        fill: true,
        lineTension: 0.5,
      },
    ],
  };

  return (
    <Bar
      type="bar"
      width={160}
      height={60}
      options={{
        title: {
          display: true,
          text: "COVID-19 Cases of Last 6 Months",
          fontSize: 20,
        },
        scales: {
          x: {
            suggestedMin: 50,
            suggestedMax: 100,
          },
        },
        legend: {
          display: true, //Is the legend shown?
          position: "top", //Position of the legend.
        },
      }}
      data={lineChartData}
    />
  );
};
export default Chart;

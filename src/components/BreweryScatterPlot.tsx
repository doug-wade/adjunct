import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Scatter } from "react-chartjs-2"

import { useScatterData } from "../hooks/useScatterData"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function BreweryScatterPlot() {
  const { data, options } = useScatterData()
  return <Scatter data={data} options={options} />
}

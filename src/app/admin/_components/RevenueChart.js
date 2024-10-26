'use client';

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const RevenueChart = ({ items }) => {
    const data = {
        labels: items?.map((item) => item?.date),
        datasets: [
            {
                label: "Revenue",
                data: items?.map((item) => item?.data?.revenue),
                backgroundColor: "#16A34A70",
                borderColor: "#16A34A70"
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Revenue"
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: false
            }
        }
    }

    return (
        <section className="bg-white p-2 md:p-5 rounded-xl shadow w-full h-full">
            <Line data={data} options={options} />
        </section>
    )
}

export default RevenueChart
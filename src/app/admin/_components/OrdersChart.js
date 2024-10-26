'use client';

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend);

const OrdersChart = ({ items }) => {
    const data = {
        labels: items?.map((item) => item?.date),
        datasets: [
            {
                label: "Orders",
                data: items?.map((item) => item?.data?.totalOrders),
                backgroundColor: "#BFDBFE",
                borderColor: "#BFDBFE",
                borderWidth: 0.5,
                barThickness: 30
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
                text: "Orders"
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
            <Bar data={data} options={options} />
        </section>
    )
}

export default OrdersChart
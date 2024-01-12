import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from 'chart.js/auto'
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Loader from "react-js-loader";

const NetwealthChart = ({ refresh }) => {
    const [data, setData] = useState({});
    const url = 'http://localhost:8080/netwealthtracker/netwealth';
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        fetchedata()
    }, [refresh])

    const fetchedata = async () => {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        const fetchedata = response.data;
        console.log(fetchedata)
        const label = fetchedata.map((elem) => {
            return converDateFormat(elem.date);
        })
        const dataset = fetchedata.map((elem) => {
            return elem.total;
        })
        const dataset2 = fetchedata.map((elem) => {
            return elem.stock;
        })
        setData({
            labels: label,
            datasets: [
                {
                    label: "Net wealth",
                    data: dataset,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 2,
                    fill: true,
                    borderJoinStyle: 'round',
                    tension: 0.1,
                    borderWidth: 3
                },
                {
                    label: "stock",
                    data: dataset2,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 2,
                    fill: true,
                    borderJoinStyle: 'round',
                    tension: 0.1,
                    borderWidth: 3
                }
            ],
        })
    }

    const converDateFormat = (inputDate) => {
        let dateObj = new Date(inputDate);
        let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();
        let formattedDate = month + '/' + year;
        return formattedDate;
    }

    return (
        <div>
            {
                data.datasets ? <LineChart chartData={data} /> : <Loader type="bubble-scale" bgColor="var(--primary-color)" color="var(--secondary-color)" size={50} />
            }
        </div>
    )
}

export default NetwealthChart;
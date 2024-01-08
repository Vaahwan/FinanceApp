import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Chart from 'chart.js/auto'
import BarChart from "./BarChart";

const ExpenseChart = ({refresh}) => {
    const [data, setData] = useState({});
    const url = 'http://localhost:8080/expensetracker/expense';
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
        const label = fetchedata.map((elem)=>{
            return elem.expenseType;
        })
        const dataset = fetchedata.map((elem)=>{
            return elem.expense;
        })
        setData({
            labels: label,
            datasets: [
                {
                  label: "Expense",
                  data: dataset,
                  backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                  ],
                  borderColor: "black",
                  borderWidth: 2,
                },
            ],
        })
    }

    console.log(data)

    return (
        <div>
            {
                data.datasets? <BarChart chartData={data} /> : <p>please wait...</p>
            }
        </div>
    )
}

export default ExpenseChart;
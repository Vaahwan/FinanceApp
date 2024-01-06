import React from "react";
import './personal.css'
import { useState } from "react";
import axios from 'axios'
import Select from 'react-select';
import {useJwt} from 'react-jwt'
import { Heading } from '@chakra-ui/react'
import { Input,  InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const options = [
    { value: 'Food', label: 'Food' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Rent', label: 'Rent' },
    { value: 'EMI', label: 'EMI' },
    { value: 'Entertaitment', label: 'Entertaitment' },
    { value: 'Bills', label: 'Bills' },
    { value: 'Eatout', label:'Eatout' },
    { value: 'Investment', label:'Investment'}
];

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'var(--primary-color)' : 'white',
      color: state.isFocused ? 'var(--secondary-color)' : 'var(--primary-color)'
    }),
};

const Personal = () => {
    const [date,setDate] = useState("");
    const [expense,setExpense] = useState("");
    const [expenseType,setExpenseType] = useState("");
    const [dateErr,setDateErr] = useState(false);
    const [expenseErr,setExpenseErr] = useState(false);
    const [expenseTypeErr,setExpenseTypeErr] = useState(false);
    const api = "http://localhost:8080/expensetracker/expense"
    const jwtpassword = 'vaahwan'
    const jwtToken = localStorage.getItem('jwtToken');
    const { decodedToken, isExpired } = useJwt(jwtToken);

    const handleSelect = (selectedOption)=>{
        setExpenseType(selectedOption.value);
    }

    const handleSubmit = async()=>{
        if(date===""){
            setDateErr(true);
            setTimeout(()=>{
                setDateErr(false);
            },3000)
        }
        if(expense===""){
            setExpenseErr(true);
            setTimeout(() => {
                setExpenseErr(false)
            }, 3000);
        }
        if(expenseType===""){
            setExpenseTypeErr(true)
            setTimeout(() => {
                setExpenseTypeErr(false)
            }, 3000);
        }
        const currdate = new Date();
        const expenseObj = {
            date : date,
            month : currdate.getMonth(),
            year : currdate.getFullYear(),
            expense : Number(expense),
            expenseType : expenseType,
            userEmail : decodedToken.email
        }
        console.log(expenseObj)
        console.log(jwtToken)
        const response = await axios.post(api,expenseObj,{
            headers:{
                "Authorization": `Bearer ${jwtToken}`
            }
        });
        console.log(response);
    }

    return (
        <div className="container">
            <div className="form-container">
                <Heading mb={4} >Enter Your Expense</Heading>
                <Input
                    placeholder="Select Date and Time"
                    size="lg"
                    type="datetime-local"
                    className="input"
                    onChange={(e)=>{setDate(e.target.value)}}
                />
                {dateErr && <p style={{ color: 'red' }}>Please Select Date</p>}
                <Input className="input" type='number' placeholder='Enter Your Expense' size='lg' onChange={(e)=>{setExpense(e.target.value)}} />
                {expenseErr && <p style={{ color: 'red' }}>Please Enter Expense</p>}
                <Select
                    placeholder="Select Expense Type"
                    options={options}
                    styles={customStyles}   
                    className="input select"
                    onChange={handleSelect}
                    size='lg'
                />
                {expenseTypeErr && <p style={{ color: 'red' }}>Please Select Expense Type</p>}
                <Button bg='var(--primary-color)' color='white' size='lg' mt='4' mb='4' pr='14' pl='14' _hover={{
                    background: "white",
                    color: "var(--primary-color)",
                    border: '1px',
                    borderColor: 'var(--primary-color)'
                }}
                    onClick={handleSubmit}
                >Submit</Button>
            </div>
        </div>
    )
}

export default Personal;
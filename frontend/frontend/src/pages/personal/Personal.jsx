import React from "react";
import './personal.css'
import { useState } from "react";
import axios from 'axios'
import Select from 'react-select';
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
    const api = "http://localhost:8080/expensetracker/expense"

    const handleSelect = (selectedOption)=>{
        setExpenseType(selectedOption.value);
    }

    const handleSubmit = ()=>{
        console.log('submit');
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
                <Input className="input" type='number' placeholder='Enter Your Expense' size='lg' onChange={(e)=>{setExpense(e.target.value)}} />
                <Select
                    placeholder="Select Expense Type"
                    options={options}
                    styles={customStyles}   
                    className="input select"
                    onChange={handleSelect}
                    size='lg'
                />
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
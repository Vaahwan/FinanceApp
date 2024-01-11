import React, { useEffect } from "react";
import './netwealth.css'
import { useState } from "react";
import axios from 'axios'
import { useJwt } from 'react-jwt'
import { Outlet, NavLink } from "react-router-dom";
import { Heading, FormErrorMessage, FormControl } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
// import ExpenseTable from "../../component/ExpenseTable";


const Netwealth = ({ refresh, setRefresh }) => {
    const [date, setDate] = useState("");
    const [saving, setSaving] = useState("");
    const [demat,setDemat] = useState("");
    const [stock,setStock] = useState("");
    const [dateErr,setDateErr] = useState(false);
    const [savingErr,setSavingErr] = useState(false);
    const [dematErr,setDematErr] = useState(false);
    const [stockErr,setStockErr] = useState(false);
    const api = "http://localhost:8080/netwealthtracker/netwealth"
    const jwtpassword = 'vaahwan'
    const jwtToken = localStorage.getItem('jwtToken');
    const { decodedToken, isExpired } = useJwt(jwtToken);

   

    useEffect(() => {
        console.log('refresh')
    }, [refresh])

    const handleSubmit = async () => {
        if(date==""){
            setDateErr(true);
            setTimeout(()=>{
                setDateErr(false);
            },3000)
        }
        if(saving==""){
            setSavingErr(true);
            setTimeout(()=>{
                setSavingErr(false);
            },3000)
        }
        if(demat==""){
            setDematErr(true);
            setTimeout(()=>{
                setDematErr(false); 
            },3000)
        }
        if(stock==""){
            setStockErr(true);
            setTimeout(()=>{
                setStockErr(false);
            },3000)
        }

        const netwealthObj = {
            date : date,
            saving : Number(saving),
            demat : Number(demat),
            stock : Number(stock)
        }

        const response = await axios.post(api,netwealthObj,{
            headers:{
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        console.log(response);
    }

    return (
        <div className="container">
            <div className="form-container">
                <Heading mb={4} >Enter These Details</Heading>
                
                <FormControl isInvalid={dateErr} >
                    <Input
                        placeholder="Select Date and Time"
                        size="lg"
                        type="datetime-local"
                        className="input"
                        onChange={(e) => { setDate(e.target.value) }}
                    />
                    {/* <p style={{ color: 'red' }}>Please Select Date</p> */}
                    {dateErr ? <FormErrorMessage> Please Select Date </FormErrorMessage> : null}
                </FormControl>

                <FormControl isInvalid={savingErr} >
                    <Input className="input" type='number' placeholder='Amount In Saving Accounts' size='lg' onChange={(e) => { setSaving(e.target.value) }} />
                    {savingErr ? <FormErrorMessage> Please Enter Savings </FormErrorMessage> : null}
                </FormControl>

                <FormControl isInvalid={dematErr} >
                    <Input className="input" type='number' placeholder='Amount In Demat Accounts' size='lg' onChange={(e) => { setDemat(e.target.value) }} />
                    {dematErr ? <FormErrorMessage> Please Enter Expense </FormErrorMessage> : null}
                </FormControl>

                <FormControl isInvalid={stockErr} >
                    <Input className="input" type='number' placeholder='Amount Invested In Stocks' size='lg' onChange={(e) => { setStock(e.target.value) }} />
                    {stockErr ? <FormErrorMessage> Please Enter Expense </FormErrorMessage> : null}
                </FormControl>

                <Button bg='var(--primary-color)' color='white' size='lg' mt='4' mb='4' pr='14' pl='14' _hover={{
                    background: "white",
                    color: "var(--primary-color)",
                    border: '1px',
                    borderColor: 'var(--primary-color)'
                }}
                    onClick={handleSubmit}
                >Submit</Button>

            </div>
            <div className="table-container">
                <nav className="expense-navmenu">
                    <NavLink to='/netwealth' className='expense-home' >
                        <span className="expense-span">TABLE</span>
                    </NavLink>
                    <NavLink to='/netwealth/charts' className='expense-home' >
                        <span className="expense-span">CHARTS</span>
                    </NavLink>
                </nav>
                <Outlet refresh={refresh} />
            </div>


        </div>
    )
}

export default Netwealth;
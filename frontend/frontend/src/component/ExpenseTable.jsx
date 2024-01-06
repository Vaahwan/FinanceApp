import React, { useEffect, useState } from "react";
import axios from 'axios'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
} from '@chakra-ui/react'

const ExpenseTable = ({refresh}) => {
    const [data, setData] = useState([]);
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
        setData(response.data)
        console.log(response);
    }

    console.log(data);

    return (
        <div>
            <Heading mb='10' >Your Previous Expense</Heading>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Expense</Th>
                            <Th isNumeric>Expense On</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((elem, id) => {
                                return <Tr key={id}>
                                    <Td>{elem.date}</Td>
                                    <Td>{elem.expense}</Td>
                                    <Td isNumeric>{elem.expenseType}</Td>
                                </Tr>
                            })
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ExpenseTable
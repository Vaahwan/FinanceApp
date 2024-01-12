import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Loader from "react-js-loader";
import axios from "axios";

const NetwealthTable = ()=>{
    const [data,setData] = useState([]);
    const api = `http://localhost:8080/netwealthtracker/netwealth`
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(()=>{
        fetchedata();
    },[])

    const fetchedata = async()=>{
        const response = await axios.get(api,{
            headers:{
                Authorization: `Bearer ${jwtToken}`
            }
        })
        setData(response.data);
    }

    console.log(data)

    const converDateFormat = (inputDate) => {
        let dateObj = new Date(inputDate);
        let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();
        let formattedDate = month + '/' + year;
        return formattedDate;
    }

    return(
        <div>
            {data.length>0?
                <div>
                    <Heading mb='10' >Your Previous Expense</Heading>
                    <TableContainer>
                        <Table variant='simple'>
                            <TableCaption>Your all the past expenses</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Date</Th>
                                    <Th>Total</Th>
                                    <Th >Change</Th>
                                    <Th></Th>
                                    {/* <Th>Edit/Delete</Th> */}
                                </Tr>
                                
                            </Thead>
                            <Tbody>
                                {
                                    data.map((elem, id,array) => {
                                        console.log(array.length)
                                        const prevTotal = id < array.length && array.total ? array[id + 1].total : 0;
                                        return <Tr key={id}>
                                            <Td>{converDateFormat(elem.date)}</Td>
                                            <Td>₹ {elem.total}</Td>
                                            <Td mr={4} >{prevTotal}</Td>
                                            <td onClick={() => { handleModal(elem) }} > <EditIcon /> </td>
                                            <td onClick={() => { handleDelete(elem) }} > <DeleteIcon /> </td>
                                        </Tr>
                                    })
                                }
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Date</Th>
                                    <Th>Total</Th>
                                    <Th >Change</Th>
                                    {/* <Th>done</Th> */}
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </div>
                : <Loader type="bubble-scale" bgColor="var(--primary-color)" color="var(--secondary-color)" size={50} />
            }
        </div>
    )
}

export default NetwealthTable;
import React, { useEffect, useState } from "react";
import axios from 'axios'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,Heading, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const ExpenseTable = ({ refresh,setRefresh }) => {
    const [data, setData] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
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

    const handleEdit = async (elem) => {
        // console.log(elem)
        const editObj = {
            date: elem.date,
            month: elem.month,
            year: elem.year,
            expense: elem.expense,
            expenseType: elem.expenseType
        }
        const editurl = `http://localhost:8080/expensetracker/expense/${elem._id}`
        const response = await axios.put(editurl, editObj, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        
    }

    const handleDelete = async(elem)=>{
        const deleteurl = `http://localhost:8080/expensetracker/expense/${elem._id}`
        const response = await axios.delete(deleteurl,{
            headers:{
                Authorization: `Bearer ${jwtToken}`
            }
        });
        setRefresh(!refresh);
    }

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
                            <Th >Expense On</Th>
                            <Th></Th>
                            {/* <Th>Edit/Delete</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((elem, id) => {
                                return <Tr key={id}>
                                    <Td>{elem.date}</Td>
                                    <Td>{elem.expense}</Td>
                                    <Td mr={4} >{elem.expenseType}</Td>
                                    <td onClick={() => { setModalOpen(true) }} > <EditIcon /> </td>
                                    <td onClick={()=>{handleDelete(elem)}} > <DeleteIcon /> </td>
                                </Tr>
                            })
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Expense</Th>
                            <Th >Expense on</Th>
                            {/* <Th>done</Th> */}
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>

            <Modal isOpen={modalOpen} onClose={()=>{setModalOpen(false)}}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>hello world</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>{setModalOpen(false)}}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ExpenseTable;
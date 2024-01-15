import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Loader from "react-js-loader";
import axios from "axios";

const NetwealthTable = ({refresh,setRefresh})=>{
    const [data,setData] = useState([]);
    const [modalOpen,setModalOpen] = useState(false)
    const api = `http://localhost:8080/netwealthtracker/netwealth`
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(()=>{
        fetchedata();
    },[refresh])

    const fetchedata = async()=>{
        const response = await axios.get(api,{
            headers:{
                Authorization: `Bearer ${jwtToken}`
            }
        })
        const sortedArray = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(sortedArray)
        setData(sortedArray);
    }

    const handleDelete = async(elem)=>{
        const deleteurl = `http://localhost:8080/netwealthtracker/netwealth/${elem._id}`
        const response = await axios.delete(deleteurl, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
        setRefresh(!refresh);
    }

    const handleModal = ()=>{
        setModalOpen(true)
    }

    const converDateFormat = (inputDate) => {
        let dateObj = new Date(inputDate);
        let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();
        let formattedDate = month + '/' + year;
        return formattedDate;
    }

    const calculateChange = (curr,prev)=>{
        const diff = curr - prev;
        const point = diff/prev;
        const percent = Math.round(point*100);
        return percent
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
                                        const prevTotal = id < array.length-1 && array[id+1].total ? array[id + 1].total : 0;
                                        const percent = calculateChange(elem.total,prevTotal);
                                        return <Tr key={id}>
                                            <Td>{converDateFormat(elem.date)}</Td>
                                            <Td>₹ {elem.total}</Td>
                                            <Td color={percent>0?'green':'red'} mr={4} >{ percent>0?  <ArrowUpIcon/> : <ArrowDownIcon/> } {Math.abs(percent)}%</Td>
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

                    <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false) }}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <div className="form-container">
                                    <Heading mb={4} >Edit Your Expense</Heading>
                                    <Input
                                        placeholder="Select Date and Time"
                                        size="lg"
                                        type="datetime-local"
                                        className="input"
                                        value={date}
                                        onChange={(e) => { setDate(e.target.value) }}
                                    />
                                    {/* {dateErr && <p style={{ color: 'red' }}>Please Select Date</p>} */}
                                    <Input className="input" type='number' placeholder='Enter Your Expense' size='lg' value={expense} onChange={(e) => { setExpense(e.target.value) }} />
                                    {/* {expenseErr && <p style={{ color: 'red' }}>Please Enter Expense</p>} */}
                                    
                                    {/* {expenseTypeErr && <p style={{ color: 'red' }}>Please Select Expense Type</p>} */}

                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button bg='var(--primary-color)' color='white' size='lg' mt='4' mb='4' pr='14' pl='14' _hover={{
                                    background: "white",
                                    color: "var(--primary-color)",
                                    border: '1px',
                                    borderColor: 'var(--primary-color)'
                                }}
                                    mr={3}
                                    onClick={() => { setModalOpen(false) }}>
                                    Close
                                </Button>
                                <Button variant='ghost'
                                    bg='var(--primary-color)' color='white' size='lg' mt='4' mb='4' pr='14' pl='14' _hover={{
                                        background: "white",
                                        color: "var(--primary-color)",
                                        border: '1px',
                                        borderColor: 'var(--primary-color)'
                                    }}
                                    onClick={() => { handleEdit() }}
                                >Submit</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
                : <Loader type="bubble-scale" bgColor="var(--primary-color)" color="var(--secondary-color)" size={50} />
            }
        </div>
    )
}

export default NetwealthTable;
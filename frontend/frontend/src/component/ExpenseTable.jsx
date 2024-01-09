import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import Select from 'react-select';


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


const ExpenseTable = ({ refresh, setRefresh }) => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
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

    const handleDelete = async (elem) => {
        const deleteurl = `http://localhost:8080/expensetracker/expense/${elem._id}`
        const response = await axios.delete(deleteurl, {
            headers: {
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
                                    <td onClick={() => { handleDelete(elem) }} > <DeleteIcon /> </td>
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
                                onChange={(e) => {}}
                            />
                            {/* {dateErr && <p style={{ color: 'red' }}>Please Select Date</p>} */}
                            <Input className="input" type='number' placeholder='Enter Your Expense' size='lg' onChange={(e) => {  }} />
                            {/* {expenseErr && <p style={{ color: 'red' }}>Please Enter Expense</p>} */}
                            <Select
                                placeholder="Select Expense Type"
                                options={options}
                                styles={customStyles}
                                className="input select"
                                // onChange={handleSelect}
                                size='lg'
                            />
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
                        >Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ExpenseTable;
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Select from 'react-select';


const options = [
    { value: 'Food', label: 'Food' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Rent', label: 'Rent' },
    { value: 'EMI', label: 'EMI' },
    { value: 'Entertaitment', label: 'Entertaitment' },
    { value: 'Bills', label: 'Bills' },
    { value: 'Eatout', label: 'Eatout' },
    { value: 'Investment', label: 'Investment' }
];

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'var(--primary-color)' : 'white',
        color: state.isFocused ? 'var(--secondary-color)' : 'var(--primary-color)'
    }),
};


const ExpenseTable = ({ refresh, setRefresh, pageno, setPageno }) => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const url = `http://localhost:8080/expensetracker/expenses?page=${pageno}&size=10`;
    const jwtToken = localStorage.getItem('jwtToken');
    const [date, setDate] = useState();
    const [expense, setExpense] = useState();
    const [expenseType, setExpenseType] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [editId, setEditId] = useState();
    const [dateErr, setDateErr] = useState(false);
    const [expenseErr, setExpenseErr] = useState(false);
    const [expenseTypeErr, setExpenseTypeErr] = useState(false);

    useEffect(() => {
        fetchedata()
    }, [refresh,pageno])

    const fetchedata = async () => {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        setData(response.data)
    }

    const converDateFormat = (inputDate) => {
        let dateObj = new Date(inputDate);
        let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();
        let formattedDate = day + '/' + month + '/' + year;
        return formattedDate;
    }

    const handleSelect = (selectedOption) => {
        setExpenseType(selectedOption.value);
    }

    const handleModal = (elem) => {
        setDate(elem.date);
        setExpense(elem.expense);
        setExpenseType(elem.expenseType);
        setMonth(elem.month);
        setYear(elem.year);
        setEditId(elem._id);
        setModalOpen(true)
    }

    const handleEdit = async (elem) => {
        const editObj = {
            date: date,
            month: month,
            year: year,
            expense: Number(expense),
            expenseType: expenseType
        }
        const editurl = `http://localhost:8080/expensetracker/expense/${editId}`
        const response = await axios.put(editurl, editObj, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        setRefresh(!refresh)
        setModalOpen(false);
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
                    <TableCaption>Your all the past expenses</TableCaption>
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
                                    <Td>{converDateFormat(elem.date)}</Td>
                                    <Td>{elem.expense}</Td>
                                    <Td mr={4} >{elem.expenseType}</Td>
                                    <td onClick={() => { handleModal(elem) }} > <EditIcon /> </td>
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
            <div>
                <Button variant='ghost'
                    bg='var(--primary-color)' color='white' size='sm' mt='4' mb='4' pr='14' pl='14' _hover={{
                        background: "white",
                        color: "var(--primary-color)",
                        border: '1px',
                        borderColor: 'var(--primary-color)'
                    }}
                    onClick={() => { pageno>1? setPageno(pageno-1) : null }}
                ><ArrowLeftIcon/></Button>
                <Button variant=''
                    bg='var(--secondary-color)' color='var(--primary-color)' size='lg' mt='4' mb='4' pr='14' pl='14' >{pageno}</Button>
                <Button variant='ghost'
                    bg='var(--primary-color)' color='white' size='sm' mt='4' mb='4' pr='14' pl='14' _hover={{
                        background: "white",
                        color: "var(--primary-color)",
                        border: '1px',
                        borderColor: 'var(--primary-color)'
                    }}
                    onClick={() => { setPageno(pageno+1) }}
                ><ArrowRightIcon/></Button>
            </div>

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
                            <Select
                                placeholder="Select Expense Type"
                                options={options}
                                styles={customStyles}
                                className="input select"
                                // value={expenseType}
                                onChange={(e) => { handleSelect }}
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
                            onClick={() => { handleEdit() }}
                        >Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ExpenseTable;
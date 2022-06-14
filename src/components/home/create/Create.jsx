import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import API from '../../../hooks/API'

function Create({handleClose, setAtt}) {

    const [customer, setCustomer] = useState([{
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        carrer: ""
    }])

    const createCostumer = () => {
        const data = {
            firstName: customer.firstName,
            lastName: customer.lastName,
            birthDate: customer.birthDate,
            email: customer.email,
            carrer: customer.carrer,
        }
        API.post('', data).then( (res) => {
            if(res.status === 201){
                    setAtt(true)
                    handleClose(false)
            }else{
                console.log(res)
            }
        })
    }

    const styleDialog = {display: 'flex', flexDirection: 'column', width: 350}
    const inputStyle = {marginBottom: 10}

    return (
        <div>
            <form>
                <DialogTitle>Adcionar Cliente</DialogTitle>
                <DialogContent style={styleDialog}>
                    <TextField style={inputStyle} label="Nome" onChange={(e) => setCustomer({...customer, firstName: e.target.value})} ></TextField>
                    <TextField style={inputStyle} label="Sobrenome" onChange={(e) => setCustomer({...customer, lastName: e.target.value})} ></TextField>
                    <TextField style={inputStyle} onChange={(e) => setCustomer({...customer, birthDate: e.target.value})} type="date"></TextField>
                    <TextField style={inputStyle} label="Email" onChange={(e) => setCustomer({...customer, email: e.target.value})} type="email"></TextField>
                    <TextField style={inputStyle} label="Profissão" onChange={(e) => setCustomer({...customer, carrer: e.target.value})} ></TextField>
                </DialogContent>
                <DialogActions style={{display: 'flex', justifyContent: 'space-between', margin: '0 20px 20px 20px'}}>
                    <Button variant='contained' color='success' onClick={createCostumer}>Adicionar</Button>
                    <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </form>
        </div>
    )
}

export default Create
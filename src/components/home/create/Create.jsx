import { Alert, Button, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import API from '../../../hooks/API'

function Create({handleClose, setAtt}) {

    const [costumer, setCostumer] = useState([{
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        carrer: ""
    }])

    const createCostumer = () => {
        const data = {
            firstName: costumer.firstName,
            lastName: costumer.lastName,
            birthDate: costumer.birthDate,
            email: costumer.email,
            carrer: costumer.carrer,
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
                    <TextField style={inputStyle} label="Nome" onChange={(e) => setCostumer({...costumer, firstName: e.target.value})} ></TextField>
                    <TextField style={inputStyle} label="Sobrenome" onChange={(e) => setCostumer({...costumer, lastName: e.target.value})} ></TextField>
                    <TextField style={inputStyle} onChange={(e) => setCostumer({...costumer, birthDate: e.target.value})} type="date"></TextField>
                    <TextField style={inputStyle} label="Email" onChange={(e) => setCostumer({...costumer, email: e.target.value})} type="email"></TextField>
                    <TextField style={inputStyle} label="Profissão" onChange={(e) => setCostumer({...costumer, carrer: e.target.value})} ></TextField>
                </DialogContent>
                <DialogActions style={{display: 'flex', justifyContent: 'space-between', margin: '0 20px 20px 20px'}}>
                    <Button variant='contained' color='success' onClick={createCostumer}>Adicionar</Button>
                    <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </form>

            <Snackbar autoHideDuration={6000} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Erro!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Create
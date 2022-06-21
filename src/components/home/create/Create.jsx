import React, { useState } from 'react'

//Material
import { Alert, Button, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material'

//Hooks
import { useForm } from 'react-hook-form'
import API from '../../../hooks/API'

function Create({ handleClose, setAtt}) {

    const { register, handleSubmit } = useForm()
    const [openError, setOpenError] = useState(false)
    const createCostumer = (e) => {
        console.log(e)
        API.post('', e).then((res) => {
            if (res.status === 201) {
                setAtt(true)
                handleClose(false)
            }
        }).catch(err => {
            console.error(err)
            setOpenError(true)
        })
    }

    const styleDialog = { display: 'flex', flexDirection: 'column', width: 350 }
    const inputStyle = { marginBottom: 10 }

    return (
        <>
            <form onSubmit={handleSubmit(createCostumer)}>
                <DialogTitle>Adcionar Cliente</DialogTitle>
                <DialogContent style={styleDialog}>
                    <TextField style={inputStyle} {...register('firstName', { required: true })} label="Nome" ></TextField>
                    <TextField style={inputStyle} {...register('lastName', { required: true })} label="Sobrenome" ></TextField>
                    <TextField style={inputStyle} {...register('birthDate', { required: true })} type="date"></TextField>
                    <TextField style={inputStyle} {...register('email', { required: true })} label="Email" type="email"></TextField>
                    <TextField style={inputStyle} {...register('carrer', { required: true })} label="Profissão" ></TextField>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'space-between', margin: '0 20px 20px 20px' }}>
                    <Button variant='contained' type='submit' color='success'>Adicionar</Button>
                    <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </form>

            <Snackbar open={openError} autoHideDuration={6000} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Erro! Os campos não podem ser vazios.
                </Alert>
            </Snackbar>

        </>
    )
}

export default Create
import React, { useEffect, useState } from 'react'
import { Alert, Button, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, Typography } from '@mui/material'
import API from '../../../hooks/API'

function Edit({id, handleClose, setAtt}) {

  const [open, setOpen] = useState(false)
  const [customerId, setCustomersId] = useState([{
    id: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    carrer: "",
    email: ""
  }])
  const ID = id
  let customer = customerId

  const getCustomersId = async () => {
    const res = await API.get(`/${ID}`)
    return res.data
  }

  useEffect(() => {
    const readCustomersId = async () => {
      const idCustomers = await getCustomersId()
      if (idCustomers) setCustomersId(idCustomers)
    }

    readCustomersId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const putCustomer = () => {
    ;
    const data = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      birthDate: customer.birthDate,
      carrer: customer.carrer,
      email: customer.email
    }
    
    API.put(`/${ID}`, data).then((res) => {
      if (res.status === 200) {
        setAtt(true)
        handleClose(false)
      }if(res.status === 400 && res.status === 415) {
        setOpen(true)
      }
    })
  }
  const styleDialog = {display: 'flex', flexDirection: 'column', width: 350}
  const inputStyle = {marginBottom: 10}
  return(
    <div>
      <form>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent style={styleDialog}>
          <Typography>Nome:</Typography>
          <TextField style={inputStyle} value={customer.firstName} onChange={(e) => setCustomersId({ ...customer, firstName: e.target.value })} />
          <Typography>Sobrenome:</Typography>
          <TextField style={inputStyle} value={customer.lastName} onChange={(e) => setCustomersId({ ...customer, lastName: e.target.value })} />
          <Typography>Data:</Typography>
          <TextField style={inputStyle} value={customer.birthDate} onChange={(e) => setCustomersId({ ...customer, birthDate: e.target.value })} type="date" />
          <Typography>E-Mail:</Typography>
          <TextField style={inputStyle} value={customer.email} onChange={(e) => setCustomersId({ ...customer, email: e.target.value })} />
          <Typography>Profissão:</Typography>
          <TextField value={customer.carrer} onChange={(e) => setCustomersId({ ...customer, carrer: e.target.value })} />
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'space-between', margin: '0 20px 20px 20px'}}>
          <Button variant='contained' color='success' onClick={putCustomer}>Editar</Button>
          <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </form>

      <Snackbar open={open} autoHideDuration={6000} >
        <Alert severity="error" sx={{ width: '100%' }}>
          Erro!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Edit
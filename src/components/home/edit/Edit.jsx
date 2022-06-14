import React, { useEffect, useState } from 'react'
import { Alert, Button, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, Typography } from '@mui/material'
import API from '../../../hooks/API'

function Edit({id, handleClose, setAtt}) {

  const [open, setOpen] = useState(false)
  const [costumerId, setCostumersId] = useState([{
    id: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    carrer: "",
    email: ""
  }])
  const ID = id
  let costumer = costumerId

  const getCostumersId = async () => {
    const res = await API.get(`/${ID}`)
    return res.data
  }

  useEffect(() => {
    const readCostumersId = async () => {
      const idCostumers = await getCostumersId()
      if (idCostumers) setCostumersId(idCostumers)
    }

    readCostumersId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const putCostumer = () => {
    ;
    const data = {
      firstName: costumer.firstName,
      lastName: costumer.lastName,
      birthDate: costumer.birthDate,
      carrer: costumer.carrer,
      email: costumer.email
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
          <TextField style={inputStyle} value={costumer.firstName} onChange={(e) => setCostumersId({ ...costumer, firstName: e.target.value })} />
          <Typography>Sobrenome:</Typography>
          <TextField style={inputStyle} value={costumer.lastName} onChange={(e) => setCostumersId({ ...costumer, lastName: e.target.value })} />
          <Typography>Data:</Typography>
          <TextField style={inputStyle} value={costumer.birthDate} onChange={(e) => setCostumersId({ ...costumer, birthDate: e.target.value })} type="date" />
          <Typography>E-Mail:</Typography>
          <TextField style={inputStyle} value={costumer.email} onChange={(e) => setCostumersId({ ...costumer, email: e.target.value })} />
          <Typography>Profissão:</Typography>
          <TextField value={costumer.carrer} onChange={(e) => setCostumersId({ ...costumer, carrer: e.target.value })} />
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'space-between', margin: '0 20px 20px 20px'}}>
          <Button variant='contained' color='success' onClick={putCostumer}>Editar</Button>
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
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import API from '../../../hooks/API'

export default function Delete({id, handleClose, setAtt}) {
  const ID = id
  const handleDelete = () => {
    API.delete(`/${ID}`).then( res => {
      setAtt(true)
      handleClose(false)
    })
  }

  return (
    <div>
      <DialogTitle>Deletar</DialogTitle>
      <DialogContent>O cliente será excluido permanentemente </DialogContent>
      <DialogActions style={{display: 'flex', justifyContent: 'space-between', margin: '0 10px 0 10px'}}>
        <Button variant='contained' color='error' onClick={handleDelete}>Deletar</Button>
        <Button variant='contained' onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </div>
  )
}

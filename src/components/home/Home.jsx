import { Toolbar, Container, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, TableSortLabel, TextField, Autocomplete, AppBar, Typography, LinearProgress, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import API from "../../hooks/API"
import Edit from "./edit/Edit"
import Create from './create/Create';
import Delete from './delete/Delete';

export default function Home() {

  //States
  const [customers, setCustomers] = useState([])
  const [elements, setElements] = useState("")
  const [pages, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [att, setAtt] = useState(false)
  const [id, setId] = useState(0)
  const [sort, setSort] = useState("")
  const [direction, setDirection] = useState("asc")
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false)
  const [value] = useState();
  const [filter, setFilter] = useState("firstName")
  const [inputSearch, setInputSearch] = useState("")
  const [search, setSearch] = useState("")
  const [openDelete, setOpenDelete] = useState(false)
  const [status, setStatus] = useState()
  const [loading, setLoading] = useState(false)

  //Métodos
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    setAtt(true)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setAtt(true)
  };

  const handleDialogEdit = (e) => {
    setOpenEdit(true);
    setId(e)
  }

  const handleDialogDelete = (e) => {
    setOpenDelete(true)
    setId(e)
  }

  const handleClose = () => {
    setOpenEdit(false)
    setOpenCreate(false)
    setOpenDelete(false)
  }

  const handleSortBy = (e) => {
    if (direction === "asc") setDirection("desc")
    if (direction === "desc") setDirection("asc")
    setSort(e)
    setAtt(true)
  }

  const changeFilter = (e) => {
    if (e === "Nome" || e === null) setFilter('firtName')
    if (e === "Profissão") setFilter("carrer")
    setAtt(true)
  }

  const changeSearch = (e) => {
    setInputSearch(e.target.value)
  }

  const submitSearch = () => {
    setSearch(inputSearch)
    setAtt(true)
  }

  //Hooks
  useEffect(() => {
    let size = rowsPerPage
    let page = pages
    API.get(`?page=${page}&size=${size}&sort=${sort}&direction=${direction}&${filter}=${search}`).then(res => {
      if (res.status === 200) {
        setLoading(true)
        setElements(res.data.totalElements)
        setCustomers(res.data.content)
        setStatus(res.status)
      }
    })
    setAtt(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [att])


  // Variaveis
  const rows = customers
  const filterOptions = ['Nome', 'Profissão']

  //Css
  const styleSearch = { display: 'flex', marginTop: 50 }
  const styleCreate = { marginTop: 10, display: 'flex', justifyContent: 'space-between', background: "#0288d1" }

  return (
    <>
      <Container maxWidth="xl" style={{ minHeight: '100vh' }}>
        <AppBar>
          <Toolbar style={{ minHeight: 40 }}>
            <Typography>My Customers</Typography>
          </Toolbar>
        </AppBar>

            <div style={styleSearch}>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  changeFilter(newValue);
                }}
                options={filterOptions}
                renderInput={(params) => <TextField {...params} />}
                sx={{ minWidth: 150, marginRight: 2 }}
              />
              <TextField onChange={changeSearch} sx={{ marginRight: 2 }}></TextField>
              <Button variant="contained" color="primary" onClick={submitSearch} >Procurar</Button>
            </div>
            <Toolbar style={styleCreate}>
              <Typography sx={{ color: '#fff' }}>Tabela de Clientes</Typography>
              <Button variant="outlined" sx={{ border: '1px solid #fff', color: '#fff' }} onClick={() => setOpenCreate(true)}>Adcionar Cliente</Button>
            </Toolbar>
            <TableContainer component={Paper}>
                {
                  status === 200 &&
                  <Table sx={{ minWidth: 650 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell >
                        <TableSortLabel onClick={() => handleSortBy("id")} direction={direction} />Id
                      </TableCell>
                      <TableCell >
                        <TableSortLabel onClick={() => handleSortBy("firstName")} direction={direction} />Nome
                      </TableCell>
                      <TableCell >
                        <TableSortLabel onClick={() => handleSortBy("lastName")} direction={direction} />Sobrenome
                      </TableCell>
                      <TableCell >
                        <TableSortLabel onClick={() => handleSortBy("carrer")} direction={direction} />Profissão
                      </TableCell>
                      <TableCell >Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell style={{ paddingLeft: 40 }}>{row.id}</TableCell>
                        <TableCell style={{ paddingLeft: 40 }}>{row.firstName}</TableCell>
                        <TableCell style={{ paddingLeft: 40 }}>{row.lastName}</TableCell>
                        <TableCell style={{ paddingLeft: 40 }}>{row.carrer}</TableCell>
                        <TableCell >
                          <EditIcon onClick={() => handleDialogEdit(row.id)} style={{ cursor: 'pointer', color: 'green' }} />
                          <DeleteForeverIcon onClick={() => handleDialogDelete(row.id)} style={{ cursor: 'pointer', color: 'red' }} />
                        </TableCell>
  
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                }
                {!loading &&
                 <LinearProgress color='secondary' style={{height: 10}}/>
                }

              <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={elements}
                rowsPerPage={rowsPerPage}
                page={pages}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>

      </Container>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <Edit
          id={id}
          handleClose={handleClose}
          setAtt={setAtt}
        />
      </Dialog>

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <Create
          handleClose={handleClose}
          setAtt={setAtt}
        />
      </Dialog>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <Delete
          id={id}
          handleClose={handleClose}
          setAtt={setAtt}
        />
      </Dialog>

      <AppBar style={{ position: 'relative', bottom: 0, marginTop: 40 }}>
        <Toolbar style={{ diplay: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography>Frontend desenvolvido por <a href='https://github.com/GustavoBrazThomaz' style={{ color: 'white' }}>Gustavo Braz</a></Typography>
          <Typography>Backend desenvolvido por <a href='https://github.com/rodmotta' style={{ color: 'white' }}>Rodrigo Motta</a></Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

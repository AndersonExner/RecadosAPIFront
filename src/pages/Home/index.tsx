import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputDefault, InputName } from '../../components/InputDefault';
import { ModalAttDel} from '../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {  KeyData, RecadoData, Recado } from '../../store/modules/typeStore';
import { buscarRecados, getRecadosUser, newRecado, getRecadosUserbyKey, getRecadosArquivados, atualizarState } from '../../store/modules/recados/recadosSlice';
import { useAppThemeContext } from '../../Context/ThemeContext';
import { getUserById } from '../../store/modules/userLogged/userLoggedSlice';
import CircularIndeterminate from '../../components/Loader';


export function Home(){

  //states variaveis
  const [description, setDescription] = useState('');
  const [keyBusca, setKeyBusca] = useState('');
  const [detail, setDetail] = useState('');
  const [idSelec, setIdSelec] = useState('');
  const [mode, setMode] = useState <'normal' | 'arquivado' | 'filtro' > ('normal')
  const [modeModal, setModeModal] = useState<'editarRecado' | 'deletarRecado' | 'arquivarRecado' | 'desarquivarRecado'>('editarRecado');

  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  
  //informaçoes usuario e recados
  const userLogged = useAppSelector((state) => state.userLogged);
  const respostaRecados = useAppSelector((state) => state.recados)

  const recadosRedux = useAppSelector(buscarRecados)
  
  const dispatch = useAppDispatch();
  const navigate =  useNavigate();

  const userLoggeID = () => {
    return JSON.parse(localStorage.getItem('userLoggedId') || "")
  }

  const ID = userLoggeID()

  const {toggleTheme} = useAppThemeContext()


  useEffect(
    () => {   
      if(ID === ""){
        navigate('/')
      }
    },
    [navigate, ID]
  );

  useEffect(
    
    () => {

      if(respostaRecados.loading === true){
        setLoading(true)
        console.log('carregando');
      }
  
      if(respostaRecados.loading === false){
        setLoading(false)
        console.log('carregado');
      }
    },
    [respostaRecados.loading]
  )

  useEffect(
    () => {   
      atualizar()
    },[]
  );

  const mudarInput = (value:string, key:InputName) => {
    switch(key) {
      case 'description':
        setDescription(value);
      break;
      
      case 'detail':
        setDetail(value);
      break;

      case 'key':
        setKeyBusca(value);
      break;

      default:
    }
  }

  const atualizar = () => {
  }

  const salvarRecado = () => {
    
    if(description === '' || detail === ''){
      alert('Campos vazios não são permitidos')
      return 
    }
    
    const novoRecado: RecadoData = {
      idUser: ID,
      description,
      detail,
      check: false
    }

    dispatch(newRecado(novoRecado));
    setMode('normal')
    atualizar()
    limpaCampos();
  }

  const limpaCampos = () => {
    setDescription('')
    setDetail('')
  }

    const logOut = () => {
    localStorage.setItem('userLoggedId', JSON.stringify(''))
    navigate('/') 
  }

  const editMessage = (id: string) => {
    setModeModal('editarRecado');
    setIdSelec(id);
    setOpenModal(true);  
  }

  const deleteMessage = (id: string) => {
    setModeModal('deletarRecado');
    setIdSelec(id);
    setOpenModal(true); 
  }

  const buscarArquivados = () => {
    setMode('filtro')
    dispatch(getRecadosArquivados(ID))
    setMode('arquivado')
  }

  const buscarRecadosNormais = () => {
    dispatch(getRecadosUser(ID))
    setMode('normal')
  }

  const arquivarMessage = (id: string) => {
    setModeModal('arquivarRecado');
    setIdSelec(id);
    setOpenModal(true);
  }
    
  const desarquivarMessage = (id: string) => {
    setModeModal('desarquivarRecado');
    setIdSelec(id);
    setOpenModal(true);
  }

  const buscarKey = () => {
    if(keyBusca === ""){
      dispatch(getRecadosUser(ID))
      setMode('normal')
      return
    }
  
    const chaveBuscaData: KeyData = {
      idUser: userLoggeID(),
      key: keyBusca
    }

    setKeyBusca('')
    setMode('filtro')
  
    dispatch(getRecadosUserbyKey(chaveBuscaData))
    
  }

  const handleCloseModal = () => { 
    setOpenModal(false);
    atualizar()
  }

  const imageBack = require('../../assets/image-bg4.jpg')

  const style : React.CSSProperties = {
    backgroundImage: `url(${imageBack})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (   

    <Box sx={{ flexGrow: 1}}>
      <Box style={style}>
        <Grid container justifyContent={'space-around'} pt={5} padding={2}>
          <Grid md={6} xs={12}>
            <Typography variant='h4' color='primary'>
              Bem vindo a API RECADOS.
            </Typography>
          </Grid>
          <Grid md={2} xs={12}>
            <Button variant='contained' color='primary' size='large' onClick={toggleTheme}>Mudar Tema</Button>
          </Grid>
          <Grid md={2} xs={12}>
            <Button variant='contained' color='primary' size='large' onClick={logOut}>Salvar e Sair </Button>
          </Grid>
        </Grid>  

        <Grid container justifyContent={'space-around'} alignItems={'center'} padding={2} >
          <Grid md={3} xs={12}>
            <InputDefault type='text' label='Descrição' name='description' value={description} color='primary' handleChange={mudarInput} />
          </Grid>
          <Grid md={5} xs={12} >
            <InputDefault type='text' label='Recado' name='detail' value={detail} color='primary' handleChange={mudarInput} />
          </Grid>
          <Grid md={2} xs={12}>
            <Button variant='contained' color='primary' size='large' onClick={salvarRecado}>Salvar Recado</Button>
          </Grid>
        </Grid>

        <Grid container justifyContent={'space-around'} alignItems={'center'} padding={2}>
          <Grid md={3} xs={12} >
            <InputDefault type='text' label='Buscar por Palavra Chave' name='key' value={keyBusca} color='primary' handleChange={mudarInput} />
          </Grid>
          <Grid md={2} xs={12}  >
            {mode === ('normal') && (
              <Button variant='contained' color='primary' size='large' onClick={buscarKey}>Buscar</Button>  
            )}
            {mode === ('arquivado') && (
              <Button variant='contained' color='primary' size='large' onClick={buscarKey}>Buscar</Button>  
            )}
            {mode === ('filtro') && (
              <Button variant='contained' color='primary' size='large' onClick={buscarKey}>Voltar</Button>  
            )}
          </Grid>
          <Grid md={2} xs={12}  >
            {mode === 'normal' && (
              <Button variant='contained' color='primary' size='large' onClick={buscarArquivados}>Ver Recados Arquivados</Button>
            )}

            {mode === 'arquivado' && (
              <Button variant='contained' color='primary' size='large' onClick={buscarRecadosNormais}>Ver Recados  Não Arquivados</Button>
            )}
          </Grid>
        </Grid>
      
        <Divider color='black'/>
        <Divider color='black'/>
      </Box>
      <Grid container>
        <Grid xs={12}>


          <TableContainer component={Paper}>


            <Table aria-label="simple table">
              <TableHead> 
                
                <TableRow >
                  <TableCell width={'10%'} align="center">ID</TableCell>
                  <TableCell width={'20%'} align="center">Descrição</TableCell>
                  <TableCell width={'30%'}align="center">Detalhamento</TableCell>
                  <TableCell width={'20%'}align="center">Ações</TableCell>
                </TableRow>
              </TableHead>

              {loading === true &&(
                <Box width={'100vw'} height={'50vh'} display={'flex'} justifyContent={'center'} alignContent={'center'} textAlign={'center'}>
                  <CircularIndeterminate/>
                </Box>
              )}

              {loading === false && (
              <TableBody>
                {
                  recadosRedux.map((row, index) =>  
                  <TableRow component="th" scope="row" key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.detail}</TableCell>
                    <TableCell align="center">
                      <Button color='success' variant='contained' sx={{margin: '0 15px'}} onClick={() => editMessage(row.id)}>Editar</Button>
                      <Button color='error' variant='contained' sx={{margin: '0 15px'}} onClick={() => deleteMessage(row.id)}>Apagar</Button>
                      {mode === 'normal' && (
                        <Button color='info' variant='contained' sx={{margin: '0 15px'}} onClick={() => arquivarMessage(row.id)}>Arquivar</Button>
                      )}
                      {mode === 'arquivado' && (
                        <Button color='info' variant='contained' sx={{margin: '0 15px'}} onClick={() => desarquivarMessage(row.id)}>Desarquivar</Button>
                      )}
                    </TableCell>
                  </TableRow>
                  )}

              </TableBody>

              )}

            </Table>
          </TableContainer>
    
        </Grid>
      </Grid>
      <ModalAttDel mode={modeModal} id={idSelec} open={openModal} handleClose={handleCloseModal}/>
    </Box>
  )
}  
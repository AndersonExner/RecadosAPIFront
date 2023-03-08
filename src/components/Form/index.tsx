import React, {useState, useEffect} from "react";
import { InputDefault, InputName } from "../InputDefault";
import { Stack, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { buscarUsuarios, getUsers, saveNewUser } from "../../store/modules/users/usersSlice";
import { useAppThemeContext } from "../../Context/ThemeContext";
import { getUserById } from "../../store/modules/userLogged/userLoggedSlice";



export interface FormProps {
  type: 'login' | 'signup';
}

export function Form({ type }: FormProps) {

//states para dados do usuario  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

//states para erros no formulario
  const [errorName, setErrorName] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);

//variavel que recebe o retorno
  const dispatch = useAppDispatch();
  const dataUsers = useAppSelector((buscarUsuarios))

  const {toggleTheme} = useAppThemeContext()

  useEffect(() => {
    dispatch(getUsers())
    setId('')
    console.log(dataUsers);
    
  }, [dispatch])

  const selectInput = (value: string, key: InputName) => {
    switch (key) {
      case 'name':
        setName(value);
        handleValidateInput(value, key);
      break;
      
      case 'email':
        setEmail(value);
        handleValidateInput(value, key);
      break;

      case 'password':
        setPassword(value);
        handleValidateInput(value, key);
      break;

      case 'repassword':
        setRepassword(value);
        handleValidateInput(value, key);
      break;

      default:
      } 
  };

//funçao para validar campos input
  const handleValidateInput = (value: string, key: InputName) => {
    switch(key){
      case 'name':
        if(value.length < 3){
          setErrorName(true)
        }else{
          setErrorName(false)
        }
      break;
      
      case 'email':
        // eslint-disable-next-line no-useless-escape
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!value.match(regexEmail)){
          setErrorEmail(true)
        }else{
          setErrorEmail(false)
        }
      break;

      case 'password':
        if(type === 'signup') {
          if(!value || value.length < 6){
            setErrorPassword(true)
          }else{
            setErrorPassword(false)
          }
        }

          if(type === 'login') {
            if(!value){
              setErrorPassword(true)
            }else{
              setErrorPassword(false)
            }    
          }  
      break;  
      
      case 'repassword':
        if(value !== password) {
          setErrorPassword(true)
        } else {
          setErrorPassword(false)
        }
      break
    
      default:
    }
  }

  //navegaçao de páginas login/signup
  const navigate = useNavigate();

  const handleNavigate = () => {
    if(type === 'login') {
      navigate('/signup');
    }else{
      navigate('/');
    }
  }

  const createAccount = () => {
    
      if(repassword === ""){
        alert('campo nao preenchido')
      }

      if(name.length > 3 && password === repassword){
        dispatch(saveNewUser({name, email, password}))
        clearInputs();
        alert('Usuário Cadastrado! Você será redirecionado');
      }
    
      setTimeout(() => {
        navigate('/')
      }, 1000)
  }

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRepassword('');
  }

  const setId = (id:string) => {
    localStorage.setItem('userLoggedId', JSON.stringify(id))
  }

  const login = () => {
    console.log(password);
    console.log(email);
    console.log(dataUsers);
    

    const userExist = dataUsers.find((user) => user.email === email && user.password === password);

    console.log(userExist);
    
    if(!userExist) {
       const confirma = window.confirm("Usuário não cadastrado/senha inválida. Deseja cadastrar uma conta? ")

       if(confirma) {
            navigate('/signup')
       }
    }

      setId(userExist!.id)
      dispatch(getUserById(userExist!.id));
      alert("Login efetuado, voce será redirecionado...")
      setTimeout(() => {
          navigate('/home')
      }, 1000)
    }
    
  return (
    <>
      <Stack spacing={2} direction="column" sx={{ width: '100%' }} textAlign={"center"}>
        <Typography variant="h3" color="primary" paddingBottom={2}> SISTEMA DE RECADOS </Typography>

        {type === 'login' && (
          <>
            <InputDefault type="email" label="E-mail" name="email" value={email} handleChange={selectInput} color={errorEmail ? 'error' : 'primary'}/>
            <InputDefault type="password" label="Senha" name="password" value={password} handleChange={selectInput} color={errorPassword ? 'error' : 'primary'} />
            <Button variant="contained" color="primary" onClick={login}>Acessar</Button>
            <Typography color="primary" variant='subtitle2'>Não tem conta? <Typography variant='button' color='primary' sx={{ cursor: 'pointer' }} onClick={handleNavigate}>Cadastre-se</Typography></Typography>
          </>
        )}
        {type === 'signup' && (
          <>
            <InputDefault type="text" label="Nome" name="name" color={errorName ? 'error' : 'primary'} value={name} handleChange={selectInput} />
            <InputDefault type="email" label="Email" name="email" color={errorEmail ? 'error' : 'primary'} value={email} handleChange={selectInput} />
            <InputDefault type="password" label="Senha" name="password" color={errorPassword ? 'error' : 'primary'} value={password} handleChange={selectInput} />
            <InputDefault type="password" label="Repita a Senha" name="repassword" color={errorPassword ? 'error' : 'primary'} value={repassword} handleChange={selectInput} />
            <Button disabled={errorName || errorEmail || errorPassword} variant='contained' color='primary' onClick={createAccount}>Criar Conta</Button>
            <Typography color='primary' variant='subtitle2'>Já tem conta? <Typography variant='button' color='primary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Fazer Login</Typography></Typography>
          </>
        )}
      </Stack>
      
    </>
  )
}
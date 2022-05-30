import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import styled from 'styled-components'
import UserContext from "../contexts/UserContext";
import logo from '../imagens/LogoTrackit.png'
import { Navigate } from "react-router-dom"
import Home from './Home'
import { ThreeDots } from "react-loader-spinner";

export default function Cadastro(){

    const URL_CADASTRO='https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';
    const [carregando, setCarregando]=React.useState(false)
    const[cadastroUsuario,setCadastroUsuario]=React.useState({
        email: "",
        name: "",
        image: "",
        password: ""
        
    })

    const navigate=useNavigate()

    function cadastrar(event){
        event.preventDefault()

        setCarregando(true);
        const promise=axios.post(URL_CADASTRO,cadastroUsuario,cadastroUsuario);
        promise.then((response)=>{
            console.log('funfou');
            navigate('/')
        })
        promise.catch((response)=>{
            alert('Não foi possível cadastrar. Tente mais tarde');
            setCarregando(false);
        })
    }
 

    return(
        <Container>
            <img src={logo} alt='logo'/>
            <form onSubmit={cadastrar}>
                <input placeholder='email'  id="email" onChange={(event)=>setCadastroUsuario({...cadastroUsuario,email:event.target.value})}  required type='email' />
                <input placeholder='senha' id="password" onChange={(event)=>setCadastroUsuario({...cadastroUsuario,password:event.target.value})} required type='text' />
                <input placeholder='nome'  id="name" onChange={(event)=>setCadastroUsuario({...cadastroUsuario,name:event.target.value})} required type='text' />
                <input placeholder='foto' id="foto" onChange={(event)=>setCadastroUsuario({...cadastroUsuario,image:event.target.value})} required type='text' />
                <button type='submit'>{carregando ? <ThreeDots color='#FFF' height='13px' width='51px'/>:<div>Cadatrar</div>}</button>
            </form>

            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Container>
    )
}

const Container = styled.div`
  
    input{
        color: #666666;
        border: 1px solid #D4D4D4;
        width:90%;
        margin: 0 auto 18px;
        font-size:18px;
        padding:16px;
        border-radius:5px;
    }
    input::placeholder{
        color:#dbdbdb;
        font-sie:20px;
        border-radius: 10px;
    }
    img{
        heigth:100%;
        object-fit:cover;
        margin-left:70px;
    }
    button{
        background-color:#52B6FF;
        color:#fff;
        heigth:48px;
        padding:15px;
        width:100%;
        cursor:pointer;
    }
    p{
        color:#52B6FF;
        font-size:13.98px;
        text-align:center;
        text-decoration:none;
    }
`
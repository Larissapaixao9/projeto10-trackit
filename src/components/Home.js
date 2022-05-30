
import { ThreeDots } from "react-loader-spinner";
import Logo from '../imagens/LogoTrackit.png'
import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import styled from 'styled-components'
import Hoje from './Hoje'

//import Loading from './components/Loading.jsx'

//1) Temos que saber se o usuario está logado 
//2) Precisamos validar o usuario
//3) liberar acesso

//Para logar:
// -1) receber dados de login
// -2) Enviar requisição para banco de dados
// -3) Se tiver certo, salvamos a referencia do usuario no Bowser
// -4) Se tiver errado, avisar

export default function Home (){
    const URL_LOGIN='https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login'
    const [carregando,setCarregando]=React.useState(false)

    React.useEffect(()=>{
    //Aqui, verificamos se o valor de Token vindo da API foi armazendo. Se sim, isso quer
    //dizer que o usuário possui cadastro e pode ser redirecionado para a pagina <HOJE>
        if(localStorage.getItem('token')){
            navigate("/hoje")
        }
    },[])

    React.useEffect(()=>{
        setTimeout(()=>{
           
        },2500)
    },[])
    


    const navigate=useNavigate()

    const[loginUsuario,setLoginUsuario]=React.useState({
        email:"",
        password:""
    })

    function Enviar(e){
        e.preventDefault();
        setCarregando(true)
        const promise=axios.post(URL_LOGIN,loginUsuario)
        promise.then((response)=>{
            console.log(response.data)
          
            const DadosUsuario=response.data;

            //Armazenando os valores vindos da API através do LocalStorage
            localStorage.setItem("id",DadosUsuario.id)
            localStorage.setItem("name",DadosUsuario.name)
            localStorage.setItem("image",DadosUsuario.image)
            localStorage.setItem("token",DadosUsuario.token)

            
            navigate('/hoje')
        })

        promise.catch((response)=>{
            alert('Opa, os dados não estão corretos, amigo :(')
            setCarregando(false)
        })
    }
        
    function Handle(e){
        const newdata={...loginUsuario, email:e.target.value}
        console.log(newdata)
    }

    console.log(loginUsuario)

    return(
        <Container>
            <img src={Logo} alt='logo'/>
            <form onSubmit={Enviar}>
                <input placeholder='email'  id="email" value={
                    loginUsuario.email} onChange={(event)=>setLoginUsuario({...loginUsuario,email:event.target.value})} required type='email' />
                <input placeholder='senha' id="password" value={loginUsuario.password} onChange={(event)=>setLoginUsuario({...loginUsuario,password:event.target.value})} required type='text' />
                <button type='submit'>{carregando ? <ThreeDots color='#FFF' height='13px' width='51px'/>:<div>Entrar</div>}</button>            </form>

            <Link to="/Cadastro">
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </Container>

    )



   
}


const Container = styled.div`
  
    input{
        color: #666666;
        border: 1px solid #D4D4D4;
        width:90%;
        margin: 0 auto 20px;
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
        margin:0 20%;
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
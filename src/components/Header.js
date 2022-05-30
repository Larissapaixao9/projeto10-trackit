import { useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";

export default function Header() {


    const FotoUsuario = localStorage.getItem("image");
    const Token=localStorage.getItem('token');

    const navigate = useNavigate();

    //Função que quando ativada, vai remover o localStorage e sair do App
    function SairDoApp() {
        localStorage.removeItem("token");
        localStorage.removeItem("image");
        navigate("/");
    }
    
    return (
        <EstiloDoTopo>
            <h1>TrackIt</h1>
            <article>
                <img src={`${FotoUsuario}`} />

                <button onClick={SairDoApp}>
                    <div>

                    <div>s</div>
                    <div>a</div>
                    <div>i</div>
                    <div>r</div>
                        
                    </div>
                </button>
            </article>
        </EstiloDoTopo>
    )
}


//Estilização
const EstiloDoTopo = styled.header`
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
        color: #FFFFFF;
        font-family: 'Playball';
        font-weight: 400;
        font-size: 38.98px;
        margin-left: 15px;
    }
  
    article {
        display: flex;
        align-items: center;
    }
    
    article img {
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        margin-right: 10px;
    }
    
    article button {

        margin-right: 20px;
        width: 22px;
        height: 65px;
        border: none;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
        font-size: 12px;
        line-height: 13px;
        color: #FFFFFF;
        cursor: pointer;
        border-radius: 5px;
        background-color: #1480C7;
        font-family: 'Lexend Deca';
    }`
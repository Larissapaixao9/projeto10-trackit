import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Mostrarhabitos from "./Mostrarhabitos";
import Deletar from "./Deletar";
import Lixo from "../imagens/Lixo.png";

export default function Habitos() {
    const token = localStorage.getItem("token");

    //Variaveis de estado:
    const [cartaoHabitos, setCartaoHabitos] = useState(false);
    const [renderizaHabitos, setRenderizaHabitos] = useState([]);
    const [adicionaNovoHabito, setAdicionaNovoHabito] = useState({ name: '', days: new Map()});
    const [carregando, setCarregando] = useState(false);
    const [callUseEffect, setCallUseEffect] = useState(false);
    const [desativa, setDesativa] = useState("");

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", 
        {
        headers: {
            "Authorization": `Bearer ${token}`
            }
        });
        promise.then((response) => {

            console.log('funfou aqui')
            const DataServidor=promise.data;
        
            const { data } = response;
            setRenderizaHabitos(data);
            setCallUseEffect(false);

            MostrarTodosOsHabitos();
        })
        promise.catch((err) => {
            console.log("Deu ruim, maninho");

        })
    }, [callUseEffect])

    function VerificarHabitoExcluido(id) {
        setDesativa(id);
    }

    function MostrarTodosOsHabitos() {
        const weekDays = [
            { LetraDiaSemana: 'D', number: 0 },
            { LetraDiaSemana: 'S', number: 1 },
            { LetraDiaSemana: 'T', number: 2 },
            { LetraDiaSemana: 'Q', number: 3 },
            { LetraDiaSemana: 'Q', number: 4 },
            { LetraDiaSemana: 'S', number: 5 },
            { LetraDiaSemana: 'S', number: 6 },
        ];
        
        return renderizaHabitos.map((habit) => {
            const { id, name, days } = habit;
            return <EstiloHabitos 
                    key={id}>
                <h1>{name}</h1>
                <button onClick={() => VerificarHabitoExcluido(id)}>
                    <img src={Lixo} alt="Deletar hábito" />
                </button>

                <section>
                    {weekDays.map((day, index) => {
                        return <ThemeProvider theme={days.includes(day.number) ? invertedColor : color} key={index}>
                            <Day>{day.LetraDiaSemana}</Day>
                        </ThemeProvider>;
                    })}
                </section>
            </EstiloHabitos>
        })
    }

    const mostrar_todos_habitos = MostrarTodosOsHabitos();
    
    return (
        <Section>
            <Header />
            <Container>
                <h1>Meus hábitos</h1>
                <button onClick={() => setCartaoHabitos(!cartaoHabitos)}>+</button>
            </Container>

            <Main>
            {cartaoHabitos ? <Mostrarhabitos 
                habit={adicionaNovoHabito}
                token={token}
                carregando={carregando}
                callbackLoad={setCarregando}
                callback={setAdicionaNovoHabito}
                callbackEffect={setCallUseEffect}
                callbackTable={setCartaoHabitos}
            
            /> : " "}

            {desativa && <Deletar 
                id={desativa} 
                callbackEffect={setCallUseEffect} 
                token={token}
                callbackDelete = {setDesativa} />}

            {renderizaHabitos.length > 0 ? mostrar_todos_habitos
                : <p>Você não tem nenhum hábito cadastrado ainda.
                    Adicione um hábito para começar a trackear!</p>}
            </Main>

            <Footer />
        </Section>
    )
}

const Section = styled.section`
    background-color: #E5E5E5;
    height: 100vh;
    overflow-y: scroll;
    p {
    margin-top: 10%;
    margin-left: 10px;
    margin-right: 10px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 18px;
    color: #666666;
    }`;

const Container = styled.div`
    margin-top: 80px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 22.98px;
    color: #126BA5;
    }
    button {
    width: 40px;
    height: 35px;
    color: #FFFFFF;
    border: none;
    background: #52B6FF;
    border-radius: 5px;
    margin-right: 15px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 27px;
    line-height: 5px;
    }`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30%;
    `;

const EstiloHabitos = styled.div`
    position: relative;
    background-color: #FFFFFF;
    margin-top: 10px;
    width: 340px;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 18px;
    color: #666666;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent;
    }
    img {
        width: 14px;
        height: 16px;
    }
    h1 {
        margin: 10px;
        margin-left: 15px;
        margin-right: 30px;
    }
    section {
        margin: 10px 15px;
    }`;

    const Day = styled.div`
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-top: 8px;
        margin-right: 3px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;
        text-align: center;
        line-height: 30px;
        color: ${props => props.theme.dfColor};
        background-color: ${props => props.theme.dfBack};
    `;

    const color = {
        dfColor: "#D4D4D4",
        dfBack: "#FFFFFF"
    };

    const invertedColor = {
        dfColor: "#FFFFFF",
        dfBack: "#D4D4D4"
    };
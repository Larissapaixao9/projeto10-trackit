import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import HabitsContext from "../contexts/HabitsContext";
import Header from "./Header";
import Footer from "./Footer";
import certinho from "../imagens/certinho.png";

export default function Hoje() {
    console.log('Chegou aqui!')

    //Recebendo o token
    const token = localStorage.getItem("token");

    //Declarando as variaveis de estado escritas em ingles para impedir confusão com
    //variáveis de mesmo nome
    const [todayHabits, setTodayHabits] = useState([]);
    const { habitsPercentage, setHabitsPercentage } = useContext(HabitsContext);
    const [teste,setTeste]=React.useState(false);
    
    const [callTodayHabits, setCallTodayHabits] = useState(false);

    //Usando a biblioteca Dayjs para mostrar o dia de Hoje
    dayjs.locale('pt-br');
    require('dayjs/locale/pt-br');
    let now = dayjs();

    let DiadeHoje = dayjs(now).locale('pt-br').format('dddd, DD/MM');
    let PrimeiraLetra = DiadeHoje[0].toUpperCase();
    let final = DiadeHoje.slice(1);
    let today = PrimeiraLetra + final;

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", 
        {
        headers: {
            "Authorization": `Bearer ${token}`
            }
        });
        promise.then((response) => {
            const Dados=response.data; //
            console.log('funfou')
            setTodayHabits(Dados);

            CalcularPorcentagem();
        })
        promise.catch((err) => {
            console.log("erro", err.response.status);
        })
    }, [callTodayHabits])

    function CalcularPorcentagem() {
        const doneHabits = todayHabits.filter((habit) => habit.done === true);
        let percentage = 0;
        if (todayHabits.length > 0) {
            percentage = Math.round((doneHabits.length / todayHabits.length) * 100);
        }
        setHabitsPercentage(percentage);
    }

    function VerificaroHabito (id, done) {
        let URL="";
        
        const author = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        
        if(done){
            URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
        }else{

            URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
        }
        
        const promise = axios.post(URL, "", author);

        promise.then(() => {
            setCallTodayHabits(!callTodayHabits);
        })
        promise.catch((err) => {
            console.log("erro", err.response.status);
        })
    }

    function MostrarListaFazer() {
        return todayHabits.map((habit) => {
            const { id, name, done, currentSequence, highestSequence } = habit;
            return <FazerHabitoEstilo key={id}>
                <h2>{name}</h2>
                
                <SectionList>
                <p>Sequência atual: 
                    <SpanCurrent selected={done}>
                        {currentSequence} {currentSequence !== "0" && currentSequence !== "1" ? ' dia' : ' dias'} 
                    </SpanCurrent>
                </p>
                <p>Seu recorde: 
                    <SpanHighest currentSeq={currentSequence} highestSeq={highestSequence}>
                        {highestSequence} {highestSequence !== "0" && highestSequence !== "1" ? ' dia' : ' dias'}
                    </SpanHighest>
                </p>
                </SectionList>

                <ThemeProvider theme={done ? selectedTheme : defaultTheme}>
                    <SelecaoEstilo onClick={() => VerificaroHabito (id, done)}>
                        <img src={certinho} alt="Botão checar" />
                    </SelecaoEstilo>
                </ThemeProvider>
            </FazerHabitoEstilo>
        })
    }

    const showHabits = MostrarListaFazer();

    CalcularPorcentagem();
    
    return (
        <Section>
            <Header />
            <Container>
                <h1>{today}</h1>
                {habitsPercentage ? <p>{habitsPercentage}% dos hábitos concluídos</p> : <h2>Nenhum hábito concluído ainda</h2>}
            </Container>

            <ListadeHabitosEstilo>
                {todayHabits.length > 0 ? showHabits : <h3>Você pode criar uns hábitos bacaninhas lá na página Hábitos</h3>}
            </ListadeHabitosEstilo>
            <Footer />
        </Section>
    )
}

function CorDias(props) {
    const { selected } = props;
    if (selected) {
        return selectedTheme.dfColor;
    } else {
        return defaultDayColor.dfColor;
    }
}

function Maiorcor(currentSeq, highestSeq) {
    if (highestSeq !== 0) {
        if (currentSeq === highestSeq) {
            return selectedTheme.dfColor;
        } else {
            return defaultDayColor.dfColor;
        }
    }
}

const Section = styled.section`
    height: 100vh;
    background-color: #E5E5E5;
    overflow-y: scroll;
    h3 {
        margin-top: 10%;
        margin-left: 10px;
        margin-right: 20px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        color: #666666;
    }`;

const Container = styled.div`
    margin-top: 80px;
    margin-left: 10px;
    h1 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 22.98px;
        color: #126BA5;
    }
    h2 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #BABABA;
    }
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #8FC549;
    }`;

const ListadeHabitosEstilo = styled.div`
    margin-bottom: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FazerHabitoEstilo = styled.div`
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
    h2 {
        margin: 13px;
        margin-left: 15px;
        margin-right: 85px;
        color:#666666;
        font-family: 'Lexend Deca';
    }
    p {
        margin-left: 15px;
        font-size: 13px;
        line-height: 16px;
    }`;

const SectionList = styled.div`
    margin-bottom: 13px;
    `;

const SelecaoEstilo = styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 69px;
    height: 69px;
    border-radius: 5px;
    background-color: ${props => props.theme.dfColor};
    border: 1px solid #D4D4D4;
    text-align: center;
    line-height: 87px;
    cursor: pointer;
    img {
        width: 32px;
        height: 35px;
    }`;

const defaultTheme = {
    dfColor: '#EBEBEB'
};

const selectedTheme = {
    dfColor: '#8FC549'
};

const defaultDayColor = {
    dfColor: '#666666'
};

const SpanHighest = styled.span`
    color: ${(props) => Maiorcor(props.currentSeq, props.highestSeq)}
`;

const SpanCurrent = styled.span`
    color: ${(selected) => CorDias(selected)}
`;
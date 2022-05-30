import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import HabitsContext from "../contexts/HabitsContext";

export default function Footer() {
    const { habitsPercentage } = useContext(HabitsContext);
    const navigate = useNavigate();
    console.log('oi')
    return (
        <TopBottom>
            <div onClick={() => navigate("/habitos")}>Hábitos</div>
            <section onClick={() => navigate("/hoje")}>
                <CircularProgressbar
                value={habitsPercentage}
                text={`Hoje`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                    backgroundColor: "#52B6FF",
                    textColor: "#FFFFFF",
                    pathColor: "#FFFFFF",
                    trailColor: "transparent"
                })} />
            </section>
            <div onClick={() => navigate("/historico")}>Histórico</div>
        </TopBottom>
    )
}

const TopBottom = styled.div`
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    position: relative;
    position: fixed;
    bottom: 0px;
    left: 0px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 18px;
    color: #52B6FF;
    display: flex;
    cursor:pointer;
    justify-content: space-around;
    align-items: center;
    section {
        position: absolute;
        bottom: 15%;
        width: 91px;
        height: 91px;
        cursor:pointer;
    }
`
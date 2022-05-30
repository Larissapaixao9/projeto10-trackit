import React, { useState } from "react";
import  { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import HabitsContext from "./contexts/HabitsContext";
import Home from "./components/Home";
import Cadastro from "./components/Cadastro";
import Habitos from "./components/Habitos";
import Hoje from "./components/Hoje";
import Historico from "./components/Historico";

export default function App() {

  
    const [log,setLog]=useState(false)
    const getData = {userData, setUserData};
    const [userData, setUserData] = useState({email: "", name: "", image: "", password: ""});
    
    const [habitsPercentage, setHabitsPercentage] = useState(null);
    const getHabitsPercentage = {habitsPercentage, setHabitsPercentage};

    return (
        <UserContext.Provider value={getData}>
            <HabitsContext.Provider value={getHabitsPercentage}>

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/cadastro" element={<Cadastro />}></Route>
                        <Route path="/habitos" element={<Habitos />}></Route>
                        <Route path="/hoje" element={<Hoje />}></Route>
                        <Route path="/historico" element={<Historico />}></Route>
                    </Routes>
                </BrowserRouter>

            </HabitsContext.Provider>
        </UserContext.Provider>
    )
}

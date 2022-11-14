import React from "react";
import Header from './Header/header';
import Map from './MAPS/mapas';
import { Main } from './Main/Main';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Main />} />
                <Route
                    path="/map"
                    element={<Map />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

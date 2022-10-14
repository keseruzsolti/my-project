import { Irodaszerek } from './Irodaszerek';
import { MainPage } from './MainPage.js';
import { UpdatePage } from './UpdatePage.js';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

export function Navigate() {
    return (
        <BrowserRouter>
            <nav className='mainNav navbar-dark bg-dark'>
                <NavLink to={'/'} className="nav-item">Főoldal</NavLink>
                <NavLink to={'/Irodaszerek'} className="nav-item">Irodaszerek</NavLink>
            </nav>
            <Routes>
                <Route path='/' element={<MainPage />}></Route>
                <Route path='/Irodaszerek' element={<Irodaszerek />}></Route>
                <Route path='/Irodaszerek/:IrodaszerId' element={<UpdatePage />}></Route>
            </Routes>
        </BrowserRouter>
    );
};
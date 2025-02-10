import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './global.css';

import HomePage from './pages/HomePage';
import CreateMatchPage from './pages/CreateMatchPage';
import SearchMatchPage from './pages/SearchMatchPage';
import MatchPage from './pages/MatchPage';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/create-match' element={<CreateMatchPage/>}/>
                <Route path='/search-match' element={<SearchMatchPage/>}/>
                <Route path='/on-match' element={<MatchPage/>}/>
            </Routes>
        </Router>
    </StrictMode>
)

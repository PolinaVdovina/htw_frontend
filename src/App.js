import React from 'react';

import './App.css';
import { Routes } from './pages/Routes';
import { BrowserRouter } from 'react-router-dom';
import { AppBar } from './components/app-menu/AppBar';
import { AppMenu } from './components/app-menu/AppMenu';

function App() {
  return (
    <div className="App">
      <AppMenu title="How To Work"/>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </div>
  );
}

export default App;

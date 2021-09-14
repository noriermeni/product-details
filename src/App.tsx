import React, {FC} from 'react';
import './App.scss';
import {Routes} from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return <>
    <Routes />
    <ToastContainer draggable position="top-right" />
  </>
}

export default App;

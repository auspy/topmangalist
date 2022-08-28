import './App.css';
import React, { useEffect } from 'react';
import RootNavi from './navigation/RootNavi';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import { useLocation } from 'react-router-dom';

function App() {
  const {pathname}=useLocation()
  useEffect(()=>{

  },[pathname])
  return (
    <>
  {!pathname.includes("login")&& <> <Header/>
    <SubHeader/></>}
    <RootNavi/>
    </>
  );
}

export default App;

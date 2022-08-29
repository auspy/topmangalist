import './App.css';
import React, { useEffect, useState } from 'react';
import RootNavi from './navigation/RootNavi';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import { useLocation } from 'react-router-dom';

function App() {
  const {pathname}=useLocation()
  const [ham, setHam] = useState(window.innerWidth > 1100 ? false : true); //hamburger
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      if ( window.innerWidth > 1100) {
        setHam(false);
        // setIsOpen(true);
      } else {
        setHam(true)
        // setIsOpen(false)
      }
    };
    window.onresize = handleResize;
    // return (window.onresize = handleResize);
  }, []);
  useEffect(()=>{
  },[pathname])
  return (
    <>
  {!pathname.includes("login")&& <> <Header ham={ham} />
    <SubHeader ham={ham} /></>}
    <RootNavi ham={ham} />
    </>
  );
}

export default App;

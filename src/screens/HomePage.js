import HeroArea from "../components/HeroArea";
// import HomeRight from "../components/HomeRght";
import HomeLeft from "../components/HomeLeft";
import { getMangas } from "../firebaseQuery";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import GenreBox from "../components/GenreBox";

const HomePage = () => {
  const [mangas, setMangas] = useState({});
  const {pathname}=useLocation()
  useEffect(() => {
    // console.log("rin"); 
    getMangas().then((obj) => {
      setMangas(obj);
    });
  }, [pathname]);
  return (
    <>
      <div className="mt30">
        <HeroArea />
      </div>
      <div className="frfs w100 mt30" >
        <div style={{ flex:2.5}} 
        className=""
        >
          <HomeLeft mangas={mangas} />
        </div>
        {/* <div className="ml30" 
        style={{flex:1}}
        >
          <HomeRight />
          <GenreBox />
        </div> */}
      </div>
    </>
  );
};

export default HomePage;

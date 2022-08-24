import Header from "../components/Header";
import HeroArea from "../components/HeroArea";
import SubHeader from "../components/SubHeader";
// import HomeRight from "../components/HomeRight";
import HomeLeft from "../components/HomeLeft";
import { getMangas } from "../firebaseQuery";
import { useEffect, useState } from "react";
// import GenreBox from "../components/GenreBox";

const HomePage = () => {
  const [mangas, setMangas] = useState({});
  useEffect(() => {
    getMangas().then((obj) => {
      setMangas(obj);
    });
  }, []);
  return (
    <>
      <Header />
      <SubHeader />
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

import Header from "../components/Header";
import HeroArea from "../components/HeroArea";
import SubHeader from "../components/SubHeader";
import HomeRight from "../components/HomeRight";
import HomeLeft from "../components/HomeLeft";
import GenreBox from "../components/GenreBox";

const HomePage = () => {
  return (
    <>
      <Header />
      <SubHeader />
      <div className="mt30">
        <HeroArea />
      </div>
      <div className="frfs w100 mt30" >
        <div style={{ width:"70%"}} 
        className="mr30"
        >
          <HomeLeft />
        </div>
        <div className="" style={{width:"28%"}}>
          <HomeRight />
          <GenreBox />
        </div>
      </div>
    </>
  );
};

export default HomePage;

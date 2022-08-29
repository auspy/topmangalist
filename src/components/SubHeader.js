import { Link, useLocation } from "react-router-dom";

const SubHeader = () => {
  const {pathname} = useLocation()
  return (
    <div id="subheader" className="frc medi12 ">
      <div id="subheaderContent" className="frcsb">
        {/* left */}
        <div className="frc upper">
          <Link to={`${pathname.includes("animes")?"animes":"mangas"}/myCountdowns`}>My Countdowns</Link>
                    {/* <a href="/" >Trending</a>
                    <a href="/" >upcoming</a>
                    <a href="/" >airing soon</a> */}
        </div>
        <div className="regu12">My gift to manga/anime community.</div>
        {/* right */}
        {/* <button id="surpriseBtn" className="caps" onClick={()=>{
                    alert("funtionality to be added!")
                }}>Surprise me!</button> */}
      </div>
    </div>
  );
};

export default SubHeader;

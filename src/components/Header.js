import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, logout } from "../firebaseQuery";
import SearchBar from "./SearchBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth)
  const {pathname} = useLocation()
  const [active,setActive]=useState(!pathname.includes("animes"))
  return (
    <div id="header" className="frcsb regu14">
      {/* left side */}
      <div className="frc">
        <Link to="/" id="logo">
          TopMangaList
        </Link>
        <div className="">
          <Link to={"/"} className="mr30" style={{color:active?"var(--red)":"white"}} onClick={()=>setActive(true)}>
            Manga Countdown
          </Link>
          <Link to={"animes"} style={{color:active?"white":"var(--red)"}} onClick={()=>setActive(false)} >Anime Countdown</Link>
        </div>
      </div>
      {/* right side */}
      <div className="frc">
        <div className="">
          <SearchBar />
        </div>
        {user?.uid ? (
          <button
            className="medi14 ml30"
            onClick={() => {
              logout();
            }}
          >
            {user?.displayName??"Logout"}
          </button>
        ) : (
          <button
            className="medi14 ml30"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, logout } from "../firebaseQuery";
import SearchBar from "./SearchBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { alertConfirm } from "../common";
import Hamburger from "../static/icons/Hamburger";

const Header = (props) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { pathname } = useLocation();
  const [active, setActive] = useState(!pathname.includes("animes"));
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1100 ?true:false);
  return (
    <div id="header" className="frcsb regu14">
      {/* left side */}
      <div className="frc">
        <Link to="/" id="logo">
          TopMangaList
        </Link>
        {!props.ham && (
          <HeaderLinks ham={props.ham} active={active} setActive={setActive} />
        )}
      </div>
      {/* right side */}
      {isOpen? (
        <div className={`${props.ham ? "fcfs hamburger" : "frc"}`}>
          {props.ham && (
            <>
             <MenuHeading setIsOpen={setIsOpen} isOpen={isOpen} />
              <div className="hamLine mv20" />
              <HeaderLinks ham={props.ham} active={active} setActive={setActive} />
              <div className="hamLine mv20" />
            </>
          )}
          <div className="">
            <SearchBar />
          </div>
          {user?.uid ? (
            <div className={`${props.ham ? "mv20 fcfs" : "ml30 fcfe regu13"}`}>
              <span style={props.ham?{marginBottom:15}:{opacity:0.7}}>{user.email}</span>
              <button
                className={`medi14`}
                onClick={() => {
                  alertConfirm("Do you want to logout?", () => {
                    logout();
                    navigate("/");
                  });
                }}
              >
                {user?.displayName ?? "Logout"}
              </button>
            </div>
          ) : (
            <button
              className={`medi14 ${props.ham ? "mv20" : "ml30"}`}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          )}
        </div>
      ) : (
        <><MenuHeading setIsOpen={setIsOpen} isOpen={isOpen} /></>
      )}
    </div>
  );
};

export default Header;

const HeaderLinks = (props) => {
  return (
    <div className={`${props.ham ? "fcfs" : "frc"}`}>
      <Link
        to={"/"}
        className={`${props.ham ? "mb20" : "mr30"}`}
        style={{ color: props.active ? "var(--red)" : "white" }}
        onClick={() => props.setActive(true)}
      >
        Manga Countdown
      </Link>
      <Link
        to={"animes"}
        style={{ color: props.active ? "white" : "var(--red)" }}
        onClick={() => props.setActive(false)}
      >
        Anime Countdown
      </Link>
    </div>
  );
};

const MenuHeading = (props) => {
  return (
    <div className="frc">
      <button
        onClick={() => {
          props.setIsOpen(!props.isOpen);
        }}
      >
        <Hamburger />
      </button>
      <span className="ml15 bold24">Menu</span>
    </div>
  );
};

import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div id="header" className="frcsb regu14">
      {/* left side */}
      <div className="frc">
        <a href="/" id="logo">
          TopMangaList
        </a>
        {/* <div className="">
          <a href="/" className="mr30">
            Manga Countdown
          </a>
          <a href="/">Anime Countdown</a>
        </div> */}
      </div>
      {/* right side */}
      <div className="frc">
        <div className="">
          <SearchBar />
        </div>
        {/* <button className="medi14 ml30">Sign Up</button> */}
      </div>
    </div>
  );
};

export default Header;

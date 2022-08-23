import IconSearch from "../static/icons/IconSearch";

const SearchBar = () => {
  return (
    <>
      <div className="rPosi">
        <input className="searchBar regu14" placeholder="Search"/>
        <button className="aPosi" style={{ right: 15, top: 9 }}>
          <IconSearch />
        </button>
      </div>
    </>
  );
};

export default SearchBar;

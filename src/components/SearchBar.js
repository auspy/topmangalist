import { useState } from "react";
import IconSearch from "../static/icons/IconSearch";
import { useNavigate } from "react-router-dom";
import { getPath, getSearched } from "../firebaseQuery";
// import {toFetch} from "../common"

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigate();

  return (
    <>
      <div className="rPosi">
        <input
          className="searchBar regu14"
          placeholder={`Search ${getPath()}`}
          value={search}
          onChange={(e) => {
            console.log();
            setSearch(e.target.value);
          }}
        />
        <button
          className="aPosi bgNone"
          disabled={!search.length}
          style={{ right: 15, top: 9 }}
          onClick={() => {
            // to fetch function
            // using sql
            // toFetch("http://192.168.18.107:8000/searchResults", {
            //   data: search,
            //   table:getPath(),
            // }).then((res) => {
            //   const path = `/${getPath()}/SearchResults?search=${search}`;
            //   console.log(res,"res");
            //   navigation(path, {
            //     state: {
            //       info: res.length?res:[],
            //     },
            //   });
            //   setSearch("")
            // });

            // using firebase
            getSearched(search).then((res) => {
                const path = `/${getPath()}/SearchResults?search=${search}`;
                console.log(res,"res");
                navigation(path, {
                  state: {
                    info: res.length?res:[],
                  },
                });
                setSearch("")
              });
          }}
        >
          <IconSearch />
        </button>
      </div>
    </>
  );
};

export default SearchBar;


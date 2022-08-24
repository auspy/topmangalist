import { useEffect, useState } from "react";
import { getSearchResults } from "../firebaseQuery";
import IconSearch from "../static/icons/IconSearch";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState({});

  // navigate to results page with this data
  const navigation = useNavigate();

  return (
    <>
      <div className="rPosi">
        <input
          className="searchBar regu14"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            console.log(e.target.value);
            setSearch(e.target.value);
          }}
        />
        <button
          className="aPosi"
          disabled={!search.length}
          style={{ right: 15, top: 9 }}
          onClick={() => {
            // to fetch function
            toFetch("http://192.168.18.107:8000/searchResults", {
              data: search,
            }).then((res) => {
              const path = `/SearchResults?search=${search
                .split(" ")
                .join("%20")}`;
              navigation(path, {
                state: {
                  info: res,
                },
              });
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

// FETCH
export const toFetch = async (url, data) => {
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    redirect: "follow",
    body: JSON.stringify(data),
  })
    .then((res) => res.ok && res.json())
    .then((info) => {
      console.log(info, "res");
      return info;
    })
    .catch((err) => console.log(err, "error in fetch ", url));
};

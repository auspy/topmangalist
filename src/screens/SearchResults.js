import HomeLeft from "../components/HomeLeft";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import { getSearchResults } from "../firebaseQuery";

const SearchResults = () => {
  const { state } = useLocation();
  console.log(state);
  const [info, setInfo] = useState({});
  useEffect(() => {
    let obj = {}; 
    state.info.forEach((item, i) => {
      // to get data from firebase
      getSearchResults(item.Name).then((res) => {
        obj = { ...obj, ...res };
        // console.log(i);
        setInfo(obj);
      });
      // console.log(info, "output", Object.keys(info).length === state.info.length);
    });

  }, [state]);
  return (
    <>
      <Header />
      <SubHeader />
      <div className="mt30 w100">
        {Object.keys(state.info).length ? (
          <HomeLeft mangas={info} heading={`${state.info.length} item(s) found.`} />
        ) : (
          <h2>No Results Found</h2>
        )}
      </div>
    </>
  );
};

export default SearchResults;

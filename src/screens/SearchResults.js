import HomeLeft from "../components/HomeLeft";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearchResults } from "../firebaseQuery";

const SearchResults = () => {
  console.log("in results");
  const { state } = useLocation();
  console.log(state);
  const [info, setInfo] = useState({});
  useEffect(() => {
    let obj = {}; 
    state?.info?.length&&state.info.forEach((item, i) => {
      // to get data from firebase
      getSearchResults(item.Name).then((res) => {
        obj = { ...obj, ...res };
        console.log(obj,"obj");
        setInfo(obj);
      });
      // console.log(info, "output", Object.keys(info).length === state.info.length);
    });

  }, [state]);
  return (
    <>
      <div className="mt30 w100">
        {state?.info?.length ?Object.keys(info).length? (
          <HomeLeft mangas={info} heading={`${state.info.length} item(s) found.`} />
        ): (
          <h2>Loading</h2>
        ) : (
          <h2>No Results Found</h2>
        )}
      </div>
    </>
  );
};

export default SearchResults;

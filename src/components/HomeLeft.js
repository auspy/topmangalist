import { useEffect, useState } from "react";
import { getMangas } from "../firebaseQuery";
import ItemBox from "./ItemBox";

const HomeLeft = () => {
  const [mangas, setMangas] = useState({});
  useEffect(() => {
    getMangas().then((obj) => {
      setMangas(obj);
    });
  }, []);

  return (
    <div id="homeLeft">
      {/* heading */}
      <div className="frc">
        <h3 className="mr30">Airing Soon</h3>
        {/* <h3 className="">Upcoming</h3> */}
      </div>
      <div className="lightLine mt15" />
      {/* items */}
      <div id="homeLeftContent" className="frcsb">
        {Object.keys(mangas).length ? (
          Object.keys(mangas).map((key, i) => (
            <ItemBox info={mangas[key]} key={key + i} />
          ))
        ) : (
          <span>Loading</span>
        )}
      </div>
    </div>
  );
};

export default HomeLeft;

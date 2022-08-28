import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, getLikedDocs } from "../firebaseQuery";
import ItemBox from "./ItemBox";

const HomeLeft = (props) => {
  const [likeStat, setLikeStat] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      getLikedDocs(u.uid).then((o) => {
        setLikeStat(o.length ? o : []);
      });
    });
  }, [props]);
  return (
    <div id="homeLeft">
      {/* heading */}
      <div className="frc">
        <h3 className="mr30 caps">{props.heading || "Airing Soon"}</h3>
        {/* <h3 className="">Upcoming</h3> */}
      </div>
      <div className="lightLine mt15" />
      {/* items */}
      <div id="homeLeftContent" className="frcsb">
        {Object.keys(props).length ? (
          Object.keys(props.mangas)?.length ? (
            Object.keys(props.mangas).map((key, i) => (
              <ItemBox
                info={props.mangas[key]}
                id={key}
                key={key + i}
                liked={likeStat?.includes(props.mangas[key]["nm"])}
                test={props.mangas[key]["nm"]}
              />
            ))
          ) : (
            <span>{"Loading"}</span>
          )
        ) : (
          <span>No countdowns found</span>
        )}
      </div>
    </div>
  );
};

export default HomeLeft;

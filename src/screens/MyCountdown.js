import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import HomeLeft from "../components/HomeLeft";
import {  auth, getLikedDocs, getSearchResults } from "../firebaseQuery";

const MyCountdown = () => {
  const [res, setRes] = useState({});
  useEffect(() => {
    console.log("run");
    onAuthStateChanged(auth,(user)=>{
      getLikedDocs(user.uid).then((a) => {
        console.log(a);
        getSearchResults(a,"in").then((res) => {
          console.log("====================================");
          console.log(res);
          setRes(res)
          console.log("====================================");
        });
      });
    })
  }, []);
  return (
    <div className="mt30 w100">
      <HomeLeft mangas={res} />
    </div>
  );
};

export default MyCountdown;

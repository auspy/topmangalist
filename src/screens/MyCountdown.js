import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import HomeLeft from "../components/HomeLeft";
import {  auth, getLikedDocs, getSearchResults } from "../firebaseQuery";

const MyCountdown = () => {
  const [res, setRes] = useState({});
  const [uid,setUid]=useState("")
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      try {
        if (user?.uid?.length) {
          setUid(user.uid)
          getLikedDocs(user.uid).then((a) => {
            console.log(a);
            getSearchResults(a,"in").then((res) => {
              // console.log(res);
              setRes(res)
            });
          })
        }
      } catch (error) {
        setUid("")
        console.log(error);
      }
    })
  }, []);
  if (uid?.length) {
    return (
      <div className="mt30 w100">
        <HomeLeft mangas={res} />
      </div>
    );
  } else {
    return(
    <div className="mt30 w100">
        <h1>Login to create a list.</h1>
      </div>

    )
  }
};

export default MyCountdown;

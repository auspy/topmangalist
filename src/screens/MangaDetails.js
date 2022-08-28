import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { months } from "../common";
import Timer from "../components/Timer";
import { addToLiked, getLikedDocs, getMangaDetails, uid } from "../firebaseQuery";
import IconHeart from "../static/icons/IconHeart";

const MangaDetails = () => {
  const { state } = useLocation();
  const [details, setDetails] = useState({});
  const date = new Date(state?.info?.lu?.seconds * 1000);
  const [liked, setLiked] = useState(state?.liked?state?.liked:false);

  // get details
  useEffect(() => {
    getMangaDetails(state.id).then((obj) => {
      setDetails(obj);
    });
  }, [state.id]);

  useEffect(() => {
    getLikedDocs(uid).then((o) => {
      // console.log(o.includes(state?.info?.nm),o,"o");
      setLiked(o.includes(state?.info?.nm))
    });
  }, [state?.info?.nm]);

  return (
    <>
      {/* details area */}
      <div
        style={{
          height: 260,
        }}
        className={"frc w100 mt40 rPosi"}
      >
        <div
          style={{
            width: 180,
            borderRadius: 10,
            overflow: "hidden",
          }}
          className="gcc mr30"
        >
          <img
            src={`https://lh3.googleusercontent.com/qoB8QT1F8evNSQXq67LGM2nMylsMfWEhMhXhZdBtPscno_RKkJM4VczgQdsgBxLBwY4=w2400`}
            alt={"manga name"}
            style={{ width: "inherit" }}
          />
        </div>
        <div className="fcfs" style={{ height: "inherit" }}>
          {/* rating */}
          <div className="frc mb20">
            <span
              style={{ fontSize: 24, color: "var(--yellow)" }}
              className="mr30"
            >
              <b>10.0</b>
            </span>
            <button
              className="frc likeBtn"
              onClick={() => {
                setLiked(!liked);
                addToLiked(liked, state.info.nm);
              }}
            >
              <div className="mr5" style={{ height: 22 }}>
                <IconHeart liked={liked} />
              </div>
              <span>{liked ? "Liked" : "Like Countdown"}</span>
            </button>
          </div>
          {/* name */}
          <h1 className="">
            <b>{state.info.nm}</b>
          </h1>
          {/* episode */}
          <div className="frc mt30">
            <h3 className="caps mr30">Latest Episode</h3>
            <h3 className="regu caps">{state.info.ep}</h3>
          </div>
          {/* links */}
          <div className="frc mt30 aPosi" style={{ bottom: 0 }}>
            <h3 className="caps mr30" style={{ width: 117 }}>
              Read manga on Links
            </h3>
            <button
              onClick={() => {
                details?.info?.link1
                  ? (window.location.href = details.info.link1)
                  : alert("no link added yet");
              }}
              className="linkBtn upper mr30"
            >
              Link 1
            </button>
            <button
              onClick={() => {
                details?.info?.link2
                  ? (window.location.href = details.info.link2)
                  : alert("no link added yet");
              }}
              className="linkBtn upper"
            >
              Link 2
            </button>
          </div>
        </div>
      </div>
      <div className="lightLine mt40" />
      {/* timer area */}
      <div className="frcsb mt40 w100">
        {/* release date */}
        <div className="fcc relDateCont">
          <h3 className="upper mb20">
            <b>Release date</b>
          </h3>
          <div className="regu14 fcc">
            <span>{months[date.getMonth()]}</span>
            <span className="mt5">
              {date.getDate() + " " + date.getFullYear()}
            </span>
          </div>
        </div>
        {/* timer */}
        <div id="timerCont" className="gcc">
          <Timer
            lastUpd={state.info.lu}
            time={state.info.tm}
            width={548}
            size={80}
            ep={state.info.ep}
            timerStyle={{
              fontWeight: 700,
              height: 66,
            }}
            headingStyle={{
              fontSize: 24,
              marginTop: 20,
            }}
          />
        </div>
        {/* btns */}
        <div className="fccsb" style={{ height: "100%" }}>
          <button className="whiteBtn">
            <span style={{ width: 148 }}>Notify me when released</span>
          </button>
          <button className="redBtn">Add to my list</button>
        </div>
      </div>
      <div className="lightLine mt40" />
      {/* comment area */}
    </>
  );
};

export default MangaDetails;

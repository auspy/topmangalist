import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { alertConfirm, months } from "../common";
import Timer from "../components/Timer";
import {
  addToLiked,
  auth,
  getLikedDocs,
  getMangaDetails,
} from "../firebaseQuery";
import IconHeart from "../static/icons/IconHeart";
// import { DiscussionEmbed } from "disqus-react";
import { onAuthStateChanged } from "firebase/auth";

const MangaDetails = (props) => {
  const {
    state,
    // ,pathname
  } = useLocation();
  const [details, setDetails] = useState({});
  const date = new Date(state?.info?.lu?.seconds * 1000);
  const [liked, setLiked] = useState(state?.liked ? state?.liked : false);
  const [notify, setNotify] = useState();
  const [uid, setUid] = useState("");
  const navigate = useNavigate();

  // get details
  useEffect(() => {
    getMangaDetails(state?.id).then((obj) => {
      setDetails(obj);
    });
  }, [state?.id]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      try {
        setUid(user.uid);
        getLikedDocs(user.uid).then((o) => {
          // console.log(o.includes(state?.info?.nm),o,"o");
          setLiked(o.includes(state?.info?.nm));
        });
      } catch (error) {
        console.log(error);
      }
    });
  }, [state?.info?.nm]);

  return (
    <>
      {/* details area */}
      <div
        style={{
          height: props.ham?null:300,
        }}
        className={`${props.ham ? "fcc" : "frc"} w100 mt40 rPosi`}
      >
        <div
          style={{
            width: props.ham?216:316,
            height:"inherit",
            borderRadius: 10,
            overflow: "hidden",
          }}
          className={`frc ${props.ham?null:"mr30"}`}
        >
          <img
            src={`https://lh3.googleusercontent.com/qoB8QT1F8evNSQXq67LGM2nMylsMfWEhMhXhZdBtPscno_RKkJM4VczgQdsgBxLBwY4=w2400`}
            alt={"manga name"}
            style={{ width: "inherit" }}
          />
        </div>
        <div className="fcfs rPosi w100" style={{ height: "inherit" }}>
          {/* rating */}
          <div className={`frc ${props.ham?"mv20":"mb20"}`}>
            <span
              style={{ fontSize: 24, color: "var(--yellow)" }}
              className="mr30"
            >
              <b>10.0</b>
            </span>
            {/* <button
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
            </button> */}
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
          <div
            className={`frc mt30 w100`}
            style={{
              bottom: props.ham ? null : 0,
              position: props.ham ? "unset" : "absolute",
            }}
          >
            <h3 className="caps mr30" style={{ width: 117 }}>
              Read manga on Links
            </h3>
            <div className="frc w100">
              <button
                onClick={() => {
                  details?.info?.link1
                    ? (window.location.href = details.info.link1)
                    : alert("no link added yet");
                }}
                className={`linkBtn ${props.ham ? "w100" : null} upper mr30`}
              >
                Link 1
              </button>
              <button
                onClick={() => {
                  details?.info?.link2
                    ? (window.location.href = details.info.link2)
                    : alert("no link added yet");
                }}
                className={`linkBtn ${props.ham ? "w100" : null} upper`}
              >
                Link 2
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lightLine mt40" />
      {/* timer area */}
      <div className={`${props.ham ? "fcc" : "frcsb"} mt40 w100`}>
        {/* btns + rel date  */}
        <div className={"frcsb w100"} style={{flex:0.75,height:176}}>
          {/* btns */}
          <div className={`fccsb ${props.ham?"mr20":"mr30"}`} style={{ height: "100%",width:props.ham?"100%":245.25 }}>
            {/* like btn */}
            <button
              className="whiteBtn"
              onClick={() => {
                if (uid) {
                  setLiked(!liked);
                  addToLiked(liked, state.info.nm);
                } else {
                  alertConfirm("Login to continue. Want to login now?", () =>
                    navigate("/login")
                  );
                }
              }}
            >
              <div className="frc">
                <div className="mr5" style={{ height: 30 }}>
                  <IconHeart liked={liked} size={30} />
                </div>
                <span>{liked ? "Liked" : "Like Countdown"}</span>
              </div>
            </button>
            {/* notify btn */}
            <button
              className="redBtn"
              onClick={() => {
                if (uid) {
                  setNotify(!notify);
                  // send to mailchimp
                } else {
                  alertConfirm("Login to continue. Want to login now?", () =>
                    navigate("/login")
                  );
                }
              }}
            >
              <span style={{ width: notify ? 170 : 148 }}>
                {notify
                  ? "👍 You will be notified on release"
                  : "Notify me when released"}
              </span>
            </button>
          </div>
          {/* release date */}
          <div className="fcc relDateCont">
            <h3 className="upper mb20 textCenter">
              <b>Release date</b>
            </h3>
            <div className="regu14 fcc">
              <span>{months[date.getMonth()]}</span>
              <span className="mt5">
                {date.getDate() + " " + date.getFullYear()}
              </span>
            </div>
          </div>
        </div>
      {/* timer */}
      <div id="timerCont" className={`gcc ${props.ham?"mt40":"ml30"}`} style={{width:props.ham?"100%":692.67,flex:1.75,padding:props.ham?"20px 0 35px":null}}>
        <Timer
          lastUpd={state.info.lu}
          time={state.info.tm}
          width={props.ham?300:548}
          size={props.ham?40:80}
          ep={state.info.ep}
          timerStyle={{
            fontWeight: 700,
            height: 66,
          }}
          headingStyle={{
            fontSize: props.ham?18:24,
            marginTop: 20,
          }}
        />
      </div>
      </div>

      {/* line */}
      <div className="lightLine mt40" />

      {/* comment area */}
      {/* <DiscussionEmbed
        shortname={"topmangalist"}
        config={{
          // url: pathname,
          url: process.env.NODE_ENV === 'development' ? `http://${"topmangalist.com/"}${pathname}`: pathname,
          identifier: pathname?.split("/")[3],
          title: state?.info?.nm,
          // language: "zh_TW",
        }}
      /> */}
    </>
  );
};

export default MangaDetails;

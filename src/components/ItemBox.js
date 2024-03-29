import Timer from "./Timer";
import { useNavigate } from "react-router-dom";
import { addToLiked, getPath } from "../firebaseQuery";
import IconHeart from "../static/icons/IconHeart";
import { useState } from "react";
import { alertConfirm } from "../common";
// import platform from "platform"

const ItemBox = (props) => {
  const [liked,setLiked]=useState(props.liked?props.liked:false)
  const navigation = useNavigate();
  return (
    <div className="fcfs rPosi">
      {/* like btn */}
      <button
        className="aPosi"
        style={{ top: 15, right: 15, zIndex: 10 }}
        title={"Like Countdown"}
        onClick={() => {
          if (props.uid) {
            setLiked(!liked);
            addToLiked(liked, props.info.nm);
          } else {
            alertConfirm("Login to add countdown to list. Want to login now?",()=>navigation("/login"))
          }
        }}
      >
        <IconHeart liked={liked} />
      </button>
      {/* item box */}
      <button
        onClick={() => {
          navigation(`/${getPath()}/name/${props.info.nm}`, {
            state: {
              info: props.info,
              id: props.id,
              liked:props.liked,
            },
          });
        }}
      >
        <img
          src={
            `https://lh3.googleusercontent.com/qoB8QT1F8evNSQXq67LGM2nMylsMfWEhMhXhZdBtPscno_RKkJM4VczgQdsgBxLBwY4=w2400`
            // props.info.im ||
            // platform.name==="Safari"?`https://lh3.googleusercontent.com/qoB8QT1F8evNSQXq67LGM2nMylsMfWEhMhXhZdBtPscno_RKkJM4VczgQdsgBxLBwY4=w2400`:"https://lh3.googleusercontent.com/qoB8QT1F8evNSQXq67LGM2nMylsMfWEhMhXhZdBtPscno_RKkJM4VczgQdsgBxLBwY4=w2400"
          }
          alt=""
          height={260}
          style={{ borderRadius: 10 }}
        />
      </button>
      <span className="medi14 mt5">{props.info.nm}</span>
      {new Date().getDay() !== Number(props.info.tm[0]) && (
        <span className="regu13" style={{ margin: "10px 0 5px" }}>
          Next episode in
        </span>
      )}
      <Timer
        lastUpd={props.info.lu}
        time={props.info.tm}
        width={"100%"}
        size={13}
        ep={props.info.ep}
      />
    </div>
  );
};

export default ItemBox;

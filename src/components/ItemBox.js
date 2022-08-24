import Timer from "./Timer";
// import platform from "platform"

const ItemBox = (props) => {
//   console.log(new Date().getDay(), "today", props.info.tm);
// console.log(platform.name,platform.name==="Safari")
  return (
    <div className="fcfs">
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
      <span className="medi14 mt5">{props.info.nm}</span>
      {new Date().getDay() !== Number(props.info.tm[0]) && (
        <span className="regu13" style={{ margin: "5px 0 10px" }}>
          Episode {props.info.ep}
        </span>
      )}
      <Timer lastUpd={props.info.lu} time={props.info.tm} width={"100%"} size={13} ep={props.info.ep} />
    </div>
  );
};

export default ItemBox;

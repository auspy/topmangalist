import Timer from "./Timer";

const ItemBox = (props) => {
  console.log(new Date().getDay(), "today", props.info.tm);
  return (
    <div className="fcfs">
      <img
        src={
          props.info.im ||
          `https://lh3.googleusercontent.com/qoB8QT1F8evNSQXq67LGM2nMylsMfWEhMhXhZdBtPscno_RKkJM4VczgQdsgBxLBwY4=w2400`
        }
        alt=""
        height={260}
        style={{ borderRadius: 10 }}
      />
      <span className="medi14 mt5">{props.info.nm}</span>
      {new Date().getDay() === Number(props.info.tm[0]) ? (
        <span className="regu12 mt5">
          Episode {props.info.ep} will be realeased today!
        </span>
      ) : (
        <>
          <span className="regu13" style={{ margin: "5px 0 10px" }}>
            Episode {props.info.ep}
          </span>
          <Timer time={props.info.tm} width={"100%"} size={13} />
        </>
      )}
    </div>
  );
};

export default ItemBox;

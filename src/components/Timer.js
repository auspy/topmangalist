import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const dProp = {
//   width: "100%",
//   size: 13,
//   info: {
//     days: 2,
//     hours: 21,
//     mins: 22,
//     secs: 12,
//   },
// };

const Timer = (props) => {
  // const {pathname}=useLocation()
  // console.log('====================================');
  // console.log(pathname,props);
  // console.log('====================================');
  const [time, setTime] = useState({});
  useEffect(() => {
    // console.log(props.time);
    const getNewDate = () => {
      // get today's day
      const todayDay = new Date().getDay();
      // get today date
      const todayDate = new Date().getDate();
      // get needed day
      const mangaDay = Number(props.time[0]);
      // get num of days left till needed date
      const diff = mangaDay - todayDay;
      const daysLeft = diff > 0 ? diff : diff + 7;
      // get needed date
      const neededDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        todayDate + daysLeft
      );
      // time left = subtract date - needed date
      let timeLeft = neededDate.getTime() - new Date().getTime();

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(timeLeft / (1000 * 60 * 60)) % 24;
      const mins = Math.floor(timeLeft / (1000 * 60)) % 60;
      const secs = Math.floor(timeLeft / 1000) % 60;
      // console.log(days,hours,mins,secs);
      setTime({
        days: days,
        hours: hours,
        mins: mins,
        secs: secs,
      });
      // console.log({
      //   days:days,
      //   hours:hours,
      //   mins:mins,
      //   secs:secs,
      // });
    };
    const interval = setInterval(() => {
      getNewDate();
    }, [1000]);

    return () => {
      clearInterval(interval);
    };
  }, [props.time,props.lastUpd]);

  // console.log(props,"props",new Date(new Date().getFullYear(),new Date().getMonth(),));
  if (Number(props.time[0]) === new Date().getDay()) {
    return (
      <>
        <span className="regu12 mt5">
          Episode {props.ep} will be released today!
        </span>
      </>
    );
  }
  return (
    <div className="frcsb" style={{ width: props.width }}>
      {Object.keys(time).map((key, i) => (
        <div className="fcc" key={key + i}>
          <span
            className={`medi frc ${props.timerClass}`}
            style={{ fontSize: props.size, height: 14,...props.timerStyle }}
          >
            {time[key]}
          </span>
          <span className="regu12 frc mt5 caps" style={{ height: 10,...props.headingStyle }}>
            {key}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Timer;

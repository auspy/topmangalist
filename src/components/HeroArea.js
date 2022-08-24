import { useEffect, useState } from "react";
import { getLikedMangas } from "../firebaseQuery";
import Timer from "./Timer";

const HeroArea = () => {
  const [top4, setTop4] = useState([]);
  useEffect(() => {
    getLikedMangas().then((obj) => {
      // obj[1] has arr type data
      setTop4(obj[1]);
      // console.log(top4,"top4");
    });
  }, []);

  if (!Boolean(top4.length)) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    return (
      <div className="frc" style={{ width: "100%", height: 382 }}>
        {/* big */}
        <div
          style={{
            // width: 713,
            flex: 2,
            height: "100%",
            overflow: "hidden",
            position: "relative",
            //   backgroundImage:"url('../static/images/resource.webp')",
            //   backgroundRepeat:"no-repeat",
            //   backgroundSize:"100% 100%",
          }}
        >
          {/* dark layer */}
          <div className="darkLayer" />
          {/* info */}
          <div
            className="aPosi z10 p30 fccsb"
            style={{ height: "100%", width: "100%", boxSizing: "border-box" }}
          >
            <h1 style={{ alignSelf: "flex-start" }}>{top4[0].nm}</h1>
            <div className="frcsb" style={{ width: "100%" }}>
              <h2 className="regu">Episode {top4[0].ep}</h2>
              <Timer
                lastUpd={top4[0].lu}
                size={18}
                width={174}
                time={top4[0].tm}
                ep={top4[0].ep}
              />
            </div>
          </div>
          {/* img */}
          <img
            src={`${top4[0].im}` || require("../static/images/resource.webp")}
            alt="manga cover"
            style={{
              // width: "inherit",
              position: "relative",
              width: "100%",
              bottom: 100,
              zIndex: 0,
            }}
          />
        </div>
        {/* smaller */}
        <div
          className="fcc"
          style={{
            // width: 489,
            flex: 1,
            height: "inherit",
          }}
        >
          <div
            style={{
              width: "inherit",
              height: "50%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className="darkLayer" />
            {/* info */}
            <div
              className="aPosi z10 p30 fccsb"
              style={{ height: "100%", width: "100%", boxSizing: "border-box" }}
            >
              <h2 style={{ alignSelf: "flex-start" }}>{top4[1].nm}</h2>
              <div className="frcsb" style={{ width: "100%" }}>
                <h3 className="regu">Episode {top4[1].ep}</h3>
                <Timer
                  lastUpd={top4[1].lu}
                  size={18}
                  width={174}
                  time={top4[1].tm}
                  ep={top4[1].ep}
                />
              </div>
            </div>
            {/* img */}
            <img
              src={`${top4[1].im}` || require("../static/images/resource.webp")}
              alt="manga cover 2"
              style={{ width: "100%" }}
            />
          </div>
          {/* 2 smallest */}
          <div
            style={{
              // width: 489,
              // flex:1,
              height: "50%",
              position: "relative",
              overflow: "hidden",
              minWidth: 489,
            }}
            className="frc"
          >
            <div style={{ width: "50%", height: "100%" }}>
              <div className="darkLayer" />
              {/* info */}
              <div
                className="aPosi z10 p30 fccsb"
                style={{
                  height: "100%",
                  boxSizing: "border-box",
                  width: "50%",
                }}
              >
                <h2 style={{ alignSelf: "flex-start" }}>{top4[2].nm}</h2>
                <div style={{ width: "100%" }}>
                  <Timer
                    lastUpd={top4[2].lu}
                    size={18}
                    width={"100%"}
                    time={top4[2].tm}
                    ep={top4[2].ep}
                  />
                </div>
              </div>
              {/* img */}
              <img
                src={
                  `${top4[2].im}` || require("../static/images/resource.webp")
                }
                alt="manga cover 2"
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ width: "50%", height: "100%" }}>
              <div className="darkLayer" />
              {/* info */}
              <div
                className="aPosi z10 p30 fccsb"
                style={{
                  height: "100%",
                  boxSizing: "border-box",
                  width: "50%",
                }}
              >
                <h2>{top4[3].nm}</h2>
                <div style={{ width: "100%" }}>
                  <Timer
                    lastUpd={top4[3].lu}
                    size={18}
                    width={"100%"}
                    time={top4[3].tm}
                    ep={top4[3].ep}
                  />
                </div>
              </div>
              {/* img */}
              <img
                src={
                  `${top4[3].im}` || require("../static/images/resource.webp")
                }
                alt="manga cover 2"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default HeroArea;

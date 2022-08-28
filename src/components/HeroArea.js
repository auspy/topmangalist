import { useEffect, useState } from "react";
import { getLikedMangas, getPath } from "../firebaseQuery";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "./Timer";

const HeroArea = () => {
  const navigation = useNavigate();
  const [top4, setTop4] = useState([]);
  const { pathname } = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    getLikedMangas().then((obj) => {
      // obj[1] has arr type data
      setTop4(obj[1]);
      // console.log(top4,"top4");
    });
  }, [pathname]);
  useEffect(() => {
    const handleResize=()=>{
      setWidth(window.innerWidth);
      console.log(window.innerWidth);
    }
    window.addEventListener("resize",handleResize)
    return window.removeEventListener("resize",handleResize)
  }, []);

  if (!Boolean(top4.length)) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    // console.log(window.innerWidth);
    return (
      <div className="frc" style={{ width: "100%", height: 382 }}>
        {/* big */}
        <button
          onClick={() => {
            navigation(`/${getPath()}/name/${top4[0].nm}`, {
              state: {
                info: top4[0],
                id: top4[0].id
              },
            });
          }}
          style={{
            // width: 713,
            flex: 1.75,
            height: "100%",
            overflow: "hidden",
            position: "relative",
            display: width < 800 ? "none" : null,
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
        </button>
        {/* smaller */}
        <div
          className="fcc"
          style={{
            // width: 489,
            flex: 1.25,
            height: "inherit",
          }}
        >
          <button
            onClick={() => {
              navigation(`/${getPath()}/name/${top4[1].nm}`, {
                state: {
                  info: top4[1],
                  id: top4[1].id,
                },
              });
            }}
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
          </button>
          {/* 2 smallest */}
          <div
            style={{
              // width: 489,
              // flex:1,
              height: "50%",
              position: "relative",
              overflow: "hidden",
              // minWidth: 489,
            }}
            className="frc"
          >
            <button
              onClick={() => {
                navigation(`/${getPath()}/name/${top4[2].nm}`, {
                  state: {
                    info: top4[2],
                    id: top4[2].id,
                  },
                });
              }}
              style={{ width: "50%", height: "100%" }}
            >
              <div className="darkLayer" style={{ width: "inherit" }} />
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
            </button>
            <button
              onClick={() => {
                navigation(`/${getPath()}/name/${top4[3].nm}`, {
                  state: {
                    info: top4[3],
                    id: top4[3].id,
                  },
                });
              }}
              style={{ width: "50%", height: "100%" }}
            >
              <div className="darkLayer" style={{ width: "inherit" }} />
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
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default HeroArea;

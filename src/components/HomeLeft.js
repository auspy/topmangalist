import ItemBox from "./ItemBox";

const HomeLeft = (props) => {
  return (
    <div id="homeLeft">
      {/* heading */}
      <div className="frc">
        <h3 className="mr30 caps">{props.heading||"Airing Soon"}</h3>
        {/* <h3 className="">Upcoming</h3> */}
      </div>
      <div className="lightLine mt15" />
      {/* items */}
      <div id="homeLeftContent" className="frcsb">
        {Object.keys(props.mangas).length ? (
          Object.keys(props.mangas).map((key, i) => (
            <ItemBox info={props.mangas[key]} key={key + i} />
          ))
        ) : (
          <span>Loading</span>
        )}
      </div>
    </div>
  );
};

export default HomeLeft;

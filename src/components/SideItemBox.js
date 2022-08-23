import Timer from "./Timer";

const SideItemBox = (props) => {
  return (
    <>
    <div className="frc" style={{padding:10}}>
      {/* number */}
      <div style={{width: 20,
height: 20,border:"1px solid white"}} className="gcc"><div className="medi12">{props.num || 1}</div></div>
      {/* img */}
      <div style={{ height: 81, width: 56, borderRadius: 10,overflow:"hidden" }} className="mh10">
        <img src="../static/images/resource.webp" alt={`${props.name||"manga name"}`} style={{width:"inherit"}}/>
      </div>
      {/* heading + timer */}
      <div className="fcfssb" style={{height:81}}>
          <span className="medi13">Sword Fanatic Wanders Through The Ni</span>
          {/* <Timer/> */}
      </div>
    </div>
    <div className="lightLine"/>
    </>
  );
};

export default SideItemBox;

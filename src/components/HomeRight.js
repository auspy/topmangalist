import SideItemBox from "./SideItemBox";

const HomeRight = () => {
    return (
        <div className="" id="homeRight">
            {/* header */}
            <h3 className="ml15">Trending</h3>
            <div className="frcsa mt15">
            <span className="medi14">Week</span>
            <span className="medi14">Month</span>
            <span className="medi14">All</span>
            </div>
            <div className="lightLine mt5" />
            {/* items */}
            <SideItemBox/>
        </div>
    );
}

export default HomeRight;
const SubHeader = () => {
    return (
        <div id="subheader" className="frc medi12 ">
            <div id="subheaderContent" className="frcsb" >
                {/* left */}
                <div className="frc upper">
                    <a href="/" >My Countdowns</a>
                    <a href="/" >Trending</a>
                    <a href="/" >upcoming</a>
                    <a href="/" >airing soon</a>
                </div>
                {/* right */}
                <button id="surpriseBtn" className="caps">Surprise me!</button>
            </div>
        </div>
    );
}

export default SubHeader;
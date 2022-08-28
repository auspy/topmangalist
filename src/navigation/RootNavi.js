import HomePage from "../screens/HomePage";
import { Routes, Route } from "react-router-dom";
import SearchResults from "../screens/SearchResults";
import MangaDetails from "../screens/MangaDetails";
import FirebaseLogin from "../screens/FirebaseLogin";
import MyCountdown from "../screens/MyCountdown";

const RootNavi = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="mangas/myCountDowns" element={<MyCountdown/>}/>
      <Route path="animes/myCountDowns" element={<MyCountdown/>}/>
      <Route path="mangas" element={<HomePage />} />
      <Route path="animes" element={<HomePage />} />
      <Route path="animes/name/:name" element={<MangaDetails />} />
      <Route path="animes/SearchResults" element={<SearchResults />} />
      <Route path="mangas/SearchResults" element={<SearchResults />} />
      <Route path="mangas/name/:name" element={<MangaDetails />} />
      {/* </Route> */}
      <Route path="/login" element={<FirebaseLogin />} />
    </Routes>
  );
};

export default RootNavi;

import HomePage from "../screens/HomePage";
import { Routes, Route } from "react-router-dom";
import SearchResults from "../screens/SearchResults";

const RootNavi = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/SearchResults" element={<SearchResults />} />
    </Routes>
  );
};

export default RootNavi;

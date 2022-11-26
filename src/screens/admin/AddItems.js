import { useState } from "react";
import { addNewMangaAnime } from "../../firebaseQuery";

const AddItems = () => {
  // take needed values
  //   VARIABLES
  const [name, setName] = useState("");
  const [type, setType] = useState("mangas");
  const [url, setUrl] = useState("");
  const [day, setDay] = useState(null);
  const [time, setTime] = useState("00:00");
  const [tags, setTags] = useState();
  const [adding, setAdding] = useState();

  return (
    <div className="gcc p30">
      {/* name */}
      <input
        type={"text"}
        maxLength={100}
        className={`searchBar mb15`}
        placeholder={"Name"}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {/* time */}
      <input
        type={"time"}
        className={`searchBar mb15`}
        placeholder={"Time"}
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
        }}
      />
      {/* day */}
      <select
        className={`searchBar mb15`}
        value={day}
        onChange={(e) => {
          setDay(e.target.value);
        }}
      >
        {days?.map((item, i) => (
          <option key={item + i} value={i}>
            {item}
          </option>
        ))}
      </select>
      {/* image url */}
      <input
        type={"text"}
        maxLength={200}
        className={`searchBar mb15`}
        placeholder={"Image Url"}
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      {/* type */}
      <select
        className={`searchBar mb15`}
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        <option value={"mangas"}>Manga</option>
        <option value={"animes"}>Anime</option>
      </select>
      {/* tags */}
      <input
        type={"text"}
        maxLength={200}
        className={`searchBar mb15`}
        placeholder={"Tags (separated by space)"}
        value={tags}
        onChange={(e) => {
          setTags(e.target.value);
        }}
      />
      <input
        type={"button"}
        disabled={adding}
        value={"Add"}
        className="mt15 redBtn"
        style={{ padding: "15px 0" }}
        onClick={async () => {
          setAdding(true);
          addNewMangaAnime(name, type, time, day, url, tags).then(() => {
            setAdding(false);
          });
        }}
      />
    </div>
  );
};

export default AddItems;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

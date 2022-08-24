import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  updateDoc,
  doc,
  increment,
  where,
} from "firebase/firestore";
import db from "./firebase";

// common locations
const mangasCol = collection(db, "mangas");

// get mangas
export const getMangas = async () => {
  let obj = {};
  const docs = await getDocs(mangasCol);
  docs.forEach((key) => {
    // console.log(key.data(),"=>",key.id);
    obj[key.id] = key.data();
    updateLastUpdated(key.data(), key.id);
  });
  return obj;
};

// get mangas based on liked
export const getLikedMangas = async (lim) => {
  let obj = {};
  let arr = [];
  const docs = await getDocs(
    query(mangasCol, orderBy("lk", "desc"), limit(lim))
  );
  docs.forEach((key) => {
    // console.log(key.data(),"=>",key.id);
    obj[key.id] = key.data();
    arr.push(key.data());
    updateLastUpdated(key.data(), key.id);
  });
  return [obj, arr];
};

// update last updated
export const updateLastUpdated = (obj, key) => {
  // get today's day
  const todayDay = new Date().getDay();
  // get needed day
  const mangaDay = Number(obj.tm[0]);
  // get num of days left till needed date
  const diff = mangaDay - todayDay;
  // update last updated
  //   console.log(obj.lu.toDate() < new Date(),"obj.lu < new Date()",obj.lu.toDate(),new Date());
  if (diff < 0 && obj.lu.toDate() < new Date()) {
    console.log("update", obj.nm);

    updateDoc(doc(db, "mangas", key), {
      lu: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + diff + 7
      ),
      ep: increment(1),
    });
  }
};

// get searched docs
export const getSearchResults = async (item) => {
   let obj={}
  const docs = await getDocs(query(mangasCol, where("nm", "==", item)));
  docs.forEach((item) => {
   //  console.log(item.data(), "=>", item.id);
    obj[item.id]=item.data()
  });
  return obj
};

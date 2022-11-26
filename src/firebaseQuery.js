import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  getDoc,
  updateDoc,
  doc,
  // increment,
  where,
  addDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import db, { firebaseApp } from "./firebase";
import { createTags } from "./common";

// common variables
export const auth = getAuth(firebaseApp);
export let uid = auth?.currentUser?.uid,
  username = auth?.currentUser?.displayName,
  user = auth?.currentUser;
onAuthStateChanged(auth, (u) => {
  try {
    if (u?.uid?.length) {
      uid = u.uid;
      username = u.displayName;
      user = u;
    }
  } catch (error) {
    console.log(error);
    uid = "";
    username = "";
    user = {};
  }
});

// common locations
export const getPath = () => {
  // returns mangas or animes
  let path = window.location.pathname.split("/")[1];
  // console.log("in getpath", path);
  return path === "" ? "mangas" : path;
};
// gpath to manga/anime collection
const mangasColPath = () => collection(db, getPath()); //col = collection
// path to user col
const userColPath = (id) => {
  return query(collection(db, "users"), where("id", "==", id));
};
// gets needed user doc using uid
export const userDoc = async () => {
  // console.log(uid);
  let obj = "";
  const docs = await getDocs(userColPath(uid));
  docs.forEach((i) => {
    obj = i.id;
  });
  return obj;
};
// path to user doc
const userDocPath = async () => {
  const d = await userDoc();
  // console.log(d);
  return doc(db, "users", d);
};

// get mangas
export const getMangas = async () => {
  let obj = {};
  const docs = await getDocs(mangasColPath());
  docs.forEach((key) => {
    // console.log(key.data(),"=>",key.id);
    obj[key.id] = key.data();
    // updateLastUpdated(key.data(), key.id);
  });
  return obj;
};

// get mangas based on liked
export const getLikedMangas = async (lim) => {
  let obj = {};
  let arr = [];
  const docs = await getDocs(
    query(mangasColPath(), orderBy("lk", "desc"), limit(lim))
  );
  docs.forEach((key) => {
    // console.log(key.data(),"=>",key.id);
    obj[key.id] = key.data();
    arr.push({ ...key.data(), id: key.id });
    // to update last updated
    // updateLastUpdated(key.data(), key.id);
  });
  return [obj, arr];
};

// update last updated, episode number
// const updateLastUpdated = (obj, key) => {
//   // get today's day
//   const todayDay = new Date().getDay();
//   // get needed day
//   const mangaDay = Number(obj.tm[0]);
//   // get num of days left till needed date
//   const diff = mangaDay - todayDay;
//   // update last updated
//   //   console.log(obj.lu.toDate() < new Date(),"obj.lu < new Date()",obj.lu.toDate(),new Date());
//   if (diff < 0 && obj.lu.toDate() < new Date()) {
//     console.log("update", obj.nm);

//     updateDoc(doc(db, getPath(), key), {
//       lu: new Date(
//         new Date().getFullYear(),
//         new Date().getMonth(),
//         new Date().getDate() + diff + 7
//       ),
//       ep: increment(1),
//     });
//   }
// };

// get searched docs
export const getSearchResults = async (item, cond = "==") => {
  let obj = {};
  let q = query(mangasColPath(), where("nm", cond, item));
  // console.log(mangasColPath,cond);
  const docs = await getDocs(q);
  docs.forEach((item) => {
    //  console.log(item.data(), "=>", item.id);
    obj[item.id] = item.data();
  });
  return obj;
};

// get manga details
export const getMangaDetails = async (id) => {
  let obj = {};
  const docs = await getDocs(collection(db, getPath(), id, "info"));
  docs.forEach((item) => {
    obj[item.id] = item.data();
  });
  return obj;
};

// AUTHENTICATION
//   logout
export const logout = () => {
  signOut(auth);
  alert(username + " logged out!");
};

// using google
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("id", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      // // to store items rarely needed
      // await addDoc(collection(db, "users",user.uid,"details"), {
      //   aP: "google",
      //   em: user.email,
      // });
      // to save items regularly needed or needed for query
      await addDoc(collection(db, "users"), {
        nm: user.displayName,
        aP: "google", //authProvider
        em: user.email,
        id: user.uid,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// login using email password
export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// register using email pass
export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    let n = toCapitalise(name);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    updateUserDisplayName(user, n);
    await addDoc(collection(db, "users"), {
      nm: n,
      aP: "local",
      em: user.email,
      id: user.uid,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// to update name
export const updateUserDisplayName = async (user, newName) => {
  updateProfile(user, {
    displayName: newName,
  })
    .then(() => {
      // Profile updated!
      // ...
      console.log("Profile updated!");
    })
    .catch((error) => {
      // An error occurred
      // ...
      console.log(error, "in updating profile");
    });
};

// password reset
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// AUTH END

// add to liked
export const addToLiked = async (liked, name) => {
  try {
    await updateDoc(await userDocPath(), {
      lk: liked ? arrayRemove(name) : arrayUnion(name),
    });
    console.log("liked ", name);
  } catch (error) {
    console.log(error);
  }
};

// get liked docs
export const getLikedDocs = async (id) => {
  let arr = [];
  const docs = await getDocs(userColPath(id));
  docs.forEach((i) => {
    arr = i.data()["lk"];
  });
  // console.log(arr);
  return arr;
};

// CAPITALISE
export const toCapitalise = (item) => {
  return item
    ?.split(" ")
    .map((item) => {
      return item[0].toUpperCase() + item.substring(1).toLowerCase();
    })
    .join(" ");
};

// get notify docs
const notifyDoc = (user) => doc(db, "users", user, "info", "notify");
export const getNotifyDocs = async () => {
  let info = [];
  let u = await userDoc();
  try {
    const docs = await getDoc(notifyDoc(u));
    if (docs.exists()) {
      info = docs.data()["ar"];
    }
    return info;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// add to notify
export const updateNotify = async (notify, item) => {
  let u = await userDoc();
  try {
    await updateDoc(notifyDoc(u), {
      ar: notify ? arrayRemove(item) : arrayUnion(item),
    });
  } catch (error) {
    console.log(error);
  }
};

// create notify docs
export const createNotify = async (item) => {
  let u = await userDoc();
  try {
    await setDoc(notifyDoc(u), {
      ar: [item],
    });
  } catch (error) {
    console.log(error);
  }
};

// // TO FIND INPUT/SEARCHED VALUE
export const getSearched = async (find) => {
  // let obj = {};
  const arr = [];
  let findArr = find
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((item) => item !== "" && item !== " ");
  console.log(find, findArr, "to be searched");

  // to select query based on page
  const q = query(
    collection(db, getPath()),
    where("tags", "array-contains-any", findArr)
  );

  const docs = await getDocs(q);
  docs.forEach((doc) => {
    // obj[doc.id] = doc.data();
    arr.push(doc.data());
  });
  console.log("Search result:", arr);
  return arr;
};

// ADD NEW MANGA/ANIME
export const addNewMangaAnime = async (
  name,
  type,
  time,
  day,
  imgUrl,
  tags = ""
) => {
  try {
    // const set time
    const tm = day + "_" + time;
    console.log(db,"db");
    const data = {
      im: imgUrl,
      lk: 0,
      lu: serverTimestamp(),
      nm: toCapitalise(name),
      tags: [...createTags(name + " " + tags)],
      tm: tm,
    };
    console.log(name, type, tm, imgUrl, createTags(name + " " + tags));
    await setDoc(doc(db,type,new Date().getTime().toString()), data);
    alert("Success")
    return null;
  } catch (error) {
    console.log(error, "in addNewMangaAnime");
    alert(error, "Try Again!");
    return null;
  }
};

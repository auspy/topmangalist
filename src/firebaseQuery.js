import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  addDoc,
  arrayUnion,
  arrayRemove,
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

// common variables
export const auth = getAuth(firebaseApp);
export let uid=auth?.currentUser?.uid, username=auth?.currentUser?.displayName, user=auth?.currentUser;
onAuthStateChanged(auth, (u) => {
  if (u.uid) {
    // console.log("====================================");
    // console.log(u, " logged in");
    // console.log("====================================");
    uid = u.uid;
    username = u.displayName;
    user = u;
  } else {
    uid = "";
    username = "";
    user = {};
  }
});

// common locations
export const getPath = () => {
  let path = window.location.pathname.split("/")[1];
  // console.log("in getpath", path);
  return path === "" ? "mangas" : path;
};
// gpath to manga/anime collection
const mangasColPath = () => collection(db, getPath()); //col = collection
// path to user col
const userColPath=(id)=>{
  return query(collection(db, "users"), where("id", "==", id));
}
// gets needed user doc using uid
const userDoc = async () => {
  console.log(uid);
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
    updateLastUpdated(key.data(), key.id);
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

    updateDoc(doc(db, getPath(), key), {
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
export const getSearchResults = async (item,cond="==") => {
  let obj = {};
  // console.log(mangasColPath,cond);
  const docs = await getDocs(query(mangasColPath(), where("nm", cond, item)));
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
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      nm: user.displayName,
      aP: "local",
      em: user.email,
      id: user.uid,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
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
  } catch (error) {
    console.log(error);
  }
};

// get liked docs
export const getLikedDocs = async (id) => {
  let arr =[];
  const docs = await getDocs(userColPath(id));
  docs.forEach((i)=>{
    arr=i.data()["lk"]
  })
  // console.log(arr);
  return arr
};

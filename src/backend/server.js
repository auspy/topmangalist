require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const mchimp = require("@mailchimp/mailchimp_marketing");
const db = require("./firebase");
const listId = process.env.MAILCHIMP_LIST_ID;
app.listen(process.env.PORT, () => {
  console.log("topmangalist backend started");
});
app.use(cors());
app.use(bodyParser.json());

// mailchimp config
mchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

// connect sql
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "topmangalist",
});

con.connect((err) => {
  if (err) throw err;
  console.log("sql connected");
});

app.post("/searchResults", (req, res) => {
  let q =
    "SELECT Name FROM " +
    req.body.table +
    " WHERE Name LIKE '%" +
    req.body.data +
    "%'";
  // let q = "DESC mangas"
  con.query(q, (err, docs) => {
    if (err) throw err;
    console.log(docs);
    // docs.forEach(doc => {
    //     console.log(doc.Name);
    // });
    res.send(docs);
  });
});

// MAILCHIMP FUNCTIONS
const mchimpTest = async () => {
  const response = await mchimp.ping.get();
  return response;
};

const mchimpList = async () => {
  const response = await mchimp.lists.getListMembersInfo(listId);
  return response;
};

const mchimpGetUser = async (user) => {
  const response = await mchimp.lists.getListMember(listId, user);
  return response;
};

const mchimpUpdateTags = async (user, tag, active) => {
  const response = await mchimp.lists.updateListMemberTags(listId, user, {
    tags: [{ name: tag, status: active ? "inactive" : "active" }],
  });
  // console.log(response);
  return response;
};

const mchimpAddUser = async (email) => {
  const response = await mchimp.lists.addListMember(
    listId,
    {
      email_address: email,
      status: "subscribed",
    },
    { skipMergeValidation: true }
  );
  return response;
};

// mchnimp end

const afterUpdateTags = (val, notify,res) => {
  if (val === null) {
    res.send({
      status: "ok",
      message: notify
        ? "Notification cancelled."
        : "Congratulations! You will be notified.",
    });
  } else {
    res.send({
      status: "failed",
      message: "Try again later.",
    });
  }
};

app.post("/addToList", (req, res) => {
  // get hash from firebase
  console.log(req.body.data, "back");
  if (req?.body?.data) {
    // if user is registered in firebase, get mchimp data
    let user = req.body.data; // basically user doc name, being used as user here
    let notify = req.body.notify; // boolean. notify =true, means user wants to be notified
    let manga = req.body.manga;
    const docRef = db
      .collection("users")
      .doc(user)
      .collection("info")
      .doc("mchimp");
    docRef
      .get()
      .then((doc) => {
        if (doc.exists && doc.data()["sH"].length) {
          // since user exists in mchimp, add tag
          console.log(doc.data(), doc.id);
          // mchimpGetUser(doc.data()["sH"]).then((val) => {
          //   // if exists add tag
          //   console.log(val);
          // });
          mchimpUpdateTags(doc.data()["sH"], manga, notify).then((val) =>
            afterUpdateTags(val, notify,res)
          );
        } else {
          console.log("user does not exist");
          // if mchimp data does not exist, create new user and add tag
          // console.log(req.body.email);
          //           mchimpList().then((c)=>{
          // console.log(c);
          //           })
          mchimpAddUser(req.body.email)
            .then((val) => {
              console.log(val);
              //? to be tested ?//
              // add user hash to firebase
              db.collection("users")
                .doc(user)
                .collection("info")
                .doc("mchimp")
                .set({ sH: val.id });
              // use user data to add tags
              mchimpUpdateTags(val.id, manga, notify).then((val2) =>
                afterUpdateTags(val2, notify,res)
              );
            })
            .catch((error) => {
              console.log(error);
              res.send({
                status: "failed",
                message: "Try again later.",
              });
            });
        }
      })
      .catch((err) => console.log(err, "getting mailchimp")); // docRef.get()
  } else {
    //  if no user was found
    res.send({
      status: "failed",
      message:
        "user does not exist. login to continue or check your connection. ",
    });
  }

  // mchimpList().then((ans) => {
  //   console.log(ans.members);
  //   res.send(ans.members);
  // });
});

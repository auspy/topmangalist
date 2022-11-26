// common variables
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// alert confirmation box
export const alertConfirm = (txt, onConfirm) => {
  if (window.confirm(txt)) {
    onConfirm();
    console.log("You pressed OK!");
  } else {
    console.log("You pressed Cancel!");
  }
};

// FETCH
export const toFetch = async (url, data, method = "POST", params = {}) => {
  // header
  const header = {
    method: method,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    redirect: "follow",
  };
  if (data) {
    header["body"] = JSON.stringify(data);
  }
  // url and params
  let finalurl = url;
  params &&
    Object.keys(params).forEach((item, i) => {
      finalurl =
        finalurl +
        "?" +
        String(item) +
        "=" +
        String(params[item]) +
        (i === Object.keys(params).length - 1 ? "" : "&");
    });

  return await fetch(finalurl, header)
    .then((res) => res.ok && res.json())
    .then((info) => {
      // console.log(info, "res");
      return info;
    })
    .catch((err) => console.log(err, "error in fetch ", url));
};

// CREATE TAGS
export const createTags = (item) => {
  return item
    ?.toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .filter((item) => {
      return item !== " " && item !== "";
    });
};

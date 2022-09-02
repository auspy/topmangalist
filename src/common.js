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
export const toFetch = async (url, data={}) => {
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    redirect: "follow",
    body: JSON.stringify(data),
  })
    .then((res) => res.ok && res.json())
    .then((info) => {
      // console.log(info, "res");
      return info;
    })
    .catch((err) => console.log(err, "error in fetch ", url));
};


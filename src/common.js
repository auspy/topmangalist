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

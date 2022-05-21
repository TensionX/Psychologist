const replacesName = (message, name) => {
  let msg = null;
  message.includes("{{Name}}")
    ? (msg = message.replace(new RegExp("{{Name}}", "g"), name))
    : (msg = message);
  return msg;
};

const replacesTime = (message, time) => {
  let msg = null;
  message.includes("{{Appointment_Time}}")
    ? (msg = message.replace(new RegExp("{{Appointment_Time}}", "g"), time))
    : (msg = message);
  return msg;
};

const replacesPlus = (phone) => {
  let number = null;
  phone.includes("+")
    ? (number = phone.replace(/[\+]+/gi, ""))
    : (number = phone);
  return number;
};

module.exports = {
  replacesName,
  replacesTime,
  replacesPlus
};

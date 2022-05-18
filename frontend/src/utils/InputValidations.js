exports.validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  alert("Please enter a valid email address");
  return false;
};

exports.validateString = (str) => {
  if (/^[a-z ,.'-]+$/i.test(str)) {
    return true;
  }
  alert("Please enter a valid name or lastname");
  return false;
};

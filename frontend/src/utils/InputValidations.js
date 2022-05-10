exports.validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
};

exports.validateString = (str) => {
  if (/^[a-z ,.'-]+$/i.test(str)) {
    return true;
  }
  alert("Your name or lastname is not valid!");
  return false;
};

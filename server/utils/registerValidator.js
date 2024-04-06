const registerValidator = (register) => {
  let res = true;
  if (
    !register.name ||
    !register.lastname ||
    !register.email ||
    !register.email2 ||
    !register.password ||
    !register.password2 ||
    register.email !== register.email2 ||
    register.password !== register.password2
  ) {
    res = false;
  }
  return res;
};

module.exports = registerValidator;
const registerValidator = (register) => {
  let res = true;
  console.log("aaaa", register);
  if (
    !register.name ||
    !register.lastname ||
    !register.email ||
    !register.email2 ||
    !register.password ||
    !register.password2 ||
    register.email !== register.email2 ||
    register.password !== register.password2||
    register.email //expresión regular
  ) {
    res = false;
  }
  return res;
};

module.exports = registerValidator;
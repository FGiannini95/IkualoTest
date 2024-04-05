export const registerValidator = (register) => {
  let res = {
    validate: true,
    message: "",
  };

  if (
    !register.name ||
    !register.lastname ||
    !register.email ||
    !register.email2 ||
    !register.password ||
    !register.password2
  ) {
    res.validate = false;
    res.message = "Completa todos los campos";
  } else if (register.email !== register.email2) {
    res.validate = false;
    res.message = "Los correos no coinciden";
  } else if (register.password !== register.password2) {
    res.validate = false;
    res.message = "Las contraseñas no coinciden";
  }
  return res;
};

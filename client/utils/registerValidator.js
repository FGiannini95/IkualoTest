export const registerValidator = (register) => {
  let res = {
    validate: true,
    message: "",
  };
  // Expresión regular para validar que el nombre y el apellido tengan al menos dos caracteres
  const nameRegex = /^.{2,}$/;
  // Expresión regular para validar el formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Expresión regular para validar la contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$/;

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
  } else if (!emailRegex.test(register.email)) {
    res.validate = false;
    res.message = "Formato de correo electrónico inválido";
  } else if (!nameRegex.test(register.name)) {
    res.validate = false;
    res.message = "Ingresa un nombre válido";
  } else if (!nameRegex.test(register.lastname)) {
    res.validate = false;
    res.message = "Ingresa un apellido válido";
  } else if (!passwordRegex.test(register.password)) {
    res.validate = false;
    res.message = "Ingresa una contraseña de 8 mínimo caracteres (mayúscula, minúscula, especial)";  
  } else if (register.password !== register.password2) {
    res.validate = false;
    res.message = "Las contraseñas no coinciden";
  }
  return res;
};

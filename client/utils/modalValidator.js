export const modalValidator = (recover) => {
  let res = {
    validate: true,
    message: "",
  };

  // Expresión regular para validar el formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Expresión regular para validar la contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$/;

  if (
    !recover.email ||
    !recover.password 
  ) {
    res.validate = false;
    res.message = "Completa todos los campos";
  } else if (!emailRegex.test(recover.email)) {
    res.validate = false;
    res.message = "Formato de correo electrónico inválido";
  } else if (!passwordRegex.test(recover.password)) {
    res.validate = false;
    res.message = "Ingresa una contraseña de 8 mínimo caracteres (mayúscula, minúscula, especial)";  
  }
  return res;
};

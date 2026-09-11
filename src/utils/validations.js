import validator from "validator";

export const validateRegisterData = (req) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Either username, email or password is missing");
  }

  if (username.length < 3 || username.length > 30) {
    throw new Error("Username should lie between 3 to 30 characters only");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email Address is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password");
  }
};

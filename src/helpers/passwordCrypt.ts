const bcrypt = require('bcrypt');

async function hashIt(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

// compare the password user entered with hashed pass.
async function compareIt(password: string, hashedPassword: string) {
  const validPassword = await bcrypt.compare(password, hashedPassword);
  return validPassword;
}

export default {
  hashIt,
  compareIt,
};

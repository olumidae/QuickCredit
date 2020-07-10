import bcrypt from 'bcrypt';

/**
 * @fileoverview - password generator method
 * @exports {passwordHash comparePasswords}
*/

const passwordHash = password => bcrypt.hashSync(password, 10);

const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

export default { passwordHash, comparePassword };

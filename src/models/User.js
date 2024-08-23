const client = require('../../config/database');
const bcrypt = require('bcrypt');

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  static async create(username, email, password) {
    const user = new User(null, username, email, password);
    await user.hashPassword();
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3) RETURNING id
    `;
    const res = await client.query(query, [username, email, user.password]);
    user.id = res.rows[0].id;
    return user;
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const res = await client.query(query, [email]);
    if (res.rows.length > 0) {
      return new User(res.rows[0].id, res.rows[0].username, res.rows[0].email, res.rows[0].password);
    }
    return null;
  }
}

module.exports = User;

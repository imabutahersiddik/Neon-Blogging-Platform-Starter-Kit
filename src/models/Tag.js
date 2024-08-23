const client = require('../../config/database');

class Tag {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async create(name) {
    const query = `
      INSERT INTO tags (name)
      VALUES ($1) RETURNING id
    `;
    const res = await client.query(query, [name]);
    return new Tag(res.rows[0].id, name);
  }

  static async findById(id) {
    const query = `
      SELECT * FROM tags WHERE id = $1
    `;
    const res = await client.query(query, [id]);
    if (res.rows.length > 0) {
      return new Tag(res.rows[0].id, res.rows[0].name);
    }
    return null;
  }

  static async findByPostId(postId) {
    const query = `
      SELECT t.id, t.name FROM tags AS t
      JOIN post_tags AS pt ON t.id = pt.tag_id
      WHERE pt.post_id = $1
    `;
    const res = await client.query(query, [postId]);
    return res.rows.map(row => new Tag(row.id, row.name));
  }
}

module.exports = Tag;
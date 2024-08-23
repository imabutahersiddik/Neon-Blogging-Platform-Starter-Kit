const client = require('../../config/database');

class Comment {
  constructor(id, postId, content, authorId) {
    this.id = id;
    this.postId = postId;
    this.content = content;
    this.authorId = authorId;
  }

  async save() {
    const query = `
      INSERT INTO comments (post_id, content, author_id)
      VALUES ($1, $2, $3) RETURNING id
    `;
    const res = await client.query(query, [this.postId, this.content, this.authorId]);
    this.id = res.rows[0].id;
  }

  static async findByPostId(postId) {
    const query = `
      SELECT id, post_id, content, author_id
      FROM comments
      WHERE post_id = $1
    `;
    const { rows } = await client.query(query, [postId]);
    return rows.map((row) => new Comment(row.id, row.post_id, row.content, row.author_id));
  }

  static async delete(id) {
    const query = `
      DELETE FROM comments
      WHERE id = $1
    `;
    await client.query(query, [id]);
  }
}

module.exports = Comment;

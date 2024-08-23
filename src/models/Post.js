const client = require('../../config/database');
const marked = require('marked');
const Tag = require('./Tag');

class Post {
  constructor(id, title, content, authorId, tags) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.tags = tags; // This will now be an array of tag names
  }

  async save() {
    const query = `
      INSERT INTO posts (title, content, author_id)
      VALUES ($1, $2, $3) RETURNING id
    `;
    const res = await client.query(query, [this.title, this.content, this.authorId]);
    this.id = res.rows[0].id;

    // Save tags
    await this.saveTags();
  }

  async saveTags() {
    const tagIds = await Promise.all(this.tags.map(async (tagName) => {
      const tag = await Tag.create(tagName);
      return tag.id;
    }));

    for (const tagId of tagIds) {
      const query = `
        INSERT INTO post_tags (post_id, tag_id)
        VALUES ($1, $2)
      `;
      await client.query(query, [this.id, tagId]);
    }
  }

  static async getAll() {
    const query = `
      SELECT id, title, content, author_id
      FROM posts
    `;
    const { rows } = await client.query(query);
    return Promise.all(rows.map(async (row) => {
      const tags = await Tag.findByPostId(row.id);
      return new Post(row.id, row.title, row.content, row.author_id, tags);
    }));
  }

  static async findById(id) {
    const query = `
      SELECT id, title, content, author_id
      FROM posts
      WHERE id = $1
    `;
    const { rows } = await client.query(query, [id]);
    if (rows.length > 0) {
      const tags = await Tag.findByPostId(rows[0].id);
      return new Post(rows[0].id, rows[0].title, rows[0].content, rows[0].author_id, tags);
    }
    return null;
  }

  static async update(id, title, content, tags) {
    const query = `
      UPDATE posts
      SET title = $1, content = $2
      WHERE id = $3
    `;
    await client.query(query, [title, content, id]);

    // Update tags
    await this.updateTags(id, tags);
  }

  static async updateTags(postId, tags) {
    // Clear existing tags
    const deleteQuery = `
      DELETE FROM post_tags
      WHERE post_id = $1
    `;
    await client.query(deleteQuery, [postId]);

    // Add new tags
    const tagIds = await Promise.all(tags.map(async (tagName) => {
      const tag = await Tag.create(tagName);
      return tag.id;
    }));

    for (const tagId of tagIds) {
      const insertQuery = `
        INSERT INTO post_tags (post_id, tag_id)
        VALUES ($1, $2)
      `;
      await client.query(insertQuery, [postId, tagId]);
    }
  }

  static async delete(id) {
    const query = `
      DELETE FROM posts
      WHERE id = $1
    `;
    await client.query(query, [id]);
  }

  get htmlContent() {
    return marked(this.content);
  }
}

module.exports = Post;
require("dotenv").config();
const pool = require("./pool");
async function getPosts() {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id DESC");
  return rows;
}
// async function getUser(username) {
//   const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
//     username,
//   ]);
//   const user = rows[0];
// }
async function createPost(title, text) {
  await pool.query("INSERT INTO posts(title,message) VALUES ($1,$2)", [
    title,
    text,
  ]);
}
async function getUser(nickname) {
  await pool.query("SELECT * FROM users WHERE nickname = ($1)", [nickname]);
}
async function createUser(firstname, secondname, nickname, password, secret) {
  if (secret == process.env.MEMBER_STATUS) {
    const admin = "admin";
    await pool.query(
      "INSERT INTO users(firstname,secondname,nickname,password,memberstatus) VALUES($1,$2,$3,$4,$5)",
      [firstname, secondname, nickname, password, admin]
    );
  } else {
    await pool.query(
      "INSERT INTO users(firstname,secondname,nickname,password) VALUES($1,$2,$3,$4)",
      [firstname, secondname, nickname, password]
    );
  }
}
async function logIn() {}
async function deletePost(id) {
  await pool.query("DELETE FROM posts WHERE id = ($1)", [id]);
}
module.exports = {
  getPosts,
  createPost,
  getUser,
  createUser,
};
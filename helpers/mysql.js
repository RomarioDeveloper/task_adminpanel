const mysql = require("mysql2/promise");

// данные для подключения к mysql
const poolConfig = {
  connectionLimit: 100,
  host: "79.137.202.217",
  user: "diman_usr",
  password: "diman123",
  database: "diman",
};

const pool = mysql.createPool(poolConfig)

// Функция для поиска администратора в базе данных по имени пользователя и паролю.
async function findAdmin({username, password}) {
  let connection;
  try {
    connection = await pool.getConnection();

    // Выполнение SQL-запроса на поиск администратора
    const [rows, fields] = await connection.execute("SELECT * FROM `admins` WHERE `username` = ? and `password` = ?", [
      username,
      password
    ]);

    connection.release();

    return rows;
  } catch (error) {
    if (connection) {
      connection.release();
    }
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
}
// Функция для обновления токена администратора в базе данных по имени пользователя.
async function updateAdminToken({username, token}) {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows, fields] = await connection.execute("UPDATE `admins` SET `token` = ? WHERE `username` = ?", [
      token,
      username
    ]);

    connection.release();

    return rows;
  } catch (error) {

    if (connection) {

      connection.release();

    }

    console.error("Ошибка при выполнении запроса:", error);

    throw error;

  }

}


async function products({ name , description , price})
{
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows, fields] = await connection.execute("INSERT INTO `products` ( `name`, `description`, `price`) VALUES (?, ?, ?)", [
      name,
      description,
      price
    ]);

    connection.release();

    return rows;
  } catch (error) {
    if (connection) {
      connection.release();
    }
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
}


async function deleteproducts({ id })
{
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows, fields] = await connection.execute("DELETE FROM `products` WHERE `id` = ?", [
      id 
    ]);

    connection.release();

    return rows;
  } catch (error) {
    if (connection) {
      connection.release();
    }
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
}

async function updateproducts({ id , name , description , price})
{
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows, fields] = await connection.execute("UPDATE `products` SET `name` = ?, `description` = ?, `price` = ? WHERE `id` = ?", [
      name,
      description,
      price,
      id
    ]);

    connection.release();

    return rows;
  } catch (error) {
    if (connection) {
      connection.release();
    }
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
}


// Экспорт функций для использования в других частях программы.
module.exports = {
  findAdmin,
  updateAdminToken,
  products,
  deleteproducts,
  updateproducts
};
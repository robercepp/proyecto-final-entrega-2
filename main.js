const fs = require("fs");

async function isAdmin(id) {
  if(id == 0) {
    return false
  } else {
    try {
      const file = await fs.promises.readFile("./db/users.txt", "utf-8");
      const data = JSON.parse(file);
      const index = data.findIndex((usuario) => usuario.id == id);
      return data[index].admin;
    } catch (error) {
      console.log("error!: ", error);
    }
  }
}

async function fileChecker(file) {
  if (!fs.existsSync(file)) {
    try {
      await fs.promises.writeFile(file, "[]");
    } catch (error) {
      console.log("error!: ", error);
    }
  }
}

//verificación temporal de tipo de usuario
var userLogged = 0;

module.exports = { isAdmin, fileChecker, userLogged };

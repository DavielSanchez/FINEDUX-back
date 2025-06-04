const app = require("./app.js");
const { sequelize } = require("./src/config/db.js");

const PORT = process.env.PORT || 3000;

(async() => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en puerto ${PORT}`);
        });
    } catch (err) {
        console.error("Error al iniciar el servidor:", err);
    }
})();
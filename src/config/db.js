const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'FINEDUXtest',
    'postgres',
    '141414', {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
    }
);


const conectarDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('🟢 Conexión a la base de datos establecida exitosamente.');

        await sequelize.sync({ force: false });
        console.log('🟢 Modelos sincronizados con la base de datos');
    } catch (error) {
        console.error('🔴 No se pudo conectar a la base de datos:', error);
    }
};

module.exports = {
    sequelize,
    conectarDB,
};
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const swaggerOptions = require('./src/config/swaggerOptions');
const escuelaRoutes = require("./src/interfaces/routes/escuelaRoutes");
const authRoutes = require('./src/interfaces/routes/authRoutes')
const usuarioRoutes = require('./src/interfaces/routes/usuarioRoutes')
const distritoRoutes = require('./src/interfaces/routes/distritoRoutes')
const fondosRecibidos = require('./src/interfaces/routes/fondosRecibidosRoutes')
const Proveedores = require('./src/interfaces/routes/proveedoresRoutes')
const Ordencompras = require('./src/interfaces/routes/ordenCompraRoutes')
const Facturas = require("./src/interfaces/routes/FacturaRoutes")

const app = express();
const specs = swaggerJsdoc(swaggerOptions);

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(logger('dev'));
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/auth", authRoutes);
app.use("/api/users", usuarioRoutes);
app.use("/api/escuelas", escuelaRoutes);
app.use("/api/distritos", distritoRoutes);
app.use('/api/fondos', fondosRecibidos);
app.use('/api/proveedores', Proveedores);
app.use('/api/orden', Ordencompras);
app.use("/api/facturas", Facturas);

module.exports = app;
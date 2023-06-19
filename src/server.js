require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
// const bodyParser = require('body-parser');
const routes = require("./routes");
const db = require("./config/dbSequelize");

const server = express();
const corsOptions = {
  origin: "http://localhost:8080", // ou '*' para permitir de qualquer origem
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(bodyParser.urlencoded({ extended: false }))
// server.use(bodyParser.json())

server.use("/api", routes);

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}/api`);
});

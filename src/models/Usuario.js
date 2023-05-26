const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');

module.exports = db.define("usuario", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  celular: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  perfil_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
    inclusao: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
}, {
    tableName: 'usuario',
    updatedAt: false,
    createdAt: 'inclusao'
}
);

// const connection = require('../db');

// module.exports = {

//     obterTodos: async () => {
//         const [usuario] = await connection.execute(`
//             SELECT 
//                 id, 
//                 nome, 
//                 email, 
//                 senha, 
//                 telefone,
//                 celular,
//                 inclusao, 
//                 perfil_id, 
//                 perfil_nome, 
//                 perfil_sigla 
//             FROM vw_usuario`);
//         return usuario
    
//     },

//     obterUnico: async (id) => {

//         const [usuario] = await connection.execute(` 
//             SELECT 
//                 id, 
//                 nome, 
//                 email, 
//                 senha, 
//                 telefone,
//                 celular,
//                 inclusao, 
//                 perfil_id, 
//                 perfil_nome, 
//                 perfil_sigla 
//             FROM vw_usuario
//             WHERE id = ?`, [id]);
//         return usuario
        
//     },

//     inserir: async (dados) => {
//         let { nome, email, senha, telefone, celular, perfil } = dados;
//         const [usuario] = await connection.execute(`
//             INSERT INTO usuario
//             (nome, email, senha, telefone, celular, id_perfil)
//             VALUES (?, ?, ?, ?, ?, ?)`,
//             [nome, email, senha, telefone, celular, perfil]); 
//         return usuario;
//     },

//     atualizar: async (id, dados) => {
//         const { nome, email, perfil} = dados;
//         const [usuario] = await connection.execute(`
//             UPDATE usuario 
//             SET nome = ?, 
//                 email = ?, 
//                 id_perfil = ? 
//             WHERE id = ?`, 
//             [nome, email, perfil, id]);
//         return usuario

//     },

//     atualizarSenha: async (id, senha) => {
//         const [usuario] = await connection.execute(`
//             UPDATE usuario
//             SET senha = ?
//             WHERE id = ?`,
//             [senha, id]);
//         return usuario

//     },

//     excluir: async (id) => {

//         const [usuario] = await connection.execute(`
//             DELETE FROM usuario
//             WHERE id = ?`,
//             [id]);
//         return usuario;
//     }

// }   
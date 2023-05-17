const connection = require('../db');

module.exports = {

    obterTodos: async () => {
        const [carros] = await connection.execute('SELECT * FROM carros');
        return carros
    
    },

    obterUnico: async (codigo) => {

        const [carros] = await connection.execute('SELECT * FROM carros WHERE codigo = ?', [codigo]);
        return carros
        
    },

    inserir: async (modelo, placa) => {
    
        const [carro] = await connection.execute('INSERT INTO carros (modelo, placa) VALUES (?, ?)', [modelo, placa]); 
        return carro;
    },

    atualizar: async (codigo, modelo, placa) => {

        const [carros] = await connection.execute('UPDATE carros SET modelo = ?, placa = ? WHERE codigo = ?', [modelo, placa, codigo]);
        return carros

    },

    excluir: async (codigo) => {

        const [carros] = await connection.execute('DELETE FROM carros WHERE codigo = ?', [codigo]);
        return carros;
    }

}   
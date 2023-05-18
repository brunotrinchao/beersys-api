const connection = require('../db');

module.exports = {

    obterTodos: async () => {
        const [usuarios] = await connection.execute('SELECT id, nome, email, senha, foto, inclusao FROM usuarios');
        return usuarios
    
    },

    obterUnico: async (id) => {

        const [usuarios] = await connection.execute('SELECT id, nome, email, senha, foto, inclusao FROM usuarios WHERE id = ?', [id]);
        return usuarios
        
    },

    inserir: async (nome, email, senha, foto) => {
    
        const [usuarios] = await connection.execute('INSERT INTO usuarios (nome, email, senha, foto) VALUES (?, ?, ?, ?)', [nome, email, senha, foto]); 
        return usuarios;
    },

    atualizar: async (id, nome, email, senha, foto) => {

        const [usuarios] = await connection.execute('UPDATE usuarios SET nome = ?, email = ?, senha = ?, foto = ? WHERE id = ?', [nome, email, senha, foto]);
        return usuarios

    },

    excluir: async (id) => {

        const [usuarios] = await connection.execute('DELETE FROM usuarios WHERE id = ?', [id]);
        return usuarios;
    }

}   
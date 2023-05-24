const connection = require('../db');

module.exports = {

    login: async (email, senha) => {
        const [usuario] = await connection.execute(`
            SELECT  id,
                    nome,
                    email, 
                    senha, 
                    inclusao, 
                    perfil_id, 
                    perfil_nome, 
                    perfil_sigla 
            FROM vw_usuario 
            WHERE email = ?`,
            [email]);
        return usuario
        
    }

}   
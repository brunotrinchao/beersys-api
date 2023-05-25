const connection = require('../db');

module.exports = {

    obterTodos: async (usuarioSessao) => {
        const [cardapios] = await connection.execute(`
            SELECT 
                id,
                nome,
                inclusao,
                inclusao_formatada,
                estabelecimento_id,
                estabelecimento_nome,
                estabelecimento_logo,
                estabelecimento_descricao,
                estabelecimento_situacao,
                estabelecimento_situacao_formatada,
                estabelecimento_inclusao,
                estabelecimento_inclusao_formatada,
                usuario_id
            FROM vw_cardapios
            WHERE usuario_id = ?`,[usuarioSessao]);
        return cardapios
    
    },

    obterUnico: async (id, usuarioSessao) => {

        const [cardapios] = await connection.execute(`
            SELECT 
                id,
                nome,
                inclusao,
                inclusao_formatada,
                estabelecimento_id,
                estabelecimento_nome,
                estabelecimento_logo,
                estabelecimento_descricao,
                estabelecimento_situacao,
                estabelecimento_situacao_formatada,
                estabelecimento_inclusao,
                estabelecimento_inclusao_formatada,
                usuario_id
            FROM vw_cardapios
            WHERE id = ? AND usuario_id = ?`,
            [id, usuarioSessao]);
        return cardapios
        
    },

    inserir: async (dados) => {
        let { estabelecimento, nome } = dados;
        const [cardapios] = await connection.execute(`
            INSERT INTO cardapios
                (estabelecimento_id, nome)
            VALUES (?,?)`,
            [estabelecimento, nome]); 
        return cardapios;
    },

    atualizar: async (id, dados, usuarioSessao) => {
        const { nome } = dados;
        const [cardapios] = await connection.execute(`
            UPDATE cardapios
            SET nome = ?,
            WHERE id = ? AND usuario_id = ?`,
            [nome, id, usuarioSessao]);
        return cardapios

    },

    excluir: async (id, usuario) => {
        const [cardapios] = await connection.execute(`
            DELETE FROM usuario
            WHERE id = ? AND usuario_id = ?`,
            [id, usuario]);
        return cardapios;
    }

}   
const connection = require('../db');

module.exports = {

    obterTodos: async (usuarioSessao) => {
        const [produtos] = await connection.execute(`
            SELECT 
                id,
                nome,
                valor,
                descricao,
                foto,
                inclusao,
                inclusao_formatada,
                cardapio_id,
                cardapio_nome,
                cardapio_inclusao,
                cardapio_inclusao_formatada,
                estabelecimento_id,
                estabelecimento_nome,
                estabelecimento_inclusao,
                estabelecimento_inclusao_formatada
            FROM vw_produtos
            WHERE usuario_id = ?`,[usuarioSessao]);
        return produtos
    
    },

    obterUnico: async (id, usuarioSessao) => {

        const [produtos] = await connection.execute(`
            SELECT 
                id,
                nome,
                valor,
                descricao,
                foto,
                inclusao,
                inclusao_formatada,
                cardapio_id,
                cardapio_nome,
                cardapio_inclusao,
                cardapio_inclusao_formatada,
                estabelecimento_id,
                estabelecimento_nome,
                estabelecimento_inclusao,
                estabelecimento_inclusao_formatada
            FROM vw_produtos
            WHERE id = ? AND usuario_id = ?`,
            [id, usuarioSessao]);
        return produtos
        
    },

    inserir: async (dados) => {
        let { cardapio, nome, valor, descricao, foto } = dados;
        const [produtos] = await connection.execute(`
            INSERT INTO produtos
                (cardapio_id, nome, valor, descricao, foto)
            VALUES (?,?,?,?,?)`,
            [cardapio, nome, valor, descricao, foto]); 
        return produtos;
    },

    atualizar: async (id, dados, usuarioSessao) => {
        const { cardapio, nome, valor, descricao, foto } = dados;
        const [produtos] = await connection.execute(`
            UPDATE produtos
            SET cardapio_id = ?,
                nome = ?,
                valor = ?,
                descricao = ?,
                foto = ?
            WHERE id = ? AND usuario_id = ?`,
            [cardapio, nome, valor, descricao, foto, id, usuarioSessao]);
        return produtos

    },

    excluir: async (id, usuario) => {
        const [produtos] = await connection.execute(`
            DELETE FROM usuario
            WHERE id = ? AND usuario_id = ?`,
            [id, usuario]);
        return produtos;
    }

}   
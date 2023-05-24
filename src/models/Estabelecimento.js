const connection = require('../db');

module.exports = {

    obterTodos: async (usuarioSessao) => {
        const [estabelecimento] = await connection.execute(`
            SELECT 
                id, 
                nome, 
                logo, 
                descricao, 
                situacao, 
                situacao_formatada, 
                inclusao, 
                inclusao_formatada, 
                usuario_id, 
                usuario_nome, 
                usuario_email, 
                usuario_celular, 
                usuario_telefone, 
                usuario_inclusao, 
                usuario_inclusao_formatada, 
                endereco_id, 
                endereco_rua, 
                endereco_numero, 
                endereco_bairro, 
                endereco_cep, 
                endereco_complemento, 
                endereco_cidade, 
                endereco_inclusao, 
                endereco_inclusao_formatada 
            FROM vw_estabelecimento
            WHERE usuario_id = ?`,[usuarioSessao]);
        return estabelecimento
    
    },

    obterUnico: async (id, usuarioSessao) => {

        const [estabelecimento] = await connection.execute(`
            SELECT 
                id, 
                nome, 
                logo, 
                descricao, 
                situacao, 
                situacao_formatada, 
                inclusao, 
                inclusao_formatada, 
                usuario_id, 
                usuario_nome, 
                usuario_email, 
                usuario_celular, 
                usuario_telefone, 
                usuario_inclusao, 
                usuario_inclusao_formatada, 
                endereco_id, 
                endereco_rua, 
                endereco_numero, 
                endereco_bairro, 
                endereco_cep, 
                endereco_complemento, 
                endereco_cidade, 
                endereco_inclusao, 
                endereco_inclusao_formatada 
            FROM vw_estabelecimento
            WHERE id = ? AND usuario_id = ?`,
            [id, usuarioSessao]);
        return estabelecimento
        
    },

    inserir: async (dados) => {
        let { usuario, nome, logo, descricao } = dados;
        const [estabelecimento] = await connection.execute(`
            INSERT INTO estabelecimento
                (usuario_id, nome, logo, descricao)
            VALUES (?, ?, ?, ?)`,
            [usuario, nome, logo, descricao]); 
        return estabelecimento;
    },

    atualizar: async (id, dados, usuarioSessao) => {
        const { nome, descricao} = dados;
        const [estabelecimento] = await connection.execute(`
            UPDATE estabelecimento
            SET nome = ?,
                descricao = ?,
            WHERE id = ? AND usuario_id = ?`,
            [nome, descricao, id, usuarioSessao]);
        return estabelecimento

    },

    atualizaLogo: async (id, logo, usuario) => {
        const [estabelecimento] = await connection.execute(`
            UPDATE estabelecimento
            SET logo = ?
            WHERE id = ? AND usuario_id = ?`,
            [logo, id, usuario]);
        return estabelecimento
    },

    atualizaSituacao: async (id, situacao, usuario) => {
        const [estabelecimento] = await connection.execute(`
            UPDATE estabelecimento
            SET situacao = ?
            WHERE id = ? AND usuario_id = ?`,
            [situacao, id, usuario]);
        return estabelecimento
    },

    excluir: async (id, usuario) => {
        const [estabelecimento] = await connection.execute(`
            DELETE FROM usuario
            WHERE id = ? AND usuario_id = ?`,
            [id, usuario]);
        return estabelecimento;
    }

}   
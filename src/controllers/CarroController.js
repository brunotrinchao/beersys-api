const CarroService = require('../services/CarroService');

module.exports = {

    obterTodos: async (req, res) => {
        const carros = await CarroService.obterTodos();
        return res.status(200).json(carros)
    },

    obterUnico: async (req, res) => {
        let json = { error: '', result: {} };

        let codigo = req.params.id;
        let carro = await CarroService.obterUnico(codigo);

        if (carro) {
            json.result = carro
        }

        return res.status(200).json(json)
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        let modelo = req.body.modelo;
        let placa = req.body.placa;
        const carroId = await CarroService.inserir(modelo, placa);

        json.result = {
            id: carroId.insertId,
            descricao: modelo,
            placa: placa,
        };

        return res.status(201).json(json);
    },

    atualizar: async (req, res) => {
        let json = { error: '', result: {} };

        let codigo = req.params.id;
        let modelo = req.body.modelo;
        let placa = req.body.placa;

        if (codigo && modelo && placa) {
            await CarroService.atualizar(codigo, modelo, placa);

            json.result = {
                id: codigo,
                descricao: modelo,
                placa: placa,
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', result: {} };

        await CarroService.excluir(req.params.id);

        res.json(json);
    }

}
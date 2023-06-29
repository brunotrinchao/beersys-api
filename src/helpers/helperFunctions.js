const jwt = require("jsonwebtoken");

module.exports = {
  retonaToken: (req) => {
    const token = req.headers.authorization;
    return jwt.decode(token);
  },
  validaEmail: (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  },
  getPadinate: (_page, _limit) => {
    let limit = 10; // number of records per page
    let offset = 0;
    let page = 1;

    if (_page) {
      page = +_page;
    }

    if (_limit) {
      limit = +_limit;
    }
    offset = limit * page - limit;

    return { limit, offset, page };
  },
  formataPaginacao: (result, limit) => {
    const { count: totalItems, rows: data } = result;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, data, totalPages };
  },
  ehVazio: (str) => {
    return !str || 0 === str.length;
  },
  diaSemana: (dia) => {
    const dias = {
      DOM: "Domingo",
      SEG: "Segunda-feira",
      TER: "Terça-feira",
      QUA: "Quarta-feira",
      QUI: "Quinta-feira",
      SEX: "Sexta-feira",
      SAB: "Sábado",
    };
    return dias[dia] || null;
  },
};

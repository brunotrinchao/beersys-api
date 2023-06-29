const Schedules = require("../models/Schedules");
const { Op } = require("sequelize");
const { ehVazio } = require("../helpers/helperFunctions");

module.exports = {
  validaDados: async (dados) => {
    const { day, start, end } = dados;
    const retorno = {
      status: true,
      message: [],
    };

    if (!day) {
      retorno.status = false;
      retorno.message.push("Dia é um campo obrigatório");
    }

    if (
      ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].includes(day) === false
    ) {
      retorno.status = false;
      retorno.message.push("Informe um dia válido");
    }

    if (!start) {
      retorno.status = false;
      retorno.message.push("Hora de abertura é um campo obrigatório");
    }

    if (!end) {
      retorno.status = false;
      retorno.message.push("Hora de fechamento é um campo obrigatório");
    }

    const validateTime = (time) => {
      const timeSplit = time.split(":");
      if (timeSplit.length !== 2) {
        retorno.status = false;
        retorno.message.push(`Hora ${time} inválida`);
        return false;
      }

      const hours = Number(timeSplit[0]);
      const minutes = Number(timeSplit[1]);

      if (hours > 23 || hours < 0 || minutes > 59 || minutes < 0) {
        retorno.status = false;
        retorno.message.push(`Hora ${time} inválida`);
        return false;
      }

      return true;
    };

    if (!validateTime(start) || !validateTime(end)) {
      retorno.status = false;
    }

    const startSplit = start.split(":");
    const endSplit = end.split(":");

    const startHours = Number(startSplit[0]);
    const startMinutes = Number(startSplit[1]);
    const endHours = Number(endSplit[0]);
    const endMinutes = Number(endSplit[1]);

    if (
      startHours > endHours ||
      (startHours === endHours && startMinutes > endMinutes)
    ) {
      retorno.status = false;
      retorno.message.push(
        "A hora de abertura não pode ser maior que a hora de fechamento"
      );
    }

    if (retorno.status) {
      const options = {
        where: {
          day: day,
          start: start,
          end: end,
        },
      };

      const existe = await Schedules.count(options);

      if (existe > 0) {
        retorno.status = false;
        retorno.message.push("Já existe um horário cadastrado com esses dados");
      }
    }

    if (retorno.status) {
      const existingSchedule = await Schedules.findOne({
        where: {
          day: day,
          [Op.or]: [
            {
              start: {
                [Op.between]: [start, end],
              },
            },
            {
              end: {
                [Op.between]: [start, end],
              },
            },
          ],
        },
      });

      if (existingSchedule) {
        retorno.status = false;
        retorno.message.push("Horário em conflito para esse dia");
      }
    }

    if (!retorno.status) {
      retorno.message = retorno.message.join("<br/>");
    }

    return retorno;
  },
};

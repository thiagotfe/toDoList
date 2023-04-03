/* eslint-disable prefer-const */
import { get } from 'lodash';
import Tasks from '../models/Tasks';

class TasksController {
  async index(req, res) {
    try {
      const tasks = await Tasks.findAll();
      return res.json(tasks);
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unkown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const { name, status, delivery_date } = req.body;

      if (status || delivery_date) {
        return res.status(400).json({
          errors: ['Status or delivery_date enableds in update route'],
        });
      }

      const task = await Tasks.create(name);
      return res.json(task);
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unkown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID parameter'],
        });
      }
      const task = await Tasks.findByPk(id);
      if (!task) {
        return res.status(400).json({
          errors: ['Task not exists'],
        });
      }
      return res.json(task);
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unkown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID parameter'],
        });
      }
      const task = await Tasks.findByPk(id);
      if (!task) {
        return res.status(400).json({
          errors: ['Task not exists'],
        });
      }

      const toEdit = {};
      const { name, status, delivery_date } = req.body;

      if (name) toEdit.name = name;

      if (status && task.status === 2) {
        return res.status(400).json({
          errors: ['Task was finished'],
        });
      }

      if (status != null) {
        if (status === 0 || status === 1 || status === 2) {
          toEdit.status = status;
        } else {
          return res.status(400).json({
            errors: ['Status can be 0 (pending), 1 (progessing), 2 (finished)'],
          });
        }
      }

      if (delivery_date) {
        const { year, month, day } = delivery_date;

        // Check if exists
        if (!year || !month || !day) {
          return res.status(400).json({
            errors: ['delivery_date can be an dict with year, month and day'],
          });
        }

        // Check if are valids
        if (!Number.isInteger(year)) {
          return res.status(400).json({
            errors: ['delivery_date\'s year not valid'],
          });
        }

        if (!Number.isInteger(month) || month < 1 || month > 12) {
          return res.status(400).json({
            errors: ['delivery_date\'s month not valid'],
          });
        }

        if (!Number.isInteger(day) || day < 1 || day > 31) {
          return res.status(400).json({
            errors: ['delivery_date\'s day not valid'],
          });
        }
        const aux_delivery_date = new Date(year, month - 1, day);

        let now = new Date();

        now.setDate(now.getDate() - 1);

        if (aux_delivery_date <= now) {
          return res.status(400).json({
            errors: ['Insert a valid dalivery_date'],
          });
        }

        toEdit.delivery_date = `${aux_delivery_date.getFullYear()}-${aux_delivery_date.getMonth() + 1}-${aux_delivery_date.getDate()}`;
      }

      const updateTask = await task.update(toEdit);
      return res.json(updateTask);
    } catch (e) {
      console.log(e);
      const eToMap = get(e, 'errors', [{ message: 'Unkown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }

  /*
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando id'],
        });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      await aluno.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  */
}

export default new TasksController();

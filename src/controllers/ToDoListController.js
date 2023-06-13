/* eslint-disable prefer-const */
import { get } from 'lodash';
import ToDoList from '../models/ToDoList';
import Task from '../models/Task';

class ToDoListController {
  async index(req, res) {
    try {
      const toDoLists = await ToDoList.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [['id', 'ASC']],
        include: {
          model: Task,
        },
      });

      return res.json(toDoLists);
    } catch (e) {
      console.log(e);
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
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
          errors: ['Parameters status and delivery_date valid only in update route'],
        });
      }
      const toDoList = await ToDoList.create({ name });
      const { id } = toDoList;
      return res.json({ id, name });
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
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
          errors: ['ToDoList ID is missing'],
        });
      }
      const toDoList = await ToDoList.findByPk(id);
      if (!toDoList) {
        return res.status(400).json({
          errors: ['ToDoList does not exist'],
        });
      }

      const { name, delivery_date, status } = toDoList;

      return res.json({
        id, name, status, delivery_date,
      });
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
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
          errors: ['Task ID is missing'],
        });
      }
      const toDoList = await ToDoList.findByPk(id);
      if (!toDoList) {
        return res.status(400).json({
          errors: ['ToDoList does not exist'],
        });
      }

      const toEdit = {};
      const { name, status, delivery_date } = req.body;

      if (name) toEdit.name = name;

      if (status && toDoList.status === 2) {
        return res.status(400).json({
          errors: ['ToDoList was finished'],
        });
      }

      if (status != null) {
        if (status === 0 || status === 1 || status === 2) {
          toEdit.status = status;
        } else {
          return res.status(400).json({
            errors: ['status can be 0 (pending) or 1 (in progress) or 2 (finished)'],
          });
        }
      }

      if (delivery_date) {
        const { year, month, day } = delivery_date;

        // Check if exists
        if (!year || !month || !day) {
          return res.status(400).json({
            errors: ['delivery_date must be a dict with year, month and day'],
          });
        }

        // Check if are valids
        if (!Number.isInteger(year)) {
          return res.status(400).json({
            errors: ['delivery_date.year must be integer'],
          });
        }

        if (!Number.isInteger(month) || month < 1 || month > 12) {
          return res.status(400).json({
            errors: ['delivery_date.month must be integer, between 1 (January) and 12 (December)'],
          });
        }

        if (!Number.isInteger(day) || day < 1 || day > 31) {
          return res.status(400).json({
            errors: ['delivery_date.day must be integer, between 1 and 31'],
          });
        }
        const aux_delivery_date = new Date(year, month - 1, day);

        let now = new Date();

        now.setDate(now.getDate() - 1);

        if (aux_delivery_date <= now) {
          return res.status(400).json({
            errors: ['delivery_date cannot be in the past'],
          });
        }

        toEdit.delivery_date = `${aux_delivery_date.getFullYear()}-${aux_delivery_date.getMonth() + 1}-${aux_delivery_date.getDate()}`;
      }

      await toDoList.update(toEdit);

      return res.json({ updated: id });
    } catch (e) {
      console.log(e);
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ToDoList ID is missing'],
        });
      }
      const toDoList = await ToDoList.findByPk(id);
      if (!toDoList) {
        return res.status(400).json({
          errors: ['ToDoList does not exist'],
        });
      }

      await toDoList.destroy();
      return res.json({ deleted: id });
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }
}

export default new ToDoListController();

/* eslint-disable prefer-const */
import { get } from 'lodash';
import Tasks from '../models/Task';
import ToDoList from '../models/ToDoList';

class TasksController {
  /*
  async index(req, res) {
    try {
      const tasks = await Tasks.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [['id', 'ASC']],
      });
      return res.json(tasks);
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  } */

  async store(req, res) {
    try {
      const { name, status, to_do_list_id } = req.body;

      if (!name || !to_do_list_id) {
        return res.status(400).json({
          errors: ['Task must be name and to_do_list_id'],
        });
      }
      const toDoList = await ToDoList.findByPk(to_do_list_id);

      if (!toDoList) {
        return res.status(400).json({
          errors: ['ToDoList not exists'],
        });
      }

      const pass_status = status || 0;
      const task = await Tasks.create({ to_do_list_id, name, status: pass_status });
      const { id } = task;
      return res.json({ id });
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }

  /* async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Task ID is missing'],
        });
      }
      const task = await Tasks.findByPk(id);
      if (!task) {
        return res.status(400).json({
          errors: ['Task does not exist'],
        });
      }

      const { name, delivery_date, status } = task;

      return res.json({
        id, name, status, delivery_date,
      });
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  } */

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Task ID is missing'],
        });
      }
      const task = await Tasks.findByPk(id);
      if (!task) {
        return res.status(400).json({
          errors: ['Task does not exist'],
        });
      }

      const toEdit = {};
      const { name, status } = req.body;

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
            errors: ['status can be 0 (pending) or 1 (in progress) or 2 (finished)'],
          });
        }
      }

      await task.update(toEdit);

      return res.json({ updated_task: id });
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
          errors: ['Task ID is missing'],
        });
      }
      const task = await Tasks.findByPk(id);
      if (!task) {
        return res.status(400).json({
          errors: ['Task does not exist'],
        });
      }

      await task.destroy();
      return res.json({ deleted_task: id });
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }
}

export default new TasksController();

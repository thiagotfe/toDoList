import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const { id, nome, email } = await User.create(req.body);
      const novoUser = { id, nome, email };
      return res.json(novoUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      const { id, nome, email } = await User.findByPk(req.params.id);
      const user = { id, nome, email };
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      /* if (!req.params.id) {
        return res.status(400).json({
          errors: ['Id não enviado.'],
        });
      } */
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }
      const { id, nome, email } = await user.update(req.body);
      const novosDados = { id, nome, email };
      return res.json(novosDados);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      /* if (!req.params.id) {
        return res.status(400).json({
          errors: ['Id não enviado.'],
        });
      } */
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }
      const { id, nome, email } = user;
      const deletedUser = { id, nome, email };
      await user.destroy();
      return res.json(deletedUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();

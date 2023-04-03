// import Aluno from '../models/Aluno';
import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto';
import Aluno from '../models/Aluno';

const upload = multer(multerConfig).single('foto');

class FotoController {
  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      const { originalname, filename } = req.file;
      const { aluno_id } = req.body;
      if (aluno_id) {
        const aluno = await Aluno.findByPk(aluno_id);
        if (!aluno) {
          return res.status(400).json({
            errors: ['Aluno não existe'],
          });
        }
      }
      const foto = await Foto.create({ originalname, filename, aluno_id });
      return res.json(foto);
    });
  }
}

export default new FotoController();

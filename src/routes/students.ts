import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from '../controllers/students';

const studentRouter = Router();

studentRouter.get('/', getStudents);
studentRouter.post('/', createStudent);
studentRouter.delete('/', deleteStudent);
studentRouter.put('/', updateStudent);
studentRouter.get('/:id', getStudentById);

export default studentRouter;

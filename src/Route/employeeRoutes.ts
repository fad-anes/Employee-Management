import { Router, Request, Response } from 'express';
import { addEmployee, updateEmployee, deleteEmployee } from '../Controlleur/employeeController';
import { validateEmployee, validateEmployeeUpdate,validateEmployeeDelete } from '../middleware/validationMiddleware';
const router = Router();

// POST /employees - Ajouter un nouvel employé
router.post('',validateEmployee, async (req: Request, res: Response) => {
      await addEmployee(req, res);
  });

// PUT /employees/:id - Mettre à jour un employé existant
router.put('/:id',validateEmployeeUpdate, async (req: Request, res: Response) => {
    await updateEmployee(req, res);
});
// DELETE /employees/:id - Supprimer un employé par ID
router.delete('/:id',validateEmployeeDelete, async (req: Request, res: Response) => {
    await deleteEmployee(req, res);
});
export default router;

import { Router } from 'express';
import { addEmployee, updateEmployee, deleteEmployee } from '../Controlleur/employeeController';
import { Request, Response } from 'express';

const router = Router();

// POST /employees - Ajouter un nouvel employé
router.post('', async (req: Request, res: Response) => {
      await addEmployee(req, res);
  });

// PUT /employees/:id - Mettre à jour un employé existant
router.put('/:id', async (req: Request, res: Response) => {
    await updateEmployee(req, res);
});
// DELETE /employees/:id - Supprimer un employé par ID
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteEmployee(req, res);
});
export default router;

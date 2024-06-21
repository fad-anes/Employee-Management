import { Request, Response } from 'express';
import Employee from '../Model/Employee';

// Ajouter un nouvel employé
export const   addEmployee=async(req:Request, res:Response): Promise<void> =>{
    try {
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  // Mettre à jour un employé existant
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
      if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
  
  // Supprimer un employé par ID
  export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }
      res.status(200).json({ message: 'Employee deleted' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
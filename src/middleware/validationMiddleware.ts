import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import Employee from '../Model/Employee';

// Middleware de validation pour ajouter un employé
export const validateEmployee = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required')
    .custom(async (value: string) => {
      // Vérifier si l'email existe déjà
      const employee = await Employee.findOne({ email: value });
      if (employee) {
        throw new Error('Email already exists');
      }
    }),
  body('position').isString().withMessage('Position must be a string').notEmpty().withMessage('Position is required'),
  body('department').optional().isString().withMessage('Department must be a string'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const emailError = errors.array().find(error => error.msg === 'Email already exists');
        if (emailError) {
          return res.status(302).json({ message: emailError.msg });
        }
        return res.status(400).json({ errors: errors.array() });
      }
    next();
  },
];

// Middleware de validation pour mettre à jour un employé
export const validateEmployeeUpdate = [
  param('id').isMongoId().withMessage('Invalid employee ID'),
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').optional().isEmail().withMessage('Invalid email')
    .custom(async (value: string, { req }) => {
      // Vérifier si l'email existe déjà pour un autre employé
      if (value !== req.body.email) {
        const employee = await Employee.findOne({ email: value });
        if (employee) {
            throw new Error('Email already exists');
        }
      }
    }),
  body('position').optional().isString().withMessage('Position must be a string'),
  body('department').optional().isString().withMessage('Department must be a string'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const emailError = errors.array().find(error => error.msg === 'Email already exists');
        if (emailError) {
          return res.status(302).json({ message: emailError.msg });
        }
        return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];



// Middleware de validation pour supprimé un employé
export const validateEmployeeDelete = [
    param('id').isMongoId().withMessage('Invalid employee ID'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

import mongoose, { Document, Schema } from 'mongoose';
// L'interface étend Document de Mongoose pour inclure les propriétés d'un document MongoDB
interface IEmployee extends Document {
  name: string;
  email: string;
  position: string;
  department?: string;
  salary?: number;
}
// Le schéma définit la structure des documents dans la collection MongoDB
const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  department: { type: String },
  salary: { type: Number },
});

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);
export default Employee;
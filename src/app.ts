import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import employeeRoutes from './Route/employeeRoutes';
// Charger les variables d'environnement depuis le fichier .env
dotenv.config();
// Connexion à MongoDB en utilisant l'URL de la base de données définie dans les variables d'environnement
const databaseUrl = process.env.DATABASE_URL;
// Vérifiez si DATABASE_URL est défini
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}
// Connexion à MongoDB avec gestion des erreurs de connexion
mongoose.connect(databaseUrl);
// Récupération de la connexion de la base de données
const db = mongoose.connection;
// Gestion des événements de la connexion MongoDB
// En cas d'erreur de connexion
db.on('error', (error) => console.error('Error connecting to database:', error));
// Une fois connecté avec succès
db.once('open', () => {
  console.log('Connected to Database');
});
// Initialisation de l'application Express
const app = express();
app.use(express.json());
// Routes
app.use('/employees', employeeRoutes);
// Définir le port sur lequel le serveur écoutera (soit la variable d'environnement PORT, soit 3000 par défaut)
const port = process.env.PORT || 3000;
// Démarrer le serveur et écouter sur le port défini
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
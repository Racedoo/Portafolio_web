const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const path = require('path');

// Middleware para interpretar JSON
app.use(express.json());

app.use(cors());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Definir una ruta básica
app.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor!');
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

//base de datos

// Configuración de conexión
const db = mysql.createConnection({
    host: 'localhost',       // Servidor de la base de datos
    user: 'root',            // Usuario de MySQL
    password: '',            // Contraseña (dejar vacío si no tiene)
    database: 'base_datos' // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error de conexión a MySQL:', err);
    } else {
        console.log('Conectado a MySQL 🟢');
    }
});

module.exports = db;

// endpoints

app.post('/api/consulta', (req, res) => {
    const { nombre, apellido, email, asunto, mensaje } = req.body;

    // Validación de datos
    if (!nombre || !apellido || !email || !asunto || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = 'INSERT INTO consultas (nombre, apellido, email, asunto, mensaje) VALUES (?, ?, ?, ?, ?)';
    const values = [nombre, apellido, email, asunto, mensaje];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ message: 'Consulta registrada exitosamente' });
    });
});
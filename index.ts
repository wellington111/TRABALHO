import express from 'express';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import db from './db/db';

const app = express();
const port = 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Rotas
app.use('/api', userRoutes);
app.use('/api', taskRoutes);

// Testar conexão ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    } else {
        console.log('Conexão com banco de dados estabelecida.');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

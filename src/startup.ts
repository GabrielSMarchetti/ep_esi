import express from 'express';
import { errorHandler } from './middleware/ErrorHandler';
import { SqliteDataSource } from './infra/DataSource';
import { RepositoryManager } from './infra/RepositoryManager';
import { initializeRouter } from './routes/Routes';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const app: express.Application = express();
const port: number = 3000;

async function startServer() {
    const dataSource = SqliteDataSource.getInstance();
    
    try {
        await dataSource.initialize();
        console.log('Database initialized');

        const repositoryManager = RepositoryManager.getInstance();
        repositoryManager.initialize();
        console.log('Repository Manager initialized');

        const routes = initializeRouter();
        console.log('Routes initialized');

        app.use(express.json());
        app.use('/api', routes);

        app.use(errorHandler);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error during Data Source initialization:', err);
    }
}

startServer();

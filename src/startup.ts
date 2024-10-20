import express from 'express';
import routes from './routes/Routes';
import { errorHandler } from './middleware/ErrorHandler';
import { SqliteDataSource } from './infra/DataSource';

const app: express.Application = express();
const port: number = 3000;
const dataSource = SqliteDataSource.getInstance().initialize();

app.use(express.json()); 
app.use('/api', routes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

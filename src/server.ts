import express from 'express';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(3333);

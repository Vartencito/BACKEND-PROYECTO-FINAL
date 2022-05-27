import express from 'express'
import config from './config'
import userRoutes from './routes/userRoutes'
import publicationRoutes from './routes/publicationRoutes'


const app = express();

app.set('port', config.port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use(userRoutes);
app.use(publicationRoutes);

export default app
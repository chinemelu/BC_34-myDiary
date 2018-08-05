import express from 'express';
import bodyparser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import diaryRoutes from './routes/diaryRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(logger('dev'));


app.use('/api/v1/entries', diaryRoutes);
app.use('/api/v1/auth', userRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'This page is not available'
  });
});

app.use((req, res) => {
  res.status(500).json({ message: 'Internal Server Error' });
});


const port = process.env.PORT || 3000;

app.set('port', port);

const server = app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

export default server;

import express from 'express';
import path from 'path';
import http from 'http';
import bodyparser from 'body-parser';
import logger from 'morgan';


const app = express();

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
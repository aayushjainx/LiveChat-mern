import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

const MONGO_URI = 'mongodb+srv://aayush:aayush@cluster0.snoge.mongodb.net/livechatdb?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data);
  });
});

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

app.listen(port, () => console.log(`Listening on Localhost: ${port}`));

import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: '1203644',
  key: '10d3b72df87d15f0af96',
  secret: '76fc6bd5192f0efd600b',
  cluster: 'ap2',
  useTLS: true,
});

app.use(express.json());

app.use(cors());

const MONGO_URI = 'mongodb+srv://aayush:aayush@cluster0.snoge.mongodb.net/livechatdb?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('MONGODB connected.');
  const msgCollection = db.collection('messagecontents');
  const changesStream = msgCollection.watch();

  changesStream.on('change', (change) => {
    console.log(change);
    if ((change.operationType = 'insert')) {
      const msgDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: msgDetails.name,
        message: msgDetails.message,
        timestamp: msgDetails.timestamp,
        received: msgDetails.received,
      });
    } else {
      console.log('Error triggering Pusher.');
    }
  });
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

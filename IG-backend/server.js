import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import dbModel from './dbModel.js';


const app = express();
const port = process.env.PORT || 8080;


const pusher = new Pusher({
  appId: "1433961",
  key: "b2f65def7f00e3ca2b7d",
  secret: "514b0b92edb1509d68a1",
  cluster: "us2",
  useTLS: true,
});


app.use(express.json());
app.use(cors());



const connection_url = 'mongodb+srv://terkerd:Dynasty1@cluster0.e5ay0ag.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connection_url, 
    {
        
        useNewUrlParser: true,
        UseUnifiedTopology: true,
        
    })
mongoose.connection.once('open', () =>
{
    console.log('DB Connected');

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', (change) => 
    {
        console.log('Change Triggered on pusher...')
        console.log(change)
        console.log('End of Change')

        if (change.operationType === 'insert')
        {
            console.log('Triggering Pusher ***IMG UPLOAD***')

            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted',
            {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image,
            })
        }
        else
        {
            console.log('Unknown trigger from Pusher');
        }
    });
});



app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/upload', (req, res)=>
{
    const body = req.body;

    dbModel.create(body, (err, data) =>
    {
        if (err)
        {
            res.status(500).send(err);
        }

        else
        {
            res.status(201).send(data);
        }
    });
});

app.get('/sync', (req, res) => 
{
    dbModel.find((err, data) =>
    {
        if (err)
        {
            res.status(500).send(err);
        }

        else
        {
            res.status(200).send(data);
        }
    })
})

app.listen(port, () => console.log(`listening on localhost:${port}`));
const express = require('express');
const bodyParser = require('body-parser');
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds, deleteAd, updateAd} = require('./database/ads');

const app = express();

const ads = [
    {title: 'Hello, world (again)!'}
];

app.use(bodyParser.json());


app.get('/', async(req, res) => {
    res.send(await getAds());
});

app.post('/', async(req, res) => {
    const newAd = req.body;
    await insertAd(newAd);
    res.send({message: 'New Ad Inserted'});
});

app.delete('/:id', async(req, res) => {
    await deleteAd(req.params.id);
    res.send({message: 'Ad removed'});  
});

app.put('/:id', async(req, res) => {
    const updatedAd = req.body;
    await updateAd(req.params.id, updatedAd);
    res.send({message: 'Ad updated'});
});

startDatabase().then(async () => {
    await insertAd({title: 'Hello, now from the in-memory database!'});

    app.listen(3001, async() => {
        console.log('listening on port 3001');
    });
});
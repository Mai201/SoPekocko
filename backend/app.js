const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const Sauce = require('./models/sauce');

const app = express();
mongoose.connect('mongodb+srv://Mai201:3hTju34GWsUNK1lA@cluster0.4q1ru.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

app.use(bodyParser.json());

app.get('/api/sauces', (req, res, next) => {
   const sauces = [
     {
       _id: 'oeihfzeoi',
       userId: 'qsomihvqios',
       name: 'Sauce alligator',
       manufacturer:'wok panda',
       description: 'sauce piquante citron gingembre',
       mainPepper:'gingembre',
       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
       heat:8,
       likes:99,
       dislikes:11,
       usersLiked:['usersIdLike'],
       usersDisliked:['usersIdDislike']
     },
     {
      _id: 'oeihjfleok',
      userId: 'qsomihvqios',
      name: 'Sauce panda',
      manufacturer:'wok panda',
      description: 'sauce piquante soja',
      mainPepper:'soja',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      heat:9,
      likes:150,
      dislikes:21,
      usersLiked:['usersIdLike'],
      usersDisliked:['usersIdDislike']
    },
     
   ];
   res.status(200).json(sauces);
 });

 app.post('/api/sauces', (req, res, next) => {
   delete req.body._id;
  const sauce = new Sauce({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;
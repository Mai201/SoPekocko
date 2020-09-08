const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

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

// sanitize data to prevent injection
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// replace prohibited characters ('$','.') with '_'
app.use(mongoSanitize(
  {
    replaceWith:'_'
  }))

app.use('/images',express.static(path.join(__dirname,'images')));
app.use('/api/sauces',sauceRoutes);
app.use('/api/auth',userRoutes);

// add helmet
app.use(helmet());
 
// helmet() is equivalent to this:
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());

module.exports = app;
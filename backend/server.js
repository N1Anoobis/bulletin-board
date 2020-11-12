const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const uniqid = require('uniqid');
const postsRoutes = require('./routes/posts.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());


app.use(formidable({ uploadDir: './public/uploads/' }, [{
  event: 'fileBegin', // on every file upload...
  action: (req, res, next, name, file) => {
    const fileName = uniqid() + '.' + file.name.split('.')[1];
    file.path = __dirname + '/public/uploads/photo_' + fileName;
  },
},
]));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// /* API ENDPOINTS */
app.use('/api', postsRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
mongoose.connect('mongodb+srv://slawomir:energy2000@cluster0.rqbyt.mongodb.net/bouletinBoardDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*',(req, res)=> {
    res.sendFile(path.resolve(__dirname,'build','index.html'));
  });
}
/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});

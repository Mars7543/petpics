 const express     = require('express'),
      app         = express();

// app config
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/public'));

// route config
const indexRoutes = require('./routes');
const pictureRoutes = require('./routes/pictures');

app.use(indexRoutes);
app.use(pictureRoutes);

// server config
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}...`);
});

// TODO: Add Side Bar With Search Filter Options, Groups, Friends, etc. and Post button

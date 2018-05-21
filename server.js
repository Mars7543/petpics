 const express     = require('express'),
      app         = express();

// app config
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/public'));

// route config
const indexRoutes = require('./routes');

app.use(indexRoutes);

// server config
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}...`);
});

// TODO: Make Landing Page Repsonsive (Including SideNav for Mobile)
// TODO: Make Main Navbar

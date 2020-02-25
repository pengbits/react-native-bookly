const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookly',  {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', (error) => {
  console.log(error)
});
db.once('open', function() {
  console.log('db open!')
  // we're connected!
});

export default db
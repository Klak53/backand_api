const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then((db) => console.log(`Connected successfully to \x1B[36m${db.connection.name}\x1B[m database`))
  .catch((err) => console.log(err));

// Dependancies
const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected')
})

mongoose.connection.on('error', (err) => {
    console.log(`Could not connect to MongoDB because of ${err}`)
    process.exit(1)
})

exports.connect = () => {
    // Connect With Mongoose:
    mongoose.connect(process.env.DB_URI, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
  
    // Set Mongoose Options:
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true)
  
    // Return Mongoose Connection Object
    return mongoose.connection
}
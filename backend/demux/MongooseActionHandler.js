const {
  handlers: { AbstractActionHandler }
} = require("demux");
const mongoose = require("mongoose");

class ObjectActionHandler extends AbstractActionHandler {
  constructor(updaters, effects, uri, models) {
    mongoose.connect(uri);

    // CONNECTION EVENTS
    // Connection successful
    mongoose.connection.on('connected', () => {  
      console.log('Mongoose default connection open to ' + uri);

      // If using nodemon to restart the server on change - prevents duplicate records in the db
      // Clear db on each restart
      if(process.env.MONGODB_CLEAR_ON_RESTART) {
        mongoose.connection.db.dropDatabase();
      }
    }); 

    // Connection throws an error
    mongoose.connection.on("error", console.error.bind(console, "Mongoose default connection error:"));
    
    // Connection is disconnected
    mongoose.connection.on('disconnected', () => {  
      console.log('Mongoose default connection disconnected'); 
    });
    
    // Close the connection if the node process is terminated
    process.on('SIGINT', () => {  
      mongoose.connection.close(() => { 
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
      }); 
    }); 
    super(updaters, effects)
    this.models = models
  }

  async handleWithState(handle) {
    // do not need to use the mongoose.connection object if using mongoose.Model
    // mongoose.model objects will use the default connection pool which we setup in the constructor above
    await handle(this.models);
  }
}

module.exports = ObjectActionHandler;

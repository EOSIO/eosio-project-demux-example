const mongoose = require("mongoose");

exports.connect = async () => {
    var mongoDB = process.env.MONGODB_URL;
    await mongoose.connect(mongoDB);

    mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));

    if(process.env.MONGODB_CLEAR_ON_RESTART) {
        mongoose.connection.db.dropDatabase();
    }

    mongoose.Promise = global.Promise;

    return mongoose.connection;
}

exports.getConnection = () => {
    return mongoose.connection;
}

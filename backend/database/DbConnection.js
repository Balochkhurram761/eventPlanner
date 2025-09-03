import mongoose from "mongoose";

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("The database is connected succesfully");
  } catch (error) {
    console.log("The database is not connected succesfully", error.message);
    process.exit(1);
  }
};

export default DbConnection;

import mongoose from "mongoose";
const DBconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db is connected");
  } catch (err) {
    console.log("db didn't connect");
    console.error(err.message);
    process.exit(1);
  }
};

export default DBconnect ;

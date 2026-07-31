import express from "express";
import dotenv from "dotenv";
import DBconnect from "./Config/db.js";
import dns from "dns";
import productRouter from "./Routers/productsRoute.js";
import cors from "cors"

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();
DBconnect();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", productRouter);
/*app.use((err,req,res,next)=>{

})*/
app.listen(process.env.PORT, () => {
  console.log(`it is running on port ${process.env.PORT}`);
});

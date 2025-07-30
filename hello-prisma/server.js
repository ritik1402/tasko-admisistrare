import express, { urlencoded } from 'express';
import dotenv from 'dotenv'
import routes from './routes/index.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(cors());


dotenv.config();


const port = process.env.PORT || 8080;


app.get("/",(req,res)=>{
    res.send("hello world");
})

// all rotes are  here 
app.use(routes);



// server listening 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

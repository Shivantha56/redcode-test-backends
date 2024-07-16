import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors"
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import payment from './controller/payment.controlller'

export const app = express();
app.use(cors({origin:"http://localhost:3000",credentials: true}))
app.use(cookieParser());
app.use(bodyParser.json({limit:"10mb"}))
const port = 5000;

app.use("/api/v1/payment", payment)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

startServer()


function startServer() {
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
}

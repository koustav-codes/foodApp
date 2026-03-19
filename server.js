import express from 'express';
import colors from 'colors';
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import testRoutes from './routes/testRoutes.js'
import connectDb from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js';


//dot enc configuration
dotenv.config()

connectDb()

//rest object
const app = express()

//middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//route
//URL=> http://localhost:8080
app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)



app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to Food Server App</h1>")
});


//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is Running, listening to port no ${PORT}`.white.bgMagenta)
})
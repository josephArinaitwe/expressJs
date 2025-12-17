import express from "express";

const app = express();

app.use(express.json()); // for application/json
app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded


// routes import
import userRouter from './routes/user.route.js';
//import postRouter from './routes/post.route.js';

// routes declaration
app.use("/api/v1/users", userRouter);
//app.use("/api/v1/posts", postRouter);

//example route: http://locoalhost:4000/api/v1/users/register


export default app;
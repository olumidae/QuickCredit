import express from 'express';
import bodyParser from 'body-parser';

import route from './routes/routes';


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// endpoints
app.use('/api/v1', route);

// Routes
// app.use('/', (req, res) => {
//   res.send({ message: 'Welcome to the homepage' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running on ${PORT}!!!`));

export default app;

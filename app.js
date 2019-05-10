import express from 'express';
import bodyParser from 'body-parser';
import debug from 'debug';
import route from './server/routes/routes';


const app = express();
const Debug = debug('dev');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// endpoints
app.use('/', route);

// Routes
// app.use('/', (req, res) => {
//   res.send({ message: 'Welcome to the homepage' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running on ${PORT}!!!`));

export default app;

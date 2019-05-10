import express from 'express';
import bodyParser from 'body-parser';
import index from './server/routes/routes';
import users from './server/routes/users';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// endpoints
app.use('/api/v1/auth/signup', users);

// Routes
// app.use('/', (req, res) => {
//   res.send({ message: 'Welcome to the homepage' });
// });
app.use('/', index);

// app.use('/api/v1/signin', users);


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running on ${PORT}!!!`));

export default app;

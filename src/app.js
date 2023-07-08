import MongoStore from 'connect-mongo';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import path from 'path';
import { iniPassport } from './config/passport.config.js';
import { petsRouter } from './routes/pets.router.js';
import { testSocketChatRouter } from './routes/test.socket.chat.router.js';
import { usersHtmlRouter } from './routes/users.html.router.js';
import { usersRouter } from './routes/users.router.js';
import { __dirname, connectMongo, connectSocket, passportCall } from './utils.js';
import cookieParser from 'cookie-parser';
import { checkAuth } from './middlewares/auth.js';
import { advancedRouter } from './routes/advanced.router.js';

const app = express();
const port = 3000;
export const SECRET = 'my-secret';

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

connectMongo();
connectSocket(httpServer);

//CONFIG EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser(SECRET));

app.use(
  session({
    store: MongoStore.create({ mongoUrl: '', ttl: 7200 }),
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//TODO LO DE PASSPORT
iniPassport();
app.use(passport.initialize());
//app.use(passport.session());
//FIN TODO LO DE PASSPORT

//CONFIG RUTAS
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/users', usersHtmlRouter);
app.use('/test-chat', testSocketChatRouter);
app.use('/ruteo-avanzado', advancedRouter);

/* app.use('/auth', authRouter); */

/* app.get('/jwt-login-form', (req, res) => {
  return res.render('jwt-login');
});

app.post('/jwt-login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (email == 'pepe@pepe.com' && password == '123') {
    const token = jwt.sign({ email, age: 40, role: 'user' }, SECRET, { expiresIn: '24h' });

    return res
      .cookie('token', token, { maxAge: 24 * 3600 * 1000, httpOnly: true })
      .status(200)
      .json({
        status: 'success',
        msg: 'login success!!',
        payload: {},
      });
  } else {
    return res.status(401).json({
      status: 'error',
      msg: 'no se puede ingresar',
      payload: {},
    });
  }
});

app.get('/jwt-profile', passportCall('jwt'), checkAuth('user'), (req, res) => {
  return res.json({ payload: req.user });
}); */

/* app.use('/jwt-profile', (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  //const token = req.cookies.token;
  console.log(token);

  try {
    const decoded = jwt.verify(token, SECRET);
    return res.status(200).json({
      status: 'success',
      msg: 'toma tu profile',
      payload: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      msg: 'Unauthorized',
      payload: {},
    });
  }
}); */

app.get('*', (_, res) => {
  return res.status(404).json({
    status: 'error',
    msg: 'no encontrado',
    data: {},
  });
});

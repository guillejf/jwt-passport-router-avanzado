import passport from 'passport';
import jwt from 'passport-jwt';
import local from 'passport-local';
import { UserModel } from '../DAO/models/users.model.js';
import { SECRET } from '../app.js';

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

function cookieExtractor(req) {
  /* console.log('hola');
  console.log(req.cookies.token); */
  let token = null;

  if (req?.cookies?.token) {
    token = req.cookies.token;
  }
  return token;
}

export function iniPassport() {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  /* passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  }); */
}

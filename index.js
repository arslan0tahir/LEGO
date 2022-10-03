const expressApp=require('./libraries/expressApp')
var authenticateMW= require('./middleware/authenticateMW')
const errors=require('./errors/errors')
const logger=require('./logger/logger')

const sessionUid=require('./libraries/sessionUid')


const auth_signin= require('./routes/auth/signin')
const auth_signup= require('./routes/auth/signup')
const auth_signout= require('./routes/auth/signout')
const auth_reinstate= require('./routes/auth/reinstate')
const cors = require('cors');

var bodyParser     =        require("body-parser");

const app = expressApp.app;
const port = 33333

// app.get('/', (req, res) => res.send('Hello World!'))

app.use(cors({
    // origin: ['https://127.0.0.1:3000']
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {

    logger.info("CREATED ON REQUEST "+ sessionUid(1))
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});



logger.info("Start "+ sessionUid())
app.use(authenticateMW);

app.use('/_api/auth/signin',auth_signin);
app.use('/_api/auth/signup',auth_signup);
app.use('/_api/auth/signout',auth_signout);
app.use('/_api/auth/reinstate',auth_reinstate);
logger.info("END "+ sessionUid())



app.use(errors.errorLogger);
app.use(errors.errorResponder);
app.use(errors.invalidPathHandler);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


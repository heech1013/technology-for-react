// "script" : { "start": "cross-env NODE_PATH=src node src", "start:dev": "cross-env NODE_PATH=src nodemon --watch src/ src/index.js" }
require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');  // Request Body에 JSON 형식으로 데이터를 넣어 주면, 이를 파싱해서 서버에서 사용할 수 있게 한다.
const mongoose = require('mongoose');

const api = require('./api');

const {
  PORT: port = 4000, // port 값이 존재하지 않으면 4000을 기본 값으로 사용
  MONGO_URL: mongoURL
} = process.env;

mongoose.Promise = global.Promise;  // Node의 Promise를 사용하도록 설정
mongoose.connect(mongoURL, { useNewUrlParser: true }).then(() => {
  console.log('connected to mongodb');
}).catch((e) => {
  console.error(e);
})

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());  // api 라우트 적용

/* bodyParser 적용. 라우터 적용 전에! */
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethod());

app.listen(port, () => {
  console.log('listening to port ', port);
});
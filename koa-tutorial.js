const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = '홈';
});
router.get('/about', (ctx) => {
  ctx.body = '소개';
});

/* 라우터의 파라미터 */
router.get('/about/:name?', (ctx) => {  // 라우터의 파라미터 설정(:param) / 파라미터가 있을 수도, 없을 수도 있을 때(:param?)
  const { name } = ctx.params;  // ctx.params 객체에서 파라미터를 조회할 수 있다.
  ctx.body = name ? `${name}의 소개` : '소개';
});

/* 라우터의 쿼리
    { id: '10 } 형태의 객체를 ctx.query에서 조회할 수 있다.
    쿼리스트링을 자동으로 객체 형태로 파싱해주므로 파싱 함수를 돌릴 필요가 없다.
    문자열 형태의 쿼리스트링을 조회해야 할 때는 ctx.queryString을 사용한다. */
router.get('/posts', (ctx) => {
  const { id } = ctx.query;
  ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
});

/* app 인스턴스에 라우터 적용 */
app.use(router.routes()).use(router.allowedMethods());

/* next는 프로미스를 반환한다. */
app.use((ctx, next) => {
  console.log(1);
  next().then(() => {  // next로 인해 다음 미들웨어들이 실행되고 난 후, next의 프로미스가 실행된다.
    console.log('bye');
  });
});

/* koa는 async await을 정식으로 지원한다. */
app.use(async (ctx, next) => {
  console.log(1);
  await next();  // 다음 미들웨어들을 실행한다.
  console.log('bye');  // 그 다음 'bye'를 출력한다. (위의 미들웨어와 동일한 순서로 진행)
});

app.use((ctx) => {
  ctx.body = 'hello world';
});

app.listen(4000, () => {
  console.log('listening to port 4000');
});  // 서버 실행: $ node src
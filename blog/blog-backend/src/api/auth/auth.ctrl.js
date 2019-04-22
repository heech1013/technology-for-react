require('dotenv').config();
const { ADMIN_PASS: adminPass } = process.env;

exports.login = (ctx) => {
  const { password } = ctx.request.body;
  if (adminPass === password) {
    ctx.body = {
      sucess: true
    };
    // 로그인에 성공하면 logged 값을 true로 설정한다.
    // 세션에 값을 설정할 때는 'ctx.session.이름 = 값' 형식을 사용한다. 조회할 때도 마찬가지.
    ctx.session.logged = true;
  } else {
    ctx.body = {
      success: false
    };
    ctx.status = 401;  // unauthorized
  }
};

exports.check = (ctx) => {
  ctx.body = {
    // !를 두 번 입력하여 값이 존재하지 않을 때도 false를 반환하도록 설정한다..!
    logged: !!ctx.session.logged
  };
};

exports.logout = (ctx) => {
  ctx.session = null;
  ctx.status = 204;  // No Content
};
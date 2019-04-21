const Post = require('models/posts');
const Joi = require('joi');

const { ObjectId } = require('mongoose').Types;
exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.staus = 400;
    return null;
  }
  return next();  // next를 리턴해야 ctx.body가 제대로 설정된다.
};


exports.write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return ;
  }
  const { title, body, tags } = ctx.request.body;
  const post = new Post({  // 새 Post 인스턴스를 만든다.
    title, body, tags
  });
  try {
    await post.save();  // 데이터베이스에 등록한다. save의 반환값은 Promise여서 await을 사용할 수 있다.
    ctx.body = post;  // 저장한 결과 반환
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.list = async (ctx) => {
  const page = parseInt(ctx.query.page || 1, 10);
  if (page < 1) {
    ctx.status = 400;
    return ;
  }
  try {
    const posts = await Post.find()
      .sort({_id: -1})  // 역순(내림차순)으로 정렬한다.
      .limit(10)  // 열 개로 개수를 제한한다.
      .skip((page - 1) * 10)  // 파라미터의 수만큼을 건너뛰고 조회한다. 페이지에 따라 불러오는 게시물 조정
      .lean()  // 길이 제한 관련?
      .exec();  // find() 함수 호출 후 exec()를 붙여 주어야 서버에 쿼리를 요청한다. 
    const postCount = await Post.countDocuments().exec();  // 마지막 페이지 알려주기
    const limitBodyLength = post => ({  // 길이 200자 제한
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
    });
    ctx.body = posts.map(limitBodyLength);
    ctx.set('Last-Page', Math.ceil(postCount / 10));  // ctx.set: response header를 설정한다.
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return ;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  } 
};

exports.update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true  // 업데이트된 객체를 반환한다. 설정하지 않을 시 업데이트 되기 전의 객체를 반환한다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return ;      
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

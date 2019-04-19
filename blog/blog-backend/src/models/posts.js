const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  pulishedDate: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Post', Post);  // 스키마 이름(복수 형태로 디비에 컬렉션 생성), 스키마 객체.
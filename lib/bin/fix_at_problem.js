// 一次性脚本
/* eslint camelcase: 0 */

var TopicModel = require('../models').Topic;

TopicModel.find({
  content: /\[{2,}@/
}).exec(function(err, topics) {
  if (err) {
    return;
  }
  topics.forEach(function(topic) {
    topic.content = fix(topic.content);
    topic.save();
  });
});

function fix(str) {
  str = str.replace(/\[{1,}(\[@\w+)(\]\(.+?\))\2+/, function(match_text, $1, $2) {
    return $1 + $2;
  });
  return str;
}

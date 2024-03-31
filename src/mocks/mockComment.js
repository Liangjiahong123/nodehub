const { Comment } = require('../models');
const Mock = require('mockjs');

const data = Mock.mock({
  'list|30': [
    {
      content: '@csentence(5, 50)',
      'userId|7-11': 1,
      'momentId|1-52': 1
    }
  ]
});

Comment.bulkCreate(data.list);

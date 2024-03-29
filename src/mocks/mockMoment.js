const { Moment } = require('../models');
const Mock = require('mockjs');

const data = Mock.mock({
  'list|50': [
    {
      content: '@csentence(5, 50)',
      'userId|7-11': 1
    }
  ]
});

Moment.bulkCreate(data.list);

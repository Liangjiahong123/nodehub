const { Label } = require('../models');

class LabelService {
  async create(name) {
    const ins = await Label.create({ name });
    return ins.toJSON();
  }

  async findByName(name) {
    const [result] = await Label.findAll({
      where: { name }
    });
    if (result) return result.toJSON();
    return null;
  }
}

module.exports = new LabelService();

const uuid = require("uuid");
const path = require("path");
const { Record, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class RecordController {
  async create(req, res, next) {
    try {
      let { name, description, link, groupId, info } = req.body;
      let { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const record = await Record.create({
        name,
        description,
        groupId,
        link,
        img: fileName,
      });

      if (req.body.info && req.body.info.length > 0) {
        // сохраняем информацию о записи
        info = JSON.parse(req.body.info);
        const promises = info.map((i) => {
          return DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: record.id,
          });
        });
        await Promise.all(promises);
      }
      return res.json(record);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { groupId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let records;
    if (!groupId) {
      records = await Record.findAndCountAll({ limit, offset });
    }
    if (groupId) {
      records = await Record.findAndCountAll({
        where: { groupId },
        limit,
        offset,
      });
    }
    return res.json(records);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const record = await Record.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(record);
  }
}

module.exports = new RecordController();

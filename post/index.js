"use strict";

require("dynamoose");
const uuid = require("uuid").v4;

const PeopleModel = require("./people.schema.js");

exports.handler = async (event) => {
  try {
    const { name, contact } = JSON.parse(event.body);
    const id = uuid();
    const record = new PeopleModel({ id, name, contact });

    const data = await record.save();
    return {
      statusCode: 201,
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};

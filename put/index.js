"use strict";

require("dynamoose");

const PeopleModel = require("./people.schema.js");

exports.handler = async (event) => {
  try {
    const { name, contact } = JSON.parse(event.body);
    const id = event.queryStringParameters && event.queryStringParameters.id;

    const data = await PeopleModel.update({"id":id},{"name":name,"contact":contact})
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

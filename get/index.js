"use strict";

require("dynamoose");

const PeopleModel = require("./people.schema.js");

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters && event.queryStringParameters.id;
    // const id = event.pathParameters && event.pathParameters.id;
    console.log('id is ',id)
    let data;
    if (id) {
        const list = await PeopleModel.query('id').eq(id).exec();
        data = list[0];
    } else {
      data = await PeopleModel.scan().exec();
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};

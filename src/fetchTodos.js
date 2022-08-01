"use strict";

const AWS = require("aws-sdk");

const fetchTodos = async (event,context) => {
  let todos; 
  await context.span('some-label', async () => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();


    try{
        const results = await dynamodb.scan({ TableName: "TodoTable"}).promise();
        todos = results.Items;

    }catch(error) {
        console.log(error);
    }
  });
  return {
    statusCode: 200,
    body: JSON.stringify(todos)
  };

};

module.exports ={
  handler: fetchTodos
}
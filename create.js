import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const { content, attachment } = data;

  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content, // Parsed from request body
      attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };
  await dynamoDb.put(params);

  return params.Item;
}

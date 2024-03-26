import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { env } from '$amplify/env/my-function'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(client)

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log('event', event)

  const command = new ScanCommand({
    TableName: env.MEETUP_EVENT_TABLE_NAME,
    Select: 'COUNT',
  })

  const { Count } = await docClient.send(command)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({
      count: Count,
    }),
  }
}

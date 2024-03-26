import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'
import { myDemoFunction } from './functions/my-function/resource'
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway'
import { Stack } from 'aws-cdk-lib'
import { Function } from 'aws-cdk-lib/aws-lambda'

const backend = defineBackend({
  auth,
  data,
  myDemoFunction,
})

const apiGatewayStack = backend.createStack('apigateway-stack')
const lambdaFunction = backend.myDemoFunction.resources.lambda as Function

// create a REST API resource
const myAPI = new LambdaRestApi(apiGatewayStack, 'MyApi', {
  handler: lambdaFunction,
})

backend.data.resources.tables['MeetupEvent'].grantReadData(lambdaFunction)
lambdaFunction.addEnvironment(
  'MEETUP_EVENT_TABLE_NAME',
  backend.data.resources.tables['MeetupEvent'].tableName
)

// patch the custom REST API resource to the expected output configuration
backend.addOutput({
  custom: {
    apiId: myAPI.restApiId,
    apiEndpoint: myAPI.url,
    apiName: myAPI.restApiName,
    apiRegion: Stack.of(apiGatewayStack).region,
  },
})

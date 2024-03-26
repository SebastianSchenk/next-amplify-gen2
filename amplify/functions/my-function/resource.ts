import { defineFunction } from '@aws-amplify/backend'

export const myDemoFunction = defineFunction({
  environment: {
    MEETUP_EVENT_TABLE_NAME: 'MeetupEvent',
  },
})

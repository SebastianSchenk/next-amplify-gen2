'use client'

import config from '@@/amplifyconfiguration.json'
import { CardMeetupEvent, MeetupEventCard } from '@/components/MeetupEventCard'
import { MeetupSchema } from '@@/amplify/data/resource'
import { generateClient, get } from 'aws-amplify/api'
import { useEffect, useState } from 'react'

const client = generateClient<MeetupSchema>()

async function getEventCount() {
  console.log('get')
  try {
    const restOperation = get({
      apiName: config.custom.apiName,
      path: '',
    })
    const response = await restOperation.response
    console.log('GET call succeeded: ')

    return (await response.body.json()) as { count: number }
  } catch (e: any) {
    console.log('GET call failed: ', e)
  }
}

export default function Home() {
  const [meetupEvents, setMeetupEvents] = useState<CardMeetupEvent[]>([])
  const [meetupEventCount, setMeetupEventCount] = useState<number>(0)

  async function listMeetupGroups() {
    const { data: meetupEvents } = await client.models.MeetupEvent.list({
      authMode: 'iam',
      selectionSet: ['id', 'name', 'date', 'time', 'description', 'group.name'],
    })

    setMeetupEvents(meetupEvents)
  }

  useEffect(() => {
    listMeetupGroups()
    getEventCount().then((res) => setMeetupEventCount(res?.count || 0))
  }, [])

  return (
    <div className="mx-10">
      <h1 className="text-xl mb-10">Meetup events ({meetupEventCount})</h1>

      <ul className="flex flex-wrap">
        {meetupEvents?.map((meetupEvent) => (
          <li key={meetupEvent.id} className="px-3">
            <MeetupEventCard meetupEvent={meetupEvent} />
          </li>
        ))}
      </ul>
    </div>
  )
}

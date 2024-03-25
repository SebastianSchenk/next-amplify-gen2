'use client'

import { CardMeetupEvent, MeetupEventCard } from '@/components/MeetupEventCard'
import { MeetupSchema } from '@@/amplify/data/resource'
import { generateClient } from 'aws-amplify/api'
import { useEffect, useState } from 'react'

const client = generateClient<MeetupSchema>()

export default function Home() {
  const [meetupEvents, setMeetupEvents] = useState<CardMeetupEvent[]>([])

  async function listMeetupGroups() {
    const { data: meetupEvents } = await client.models.MeetupEvent.list({
      authMode: 'iam',
      selectionSet: ['id', 'name', 'date', 'time', 'description', 'group.name'],
    })

    setMeetupEvents(meetupEvents)
  }

  useEffect(() => {
    listMeetupGroups()
  }, [])

  return (
    <div className="mx-10">
      <h1 className="text-xl mb-10">Meetup events</h1>

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

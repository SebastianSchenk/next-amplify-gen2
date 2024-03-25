'use client'

import { Button } from '@/components/Button'
import { CardMeetupEvent, MeetupEventCard } from '@/components/MeetupEventCard'
import { MeetupSchema } from '@@/amplify/data/resource'
import { generateClient } from 'aws-amplify/api'
import Link from 'next/link'
import { FunctionComponent, useEffect, useState } from 'react'

interface ManageGroupPageProps {
  params: {
    groupId: string
  }
}

const client = generateClient<MeetupSchema>()

export const ManageGroupPage: FunctionComponent<ManageGroupPageProps> = ({
  params,
}) => {
  const { groupId } = params
  const [meetupEvents, setMeetupEvents] = useState<CardMeetupEvent[]>([])

  async function getMeetupGroup() {
    const { data: meetupGroup } = await client.models.MeetupGroup.get({
      id: groupId,
    })

    const { data: meetupEvents } = await meetupGroup.events()

    setMeetupEvents(meetupEvents)
  }

  useEffect(() => {
    getMeetupGroup()
  }, [])

  return (
    <main className="mx-10">
      <div className="flex w-full justify-end">
        <Button>
          <Link href={`/manage-group/${groupId}/create-event`}>Create</Link>
        </Button>
      </div>

      <h1 className="text-xl mb-10">My Meetup events</h1>
      <ul className="flex flex-wrap">
        {meetupEvents?.map((meetupEvent) => (
          <li key={meetupEvent.id} className="px-3">
            <MeetupEventCard meetupEvent={meetupEvent} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default ManageGroupPage

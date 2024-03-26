'use client'

import { Button } from '@/components/Button'
import { MeetupGroupCard } from '@/components/MeetupGroupCard'
import { MeetupSchema } from '@@/amplify/data/resource'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { generateClient } from 'aws-amplify/api'
import { AuthUser } from 'aws-amplify/auth'
import Link from 'next/link'
import { FunctionComponent, useEffect, useState } from 'react'

const client = generateClient<MeetupSchema>()

async function listMeetupGroups(user: AuthUser) {
  const { data } = await client.models.MeetupGroup.list({
    filter: {
      owner: {
        contains: user.userId,
      },
    },
  })

  return data
}

const DashboardPage: FunctionComponent = () => {
  const { user } = useAuthenticator((context) => [context.user])
  const [meetupGroups, setMeetupGroups] = useState<
    MeetupSchema['MeetupGroup'][]
  >([])

  useEffect(() => {
    listMeetupGroups(user).then((data) => setMeetupGroups(data))
  }, [user])

  return (
    <main>
      <div className="mx-10">
        <div className="flex w-full justify-end">
          <Button>
            <Link href="/create">Create</Link>
          </Button>
        </div>

        <h1 className="text-xl mb-10">My Meetup groups</h1>

        <ul className="flex flex-wrap">
          {meetupGroups?.map((meetupGroup) => (
            <li key={meetupGroup.id} className="px-3">
              <Link href={`/manage-group/${meetupGroup.id}`}>
                <MeetupGroupCard meetupGroup={meetupGroup} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default DashboardPage

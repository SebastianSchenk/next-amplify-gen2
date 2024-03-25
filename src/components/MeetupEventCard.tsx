import { MeetupSchema } from '@@/amplify/data/resource'
import { FunctionComponent } from 'react'

export type CardMeetupEvent = {
  id: MeetupSchema['MeetupEvent']['id']
  name: MeetupSchema['MeetupEvent']['name']
  date: MeetupSchema['MeetupEvent']['date']
  time: MeetupSchema['MeetupEvent']['time']
  description: MeetupSchema['MeetupEvent']['description']
  group?: {
    name: MeetupSchema['MeetupEvent']['group']['name'] | null
  }
}

export interface MeetupEventCardProps {
  meetupEvent: CardMeetupEvent
}

export const MeetupEventCard: FunctionComponent<MeetupEventCardProps> = ({
  meetupEvent,
}) => {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {meetupEvent.name}
      </h5>
      <small>Host: {meetupEvent.group?.name}</small>
      <p>{meetupEvent.date}</p>
      <p>{meetupEvent.time}</p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {meetupEvent.description}
      </p>
    </div>
  )
}

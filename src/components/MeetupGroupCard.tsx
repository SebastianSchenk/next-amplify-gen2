import { MeetupSchema } from '@@/amplify/data/resource'
import { FunctionComponent } from 'react'

export interface MeetupGroupCardProps {
  meetupGroup: MeetupSchema['MeetupGroup']
}

export const MeetupGroupCard: FunctionComponent<MeetupGroupCardProps> = ({
  meetupGroup,
}) => {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {meetupGroup.name}
      </h5>
      <p>{meetupGroup.location}</p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {meetupGroup.description}
      </p>
    </div>
  )
}

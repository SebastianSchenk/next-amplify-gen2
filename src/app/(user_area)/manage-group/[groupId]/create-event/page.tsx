'use client'

import { Button } from '@/components/Button'
import { FormInput } from '@/components/form/FormInput'
import { FormTextArea } from '@/components/form/FormTextArea'
import { MeetupSchema } from '@@/amplify/data/resource'
import { generateClient } from 'aws-amplify/api'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface CreateEventPageProps {
  params: {
    groupId: string
  }
}

type FormInputs = Omit<MeetupSchema['MeetupEvent'], 'group'>

const client = generateClient<MeetupSchema>()

async function getMeetupGroup(groupId: string) {
  const { data } = await client.models.MeetupGroup.get({
    id: groupId,
  })

  return data
}

export const CreateEventPage: FunctionComponent<CreateEventPageProps> = ({
  params,
}) => {
  const { groupId } = params

  const router = useRouter()

  const [meetupGroup, setMeetupGroup] = useState<MeetupSchema['MeetupGroup']>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  useEffect(() => {
    getMeetupGroup(groupId).then((data) => setMeetupGroup(data))
  }, [groupId])

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log('create event', data)

    try {
      await client.models.MeetupEvent.create({
        ...data,
        group: meetupGroup,
      })

      router.push(`/manage-group/${groupId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <main className="mx-10">
      <h1 className="text-xl mb-10">Create event for {meetupGroup?.name}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <FormInput label="Name" {...register('name', { required: true })} />
        <FormInput
          type="date"
          label="Date"
          {...register('date', { required: true })}
        />
        <FormInput
          type="time"
          label="Time"
          {...register('time', { required: true })}
        />
        <FormTextArea
          label="Description"
          rows={10}
          {...register('description', { required: true })}
        />

        <Button type="submit">Create event</Button>
      </form>
    </main>
  )
}

export default CreateEventPage

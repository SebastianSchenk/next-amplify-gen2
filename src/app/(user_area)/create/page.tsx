'use client'

import { Button } from '@/components/Button'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'
import { FormTextArea } from '@/components/form/FormTextArea'
import { MeetupSchema } from '@@/amplify/data/resource'
import { generateClient } from 'aws-amplify/api'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormInputs = {
  location: string
  topic: string
  name: string
  description: string
}

const locationOptions = [
  {
    label: 'Vienna',
    value: 'vienna',
  },
  {
    label: 'Upper Austria',
    value: 'upperAustria',
  },
]

const topicOptions = [
  {
    label: 'Amplify',
    value: 'amplify',
  },
  {
    label: 'IAM',
    value: 'iam',
  },
  {
    label: 'Cognito',
    value: 'cognito',
  },
  {
    label: 'SES',
    value: 'ses',
  },
  {
    label: 'EC2',
    value: 'ec2',
  },
]

const client = generateClient<MeetupSchema>()

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log('create event', data)

    const { errors, data: newMeetupGroup } =
      await client.models.MeetupGroup.create({ ...data })
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <FormSelect
          label="Location"
          options={locationOptions}
          {...register('location', { required: true })}
        />
        <FormSelect
          label="Topic"
          options={topicOptions}
          {...register('topic', { required: true })}
        />
        <FormInput
          label="Meetup name"
          {...register('name', { required: true })}
        />
        <FormTextArea
          label="Description"
          rows={10}
          {...register('description', { required: true })}
        />

        <Button type="submit">Create</Button>
      </form>
    </main>
  )
}

import { useAuthenticator } from '@aws-amplify/ui-react'
import {
  FetchUserAttributesOutput,
  fetchUserAttributes,
} from 'aws-amplify/auth'
import { useEffect, useState } from 'react'

async function handleFetchUserAttributes() {
  try {
    return await fetchUserAttributes()
  } catch (error) {
    console.log(error)
  }
}

export const useUserAttributes = () => {
  const { user } = useAuthenticator((context) => [context.user])
  const [userAttributes, setUserAttributes] =
    useState<FetchUserAttributesOutput>()

  useEffect(() => {
    if (!!user) {
      handleFetchUserAttributes().then((attr) => setUserAttributes(attr))
    }
  }, [user])

  return userAttributes
}

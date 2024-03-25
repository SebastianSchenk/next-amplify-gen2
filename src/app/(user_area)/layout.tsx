'use client'

import { withAuthenticator } from '@aws-amplify/ui-react'
import { FunctionComponent, ReactNode } from 'react'

interface UserAreaLayoutProps {
  children: ReactNode
}

const UserAreaLayout: FunctionComponent<UserAreaLayoutProps> = ({
  children,
}) => {
  return <>{children}</>
}

export default withAuthenticator(UserAreaLayout)

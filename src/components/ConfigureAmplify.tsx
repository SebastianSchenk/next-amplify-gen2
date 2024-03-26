'use client'

import config from '@@/amplifyconfiguration.json'
import { Amplify } from 'aws-amplify'

Amplify.configure(config)

const existingConfig = Amplify.getConfig()

Amplify.configure(
  {
    ...existingConfig,
    API: {
      GraphQL: existingConfig.API?.GraphQL,
      REST: {
        [config.custom.apiName]: {
          endpoint: config.custom.apiEndpoint,
          region: config.custom.apiRegion,
        },
      },
    },
  },
  { ssr: true }
)

export default function ConfigureAmplifyClientSide() {
  return null
}

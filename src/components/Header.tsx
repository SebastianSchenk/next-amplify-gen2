'use client'

import { useUserAttributes } from '@/hooks/useUserAttributes'
import { useAuthenticator } from '@aws-amplify/ui-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import { UserIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'

interface NavigationItem {
  label: string
  path: string
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    path: '/',
  },
]

export const Header: FunctionComponent = () => {
  const pathname = usePathname()
  const userAttributes = useUserAttributes()
  const { signOut } = useAuthenticator((context) => [context.signOut])
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false)

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/aws.png" className="h-8" alt="AWS Logo" />
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!!userAttributes ? (
            <>
              <button
                type="button"
                className="flex text-sm border-2 border-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
                onClick={() => setShowUserMenu((v) => !v)}
              >
                <span className="sr-only">Open user menu</span>
                <UserIcon className="w-8 h-8 rounded-full" />
              </button>
              <div
                className={`${!showUserMenu ? 'hidden' : 'block'} absolute right-4 top-11 z-50 my-4 mx-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900">
                    {userAttributes.email}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate">
                    {userAttributes.sub}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </Button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Button>
              <Link href="/dashboard">Login</Link>
            </Button>
          )}

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded="false"
            onClick={() => setShowMenu((v) => !v)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${!showMenu && 'hidden'} items-center justify-between  w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            {navigationItems.map((navItem) => (
              <li key={navItem.path}>
                <Link
                  href={navItem.path}
                  className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${pathname === navItem.path ? 'text-blue-700 md:p-0' : ''}`}
                  aria-current={pathname === navItem.path && 'page'}
                >
                  {navItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

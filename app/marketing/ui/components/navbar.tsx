import * as React from 'react'
import { Link } from '@inertiajs/react'
import logo from '../../../common/ui/assets/logo.png'
import ResourcesNavigationMenu from './resources_navigation_menu'

interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
  return (
    <div className="fixed z-[9999] flex w-full items-center justify-center">
      <div className="mt-4 flex w-11/12 gap-6 rounded-2xl border border-solid border-zinc-700 bg-zinc-950 p-1 shadow-xl md:w-fit">
        <div className="flex h-9 w-full items-center justify-between gap-0 md:justify-start">
          <a rel="noreferrer, noopener" href="/">
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white">
              <img src={logo} alt="Logo" className="h-auto w-7" />
            </div>
          </a>
          <div className="flex h-full w-fit items-center gap-x-2 md:hidden">
            <Link className="h-full" href="/auth/sign_up">
              <span className="text-sm ml-2 flex h-full cursor-pointer items-center rounded-xl bg-white px-3 font-medium text-black hover:opacity-[.9] transition">
                Get started &rarr;
              </span>
            </Link>
            <nav className="flex h-9 w-9 items-center justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-zinc-700/[0.8]">
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <path
                    fill="transparent"
                    strokeWidth="2"
                    stroke="white"
                    strokeLinecap="square"
                    d="M 2 2.5 L 20 2.5"
                  ></path>
                  <path
                    fill="transparent"
                    strokeWidth="2"
                    stroke="white"
                    strokeLinecap="square"
                    d="M 2 9.423 L 20 9.423"
                    opacity="1"
                  ></path>
                  <path
                    fill="transparent"
                    strokeWidth="2"
                    stroke="white"
                    strokeLinecap="square"
                    d="M 2 16.346 L 20 16.346"
                  ></path>
                </svg>
              </div>
            </nav>
          </div>
          <div className="hidden md:inline">
            <div className="flex cursor-default items-center">
              <ResourcesNavigationMenu />
            </div>
          </div>
          <Link
            className="hidden h-full cursor-pointer items-center px-3 text-sm text-white hover:opacity-80 md:flex"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link className="hidden h-full md:inline" href="/auth/sign_up">
            <span className="text-sm ml-2 hidden h-full cursor-pointer items-center rounded-xl bg-white px-3 font-medium text-black hover:opacity-80 md:flex">
              Get started &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar

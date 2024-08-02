import * as React from 'react'
import { Head, Link } from '@inertiajs/react'
import illustration from '../../../common/ui/assets/illustration.webp'
import logo from '../../../common/ui/assets/logo.png'

interface AuthLayoutProps extends React.PropsWithChildren {
  title: string
  description: string | React.ReactNode
}

const AuthLayout: React.FunctionComponent<AuthLayoutProps> = ({ children, title, description }) => {
  return (
    <>
      <Head title={title} />

      <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <div className="w-24 mx-auto">
                <Link className="hover:opacity-75 transition" href="/">
                  <img src={logo} alt="Logo" width="96" height="96" />
                </Link>
              </div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-balance text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src={illustration}
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover brightness-[0.8] grayscale"
          />
        </div>
      </div>
    </>
  )
}

export default AuthLayout

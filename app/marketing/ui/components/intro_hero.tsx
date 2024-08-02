import * as React from 'react'
import extendedIllustration from '../assets/extended_illustration.png'
import { Button } from '#common/ui/components/button'
import { GithubIcon } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { Separator } from '#common/ui/components/separator'

interface IntroHeroProps {}

const IntroHero: React.FunctionComponent<IntroHeroProps> = () => {
  return (
    <div className="relative min-h-screen">
      <img
        src={extendedIllustration}
        alt="Illustration"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-transparent" />
      <div className="mx-auto px-6 pb-8 lg:px-8 max-w-7xl relative z-10 items-center">
        <div className="grid md:grid-cols-3 min-h-screen items-center">
          <div className="flex flex-col col-span-2">
            <h1 className="text-7xl font-bold text-white leading-tight">
              <em>Shaping</em> a<br />
              Digital Renaissance.
            </h1>
            <Separator className="mt-4" />
            <p className="mt-4 text-lg sm:text-xl text-secondary">
              <u className="font-semibold">Panache</u>: The all-in-one <strong>open-source</strong>{' '}
              platform that seamlessly integrates
              <br />
              email, storage, collaboration, scheduling, social networking, and more.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="/auth/sign_up">
                <Button variant="secondary">Get started &rarr;</Button>
              </Link>
              <a
                href="https://github.com/panacheapp/panache"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button>
                  <GithubIcon className="h-5 w-5 mr-2 backdrop-blur" />
                  Explore the GitHub repository
                </Button>
              </a>
            </div>
          </div>
        </div>
        <h3 className="py-16 sm:py-32 text-white text-5xl font-medium text-center z-10 max-w-2xl mx-auto">
          Panache is an <em>open-source</em> <u>everything-app</u>.
        </h3>
      </div>
    </div>
  )
}

export default IntroHero

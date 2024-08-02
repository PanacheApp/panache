import * as React from 'react'
import logo from '../../../common/ui/assets/logo.png'
import { Button } from '#common/ui/components/button'
import { Link } from '@inertiajs/react'

interface TryHeroProps {}

const TryHero: React.FunctionComponent<TryHeroProps> = () => {
  return (
    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl px-8 pt-20 pb-24">
        <div className="flex flex-col items-center justify-center">
          <img src={logo} alt="Logo" className="h-32 w-auto" />
          <h2 className="text-4xl font-bold text-center mt-4">Try Panache today</h2>
          <p className="text-center text-zinc-500 mt-4 text-lg">
            Get started for free.
            <br />
            Add your whole team as your needs grow.
          </p>
          <Link href="/auth/sign_up">
            <Button className="mt-4">Get started &rarr;</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TryHero

import React from 'react'
import MarketingLayout from '../components/marketing_layout'
import IntroHero from '../components/intro_hero'
import TryHero from '../components/try_hero'

export default function Landing() {
  return (
    <MarketingLayout>
      <IntroHero />
      <TryHero />
    </MarketingLayout>
  )
}

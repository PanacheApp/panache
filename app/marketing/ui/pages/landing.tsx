import MarketingLayout from '../components/marketing_layout'
import IntroHero from '../components/intro_hero'
import TryHero from '../components/try_hero'
import FAQ from '../components/faq'
import FeaturesHero from '../components/features_hero'

export default function Landing() {
  return (
    <MarketingLayout>
      <IntroHero />
      <FeaturesHero />
      <FAQ />
      <TryHero />
    </MarketingLayout>
  )
}

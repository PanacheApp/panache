import * as React from 'react'
import Footer from './footer'
import Navbar from './navbar'

interface MarketingLayoutProps extends React.PropsWithChildren {}

const MarketingLayout: React.FunctionComponent<MarketingLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default MarketingLayout

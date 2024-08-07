import * as React from 'react'
import { WobbleCard } from '#common/ui/components/wobble_card'
import {
  MailIcon,
  HardDriveIcon,
  UsersIcon,
  CalendarIcon,
  Share2Icon,
  BriefcaseIcon,
} from 'lucide-react'
import emailsScreenshot from '../assets/screenshots/emails.png'

interface FeaturesHeroProps {}

const FeaturesHero: React.FunctionComponent<FeaturesHeroProps> = () => {
  return (
    <div className="py-24 px-4 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        <WobbleCard containerClassName="col-span-1 md:col-span-2 lg:col-span-3 min-h-[300px]">
          <div className="max-w-2xl">
            <h2 className="text-left text-balance text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[-0.015em] text-white">
              Panache: Your All-in-One Productivity Suite
            </h2>
            <p className="mt-4 text-left text-lg text-neutral-200">
              Seamlessly integrate your work and personal life with Panache's comprehensive suite of
              tools.
            </p>
          </div>
          <img
            src={emailsScreenshot}
            alt="Panache Emails"
            className="absolute right-4 bottom-4 w-1/3 object-contain rounded-lg"
          />
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 min-h-[250px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-4">
              <MailIcon className="w-8 h-8 text-white" />
              <h3 className="text-xl font-semibold text-white">Panache Mails</h3>
            </div>
            <p className="text-neutral-200 flex-grow">
              Streamlined email management with advanced filtering and organization tools.
            </p>
          </div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 min-h-[250px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-4">
              <HardDriveIcon className="w-8 h-8 text-white" />
              <h3 className="text-xl font-semibold text-white">Panache Drive</h3>
            </div>
            <p className="text-neutral-200 flex-grow">
              Secure cloud storage with seamless file sharing and collaboration features.
            </p>
          </div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 min-h-[250px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-4">
              <UsersIcon className="w-8 h-8 text-white" />
              <h3 className="text-xl font-semibold text-white">Panache Teams</h3>
            </div>
            <p className="text-neutral-200 flex-grow">
              Real-time collaboration tools for efficient teamwork and project management.
            </p>
          </div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 min-h-[250px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-4">
              <CalendarIcon className="w-8 h-8 text-white" />
              <h3 className="text-xl font-semibold text-white">Panache Calendar</h3>
            </div>
            <p className="text-neutral-200 flex-grow">
              Intelligent scheduling and event management to keep you organized.
            </p>
          </div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 min-h-[250px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-4">
              <Share2Icon className="w-8 h-8 text-white" />
              <h3 className="text-xl font-semibold text-white">Panache Social</h3>
            </div>
            <p className="text-neutral-200 flex-grow">
              Connect with colleagues and share ideas on our integrated social platform.
            </p>
          </div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 min-h-[250px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-4">
              <BriefcaseIcon className="w-8 h-8 text-white" />
              <h3 className="text-xl font-semibold text-white">Panache Business</h3>
            </div>
            <p className="text-neutral-200 flex-grow">
              Comprehensive tools tailored for your business needs and growth.
            </p>
          </div>
        </WobbleCard>
      </div>
    </div>
  )
}

export default FeaturesHero

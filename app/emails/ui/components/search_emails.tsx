import { Input } from '#common/ui/components/input'
import { SearchIcon } from 'lucide-react'
import * as React from 'react'

interface SearchEmailsProps {}

const SearchEmails: React.FunctionComponent<SearchEmailsProps> = () => {
  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form>
        <div className="relative">
          <SearchIcon className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
      </form>
    </div>
  )
}

export default SearchEmails

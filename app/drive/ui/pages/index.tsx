import * as React from 'react'
import DashboardLayout from '#common/ui/components/dashboard_layout'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './components/data_table'
import { TopBarContent } from '#drive/ui/pages/components/layouts/top_bar_content'
import { SidebarContent } from './components/layouts/sidebar_content'

interface DriveProps {}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}


const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
]

const Drive: React.FunctionComponent<DriveProps> = () => {
  const [activeView, setActiveView] = React.useState<React.ComponentProps<typeof TopBarContent>['activeView']>('list-view')

  function onListViewSelect() {
      setActiveView('list-view')
  }

  function onGridViewSelect() {
      setActiveView('grid-view')
  }
 
  return (
    <DashboardLayout
      className="!p-0"
      moduleName="Drive"
      topChildren={<TopBarContent activeView={activeView} onGridViewSelect={onGridViewSelect} onListViewSelect={onListViewSelect}  />}
      leftChildren={<SidebarContent />}
    >
      <DataTable<Payment, any>
        columns={columns}
        data={
          [
            {
              id: '728ed52f',
              amount: 100,
              status: 'pending',
              email: 'm@example.com',
            },
          ] 
        }
      />
    </DashboardLayout>
  )
}

export default Drive




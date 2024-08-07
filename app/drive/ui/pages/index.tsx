import * as React from 'react'
import DashboardLayout from '#common/ui/components/dashboard_layout'
import { DataTable } from '#drive/ui/components/data_table'
import { TopBarContent } from '#drive/ui/components/layouts/top_bar_content'
import { SidebarContent } from '#drive/ui/components/layouts/sidebar_content'
import { columns } from '#drive/ui/components/columns'
import { File } from '#drive/types/file'

interface DriveProps {}


const Drive: React.FunctionComponent<DriveProps> = (props) => {
  console.log(( props ))
  const [activeView, setActiveView] = React.useState<React.ComponentProps<typeof TopBarContent>['activeView']>('row-view')

  function onListViewSelect() {
      setActiveView('row-view')
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
      <DataTable<File, any>
        columns={columns}
        data={
          [
            {
              id: '728ed52f',
              name: '2',
              fileType: 'JPEG',
              fileSize: 10000,
              createdAt: new Date().toISOString()
            },
          ]  
        }
      />
    </DashboardLayout>
  )
}

export default Drive




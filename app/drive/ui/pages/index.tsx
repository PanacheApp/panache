import * as React from 'react'
import DashboardLayout from '#common/ui/components/dashboard_layout'
import { DataTable } from '#drive/ui/components/data_table'
import { TopBarContent } from '#drive/ui/components/layouts/top_bar_content'
import { SidebarContent } from '#drive/ui/components/layouts/sidebar_content'
import { columns } from '#drive/ui/components/columns'
import File from '#drive/database/models/files'

interface Props {
  files: File
}


const Drive: React.FunctionComponent<Props> = ({ files }) => {
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
        data={files}
      />
    </DashboardLayout>
  )
}

export default Drive




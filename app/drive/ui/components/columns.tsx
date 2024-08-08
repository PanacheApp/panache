import * as React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { File } from '#drive/types/file';
import { ArrowDownIcon, FilePlusIcon, FolderIcon, FolderPlusIcon, UploadIcon } from 'lucide-react';
import { Button } from '#common/ui/components/button';
import { Checkbox } from '#common/ui/components/checkbox';
import { formatBytes } from '#common/ui/lib/format_bytes';
import { Badge } from '#common/ui/components/badge';

export const columns: ColumnDef<File>[] = [
  {
    accessorKey: 'id',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'name',
    header: () => {
      return <div className='flex items-center gap-x-4'>
        <button className='flex items-center gap-x-2'>
          <span>Name</span>
          <ArrowDownIcon className='size-4' />
        </button>
        <span className='inline-block w-px h-6 bg-gray-200' />
        <Button size='compact' variant='ghost'> <FolderPlusIcon className='size-4' /> </Button>
        <Button size='compact' variant='ghost'> <UploadIcon className='size-4' /> </Button>
        <Button size='compact' variant='ghost'> <FilePlusIcon className='size-4' /> </Button>
      </div>
    },
    cell: (data) => {
      return <div className='flex items-center gap-x-4'>
            <span className='p-2.5 rounded-md bg-gray-100'>
              <FolderIcon className='size-5 stroke-gray-500 fill-gray-500' />
            </span>
            <span>
              {data.getValue<string>()}
            </span>
      </div>
    }
  },
  {
    accessorKey: 'mime',
    header: 'Type',
    cell: ({ getValue }) => (
      <Badge variant='secondary' className='uppercase text-gray-500' >{getValue<string>()} </Badge>
    )
    
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ getValue }) => (
      <span>{formatBytes(getValue<number>())}</span>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Uploaded',
    cell: ({ getValue }) => (
      <span>{new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(getValue<string>())) }</span>
    )
  },
]
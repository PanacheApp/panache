import { Button } from "#common/ui/components/button";
import { CogIcon, SearchIcon, TrashIcon, UploadIcon } from "lucide-react";
import { FilesystemItem } from "../filesystem_item";

export function SidebarContent() {
  return <div className='h-full flex flex-col px-2 text-gray-500'>
    <div>
        <Button size='sm' variant='outline' className='w-full justify-start gap-x-2 text-black'> <UploadIcon className='w-4 h-4' /> Upload</Button>
        <Button size='sm' variant='ghost' className='w-full justify-start gap-x-2'> <SearchIcon className='w-4 h-4' /> Search</Button>
        <Button size='sm' variant='ghost' className='w-full justify-start gap-x-2'> <CogIcon className='w-4 h-4' /> Settings</Button>
    </div>
    <hr className="-mx-2.5 bg-destructive-foreground" />
    <div className="h-12 flex-1 border border-destructive-foreground">
    <ul>
        {nodes.map((node) => (
            <FilesystemItem node={node} key={node.name} />
        ))}
    </ul>
    </div>
    <hr className="-mx-2.5 bg-destructive-foreground" />
    <div className="py-2">
        <Button size='sm' variant='ghost' className='w-full justify-start gap-x-2'> <span className="p-1 bg-white rounded-full border"> <TrashIcon className='w-4 h-4' /> </span> TRASH</Button>
        <div className='text-gray-500 mt-2.5'>
            <span className="inline-block bg-gray-200 rounded-full h-2 w-full"><span className="block bg-red-500  w-full"></span></span>
            <div className='flex items-center justify-between text-sm'>
                <span>0/10GB</span>
                <span>Upgrade</span>
            </div>
        </div>
    </div>
  </div>
}

type Node = {
    name: string;
    nodes?: Node[];
};
  
  const nodes: Node[] = [
    {
      name: 'Home',
      nodes: [
        {
          name: 'Movies',
          nodes: [
            {
              name: 'Action',
              nodes: [
                {
                  name: '2000s',
                  nodes: [
                    { name: 'Gladiator.mp4' },
                    { name: 'The-Dark-Knight.mp4' },
                  ],
                },
                { name: '2010s', nodes: [] },
              ],
            },
            {
              name: 'Comedy',
              nodes: [{ name: '2000s', nodes: [{ name: 'Superbad.mp4' }] }],
            },
            {
              name: 'Drama',
              nodes: [
                { name: '2000s', nodes: [{ name: 'American-Beauty.mp4' }] },
              ],
            },
          ],
        },
        {
          name: 'Music',
          nodes: [
            { name: 'Rock', nodes: [] },
            { name: 'Classical', nodes: [] },
          ],
        },
        { name: 'Pictures', nodes: [] },
        {
          name: 'Documents',
          nodes: [],
        },
        { name: 'passwords.txt' },
      ],
    },
  ];
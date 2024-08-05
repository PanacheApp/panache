import * as React from 'react';
import { Button } from "#common/ui/components/button";
import { ChevronDown, DownloadIcon, FolderPlusIcon, LayoutGrid, LinkIcon, ListIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '#common/ui/components/dropdown_menu';

interface Props {
    onListViewSelect: () => void;
    onGridViewSelect: () => void;
    activeView: 'list-view' | 'grid-view';
}

export function TopBarContent(props: Props) {
    const { activeView, onGridViewSelect, onListViewSelect } = props;

    return (
        <div className="w-full flex  items-center justify-between">
            <span>Drive</span>
            <div className='flex items-center gap-x-2 divi'>
                <div className='flex items-center gap-x-2.5'>
                    <Button size='sm'  variant="outline" aria-label='Download'>
                        <DownloadIcon className="w-4 h-4" />
                    </Button>
                    <Button size='sm' variant="outline" aria-label='Upload'>
                        <FolderPlusIcon className="w-4 h-4" />
                    </Button>
                    <Button size='sm' variant="outline" aria-label='Upload'>
                        <LinkIcon className="w-4 h-4" />
                    </Button>
                </div>
               
                <DropdownMenu>
                    <DropdownMenuTrigger asChild> 
                        <Button size='sm' variant='outline'> <ChevronDown className='h-4 w-4' /> { activeView === 'list-view' 
                            ? <>  <ListIcon className='w-4 h-4' /> </> 
                            : <> <LayoutGrid className='w-4 h-4' />  </> }
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-32'>
                        <DropdownMenuItem onClick={() => onListViewSelect()}> 
                            <ListIcon className='w-4 h-4' /> <span className='sr-only'>Listing view</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onGridViewSelect()}> 
                            <LayoutGrid className='w-4 h-4' /> <span className='sr-only'>Listing view</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant='outline' size='sm'>Upload</Button>
                <Button size='sm'>Share</Button>
            </div>
        </div>
    )
}
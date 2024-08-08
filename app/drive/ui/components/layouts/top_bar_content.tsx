import * as React from 'react';
import { Button } from "#common/ui/components/button";
import { ChevronDown, DownloadIcon, FolderPlusIcon, ImageIcon, LayoutGrid, LinkIcon, ListIcon, PaperclipIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '#common/ui/components/dropdown_menu';
import { Dialog, DialogContent, DialogTrigger } from '#common/ui/components/dialog';
import { useFileUpload } from '#drive/hooks/use_file_upload'
import { ScrollArea } from '#common/ui/components/scroll_area'
import { formatBytes } from '#common/ui/lib/format_bytes'
import { useToggle } from '#common/ui/hooks/use_toggle';

interface Props {
    onListViewSelect: () => void;
    onGridViewSelect: () => void;
    activeView: 'row-view' | 'grid-view';
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
                        <Button size='sm' variant='outline'> <ChevronDown className='h-4 w-4' /> { activeView === 'row-view' 
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
                
                <Uploader />
                <Button size='sm'>Share</Button>
            </div>
        </div>
    )
}




export function Uploader() {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const folderInputRef = React.useRef<HTMLInputElement>(null);

    const [files, setFiles] = React.useState<File[] | null >([]);
    const [uploadedFiles, setUploadFiles] = React.useState<any[]>([]);
    const [errors, setErrors] = React.useState<any[]>([]);
    const {value: open, toggle} = useToggle();
    const { uploadFile, uploadProgress  } = useFileUpload('/drive/upload');

    const onFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files!) as File[];
        setFiles(prev => [...prev!, ...files]);
        
        const uploadPromises = files.map((file, i) => uploadFile(file, i));

        Promise.all(uploadPromises)
        .then(setUploadFiles)
        .catch(setErrors)
    };
    
    const onFolderUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files!) as File[];
        setFiles(files);
    
        const uploadPromises = files.map((file, i) => uploadFile(file, i));

        Promise.all(uploadPromises)
        .then(setUploadFiles)
        .catch(setErrors)
    };

    // Trigger the file input click when the button is pressed
    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const openFolderPicker = () => {
        folderInputRef.current?.click();
    };

    const onClose = () => {
            toggle();
            setFiles([]);
    }

    return (
      <Dialog open={open as boolean}>
        <DialogTrigger asChild>
            <Button onClick={() => toggle()} variant='outline' size='sm'>Upload</Button>
        </DialogTrigger>
        <DialogContent onInteractOutside={() => onClose()} hideCloseButton className=" flex flex-col aspect-video sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-x-2'>
                        <span className='p-4 rounded-lg border border-border text-gray-600'>
                            <PaperclipIcon className='size-5' />
                        </span>
                        <div className=''>
                            <p className='font-semibold'>Upload files</p>
                            <p className='text-gray-500'>Upload from your local computer</p> 
                        </div>
                </div>

                <label htmlFor="files">
                    <span className="sr-only">Choose profile photo</span>
                    <input ref={fileInputRef} onChange={onFilesUpload}  name='files' type='file' className='hidden' multiple />
                    <Button onClick={openFilePicker}>Upload files</Button>
                </label>
            </div>

            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-x-2'>
                        <span className='p-4 rounded-lg border border-border text-gray-600'>
                            <PaperclipIcon className='size-5' />
                        </span>
                        <div className=''>
                            <p className='font-semibold'>Upload folder</p>
                            <p className='text-gray-500'>Upload from your local computer</p> 
                        </div>
                </div>

                <label htmlFor="files">
                    <span className="sr-only">Choose profile photo</span>
                    <input ref={folderInputRef} onChange={onFolderUpload}  name='files' type='file' className='hidden' webkitdirectory="" directory="" multiple />
                    <Button onClick={openFolderPicker}>Upload folder</Button>
                </label>
            </div>

            { 
                files && files.length > 0 ?
                <ScrollArea className="h-fit  px-3">
                    <ul className='space-y-2'>
                        {files?.map((file, index) => (
                            <li key={file.name} className='relative flex items-center p-2.5 rounded-md'>
                                <div style={{ '--progression': `${uploadProgress[index]}%` } as any} className='absolute inset-0 w-[--progression] bg-green-800/25 rounded-md'></div>
                                 <span className='p-2'> <ImageIcon /> </span> {file.name} - {formatBytes(file.size)} 
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
                : null
            }
            
         </DialogContent>
      </Dialog>
    )
  }
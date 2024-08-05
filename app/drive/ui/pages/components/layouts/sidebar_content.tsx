import { Button } from "#common/ui/components/button";
import { CircleUserRoundIcon, UploadIcon } from "lucide-react";

export function SidebarContent() {
    return <div className='px-2'>
        <div>
            <Button size='sm' variant='outline' className='w-full justify-start gap-x-2'> <UploadIcon className='w-4 h-4' /> Upload</Button>
            <Button size='sm' variant='ghost' className='w-full justify-start gap-x-2'> <UploadIcon className='w-4 h-4' /> Search</Button>
            <Button size='sm' variant='ghost' className='w-full justify-start gap-x-2'> <UploadIcon className='w-4 h-4' /> Settings</Button>
        </div>
        <hr className="bg-red-600" />
        <div>

        </div>
        <div>
            <Button size='sm' variant='ghost' className='w-full justify-start gap-x-2'> <span className="p-1 bg-white rounded-full border"> <CircleUserRoundIcon className='w-4 h-4' /> </span> PERSONAL</Button>
            <Button size='sm' variant='ghost' className='w-full justify-start gap-x-2'> <UploadIcon className='w-4 h-4' /> TRASH</Button>
        </div>
    </div>
}
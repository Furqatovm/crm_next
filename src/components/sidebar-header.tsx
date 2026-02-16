"use client"
import ModeToggle from './togleMode'
import { SidebarTrigger } from './ui/sidebar'
import { Avatar, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const SideBarHeaderComponent = () => {
    const user =useSelector((state:RootState) =>state.authSlice.user)
  return (
    <div className='w-full  p-3 border-b  border-gray-300'>
        <div className='flex justify-between items-center w-full'>
            <div className='flex gap-1 items-center'>
                <SidebarTrigger size="lg"/>
            <span>Menu</span>
            </div>

            <div className='flex gap-8 items-center'>
                <ModeToggle />
                <div className='w-px h-10 bg-gray-300'></div>
                <div className='flex gap-2 items-center'>
                    <div className='flex flex-col items-end'>
                        <span>{user?.first_name}</span>
                        <span>{user?.email}</span>
                    </div>
                    <Avatar size='lg'>
                        <AvatarImage src={`${user?.image}`}  />
                    </Avatar>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SideBarHeaderComponent
import React from 'react'
import ModeToggle from './togleMode'
import { SidebarTrigger } from './ui/sidebar'
import { Avatar, AvatarImage } from './ui/avatar'

const SideBarHeaderComponent = () => {
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
                        <span>Azamat nimadir</span>
                        <span>email</span>
                    </div>
                    <Avatar size='lg'>
                        <AvatarImage src="https://th.bing.com/th/id/R.20659fa53ff0281dc0c93f930283426e?rik=LzVCMo473OCV7Q&pid=ImgRaw&r=0"  />
                    </Avatar>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SideBarHeaderComponent
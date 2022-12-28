/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import Sidebarlink from './Sidebarlink'
import { HomeIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

export default function Sidebar() {
  const { data: session } = useSession()
// Tipo eu to cansado
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
      <div className='flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24'>
        <img src='https://rb.gy/ogau5a' width={30} height='30' alt='' />
      </div>
      <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
        <Sidebarlink text="Home" Icon={HomeIcon} active={true} />
        <Sidebarlink text="Explore" Icon={HashtagIcon} />
        <Sidebarlink text="Notifications" Icon={BellIcon} />
        <Sidebarlink text="Messages" Icon={InboxIcon} />
        <Sidebarlink text="Bookmarks" Icon={BookmarkIcon} />
        <Sidebarlink text="Lists" Icon={ClipboardListIcon} />
        <Sidebarlink text="Profile" Icon={UserIcon} />
        <Sidebarlink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      <button className='hidden xl:inline ml-auto bg-[#1d9bf0]
       text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]'>Tweet</button>

      <div className='text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto' onClick={signOut}>
        <img src={session?.user?.image}
          alt='' className='h-10 w-10 rof rounded-full xl:mr-2.5' />
        <div className='hidden xl:inline leading-5'>
          <h4 className='font-bold'>{session?.user?.name}</h4>
          <p className='text-[#6e767d]'>@{session?.user?.tag}</p>
        </div>
        <DotsHorizontalIcon className='h-5 hidden xl:inline ml-10' />
      </div>
    </div>
  )
}

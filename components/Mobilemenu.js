/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { HomeIcon, UserIcon, InboxIcon, HashtagIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'

export default function Mobilemenu() {
    const [screen, setScreen] = useState(null)
    const { data: session } = useSession()

    useEffect(() => {
        setScreen(window.innerWidth)
    }, [])

    return (
        <>
            {screen < 650 ? <div className='fixed flex justify-center
             bottom-0 left-0 w-full h-[60px]
              bg-black border border-[#2f3336]'>
                <div className='w-[90%] flex justify-between'>
                    <div className='flex-1 flex justify-center items-center'>
                        <HomeIcon className='text-white w-8' />
                    </div>
                    <div className='flex-1 flex justify-center items-center'>
                        <UserIcon className='text-white w-8' />
                    </div>
                    <div className='flex-1 flex justify-center items-center'>
                        <InboxIcon className='text-white w-8' />
                    </div>
                    <div className='flex-1 flex justify-center items-center'>
                        <HashtagIcon className='text-white w-8' />
                    </div>
                    <div className='flex-1 flex justify-center items-center'>
                        <img src={session.user.image} onClick={signOut} alt='userImage' className='w-8 rounded-full' />
                    </div>


                </div>
            </div> : <></>}
        </>
    )
}

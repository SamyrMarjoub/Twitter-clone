/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Tofollow({ result }) {
    return (
        <div className='hover:bg-white hover:bg-opacity-[0.03]
    px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
    items-center MaxQuery:flex-col MaxQuery2:flex-col justify-between'>
            <div className='flex-1 MaxQuery2:flex MaxQuery2:justify-center MaxQuery2:w-full '>
                <img src={result?.userimg} className='object-cover MaxQuery:w-[60px] rounded-[70px]' width={70} height={70} alt='' />
            </div>
            <div className='flex-1 MaxQuery2:flex MaxQuery2:flex-col MaxQuery2:text-center  MaxQuery2:w-full MaxQuery:flex MaxQuery:flex-col  MaxQuery:items-center MaxQuery:justify-center MaxQuery:w-full'>
                <span className='inline-block font-bold'>{result.username}</span>
                <span className='inline-block text-[#6e767d]'>{result.tag}</span>

            </div>
            <div className='flex-1 MaxQuery2:w-full MaxQuery:w-full'>
                <button className='bg-white text-black rounded-[20px] h-[40px] font-bold w-[100%]'>Seguir</button>
            </div>

        </div>
    )
}

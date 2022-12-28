import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import Trending from './Trending'
import ToFollow from './Tofollow'
export default function Widgets({ WidgetsN, UserWidgets }) {
    return (
        <div className='hidden MaxQuery:hidden lg:inline ml-8 xl:max-w-[450px] py-1 space-y-2'>
            <div className='sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12'>
                <div className='flex items-center bg-[#202327] p-3 rounded-full relative'>
                    <SearchIcon className='text-gray-500 h-5 z-50' />
                    <input type={'text'} className="bg-transparent placeholder-gray-500
                 outline-none text-[#d9d9d9] focus:bg-black focus:border-2 rounded-full focus:border-[#1d9bf0] absolute inset-0
                pl-11 border border-transparent w-full" placeholder='Pesquise Twitter' />
                </div>

            </div>
            <div className='text-[#d9d9d9] space-y-2 bg-[#15181c] pt-1 rounded-xl w-11/12 xl:w-9/12'>
                <h4 className='font-bold text-xl px-4'>O que está acontecendo?</h4>
                {WidgetsN.map((result, index) => (
                    <Trending key={index} result={result}></Trending>
                ))}
                <button className='hover:bg-white hover:bg-opacity-[0.03]
                 px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
                 items-center justify-between w-full text-[#1d9bf0] font-light'>Show More</button>
            </div>

            <div className='text-[#d9d9d9] space-y-2 bg-[#15181c] pt-1 rounded-xl w-11/12 xl:w-9/12'>
                <h4 className='font-bold text-xl px-4'>Para seguir</h4>
                {UserWidgets.map((result, index) => (
                    <ToFollow key={index} result={result}/>
                ))}
                <button className='hover:bg-white hover:bg-opacity-[0.03]
                 px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
                 items-center justify-between w-full text-[#1d9bf0] font-light'>Show More</button>
            </div>
        </div>
    )
}

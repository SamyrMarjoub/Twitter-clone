/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Trending({ result }) {

    return (
        <div className='hover:bg-white hover:bg-opacity-[0.03]
    px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
    items-center MaxQuery2:flex-col justify-between'>
            <div className='space-y-0.5 '>
                <p className='text-[#6e767d] text-sm font-medium'>{result.heading}</p>
                <h6 className='font-bold max-w-[250px] text-[12px] xl:text-[12px] '>{result.description}</h6>
                <p className=''>Trending with {result.tags.map((tag, index) => (
                    <span className='tag text-[#1d9bf0] text-xs font-medium max-w-[250px]' key={index}>
                        #{tag} {" "}
                    </span>)

                )} </p>
            </div>
            <img src={result?.img} className='object-cover MaxQuery2:w-[100px] rounded-2xl' width={70} height={70} alt='' />

        </div>
    )
}

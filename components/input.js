/* eslint-disable @next/next/no-img-element */
import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import Picker from '@emoji-mart/react'
import { db, storage } from '../firebase'
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,

} from "@firebase/firestore"; import { getDownloadURL, uploadString, ref } from 'firebase/storage';
import { useSession, signOut } from 'next-auth/react'
import { async } from '@firebase/util';
export default function Input() {

    const [input, setInput] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef(null)
    const [screens, setScreen] = useState(null)
    const { data: session } = useSession()

    useEffect(() => {
        setScreen(window.innerWidth)
    }, [screens])

    const addImageToPost = (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };

    async function sendPost() {
        if (loading) return
        setLoading(true)
        const docRef = await addDoc(collection(db, 'posts'), {
            id: session.user.id,
            username: session.user.name,
            userImg: session.user.image,
            tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp()
        })
        const imgRef = ref(storage, `posts/${docRef.id}/image}`)

        if (selectedFile) {
            await uploadString(imgRef, selectedFile, "data_url").then(async () => {
                const downloadUrl = await getDownloadURL(imgRef)
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadUrl
                })
            })
        }
        setLoading(false)
        setInput("")
        setSelectedFile(null)
        setShowEmojis(false)

    }

    return (
        <div className={`border-b border-[#2f3336] p-3 flex space-x-3 overflow-y-visible ${loading && "opacity-60"} `}>
            <img className='h-11 w-11 MaxPhone:h-9 rof rounded-full cursor-pointer' src={session.user.image} alt='' />
            <div className='w-full divide-y divide-[#2f3336]'>
                <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea value={input} name='' placeholder='O que esta acontecendo?'
                        onChange={(e) => { setInput(e.target.value) }} rows={2} id=''
                        className='w-full bg-transparent outline-none min-h-[50px] text-[#d9d9d9] text-lg placeholder:text-gray tracking-wide'></textarea>

                    {selectedFile && (
                        <div className='relative'>
                            <div className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26]
  bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={(e) => { setSelectedFile(null) }}>
                                <XIcon className='text-white h-5' />
                            </div>
                            <img src={selectedFile} className="rounded-2xl max-h-80 object-contain" alt='' />
                        </div>
                    )}

                </div>
                {!loading && (
                    <div className='flex items-center justify-between pt-2.5 '>
                        <div className='flex items-center relative'>
                            <div className='icon' onClick={() => filePickerRef.current.click()}>
                                <PhotographIcon className=' h-[22px] text-[#1d9bf0]' />
                                <input type={'file'} hidden onChange={addImageToPost} ref={filePickerRef} />
                            </div>
                            <div className="icon rotate-90">
                                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                            </div>

                            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                            </div>

                            <div className="icon">
                                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                            </div>
                            {showEmojis && screens > 500 ? (
                                <div className='absolute top-[47px] left-[-50px] z-[999] '>
                                    <Picker
                                        onEmojiSelect={addEmoji}
                                        theme="dark"
                                    />
                                </div>
                            ): <></>}
                        </div>
                        <button
                            className="bg-[#1d9bf0] text-white rounded-full px-4
  py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0]
   disabled:opacity-50 disabled:cursor-default MaxPhone:px-0 MaxPhone:py-0 MaxPhone:h-[30px] MaxPhone:w-[30%]"
                            disabled={!input && !selectedFile}
                            onClick={sendPost}
                        >
                            Tweet
                        </button>

                    </div>
                )}

            </div>
        </div>
    )
}

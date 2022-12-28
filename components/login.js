/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { XIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { onSnapshot, query, orderBy } from "@firebase/firestore";
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
import { useRouter } from "next/router";
import Head from 'next/dist/shared/lib/head'
export default function Login({ providers }) {

    const [Render, setRender] = useState(1)
    const [emailGlobal, setEmailGlobal] = useState('')

    function Registrar() {

        const [newemail, setNewEmail] = useState('')
        const [newsenha, setNewSenha] = useState('')
        const [length, setLength] = useState([])

        useEffect(
            () => {
                onSnapshot(
                    query(collection(db, "users")),
                    (snapshot) => {
                        setLength(snapshot.docs);
                        console.log(length)
                    }
                );
            },
            []
        );



        async function Registro(e) {
            // e.preventDefault()
            // const docRef = await addDoc(collection(db, 'users'), {
            //     id: length.length,
            //     email: newemail,
            //     senha: newsenha,
            //     userData: {},
            // })
            // await updateDoc(doc(db, "users", docRef.id), {

            // })
            alert('Em breve!')
            setRender(1)
        }
        return (
            <div className='w-[50%] MaxPhone:w-[80%] flex-col flex justify-center'>
                <h1 className='text-[30px] font-bold mt-[20px]'>Entre hoje mesmo para o Twitter</h1>
                <form onSubmit={Registro}>
                    <input type={'email'} required onChange={(e) => setNewEmail(e.target.value)} placeholder='Digite seu email' className='mt-[20px] p-[15px] bg-transparent w-full h-[50px] border border-stone-600'></input>
                    <input type={'password'} required onChange={(e) => setNewSenha(e.target.value)} placeholder='Digite a sua senha' className='mt-[20px] p-[15px] bg-transparent w-full h-[50px] border border-stone-600'></input>

                    <input type={'submit'}
                        className='w-full h-[40px]
                 rounded-[20px] mt-[30px] bg-white
                  text-black font-bold hover:bg-[#fff9] transition-all cursor-pointer' value={'Avançar'} />
                </form>
                <p className='max-w-[100%] mt-[10px] text-[13px] text-gray-300'>Ao se inscrever, você concorda
                    com os <span className='text-[#1d9bf0]'>Termos de Serviço </span>e a <span className='text-[#1d9bf0]'>Política de Privacidade</span>,
                    incluindo o <span className='text-[#1d9bf0]'>Uso de Cookies</span> .</p>
                <span className='inline-block text-gray-300 text-[13px] mt-[50px]'>Já tem uma conta? <span className='text-[#1d9bf0] text-[13px] cursor-pointer' onClick={() => setRender(2)}>Entrar</span></span>
            </div>
        )
    }
    function Loginn(email) {
        const [senha, setSenha] = useState('')
        const [eyeIcon, setEyeIcon] = useState('password')

        function inputPass() {
            if (eyeIcon === 'password') {
                setEyeIcon('text')
            } else {
                setEyeIcon('password')
            }

        }
        function Logar(e) {
            e.preventDefault()
            alert('Em breve, tente logar-se com o Google.')
            setRender(1)
        }
        return (
            <div className='w-[80%] h-[80%] flex-col flex '>
                <h1 className='text-[30px] font-bold mt-[30px]'>Digite sua senha</h1>
                <form onSubmit={Logar} className='relative h-[100%]'>
                    <input className={`w-full h-[60px] 
                    outline-none mt-[40px] pt-5 pl-3 ${email.length === 0 ? "bg-transparent" : "bg-[#2023276e]"} text-[#71767b8c]`} type={'email'} disabled={email.length === 0 ? false : true} value={email.email} />
                    <span className='absolute top-[45px] left-3 text-[#71767b8c]'>Email</span>
                    <div className='relative mt-[20px] flex flex-col justify-center items-center'>
                        <input minLength={3} required onChange={(e) => setSenha(e.target.value)} className='w-full h-[60px] outline-none text-[15px] p-[15px]
                         text-[white] focus:::outline focus:outline-[#1d9bf0] bg-transparent border border-gray-800' placeholder='Senha' type={eyeIcon} />

                        {eyeIcon === 'password' ? <EyeIcon className=' cursor-pointer absolute right-2 w-[20px]'
                            onClick={() => inputPass()} /> :
                            <EyeOffIcon className='cursor-pointer absolute right-2 w-[20px]' onClick={() => inputPass()} />}
                    </div>
                    <span className='inline-block mt-[5px] text-[13px] text-[#1d9bf0]'>Esqueçeu sua senha?</span>
                    <div className='absolute left-0 w-full bottom-0'>
                        <input disabled={senha.length > 2 ? false : true} type={'submit'} value='Entrar' className={`h-[60px]  text-black text-[20px] font-bold w-[100%] ${(senha.length) > 2 ? "bg-white cursor-pointer" : "bg-[#ffffff83] cursor-not-allowed"} rounded-[20px]`} />
                        <span className='inline-block mt-[10px] text-gray-300 text-[13px]'>Não tem uma conta? <span className='text-[#1d9bf0] text-[13px] cursor-pointer' onClick={() => setRender(3)}>Cadastre-se</span></span>
                    </div>
                </form>
            </div>
        )
    }
    function Inicio() {
        const [email, setEmail] = useState('')

        function SubmitFunction(e) {
            e.preventDefault()
            setEmailGlobal(email)
            setRender(2)
            console.log("é" + emailGlobal)
        }
        return (
            <div className='w-[50%] MaxPhone:w-[80%] flex-col flex justify-center '>
                <Head>
                    <title>
                        Faça login no Twitter
                    </title>
                    <link rel="icon" href="/Twitter-logo.svg" />
                </Head>
                <h1 className='text-[35px] mt-[20px]'>Entrar no Twitter</h1>
                {Object.values(providers).map(provider => (

                    <div className='w-full' key={provider.name}>
                        <button
                            className="relative rounded-[30px]  mt-[15px] justify-center items-center h-[45px] flex w-[100%] overflow-hidden font-medium transition-all bg-white hover:bg-white group"
                            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                        >
                            <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                                Fazer login com {provider.name}
                            </span>
                        </button>
                    </div>
                ))}
                <button
                    className="relative rounded-[30px]  mt-[15px] justify-center items-center h-[45px] flex w-[100%] overflow-hidden font-medium transition-all bg-white hover:bg-white group"
                    onClick={() => alert('Em breve')}
                >
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                        Fazer login com Apple
                    </span>
                </button>
                <div className='w-full mt-[20px] flex justify-between'>
                    <div className='border-b flex-[2] border-stone-600'></div>
                    <div className='flex-1 flex relative justify-center'>
                        <span className='absolute mt-[-12px]'>Ou</span>

                    </div>
                    <div className='border-b flex-[2] border-stone-600'></div>

                </div>
                <div className='w-full h-auto'>
                    <form onSubmit={SubmitFunction}>
                        <input type={'email'} required onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu email' className='mt-[20px] p-[15px] bg-transparent w-full h-[50px] border border-stone-600'></input>
                        <input type={'submit'}
                            className='w-full h-[40px]
                 rounded-[20px] mt-[30px] bg-white
                  text-black font-bold hover:bg-[#fff9] transition-all cursor-pointer' value={'Avançar'} />
                    </form>
                    <button className='w-full h-[40px]
                 rounded-[20px] mt-[20px] bg-transparent border text-white border-stone-700
                   font-bold transition-all cursor-pointer'>Esqueceu sua senha?</button>
                    <span className='text-gray-500 inline-block mt-[50px]'>Não tem uma conta? <span className='text-[#1d9bf0] cursor-pointer' onClick={() => setRender(3)}>Inscreva-se</span> </span>
                </div>
            </div>
        )
    }
    return (
        <div className='text-white bg-[#5b708366] w-[100%] h-[100vh] flex justify-center items-center'>
            <div className='flex relative flex-col rounded-[20px] items-center w-[600px] MaxPhone:w-[95%] h-[670px] bg-black'>
                <div className='w-[95%] items-center h-auto mt-[10px] flex justify-center'>
                    <div className='flex-1'>
                        <XIcon onClick={() => setRender(1)} className='w-[20px] cursor-pointer' />

                    </div>
                    <div className='flex-1'>
                        <img alt='' className='text-red' src="https://rb.gy/ogau5a"
                            width={30}
                            height={30}
                        />

                    </div>
                </div>

                {Render === 1 ? <Inicio /> : Render === 2 ? <> <Loginn email={emailGlobal} /> </> : <> <Registrar /> </>}


            </div>
        </div>
    )
}

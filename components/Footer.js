import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import s from "./Footer.module.css"
import Socialmedia from './Socialmedia'
import Image from 'next/image';
import Sponsors from './Sponsors'

export default function Footer() {
    const {locale: activeLocal, locales, asPath} = useRouter();
    //find all the avaialbe languages
    const availableLocal = locales.filter(locale => locale !== activeLocal)
    console.log(availableLocal)
    return (  
        <footer className={s.container}>
            <p className={s.title}>Se till och följ oss på</p>
            <Socialmedia height="50" width="50" color="white"/>
            <p>© Week of Winter 2014-2023 Uppsala</p>
            <span>Created by: Mao, Gadson, BH</span>
            <p>
                <a href='mailto: weekofwinter@gmail.com' className={s.email}> weekofwinter@gmail.com</a>
                {availableLocal.map((locale) => {
                    <Link key={locale} href={asPath} locale={locale}>
                        {locale.toUpperCase()}
                    </Link>
                })}
            </p>
            <button className={s.arrowup} onClick={() => window.scrollTo(0,0)}>
                <Image
                    width="50"
                    height="50"
                    alt="Scroll to begin"
                    src="/icons/arrow-up_w.svg"
                />
            </button>
            <Sponsors/>
        </footer>
    )
}

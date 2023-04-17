import Link from 'next/link';
import { useState, useRef, useEffect, memo } from 'react';
import Image from "next/image";
import Section from '../components/Section';
import About from '../components/About.mdx';
import Youtube from '../components/Youtube';
import Stanton from '../components/Stanton.mdx';
import Snow from '../components/Snow';
import TripDetailsStanton from '../components/TripDetailsStanton';
import TripDetailsAspen from '../components/TripDetailsAspen';
import Button from '../components/Button'
import Aspen from '../components/Aspen.mdx'
import { useRouter } from 'next/router';
import Postbeskrivningar from '../components/Postbeskrivningar'
import { TypeAnimation } from 'react-type-animation';

import { animated, useScroll, useSpring, config } from "react-spring";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import s from "../styles/Index.module.css"

//TODO Maybe add react memo
const ParallaxEffect = () => {

  const [{ offset }, animation] = useSpring(
      () => ({ 
        from: {offset:0},
        config: config.gentle
  }));
  
  const handleScroll = () => {
      const offset = window.scrollY;
      if (offset < window.innerHeight) {
        animation.start({offset: offset });
      }
  };

  useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
  });

  const layers = [
    {
      "speed": 0.5
    },
    {
      "speed": 0.3
    },
    {
      "speed": 0.2
    },
    {
      "speed": 0.1
    },
  ]

  return (
    <div className={s.parallaxContainer}>
      {layers.map(({speed}, i) =>  
          <animated.div
              key={i}
              className={s.parallaxMountain}
              style={{
                transform: offset.to((o) => `translate3d(0px, ${o * speed}px, 0px)`)
              }}
          >
          <Image 
            src={`/parallax/layer${i}.svg`}
            className={s.mountainImage}
            alt="Mountain landscape"
            fill
            priority
          />
          </animated.div>
      )}

      <animated.div 
        className={s.welcomeContainer}
        style={{
          transform: offset.to((o) => `translate3d(0px, ${o * 1.2}px, 0px)`)
        }}
      >
        <h1 className={s.welcomeHeading}>
          Week of Winter
        </h1>
        <TypeAnimation
          sequence={[
            "Uppsalas största skidförening",
            1000, 
            "Vi ses i Valtho!", 
            1000, 
            "#WeekofWinter2024", 
            1000, 
            "För studenter av studenter.", 
            1000, 
          ]}
          speed={60}
          wrapper="h3"
          cursor={true}
          repeat={Infinity}
          className={s.welcomeSubheading}
        />
      </animated.div>


      <div className={s.coverMountain}>
        <Snow/>
        <Navbar innerHeightOffset/>
        <Image 
          src={`/parallax/layer4.svg`}
          className={s.mountainImage}
          alt="Mountain landscape"
          fill
          priority
        />
      </div>
    </div>
  )
}

export default function HomePage() {

  const { locale, locales, asPath } = useRouter();

  const CurrentTime = new Date().getTime();
  console.log('current Time '+ CurrentTime)
  const TargetDate = new Date('Mars 30, 2023 16:00:00');
  const t = 240 * 24 * 60 * 60 * 1000
  const TimeDiff = CurrentTime + t    

  //useLoadScript({googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY})

  return (
    <>
    <main>
      <ParallaxEffect/>
      <article className={s.content}>
        <div style={{textAlign:"center"}}>
          <h1>
            Vill du uppleva det ultimata vinteräventyret?
          </h1>
          <h3>
            Följ med oss på en oförglömlig skidresa!
          </h3>
        </div>
        <Section
          leftContent={
            <section>
              <About/>
            </section>
          }
          rightContent={
            <Youtube
                title="Hallo"
                videoId="tYE42Ntdp18"
            />
          }
        />
      
        
        <Section
          leftContent={
            <div style={{aspectRatio:"16/9"}}>
            <Image
              src={`/stanton.svg`}
              style={{objectFit: "contain"}}
              fill
              alt="St. Anton"
            />
            </div>
          }
          rightContent={
            <section>
              <Stanton/>
            </section>
          }
        />
        
        <TripDetailsStanton/>
        <Button title={
          <a style={{color:"#003366", textDecoration: 'none'}} href='https://nextjs.org/docs/api-reference/next/image' target="_blank">
            Boka Nu
          </a>
        }
        />

        <Section
          rightContent={
            <div style={{aspectRatio:"16/9"}}>
            <Image
              src={`/aspen.svg`}
              style={{objectFit: "contain", pointerEvents:"none"}}
              alt="Aspen"
              fill
            />
            </div>
          }
          leftContent={
            <section>
              <Aspen/>
            </section>
          }
        />
        
        <TripDetailsAspen/>
        <Button title={
          <a style={{color:"#003366", textDecoration: 'none'}} href='https://nextjs.org/docs/api-reference/next/image' target="_blank">
            Boka Nu
          </a>
        }
        />

        <Postbeskrivningar/>
        <Button title={
          <a style={{color:"#003366", textDecoration: 'none'}} href='/om/postbeskrivningar'>
            Ansök Nu
          </a>
        }
        />    
       
      </article>
    </main>
    <Footer/>
    </>
  );
}

//Override default page layout
HomePage.getLayout = (page) => page

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import Welcome from '../components/Welcome';
import Section from '../components/Section';
import About from '../components/About.mdx';
import Youtube from '../components/Youtube';
import Stanton from '../components/Stanton.mdx';
import Snow from '../components/Snow';
import Map from '../components/Map';
import TripDetailsStanton from '../components/TripDetailsStanton';
import TripDetailsAspen from '../components/TripDetailsAspen';
import Button from '../components/Button'
import Aspen from '../components/Aspen.mdx'
import Sponsors from '../components/Sponsors.js'
import { useRouter } from 'next/router';
import { ResponsiveImage } from '../components/mdxComponents';

import { animated, useScroll, useSpring, config } from "react-spring";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HomePage() {

  //#######Parallax############
  const [{ offset }, setOffset] = useSpring(
      () => ({ 
        from: {offset:0},
        config: config.gentle
      }));
  
  const handleScroll = () => {
      const offset = window.scrollY;
      if (offset < window.innerHeight) {
        setOffset({ offset });
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
  //#######Parallax############

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
      <div
        style={{
            background: "var(--sky-color)",
            height: "114vh",
        }}
      >


        {layers.map(({speed}, i) =>  
          <animated.div
              key={i}
              style={{
                  position: "absolute",
                  width: "100%",
                  height: "115vh",
                  willChange:"transform",
                  transform: offset.to((o) => `translate3d(0px, ${o * speed}px, 0px)`)
              }}
          >

            <Image 
              src={`/parallax/layer${i}.svg`}
              style={{objectFit: "cover", pointerEvents:"none"}}
              alt="Mountain landscape"
              fill
              priority
            />
          </animated.div>
        )}

        <animated.div 
          style={{
            position:"absolute", 
            width:"100%",
            willChange:"transform",
            transform: offset.to((o) => `translate3d(0px, ${o * 1.2}px, 0px)`)
          }}>
          <Welcome/>
        </animated.div>


        <div style={{position:"absolute", width:"100%", height:"115vh"}}>
          <Snow/>
          <Navbar/>
          <Image 
            src={`/parallax/layer4.svg`}
            style={{objectFit: "cover", }}
            alt="Mountain landscape"
            fill
            priority
          />

        </div>
      </div>
      <article style={{background:'var(--background-color)', position:"relative", zIndex:999, paddingTop:"1px"}}>
        <div style={{textAlign:"center"}}>
          <h1>
            Vill du uppleva det ultimata vinteräventyret?
          </h1>
          <h3>
            Följ med oss på en oförglömlig skidresa!
          </h3>
          <Link href="/om/postbeskrivningar">
            postbeskrivningar
          </Link>
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


        <Sponsors/>
       
      </article>
    </main>
    <Footer/>
    </>
  );
}

//Override default page layout
HomePage.getLayout = (page) => page

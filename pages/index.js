/*
  This file is the websites index page i.e. the first page to land on
*/

import { useState, useRef, useEffect, memo } from 'react';
import Image from "next/image";
import Trip from '../components/Trip';
import Youtube from '../components/Youtube';
import Snow from '../components/Snow';
import { useRouter } from 'next/router';
import { TypeAnimation } from 'react-type-animation';
import { animated, useScroll, useSpring, config } from "@react-spring/web";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import s from "../styles/Index.module.css"
import InfoBox from '../components/InfoBox';
import FAQ from '../components/Faq';
import Countdown from '../components/Countdown';
import Head from 'next/head';
import CircleInformation from '../components/CircleInformation';
import PriceCard from '../components/PriceCard';
import InfoCard from '../components/InfoCard';
import Ticket from "../icons/ticket.svg"
import DeliveryTruck from "../icons/deliveryTruck.svg"
import PlusAdd from "../icons/plusAdd.svg"
import Insurance from "../icons/insurance.svg"
import CalenderCancel from "../icons/calenderCancel.svg"
import Ski from "../icons/ski.svg"
import SiteMenu from '../components/SiteMenu';

//debounce to not change the parallax on every pixel
/*
function debounce(func, timeout = 4){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
*/

//TODO Maybe add react memo
//This component is used to display the parallax effect 
const ParallaxEffect = () => {

  const [{ offset }, animation] = useSpring(
    () => ({ 
      from: {offset:0},
      config: config.gentle
  }));

  let lastKnownY = 0;
  let ticking = false;
  
  //Used for optimization 
  const handleScroll = () => {
    lastKnownY = window.scrollY;

    //lastKnownY !== 0 needed so that the mountains do not move when opening the menu in mobile
    if (!ticking && lastKnownY < window.innerHeight && lastKnownY !== 0) {
      window.requestAnimationFrame(() => {
        animation.start({offset: lastKnownY});
        ticking = false;
      });
  
      ticking = true;
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
            "Vi ses i Valdi!", 
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
        <Navbar stickyOffset/>
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

  const meta = {
    title:"Week of Winter - Uppsalas skidförening för studenter",
    description:"Week of Winter är en skidförening till för främst teknolog- och naturvetar studenter i Uppsala",
    keywords:"Alperna, Skidor, Afterski, Förening, Bärs, Génépi",
  }

  return (
    <>
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} key="desc"/>
      <meta name="keywords" content={meta.keywords} key="keyword"/>
      <meta name="og:description" content={meta.description} key="og:desc"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport"/>
      <link rel="shortcut icon" href="/favicon.ico"/>
    </Head>
    <main>
      <ParallaxEffect/>
      <article className={s.content}>
        <div className={s.innerContent}>

          <Trip
            title="Val-d'Isère 2024"
            date="13 JAN – 22 JAN"
            ticket="Anmälan den 23 SEPT KL. 18:00"
            place="Val-d'Isère, Frankrike"
            placeLink="https://goo.gl/maps/ra6y4Cr82uSyJ2bM7"
            description={
              <>
                <p>Val-d’Isère är byn som har de lilla extra! Lite finare, lite mysigare och lite lyxigare rent generellt. Skidåkningen i systemet Espace Killy håller absolut toppklass och här upplever du unik afterski på La Folie Douce och Cocorico. Nattklubben DouDoune är utan tvekan en av alpernas absolut bästa och mest välkända nattklubbar. Om inte detta skulle vara nog så är atmosfären i Val d’Isère något helt unikt och byn är också sprängfylld av restauranger, barer och butiker. </p>
                <p>Häng med på årets vinterresa 13/1 – 22/1. DIN plats på bussen ner säkrar du den 12:e Oktober. Mer info finns i evenemanget på</p>
              </>
            }
            imageSrc="/collage.webp"
            alt="stanton"
          />



          <div className={s.infoBoxContainer}>
            <InfoBox
              value={12}
              desc="Afterski Barer"
            />
            <InfoBox
              valueBefore="0"
              value={4}
              valueAfter=":30"
              desc="Stängning av Nattklubb"
            />
            <InfoBox
              startValue={10}
              value={3.5}
              valueAfter="€"
              desc="Bärs på Krazy Kanguruh"
            />
          </div>

          <section className={s.priceSection}>
            <header className={s.header}>
              <h2>Hur vill du följa med?</h2>
            </header>
            <div className={s.priceCardContainer}>
              <PriceCard
                title="Grund"
                price="5795 kr"
                includes={[
                  "Boende i skidorten", 
                  "6 dagars liftkort",
                  "24/7 service- och jourtelefon", 
                  "Resegaranti", 
                  "Guideservice",
                ]}
              />

              <PriceCard
                title="Buss"
                price="7 395 kr"
                popular
                delay={500}
                includes={[
                  "Bussresa tur och retur från Uppsala", 
                  "Boende i skidorten", 
                  "6 dagars liftkort",
                  "24/7 service- och jourtelefon", 
                  "Resegaranti", 
                  "Guideservice",
                ]}
              />

              <PriceCard
                title="Flyg"
                price="9 999 kr"
                delay={1000}
                includes={[
                  "Flygresa tur & retur från Arlanda, inkl transfer från Lyon", 
                  "Boende i skidorten", 
                  "6 dagars liftkort",
                  "24/7 service- och jourtelefon", 
                  "Resegaranti", 
                  "Guideservice",
                ]}
              />
            </div>
            <div className={s.addOnContainer}>
              <h3>Tillval</h3>
              <div className={s.addOnCards}>
                <InfoCard
                  title="Eventpaket. "
                  desc="Gillar du att gå på evenemang? Då är detta något för dig! I eventpaketet ingår lunch i backen, rabatt på La Folie Douce, gratis inträde till klubben och en extraordinär sittning."
                  icon={<Ticket width={70} height={70}/>}
                />
                <InfoCard
                  title="Skidhyra. "
                  desc="Har du inga skidor eller en snowboard? Då finns det möjlighet att hyra skidor, stavar och hjälm. Eller varför inte en snowboard?"
                  icon={<Ski width={70} height={70}/>}
                />
                <InfoCard
                  title="Skidfrakt. "
                  desc="Har du egna skidor eller en snowboard som du vill ta med dig? Då är detta ett utmärkt val för endast 199 kr om du åker buss och 699 kr om du åker flyg."
                  icon={<DeliveryTruck width={70} height={70}/>}
                />
                <InfoCard
                  title="Extra dag på lifkortet. "
                  desc="Vill du maximera skidåkandet så mycket det går? Då går det att välja ett skidkort med en extra dag!"
                  icon={<PlusAdd width={70} height={70}/>}
                />
                <InfoCard
                  title="Försäkringar. "
                  desc="Är du rädd att dina nya skidor blir stulna eller går sönder? Blablabla försäkringar försäkrar dig då till 100%!"
                  icon={<Insurance width={70} height={70}/>}
                />
                <InfoCard
                  title="Avbeställningsskydd. "
                  desc="Nojig över att du verkligen kan följa med? Frukta ej. Det går att lägga till avbeställningskydd till bokningen."
                  icon={<CalenderCancel width={70} height={70}/>}
                />
              </div>
            </div>
          </section>


          <FAQ/>

          <Countdown 
            title="Avresa Val d'isere"
            date={new Date(2024, 1, 14, 18, 0, 0)}
            dateExpired={
              <h2>TAGGA!</h2>
            }
          />

          
       </div>
      </article>
    </main>
    <Footer/>
    </>
  );
}


/*
          <div className={s.circleInformationContainer}>
            <CircleInformation 
              title="Grundpaketet"
              subTitle="7 395 kr"
              info={[
                "Bussresa tur och retur från Uppsala", 
                "Boende i skidorten", 
                "6 dagars liftkort",
                "24/7 service- och jourtelefon", 
                "Resegaranti", 
                "Guideservice"
              ]}
              backgroundColor="#15803d"
              duration={1500}
            />

            <CircleInformation 
              title="Flygpaketet"
              subTitle="9 999 kr"
              info={[
                "Flygresa tur & retur inkl. transfer från Lyon", 
                "Boende i skidorten", 
                "6 dagars liftkort",
                "24/7 service- och jourtelefon", 
                "Resegaranti", 
                "Guideservice"
              ]}
              backgroundColor="#5b21b6"
              duration={1500}
            />
          </div>
          */

//Override default page layout
HomePage.getLayout = (page) => page

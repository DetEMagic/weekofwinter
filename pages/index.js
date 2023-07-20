/*
  This file is the websites index page i.e. the first page to land on
*/

import { useEffect} from 'react';
import Image from "next/image";
import Trip from '../components/Trip';
import Youtube from '../components/Youtube';
import Snow from '../components/Snow';
import { TypeAnimation } from 'react-type-animation';
import { animated, useSpring, config, useInView } from "@react-spring/web";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import s from "../styles/Index.module.css"
import InfoBox from '../components/InfoBox';
import FAQ from '../components/Faq';
import Countdown from '../components/Countdown';
import Head from 'next/head';
import PriceCard from '../components/PriceCard';
import InfoCard from '../components/InfoCard';
import Ticket from "../icons/ticket.svg"
import DeliveryTruck from "../icons/deliveryTruck.svg"
import PlusAdd from "../icons/plusAdd.svg"
import Insurance from "../icons/insurance.svg"
import CalenderCancel from "../icons/calenderCancel.svg"
import Ski from "../icons/ski.svg"
import LinkBox from '../components/LinkBox';
import tripImage from "../public/image/trip.webp"
import DivideContainer from '../components/DivideContainer';
import AnimatedContainer from '../components/AnimatedContainer';
import Sponsors from '../components/Sponsors';

//debounce to not change the parallax on every pixel
/*
function debounce(func, timeout = 10){
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

  const [ref, inView] = useInView()

  const [{ offset }, animation] = useSpring(
    () => ({ 
      from: {offset:0},
      config: {
        ...config.gentle
      }
  }));

  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking && window.scrollY < window.innerHeight) {
      //Used for optimization 
      window.requestAnimationFrame(() => {
        animation.start({offset: window.scrollY});
        ticking = false;
      });
  
      ticking = true;
    }
  };

  useEffect(() => {
    if(!inView) return

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [inView]);

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
    <div ref={ref} className={s.parallaxContainer} id="landingPage">
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
            "Uppsala universitets skidförening",
            1000, 
            "Vi ses i Valdi!", 
            1000, 
            "#WW2024", 
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
      <Navbar stickyOffset/>
      <ParallaxEffect/>
      <article className={s.content}>
        <div className={s.innerContent}>
          <section id="om" className={s.section}>
            <DivideContainer>
              <>
                <AnimatedContainer>
                  <header>
                    <h2 className={s.aboutTitle}>Om oss</h2>
                  </header>
                </AnimatedContainer>
                <AnimatedContainer>
                <p className={s.about}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium pulvinar enim non mollis. Curabitur commodo aliquam placerat. Donec ut tortor eget lectus porttitor pulvinar. Suspendisse orci velit, venenatis et augue quis, suscipit lacinia sapien. Nulla facilisi. Aenean commodo justo vel lorem sodales, et ultrices orci vehicula. Morbi vitae neque sed urna condimentum cursus sit amet ut tortor. Aenean facilisis maximus lectus, id vehicula quam porttitor vitae. Maecenas eget urna vel odio condimentum tempor nec eu metus.</p>
                </AnimatedContainer>
              </>
              <Youtube title="Week of Winter" videoId="tYE42Ntdp18"/>
            </DivideContainer>
          </section>

          <section id="arets-resa" className={s.section}>
            <Trip
              title="Val-d'Isère 2024"
              date="13 JAN – 22 JAN"
              ticket="Anmälan öppnar 23 SEPT KL. 18:00"
              place="Val-d'Isère, Frankrike"
              placeLink="https://goo.gl/maps/ra6y4Cr82uSyJ2bM7"
              description={
                <>
                  <p>Val-d’Isère är byn som har de lilla extra! Lite finare, lite mysigare och lite lyxigare rent generellt. Skidåkningen i systemet Espace Killy håller absolut toppklass och här upplever du unik afterski på La Folie Douce och Cocorico. Nattklubben DouDoune är utan tvekan en av alpernas absolut bästa och mest välkända nattklubbar. Om inte detta skulle vara nog så är atmosfären i Val d’Isère något helt unikt och byn är också sprängfylld av restauranger, barer och butiker. </p>
                  <p>Häng med på årets vinterresa 13/1 – 22/1. DIN plats på bussen ner säkrar du den 12:e Oktober. Mer info finns i evenemanget på</p>
                </>
              }
              imageSrc={tripImage}
              imageAlt="Images of Val-d'Isère"
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
          </section>

          <section id="anmal" className={s.section}>
            <header className={s.priceCardHeader}>
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

          <section id="fragor" className={`${s.section} ${s.faq}`}>
            <header className={`${s.header} ${s.splitHeader}`}>
              <h2>Frågor? Svar.</h2>
            </header>
            <FAQ
              questions={[
                {
                  q:"Vad är Week of Winter?",
                  a:"Week of Winter är en skidförening för Uppsalas studenter med fokus på teknologer och naturvetare!"
                },
                {
                  q:"Vem får följa med?",
                  a:"Week of Winter riktar sig till teknologer vid Uppsala Universitet men det är fritt vem som helst över 18 år att följa med"
                },
                {
                  q:"Kan man boka egen transaport ner?",
                  a: "Ja, det går bra att boka egen transport, det alternativet fyller man i vid bokning"
                },
                {
                  q:"Går det bra att ta med sina egna skidor ned?",
                  a:"Ja, det går bra ta med sina egna skidor ned, oavsett om man åker buss eller flyger ned så går det att beställa skidtransport"
                },
                {
                  q:"När går det att boka boende?",
                  a:"Bokandet av boende öppnar ungefär i mitten av November och mer information kommer ungefär två veckor innan bokningen öppnar"
                }
              ]}
            />
          </section>

          <section id="mer" className={`${s.section} ${s.more}`}>
            <header className={s.header}>
              <h2>Mer</h2>
            </header>
            <LinkBox
              name="Bilder"
              href="/mer/bilder"
            />
            <LinkBox
              name="Styrelsen"
              href="/mer/styrelsen"
            />
            <LinkBox
              name="Historia"
              href="/mer/historia"
            />
            <LinkBox
              name="Postbeskrivningar"
              href="/mer/postbeskrivningar"
            />
            <LinkBox
              name="Stadgar"
              href="/mer/stadgar"
            />
          </section>

          <section className={s.section}>
            <header className={s.header}>
              <h2>Avresa Val-d'Isère</h2>
            </header>
            <Countdown 
              date={new Date(2024, 1, 14, 18, 0, 0)}
              dateExpired={
                <div style={{textAlign:"center"}}>Taggish</div>
              }
            />
          </section>
          
       </div>
      </article>
    </main>
    <Footer/>
    </>
  );
}

//Override default page layout
HomePage.getLayout = (page) => page

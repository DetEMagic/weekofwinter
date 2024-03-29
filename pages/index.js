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
import TripDescription from '../components/TripDescription.mdx'

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
            "För studenter av studenter.", 
            1000,
            "@weekofwinter",
            1000,
          ]}
          speed={60}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className={`${s.welcomeSubheading} h3`}
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
                <p className={s.about}>
                  Skidföreningen Week of Winter är en ideell förening av studenter för studenter i Uppsala. 
                  Varje år i januari  arrangerar vi en maxad skidresa till Alperna, tillsammans med andra roliga 
                  skid- och festrelaterade evenemang. Vårt syfte är att tillföra festligheter, kul och såklart 
                  skidåkning till Uppsalas studentliv. Vi ser fram emot att hänga och skåla med er i Alperna. Vi ses där!
                </p>
                </AnimatedContainer>
              </>
              <Youtube title="Week of Winter - Aftermovie" videoId="pM8BvWNd0R4"/>
            </DivideContainer>
          </section>

          <section id="arets-resa" className={s.section}>
            <Trip
              title="Val-d'Isère 2024"
              date="12 Jan – 21 Jan"
              ticket="Anmälan öppnar 2023-09-29 kl 12:00"
              place="Val-d'Isère, Frankrike"
              placeLink="https://goo.gl/maps/ra6y4Cr82uSyJ2bM7"
              description={
                <>
                <TripDescription/>
                </>
              }
              imageSrc={tripImage}
              imageAlt="Images of Val-d'Isère"
            />

            <div className={s.infoBoxContainer}>
              <InfoBox
                value={15}
                valueAfter="+"
                desc="Barer och klubbar"
              />

              <InfoBox
                value={300}
                desc="Kilometer pist"
              />

              <InfoBox
                value={3456}
                desc="Meter över havet"
              />
            </div>
          </section>

          <section id="anmal" className={s.section}>
            <header className={`${s.header} ${s.priceCardHeader}`}>
              <h2>Hur vill du följa med?</h2>
            </header>
            <div className={s.priceCardContainer}>
              <PriceCard
                title="Flyg"
                price="10 995:-"
                href="https://group.skivenue.com/WOW"
                includes={[
                  "Flyg tur och retur från Arlanda, inkl. transfer ", 
                  "Boende (enkel lägenhet med eget kök)", 
                  "Liftkort 6 dagar (Val D'isere + Tignes)",
                  "Guideservice 24/7", 
                  "Turistskatter", 
                ]}
              />

              <PriceCard
                title="Buss"
                price="7 999:-"
                href="https://group.skivenue.com/WOW"
                popular
                includes={[
                  "Bussresa tur och retur från Uppsala", 
                  "Boende (enkel lägenhet med eget kök)", 
                  "Liftkort 6 dagar (Val D'isere + Tignes)",
                  "Guideservice 24/7", 
                  "Turistskatter", 
                ]}
              />

              <PriceCard
                title="Basic"
                price="6 499:-"
                href="https://group.skivenue.com/WOW"
                includes={[
                  "Boende (enkel lägenhet med eget kök)", 
                  "Liftkort 6 dagar (Val D'isere + Tignes)",
                  "Guideservice 24/7", 
                  "Turistskatter", 
                ]}
              />
            </div>
            <div className={s.addOnContainer}>
              <h3 className={s.header}>Tillval</h3>
              <div className={s.addOnCards}>
                <InfoCard
                  title="Eventpaket. "
                  desc="Gillar du att gå på evenemang? Då är detta något för dig! 
                        I eventpaketet ingår en välkomstfest, picnic, flera andra events och 
                        rabatt på flera ställen, bland annat La Folie Douce. "
                  icon={<Ticket width={70} height={70}/>}
                />
                <InfoCard
                  title="Skidhyra. "
                  desc="Har du inga skidor eller en snowboard? Då finns det möjlighet 
                        att hyra skidor, stavar och hjälm. Eller varför inte en snowboard?"
                  icon={<Ski width={70} height={70}/>}
                />
                <InfoCard
                  title="Skidfrakt. "
                  desc="Har du egna skidor eller en snowboard som du vill ta med dig? 
                        Då är detta ett utmärkt val för endast 99 kr om du åker buss 
                        och 600-800 kr om du flyger (priset beror på flygbolaget)."
                  icon={<DeliveryTruck width={70} height={70}/>}
                />
                <InfoCard
                  title="Extra dag på lifkortet. "
                  desc="Vill du maximera skidåkandet så mycket det går? Då går det att 
                        utöka skidkortet med en extra dag!"
                  icon={<PlusAdd width={70} height={70}/>}
                />
                <InfoCard
                  title="Reseförsäkring."
                  desc="Vill du känna dig trygg under resan? Då kan du boka en 
                        reseförsäkring hos Gouda."
                  icon={<Insurance width={70} height={70}/>}
                />
                <InfoCard
                  title="Avbeställningsskydd. "
                  desc="Nojig över att en sjukdom eller olycka stoppar din resa? Frukta ej. 
                        Det går att lägga till avbeställningskydd till bokningen."
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
                  a:
                    <>
                    Studerande vid Uppsala universitet och SLU som även är medlemmar i WOW får delta på resan. 
                    <br></br>
                    <a style={{color:"blue"}} href='https://shorturl.at/sBH13'> Bli medlem här! </a>
                    </>
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
              name="Postbeskrivningar"
              href="/mer/postbeskrivningar"
            />
            <LinkBox
              name="Stadgar"
              href="/mer/stadgar"
            />
            <LinkBox
              name="Historia"
              href="/mer/historia"
            />
          </section>

          <section className={s.section}>
            <header className={s.header}>
              <h2>Avresa Val-d'Isère</h2>
            </header>
            <Countdown 
              date={new Date(2024, 1, 12, 15, 0, 0)}
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

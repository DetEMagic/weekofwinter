import React, { useRef, useState, useEffect, memo } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import Link from 'next/link';
import Image from 'next/image';
import s from "./Navbar.module.css";
import Socialmedia from './Socialmedia';
import Logo from './Logo';
import { useRouter } from 'next/router';
import SongPlayer from './SongPlayer';

const Menu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter()

  const [styles, animation]= useSpring(
    () => ({
      width:"0%",
      opacity:0,
    })
  )  

  const animateMenu = (path) => {
    animation.start({
      width: isMenuOpen ? "0%" : "100%",
      opacity: isMenuOpen ? 0 : 1,
      immediate:router.pathname !== path ,
    })
    setMenuOpen(!isMenuOpen)
  }

  const Tree = memo(({ children, name, href, topLevel = false, open = false}) => {
    const [isOpen, setOpen] = useState(open)
    const refChildren = useRef(null)

    const { height, opacity, y} = useSpring({
      from: { 
        opacity: 1, 
        y: 0 
      },
      to: {
        opacity: 1,
        y: isOpen ? 0 : -40,
      },
      config: {
        mass: 0.5,
        friction: 10,
        tension: 100,
      },
      reset:isOpen,
    })

    const onMouseEnter = () => {
      isOpen ? 
        (refChildren.current ? refChildren.current.classList.add(s.invisible): null) :
        (refChildren.current ? refChildren.current.classList.remove(s.invisible): null) 

      setOpen(!isOpen)
    }

    const iconName = isOpen ? "minus" : "plus"
    
    return (
      <div
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseEnter}
        className={topLevel ? s.topLevelLinkHover : null} 
      >
        <div className={`${topLevel ? s.topLevelLinkContainer : null} ${s.linkContainer}`}>
          <Link 
            prefetch={false}
            href={href} 
            className={topLevel ? s.topLevelLink : null}
            onClick={()=>animateMenu(href)}
          >
            {name}
          </Link>
          {children ? 
          <Image 
            width={30} 
            height={30} 
            onClick={()=>{
              isOpen ? 
                refChildren.current.classList.add(s.invisible) :
                refChildren.current.classList.remove(s.invisible) 
              setOpen(!isOpen)
            }} 
            className={s.plus}
            src={`/icons/${iconName}.svg`} 
            alt={iconName}
          /> 
          : null }
        </div>
        {children ? 
          <animated.div 
            ref={refChildren}
            style={{ 
              opacity,
            }} 
            className={`${s.invisible} ${s.children} ${topLevel ? s.topLevelChildren : ""}`} 
          >
          {children}
          </animated.div>
        : null}
      </div>
    )
  })

  return (
    <>
    <div className={s.logoContainer}>
      <Logo containerClass={s.logo} onClick={()=>isMenuOpen ? animateMenu("/") : null}/>
      <SongPlayer/>
    </div>
    <animated.div style={styles} className={s.container}>
      <div className={s.innerContainer}>
          <Tree name="Hem" href="/" topLevel>

          </Tree>
          <Tree name="Events" href="/events" topLevel>

          </Tree>
          <Tree name="Om" href="/om" topLevel>
            <Tree name="Postbeskrivningar" href="/om/postbeskrivningar">
              <Tree name="Absolut" href="/sponsorer/absolut">
                <Tree name="Absolut" href="/sponsorer/absolut">

                </Tree>
              </Tree>
            </Tree>
          </Tree>
          <Tree name="Sponsorer" href="/sponsorer" topLevel>
            <Tree name="Absolut" href="/sponsorer/absolut">
              <Tree name="Absolut" href="/sponsorer/absolut">
                <Tree name="Absolut" href="/sponsorer/absolut">
                </Tree>
              </Tree>
            </Tree>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
            <Tree name="Absolut" href="/sponsorer/absolut"/>
          </Tree>
      </div>
      <div className={s.socialMedia}>
        <Socialmedia width="50" height="50"/>
      </div>
    </animated.div>
    <button className={s.burger} onClick={()=>animateMenu(router.pathname)}>
      <Image 
        width={50} 
        height={50} 
        src={`/icons/${isMenuOpen ? "close" : "burger"}.svg`}
        alt="Menu button"
      />
    </button>
    </>
  )
}

export default function Navbar({innerHeightOffset=false}) {

  const nav = useRef(null)

  const sticky = () => {
      if (window.pageYOffset > (innerHeightOffset ? window.innerHeight : 0)) {
        nav.current.classList.add(s.sticky)
      } else {
        if(nav.current) nav.current.classList.remove(s.sticky)
      }
  };

  useEffect(() => {
    window.addEventListener("scroll", sticky);

    return () => {
      window.removeEventListener("scroll", sticky);
    };
  }, []);

  return (
    <nav ref={nav} className={s.navContainer}>
      <div className={s.innerNavContainer}>
        <Menu/>
      </div>
    </nav>
  )
}

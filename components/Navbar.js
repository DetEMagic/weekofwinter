import React, { useRef, useState, useEffect, useContext, memo, forwardRef } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import Link from 'next/link';
import s from "./Navbar.module.css";
import Socialmedia from './Socialmedia';
import Logo from './Logo';
import { useRouter } from 'next/router';
import SongPlayer from './SongPlayer';
import Burger from "../icons/burger.svg"
import Close from "../icons/close.svg"
import Plus from "../icons/plus.svg"
import Minus from "../icons/minus.svg"

//The navigation bar that is shown all the time on the top
export default function Navbar() {

  const nav = useRef(null)
  let oldScrollY = 0;

  const MENU_HEIGHT = 84.57 //Ehhh jävla piss och behöva ha statics värde

  let menu = {
    height:MENU_HEIGHT,
    isHover:false,
  }

  const [height, navAnimation] = useSpring(()=>({
    height:0,
    y:0,
  })) 


  //Makes the navigation bar sticky when scrolling up
  const sticky = () => {
    if (window.scrollY > oldScrollY) {
      navAnimation.start({
        height:menu.isHover ? menu.height : 0,
        y:menu.isHover ? 0 : -menu.height
      })
    } else {
      navAnimation.start({
        height:menu.isHover ? menu.height : (window.pageYOffset > menu.height ? menu.height : 0),
        y:0
      })
    }
    oldScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", sticky);

    return () => {
      window.removeEventListener("scroll", sticky);
    };
  }, []);


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


  //Used to create a new menu link in the navigation bar
  const Tree = ({ children, name, href, style, topLevel = false, open = false}) => {
    const [isOpen, setOpen] = useState(open)
    const refChildren = useRef(null)

    const onMouseEnter = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        refChildren.current ? refChildren.current.classList.remove(s.invisible): null 

        menu.height = (refChildren.current ? refChildren.current.clientHeight : 0)+MENU_HEIGHT
        menu.isHover = true

        navAnimation.start({
          height:menu.height,
          y:0,
          opacity:1
        })
      }
    }

    const onMouseLeave = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        refChildren.current ? refChildren.current.classList.add(s.invisible): null

        menu.height = window.pageYOffset <  0 ? 0 : MENU_HEIGHT
        menu.isHover = false

        navAnimation.start({
          height:window.pageYOffset > menu.height ? menu.height : 0,
          y:0
        })
      }
    }

    const IconName = isOpen ? Minus : Plus

    return (
      <div
        onMouseEnter={topLevel ? onMouseEnter : null} 
        onMouseLeave={topLevel ? onMouseLeave : null}
        className={topLevel ? s.topLevelLinkHover : null} 
      >
        <div className={`${topLevel ? s.topLevelLinkContainer : null} ${s.linkContainer}`}>
          <Link 
            prefetch={false}
            href={href} 
            className={topLevel ? s.topLevelLink : null}
            style={style}
            onClick={()=>{
              animateMenu(href)
              menu.height = MENU_HEIGHT
              menu.isHover = false
              navAnimation.start({
                height:0,
                y:0,
                immediate:true,
              })
            }}
          >
            {name}
          </Link>
          {children ? 
          <IconName
            width={30} 
            height={30} 
            onClick={()=>{
              isOpen ? 
                refChildren.current.classList.add(s.invisible) :
                refChildren.current.classList.remove(s.invisible) 
              setOpen(!isOpen)

            }} 
            className={s.plus}
          /> 
          : null }
        </div>
        {children ? 
          <div 
            ref={refChildren}
            className={`${s.invisible} ${s.children} ${topLevel ? s.topLevelChildren : ""}`} 
          >
          {children}
          </div>
        : null}
      </div>
    )
  }

  const MenuIcon = isMenuOpen ? Close : Burger

  return (
    <animated.nav 
      ref={nav} 
      style={height} 
      className={s.navContainer}
    >
      <div className={s.navInnerContainer}>
        <div className={s.logoContainer}>
          <Logo containerClass={s.logo} onClick={()=>isMenuOpen ? animateMenu("/") : null}/>
        </div>
        <animated.div style={styles} className={s.container}>
          <div className={s.innerContainer}>
              <Tree name="Hem"  href="/" topLevel>

              </Tree>
              <Tree name="Events"  href="/events" topLevel>
                <Tree name="Postbeskrivningar" href="/om/postbeskrivningar"></Tree>
              </Tree>
              <Tree name="Om"  href="/om" topLevel>
                <Tree name="Bilder" href="/om/bilder"></Tree>
                <Tree name="Postbeskrivningar" href="/om/postbeskrivningar"></Tree>
              </Tree>
              <Tree name="Sponsorer" href="/sponsorer" topLevel>
                <Tree name="Absolut" href="/sponsorer/absolut"/>
                <Tree name="Mercedes-Benz" href="/sponsorer/mercedesbenz"/>
                <Tree name="Nordic Wellness" href="/sponsorer/nordicwellness"/>
                <Tree name="Skistar" href="/sponsorer/skistar"/>
                <Tree name="Salomon" href="/sponsorer/salomon"/>
                <Tree name="Stadler" href="/sponsorer/stadler"/>
              </Tree>
          </div>
          <div className={s.socialMedia}>
            <Socialmedia width="50" height="50" animation={false}/>
          </div>
        </animated.div>
        <button className={s.burger} onClick={()=>animateMenu(router.pathname)}>
          <MenuIcon
            width={50}
            height={50}
          />
        </button>

      </div>
    </animated.nav>
  )
}


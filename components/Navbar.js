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
import {useMediaQuery} from "./hooks"

//The navigation bar that is shown all the time on the top
let lastScrollTop = 0

export default function Navbar({stickyOffset}) {

  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
        window.removeEventListener('scroll', isSticky);
    };
  });

  const nav = useRef(null)
  const overlay = useRef(null)

  const isSticky = () => {
    const r = nav.current
    r !== null && window.scrollY > 0 ? (
      (window.scrollY > (stickyOffset ? window.innerHeight : r.clientHeight)) ? 
      r.classList.add(s.sticky) : 
      r.classList.remove(s.sticky)
    ): null
  }

  const router = useRouter()

  const [styles, animation]= useSpring(
    () => ({
      transform: "translate3d(100vw,0,0)",
      opacity:0,
    })
  )  

  const mobileStyle = useMediaQuery(1024)


  const mobileMenu = (path) => {
    //check if desktop menu is used
    if(!mobileStyle) return

    //Find how long down the user has scrolled on the page
    const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop

    //makes the menu non-scrollable
    if (!isMenuOpen) {
      document.documentElement.style.cssText = "scroll-behavior: initial;"
      document.body.style.cssText = `
        overflow:hidden; 
        overflow-y:scroll;
        position:fixed; 
        top:-${scrollTop}px
      ` 
      overlay.current.classList.remove(s.invisible)
    } else {
      document.documentElement.style.cssText = ""
      document.body.style.cssText = ""
      overlay.current.classList.add(s.invisible)
      window.scrollTo(0, lastScrollTop)
    }

    lastScrollTop = scrollTop

    animation.start({
      transform: isMenuOpen ? "translate3d(100vw,0,0)" : "translate3d(0vw,0,0)",
      opacity: isMenuOpen ? 0 : 1,
      immediate:router.pathname !== path,
    })

    setMenuOpen(!isMenuOpen)
  }


  //Used to create a new menu link in the navigation bar
  const Tree = ({ children, name, href, style, topLevel = false, open = false}) => {
    const [isOpen, setOpen] = useState(open)
    const refChildren = useRef(null)

    const IconName = isOpen ? Minus : Plus

    const onMouseEnter = () => {
      if(mobileStyle) return

      refChildren.current ? refChildren.current.classList.remove(s.invisible): null 

      overlay.current.classList.remove(s.invisible)
      nav.current.classList.add()
    }

    const onMouseLeave = () => {
      if(mobileStyle) return

      refChildren.current ? refChildren.current.classList.add(s.invisible): null

      overlay.current.classList.add(s.invisible)
    }

    return (
      <div
        onMouseEnter={topLevel && children ? onMouseEnter : null} 
        onMouseLeave={topLevel && children ? onMouseLeave : null}
        className={topLevel ? s.topLevelLinkHover : null} 
      >
        <div className={`${topLevel ? s.topLevelLinkContainer : null} ${s.linkContainer}`}>
          <Link 
            prefetch={false}
            href={href} 
            className={topLevel ? s.topLevelLink : null}
            style={style}
            onClick={()=>{
              mobileMenu(href)
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
        {children && topLevel ? 
          <div className={s.topLevelChildren}>
            <div 
              ref={refChildren}
              className={`${s.invisible} ${s.children} ${s.topLevelChildrenInner}`} 
            >
              {children}
            </div>
          </div>
        : children ?
          <div 
            ref={refChildren}
            className={`${s.invisible} ${s.children}`} 
          >
            {children}
          </div>
        : null}
      </div>
    )
  }

  const MenuIcon = isMenuOpen ? Close : Burger

  return (
    <>
    <div 
      ref={overlay}
      onClick={()=>isMenuOpen ? mobileMenu("/") : null}
      className={`${s.invisible} ${s.overlay}`}
    />
    <nav 
      className={s.navContainer}
      ref={nav}
    >
      <div 
        className={s.navInnerContainer}
      >
        <div className={s.logoContainer}>
          <Logo containerClass={s.logo} onClick={()=>isMenuOpen ? mobileMenu("/") : null}/>
        </div>
        <animated.div style={styles} className={s.container}>
          <div className={s.innerContainer}>
            <Tree name="Events"  href="/events" topLevel>
              <Tree name="Postbeskrivningar" href="/om/postbeskrivningar"></Tree>
            </Tree>
            <Tree name="Om"  href="/om" topLevel>
              <Tree name="Bilder" href="/om/bilder"></Tree>
              <Tree name="Postbeskrivningar" href="/om/postbeskrivningar">
                <Tree name="Bilder" href="/om/bilder"></Tree>

              </Tree>
            </Tree>
            <Tree name="Sponsorer" href="/sponsorer" topLevel>
              <Tree name="Absolut" href="/sponsorer/absolut"/>
              <Tree name="Mercedes-Benz" href="/sponsorer/mercedesbenz"/>
              <Tree name="Nordic Wellness" href="/sponsorer/nordicwellness"/>
              <Tree name="Skistar" href="/sponsorer/skistar"/>
              <Tree name="Salomon" href="/sponsorer/salomon"/>
              <Tree name="Stadler" href="/sponsorer/stadler"/>
            </Tree>
            <Tree name="Hejsan" href="/" topLevel/>
          </div>
          <div className={s.socialMedia}>
            <Socialmedia width="50" height="50" animation={false}/>
          </div>
        </animated.div>
        <button className={s.burger} onClick={()=>mobileMenu(router.pathname)}>
          <MenuIcon
            width={50}
            height={50}
          />
        </button>

      </div>
    </nav>
    </>
  )
}


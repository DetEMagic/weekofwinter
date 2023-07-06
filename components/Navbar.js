import React, { useRef, useState, useEffect} from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import Link from 'next/link';
import s from "./Navbar.module.css";
import Socialmedia from './Socialmedia';
import { useRouter } from 'next/router';
import Burger from "../icons/burger.svg"
import Close from "../icons/close.svg"
import Plus from "../icons/plus.svg"
import Minus from "../icons/minus.svg"
import WW from "../icons/logo.svg"

/**
 * The website logo
 * @component
 * @example
 * <Logo containerClass={s.logo} onClick={()=>isMenuOpen ? animateMenu("/") : null}/>
 */
function Logo({width=70, height=40, scroll, ...props}) {
  return (
    <>
    <div className={s.logoShadow}/>
    <Link 
      aria-label='returnToHomePage'
      className={s.logoContainer} 
      href="/" 
      scroll={scroll}
      {...props}
    >
        <WW
            width={width}
            height={height}
            className={s.logo}
        />
    </Link>
    </>
  )
}


let lastScrollTop = 0

//The navigation bar that is shown all the time on the top
export default function Navbar({stickyOffset}) {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter()

  const nav = useRef(null)
  const overlay = useRef(null)
  const mobileStyle = "(max-width:1024px)"

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    const media = window.matchMedia(mobileStyle);
    media.addEventListener('change', resetMenu);

    return () => {
      window.removeEventListener('scroll', isSticky);
      media.removeEventListener('change', resetMenu);
    };
  }, [isMenuOpen]);

  const isSticky = () => {
    const r = nav.current
    r !== null && window.scrollY > 0 ? (
      (window.scrollY > (stickyOffset ? window.innerHeight : 20)) ? 
      r.classList.add(s.sticky) : 
      r.classList.remove(s.sticky)
    ): null
  }

  const resetMenu = (event) => {
    if(!window.matchMedia(mobileStyle).matches && isMenuOpen) {
      //nonScrollable(event.matches)
      animation.start({
        transform: "translate3d(100vw,0,0)",
        opacity: 0,
        immediate:true
      })
      setMenuOpen(false)
    } else {
      overlay.current ? overlay.current.classList.add(s.invisible) : null
    }
  } 

  function nonScrollable(noScroll) {
    //Find how long down the user has scrolled on the page
    const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop

    //makes the menu non-scrollable
    if (noScroll) {
      document.documentElement.style.cssText = "scroll-behavior: auto;"
      document.body.style.cssText = `
        overflow:hidden; 
        overflow-y:scroll;
        position:fixed; 
        width:100%;
        top:-${scrollTop}px
      ` 
      overlay.current ? overlay.current.classList.remove(s.invisible) : null
    } else {
      document.documentElement.style.cssText = ""
      document.body.style.cssText = ""
      overlay.current ? overlay.current.classList.add(s.invisible) : null
      window.scrollTo(0, lastScrollTop)
    }
    lastScrollTop = scrollTop
  }


  const [styles, animation]= useSpring(
    () => ({
      transform: "translate3d(100vw,0,0)",
      opacity:0,
    })
  )  

  const mobileMenu = (path) => {
    //check if desktop menu is used
    if(!window.matchMedia(mobileStyle).matches) return
    //nonScrollable(!isMenuOpen)
    animation.start({
      transform: isMenuOpen ? "translate3d(100vw,0,0)" : "translate3d(0vw,0,0)",
      opacity: isMenuOpen ? 0 : 1,
      immediate:router.pathname !== path,
    })

    setMenuOpen(!isMenuOpen)
  }

  //Used to create a new menu link in the navigation bar
  const Tree = React.memo(({ children, name, href, style, topLevel = false, open = false}) => {
    const [isOpen, setOpen] = useState(open)
    const refAnimatedChildren= useRef(null)
    const refChildren = useRef(null)

    const IconName = isOpen ? Minus : Plus

    const springs = useSpring({
      from: {
        height: 0,
        overflow:"hidden"
      },
      to: {
        height:isOpen && refChildren.current ? refChildren.current.offsetHeight + 18 : 0,
        overflow:"hidden"
      },
      immediate: isOpen || (typeof window !== "undefined" ? window.matchMedia(mobileStyle).matches : null) ? false : true,
      onRest: !isOpen && refAnimatedChildren.current ? refAnimatedChildren.current.classList.remove(s.topLevelChildrenPadding):null
    })

    useEffect(() => {
      const media = window.matchMedia(mobileStyle);
      media.addEventListener('change', closeMenu);

      return () => {
        media.addEventListener('change', closeMenu);
      };
    }, [])

    const closeMenu = (event) => {
      if(!window.matchMedia(mobileStyle).matches) setOpen(event.matches)
    }

    const onMouseEnter = () => {
      //check if moble menu is used
      if(window.matchMedia(mobileStyle).matches) return
      refAnimatedChildren.current ? refAnimatedChildren.current.classList.add(s.topLevelChildrenPadding):null
      setOpen(true)


      overlay.current.classList.remove(s.invisible)
    }

    const onMouseLeave = () => {
      //check if moble menu is used
      if(window.matchMedia(mobileStyle).matches) return
      setOpen(false)

      //refChildren.current ? refChildren.current.classList.add(s.invisible): null

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
            href={href} 
            aria-label={name}
            className={topLevel ? s.topLevelLink : null}
            style={style}
            scroll={!href.includes("#")}
            onClick={()=>{
              mobileMenu(href)
              onMouseLeave()
            }}
          >
            {name}
          </Link>
          {children ? 
          <IconName
            width={30} 
            height={30} 
            onClick={()=>setOpen(!isOpen)} 
            className={s.plus}
          /> 
          : null }
        </div>
        {children ? 
        <animated.div 
          ref={refAnimatedChildren}
          style={springs} 
          className={topLevel ? s.topLevelChildren : ""}
        >
          <div 
            ref={refChildren} 
            className={`${s.children} ${topLevel ? s.topLevelChildrenInner : ""}`} 
          >
            {children}
          </div>
        </animated.div>
        : null}
      </div>
    )
  })

  const MenuIcon = isMenuOpen ? Close : Burger

  return (
    <>
    <div 
      ref={overlay}
      onClick={()=>mobileMenu(router.pathname)}
      className={`${s.invisible} ${s.overlay}`}
    />
    <nav 
      className={`${stickyOffset ? s.navContainerOffset : ""} ${s.navContainer}`}
      ref={nav}
    >
      <div 
        className={s.navInnerContainer}
      >
        <Logo 
          scroll={router.pathname !== "/"}
          onClick={()=>{
            if(router.pathname === "/") {
              window.scrollTo({
                  top:0,
                  left:1, 
                  behavior:"smooth",
              })
            }

            isMenuOpen ? mobileMenu("/") : null
          }}
        />
        <animated.div style={styles} className={s.container}>
          <div className={s.innerContainer}>
            <Tree name="Om" href="/#om" topLevel/>
            <Tree name="Årets Resa" href="/#arets-resa" topLevel/>
            <Tree name="Frågor?" href="/#fragor" topLevel/>
            <Tree name="Mer" href="/#mer" topLevel/>
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


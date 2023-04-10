import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Socialmedia from "./Socialmedia";
import s from "./Navbar.module.css";


function randomSong() {
  const songs = ["song1.mp3", "song2.mp3", "song3.mp3"]
  return songs[Math.floor(Math.random()*songs.length)]
}

export default function Navbar({ title }) {

  const [song, setSong] = useState("")
  const [play, setPlay] = useState(false)
  const audio = useRef(null)

  //useEffect(() => setSong(randomSong()), [])

  return (
    <nav className={s.container}>
      <div className={s.logoContainer}>
        <Link href="/" className={s.logoContainer}>
          <Image 
            src="/WW.svg"
            alt="Logo"
            width="70"
            height="40"
            className={s.img}
          />
        </Link>
        <button onClick={()=>{
          const isPlaying = audio.current.currentTime > 0 && !audio.current.paused && !audio.current.ended 
                            && audio.current.readyState > 2; // Make sure that you can pause the audio
          if (!isPlaying) {
            setSong(randomSong())
            audio.current.load()
            audio.current.play()
          } else {
            audio.current.pause()
          }

          setPlay(!isPlaying)
        }}>
          <Image
            src={`/icons/${play ? "sound" : "mute"}.svg`}
            width="50"
            height="50"
            alt="play or pause"
          />
          <audio ref={audio} autoPlay loop>
            {song ?<source src={`../songs/${song}`} type="audio/mpeg"/> : null}
          </audio>
        </button>
     
      </div>
      <Socialmedia width="50" height="50"/>
    </nav>
  );
}
import React, { useRef, useState } from 'react'
import Image from 'next/image'

function randomSong() {
  const songs = ["song1.mp3", "song2.mp3", "song3.mp3"]
  return songs[Math.floor(Math.random()*songs.length)]
}

export default function SongPlayer() {

  const [song, setSong] = useState("")
  const [play, setPlay] = useState(false)
  const audio = useRef(null)

  return (
    <button 
      onClick={()=>{
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
      }}
      style={{display:"flex"}}
    >
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
  )

}

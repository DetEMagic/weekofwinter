import Lottie from "../components/Lottie"
import Link from "next/link"

export default function Custom500() {
  return (
    <div style={{textAlign:"center", height:"50vh"}}>
      <h1>Hoppsan! Sidan kunde inte hittas...</h1>
      <Lottie style={{marginTop:"40px"}} url="/lottie/404.json"/>
      <Link href="/">
          <h2>Till Week of Winter</h2>
      </Link>
    </div>
  )
}
import Lottie from "../components/Lottie"
import Link from "next/link"
import Layout from "../components/Layout"

/**
 * This page is used to to display when a page is not found. 
 */
export default function Custom500() {
  const meta = {
    title:"404",
    description:"Tyvärr finns denna sida inte längre kvar :( . Gå tillbaka till startsidan!",
    keywords:"404",
  }

  return (
    <Layout meta={meta}>
      <div className="errorPageContainer">
        <h1>Hoppsan! Sidan kunde inte hittas...</h1>
        <Lottie className="errorPageImg" url="/lottie/404.json"/>
        <Link href="/">
            <h3>Till Week of Winter</h3>
        </Link>
      </div>
    </Layout>
  )
}
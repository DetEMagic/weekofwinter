import Lottie from "../components/Lottie"
import Layout from "../components/Layout"

/**
 * This page is used when a server error happens.
 */
export default function Custom500() {
  const meta = {
    title:"500. Server fel",
    description:"Server fel. Vänligen försök igen senare",
    keywords:"500, Server fel.",
  }

  return (
    <Layout meta={meta}>
      <div style={{marginTop: "6rem", textAlign:"center"}}>
        <h1>500 - Server fel.</h1>
        <h3>Vänligen försök igen senare.</h3>
        <Lottie style={{maxWidth:"36rem", marginTop:"-2rem"}} url="/lottie/500.json"/>
      </div>
    </Layout>
  )
}
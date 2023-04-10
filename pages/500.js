import Lottie from "../components/Lottie"

export default function Custom404() {
  return (
    <div style={{textAlign:"center", height:"50vh"}}>
      <h1>500 - Server fel.</h1>
      <h3>Vänligen försök igen senare.</h3>
      <Lottie url="/lottie/500.json"/>
    </div>
  )
}
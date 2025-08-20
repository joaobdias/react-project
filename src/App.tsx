import { Header } from "./components/Header"
import styles from "./app.module.css"

function App() {
  
  function handleRestartGame (){
    alert("Reiniciando")
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={53} max={10} onRestart={handleRestartGame}/>
      </main>
    </div>
  )
}

export default App

import { Header } from "./components/Header"
import { use, useEffect, useState } from "react"
import { WORDS, type Challenge } from "./utils/words"
import { Tip } from "./components/Tip"
import styles from "./app.module.css"
import { Letter } from "./components/Letter"
import { Input } from "./components/Input"
import { Button } from "./components/Button"
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed"

const ATTEMPT_LIMIT = 5

function App() {

  const [score, setScore] = useState(0)
  const [letter,SetLetter] = useState("")
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)

  function handleRestartGame (){
    const isConfirmed = window.confirm("Você tem certeza que deseja reiniciar?")

    if (isConfirmed) startGame()
  }

  function startGame (){
    const index = Math.floor(Math.random() * WORDS.length)
    const random = WORDS[index]
    setChallenge(random)

    setScore(0)
    SetLetter("")
    setLettersUsed([])
  }

  function handleConfirm () {
    if (!challenge) return

    if(!letter.trim()) return alert("Digite uma letra!")

    const value = letter.toUpperCase()
    const exists = lettersUsed.find((used) => used.value.toUpperCase() === value)

    if (exists) {
      SetLetter("")
      return alert("Você já digitou essa letra!")
    }
    
    const hits = challenge.word.toUpperCase().split("").filter((char) => char === value).length
    const correct = hits > 0

    const currentScore = score + hits

    setLettersUsed((prevState) => [...prevState, {value, correct}])
    setScore(currentScore)
    SetLetter("")
  }

  function endGame (message: string) {
    alert(message)
    startGame()
  }

  useEffect (() => {
    startGame()
  }, [])

  useEffect (() => {
    if(!challenge){
      return
    }
  
    setTimeout(() => {
      if(score === challenge.word.length) return endGame("Parabéns, você conseguiu!")
      if(lettersUsed.length === challenge.word.length + ATTEMPT_LIMIT) return endGame("Infelizmente você perdeu...")
    }, 200)
  }, [score, lettersUsed.length])

  if (!challenge){
    return
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={lettersUsed.length} max={challenge.word.length + ATTEMPT_LIMIT} onRestart={handleRestartGame}/>
        
        <Tip tip={challenge.tip}/>
        
        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => { 
              const letterUsed = lettersUsed.find(
                (used) => used.value.toUpperCase() === letter.toUpperCase())
              
              return <Letter key={index} value={letterUsed?.value} color={letterUsed?.correct ? "correct" : "default"}/>
          })}
          
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder="?" value={letter} onChange={(e) => SetLetter(e.target.value)}/>

          <Button title="Confirmar" onClick={handleConfirm}/>
        </div>

        <LettersUsed data={lettersUsed}/>

      </main>
    </div>
  )
}

export default App

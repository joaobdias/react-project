import styles from "./styles.module.css"
import { Letter } from "../Letter"

export function LettersUsed () {
    return (
        <div className={styles.lettersUsed}>
            <h5>Letras Utilizadas</h5>

            <div>
                <Letter value="E" size="small" color="correct"/>
                <Letter value="A" size="small" color="incorrect"/>
            </div>
        </div>
    )
}
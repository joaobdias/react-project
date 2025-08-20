import styles from "./styles.module.css"

type Prop = React.ComponentProps<"input"> 

export function Input ({...rest}: Prop){
    return (
        <input type="text" className={styles.input} {...rest}/>
    )
}
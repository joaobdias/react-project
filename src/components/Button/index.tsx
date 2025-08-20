import styles from "./styles.module.css"

type Pro = React.ComponentProps<"button"> & {
    title: string
}

export function Button ({ title, ...rest }: Pro) {
    return (
        <button type="button" className={styles.button} {...rest}>{title}</button>
    ) 
}
import styles from './landingCard.module.css'

export default function LandingCard(){
    return(
        <div className={styles.caja_cards}>
            <div className={styles.card}>
                <h1>¿De que trata la pagina? 🧐</h1>
                <p>En esta página, podrás encontrar una amplia variedad de opciones
                         de comida a través de nuestras cards de comida interactivas. 
                         Con nuestra función de filtrado, podrás elegir entre diferentes
                          tipos de dietas, como vegetariana, vegana, baja en carbohidratos
                           y más. ¡La elección es tuya!</p>
            </div>
            <div className={styles.card}>
                <h1>¿Interesado en descubrir nuevas recetas? 🤔</h1>
                <p>Si estás interesado en descubrir nuevas recetas y conocer más sobre la
                    nutrición de los alimentos, ¡estás en el lugar correcto! Nuestra página 
                    web utiliza la spoonacular API para brindarte información detallada y atractiva
                    sobre una amplia variedad de recetas de comida.
                </p>
            </div>

            </div>
    )
}
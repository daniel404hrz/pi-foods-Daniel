import styles from "./landingCard.module.css";

export default function LandingCard() {
  return (
    <div className={styles.caja_cards}>
      <div className={styles.card}>
        <h1>¿De que trata la pagina? 🧐</h1>
        <p>
          Descubre nuestra página con una amplia variedad de opciones de comida
          para que naveges a través de ellas y elijas la opción que más te
          apetezca. Ofrecemos una función de filtrado que te permitirá
          seleccionar entre diferentes tipos de dietas..
        </p>
      </div>
      <div className={styles.card}>
        <h1>¿Interesado en descubrir nuevas recetas? 🤔</h1>
        <p>
          Nuestra página web utiliza la spoonacular API para ofrecerte una
          amplia variedad de recetas de comida. Si te gusta descubrir nuevas
          recetas y aprender sobre la nutrición de los alimentos, has llegado al
          lugar adecuado.
        </p>
      </div>
    </div>
  );
}

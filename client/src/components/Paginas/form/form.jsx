import {useState } from 'react'
import styles from './form.module.css'

import {verify } from './verify'
import { onSubmit } from '../../../redux/actions'
import { colorFunction } from './funciones'

export function Form({diets}){
    
    const [color, setColor] = useState({
      title: '',
      summary:'',
      healthScore:'',
    })
    
    
    const [form, setform]= useState({
        title: '',
        summary:'',
        healthScore:'',
        steps:[],
        image:'',
        dietTypes:[],
})
const [errors, setErrors] = useState({
    title: '',
    summary: '',
    healthScore: '',
    steps: '',
    image: '',
    dietTypes:'',
  });
  
  const handleDietChange = (event) => {
    const { value, checked } = event.target;

    let newSelectedDiets;
    if (checked) {
      newSelectedDiets = [...form.dietTypes, value];
    } else {
      newSelectedDiets = form.dietTypes.filter((name) => name !== value);
    }

    setform({ ...form, dietTypes: newSelectedDiets });
    
    setErrors(verify({ ...form, dietTypes: newSelectedDiets }, "dietTypes", errors));
  };
    const onChange=(event)=>{
        const property = event.target.name;
        const value= event.target.value;
        const newSelectedDiets = {...form, [property]:value}

        setform(newSelectedDiets)
        setErrors(verify(newSelectedDiets, property,errors) )
        setColor(colorFunction(property, errors, color))
    }
    
    
    const handleSubmit=async(event)=>{

      event.preventDefault();

        const verificar = Object.values(errors).every(value=> {
            return value.length === 0;
          });
          const vacio = form.title && form.summary && form.dietTypes.length && form.healthScore;
          
        if(verificar && vacio){
          try {
            await onSubmit(form)
            alert(`receta creada exitosamente`)
            // window.location.reload();
            event.target.reset()
            
          } catch (error) {
            alert(`error al crear la receta: ${error.message}`)
          }
            
            
        }
        
        else {
          if(!vacio)alert('por favor rellena los campos obligatorios')
          else alert('por favor corrige los campos')}

    }
    
    return (
        <div className={styles.box}>
            
            <form action="" className={styles.box_form} onSubmit={handleSubmit}>
                
                <div className={styles.box_inputs}>
                <h2>Crear Receta</h2>
                <b>Obligatorios = name*</b>
                <br />
                    <label htmlFor="title">Nombre:* </label>
                <input type="text" id="title" name='title' onChange={onChange} className={color.title} />
                {errors.title && <p className={styles.error_text}>{errors.title}</p>}
                <label htmlFor="summary">Resumen:* </label>
                <textarea type="textarea" id='summary' name='summary' onChange={onChange} className={color.summary}/>
                {errors.summary && <p className={styles.error_text}>{errors.summary}</p>}
                <label htmlFor="healthScore">Health Score:* </label>
                <input type="number" min="0" id="healthScore" name='healthScore' onChange={onChange} className={color.healthScore}/>
                {errors.healthScore &&<p className={styles.error_text}>{errors.healthScore}</p>}
                <label htmlFor="steps">Pasos: </label>
                <textarea type="text" id="steps" name='steps' onChange={onChange}/>
                <span>Este campo no es obligatorio.</span>
                <p> Debes separar los pasos con ' , '.</p>
                
                </div>
                
                <div className={styles.box_inputs_form}>
                <label htmlFor="image">Imagen: </label>
                <input type="file"  accept="image/*" id="image" name='image' onChange={onChange}/>
                
                <label htmlFor="">Dietas:* </label>
                {errors.dietTypes && <p className={styles.error_text}>{errors.dietTypes}</p>}
                {diets.length ? 
  <div className={styles.box_check}>
    {diets.map(diet => 
      <div key={diet.name}>
        <label htmlFor={diet.name}>{diet.name}</label>
        <input type="checkbox" id={diet.name}  value={diet.name} onChange={handleDietChange} />
        
      </div>
      
    )}
  </div> 
: <p>Loading...</p>}
                
                <button>Submit</button>
                </div>
                

            </form>
            
        </div>
    )
}
// **📍 FORM PAGE |**: en esta vista se encontrará el formulario para crear una nueva receta.


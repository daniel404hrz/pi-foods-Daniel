
import styles from './form.module.css'


export function colorFunction (event, errors){
    const colorBorde= {title: '',summary:'', healthScore:'',}

if(!errors[event])colorBorde[event]=styles.success
else colorBorde[event]= styles.error

return colorBorde
 
}

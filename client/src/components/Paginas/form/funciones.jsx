
import styles from './form.module.css'


export function colorFunction (event, errors, color){

if(!errors[event])color[event]=styles.success
else color[event]= styles.error

return color
 
}

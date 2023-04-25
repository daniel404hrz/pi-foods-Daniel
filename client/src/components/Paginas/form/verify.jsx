

const validaciones =(form,value,errors)=>{
    
    switch(value) {
        case 'title':
          if(!form[value].length)errors[value]='Este campo es obligatorio'
          else{
            if(/\d/.test(form[value]))errors[value]='no debe contener numeros'
            else{
              if(form[value].length < 4)errors[value]='debe ser mayor a 4 caracteres'
              else if(form[value].length > 20)errors[value]='debe ser menor de 20 caracteres'
              else errors[value] =''
            } 
          }

          break;
        case 'summary':
          if(!form[value].length)errors[value]='Este campo es obligatorio'
            else{
              
              if(form[value].length > 200)errors[value]='debe ser menor de 200 caracteres'
              else if(form[value].length < 10)errors[value]='debe ser mayor a 10 caracteres'
              else errors[value]= ''
            }
          break;
        case 'healthScore':
          if(!form[value].length)errors[value]='Este capo es obligatiorio'
          else{
            if(form[value] < 1 || form[value] > 100)errors[value]='elige un numero entre 1 y 100'
            
            else errors[value]=''
          }
          
          break;
        
          
        case 'dietTypes':
            
            if(form[value].length < 1){ 
                
                errors[value]='debe seleccionar almenos 1 dieta'
            }
            else errors[value]=''
          
          break;
        default:
          
      }
      
      return errors

}
export function verify(form, value,errors) {
    
  
    
  
    return validaciones(form,value,errors) ;
  }

    


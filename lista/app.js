const formulario=document.getElementById('formulario')
const lista_tarea=document.getElementById('lista-tareas')
const template = document.getElementById('Plantilla').content
const fragmentado=document.createDocumentFragment()
let fecha= document.getElementById('fecha')
let tareas={
      /* 1630472691770:{id: 1630472691770, nombre: "Tarea test", Fecha:"29/02/2025", estado: false},
      1000000000:{id: 1000000000, nombre: "Tarea test-2", Fecha:"29/02/2025", estado: false}  */
}
document.addEventListener('DOMContentLoaded',()=>{
      if(localStorage.getItem('tareas')){
            tareas=JSON.parse(localStorage.getItem('tareas'));
      }
      pintarTarea()
})
formulario.addEventListener('submit',e=>{
      e.preventDefault()      
      setTarea(e)      
})
lista_tarea.addEventListener('click',(e)=>{
      botones(e)
})
const setTarea=e=>{      
      if(e.target[0].value.trim()==''||e.target[1].value.trim()==''){
            console.log('pero escribe una tarea o algo o una fecha')            
            return
      }
      const tarea={
            id:Date.now(),
            nombre:e.target[0].value,
            fecha:e.target[1].value,
            estado:false
      }            
            tareas[tarea.id]=tarea                                   
            formulario.reset()           
            e.target[0].focus()      
      pintarTarea()
}
const pintarTarea=()=>{  
      localStorage.setItem('tareas',JSON.stringify(tareas))    
      if(Object.values(tareas).length===0){ 
            lista_tarea.innerHTML=`
            <div class="alert alert-danger text-center"><h4>No hay tareas Pendientes</h4></div>
            `
            return
      }

      lista_tarea.innerHTML=''
      Object.values(tareas).forEach(element => {              
            const clon=template.cloneNode(true)
            clon.querySelector('h3').textContent=element.nombre           
            clon.querySelector('#tipo-date').textContent=element.fecha
            if (element.estado) {
                  clon.querySelector('.alert').classList.replace("alert-info","alert-primary")
                  clon.querySelectorAll('.fas')[0].classList.replace("fa-check-circle","fa-undo-alt")
                  clon.querySelectorAll('.fas')[0].classList.replace("text-success","text-primary")
                  clon.querySelector('h3').style.textDecoration ='line-through';
                  clon.querySelector('#tipo-date').style.textDecoration ='line-through';
            }            
            clon.querySelectorAll('.fas')[0].dataset.id=element.id
            clon.querySelectorAll('.fas')[1].dataset.id=element.id
            fragmentado.appendChild(clon)
      });
      lista_tarea.appendChild(fragmentado)
}
const botones=e=>{
      /* EL CHECK */
      if (e.target.classList.contains('fa-check-circle')) {                                  
/*             arreglo=Object.values(tareas)            
            id_objeto=e.target.dataset.id            
            for (let i = 0; i < arreglo.length; i++) {                 
                  objeto=arreglo[i]                  
                  if(objeto.id == id_objeto){                        
                        objeto.estado=true                                               
                        break;
                  }
            }
            console.log(objeto) */
            tareas[e.target.dataset.id].estado = true            
            pintarTarea()
      }
      /* ELIMINAR */
      if(e.target.classList.contains('fa-minus-circle')){                        
            delete tareas[e.target.dataset.id]               
            pintarTarea()            
      }
       /* REFRESH */
      if(e.target.classList.contains('fa-undo-alt')){                                    
            tareas[e.target.dataset.id].estado = false            
            pintarTarea()            
      }
      e.stopPropagation()
}
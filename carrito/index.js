let template_card=document.getElementById('template-cards').content
const template_footer=document.getElementById('template-footer').content
const template_carrito=document.getElementById('template-carrito').content

let cards=document.getElementById('cards')
let items=document.getElementById('items')
let footer=document.getElementById('footer')

const fragmnto=document.createDocumentFragment()
let carrito={}

document.addEventListener('DOMContentLoaded',()=>{
      datosFetch()
      if (localStorage.getItem('carrito')) {
            carrito=JSON.parse(localStorage.getItem('carrito'))
            pintarCarrito()
      }
})
cards.addEventListener('click',e=>{
      aniadir(e)
})
items.addEventListener('click',e=>{
      btnAccion(e)
})



const datosFetch= async () => {
      try {
            const res = await fetch('https://moises-emiliano-hernandez-contreras.github.io/Jason/api.json')
            const data = await res.json()
            pintar_tarjeta(data)                
      } catch (error) {
            console.error(error)
      }      
}

const pintar_tarjeta=data=>{
      data.forEach(producto=>{
            template_card.querySelector('h5').textContent = producto.title
            template_card.querySelector('p').textContent = '$'+producto.precio
            template_card.querySelector('img').setAttribute('src', producto.thumbnailUrl)            
            template_card.querySelector('.btn-dark').dataset.id=producto.id
            const clon=template_card.cloneNode(true)
            fragmnto.appendChild(clon)
      })
      cards.appendChild(fragmnto)
}

const aniadir=(e)=>{      
      if(e.target.classList.contains('btn-dark')){                        
            setCarrito(e.target.parentElement)
      }
      e.stopPropagation()
}
const setCarrito=(objeto)=>{
      const producto={            
            title:objeto.querySelector('h5').textContent,
            precio:objeto.querySelector('p').textContent,
            id:objeto.querySelector('button').dataset.id,
            cantidad:1

      }
      if(carrito.hasOwnProperty(producto.id)){
            producto.cantidad=carrito[producto.id].cantidad+1
      }
      carrito[producto.id]= {...producto}      
      pintarCarrito()
}
const pintarCarrito=()=>{
      items.innerHTML=''
      Object.values(carrito).forEach(producto=>{
            template_carrito.querySelector('th').textContent= producto.id
            template_carrito.querySelectorAll('td')[0].textContent = producto.title
            template_carrito.querySelectorAll('td')[1].textContent=producto.cantidad
            template_carrito.querySelector('.btn-primary').dataset.id = producto.id
            template_carrito.querySelector('.btn-danger').dataset.id=producto.id                        
            template_carrito.querySelector('span').textContent = producto.precio.slice(1,) * producto.cantidad
            const clon=template_carrito.cloneNode(true)
            fragmnto.appendChild(clon)            
      })
      items.appendChild(fragmnto)      
      pintarFooter()

      localStorage.setItem('carrito',JSON.stringify(carrito))
}
const pintarFooter=()=>{
      footer.innerHTML=''
      if(Object.keys(carrito).length===0){
            footer.innerHTML=`
                  <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
            `
            return
      }
      const nCantidad=Object.values(carrito).reduce((acc,{cantidad})=>acc+cantidad,0)
      const nPrecio=Object.values(carrito).reduce((acc,{cantidad,precio})=>acc+cantidad*precio.slice(1,),0)      
      template_footer.querySelectorAll('td')[0].textContent=nCantidad
      template_footer.querySelector('span').textContent=nPrecio
      const clone= template_footer.cloneNode(true)
      fragmnto.appendChild(clone)
      footer.appendChild(fragmnto) 
      
      
      const vaciar=document.getElementById('vaciar')           
      vaciar.addEventListener('click',()=>{
            carrito={}
            pintarCarrito()
      })
}
const btnAccion=e=>{
      if(e.target.classList.contains('btn-primary')){
            const producc=carrito[e.target.dataset.id]            
            producc.cantidad=carrito[e.target.dataset.id].cantidad+1
            carrito[e.target.dataset.id]={...producc}
            pintarCarrito()
      }
      if(e.target.classList.contains('btn-danger')){
            const producc=carrito[e.target.dataset.id]            
            producc.cantidad=carrito[e.target.dataset.id].cantidad-1
            if (producc.cantidad===0) {
                  delete carrito[e.target.dataset.id]
            }
            //carrito[e.target.dataset.id]={...producc}
            pintarCarrito()
      }
      e.stopPropagation()
}
var min = 25;
var seg= "00";
var i=0;
var click = new Audio("click.mp3");
var campana = new Audio("bell.mp3");
function template(){
      document.getElementById("minutos").innerHTML=min;
      document.getElementById("segundos").innerHTML=seg;
}
function start(){      
      click.play();
      i=i+1;
      console.log(i);      
      //24:59
      min=0;            
      seg=3;
      if(i==4){
            //20 min
            console.log("hola");
            i=0;
            min=0;
            seg=10;            
      }            
      document.getElementById("minutos").innerHTML=min;
      document.getElementById("segundos").innerHTML=seg;
      var intervalo_min = setInterval(minutosTimer,60000);
      var intervalo_seg = setInterval(segundosTimer,1000);
      function minutosTimer(){
            min= min-1;
            document.getElementById("minutos").innerHTML=min;
      }
      function segundosTimer(){
            seg= seg-1;
            document.getElementById("segundos").innerHTML=seg;            
            if(seg<=0){
                  if(min<=0){                                                                  
                        clearInterval(intervalo_min);
                        clearInterval(intervalo_seg);
                        document.getElementById("done").innerHTML="!!Sesión completa!!Toma un descanso"
                        if(i==4){
                              document.getElementById("done").innerHTML="!!Sesión completa!!Toma un descanso"
                        }
                        document.getElementById("done").classList.add("message");                        
                        campana.play();
                  }
                  seg=60;
            }            
      }
}
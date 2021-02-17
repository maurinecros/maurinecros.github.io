/* variables de efecto */



let area = document.querySelector('.container');
let obj = document.querySelector('.objEffect');

let referenciaX = area.offsetWidth/2; // centrox
let referenciaY = area.offsetHeight/2; // centroy
let proporcionMovimiento= 0.10 // 5% del area
let direccion = -1 
/* direccion del movimineto:  
 -1: contraria al puntero  
  1: hacia el puntero
*/

/* core */
//coordenada del movimiento
let mx=0, my=0; 

//cordenadas del mouse en relaciona al cuadro (caja)
let x=0, y=0; 

//guarda el estado de la animacion
let moving = false; 
    
area.addEventListener('pointermove',function(e){
  e.stopPropagation();
  updateAxis(e.pageX, e.pageY);
  if (!moving){
    moving=true;
    requestAnimationFrame(moveObj);
  }
});

//actualiza la cordenada del proximo movimiento
function updateAxis(pointX, pointY){
  x= Math.round((pointX - referenciaX ) * proporcionMovimiento ) * direccion;
  y= Math.round((pointY - referenciaY ) * proporcionMovimiento) * direccion;
}

function moveObj(){

  //rango de pixeles para ejecutar el movimineto
  if(mx<x-1 || mx>x+1 || my<y-1 || my>y+1){
    mx=x;
    my=y;
    obj.style.transform= `translate(${mx}px, ${my}px)`;
  }
        
  //se reduce la frecuencia de actualizacion del movimiento
  //PD: esto no suavisa el movimiento, ver transition en css
  setTimeout(function(){
    moving=false;
  },60);
}

/** author: Javier Romero **/
/** PD2: ya existen frameworks que realizan este efecto, probe algunos, y vi que consumen muchos recursos, el evento pointermove realiza muchas actualizaciones por segundo, esto sobrecarga en gran media el cpu si no se cuida bien la cantidad de instrucciones que se realizan, basta con mover el mouse de lado a lado en un elemento que escucha este evento e imprimir algo en cosola para apreciar como el trabajo del cpu aumenta.

Debido a esto quize hacer un codigo lo mas sencillo posible que no sobrecargara tanto el cpu, el resultado es esta combinación, requiestAnimationFrame, Timeout, y css Transition para suavisar el movimiento. 
;) saludos **/
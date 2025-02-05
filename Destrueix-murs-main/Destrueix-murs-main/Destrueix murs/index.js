 const canvas = document.getElementById("canvas")
 const ctx  = canvas.getContext("2d") 
 
 canvas.height = 512;
 canvas.width = 448; 

let vida = 3 
let color = ["#ff5733","#ff8a33","#f0ff33","#33beff","#1d6d92","#0336f2","#1e2b5b","#5407ef","#39275b","#66448c","#f105cd","#872a79","#eab1d3","#6d1549"]
// variables Pilota 
 let radiPilota = 7;
 let x = canvas.width / 2
 let y = canvas.height - 30


 // variables de pala 
 let amplePala = 50;
 let alturaPala = 10; 
 
 let sensibilititat  = 8; 
 let dreta = false; 
 let esquerra = false; 
let palaX = (canvas.width - amplePala) / 2 
let palaY = canvas.height - alturaPala  - 10 

// VARIABLES DES MEXICANS 
const filas = 6
const columnes = 12
const ampleMur = 30;
const alturaMur = 14;
const margeTMur = 80;
const margeEMur = 30;
const sepMurs = 2;

const murs = []
const ESTAT_MUR = {
   DESTRUIT: 0,
   SHOW: 1,
}

for(let c=0; c<columnes; c++){
   murs[c] = [];
   for(let f=0; f<filas; f++){
      const color = color[Math.floor(Math.random()*14)]
      const murX = margeEMur+c*(ampleMur+sepMurs)
      const murY = margeTMur+f*(alturaMur+sepMurs)
      murs[c][f] = {
         x: murX,
         y: murY,
         status: ESTAT_MUR.SHOW,
         color: color
      }
   }
}


 function pintarPilota(){
    ctx.beginPath();
    ctx.arc(x,y,radiPilota, 0, Math.PI*2);
    ctx.fillStyle = "#8c2978"
    ctx.fill();
    ctx.closePath();
 }

 function pintarPala(){
   ctx.fillStyle = "#8c2978"
   ctx.fillRect(palaX,palaY,amplePala,alturaPala)
 }

 function pintarMurs(){
   for(let c=0; c<columnes; c++){
      for(let f=0; f<filas; f++){
         const murActual = murs[c][f];
         if(murActual.status == ESTAT_MUR.DESTRUIT){
            continue;
         }
         ctx,fillStyle = murActual.color;
         ctx.rect(murActual.x,murActual.y,ampleMur,alturaMur)
         ctx.fill();
       }
   }
}
 function deteccioColisio(){

 }


 function movimentPala(){
   if(dreta && palaX < canvas.width - amplePala){
   palaX += sensibilititat
   }else if(esquerra && palaX > 0 ){
      palaX -= sensibilititat
   }
 }


//Moviment Pilota 
 let dx = 3
 let dy = -3

 function movimentPilota(){
   //REBOT EIX X 
   if(x + dx  >= canvas.width || x + dx <=0 + radiPilota){
      dx= -dx
   }

   const mateixaX = x > palaX && x < palaX + amplePala;
   const mateixaY = y + dy > palaY

   //REBOT EIX Y
   if(y + dy <= 0){
      dy=-dy
   }
    // GAME OVER
    if(mateixaX && mateixaY){
      dy = -dy
    }
    else if(y + dy > canvas.height){
         vida--
         dx = 2;
         dy = -2;
         x = canvas.width /2
         y = canvas.height - 30
         if(vida==0){
     console.log("GAME OVER")
     document.location.reload();
         }
    }
   x += dx
   y += dy 
   }
   
 
 function borrarPantalla(){
   canvas.height = 512;
   canvas.width = 448;
 }

 function inicialitzadorEvents(){
   document.addEventListener ('keydown', pulsar)
   document.addEventListener ('keyup', soltar)

   function pulsar(event){
   if(event.key == 'ArrowRight'){
      dreta=true;
   }
   if(event.key == 'ArrowLeft'){
      esquerra=true;
   }
   if(event.key == '+'){
      amplePala = amplePala *2
   }
   if(event.key == '-'){
      amplePala = amplePala / 2
   }
   if(event.key == 'ArrowUp'){
      radiPilota = radiPilota *2
   }
   if(event.key == 'ArrowDown'){
      radiPilota = radiPilota /2
   }
   if(event.key == 'a'){
      sensibilititat = 2*sensibilititat
   }
   if(event.key == 'd'){
      sensibilitat = sensibilitat /2
   }
   if(event.key == 'y'){
      dx = 2*dx 
      dy = 2*dy
   }
   if(event.key == 'f'){
      dy = dy /2
      dx = dx /2
   }
   if(event.key == 'x'){
       let dxNova = dx;
       let dyNova = dy;

      dx = 0;
      dy = 0;

      setTimeout(()=>{
         dx = dxNova;
         dy = dyNova;
      },3000)

   }

}
   
   function soltar(event){
      if(event.key == 'ArrowRight' || event.key == 'd'){
         dreta=false;
      }
      if(event.key == 'ArrowLeft' || event.key == 'a'){
         esquerra=false;
      }
   }

 }



 function pintarCanvas(){
    console.log("Hola"); 
    borrarPantalla ();
    pintarPilota();
    pintarPala(); 
    pintarMurs();
    deteccioColisio();
    movimentPilota();
    movimentPala();
    ctx.fillText("vida = " + vida,10,80);
    window.requestAnimationFrame(pintarCanvas);


 }

 pintarCanvas();
 inicialitzadorEvents()
 const canvas = document.getElementById("canvas")
 const ctx  = canvas.getContext("2d") 
 
 canvas.height = 512;
 canvas.width = 448; 


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

   //REBOT EIX Y
   if(y + dy <= 0){
      dy=-dy
   }
    // GAME OVER
    if(y + dy > canvas.height){
      console.log("GAME OVER")
      document.location.reload();
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
    window.requestAnimationFrame(pintarCanvas);
 }

 pintarCanvas();
 inicialitzadorEvents()
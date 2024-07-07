


 


window.onload = function() {


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      
      sleep(1000).then(() => { alert('Prueba funcional de Ganancias. Sin manejo de errores'); });
      
let pepe = 17.4

      for(var i = 0; i < 16; i++)
        {
            document.getElementById('tabla').insertRow(-1).innerHTML = '<td contenteditable></td><td contenteditable>$0</td><td contenteditable>$0</td><td contenteditable>0</td><td style="background-color: #9c9c9c";></td>';
        }
 
  
}
 
function process()
{
    let contenido = []; 
   

  //-----ESTA PARTE GUARDA TODO EL CONTENIDO DE LA TABLA EN CONTENIDO-----------------

  var cantFilas = document.getElementById('tabla').rows.length;
  
  var wallRow, wallCol, currentCeld;

  for(wallRow = 1; wallRow < cantFilas; wallRow++)
    {
     for(wallCol = 0; wallCol <= 4; wallCol++)
        {
          currentCeld = document.getElementById('tabla').rows[wallRow].cells[wallCol];
          
          if((wallCol == 0) && (currentCeld.innerHTML.length == 0))  //Checking if celd if empty
             {   
              wallCol = 0;  
              break;
             }
          else 
             {
              contenido.push(currentCeld.innerHTML);  
             }   

        }//second for
      
      if((currentCeld.innerHTML.length != 0) && (wallCol != 0))
         {
         contenido.push("\n");  //Adding new line
         }

      wallCol = 0;
    }//main for
   
  //PREPARING contenidoFinal------------------------------------------
  
  
  var papel = document.createElement("textarea");

  //document.body.appendChild(papel);  //No es necesario que aparezca  en la pagina
  //papel.style.width = "300px";
  //papel.style.height = "100px";
  //papel.style.display = "none";
  
  var nodos = contenido.length;
  var running;
  

  for(running = 0; running < nodos; running++)   //Muy fuerte Dopin!!!!
    {
       
      papel.value += contenido[running];
         
      if((contenido[running] == '\n') || (contenido[running + 1] == '\n')) 
         continue; 
         
         papel.value += ';';
    }

   

  //END PREPARING contenidoFinal------------------------------------------
  

  //-----END ESTA PARTE GUARDA TODO EL CONTENIDO DE LA TABLA EN CONTENIDO-----------------

   //-----------------PARTE QUE EXPORTA------------------------ 
  //Esta funcion es tremendo mecanismo de mierda, no se por que lo hicieron así
    
    
    var enlace = document.createElement("a");
    
    enlace.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(papel.value));
    enlace.setAttribute("download", "data.dav");
    enlace.style.display = "none";
    
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    
//----------------------END PARTE QUE EXPORTA-------------------------------------


 alert('Se ha Guardado el contenido de la tabla como "data.dav"');


}



//--------------------------------------------------------------------------------
function cambiotabla(event) 
{
    let Filas = document.getElementById("tabla").rows.length;

    let pventa;
    let pcosto;
    let cantidad;
    let ganancia;

    for(var i = 1; i < Filas; i++)
        {

    pventa = document.getElementById("tabla").rows[i].cells[2].innerHTML;
    pcosto = document.getElementById("tabla").rows[i].cells[1].innerHTML;
    cantidad = document.getElementById("tabla").rows[i].cells[3].innerHTML;

    
   
     pventa = pventa.slice(1, undefined); 
     pventa = parseFloat(pventa);

     pcosto = pcosto.slice(1, undefined); 
     pcosto = parseFloat(pcosto);
  
  
    cantidad = parseFloat(cantidad);

    ganancia = ((pventa - pcosto) * cantidad);
    ganancia = ganancia.toFixed(2);

   
    document.getElementById("tabla").rows[i].cells[4].innerHTML = ganancia

        }

        document.getElementById('caja').style.visibility = "hidden";

        document.getElementById('tabla').style.filter = "blur(0px)";
        document.getElementById('foto').style.filter = "blur(0px)";
    
        document.getElementById('presentacion').style.filter = "blur(0px)";
    
        document.getElementById('buscar').style.filter = "blur(0px)";   

}
//-----------------------------------------------------------------------------

function clickfoto(event) 
{


document.getElementById('caja').style.visibility = "visible";

document.getElementById('tabla').style.filter = "blur(3px)";
document.getElementById('foto').style.filter = "blur(3px)";

document.getElementById('presentacion').style.filter = "blur(3px)";

document.getElementById('buscar').style.filter = "blur(3px)";

//-------------------Testing many things---------------------


}

function botonentrar(event) {           //Vamos a procesar la entrada de usuario


    //Detectando ultima celda vacia
    let vuelta;
    let celdita;
    
    

    for(vuelta = 3; vuelta < 16; vuelta++)
       {
        celdita = document.getElementById("tabla").rows[vuelta].cells[0].innerHTML;

        if(celdita == "")
          break;  
       } 

    document.getElementById("tabla").rows[vuelta].cells[0].innerHTML = "cagaleras";

   //Ya tenemos la celda correspondiente.
   document.getElementById("tabla").rows[vuelta].cells[0].innerHTML = document.getElementById('producto').value;
   document.getElementById("tabla").rows[vuelta].cells[1].innerHTML = document.getElementById('pcosto').value;
   document.getElementById("tabla").rows[vuelta].cells[2].innerHTML = document.getElementById('pventa').value;
   document.getElementById("tabla").rows[vuelta].cells[3].innerHTML = document.getElementById('cantidad').value;

   cambiotabla();     


   if(document.getElementById('colfija').checked)  //Apartado activar columna fija.....
      {
       document.getElementById('tabla').style.tableLayout = "fixed";
      }
    else  

    document.getElementById('tabla').style.tableLayout = "auto";

    document.getElementById('caja').style.visibility = "hidden";

    document.getElementById('tabla').style.filter = "blur(0px)";
    document.getElementById('foto').style.filter = "blur(0px)";

    document.getElementById('presentacion').style.filter = "blur(0px)";

    document.getElementById('buscar').style.filter = "blur(0px)";

    soyglobal = false;

}


//Process Examinar button-------------------------------------------------

var exa = document.getElementById('examinar');

exa.addEventListener("change", () => {

    let contenido; 
    let contenido_bruto;
    let pFile = new FileReader();
    var temp;

   temp = document.getElementById('examinar'); 
   pFile.readAsText(temp.files[0]);


   pFile.onload = function(event) {

   contenido_bruto = pFile.result;
   contenido = contenido_bruto.split('\n'); 
  
  
  
  //Hasta este punto tenemos en contenido todo el array con el texto
  //PD. cojone es global
   
   //cleaning all rows

   var i; //from iterator

   for(i = 0; i < 20; i++)
      {
       document.getElementById('tabla').deleteRow(1);   
      }

     //Now let's goooo to insert. 
     i = 0;
     let rowcita = document.getElementById('tabla');
     var currentRow;
  
    
     for(i = 0; i < (contenido.length - 1); i++)
        {
          currentRow = contenido[i].split(';');
          rowcita.insertRow(-1).innerHTML = `<td contenteditable>${currentRow[0]}</td><td contenteditable>${currentRow[1]}</td><td contenteditable>${currentRow[2]}</td><td contenteditable>${currentRow[3]}</td><td style="background-color: #9c9c9c";>${currentRow[4]}</td>`;
        }

  }

});





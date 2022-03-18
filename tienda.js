//Tienda y carrito sección principal

//creamos clase constructora con los metodos a utilizar

class Alimentos {
    constructor(alimento, cantidad) {
        this.id = alimento.id;
        this.marca = alimento.marca;
        this.descripcion =alimento.descripcion;
        this.precio = alimento.precio;
        this.cantidad = cantidad;
        this.precioTotal= alimento.precio;
    }
    agregarUnidad(){
        this.cantidad++;
    }
    quitarUnidad(){
        this.cantidad--;
    }
    actualizarPrecioTotal(){
        this.precioTotal= this.precio * this.cantidad;
    }
}

//declaramos variables, array y carrito.
const alimentos = [
    {
    id: 0,
    marca: "CAT CHOW",
    descripcion: "Alimento sabor carne",
    precio: 180,
    img: "./img/catchowcarne.jpg"
    },
    {
    id: 1,
    marca: "PEDIGREE",
    descripcion: "Alimento nutrición completa para adultos",
    precio: 220,
    img: "./img/pedigreecompleta.jpg"
    },

    {
    id: 2,
    marca: "RAZA",
    descripcion: "Alimento sabor carne adultos",
    precio: 155,
    img: "./Img/razacarne.jpg"
    },
    {
    id: 3,
    marca: "GATI",
    descripcion: "Alimento sabor pollo con vegetales",
    precio: 160,
    img: "./Img/gatipollo.jpg"
    },
    {
    id: 4,
    marca: "CAT CHOW",
    descripcion: "Alimento sabor pescado cachorros",
    precio: 190,
    img: "./Img/catchowpescado.jpg"
    },
    {
    id: 5,
    marca: "PEDIGREE",
    descripcion: "Alimento completo para cachorros",
    precio: 250,
    img: "./Img/pedigreecachorros.png"
    },
];

let carrito;

//Uso de STORAGE
function carritoStorage() {
    let contStorage = JSON.parse(localStorage.getItem("carritoStorage"));
    console.log("contenido en LS del carrito",contStorage);

    if (contStorage) {
        let array =[];
        for (let i=0; i<contStorage.length; i++) {
            let alimento= new Alimentos( contStorage[i], contStorage[i].cantidad);   
            alimento.actualizarPrecioTotal(),
            array.push(alimento);
        }
        return array;
    }
    return [];
}

function imprimirAlimentosEnHTML(alimentos) {
    let contendor = document.getElementById("contenedor");
    
    for (const alimento of alimentos) {
        let card = document.createElement("div");
        
        card.innerHTML = `
            <div class="card">
                <div class="cardBody">
                    <div class="cardImg">
                        <img src="${alimento.img}" alt="alimento">  
                    </div>
                    <div class="cardText">
                        <h2 class="cardTitle">${alimento.marca}</h2>
                        <h4 class="cardSubT">${alimento.descripcion}</h4>
                        <p class="cardP">$${alimento.precio}kg</p>
                    </div>
                    <div class="cardContBtn">
                        <button id="agregar${alimento.id}" class="btncard">Agregar</button>
                    </div>
                </div>
            </div>
        `;

        contendor.appendChild(card);

        let btn= document.getElementById(`agregar${alimento.id}`);

        btn.onclick= ()=>agregarAlCarrito(alimento.id);
    }
}

function tablaProduct(array) {
    let contenedor = document.getElementById("carrito");
    contenedor.innerHTML= "";

    let precioTotal= obtenerPrecioTotal(array);

    let tabla= document.createElement("div");

    tabla.innerHTML=`
        <table class="table">
            <th class="text" >Precio Final: $${precioTotal}</th>
            <tbody id="bodyT">
            </tbody>    
        </table>
    `;

    contenedor.appendChild(tabla);

    let bodyT = document.getElementById("bodyT");
    for(let alimento of array) {
        let datos= document.createElement("tr");
        datos.innerHTML= `
            <tr>
                <th class="thTitle" >Producto: ${alimento.marca}</th>
                <th class="thText" >${alimento.descripcion}</th>
                <th class="thCant">Cantidad: ${alimento.cantidad}</th>
                <th class="thPrecio">Valor: ${alimento.precio}ARG</th>
                <th class="thBtn"><button id="eliminar${alimento.id}" class="btn">Eliminar</button></th>
            </tr>
        `;
    bodyT.appendChild(datos);

    $(`#eliminar${alimento.id}`).on("click",()=>{eliminarDelCarrito(alimento.id);});
    }
}

function agregarAlCarrito(idProducto) {
    let alimentoEnCarrito = carrito.find((elemento)=>{
        if (elemento.id == idProducto){
            return true;
        }
    })

    if(alimentoEnCarrito) {
        let index =carrito.findIndex((elemento)=>{
            if(elemento.id ===alimentoEnCarrito.id) {
                return true;
            }
        });
        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
    }else {
        carrito.push(new Alimentos(alimentos[idProducto],1));
    }
    
    localStorage.setItem("carritoStorage",JSON.stringify(carrito));
    tablaProduct(carrito);
}

function eliminarDelCarrito(id) {
    let alimento= carrito.find((alimento)=> alimento.id ===id);
    let index = carrito.findIndex((element)=>{
        if(element.id === alimento.id) {
            return true;
        }
    });

    if (alimento.cantidad > 1) {
        carrito[index].quitarUnidad();
        carrito[index].actualizarPrecioTotal();
    }else {
        carrito.splice(index, 1);
        if (carrito.length === 0) {
            carrito= [];
        }
    }

    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
    tablaProduct(carrito);
}

function obtenerPrecioTotal(array) {
    let precioTotal = 0;

    for (const product of array) {
        precioTotal += product.precioTotal
    }
    return precioTotal;
}

imprimirAlimentosEnHTML(alimentos);
carrito= carritoStorage();
tablaProduct(carrito);
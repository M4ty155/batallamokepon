window.addEventListener('load', iniciarJuego)

let mascotas = []
let titulo = document.getElementById('titulo')
let ataqueJugador =[]
let ataqueEnemigo = []
let intervalo
let mokeponesEnemigos = []
let ataqueRandomPC
let spanVictoriasJugador = document.getElementById('vidas-jugador')
let spanVictoriasPC = document.getElementById('vidas-enemigo')
let sectionAtaque = document.getElementById('ataque')
let sectionReinicio = document.getElementById('reiniciar')
let seleccionMascota = document.getElementById('seleccion')
let botonReinicio = document.getElementById('reiniciar')
let nadieElegido = document.getElementById('nadie-elegido')
let opcionMascotas
let contenedorTarjetas = document.getElementById('contenedor-tarjetas')
let mascotaHipodoge
let mascotaCapipepo 
let mascotaRatigueya 
let mascotaLangostelvis 
let mascotaTucapalma 
let mascotaPydos
let mascotaJugador
let jugadorId = null
let enemigoId = null
let atackPlayer
let ataquesMascotas
let contenedorAtaques = document.getElementById('contenedor-ataques')
let botones = []
let indexAtaqueJugador 
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasPC = 0
let sectionVerMapa = document.getElementById('ver-mapa')
let mapa = document.getElementById('mapa')
let lienzo = mapa.getContext("2d")
let mapaBackground = new Image()
let anchoMapa = sectionVerMapa.getBoundingClientRect().width - 20
let anchoMaximo = 350
let alturaMapa
let miMascota
let ataquesHipodoge = [
    {nombre: 'FUEGO', id: 'fuego'}, 
    {nombre: 'AGUA', id: 'agua'},
    {nombre: 'AGUA', id: 'agua'},
    {nombre: 'AGUA', id: 'agua'},
    {nombre: 'TIERRA', id: 'tierra'}
]
let ataquesRatigueya = [
    {nombre: 'FUEGO', id: 'fuego'}, 
    {nombre: 'FUEGO', id: 'fuego'},
    {nombre: 'AGUA', id: 'agua'},
    {nombre: 'TIERRA', id: 'tierra'},
    {nombre: 'TIERRA', id: 'tierra'}
]
let ataquesCapipepo = [
    {nombre: 'FUEGO', id: 'fuego'}, 
    {nombre: 'AGUA', id: 'agua'},
    {nombre: 'TIERRA', id: 'tierra'},
    {nombre: 'TIERRA', id: 'tierra'},
    {nombre: 'TIERRA', id: 'tierra'}
]
let ataquesLangostelvis = [
    {nombre: 'FUEGO', id: 'fuego'}, 
    {nombre: 'FUEGO', id: 'fuego'},
    {nombre: 'AGUA', id: 'agua'},
    {nombre: 'AGUA', id: 'agua'},
    {nombre: 'TIERRA', id: 'tierra'}
]
let ataquesTucapalma = [
    {nombre: 'FUEGO', id: 'fuego'}, 
    {nombre: 'AGUA', id: 'agua'},
    {nombre: 'AGUA', id: 'agua'},
    {nombre: 'TIERRA', id: 'tierra'},
    {nombre: 'TIERRA', id: 'tierra'}
]
let ataquesPydos = [
    {nombre: 'FUEGO', id: 'fuego'}, 
    {nombre: 'FUEGO', id: 'fuego'},
    {nombre: 'FUEGO', id: 'fuego'},
    {nombre: 'AGUA', id: 'agua'},
    {nombre: 'TIERRA', id: 'tierra'}
]

alturaMapa = anchoMapa * 3 / 4
mapa.width = anchoMapa
mapa.height = alturaMapa
if (anchoMapa > anchoMaximo){
    anchoMapa = anchoMaximo - 20
}

mapaBackground.src = './images/mapa.jpg'
class Mokepon{
    constructor(nombre, vida, imagen, id = null){
        this.id = id
        this.nombre = nombre
        this.vida = vida
        this.imagen = imagen
        this.ataques = []
        this.width = 80
        this.height = 80
        this.x = aleatorio(0, mapa.width - this.width)
        this.y = aleatorio(0, mapa.height - this.height)
        this.mapaFoto = new Image()
        this.mapaFoto.src = imagen
        this.speedX = 0
        this.speedY = 0
    }

    pintarMascota(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x, 
            this.y, 
            this.width, 
            this.height
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', 3, './images/hipodoge.png')
let capipepo = new Mokepon('Capipepo', 3, './images/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', 3, './images/ratigueya.png')
let langostelvis = new Mokepon('Langostelvis', 3, './images/langostelvis.png')
let tucapalma = new Mokepon('Tucapalma', 3, './images/tucapalma.png')
let pydos = new Mokepon('Pydos', 3, './images/pydos.png')


hipodoge.ataques.push(...ataquesHipodoge)

capipepo.ataques.push(...ataquesCapipepo)

ratigueya.ataques.push(...ataquesRatigueya)

langostelvis.ataques.push(...ataquesLangostelvis)

tucapalma.ataques.push(...ataquesTucapalma)

pydos.ataques.push(...ataquesPydos)

mascotas.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)

function iniciarJuego(){
    mascotas.forEach((mascota) => {
        opcionMascotas = `
        <input type="radio" name="mascotita" id= ${mascota.nombre} />
        <label class="tarjeta" for=${mascota.nombre}>
        <p>${mascota.nombre}</p>
        <img src=${mascota.imagen} alt:${mascota.nombre}>
        </label>`
        contenedorTarjetas.innerHTML += opcionMascotas
        mascotaHipodoge = document.getElementById('Hipodoge')
        mascotaCapipepo = document.getElementById('Capipepo')
        mascotaRatigueya = document.getElementById('Ratigueya')
        mascotaLangostelvis = document.getElementById('Langostelvis')
        mascotaTucapalma = document.getElementById('Tucapalma')
        mascotaPydos = document.getElementById('Pydos')
    })
    sectionAtaque.style.display = 'none'
    sectionReinicio.style.display = 'none'
    seleccionMascota.addEventListener('click', elegirMascotaJugador)
    botonReinicio.addEventListener('click', reinicio)
    nadieElegido.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function elegirMascotaJugador(){
    let spanMascota = document.getElementById('mascota-elegida')
    let sectionMascota = document.getElementById('mascota')
    if(mascotaHipodoge.checked){
        spanMascota.innerHTML = mascotaHipodoge.id
        mascotaJugador = mascotaHipodoge.id
        sectionMascota.style.display = 'none'
        titulo.style.display = 'none'
        iniciarMapa()
    }
    else if(mascotaCapipepo.checked){
        spanMascota.innerHTML = mascotaCapipepo.id
        mascotaJugador = mascotaCapipepo.id
        sectionMascota.style.display = 'none'
        nadieElegido.style.display = 'none'
        titulo.style.display = 'none'
        iniciarMapa()
    }
    else if(mascotaRatigueya.checked){
        spanMascota.innerHTML = mascotaRatigueya.id
        mascotaJugador = mascotaRatigueya.id
        sectionMascota.style.display = 'none'
        nadieElegido.style.display = 'none'
        titulo.style.display = 'none'
        iniciarMapa()
    }
    else if(mascotaTucapalma.checked){
        spanMascota.innerHTML = mascotaTucapalma.id
        mascotaJugador = mascotaTucapalma.id
        sectionMascota.style.display = 'none'
        nadieElegido.style.display = 'none'
        titulo.style.display = 'none'
        iniciarMapa()
    }
    else if(mascotaPydos.checked){
        spanMascota.innerHTML = mascotaPydos.id
        mascotaJugador = mascotaPydos.id
        sectionMascota.style.display = 'none'
        nadieElegido.style.display = 'none'
        titulo.style.display = 'none'
        iniciarMapa()
    }
    else if(mascotaLangostelvis.checked){
        spanMascota.innerHTML = mascotaLangostelvis.id
        mascotaJugador = mascotaLangostelvis.id
        sectionMascota.style.display = 'none'
        nadieElegido.style.display = 'none'
        titulo.style.display = 'none'
        iniciarMapa()
    }
    else{
        nadieElegido.style.display = 'block'
        sectionAtaque.style.display = 'none'
        sectionVerMapa.style.display = 'none'
    }
    extraerAtaques(mascotaJugador)
    secuenciaDeAtaque()
    seleccionarMokepon(mascotaJugador)
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function iniciarMapa(){
    miMascota = obtenerMascota()
    intervalo = setInterval(pintarCanvas, 50)
    sectionVerMapa.style.display = 'flex'
    window.addEventListener('keydown', presionarTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function extraerAtaques(mascotaJugador){
    let ataques
    mascotas.forEach((mascota) => {
        if (mascotaJugador == mascota.nombre){
            ataques = mascota.ataques
        }
    })
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMascotas = `<button id = ${ataque.id} class = "boton-ataque BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMascotas
        botonFuego = document.getElementById('fuego')
        botonAgua = document.getElementById('agua')
        botonTierra = document.getElementById('tierra')
    })
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaDeAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent == 'FUEGO'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            else if (e.target.textContent == 'AGUA'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            else if (e.target.textContent == 'TIERRA'){
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if(ataqueJugador.length == 5){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({ataques}){
                        if(ataques.length == 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function mascotaPC(enemigo){
    let spanPC = document.getElementById('mascota-enemigo')
    let mascotaEnemigo = enemigo

    spanPC.innerHTML = mascotaEnemigo.nombre
    ataqueRandomPC = enemigo.ataques
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function ataqueAleatorio(){
    let ataqueEnemigoRandom = aleatorio(0, ataqueRandomPC.length - 1)
    if (ataqueEnemigoRandom == 0){
        ataqueEnemigo.push('FUEGO')
        console.log(ataqueEnemigo)
    }
    else if (ataqueEnemigoRandom == 1 || ataqueEnemigoRandom == 2 || ataqueEnemigoRandom == 3){
        ataqueEnemigo.push('AGUA')
        console.log(ataqueEnemigo)
    }
    else{
        ataqueEnemigo.push('TIERRA')
        console.log(ataqueEnemigo)
    }
    iniciarCombate()
}

function iniciarCombate(){
    if (ataqueJugador.length == 5){
        combate()
    }
}

function indexAmbosJugadores(jugador, pc){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[pc]
}

function combate(){
    clearInterval(intervalo)
    for (let i = 0; i < ataqueJugador.length; i++){
        if (ataqueJugador[i] === ataqueEnemigo[i]){
            indexAmbosJugadores(i, i)
            crearMensaje("EMPATE")
        }
        else if(ataqueEnemigo[i] === 'FUEGO' && ataqueJugador[i] === 'AGUA'){
            indexAmbosJugadores(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        }
        else if(ataqueEnemigo[i] === 'AGUA' && ataqueJugador[i] === 'TIERRA'){
            indexAmbosJugadores(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        }
        else if(ataqueEnemigo[i] === 'TIERRA' && ataqueJugador[i] === 'FUEGO'){
            indexAmbosJugadores(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        }
        else{
            indexAmbosJugadores(i, i)
            crearMensaje("PERDISTE")
            victoriasPC++
            spanVictoriasPC.innerHTML = victoriasPC
        }
        console.log(victoriasJugador)
        console.log(victoriasPC)
        vidasPartida()
    }
}

function vidasPartida(){
    if (victoriasJugador == victoriasPC){
        mensajeFinal("PARTIDA EMPATADA")
    }
    else if (victoriasPC > victoriasJugador){
        mensajeFinal("PERDISTE LA PARTIDA")
    }
    else{
        mensajeFinal("GANASTE LA PARTIDA")
    }
}

function reinicio(){
    location.reload()
}

function crearMensaje(resultado){
    let sectionMensaje = document.getElementById('resultadoPartida')
    let ataqueDelJugador = document.getElementById('ataque-jugador')
    let ataqueDelEnemigo = document.getElementById('ataque-enemigo')
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
    sectionMensaje.innerHTML = resultado
    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
    sectionReinicio.style.display = 'flex'
    console.log(resultado)
}

function mensajeFinal(finPartida){
    let sectionMensaje = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    sectionMensaje.appendChild(parrafo)
    parrafo.innerHTML = finPartida
    sectionReinicio.style.display = 'flex'
}

function pintarCanvas(){
    miMascota.x += miMascota.speedX
    miMascota.y += miMascota.speedY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    miMascota.pintarMascota()
    enviarPos(miMascota.x, miMascota.y)
    mokeponesEnemigos.forEach(function(mokepon){
        if(mokepon != undefined){
            mokepon.pintarMascota()
            revisarColision(mokepon)
        }
    })
}

function enviarPos(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if (res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        if(enemigo.mokepon != undefined){
                            let mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre == "Hipodoge"){
                             mokeponEnemigo = new Mokepon('Hipodoge', 3, './images/hipodoge.png', enemigo.id)
                        }
                        else if(mokeponNombre == "Capipepo"){
                             mokeponEnemigo = new Mokepon('Capipepo', 3, './images/capipepo.png', enemigo.id)
                        }
                        else if(mokeponNombre == "Ratigueya"){
                             mokeponEnemigo = new Mokepon('Ratigueya', 3, './images/ratigueya.png', enemigo.id)
                        }
                        else if(mokeponNombre == "Langostelvis"){
                             mokeponEnemigo = new Mokepon('Langostelvis', 3, './images/langostelvis.png', enemigo.id)
                        }
                        else if(mokeponNombre == "Tucapalma"){
                             mokeponEnemigo = new Mokepon('Tucapalma', 3, './images/tucapalma.png', enemigo.id)
                        }
                        else if(mokeponNombre == "Pydos"){
                             mokeponEnemigo = new Mokepon('Pydos', 3, './images/pydos.png', enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        }
                        return mokeponEnemigo
                    })
                })
        }
    })
}

function moverMascotaD(){
    miMascota.speedX = 5
}
function moverMascotaAr(){
    miMascota.speedY = -5
}
function moverMascotaAb(){
    miMascota.speedY = 5
}
function moverMascotaI(){
    miMascota.speedX = -5
}

function detenerMovimiento(){
    miMascota.speedX = 0
    miMascota.speedY = 0
}

function presionarTecla(event){
    switch (event.key){
        case '8':
            moverMascotaAr()
            break
        case 'ArrowUp':
            moverMascotaAr()
            break
        case 'w':
            moverMascotaAr()
            break
        case '5':
            moverMascotaAb()
            break
        case 'ArrowDown':
            moverMascotaAb()
            break
        case 's':
            moverMascotaAb()
            break
        case '4':
            moverMascotaI()
            break
        case 'ArrowLeft':
            moverMascotaI()
            break
        case 'a':
            moverMascotaI()
            break
        case '6':
            moverMascotaD()
            break
        case 'ArrowRight':
            moverMascotaD()
            break
        case 'd':
            moverMascotaD()
            break
        default:
            break
    }
}

function obtenerMascota(){
    for (let i = 0; i < mascotas.length; i++){
        if (mascotaJugador == mascotas[i].nombre)
        return mascotas[i]
    }
}

function revisarColision(enemigo){
    let arribaEnemigo = enemigo.y
    let abajoEnemigo = enemigo.y + enemigo.height
    let derechaEnemigo = enemigo.x + enemigo.width
    let izquierdaEnemigo = enemigo.x

    let arribaMascota = miMascota.y
    let abajoMascota = miMascota.y + miMascota.height
    let derechaMascota = miMascota.x + miMascota.width
    let izquierdaMascota = miMascota.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionVerMapa.style.display = 'none'
    mascotaPC(enemigo)
    sectionAtaque.style.display = 'flex'
}

let deck = [];
let type = ["C","D","H","S"];
let specials = ["A","J","K","Q"];
let puntuacionJugador = 0;
    puntuacionPc = 0;

//////////////////Referencias en el DOM/////////////////

//Botones
let btnPedir = document.querySelector('#btn_pedir');
let btnDetener = document.querySelector('#btn_detener');
let btnNuevo = document.querySelector('#btn_nuevo');

//Etiqueta del puntaje
let small = document.querySelectorAll('small');

//Contenedor de las imagenes de cartas
let divCard =document.querySelector('#jugador-cartas');
let divCardPc =document.querySelector('#computadora-cartas');


//Genera las 52 cartas
const geneDeck = () =>{
    for ( let i = 2; i < 11; i++ ){
        for ( let j of type )
        deck.push( i + j );
    }

    for ( let k =0; k < specials.length; k++ ){
        for ( let l of type ){
            deck.push( specials[k] + l );
        }
    }

    deck = _.shuffle( deck );
    console.log( deck );

}

geneDeck();

//Pedir carta 
const askLetter = () => {
    
    if ( deck.length === 0 ) {
        throw 'No hay cartas  en el deck';
    }
        
    const letter = deck.pop();
    return letter;
}


//Obtiene el valor de las cartas
let valueLetter = ( card ) => {
    let valor = card.substring( 0, card.length - 1 );
    
    return ( valor === "J" ) ? 11 : 
        ( valor === "Q" ) ? 12 : 
        ( valor === "K" ) ? 13 : 
        ( valor === "A" ) ? 14 : valor * 1;
    
}


btnPedir.addEventListener('click', ()=> {
    
    let card = askLetter();
    let valor = valueLetter( card );
    
    puntuacionJugador = puntuacionJugador + valor;

    small[0].innerText = puntuacionJugador;
    console.log( puntuacionJugador );

    let createCard = document.createElement('img');
    createCard.src = `cartas/${card}.png`
    createCard.classList.add('carta');
    // <img class="carta" src="./cartas/10C.png"></img>

    divCard.append( createCard );


    if ( puntuacionJugador > 21 ){
        btnPedir.disabled = true;
        turnoPc( puntuacionJugador );
        
    }else if ( puntuacionJugador == 21 ){
        btnPedir.disabled = true;
        turnoPc( puntuacionJugador );
    }
    
})


const turnoPc = ( minimoPuntos ) => {

    do {
        
        let cardPc = askLetter();
        let valorPc = valueLetter( cardPc );
        
        puntuacionPc = puntuacionPc + valorPc;
        small[1].innerText = puntuacionPc;
        
        let createCardPc = document.createElement('img');
        createCardPc.src = `cartas/${cardPc}.png`
        createCardPc.classList.add('carta');
        
        divCardPc.append( createCardPc );
        
        if ( minimoPuntos > 21 ){
           
            break;
        } 
        

    }while ( puntuacionPc < minimoPuntos && minimoPuntos <=21 )

    setTimeout(()=>{

    const mensaje = ( puntuacionJugador > 21 ) ? "Game Over":
                ( puntuacionJugador == puntuacionPc ) ? "Empate":
                ( puntuacionPc > 21 ) ? "Win game":
                ( puntuacionJugador > puntuacionPc ) ? "Win Game": "Game Over";

    alert( mensaje );
    
    },800)
}

//Detiene el juego
btnDetener.addEventListener('click', ()=> {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoPc( puntuacionJugador );
})


//Reinicia el juego
btnNuevo.addEventListener('click', ()=>{
    console.clear();
    deck = [];
    geneDeck();

    puntuacionJugador = 0;
    puntuacionPc = 0;

    small[0].innerText = 0;
    small[1].innerText = 0;

    divCard.innerHTML = "";
    divCardPc.innerHTML = "";
    btnPedir.disabled = false;
    btnDetener.disabled = false;

})




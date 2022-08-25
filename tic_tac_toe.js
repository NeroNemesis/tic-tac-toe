function isValid(button){ //checks if a square has been used already
    return button.innerHTML.length==0;
}

function setSymbol(butt, symbol){ //set the symbol of the player who clicked in the square
    butt.innerHTML=symbol;
}

function searchWinner(pawn, players, whoPlays){ //checking all the possibilities to know wo wins
    if( pawn[0].innerHTML == players[whoPlays] &&
        pawn[1].innerHTML == players[whoPlays] &&
        pawn[2].innerHTML == players[whoPlays] )
        return true;
    
    if( pawn[3].innerHTML == players[whoPlays] &&
        pawn[4].innerHTML == players[whoPlays] &&
        pawn[5].innerHTML == players[whoPlays] )
        return true;

    if( pawn[6].innerHTML == players[whoPlays] &&
        pawn[7].innerHTML == players[whoPlays] &&
        pawn[8].innerHTML == players[whoPlays] )
        return true;
    
    if( pawn[0].innerHTML == players[whoPlays] &&
        pawn[3].innerHTML == players[whoPlays] &&
        pawn[6].innerHTML == players[whoPlays] )
        return true;

    if( pawn[1].innerHTML == players[whoPlays] &&
        pawn[4].innerHTML == players[whoPlays] &&
        pawn[7].innerHTML == players[whoPlays] )
        return true;

    if( pawn[2].innerHTML == players[whoPlays] &&
        pawn[5].innerHTML == players[whoPlays] &&
        pawn[8].innerHTML == players[whoPlays] )
        return true;

    if( pawn[0].innerHTML == players[whoPlays] &&
        pawn[4].innerHTML == players[whoPlays] &&
        pawn[8].innerHTML == players[whoPlays] )
        return true;

    if( pawn[2].innerHTML == players[whoPlays] &&
        pawn[4].innerHTML == players[whoPlays] &&
        pawn[6].innerHTML == players[whoPlays] )
        return true;
    
}

function squaresAreFull(pawn){
    for(var i=0, len=pawn.length; i<len; i++){
        if(pawn[i].innerHTML.length==0)
        return false;
    }
    return true;
}

class Display { /*takes de text from var display and shows it in #gameStatus*/
    constructor(element){
        var displayer = element;
    
        function setText(message) {
            displayer.innerHTML =message;

        }

        return{sendMessage : setText}; /*returning and interface*/
    }
}

(function main(){

    /*will contain the values in our squares*/
    var pawn = document.
    querySelectorAll("#jeu button"); /*creationg and array
                                    made up of all the squares*/
    
    var players = ['X','O']; /*list of players*/
    var whoPlays =0; /*0 or 1 depending on who plays*/
    var gameOver = false;
    var display = new Display(document.
    querySelector("#gameStatus"));

    display.sendMessage("Let's start the game.<br/> Player " + players[whoPlays] + " it's your turn.");

    for(var i=0, len=pawn.length; i<len; i++){
        pawn[i].addEventListener("click",function(){
           
            if(gameOver) /*check if somone won*/
                return;
            
                if(!isValid(this)){ /*check if the square is not already selected */
                    display.sendMessage("Invalid move !");
                }else{
                    setSymbol(this, players[whoPlays]);
                    gameOver = searchWinner(pawn,players,whoPlays);

                    //Game over (someone won)
                    if(gameOver){
                       display.sendMessage("Player " + players[whoPlays] + " won !!!" +"</br><a href=\"tic_tac_toe.html\">Pay again ?</a>");
                       return;
                    }
                    //GameOver (draw)
                    if(squaresAreFull(pawn)){
                        display.sendMessage("It's a draw." + "</br><a href=\"tic_tac_toe.html\">Pay again ?</a>");
                        return;
                    }
                    //Game not over yet
                    whoPlays=whoPlays+1; //if 0 goes to 1 if 1 goes to 2 then 2%2=0
                    whoPlays=whoPlays%2;

                    display.sendMessage("Player " + players[whoPlays] + " it's your turn");
                }

        }); 
    }

})();

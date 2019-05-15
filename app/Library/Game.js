

class Game {

    constructor(players, limit = 10) {

        this.turn = 0;
        this.gameover = false;

        var total_players = players.length;
        
        if(isNaN(total_players) || total_players <= 0)
            throw "Nenhum jogador encontrado";

        this.players = players;
        
        if(limit <= 0)
            throw "Limite deve ser maior que zero";

        this.limit = limit;

        return this;
    }

    gameOrder(startingWith = false) {

        var low = 0;
        var high = this.players.length-1; // posição no array

        var init = startingWith ? startingWith : Math.floor(Math.random() * (high - low + 1) + low);

        if(this.players[init] === undefined) {
            throw "Jogador inicial não encontrado";
        }

        var slot = [];

        this.players.forEach(function(element, key){
            if(key > init) {
                slot.push(element);
            }
        });

        this.players.forEach(function(element, key){
            if(key < init) {
                slot.push(element);
            }
        });

        slot.unshift(this.players[init]);

        console.log("Ordem de jogada:");
        console.log(slot);

        this.slot = slot;

        return this.slot;
        
    }

    nextRound() {
        
        for(var i=0;i<this.slot.length;i++) {

            console.log("Jogador "+this.slot[i]+" jogando");

            if(this.turn > 20) {
                this.gameover = true;
                console.log("Game Over");
            }

            this.turn++;

        }

        
    }

    getTurn() {
        return this.turn;
    }

    over() {
        return this.gameover;
    }
}

module.exports = Game;
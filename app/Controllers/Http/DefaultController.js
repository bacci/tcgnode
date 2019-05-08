'use strict'

const Deck = use('App/Library/Deck');
const Card = use('App/Library/Card');
const Hand = use('App/Library/Hand');

class DefaultController {

    async index() {

        var hand = new Hand();
        var hand2 = new Hand();
        var player1 = "Jace";
        var player2 = "Teferi";

        var limite = 10;
        var acumulado = 0;

        var cards = [];

        for(var i = 0; i < 4; i++) {
            var rand = this.randomIntInc(0,3);
            hand.addCard(new Card(this.numeroPorExtenso(rand), rand));
        }

        for(var i = 0; i < 4; i++) {
            var rand = this.randomIntInc(0,3);
            hand2.addCard(new Card(this.numeroPorExtenso(rand), rand));
        }

        var temp = [];
        for(var i = 0; i < 40; i++) {
            var rand = this.randomIntInc(0,3);

            temp.push(new Card(this.numeroPorExtenso(rand), rand));
        }

        var deck = new Deck(temp);

        var turnos = 60;
        for(var i = 0;i < turnos;i++) {
            console.log("Turno: "+i);
            console.log("Cartas no deck: "+deck.cardsInDeck());
        
            if(i % 2 == 0) {
                console.log("Turno Par "+i);
                var jogada1 = this.turnos(deck, hand, player1);

                console.log(jogada1);

                if(jogada1 !== false)
                    acumulado += jogada1;
            } else {
                var jogada2 = this.turnos(deck, hand2, player2);

                console.log(jogada2);

                if(jogada2 !== false)
                    acumulado += jogada2;
                
                // if(jogada2 == jogada1) {
                //     console.log("Empate");
                // } else if(jogada2 > jogada1) {
                //     console.log(player2 + " ganhou");
                // } else {
                //     console.log(player1 + " ganhou");
                // }
            }

            console.log(acumulado + " acumulado");            

            if(acumulado > limite) {
                console.log("Fim de jogo");
                break;
            }

        }

        console.log("Sobrou no deck: ");
        console.log(deck.cards);

        return hand;
    }

    turnos(deck, hand, player) {

        var tamanho_carta = false;

        try {

            console.log("Mão "+player);
            console.log(hand);

            // pegar a carta maior
            // hand.pickBiggerCard();
            if(hand.pickAnyCard() === false) {
                console.log("Nenhuma carta para pegar "+player+", comprando...");
                var newCard = deck.getFirstCard();
                hand.addCard(newCard);

                if(hand.cardsInHand() == 0)
                    throw("Nenhuma carta foi comprada "+player)

                hand.pickAnyCard();
            }
                

            if(hand.getStack()) {
                tamanho_carta = hand.getStack().size;

                console.log("Mão sem a maior carta "+player);
                console.log(hand);

                console.log("Minha jogada "+player+": "+tamanho_carta);

                hand.clearChecks();
                hand.orderBySize()

                hand.removeStack();

            } else {
                // acabou as cartas do deck
                throw "Sem cartas na mao "+player;
            }

        } catch (e) {
            console.log(e);
        } finally {
            hand.removeStack();
            hand.clearChecks();
        }

        return tamanho_carta;

    }

    async teste(hand, hand2) {
        console.log("Mão");
        console.log(hand);

        // pegar a carta maior
        hand.pickBiggerCard();

        console.log("Mão sem a maior carta");
        console.log(hand);

        console.log("Stack size: "+hand.getStack().size);

        // põe a carta separada, na mão novamente
        hand.putItBack();

        console.log("Mão com a carta novamente");
        console.log(hand);

        // pegar a carta maior nao verificada ainda
        hand.pickBiggerCardUnchecked();

        console.log("Mão sem a maior carta não verificada");
        console.log(hand);

        // põe a carta separada, na mão novamente
        hand.putItBack();

        console.log("Mão com a carta novamente 2");
        console.log(hand);

        console.log("Limpar os checks");
        hand.clearChecks();
        hand.orderBySize()
        console.log(hand);
    }

    // ordenar por string apenas
    async compare( a, b ) {

        if ( a.size < b.size ){
            return -1;
        }

        if ( a.size > b.size ){
            return 1;
        }
        
        return 0;
    }

    // gera numero randomico
    randomIntInc(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    // gera numero randomico
    numeroPorExtenso(numero) {

        var arr = { 
            0 : "Zero",
            1 : "Um",
            2 : "Dois",
            3 : "Tres",
            4 : "Quatro"
        };

        return arr[numero];
    }

}

module.exports = DefaultController

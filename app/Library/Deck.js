

class Deck {

    constructor(cards) {
        this.cards = cards;

        return this;
    }

    shuffle() {

        var array = this.cards;
        var currentIndex = array.length;

        if(this.cardsInDeck() != 0) {
            var temporaryValue, randomIndex;
        
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
        
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
        }
    
        this.cards = array;
        
    }

    getFirstCard() {
        return this.cards.shift();
    }

    cardsInDeck() {
        return this.cards.length;
    }
}

module.exports = Deck;
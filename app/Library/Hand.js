

class Hand {

    constructor(cards = []) {
        this.cards = cards;
        this.stack = false;

        return this;
    }

    addCard(card) {

        this.cards.unshift(card);

        if(this.cardsInHand() == 0)
            return false;

        return this;

    }

    pickBiggerCard(card) {

        if(this.cardsInHand() == 0)
            return false;

        this.orderBySize();
        this.pickFirst();

        return this;

    }

    pickBiggerCardUnchecked(card) {

        if(this.cardsInHand() == 0)
            return false;

        this.orderBySize();
        this.pickFirstUnchecked();

        return this;

    }

    putItBack() {
        if(!this.haveStack)
            return ["Error"];

        var card = this.stack;
        card.checked = true;

        if(this.cards.unshift(card)) {  
            this.removeStack();
        }
    }

    orderBySize() {

        // ordena por valor maior para o menor
        this.cards.sort(function (a, b) {
            // para fazer o valor decrescente, utilizar a - b e não b - a 
            return b.size - a.size;
        });

        return this;
    }

    // pega o primeiro resultado e remove da mão, colocando em stack
    pickFirst() {

        if(this.cardsInHand() == 0)
            return false;

        this.stack = this.cards.splice(0,1)[0];
    }

    // pega o primeiro resultado e remove da mão, colocando em stack
    pickAnyCard() {

        if(this.cardsInHand() == 0)
            return false;

        var low = 0;
        var high = this.cards.length-1; // posição no array
        var any = Math.floor(Math.random() * (high - low + 1) + low);
        this.stack = this.cards.splice(any,1)[0];
    }

    // pega o primeiro resultado não verificado ainda e remove da mão, colocando em stack
    pickFirstUnchecked() {

        if(this.cardsInHand() == 0)
            return false;

        for (var i = 0;i < this.cards.length;i++) {

            if(this.cards[i].checked === true)
                continue;

            this.stack = this.cards.splice(i,1)[0];
            break;
        }

        return this;
    }

    clearChecks() {

        for (var i = 0;i < this.cards.length;i++) {
            this.cards[i].checked = false;
        }

        return this;
    }

    getStack() {
        return this.stack;
    }

    removeStack() {
        this.stack = false;
    }

    haveStack() {

        if(this.stack)
            return true;

        return false;
    }

    cardsInHand() {
        return this.cards.length;
    }
}

module.exports = Hand;
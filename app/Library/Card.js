

class Card {

    constructor(name, size) {
        this.name = name;
        this.size = size;
        this.checked = false;

        return this;
    }

    async createXCards(x, name, size) {

        var cards = [];

        for (var i = 0; i < x; i++) {
            cards.push(new Card(name, size));
        }

		return cards;
    }

    async orderBySize(cards) {

        // ordena por valor menor para o maior
        cards.sort(function (a, b) {
            return a.size - b.size;
        });

        return cards;
    }
}

module.exports = Card;
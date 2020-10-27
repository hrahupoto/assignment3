// the bank class
class Bank {
    //constructor - bank coins, bank district cards array, bank character cards array
    // when creating the bank instance, bankDcs and bankCcs arrays must be randomised (shuffled - shouldnt be in the order)
    constructor(bankCoins, bankDcsArray, bankCcsArray) {
        this.coins = bankCoins;
        this.dcsArray = bankDcsArray;
        this.ccsArray = bankCcsArray;
    }


    // when the player pays coins to the bank , bank will recieve coins- when creating a district, etc..
    recieveBank(numCoins) {
        this.coins += numCoins;
    }

    // when the player get coins from the bank , bank withdraws coins- at every turn when player collect coins from the bank, etc..
    withdrawFromBank(numCoins) {
        this.coins -= numCoins;
        return this.coins;
    }

    // when the player withdraw one district card from the bank ( from the middle dcs deck)
    // this method only returns one district card from the dcs array 
    // after returns it,  deletes that card from the array which is the last element of the array
    drawDistrictCard() {
        drawingDc = this.dcsArray[this.dcsArray.length - 1];
        this.dcsArray.pop();
        return drawingDc;
    }

    //when the crowned player draws faceup character cards from the deck
    // this method returns one character card from the ccs array(the last element, if the card is King, just get the one card before the last)
    //after return it, deletes that character card from the array
    drawFaceupCharacterCard() {
        drawingCc = this.ccsArray[this.ccsArray.length - 1];
        if (drawingCc.name === 'King') {
            drawingCc = this.ccsArray[this.ccsArray.length - 2];
            this.ccsArray.splice(this.ccsArray.length - 2, 1);
        } else {
            this.ccsArray.pop();
        }
        return drawingCc;
    }

    //when the player choose a character card from the remaining character card deck
    // this method return the character card from the ccs array ( it returns the card which matches the character card rank from the array, assuming player get
    // to see remaining cards and the player can decide the card which wants)
    choosePlayerCharacterCard(charcaterCardRank) {
        let count = 0;
        this.ccsArray.forEach(element => {
            if (element.rank === charcaterCardRank) {
                drawingPlayerCc = element;
                this.ccsArray.splice(count, 1);
                return element;
            }
            count++;
        });
    }
}

module.exports = Bank;
//exports.Bank = Bank;
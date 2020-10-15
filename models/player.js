// the player class
class Player{
    //constructor - player number, player name, player dob, player stash coins value, player Dcs array, player Ccs array, player turn(boolean), player is the crowned player (boolean)
    constructor(playerNumber, playerName, playerDob, playerCoins, playerDcsArray, playerCcsArray, playerTurn=false,isPlayerCrowned=false){
        this.num = playerNumber;
        this.name = playerName;
        this.dob = playerDob;
        this.coins = playerCoins;
        this.dcsArray = playerDcsArray;
        this.ccsArray = playerCcsArray;
        this.turn = playerTurn; // set this true if the player's turn has arrived ( may be its not necessary if we are calling according to the cc rank ascending order)
        this.crowned = isPlayerCrowned; // set this true to identify this the crowned player when selecting the crowned player.
    }
   
    // when the player pays coins to the bank - when creating a district, etc..
    payBank(numCoins){
        this.coins -= numCoins;
    }

    // when the player get coins from the bank - at every turn when player collect coins from the bank, etc..
    recieveFromBank(numCoins){
        this.coins += numCoins;
    }

    // when the player draws district cards from the bank and add to the player hand, this method can be called to add dc. It sets dc.hand attribute to true to set its in the player hand
    addPlayerDistrictCardToHand(districtCard){
        districtCard.hand = true;
        this.dcsArray.push(districtCard);
    }

    // when the player build a district by selecting a district card from players hand, district card hand attribute must set to false  to indicate that district has already built.
    buildPlayerDistrictCardByName(districtCard){
        this.dcsArray.forEach(element => {            
            if(element.name === districtCard.name){
                element.hand = false;
            }
        });       
    }

    // when the player draws character cards from the bank and add to the player hand, this method can be called to add cc.
    addPlayerCharacterCardToHand(characterCard){
        this.ccs.push(characterCard);
    }

     // when the player reveals the character card, this method can be called and sets the cc revealed attribute to true.
    setPlayerCharacterCardRevealed(characterCard){
        this.ccsArray.forEach(element => {            
            if(element.rank === characterCard.rank){
                element.revealed = true;
            }
        });    
    }

      // when the player character ability applied, this method can be called and sets the cc ability applied attribute to true.
      setPlayerCharacterCardAbilityApplied(characterCard){
        this.ccsArray.forEach(element => {            
            if(element.rank === characterCard.rank){
                element.ability = true;
            }
        });    
    }

}
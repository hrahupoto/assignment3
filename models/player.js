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
        this.turn = playerTurn;
        this.crowned = isPlayerCrowned;
    }
   
    // when the player pays coins to the bank - when creating a district, etc..
    payBank(numCoins){
        this.coins -= numCoins;
    }

    // when the player get coins from the bank - at every turn when player collect coins from the bank, etc..
    recieveFromBank(numCoins){
        this.coins += numCoins;
    }

    

}
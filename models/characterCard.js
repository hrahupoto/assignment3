// the character card class
class CharacterCard {
    //constructor - cc name, cc rank, cc dec, cc has revealed or not (boolean), cc ability has been applied or not (boolean), url for the image
    constructor(ccName, ccRank, ccDesc, isRevealed=false, isCcAbilityApplied=false,ccUrl){
        this.name = ccName;
        this.rank = ccRank;
        this.desc = ccDesc;
        this.revealed = isRevealed;  // once the character card has been called set this boolean variable to true. it can be used to make visible the character card to other players.
        this.ability = isCcAbilityApplied; // once the player has applied the character ability set this to true. it can be used to verify the ability has already applied.
        this.url = ccUrl;
    }


}

exports.CharacterCard = CharacterCard;
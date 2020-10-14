// the character card class
class CharacterCard {
    //constructor - cc name, cc rank, cc dec, cc has revealed or not (boolean), cc ability has been applied or not (boolean), url for the image
    constructor(ccName, ccRank, ccDesc, isRevealed=false, isCcAbilityApplied=false,ccUrl){
        this.name = ccName;
        this.rank = ccRank;
        this.desc = ccDesc;
        this.revealed = isRevealed;
        this.ability = isCcAbilityApplied;
        this.url = ccUrl;
    }


}
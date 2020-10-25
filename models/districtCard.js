// the district card class
class DistrictCard{
    //constructor - dc name, dc value, dc colour, is the district card on hand(when player draws cards from the district card deck isDcOnHand
    //must set to true) or build(false), dc url for the image
    constructor(dcName, dcValue, dcColour, isDcOnHand=false,dcUrl){
        this.name = dcName;
        this.value = dcValue;
        this.colour = dcColour;
        this.hand = isDcOnHand; // once the player draw a card from the bank deck, set this value to true. But once the district card has built set it to false. This way you can identify player dcs, on hand and built.
        this.url = dcUrl;
    }
}
exports.DistrictCard = DistrictCard;
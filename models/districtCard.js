// the district card class
class DistrictCard{
    //constructor - dc name, dc value, dc colour, is the district card on hand(when player draws cards from the district card deck isDcOnHand
    //must set to true) or build(false), dc url for the image
    constructor(dcName, dcValue, dcColour, isDcOnHand=false,dcUrl){
        this.name = dcName;
        this.value = dcValue;
        this.colour = dcColour;
        this.hand = isDcOnHand;
        this.url = dcUrl;
    }
}
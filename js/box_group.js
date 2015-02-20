var BoxDimensions = {
                      4:  { 500: 10, 750: 12, 800: 12, 1000: 12, 2000: 16 },
                      5:  { 500: 10, 750: 12, 800: 12, 1000: 12, 2000: 16 },
                      6:  { 500: 12, 750: 14, 800: 13, 1000: 13, 2000: 18 },
                      7:  { 500: 12, 750: 15, 800: 14, 1000: 14, 2000: 19 },
                      8:  { 500: 14, 750: 16, 800: 16, 1000: 16, 2000: 20 },
                      9:  { 500: 15, 750: 17, 800: 18, 1000: 18, 2000: 21 },
                      10: { 500: 16, 750: 18, 800: 18, 1000: 18, 2000: 22 },
                      11: { 500: 17, 750: 19, 800: 20, 1000: 20, 2000: 23 },
                      12: { 500: 18, 750: 20, 800: 20, 1000: 20, 2000: 24 }
                    } // thickness(mm): { length(cm): boxSide(inches) }

function BoxGroup($size, $packingList) {
  this.$packingList = $packingList;
  this.$size = $size;
  this.noOfRollsPerBox = 0;
  this.lengthPerBox = 0;
  this.netWeightOfEachBox = 0;
  this.startingBox = 1;
  this.noOfBoxes = 1;
  this.totalLengthInGroup = 0;
  this.boxLength = 0;
  this.boxWidth = 0;
  this.boxHeight = 0;
}

BoxGroup.prototype.createBoxGroups = function() {
  this.noOfRollsPerBox = parseInt(this.$size.weightLimitOfBox() / this.$size.rollWeight());
  this.lengthPerBox = this.noOfRollsPerBox * this.$size.rollLength();
  var numberOfBoxesInFloat = this.$size.totalLength() / this.lengthPerBox;
  this.noOfBoxes = parseInt(numberOfBoxesInFloat);
  this.startingBox = ++this.$packingList.boxCounter;
  this.$packingList.boxCounter += (this.noOfBoxes - 1);
  this.totalLengthInGroup = this.lengthPerBox * this.noOfBoxes;
  this.netWeightOfEachBox = this.$size.rollWeight() * this.noOfRollsPerBox;
  this.boxLength = BoxDimensions[this.$size.rollThickness()][this.$size.rollLength() * 100];
  this.boxWidth = this.boxLength;
  this.boxHeight = this.noOfRollsPerBox * this.$size.rollWidth() * 0.0393701;

  if(!(numberOfBoxesInFloat % 1 == 0)) {
    var loneBox = new BoxGroup(this.$size, this.$packingList);
    this.$packingList.boxGroups.push(loneBox);
    loneBox.noOfRollsPerBox = (loneBox.$size.totalLength() - this.totalLengthInGroup) / loneBox.$size.rollLength();
    loneBox.lengthPerBox = loneBox.noOfRollsPerBox * loneBox.$size.rollLength();
    loneBox.noOfBoxes = 1;
    loneBox.startingBox = ++this.$packingList.boxCounter;
    loneBox.totalLengthInGroup = loneBox.lengthPerBox;
    loneBox.netWeightOfEachBox = loneBox.$size.rollWeight() * loneBox.noOfRollsPerBox;
    loneBox.boxLength = BoxDimensions[loneBox.$size.rollThickness()][loneBox.$size.rollLength() * 100];
    loneBox.boxWidth = loneBox.boxLength;
    loneBox.boxHeight = loneBox.noOfRollsPerBox * loneBox.$size.rollWidth() * 0.0393701;
  }
}
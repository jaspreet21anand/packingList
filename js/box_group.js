
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
  if(this.$size.isWireBacked()) {
    this.boxDimensions = BoxDimensionsWithWiredBack;
  } else {
    this.boxDimensions = BoxDimensionsWithoutWiredBack;
  }
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
  var thicknessHash = this.boxDimensions[this.$size.rollThickness()];
  if(!thicknessHash){
    thicknessHash = this.boxDimensions[parseInt(this.$size.rollThickness())]
  }
  var boxDimension = this.$size.boxDimension();
  if(!!boxDimension) {
    this.boxLength = boxDimension;
  } else {
    this.boxLength = thicknessHash[this.$size.rollLength() * 100];
  }
  if(!(this.boxLength)) {
    this.boxLength = thicknessHash[parseInt(this.$size.rollLength()) * 100];
  }
  this.boxWidth = this.boxLength;
  var heightBuffer = this.noOfRollsPerBox * 1.5 / 25.4; //buffer in height as 1.5mm per role
  this.boxHeight = heightBuffer + (this.noOfRollsPerBox * this.$size.rollWidth() / this.$size.heightFactor());

  if(!(numberOfBoxesInFloat % 1 == 0)) {
    var loneBox = new BoxGroup(this.$size, this.$packingList);
    this.$packingList.boxGroups.push(loneBox);
    loneBox.noOfRollsPerBox = (loneBox.$size.totalLength() - this.totalLengthInGroup) / loneBox.$size.rollLength();
    loneBox.lengthPerBox = loneBox.noOfRollsPerBox * loneBox.$size.rollLength();
    loneBox.noOfBoxes = 1;
    loneBox.startingBox = ++this.$packingList.boxCounter;
    loneBox.totalLengthInGroup = loneBox.lengthPerBox;
    loneBox.netWeightOfEachBox = loneBox.$size.rollWeight() * loneBox.noOfRollsPerBox;
    var thicknessHash = this.boxDimensions[loneBox.$size.rollThickness()];
    if(!thicknessHash){
      thicknessHash = this.boxDimensions[parseInt(loneBox.$size.rollThickness())]
    }
    var boxDimension = loneBox.$size.boxDimension();
    if(!!boxDimension) {
      loneBox.boxLength = boxDimension;
    } else {
      loneBox.boxLength = thicknessHash[loneBox.$size.rollLength() * 100];
    }
    if (!(loneBox.boxLength)) {
      loneBox.boxLength = thicknessHash[parseInt(loneBox.$size.rollLength()) * 100];
    }
    loneBox.boxWidth = loneBox.boxLength;
    loneBox.boxHeight = loneBox.noOfRollsPerBox * loneBox.$size.rollWidth() / loneBox.$size.heightFactor();
  }
}

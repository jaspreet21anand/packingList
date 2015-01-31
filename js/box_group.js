function BoxGroup($size, $packingList) {
  this.$packingList = $packingList;
  this.$size = $size;
  this.noOfRollsPerBox = 0;
  this.lengthPerBox = 0;
  this.netWeightOfEachBox = 0;
  this.startingBox = 1;
  this.noOfBoxes = 1;
  this.totalLengthInGroup = 0;
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

  if(!(numberOfBoxesInFloat % 1 == 0)) {
    var loneBox = new BoxGroup(this.$size, this.$packingList);
    this.$packingList.boxGroups.push(loneBox);
    loneBox.noOfRollsPerBox = (loneBox.$size.totalLength() - this.totalLengthInGroup) / loneBox.$size.rollLength();
    loneBox.lengthPerBox = loneBox.noOfRollsPerBox * loneBox.$size.rollLength();
    loneBox.noOfBoxes = 1;
    loneBox.startingBox = ++this.$packingList.boxCounter;
    loneBox.totalLengthInGroup = loneBox.lengthPerBox;
    loneBox.netWeightOfEachBox = loneBox.$size.rollWeight() * loneBox.noOfRollsPerBox;
  }
  console.log(this.$packingList.boxGroups);
}
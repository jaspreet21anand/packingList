function PackingList(order) {
  this.boxCounter = 0;
  this.$order = order;
  this.weightAllowedPerBox = 35;
}

PackingList.prototype.createBoxNumbers = function() {
  var lineItems = this.$order.lineItems;
  for(var i in lineItems) {
    lineItems[i].boxNumbers = [];
    var rollsPerBox = parseInt(this.weightAllowedPerBox / lineItems[i].rollWeight());
    var lengthPerBox = rollsPerBox * lineItems[i].rollLength();
    var noOfBoxes = lineItems[i].totalLength() / lengthPerBox;
    var noOfCompleteBoxes = parseInt(noOfBoxes);
    lineItems[i].boxNumbers.push(++this.boxCounter, '--', (this.boxCounter += (noOfCompleteBoxes - 1)));
    if(!(noOfBoxes % 1 == 0)) {
      this.boxCounter++;
      lineItems[i].boxNumbers.push(this.boxCounter);
    }
    console.log(lineItems[i].boxNumbers);
  }
}

PackingList.prototype.createHtml = function() {

}
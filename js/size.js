function Size() {
  this.$row = $('<div>', { class: 'row' }).
              append($("<br>\
                      <div class='col-md-2'>\
                        <input type='text' class='form-control width' placeholder='width'>\
                      </div>\
                      <div class='col-md-2'>\
                        <input type='text' class='form-control thickness' placeholder='Thickness'>\
                      </div>\
                      <div class='col-md-3'>\
                        <input type='text' class='form-control total_length' placeholder='Total Length in mtrs'>\
                      </div>\
                      <div class='col-md-2'>\
                        <input type='text' class='form-control lengthPerRole' placeholder='Length/Roll in mtrs'>\
                      </div>\
                      <div class='col-md-3'>\
                        <input type='text' class='form-control weightLimitOfBox' placeholder='Weight Limit of Box. Default 35'>\
                      </div>\
                "));
}

Size.prototype.rollWeight = function() {
  console.log(0.0019 * this.rollWidth() * this.rollThickness() * this.rollLength());
  return 0.0019 * this.rollWidth() * this.rollThickness() * this.rollLength();
}

Size.prototype.rollWidth = function() {
  return parseInt(this.$row.find('.width').first().val());
}

Size.prototype.rollThickness = function() {
  return parseInt(this.$row.find('.thickness').first().val());
}

Size.prototype.rollLength = function() {
  return parseInt(this.$row.find('.lengthPerRole').first().val());
}

Size.prototype.totalLength = function() {
  return parseInt(this.$row.find('.total_length').first().val());
}

Size.prototype.weightLimitOfBox = function() {
  var weightLimit = parseInt(this.$row.find('.weightLimitOfBox').first().val());
  if(!!weightLimit) {
    return weightLimit;
  } else {
    return 35;
  }
}

Size.prototype.totalBoxes = function() {
  var noOfBoxes = 0;
  noOfBoxes += (this.boxNumbers[2] - this.boxNumbers[0] + 1);
  if(this.boxNumbers[3]) {
    noOfBoxes++;
  }
  return noOfBoxes;
}

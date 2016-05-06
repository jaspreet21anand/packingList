function Size() {
  this.$row = $('<div>', { class: 'row' })
              .append($("<br>\
                <div class='col-md-2'>\
                  <input type='text' class='form-control width' placeholder='Width(mm)'>\
                </div>\
                <div class='col-md-2'>\
                  <input type='text' class='form-control thickness' placeholder='Thickness(mm)'>\
                </div>\
                <div class='col-md-2'>\
                  <input type='text' class='form-control total_length' placeholder='Total Length(m)'>\
                </div>\
                <div class='col-md-2'>\
                  <input type='text' class='form-control lengthPerRole' placeholder='Length of Roll(m)'>\
                </div>\
                <div class='col-md-2'>\
                  <div class='row'>\
                    <div class='col-md-12'>\
                      <input type='text' style='background: #c1c1c1' class='form-control weightLimitOfBox' placeholder='Weight Limit=35kg'>\
                    </div>\
                  </div>\
                  <div class='row'>\
                    <div class='col-md-12'>\
                      <input type='text' style='background: #c1c1c1' class='form-control heightFactor' placeholder='HeightFactor=25.4'>\
                    </div>\
                  </div>\
                </div>\
                <div class='col-md-2'>\
                  <label>WireBack?</label>\
                  <input type='checkbox' class='is-wire-back'>\
                  <button type='button' class='close'>&times;</button>\
                </div>\
              "));
}

Size.prototype.rollWeight = function() {
  return 0.00195 * this.rollWidth() * this.rollThickness() * this.rollLength();
}

Size.prototype.rollWidth = function() {
  return parseFloat(this.$row.find('.width').first().val());
}

Size.prototype.rollThickness = function() {
  return parseFloat(this.$row.find('.thickness').first().val());
}

Size.prototype.rollLength = function() {
  return parseFloat(this.$row.find('.lengthPerRole').first().val());
}

Size.prototype.isWireBacked = function() {
  return this.$row.find('.is-wire-back').get(0).checked;
}

Size.prototype.totalLength = function() {
  return parseFloat(this.$row.find('.total_length').first().val());
}

Size.prototype.weightLimitOfBox = function() {
  var weightLimit = parseFloat(this.$row.find('.weightLimitOfBox').first().val());
  if(!!weightLimit) {
    return weightLimit;
  } else {
    return 35;
  }
}

Size.prototype.heightFactor = function() {
  var factor = parseFloat(this.$row.find('.heightFactor').first().val());
  if(!!factor) {
    return factor;
  } else {
    return 25.4
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

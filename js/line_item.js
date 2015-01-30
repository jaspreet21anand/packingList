function LineItem() {
  this.$row = $('<div>', { class: 'row' }).
              append($("<br>\
                    <div class='col-sm-2'>\
                <div class='input-group'>\
                  <input type='text' class='form-control width' placeholder='width' class='width'>\
                </div>\
                    </div>\
                    <div class='col-sm-1'>\
                <div class='input-group'>\
                </div>\
                    </div><!-- /.col-md-3 -->\
                    <div class='col-sm-2'>\
                <div class='input-group'>\
                  <input type='text' class='form-control thickness' placeholder='Thickness' class='thickness'>\
                </div>\
                    </div>\
                    <div class='col-sm-3'>\
                <div class='input-group'>\
                  <input type='text' class='form-control total_length' placeholder='Total Length in mtrs' class='total_length'>\
                </div>\
                    </div>\
                    <div class='col-sm-4'>\
                <div class='input-group'>\
                  <input type='text' class='form-control lengthPerRole' placeholder='Length/Roll in mtrs' class='lengthPerRole'>\
                </div>\
                    </div>\
                "));
  this.boxNumbers = [];
}

LineItem.prototype.rollWeight = function() {
  console.log(0.0019 * this.rollWidth() * this.rollThickness() * this.rollLength());
  return 0.0019 * this.rollWidth() * this.rollThickness() * this.rollLength();
}

LineItem.prototype.rollWidth = function() {
  return parseInt(this.$row.find('.width').first().val());
}

LineItem.prototype.rollThickness = function() {
  return parseInt(this.$row.find('.thickness').first().val());
}

LineItem.prototype.rollLength = function() {
  return parseInt(this.$row.find('.lengthPerRole').first().val());
}

LineItem.prototype.totalLength = function() {
  return parseInt(this.$row.find('.total_length').first().val());
}

LineItem.prototype.totalBoxes = function() {
  var noOfBoxes = 0;
  noOfBoxes += (this.boxNumbers[2] - this.boxNumbers[0] + 1);
  if(this.boxNumbers[3]) {
    noOfBoxes++;
  }
  return noOfBoxes;
}

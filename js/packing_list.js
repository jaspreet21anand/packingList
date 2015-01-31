function PackingList(order) {
  this.boxCounter = 0;
  this.$order = order;
  this.boxGroups = [];
}

PackingList.prototype.createBoxes = function() {
  var sizes = this.$order.sizes;
  for(var i in sizes) {
    var sizeBoxGroup = new BoxGroup(sizes[i], this);
    this.boxGroups.push(sizeBoxGroup);
    sizeBoxGroup.createBoxGroups();
  }
}

PackingList.prototype.createHtml = function() {
  var $table = $('<table>', { class: 'table table-bordered' });
  var $tableHead = $('<thead>');
  var $tableBody = $('<tbody>');
  $table.append($('<th>').html('Box Numbers'))
    .append($('<th>').html('Dimensions'))
    .append($('<th>').html('Total Boxes'))
    .append($('<th>').html('Net Weight'))
    .append($('<th>').html('Gross Weight'))
    .append($('<th>').html('Sheets In Each Box'))
    .append($('<th>').html('Length In Each Box'))
    .append($('<th>').html('Total Sheets'))
    .append($('<th>').html('Total Length'));
  var sizes = this.$order.sizes;
  var row = null;
  for(var i in this.boxGroups) {
    row = this.createRow(this.boxGroups[i]);
    $tableBody.append(row);
  }
  return $table.append($tableBody);
}

PackingList.prototype.createRow = function(boxGroup) {
  tr = $('<tr>');
  if(boxGroup.noOfBoxes == 1) {
    var boxNumberString = boxGroup.startingBox;
  } else {
    var boxNumberString = [boxGroup.startingBox, boxGroup.startingBox + boxGroup.noOfBoxes - 1].join(' - ');
  }
  var netWeightOfBox = boxGroup.netWeightOfEachBox;
  var grossWeightOfBox = netWeightOfBox + 0.9;
  tr.append($('<td>').html(boxNumberString));
  var dimensionString = [boxGroup.$size.rollWidth(), 'x', boxGroup.$size.rollThickness()].join(' ');
  tr.append($('<td>').html(dimensionString));
  tr.append($('<td>').html(boxGroup.noOfBoxes));
  tr.append($('<td>').html(netWeightOfBox.toFixed(2)));
  tr.append($('<td>').html(grossWeightOfBox.toFixed(2)));
  tr.append($('<td>').html(boxGroup.noOfRollsPerBox));
  tr.append($('<td>').html(boxGroup.lengthPerBox));
  tr.append($('<td>').html(boxGroup.noOfRollsPerBox * boxGroup.noOfBoxes));
  tr.append($('<td>').html(boxGroup.lengthPerBox * boxGroup.noOfBoxes));
  return tr;
}

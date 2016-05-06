function PackingList(order) {
  this.boxCounter = 0;
  this.$order = order;
  this.boxGroups = [];
  this.totalNetWeight = 0;
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
  $tableHead.append($('<th>').html('Box Numbers'))
    .append($('<th>').html('Width(mm)'))
    .append($('<th>').html(''))
    .append($('<th>').html('Thickness(mm)'))
    .append($('<th>').html('Color'))
    .append($('<th>').html('Length(meter)'))
    .append($('<th>').html('No. of Rolls'))
    .append($('<th>').html('Total Meters'))
    .append($('<th>').html('Mtrs In Each Box(meter)'))
    .append($('<th>').html('No of Boxes'))
    .append($('<th>').html('Rolls In Each Box'))
    .append($('<th>').html('Box Weight(Kg)'))
    .append($('<th>').html('Box Length(inch)'))
    .append($('<th>').html('Box Breadth(inch)'))
    .append($('<th>').html('Box Height(inch)'))
    .append($('<th>').html('Net Weight(Kg)'))
    .append($('<th>').html('CVM'));
  $table.append($tableHead);
  var sizes = this.$order.sizes;
  var row = null;
  for(var i in this.boxGroups) {
    row = this.createRow(this.boxGroups[i]);
    $tableBody.append(row);
  }
  var $netWeightRow = $('<h4>', { html: 'Net Weight of Order: ' + (this.totalNetWeight / 1000).toFixed(3) + ' ton' });
  var $grossWeightRow = $('<h4>', { html: 'Gross Weight of Order: ' + ((this.totalNetWeight + 0.9 * this.boxCounter) / 1000).toFixed(3) + ' ton' });
  return $table.append($tableBody.append($netWeightRow).append($grossWeightRow));
}

PackingList.prototype.createRow = function(boxGroup) {
  tr = $('<tr>');
  if(boxGroup.$size.isWireBacked()) {
    tr.css('background-color', 'cyan');
  }
  if(boxGroup.noOfBoxes == 1) {
    var boxNumberString = boxGroup.startingBox;
  } else {
    var boxNumberString = [boxGroup.startingBox, boxGroup.startingBox + boxGroup.noOfBoxes - 1].join(' - ');
  }
  var netWeightOfBox = boxGroup.netWeightOfEachBox;
  this.totalNetWeight += netWeightOfBox * boxGroup.noOfBoxes;
  var grossWeightOfBox = netWeightOfBox + 0.9;
  tr.append($('<td>').html(boxNumberString));
  tr.append($('<td>').html(boxGroup.$size.rollWidth()));
  tr.append($('<td>').html('x'));
  tr.append($('<td>').html(boxGroup.$size.rollThickness()));
  tr.append($('<td>').html('')); //color
  tr.append($('<td>').html(boxGroup.$size.rollLength()));
  tr.append($('<td>').html((boxGroup.noOfRollsPerBox * boxGroup.noOfBoxes).toFixed(2)));
  tr.append($('<td>').html((boxGroup.lengthPerBox * boxGroup.noOfBoxes).toFixed(2)));
  tr.append($('<td>').html(boxGroup.lengthPerBox.toFixed(2)));
  tr.append($('<td>').html(boxGroup.noOfBoxes));
  tr.append($('<td>').html(boxGroup.noOfRollsPerBox.toFixed(2)));
  tr.append($('<td>').html(netWeightOfBox.toFixed(2)));
  tr.append($('<td>').html(boxGroup.boxLength));
  tr.append($('<td>').html(boxGroup.boxWidth));
  tr.append($('<td>').html(boxGroup.boxHeight.toFixed(2)));
  tr.append($('<td>').html(netWeightOfBox.toFixed(2) * boxGroup.noOfBoxes));
  tr.append($('<td>').html((boxGroup.boxLength * boxGroup.boxWidth * boxGroup.boxHeight.toFixed(2) * boxGroup.noOfBoxes * 0.000016387).toFixed(5)));
  return tr;
}

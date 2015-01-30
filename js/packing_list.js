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
  var $table = $('<table>', { class: 'table table-bordered' });
  var $tableHead = $('<thead>');
  var $tableBody = $('<tbody>');
  $table.append($('<th>').html('Box Numbers')).append($('<th>').html('Dimensions'))
    .append($('<th>').html('Total Boxes'));
  var lineItems = this.$order.lineItems;
  var row = null;
  for(var i in lineItems) {
    row = this.createRow(lineItems[i]);
    $tableBody.append(row);
    if(lineItems[i].boxNumbers[3]) {
      row = this.createRow(lineItems[i], true)
      $tableBody.append(row);
    }
  }
  return $table.append($tableBody);
}

PackingList.prototype.createRow = function(lineItem, loneBox) {
  tr = $('<tr>');
  var boxNumbers = lineItem.boxNumbers
  if(loneBox) {
    var boxNumberString = boxNumbers[3].toString();
    var totalBoxes = 1;
  } else {
    var boxNumberString = boxNumbers.slice(0, 3).join(' ');
    var totalBoxes = boxNumbers[2] - boxNumbers[0] + 1;
  }
  tr.append($('<td>').html(boxNumberString));
  var dimensionString = [lineItem.rollWidth(), 'x', lineItem.rollThickness()].join(' ');
  tr.append($('<td>').html(dimensionString));
  tr.append($('<td>').html(totalBoxes));
  return tr;
}

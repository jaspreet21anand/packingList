function Order(orderId) {
  this.$order = $(orderId);
  this.lineItems = [];
}


Order.prototype.bindEvents = function(addButtonId, createPackingListButtonId) {
  var _this = this;
  $(addButtonId).on('click', function() {
    _this.addLineItem();
  });

  $(createPackingListButtonId).on('click', function() {
    _this.createPackingList();
  });
}

Order.prototype.addLineItem = function() {
  var $lineItem = new LineItem();
  this.$order.append($lineItem.$row);
  this.lineItems.push($lineItem);
  $lineItem.$row.get(0).scrollIntoView();
  $lineItem.$row.find('.width').focus();
}

Order.prototype.createPackingList = function() {
  var $packingList = new PackingList(this);
  $packingList.createBoxNumbers();
  var $packingListDiv = $('#packing-list')
  $packingListDiv.empty();
  $packingListDiv.append($packingList.createHtml());
  $packingListDiv.get(0).scrollIntoView();
}

$(function() {
  var order = new Order('#order');
  order.bindEvents('#addRows', '#createList');
  var firstLineItem = new LineItem();
  order.lineItems.push(firstLineItem);
  order.$order.append(firstLineItem.$row)
  firstLineItem.$row.find('.width').focus();
});
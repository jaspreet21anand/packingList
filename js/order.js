function Order(orderId) {
  this.$order = $(orderId);
  this.sizes = [];
}


Order.prototype.bindEvents = function(addButtonId, createPackingListButtonId) {
  var _this = this;
  $(addButtonId).on('click', function() {
    _this.addSize();
  });

  $(createPackingListButtonId).on('click', function() {
    _this.createPackingList();
  });
}

Order.prototype.addSize = function() {
  var $size = new Size();
  this.$order.append($size.$row);
  this.sizes.push($size);
  $size.$row.get(0).scrollIntoView();
  $size.$row.find('.width').focus();
}

Order.prototype.createPackingList = function() {
  var $packingList = new PackingList(this);
  $packingList.createBoxes();
  var $packingListDiv = $('#packing-list')
  $packingListDiv.empty();
  $packingListDiv.append($packingList.createHtml());
  $packingListDiv.get(0).scrollIntoView();
}

$(function() {
  var order = new Order('#order');
  order.bindEvents('#addRows', '#createList');
  var firstSize = new Size();
  order.sizes.push(firstSize);
  order.$order.append(firstSize.$row)
  firstSize.$row.find('.width').focus();
});
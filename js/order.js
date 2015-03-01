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
  var _this = this;
  $size.$row.find('.close').on('click', function() {
    $size.$row.remove();
    _this.sizes.splice(_this.sizes[_this.sizes.indexOf($size)], 1);
  });
}

Order.prototype.createPackingList = function() {
  var $packingList = new PackingList(this);
  $packingList.createBoxes();
  var $packingListDiv = $('<div>', { id: 'packing-list'});
  $packingListDiv.empty();
  $packingListDiv.append($packingList.createHtml());
  var newWindow = window.open('');
  newWindow.document.write('<link rel="stylesheet" href="./css/bootstrap.min.css"><script src="./js/jquery-2.1.3.js"></script>');
  newWindow.document.write($packingListDiv.get(0).outerHTML);
}

$(function() {
  var order = new Order('#order');
  order.bindEvents('#addRows', '#createList');
  var firstSize = new Size();
  order.sizes.push(firstSize);
  order.$order.append(firstSize.$row)
  firstSize.$row.find('.width').focus();
  firstSize.$row.find('.close').on('click', function() {
    firstSize.$row.remove();
    order.sizes.splice(order.sizes[order.sizes.indexOf(firstSize)], 1);
  })
});
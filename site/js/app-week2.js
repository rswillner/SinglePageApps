(function() {

'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {

  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getBuyItems();

  buyList.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyBuyItem(itemIndex);

  };

}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {

  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {

  var service = this;

//List of things to buy

  var itemsToBuy = [
    {name: "choclate chip cookies", quantity: 10},
    {name: "oatmeal cookies", quantity: 10},
    {name: "butter cookies", quantity: 10}
  ];


  var itemsBought = [];

  service.buyBuyItem = function(itemIndex){

    var item = itemsToBuy.splice(itemIndex,1)[0];
    itemsBought.push(item);
    console.log(itemsBought);
  };

  service.getBuyItems = function(){
    return itemsToBuy;
  };

  service.getBoughtItems = function(){
    return itemsBought;
  };

}

})();

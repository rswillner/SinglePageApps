(function(){

  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .component('foundItems', {
    templateUrl: 'foundItems-comp.html',
    controller: FoundItemsComponentController,
    bindings: {
      items: '<',
      onRemove: '&'
    }
  });

  function FoundItemsComponentController(){
    var $ctrl = this;
    
    $ctrl.remove = function(myIndex){
      $ctrl.onRemove({index: myIndex});
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var menu = this;
    menu.foundItems = [];
    menu.search_term = '';

    menu.getMatchingItems = function(){
      MenuSearchService.getMatchedMenuItems(menu.search_term).then(
        function(results){
          menu.foundItems = results;
        });
    };

    menu.removeItem = function(itemIndex){
      MenuSearchService.removeItem(itemIndex, menu.foundItems);
    };

  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http){

    var service = this;

    service.getMatchedMenuItems = function(search_term){
      console.log(search_term);
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function(response){
          var allItems = response.data.menu_items;
          var filteredItems = [];
          allItems.forEach(function(item){
            if (item.description.includes(search_term)) {
              filteredItems.push(item);
            }
          })
          return filteredItems;
      });
    };

    service.removeItem = function(itemIndex, items) {
      var removedItem = items.splice(itemIndex,1);
      console.log(removedItem);
    };
  }


})();

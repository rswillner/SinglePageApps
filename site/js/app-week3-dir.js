(function(){

  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective(){
    var ddo = {
      templateUrl:'templates/foundItems-dir.html',
      scope: {
        items: '<items',
        onRemove: '&',
        found: '<found'
      }
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var menu = this;
    menu.foundItems = [];
    menu.search_term = '';
    menu.found = true;

    menu.getMatchingItems = function(){
      if (menu.search_term === ''){
        menu.found = false;
        menu.foundItems = [];
        return;
      } else {
      MenuSearchService.getMatchedMenuItems(menu.search_term).then(
        function(results){
          menu.foundItems = results;
          if (menu.foundItems.length < 1){
            menu.found = false;
          } else {
            menu.found = true;
          }
        });
      }
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

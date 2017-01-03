(function() {

  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {

    var service = this;

    service.getAllCategories = function() {
      console.log("getAllCategories function invoked");
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/categories.json"
      }).then(function(response) {
          var categories = response.data;
          console.log(categories);
          return categories;
      });
    };

    service.getItemsForCategory = function(categoryShortName) {
      var itemsUrl = ("https://davids-restaurant.herokuapp.com/menu_items.json?category="
        + categoryShortName);
      console.log(itemsUrl);
      return $http({
        method: "GET",
        url: itemsUrl
      }).then(function(response){
          var items = response.data.menu_items;
          console.log(items);
          return items;
      });
    };
  }

}

) ();

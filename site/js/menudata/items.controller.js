(function() {

  'use strict';

  angular.module('data').
    controller('MenuCategoryItemsController', MenuCategoryItemsController);

    MenuCategoryItemsController.$inject = ['items'];
    function MenuCategoryItemsController(items) {

      var category = this;
      console.log("MenuCategoryItemsController invoked");

      category.items = items;
      console.log(category.items);

    }

})();

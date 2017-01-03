(function() {

  'use strict';

  angular.module('data').
    controller('MenuCategoriesController', MenuCategoriesController);

    MenuCategoriesController.$inject = ['categories'];
    function MenuCategoriesController(categories) {

      var menu = this;
      console.log("MenuCategoriesController invoked");

      menu.categories = categories;
      console.log(menu.categories);

    }

})();

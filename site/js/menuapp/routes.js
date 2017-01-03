(function() {

'use strict';

angular.module('MenuApp').config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Set up UI States

  $stateProvider
  // home state page
  .state('home', {
    url: '/',
    templateUrl: 'templates/home-menuapp.template.html'
  })
  //categories state page
  .state('categories', {
    url: '/categories',
    templateUrl: 'templates/categories-menuapp.template.html',
    controller: 'MenuCategoriesController as menu',
    resolve: {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  //items state page
  .state('items', {
    url: '/category-items/{shortName}',
    templateUrl: 'templates/items-menuapp.template.html',
    controller: 'MenuCategoryItemsController as category',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
        function($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.shortName);
      }]
    }
  });


  //Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  //items state page
  console.log('routes configured');
}

}) ();

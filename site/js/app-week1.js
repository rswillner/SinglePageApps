(function () {
'use strict';

angular.module('LunchCounter', [])

.controller('LunchCounterController', function($scope) {
  $scope.feedback = "";
  $scope.listProcessor = function () {
    if ($scope.lunchList == "") {
      $scope.feedback = "Please enter data first";
    }
    else {
      var listCountValue = calculateList($scope.lunchList);

      if (listCountValue <= 3) {
        $scope.feedback = "Enjoy!";
      }
      else {
        $scope.feedback = "Too much!";
      }
    }
  };

  function calculateList(lunchString){
    var listCount = 0;
    var arrayOfStrings = lunchString.split(",");

    listCount = arrayOfStrings.length;
    console.log(listCount);

    return(listCount);
  };

});

})();

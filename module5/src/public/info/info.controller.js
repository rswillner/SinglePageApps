(function() {

"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['infoItems', 'ApiPath'];
function InfoController(infoItems, ApiPath) {

    var $ctrl = this;
    $ctrl.basePath = ApiPath;

    // info.firstName = "";
    // info.lastName = "";
    // info.email = "";
    // info.phone = "";
    // info.favDish = "";
    $ctrl.savedFlag = false;

    if (infoItems.status == "saved") {

        console.log(infoItems.profile);
        $ctrl.firstName = infoItems.profile.firstName;
        $ctrl.lastName = infoItems.profile.lastName;
        $ctrl.email = infoItems.profile.emailAddr;
        $ctrl.phone = infoItems.profile.phoneNumber;
        $ctrl.favDish = infoItems.profile.favDish;
        $ctrl.savedFlag = true;

        if ((infoItems.profile.favDish != undefined) &&
            (infoItems.profile.favDish != "")) {

          console.log(infoItems.favDish);
          $ctrl.dishName = infoItems.favDish.name;
          $ctrl.dishDescription = infoItems.favDish.description;
          $ctrl.dishShortName = infoItems.favDish.short_name;
          console.log($ctrl.dishShortName);
        }

      }

  }

})();

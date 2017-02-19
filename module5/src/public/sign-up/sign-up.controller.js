(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['ProfileService'];
function SignUpController(ProfileService) {
  var $ctrl = this;

  $ctrl.favDishFlag = true;
  $ctrl.infoSavedFlag = false;
  $ctrl.profile = {};

  $ctrl.signUp = function (){
      var profile = {'firstName' : $ctrl.firstName,
                    'lastName' : $ctrl.lastName,
                    'emailAddr' : $ctrl.email,
                    'phoneNumber' : $ctrl.phone,
                    'favDish' : $ctrl.favDish
                };

      ProfileService.validateDish(profile).then(function(status){
        console.log(status);
        if ((status == "validated") || ($ctrl.favDish == undefined) ||
              ($ctrl.favDish == "")) {
          $ctrl.favDishFlag = true;
          $ctrl.infoSavedFlag = ProfileService.setProfile(profile);
        }
        else if (status == "not-found") {
          $ctrl.favDishFlag = false;
          $ctrl.infoSavedFlag = false;
        }
      });
    };
}

})();

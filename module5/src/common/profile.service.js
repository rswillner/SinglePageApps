(function () {

"use strict";

angular.module('common')
.service('ProfileService', ProfileService);


ProfileService.$inject = ['$http', 'ApiPath'];
function ProfileService($http, ApiPath) {
  var service = this;

  console.log(ApiPath);

  service.profileCache = {};
  service.profileStatus = "not-saved";
  service.favDish = {};
  service.dishStatus = "not-saved";
  service.infoItems = {};

  service.validateDish = function(profile) {

    // validate favorite dish

    service.favDish = {};
    var itemsUrl = (ApiPath + "/menu_items/" + profile.favDish + ".json");

    return $http({
      method: "GET",
      url: itemsUrl
      }).then(function(response){
        service.favDish = response.data;
        return service.dishStatus = "validated";
      }, function(response){
        return service.dishStatus = "not-found";
      });

    };

  service.setProfile = function(profile) {

    service.profileCache = profile;
    service.profileStatus = "saved";
    console.log(service.profileCache);
    return true;

    };

  service.getProfile = function(){

    console.log("entering getProfile function");
    console.log(service.profileStatus);

    if (service.profileStatus == "saved") {

      service.infoItems.profile = service.profileCache;

      if (service.dishStatus == "validated") {

      service.infoItems.favDish = service.favDish;

      }

      service.infoItems.status = "saved";
      return service.infoItems;

    } else {

      service.infoItems.status = "not-saved";
      return service.infoItems;

    }

    };

}

})();

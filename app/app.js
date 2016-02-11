(function(root, angular, undefined) {
  
  angular
    .module('app', ['ngMaterial'])
    .config(function($mdIconProvider) {
      $mdIconProvider
         .icon('ui:cake', 'app/icons/cake.svg', 24)
         .iconSet('uiplus', 'app/icons/iconset.svg', 64)
         .iconSet('device', 'app/icons/device-icons.svg', 24);
    });
})(this, angular);

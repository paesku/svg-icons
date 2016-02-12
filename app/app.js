(function(root, angular, undefined) {

  angular
    .module('app', ['ngMaterial'])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('pink') // specify primary color, all
                                // other color intentions will be inherited
                                // from default
    })
    .config(function($mdIconProvider) {
      $mdIconProvider
         .icon('ui:cake', 'app/icons/cake.svg', 24)
         .iconSet('uiplus', 'app/icons/iconset.svg', 64)
         .iconSet('device', 'app/icons/device-icons.svg', 24);
    })
    .run(function($http, $templateCache) {

      var urls = [
        'app/icons/cake.svg',
        'app/icons/iconset.svg',
        'app/icons/device-icons.svg'
      ];

    // Pre-fetch icons sources by URL and cache in the $templateCache...
    // subsequent $http calls will look there first.
    angular.forEach(urls, function(url) {
      $http.get(url, {cache: $templateCache});
    });

  });
})(this, angular);

(function(root, angular, undefined) {

  angular
    .module('app', ['ngMaterial'])
    .controller('AppCtrl', function DemoCtrl($mdDialog) {
      var originatorEv;
      this.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };
    })
    .config(function($mdThemingProvider) {
      var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100'],
         '500': '03A9F4'
      });
      var customGreyMap = 		$mdThemingProvider.extendPalette('blue-grey', {
        '50': 'fafafa'
      });
      // $mdThemingProvider.definePalette('customBlue', customBlueMap);
      // $mdThemingProvider.definePalette('customGrey', customGreyMap);
      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('light-blue')
        .warnPalette('orange')
        .backgroundPalette('grey', {
          'hue-1': '200',
          'hue-2': '50'
        });
      // $mdThemingProvider.theme('input', 'default')
      //   .primaryPalette('grey');
    })
    .config(function($mdIconProvider) {
      $mdIconProvider
         .icon('ui:cake', 'app/icons/cake.svg', 24)
         .iconSet('uiplus', 'app/icons/iconset.svg', 64)
         .iconSet('device', 'app/icons/device-icons.svg', 24)
         .iconSet('symbols', 'app/icons/symbol-icons.svg', 60);
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

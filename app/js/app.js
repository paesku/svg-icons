(function(root, angular, undefined) {

  angular
    .module('app', [
      'ngMaterial',
      'md-colors'
    ])
    .constant('colors', {
      'default': {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': 'f44336',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
      }
    })
    .controller('AppCtrl', function DemoCtrl($mdDialog, colors, $mdColorPalette) {
      this.openMenu = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
      };
      this.active = true;
      // https://jsstyles.github.io/repl/ ;-)
      var $greydark = $mdColorPalette['blue-grey']['900'].value;
      var $greymedium = $mdColorPalette['blue-grey']['800'].value;
      var activeColor = 'rgba(' + $greymedium + ', 0.95)'; //'rgb(' + colors.default['50'].value + ')';
      this.activeItem = {
        'background-color': activeColor
      }

      this.sidenavColor = {
        'background-color': 'rgba(' + $greydark + ', 1)'
      }
    })
    .config(function($mdThemingProvider, colors) {
      <!-- https://material.angularjs.org/latest/Theming/03_configuring_a_theme -->
      var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100'],
         '500': '03A9F4'
      });
      var customGreyMap = 		$mdThemingProvider.extendPalette('blue-grey', {
        '50': 'fafafa'
      });
      // If defining a complete palette all values must be set
      $mdThemingProvider.definePalette('custom-palette', colors.default);
      // Manipulate smaller pieces of a palette
      // $mdThemingProvider.definePalette('customBlue', customBlueMap);
      // $mdThemingProvider.definePalette('customGrey', customGreyMap);
      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('custom-palette')
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

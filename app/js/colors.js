/* Source: https://gist.github.com/SimeonC/1f6b6e52c9b14c4c7b63 */
(function(root, angular, undefined) {
  "use strict";
  /**
   * @ngdoc run
   * @module material.core.color
   *
   * @description
   *  This builds in the css styles to allow use of .md-accent.md-fg to apply the accent class to the foreground (css color attribute).
   *
   *  The two classes are .md-fg and .md-bg to apply color and background-color to the element respectively
   *
   **/

  var _$mdThemingProvider;

  angular
    .module('md-colors', [])
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      _$mdThemingProvider = $mdThemingProvider;
    }])
    .run(['$interpolate', '$document', function($interpolate, $document) {

      function buildCssSelectors(selectors) {
        var result = selectors.join('') + ', ';
        var spaced = [];

        while (selectors.length > 0) {
          spaced.push(selectors.shift());
          result += spaced.join(' ') + ' ' + selectors.join('') + ', ';
        }

        result += spaced.join(' ');
        return result;
      }

      var fgDefault = $interpolate(buildCssSelectors(['.md-{{theme}}-theme', '.md-fg']) + ' { color:{{value}};}');
      var bgDefault = $interpolate(buildCssSelectors(['.md-{{theme}}-theme', '.md-bg']) + ' { background-color:{{value}};}');
      var fgDefaultHue = $interpolate(buildCssSelectors(['.md-{{theme}}-theme', '.md-{{hue}}', '.md-fg']) + ' { color:{{value}};}');
      var bgDefaultHue = $interpolate(buildCssSelectors(['.md-{{theme}}-theme', '.md-{{hue}}', '.md-bg']) + ' { background-color:{{value}};}');
      var fgColor = $interpolate(buildCssSelectors(['.md-{{theme}}-theme', '.md-{{color}}', '.md-fg']) + ' { color:{{value}};}');
      var bgColor = $interpolate(buildCssSelectors(['.md-{{theme}}-theme', '.md-{{color}}', '.md-bg']) + ' { background-color:{{value}};}');
      var fgHue = $interpolate(buildCssSelectors(['.md-{{theme}}-theme', '.md-{{color}}.md-{{hue}}', '.md-fg']) + ' { color:{{value}};}');
      var bgHue = $interpolate(buildCssSelectors(['.md-{{theme}}-theme', '.md-{{color}}.md-{{hue}}', '.md-bg']) + ' { background-color:{{value}};}');
      var customSheet = getStyleSheet();
      var index = 0;

      // clear out old rules from stylesheet
      while (customSheet.cssRules.length > 0) {
        customSheet.deleteRule(0);
      }

      angular.forEach(_$mdThemingProvider._THEMES, function(theme, themeName){
        //Add default selectors - primary is the default palette
        var defaultPalette = 'primary';
        addRule(fgDefault, bgDefault, themeName, defaultPalette, _$mdThemingProvider._PALETTES[theme.colors[defaultPalette].name][theme.colors[defaultPalette].hues.default]);
        addRule(fgDefaultHue,  bgDefaultHue,  themeName,  defaultPalette, _$mdThemingProvider._PALETTES[theme.colors[defaultPalette].name][theme.colors[defaultPalette].hues['hue-2'] ], 'hue-2');
        addRule(fgDefaultHue,  bgDefaultHue,  themeName,  defaultPalette, _$mdThemingProvider._PALETTES[theme.colors[defaultPalette].name][theme.colors[defaultPalette].hues['hue-3'] ], 'hue-3');
        addRule(fgDefaultHue,  bgDefaultHue,  themeName,  defaultPalette, _$mdThemingProvider._PALETTES[theme.colors[defaultPalette].name][theme.colors[defaultPalette].hues['hue-1'] ], 'hue-1');

        //Add selectors for palettes - accent, background, defaultPalette and warn
        angular.forEach(theme.colors, function(color, paletteName){
          addRule(fgColor, bgColor, themeName, paletteName, _$mdThemingProvider._PALETTES[color.name][color.hues.default]);
          addRule(fgHue,  bgHue,  themeName,  paletteName, _$mdThemingProvider._PALETTES[color.name][color.hues['hue-2'] ], 'hue-2');
          addRule(fgHue,  bgHue,  themeName,  paletteName, _$mdThemingProvider._PALETTES[color.name][color.hues['hue-3'] ], 'hue-3');
          addRule(fgHue,  bgHue,  themeName,  paletteName, _$mdThemingProvider._PALETTES[color.name][color.hues['hue-1'] ], 'hue-1');
        });
      });

      function addRule(fgInterpolate, bgInterpolate, themeName, paletteName, colorArray, hueName) {
        // set up interpolation functions to build css rules.
        if (!colorArray) return;
        var colorValue = 'rgb(' + colorArray.value[0] + ',' + colorArray.value[1] + ',' + colorArray.value[2] + ')';
        customSheet.insertRule(fgInterpolate({
          theme: themeName,
          color: paletteName,
          value: colorValue,
          hue: hueName
        }), index);
        index += 1;
        // insert background color rule
        customSheet.insertRule(bgInterpolate({
          theme: themeName,
          color: paletteName,
          value: colorValue,
          hue: hueName
        }), index);
        index += 1;
      }

      function getStyleSheet() {
        // function to ad an dynamic style-sheet to the document
        var style = $document[0].head.querySelector('style[title="Dynamic-Generated-by-$mdColors"]');
        if (style === null) {
          style = $document[0].createElement('style');
          style.title = 'Dynamic-Generated-by-$mdColors';
          // WebKit hack... (not sure if still needed)
          style.appendChild($document[0].createTextNode(''));
          $document[0].head.appendChild(style);
        }
        return style.sheet;
      }
    }]);
})(this, angular);

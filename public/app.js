var app = angular.module('mainApp', ['ngMaterial', 'md.data.table'])
.config(['$mdThemingProvider', function ($mdThemingProvider) {
    'use strict';
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
}])
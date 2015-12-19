var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    .when('/', {
        templateUrl: 'pages/main.htm',
        controller: 'mainController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
});


weatherApp.service('cityService', function () {
    this.city = 'New York, NY';
});


weatherApp.controller('mainController', ['$scope', 'cityService', function ($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });
    
}]);


weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {
    $scope.city = cityService.city;
    
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=870ef7632ae5ad54fcb081a124d1318d', {callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});
    
    $scope.days = $routeParams.days || '2';
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});
    
    $scope.convertToCelcious = function (degK) {
        return (degK - 273.15).toFixed(1);
    };
    
    $scope.convertToDate = function (date) {
        return new Date(date * 1000);
    }
}]);

weatherApp.directive('weatherReport', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/weatherReport.html',
        scope: {
            weatherDay: '=',
            convertToDate: '&',
            convertToStandard: '&',
            dateFormat: '@'
        }
    }
});
weatherApp.controller('mainController', ['$scope', '$location', 'cityService', function ($scope, $location,  cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });
    
    $scope.submit = function () {
        $location.path('/forecast');
    };
    
}]);


weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', 'weatherService', function ($scope,  $routeParams, cityService, weatherService) {
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);
    
    $scope.convertToCelcious = function (degK) {
        return (degK - 273.15).toFixed(1);
    };
    
    
    $scope.convertToDate = function (date) {
        return new Date(date * 1000);
    }
}]);

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

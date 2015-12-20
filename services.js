weatherApp.service('cityService', function () {
    this.city = 'New York, NY';
});

weatherApp.service('weatherService', ['$resource', function ($resource) {
    this.getWeather = function (city, days) {
        var weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=870ef7632ae5ad54fcb081a124d1318d', {callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});
        
        return weatherAPI.get({q: city, cnt: days});
    }
}]);
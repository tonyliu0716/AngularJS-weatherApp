// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', '$location', function($scope, cityService, $location) {
    
    $scope.city = cityService.city;
    $scope.$watch('city', function() {
        
        cityService.city = $scope.city;
        
    });
    
    $scope.submit = function() {
        $location.path("/forecast");
    };
    
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function($scope, cityService, $resource, $routeParams) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days, appid: '2de143494c0b295cca9337e1e96b00e0'});
    
    $scope.convertToFahrenheit = function(degk) {
        
        return Math.round((1.8 * (degk - 273)) + 32);
        
    }
    
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);
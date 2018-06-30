var app = angular.module('hanCoApp', [
    'ngRoute',
    'ngCookies'
]);

app.constant('REST_URI', 'http://localhost:8000/hanCo');

app.factory('httpRequestInterceptor', function ($rootScope) {
    return {
        request: function (config) {

            config.headers['x-auth-token'] = $rootScope.token;
            config.headers['Accept'] = 'application/json;odata=verbose';

            return config;
        }
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});
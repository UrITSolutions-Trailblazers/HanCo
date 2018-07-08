app.controller('navController', ['$scope', '$rootScope', '$cookies', '$http', 'REST_URI',
    function ($scope, $rootScope, $cookies, $http, REST_URI) {

        $rootScope.currentUser = $cookies.getObject('currentUser');
        $rootScope.imageUrl = 'http://localhost:8000';
    
        $scope.$on('$routeChangeSuccess', function () {

            $http.get(REST_URI + '/supplier/category').then(
                (res) => {
                    console.log('Got all categories.')
                    $rootScope.categories = res.data;
                    $(document).ready(function () {
                        $('.modal').modal();
                        $('select').formSelect();
                    });
                    console.log('select inistialized.')
                },
                (err) => {
                    console.log(err);
                }
            );
        });

        $scope.logout = function () {
            $cookies.remove('currentUser');
            $rootScope.currentUser = undefined;
        }

        $rootScope.categories = [];

    }
])
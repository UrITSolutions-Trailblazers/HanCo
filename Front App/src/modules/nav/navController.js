app.controller('navController', ['$scope', '$rootScope', '$cookies', '$http', 'REST_URI',
    function ($scope, $rootScope, $cookies, $http, REST_URI) {

        $rootScope.currentUser = $cookies.getObject('currentUser');
        $rootScope.imageUrl = 'http://localhost:8000';
        
        $rootScope.scaleToggle = 'scale-out'

        var me = this;

        $scope.$on('$routeChangeSuccess', function () {

            $http.get(REST_URI + '/user/category').then(
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
            $cookies.remove('token');
            $rootScope.currentUser = undefined;
            $rootScope.token = undefined;
        }

        $rootScope.categories = [];

        me.loginCard = function(){
            if($rootScope.scaleToggle === 'scale-out') $rootScope.scaleToggle = 'scale-in'
            else $rootScope.scaleToggle = 'scale-out'
        }

    }
])
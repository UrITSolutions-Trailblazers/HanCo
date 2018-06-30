app.controller('userController', ['$scope', '$rootScope', '$cookies', '$http', 'REST_URI',
    function ($scope, $rootScope, $cookies, $http, REST_URI) {

        $scope.user = {};

        $scope.register = function () {

            // console.log($scope.user)
            $http.post(REST_URI + '/user', $scope.user).then(
                (res) => {
                    $scope.user = {};
                },
                (err) => {
                    // console.log(err.data);
                    if (err.data.code === 11000) {
                        // console.log('E-Mail or phone number is already registerd with us.');
                        alert('E-Mail or phone number is already registerd with us.');
                    } else {
                        $scope.user = {};
                        alert('Oops something went wrong. Please try again')
                    }
                })

        }
    }
]);
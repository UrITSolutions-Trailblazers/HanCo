app.controller('userController', ['$scope', '$rootScope', '$cookies', '$http', 'REST_URI',
    function ($scope, $rootScope, $cookies, $http, REST_URI) {

        $scope.user = {};
        $scope.isLoader = false;

        $scope.register = function () {
            // console.log($scope.user)
            $scope.isLoader = true;
            $http.post(REST_URI + '/user', $scope.user).then(
                (res) => {
                    $('#registerModal').modal('close');
                    $scope.isLoader = false;
                    M.toast({ html: 'You have successfully registered.' })
                    $scope.user = {};
                },
                (err) => {
                    $scope.password = '';
                    $scope.isLoader = false;
                    // console.log(err.data);
                    if (err.data.code === 11000) {
                        // console.log('E-Mail or phone number is already registerd with us.');
                        M.toast({ html: 'E-Mail or phone number is already registerd with us.' })
                    } else {
                        $scope.user = {};
                        M.toast({ html: 'Oops something went wrong. Please try again.' })
                        $('#registerModal').modal('close');
                    }
                }
            )
        }

        $scope.login = function () {
            $scope.isLoader = true;
            $http.post(REST_URI + '/user/login', $scope.user).then(
                (res) => {
                    $rootScope.currentUser = res.data.user;
                    $rootScope.token = res.data.token;
                    $cookies.putObject('token', res.data.token);
                    $cookies.putObject('currentUser', $scope.currentUser);
                    M.toast({ html: 'Hi '+$rootScope.currentUser.firstName })
                    $scope.user = {};
                    $scope.isLoader = false;
                },
                (err) => {
                    $scope.isLoader = false;
                    M.toast({ html: 'Wrong credentials.' })
                    $scope.user.password = '';
                    console.error(err);
                    $('#registerModal').modal('open');
                }
            )
        }
    }
]);
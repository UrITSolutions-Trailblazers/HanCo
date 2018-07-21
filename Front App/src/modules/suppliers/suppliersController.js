app.controller('suppliersController', ['$scope', '$rootScope', '$cookies', '$http', 'REST_URI', 'Upload',
    function ($scope, $rootScope, $cookies, $http, REST_URI, Upload) {
        $scope.category = {};
        $scope.product = {};
        $scope.images;
        $scope.products = [];
        $scope.selected = [];
        $scope.productLoader = false;
        $scope.orders = [];

        var me = this;

        me.dispatch = {};
        me.dispatchLoader = false;

        var index;

        getAllProducts();
        getOrders();

        function getAllProducts() {
            $http.get(REST_URI + '/supplier/products').then(
                (res) => {
                    $scope.products = res.data;
                },
                (err) => {
                    console.log(err);
                }
            );
        }

        $scope.setCurrentOrder = function (i) {
            index = i;
        }

        function getOrders() {
            $http.get(REST_URI + '/supplier/orders').then(
                (res) => {
                    $scope.orders = res.data;
                    console.info($scope.orders);
                },
                (err) => {
                    console.log(err);
                }
            );
        }

        $scope.edit = function (i) {
            $scope.product = $scope.products[i];
            $scope.active = 'active';
            $scope.selected[i] = 'selected';
        }

        $scope.addCategory = function () {
            $http.post(REST_URI + '/supplier/category', $scope.category).then(
                (res) => {
                    $rootScope.categories = res.data;
                    $scope.category = {};
                    M.toast({ html: 'Category Added' })
                },
                (err) => {
                    if (err.data.code === 11000) {
                        M.toast({ html: 'Category you entered is already in the DB.' })
                        console.log('Category you entered is already in the DB.')
                    }
                }
            );
        }

        $scope.addProduct = function () {
            $scope.productLoader = true;
            $scope.product.images = [];
            $scope.product.supplier = $rootScope.currentUser._id;
            // console.log($scope.product);
            Upload.upload({
                url: REST_URI + '/supplier/product/image/upload',
                data: $scope.product
            }).then((res) => {
                $scope.productLoader = false;
                $scope.product = {};
                M.toast({ html: 'Product Added.' })
                getAllProducts();
            }, (err) => {
                $scope.productLoader = false;
                M.toast({ html: 'Something went wrong' })
                console.log(err);
            });
        }

        $scope.pack = function (id) {
            $http.post(REST_URI + '/supplier/pack', { id: $scope.orders[id]._id }).then(
                (res) => {
                    $scope.orders[id].cartItem.isPacked = true;
                    M.toast({ html: 'Done' })
                },
                (err) => {
                    M.toast({ html: 'Something went wrong' })
                    console.log(err);

                }
            );
        }

        me.dispatch = function () {
            me.dispatchLoader = true;
            $http.post(REST_URI + '/supplier/dispatch', {
                id: $scope.orders[index]._id,
                courierName: me.dispatch.courierName,
                trackingId: me.dispatch.trackingId
            }).then(
                (res) => {
                    $scope.orders[index].cartItem.isShipped = true;
                    $('#dispatchModal').modal('close')
                    me.dispatchLoader = false;
                    M.toast({ html: 'Done' })
                },
                (err) => {
                    me.dispatchLoader = false;
                    M.toast({ html: 'Something went wrong' })
                    console.log(err);

                }
            );
        }

        $scope.approve = function (id) {
            $http.post(REST_URI + '/supplier/confirm', { id: $scope.orders[id]._id }).then(
                (res) => {
                    $scope.orders[id].cartItem.isApproved = true;
                    M.toast({ html: 'Confirmed' })
                },
                (err) => {
                    M.toast({ html: 'Something went wrong' })
                    console.log(err);

                }
            );
        }
    }
])
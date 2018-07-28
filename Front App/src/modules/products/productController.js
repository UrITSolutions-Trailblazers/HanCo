app.controller('productController', ['$scope', '$rootScope', '$http', 'REST_URI', '$location', '$cookies', '$route',
    function ($scope, $rootScope, $http, REST_URI, $location, $cookies, $route) {

        $rootScope.css = '-fixed';
        var me = this;
        me.products = [];
        me.filter = {};
        me.currentPath = '';
        me.productsLoader = false;
        me.count;
        me.maxPage;
        me.pages = [];
        me.currentPage = 1;
        me.prev = false;
        me.next = true;

        var section = $route.current.params.category;

        var productId = $route.current.params.productId;
        // console.log($route.current.$$route.originalPath);

        me.filter = {
            section: section
        };
        me.currentPath = $route.current.$$route.originalPath;

        if (me.currentPath === '/products' || section) { getAllProducts(); }
        else if (productId) getProductById(productId);

        me.filterProducts = function () {
            me.currentPage = 1;
            me.products = [];
            getAllProducts();
            me.prev = false;
            me.next = true;    
        }

        me.nextPage = function(){
            if(me.currentPage === me.maxPage) return;
            me.products = [];
            me.currentPage = me.currentPage + 1;
            getAllProducts();
            me.prev = true;
        }

        me.previousPage = function(){
            if(me.currentPage === 1) return;
            me.products = [];
            me.currentPage = me.currentPage - 1;
            getAllProducts();
            if(me.currentPage === me.maxPage) me.next = false;
        }

        function getAllProducts() {
            me.productsLoader = true;
            let filter = { filter: me.filter };
            filter.page = me.currentPage;
            $http.post(REST_URI + '/user/products', filter).then(
                (res) => {
                    me.productsLoader = false;
                    me.products = res.data.products;
                    me.count = res.data.count;
                    let maxPage = me.count / 24;
                    me.maxPage = Math.ceil(maxPage)
                    for (let index = 0; index < me.maxPage; index++) {
                        me.pages[index] = index + 1;
                    }
                    // console.log(me.maxPage);
                },
                (err) => {
                    me.productsLoader = false;
                    console.log(err);
                }
            );
        }

        function getProductById(id) {
            $http.post(REST_URI + '/user/product', { id: id }).then(
                (res) => {
                    // console.log(res.data)
                    me.currentProduct = res.data;
                },
                (err) => {
                    console.log(err);
                }
            );
        }

        $scope.addToCart = function (id, supplier) {
            $http.post(REST_URI + '/profile/addToCart', { id: id, supplier: supplier }).then(
                (res) => {
                    M.toast({ html: 'Added to Cart.' })
                },
                (err) => {
                    console.log(err);
                    M.toast({ html: 'Something went wrong.' })
                }
            );
        }
    }
]);
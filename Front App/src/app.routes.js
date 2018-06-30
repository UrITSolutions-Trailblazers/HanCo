/**
 * Angular Routes
 */
app.config(function ($routeProvider) {
    console.log('Angular Route active.')
    $routeProvider
        .when('/home', {
            templateUrl: './src/modules/home/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl'
        })
        .when('/admin', {
            templateUrl: './src/modules/admin/admin.html'
        })
        .when('/suppliers', {
            templateUrl: './src/modules/suppliers/suppliers.html'
        })
        .when('/product/:id',{
            templateUrl: './src/modules/products/product.html'
        })
        .when('/cart',{
            templateUrl: './src/modules/cart/cart.html'
        })
        .when('/about',{
            templateUrl: './src/modules/about/about.html'
        })
        .when('/products', {
            templateUrl: './src/modules/products/products.html'
        })
})


/**
 * Angular Routes
 */
app.config(function ($routeProvider) {
    console.log('Angular Route active.')
    $routeProvider
        .when('/home', {
            templateUrl: './src/modules/home/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl',
            css: './asset/css/myCSS.css'
        })
        .when('/admin', {
            templateUrl: './src/modules/admin/admin.html',
            controller: 'adminController',
            controllerAs: 'adminCtrl',
            css: './asset/css/otherCSS.css'
        })
        .when('/suppliers', {
            templateUrl: './src/modules/suppliers/suppliers.html',
            controller: 'suppliersController',
            controllerAs: 'suppliersCtrl',
            css: './asset/css/otherCSS.css'
        })
        .when('/product/:id',{
            templateUrl: './src/modules/products/product.html',
            controller: 'productController',
            controllerAs: 'productCtrl',
            css: './asset/css/otherCSS.css'
        })
        .when('/cart',{
            templateUrl: './src/modules/cart/cart.html'
        })
        .when('/about',{
            templateUrl: './src/modules/about/about.html'
        })
        .when('/products', {
            templateUrl: './src/modules/products/products.html',
            controller: 'productController',
            controllerAs: 'productCtrl',
            css: './asset/css/productCSS.css'
        })
})


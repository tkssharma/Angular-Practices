
(function(){

  /**
   * @ndgdoc Module
   * @name todo
   *@description
   * This is main module of this app
   **/
  angular.module("Mainapp",["ngRoute",'ngResource' ,'ngSanitize']);
  /**
   * @ndgdoc controller
   * @name todo.controller : CartController
   *@description
   * This is main module of this app
   **/


  angular.module("Mainapp").config(config);

  function config ($routeProvider){
    $routeProvider
    .when('/sample1',{
      controller: 'sample1Controller',
      templateUrl: 'src/partials/sample1.html'
    }).

    when('/login', {
      templateUrl: 'src/partials/login.html',
      controller: 'LoginController'
    }).

    when('/home', {
      templateUrl: 'src/partials/home.html',
      controller: 'HomeController'
    }).
    when('/sample2',{
      controller: 'sample2Controller',
      templateUrl: 'src/partials/sample2.html'
    }).
    when('/sample3',{
      controller: 'sample3Controller',
      templateUrl: 'src/partials/sample3.html'
    }).
    when('/sample5',{
      controller: 'sample5Controller',
      templateUrl: 'src/partials/sample5.html'
    })
    .otherwise({redirectTo:'/login'});

  }


  /**
   * @ndgdoc directive
   * @name todo.dontroller : pageHeader
   *@description
   * This is main module of this app
   **/

  /**
   * @ndgdoc directive
   * @name todo.dontroller : pageFooter
   *@description
   * This is main module of this app
   **/


  angular.module("Mainapp").directive("pageHeader", function() {
    return {
      restrict: 'E',
      templateUrl: "src/directives/page-header.html"
    };
  });

  angular.module("Mainapp").directive("pageFooter", function() {
    return {
      restrict: 'E',
      templateUrl: "src/directives/page-footer.html"
    };
  });


  var app = angular.module("Mainapp");



  app.run(function($rootScope, $location, AuthenticationService, FlashService) {
    var routesThatRequireAuth = ['/home'];

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if(!AuthenticationService.isLoggedIn()) {
        $location.path('/login');
        FlashService.show("Please log in to continue.");
      }
    });
  });



  app.factory("FlashService", function($rootScope) {
    return {
      show: function(message) {
        $rootScope.flash = message;
      },
      clear: function() {
        $rootScope.flash = "";
      }
    }
  });

  app.factory("SessionService", function() {
    return {
      get: function(key) {
        return sessionStorage.getItem(key);
      },
      set: function(key, val) {
        return sessionStorage.setItem(key, val);
      },
      unset: function(key) {
        return sessionStorage.removeItem(key);
      }
    }
  });

  app.factory("AuthenticationService", function($http, $sanitize, SessionService, FlashService , $q , $resource) {

      var AuthenticationService = {};

    var cacheSession   = function() {
      SessionService.set('authenticated', true);
    };

    var uncacheSession = function() {
      SessionService.unset('authenticated');
    };

    var loginError = function(response) {
      FlashService.show(response.flash);
    };

    var sanitizeCredentials = function(credentials) {
      return {
        email: $sanitize(credentials.email),
        password: $sanitize(credentials.password),

      };
    };
    AuthenticationService.login = function () 
    {
      var deferredObject = $q.defer();

      $resource('/rest/api/auth/login')
      .get()
      .$promise
      .then(function(result) {
        deferredObject.resolve(result);
         cacheSession();
      }, function(errorMsg) {
        deferredObject.reject(errorMsg);
      });

      return deferredObject.promise;

    };

    AuthenticationService.logout = function () 
    {
      var deferredObject = $q.defer();

      $resource('/rest/api/auth/logout')
      .get()
      .$promise
      .then(function(result) {
        deferredObject.resolve(result);
        uncacheSession();
      }, function(errorMsg) {
        deferredObject.reject(errorMsg);
      });

      return deferredObject.promise;

    };

    AuthenticationService.isLoggedIn = function () 
    {

      return SessionService.get('authenticated');
    };

    return  AuthenticationService ;

  });

  app.controller("LoginController", function($scope, $location, AuthenticationService ,FlashService ) {
    $scope.credentials = { email: "", password: "" };

    $scope.login = function() {
      AuthenticationService.login().then(function( result ) {
       $location.path("/home");
      }, function(error) {
       FlashService.show("invalid ...");
      });
    };
  });



  app.controller("HomeController", function($scope, $location, AuthenticationService) {
    $scope.title = "Angular";
    $scope.message = "Mouse Over these images to see a directive at work!";

    $scope.logout = function() {
      AuthenticationService.logout().then(function( result ) {
      
         $location.path("/login");
      }, function(error) {

      });
    };
  });

  app.directive("showsMessageWhenHovered", function() {
    return {
      restrict: "A", // A = Attribute, C = CSS Class, E = HTML Element, M = HTML Comment
      link: function(scope, element, attributes) {
        var originalMessage = scope.message;
        element.bind("mouseenter", function() {
          scope.message = attributes.message;
          scope.$apply();
        });
        element.bind("mouseleave", function() {
          scope.message = originalMessage;
          scope.$apply();
        });
      }
    };
  });




})();





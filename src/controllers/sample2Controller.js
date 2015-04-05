(function(){

    angular
    .module('Mainapp')
    .controller("sample2Controller" ,sample2Controller)
    .factory("liferayFetchService",liferayFetchService);
    
    liferayFetchService.$inject = ['$http','$q','$resource'];
    function liferayFetchService($http,$q,$resource)
    {
        var liferayFetchService = {};
        liferayFetchService.someValue = '';
        liferayFetchService.liferayobjects = function () 
        {
            var deferredObject = $q.defer();

            $resource('http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&pretty=true')
            .query()
            .$promise
            .then(function(result) {
                deferredObject.resolve(result);
            }, function(errorMsg) {
                deferredObject.reject(errorMsg);
            });

            return deferredObject.promise;

        };
        return liferayFetchService;
    }
    sample2Controller.$inject = ['$scope','liferayFetchService']
    function sample2Controller($scope,liferayFetchService)
    {
        liferayFetchService.liferayobjects().then(function( result ) {
            $scope.isLoaded = true;
            $scope.result = result;
            console.log(result);
        }, function(error) {
            $scope.error = 'has failed... ' + error;
        });

    }




})();
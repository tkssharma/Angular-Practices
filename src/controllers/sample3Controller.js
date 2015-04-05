(function(){

    angular
    .module('Mainapp')
    .controller("sample3Controller" ,sample3Controller);
     sample3Controller.$inject = ['$scope', '$http', '$log', '$timeout'];


function  sample3Controller ($scope, $http, $log, $timeout) {
    // Form submit handler.
    $scope.submit = function(form) {
        // Trigger validation flag.
        $scope.submitted = true;
        $scope.reponse = "reponse from request";
        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }



        var dataObj = {
                name : $scope.name,
                email : $scope.email,
                password : $scope.password,
                address : $scope.address,
                comments : $scope.comments
        };

        $http({
            method  : 'GET',
            url     : 'savememberinfo',
  
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .success(function(data) {
            $scope.reponse = data; 
            $scope.name = null;
            $scope.email = null;
            $scope.password = null;
            $scope.address = null;
            $scope.comments = null;
            $scope.messages = 'Request has been process successfully....'+data;
            $scope.submitted = false;
            $log.info(data);



        })
        .error(function(data) {
            $scope.progress = data;
            $scope.messages = 'There was a network error. Try again later.';
            $log.error(data);
            $log.info(data);
        })
        .finally(function() {


        });


    };
 }





})();



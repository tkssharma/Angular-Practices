angular.module('Mainapp').controller('sample5Controller', function($scope,$http){


    $scope.contents = null
    $http.get('./sample.json').success(function(data){
       $scope.contents = data;
    });

    $scope.isTypeText = function(value) {

    if (value == "text" )
      return true;
    else 
      return false;

    };

     $scope.isTypeCheckText = function(value) {

    if (value == "checkbox" )
      return true;
    else 
      return false;

    };


     $scope.isTypeRadioText = function(value) {

    if (value == "radio" )
      return true;
    else 
      return false;

    };


});
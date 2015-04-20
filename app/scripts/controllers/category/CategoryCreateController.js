/**
 * Created by gkaimakas on 4/19/15.
 */

angular.module('eventioWebApp')
.controller('CategoryCreateController', [
        '$scope',
        'locales',
        'Restangular',
        function($scope, locales, Restangular){
            console.log(locales);

            $scope.supportedLocales = locales;
            $scope.addedLocales = [];

            $scope.additionalLocales = [];
            $scope.additionalValues = [];


            $scope.addAdditionalLocale = function(){
                $scope.addedLocales.push((new Date()).getTime());
            };

            $scope.removeAdditionalLocale = function(index){
                $scope.addedLocales.splice(index, 1);
                $scope.additionalLocales.splice(index,1);
                $scope.additionalValues.splice(index,1);
            };
        }
    ]);
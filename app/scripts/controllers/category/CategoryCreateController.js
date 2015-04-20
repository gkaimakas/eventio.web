/**
 * Created by gkaimakas on 4/19/15.
 */

angular.module('eventioWebApp')
.controller('CategoryCreateController', [
        '$scope',
        'locales',
        'Restangular',
        '$mdToast',
        function($scope, locales, Restangular, $mdToast){
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

            $scope.category = {};
            $scope.submit = function(form, data){
                console.log(data);

                $mdToast.show(
                    $mdToast.simple()
                        .content('Simple Toast!')
                        .position('bottom left')
                        .hideDelay(3000)
                );
                Restangular
                    .all('category')
                    .post(data)
                    .then(function(res){
                       console.log(res);
                    });
            }
        }
    ]);
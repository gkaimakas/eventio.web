/**
 * Created by gkaimakas on 4/19/15.
 */

angular.module('eventioWebApp')
    .controller('AdminLayoutController', [
        '$scope',
        '$mdSidenav',
        function ($scope, $mdSidenav) {
            console.log("AdminLayoutController");

            $scope.toggleSidenav = function(){
                return $mdSidenav('left').toggle()
                    .then(function(){
                        console.log('ok');
                    });
            }
        }]);

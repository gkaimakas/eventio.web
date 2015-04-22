/**
 * Created by gkaimakas on 4/19/15.
 */
'use strict';
angular.module('eventioWebApp')
    .controller('AdminLayoutController', [
        '$scope',
        '$mdSidenav',
        function ($scope, $mdSidenav) {
            $scope.toggleSidenav = function(){
                return $mdSidenav('left').toggle()
                    .then(function(){
                        console.log('ok');
                    });
            };
        }]);

/**
 * Created by gkaimakas on 4/22/15.
 */
'use strict';
angular.module('eventioWebApp')
    .service('i18nService', [function(){
        return {
            i18n : function(values, locales){
                var obj = {};

                for(var i=0; i< locales.length; i++){
                    obj[locales[i]] = values[i];
                }
                return obj;
            }
        };
    }]);

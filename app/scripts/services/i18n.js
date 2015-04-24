/**
 * Created by gkaimakas on 4/22/15.
 */
'use strict';
angular.module('eventioWebApp')
    .service('i18nService', [function(){
        return {
            serializeToJSON : function(values, locales){
                var obj = {};

                for(var i=0; i< locales.length; i++){
                    obj[locales[i]] = values[i];
                }
                return obj;
            },

            deserializeFromJSON : function(i18nObj, localeToBeRemoved){
                var obj = {
                    locales : [],
                    values : []
                };

                for(var key in i18nObj){
                    if(localeToBeRemoved && localeToBeRemoved === key){
                        continue;
                    }

                    obj.locales.push(key);
                    obj.values.push(i18nObj[key]);
                }

                return obj;
            }
        };
    }]);

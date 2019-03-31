app.factory('httpFactory', function($http, $q, $rootScope) {
    $rootScope.BASE_URL ="http://blr2devlp0933:5000/api";
    return {
        post: function(api,data,headers) {
            var dfd = $q.defer();
            var postUrl = $rootScope.BASE_URL+api;
           // console.log(postUrl);
            //var postUrl=api;
            $http({
                method: 'POST',
                url: postUrl,
                data: data,
                headers: headers
            }).
            then(function(data) {
                dfd.resolve(data);
            },function(error){
                dfd.resolve(error);
            });
            return dfd.promise;
        },
        get: function(api) {
            var dfd = $q.defer();
            var getUrl = $rootScope.BASE_URL+api;
            //console.log("getUrl"+getUrl);
            //var getUrl=api;
            $http({
                method: 'GET',
                url: getUrl
            }).
            then(function(data, status, headers, config) {
                dfd.resolve(data);
            },function(error){
                dfd.resolve(error);
            });
           /* error(function(data, status, headers, config) {
                dfd.reject(data);
            });*/
            var j = dfd.promise.then(function(data) {
                return data;
            })
            return dfd.promise;
        },
        put:function(api,data,userName){
            var dfd = $q.defer();
            var puttUrl = $rootScope.BASE_URL+api;
            $http({
            method: 'PUT',
            url: puttUrl,
            headers: {"Content-Type": "application/json"},
            data: data
        }).
            then(function(data) {
                console.log(data);
                dfd.resolve(data);
            },function(error){
                console.log(error);
                dfd.resolve(error);
            });
            return dfd.promise;
        },
        dataValidation: function(responceData) {
            if (responceData.status == 200) {
                return true;
            }  
            else {
                return false;
            }
        }
    };
});

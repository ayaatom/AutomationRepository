app.service('loginService', function($http,AUTOMATION_CONSTANTS) {
console.log('loginService loaded');
  var status = "";
 this.verifyUser = function(userObj) {
  $http.post(AUTOMATION_CONSTANTS.LOGIN_SERVICE+'/verifyUser', userObj).
    success(function(data, status, headers, config) {
    	status = "SUCCESS";
    	return status;
    }).
    error(function(data, status, headers, config) {
    	status = "ERROR";
    	return status;
    });
 };

});
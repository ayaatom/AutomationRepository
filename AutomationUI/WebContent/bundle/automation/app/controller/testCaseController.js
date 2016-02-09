app.controller('TestCaseCtrl', function($scope, NgTableParams, $http, $rootScope, ngDialog, 
		testCaseService, $location, $timeout,AUTOMATION_CONSTANTS) {
	
	$scope.applicationName = $rootScope.applicationName;
	$scope.applicationId = $rootScope.applicationId;
$http.defaults.headers.common.Authorization = $rootScope.token;
$scope.data = [];
var tcLoaded = false;
$scope.init = function () {
	$rootScope.clearMsgs();
	console.log("test case controller init = " +tcLoaded);
	if(!tcLoaded) {
		loadTestCase();
	}
};

function loadTestCase() {
	var testCaseResult = testCaseService.getTestCaseList();
	testCaseResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   console.log("test case length = "+testCaseService.getTestCaseLength());
	   console.log("test case  = "+testCaseService.getTestCases());
	   $scope.data = result; 
	   tcLoaded = true;
	}
	});
};

$scope.newTestCase = function () {
	$rootScope.clearMsgs();
				$rootScope.theme = 'ngdialog-theme-plain custom-width';
				ngDialog.open({
					template: 'testCaseDialog',
					controller: 'TestCaseCtrl',
					className: 'ngdialog-theme-default custom-width'
				});
			};

$scope.addTestCase = function() {
	$rootScope.clearMsgs();
	console.log("add test case ");
	console.log("addTestCase 1 test case length = "+$scope.data.length);
	var newObj = {
		"testCaseName": $scope.testCaseName,
		"testCaseId": "TC"+testCaseService.getTestCaseLength()+1,
		"applicationName": $scope.applicationName,
		"applicationId": $scope.applicationId,
		"createdBy": $rootScope.username,
		"createdDate": new Date()  
    };
	testCaseService.addTestCase(newObj,$scope);
	console.log("addTestCase 2 test case length = "+$scope.data.length);
	ngDialog.close();
};

$scope.removeTestCase = function (testCase) {
	$rootScope.clearMsgs();
    var index = -1;	
    for( var i = 0; i < $scope.data.length; i++ ) {
		  if( $scope.data[i].testCaseId === testCase.testCaseId ) {
			  index = i;
			  break;
		  }
	  }
	  if( index === -1 ) {
		  alert( "Something gone wrong" );
	  }
	  $scope.data.splice(index, 1);
	  testCaseService.removeTestCase(testCase);
};

$scope.updateTestCase = function (testCase) {
	$rootScope.clearMsgs();
	testCase.$edit = false;
    testCaseService.updateTestCase(testCase);
};

});//End TestCaseCtrl

function jsonp_callback(data) {
    // var el = document.getElementById('ctl');
    // var scope = angular.element(el).scope();
    // scope.$apply(function() {
        // scope.data = JSON.stringify(data);
    // });
//var test = JSON.stringify(data);
console.log("json callback");
console.log(data);
}
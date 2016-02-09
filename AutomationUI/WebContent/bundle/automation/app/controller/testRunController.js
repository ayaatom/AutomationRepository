app.controller('TestRunCtrl', function($scope, NgTableParams, $http, $rootScope, ngDialog, 
		testRunService, $location, $timeout,AUTOMATION_CONSTANTS) {

	$scope.applicationName = $rootScope.applicationName;
	$scope.applicationId = $rootScope.applicationId;
$scope.data = [];
var trLoaded = false;
$scope.init = function () {
	$rootScope.clearMsgs();
	console.log("test run controller init = " +trLoaded);
	if(!trLoaded) {
		loadTestRun();
	}
};

function loadTestRun() {
	var testRunResult = testRunService.getTestRunList();
	testRunResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   console.log("test run length = "+testRunService.getTestRunLength());
	   $scope.data = result; 
	   trLoaded = true;
	}
	});
};

$scope.newTestRun = function () {
	 $rootScope.clearMsgs();
	$rootScope.theme = 'ngdialog-theme-plain custom-width';
	ngDialog.open({
		template: 'testRunDialog',
		controller: 'TestRunCtrl',
		className: 'ngdialog-theme-default custom-width'
	});
};

$scope.addTestRun = function() {
	 $rootScope.clearMsgs();
	console.log("add test Run");
	var newObj = {
		"testRunName": $scope.testRunName,
		"testRunId": "TR"+testRunService.getTestRunLength()+1,
		"applicationName": $scope.applicationName,
		"applicationId": $scope.applicationId,
		"createdBy": $rootScope.username,
		"createdDate": new Date()  
    };
	testRunService.addTestRun(newObj, $scope);
	ngDialog.close();
};

$scope.removeTestRun = function (testRun) {
	 $rootScope.clearMsgs();
    var index = -1;	
    for( var i = 0; i < $scope.data.length; i++ ) {
		  if( $scope.data[i].testRunId === testRun.testRunId ) {
			  index = i;
			  break;
		  }
	  }
	  if( index === -1 ) {
		  alert( "Something gone wrong" );
	  }
	  $scope.data.splice(index, 1);
	  testRunService.removeTestRun(testRun);
};

$scope.updateTestRun = function (testRun) {
	 $rootScope.clearMsgs();
	testRun.$edit = false;
    testRunService.updateTestRun(testRun);
};


});//End TestRunCtrl
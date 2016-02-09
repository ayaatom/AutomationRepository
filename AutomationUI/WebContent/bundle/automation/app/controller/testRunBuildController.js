app.controller('TestRunBuildCtrl', function($scope, NgTableParams, $http, $rootScope, ngDialog, 
		testRunBuildService, $location, $timeout,AUTOMATION_CONSTANTS) {

	$scope.applicationName = $rootScope.applicationName;
	$scope.applicationId = $rootScope.applicationId;
$scope.trBuildData = [];
var trBuildLoaded = false;
$scope.init = function () {
	$rootScope.clearMsgs();
	console.log("test run build controller init = " +trBuildLoaded);
	if(!trBuildLoaded) {
		loadTestRunBuild();
	}
};

function loadTestRunBuild() {
	var testRunBuildResult = testRunBuildService.getTestRunBuildList();
	testRunBuildResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   console.log("test run build length = "+testRunBuildService.getTestRunBuildLength());
	   $scope.trBuildData = result; 
	   trBuildLoaded = true;
	}
	});
};

$scope.newTestRunBuild = function () {
	 $rootScope.clearMsgs();
	$rootScope.theme = 'ngdialog-theme-plain custom-width';
	ngDialog.open({
		template: 'testRunBuildDialog',
		controller: 'TestRunBuildCtrl',
		className: 'ngdialog-theme-default custom-width'
	});
};

$scope.addTestRunBuild = function() {
	 $rootScope.clearMsgs();
	console.log("add test Run Build");
	var newObj = {
		"testRunBuildName": $scope.testRunBuildName,
		"testRunBuildId": testRunBuildService.getTestRunBuildLength()+1,
		"applicationName": $scope.applicationName,
		"applicationId": $scope.applicationId,
		"createdBy": $rootScope.username,
		"createdDate": new Date()  
    };
	testRunBuildService.addTestRunBuild(newObj, $scope);
	ngDialog.close();
};

$scope.navigateToBuildDetail = function(testRunBuild) {
	$rootScope.testRunBuildId = testRunBuild.testRunBuildId;
	$rootScope.testRunBuildName = testRunBuild.testRunBuildName;
	$location.path('/testRunBuildDetail');
};

$scope.removeTestRunBuild = function (testRunBuild) {
	 $rootScope.clearMsgs();
    var index = -1;	
    for( var i = 0; i < $scope.trBuildData.length; i++ ) {
		  if( $scope.trBuildData[i].testRunBuildId === testRunBuild.testRunBuildId ) {
			  index = i;
			  break;
		  }
	  }
	  if( index === -1 ) {
		  alert( "Something gone wrong" );
	  }
	  $scope.trBuildData.splice(index, 1);
	  testRunBuildService.removeTestRunBuild(testRunBuild);
};

$scope.updateTestRunBuild = function (testRunBuild) {
	 $rootScope.clearMsgs();
	testRunBuild.$edit = false;
    testRunBuildService.updateTestRunBuild(testRunBuild);
};


});//End TestRunBuildCtrl
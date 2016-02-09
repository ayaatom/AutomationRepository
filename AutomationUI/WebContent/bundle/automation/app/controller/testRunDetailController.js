app.controller('TestRunDetailCtrl', function($scope, $http, $rootScope, $routeParams, $filter, ngDialog, 
		testCaseService, testRunDetailService, testStepService, $location, $timeout,AUTOMATION_CONSTANTS) {

	$scope.applicationName = $rootScope.applicationName;
	$scope.applicationId = $rootScope.applicationId;
$scope.testCaseData = [];
$scope.testRunDetailObj = [];
$scope.newTestStepObj = {};
$scope.testRunID = $routeParams.testRunID;
$scope.selectedMachine = "";
$scope.browsers = [
	     			  {
	     			    "id": 1,
	     			    "text": "Chrome"
	     			  },
	     			  {
	     			    "id": 2,
	     			    "text": "Safari"
	     			  },
	     			  {
	     			    "id": 3,
	     			    "text": "IE"
	     			  },
	     			  {
	     				    "id": 4,
	     				    "text": "Firefox"
	     			}];
var trDetailLoaded = false;
$scope.init = function () {
	$rootScope.clearMsgs();
	console.log("test run controller init = " +trDetailLoaded);
	if(!trDetailLoaded) {
		loadTestCase();
		loadTestRunDetail();
		loadMachines();
	}
};

function loadMachines() {
	console.log("test run detail controller loadMachines");
	var machinesResult = testStepService.loadMachines();
	machinesResult.then(function(result) {
		$rootScope.machineDetails = result;
		console.log("machines value" + $rootScope.machineDetails);
	});
};

function loadTestRunDetail() {
	var testRunDetailResult = testRunDetailService.getTestRunDetail($routeParams.testRunID);
	testRunDetailResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined && result !== null && result !== "") {
	   console.log("test run length = "+$scope.testRunDetailObj.length);
	   $scope.testRunDetailObj = $filter('orderBy')(result, 'index'); 
	   trLoaded = true;
	}
	});
};

function loadTestCase() {
	var testCaseResult = testCaseService.getTestCaseList();
	testCaseResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   console.log("test case length = "+$scope.testRunDetailObj.length);
	   console.log("test case  = "+testCaseService.getTestCases());
	   $scope.testCaseData = result; 
	}
	});
};



$scope.setSelectedTestCase = function (testCase,index) {
	 $rootScope.clearMsgs();
	console.log("test run detail controller setSelectedTestCase" + testCase.testCaseId);
	$scope.index = index;
	$scope.newTestRunObj = {};
	$scope.newTestRunObj.testCaseId= testCase.testCaseId;
	$scope.newTestRunObj.testCaseName= testCase.testCaseName;
};

$scope.addSelectedTestCase = function () {
	 $rootScope.clearMsgs();
	console.log("test run detail controller addSelectedTestCase");
	$scope.newTestRunObj.testRunDetailId=$scope.testRunDetailObj.length+1;
	$scope.newTestRunObj.testRunId=$routeParams.testRunID;
	$scope.newTestRunObj.applicationId = $rootScope.applicationId;
	$scope.newTestRunObj.applicationName=$rootScope.applicationName;
	$scope.newTestRunObj.$edit = false;
	$scope.newTestRunObj.index= $scope.testRunDetailObj.length+1;
	testRunDetailService.addTestRunDetail($scope.newTestRunObj, $scope);
};


$scope.updateTestRunDetail = function(testRunDetail) {
	 $rootScope.clearMsgs();
	testRunDetailService.updateTestRunDetail(testRunDetail);
	testRunDetail.$edit = false;
}

$scope.executeTestRun = function() {
	 $rootScope.clearMsgs();
	console.log("test run detail controller executeTestrun. Test run ID = " + $routeParams.testRunID);
	ngDialog.open({
		template : 'executeDialog',
		controller : 'TestRunDetailCtrl',
		data: $rootScope.appDetails
	});
};


$scope.startExecution = function() {
	 $rootScope.clearMsgs();
	console.log("test run controller start execution selected field  = " + this.selectedField.header);
	console.log("test run controller start execution selected environment  = " + this.selectedEnv.environment);
	console.log("test run controller start execution selected environment  = " + this.selectedEnv.fieldsettings);
	console.log("test run controller start execution selected browser  = " + this.selectedBrowser);
	var execDetailObj = {
		"testRunId": $routeParams.testRunID,
		"applicationName": $rootScope.applicationName,
		"applicationId": $rootScope.applicationId,
		"settingsId": this.selectedField.id,
		"environment": this.selectedEnv.environment,
		"fieldSettings": this.selectedEnv.fieldsettings,
		"browser": this.selectedBrowser.text,
		"machine": this.selectedMachine
	};
	ngDialog.close();
	testRunDetailService.executeTestRun(execDetailObj);
};

$scope.removeTestRunDetail = function (testRunDetail,$index) {
	 $rootScope.clearMsgs();
	  testRunDetailService.removeTestRunDetail(testRunDetail,$scope,$index);
};


$scope.moveUpTestRunDetail= function (testTestRunDetail,$index) {
	 $rootScope.clearMsgs();
	console.log("moveUpTestRunDetail=" + testTestRunDetail.testRunId);
	console.log("moveUpTestRunDetail $index=" + $index);
	 if($index === 0) {return;}
	 move($index,$index-1,testTestRunDetail);
};

$scope.moveDownTestRunDetail= function (testTestRunDetail,$index) {
	 $rootScope.clearMsgs();
	console.log("moveDownTestRunDetail=$index=" + $index);
	console.log("moveDownTestRunDetail=$scope.data.length=" + $scope.length);
	if($index+1 === $scope.testRunDetailObj.length) {return;}
	move($index,$index+1,testTestRunDetail); 
};

var move = function (origin, destination,testRunDetail) {
//	var temp = $scope.testRunDetailObj[destination];
//	$scope.testRunDetailObj[destination] = testRunDetail;
//	$scope.testRunDetailObj[origin] = temp;
	var temp = $scope.testRunDetailObj[destination];
	var tempIndex = temp.index;
	temp.index = testRunDetail.index;
	testRunDetail.index = tempIndex;
	$scope.testRunDetailObj[destination] = testRunDetail;
	$scope.testRunDetailObj[origin] = temp;
	testRunDetailService.updateTestRunDetail(testRunDetail);
	testRunDetailService.updateTestRunDetail(temp);
};

$scope.saveTestRunDetailObj = function() {
	 $rootScope.clearMsgs();
	testRunDetailService.saveUpdateTestRunDetails($scope, $scope.testRunDetailObj, $routeParams.testRunID);
};

});//End TestRunDetailCtrl
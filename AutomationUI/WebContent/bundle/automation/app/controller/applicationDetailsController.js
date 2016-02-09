app.controller('ApplicationDetailsCtrl', function($scope, $http, $location,$rootScope,appDetailsService,AUTOMATION_CONSTANTS) {
	console.log("application detail controller=");
	// we would get this from the api
	$scope.entity = [];
	console.log("application detail controller entity=" + $scope.entity);
  var appDetailsLoaded = false;
  $http.defaults.headers.common.Authorization = $rootScope.token;  
  $scope.saveWebSettings = function() {
	  console.log("saveWebSettings init");
  };
  
  $scope.init = function() {
	  $rootScope.clearMsgs();
		console.log("ApplicationDetailsCtrl init");
		if(!appDetailsLoaded) {
			$http.get(AUTOMATION_CONSTANTS.APPDETAIL_SERVICE+'/getApplicationDetailsByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName)
			.then(function(response) {
				console.log(response.status);
				if(response.data !== undefined) {
					appDetails = response.data;
				} else {
					appDetails = [];
				}
				$scope.entity = appDetails;
				$rootScope.appDetails = appDetails;
			});
			appDetailsLoaded = true;
		}
	};

	$scope.addWebSettings = function(type) {
		 $rootScope.clearMsgs();
		console.log("type = " + type);
		for(var i=0; i < $scope.entity.fields.length; i++) {
			if("Web_Settings" === type && type === $scope.entity.fields[i].id) {
				$scope.entity.fields[i].applicationdetailfields.push(
					{"fieldsettings":[{"type": "text","name": "applicationName","label": "Application Name","required": true,"data":""},{"type": "text","name": "environmentURL","label":"Environment URL","required": true,"data":""},{"type": "text","name": "launchScreenIdentifier","label": "Launch Screnn Identifier","required": true,"data": ""}]});
			} else if("Non_Web_Settings" === type && type === $scope.entity.fields[i].id) {
				$scope.entity.fields[i].applicationdetailfields.push(
						{"fieldsettings":[{"type":"text","name":"applicationName","label":"ApplicationName","required":true,"data":""},{"type":"text","name":"path","label":"Path","required":true,"data":""},{"type":"text","name":"processName","label":"ProcessName","required":true,"data":""},{"type":"text","name":"launchScreenIdentifier","label":"LaunchScrennIdentifier","required":true,"data":""}]});
			} else if("Android_Native_App_Settings" === type && type === $scope.entity.fields[i].id) {
				$scope.entity.fields[i].applicationdetailfields.push(
						{"fieldsettings":[{"type":"text","name":"applicationName","label":"ApplicationName","required":true,"data":""},{"type":"text","name":"androidVersion","label":"AndroidVersion","required":true,"data":""},{"type":"text","name":"deviceName","label":"Device/EmulatorName","required":true,"data":""},{"type":"text","name":"appPath","label":"AppPath","required":true,"data":""}]});
			}
		}
	};
	
	$scope.deleteWebSettings = function(type,environment) {
		 $rootScope.clearMsgs();
		console.log("type = " + type + " environment = "+environment);
		for(var i=0; i < $scope.entity.fields.length; i++) {
			if(type === $scope.entity.fields[i].id) {
				for(var j=0; j<$scope.entity.fields[i].applicationdetailfields.length; j++) {
					if(environment === $scope.entity.fields[i].applicationdetailfields[j].environment) {
						$scope.entity.fields[i].applicationdetailfields.splice(j,1);
						
					}
				}
			}
		}
	};
	
	$scope.submitForm = function() {
		 $rootScope.clearMsgs();
		console.log($scope.entity);
		appDetailsService.submitAppDetails($scope.entity,$scope);
	};

});// End Application Details Ctrl

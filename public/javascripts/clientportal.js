(function(angular, undefined) {
	angular.module("clientportal", ["angucomplete-alt"])

	.controller("main", ['$scope', '$http', function($scope, $http) {
		$http({
				method: 'GET',
				url: "http://127.0.0.1:8000/api/users"
			})
			.then(function successCallback(response) {
				var allUsers = response.data;

				$scope.allUsers = [];
				for (var keys in allUsers) {
					$scope.allUsers[keys] = {};
					$scope.allUsers[keys].uuid = allUsers[keys].uuid;
					$scope.allUsers[keys].name = allUsers[keys].firstname + " " + allUsers[keys].lastname;
				}
			});

		$scope.getLocation = function() {
			return document.cookie;
		};
		$scope.allergyChoices = [];
		$scope.medicationChoices = [];
		$scope.immunizationChoices = [];

		$scope.addNewAllergiesChoice = function() {
			var newItemNo = $scope.allergyChoices.length + 1;
			$scope.allergyChoices.push({
				'id': 'choice' + newItemNo
			});
		};

		$scope.addNewMedicationChoice = function() {
			var newItemNo = $scope.medicationChoices.length + 1;
			$scope.medicationChoices.push({
				'id': 'choice' + newItemNo
			});
		};

		$scope.addNewImmunizationChoice = function() {
			var newItemNo = $scope.immunizationChoices.length + 1;
			$scope.immunizationChoices.push({
				'id': 'choice' + newItemNo
			});
		};

		$scope.showAddAllergiesChoice = function(choice) {
			return choice.id === $scope.allergyChoices[$scope.allergyChoices.length - 1].id;
		};

		$scope.showAddMedicationChoice = function(choice) {
			return choice.id === $scope.medicationChoices[$scope.medicationChoices.length - 1].id;
		};

		$scope.showAddImmunizationChoice = function(choice) {
			return choice.id === $scope.immunizationChoices[$scope.immunizationChoices.length - 1].id;
		};

		function getUserData(UUID) {
			var uuid = UUID;
			$http({ method: 'GET', url: "http://127.0.0.1:8000/api/userdata"}).then(function successCallback(response) { $scope.user = response.data;});
		}

		function getMedicationData(UUID) {
			var uuid = UUID;
			$http({
					method: 'GET',
					url: "http://127.0.0.1:8000/api/usermedicines"
				})
				.then(function successCallback(response) {
					if(response && response.data && response.data.length !== 0){
						for(var medicines = 0; medicines < response.data.length; medicines++){
							$scope.medicationChoices.push({
								id: 'choice' + medicines,
								name : response.data[medicines].name,
								dosage : response.data[medicines].dosage,
								frequency : response.data[medicines].frequency,
								datestart : new Date(response.data[medicines].datestart),
								dateend : new Date(response.data[medicines].dateend),
								description : response.data[medicines].description
							});
						}
					} else {
						$scope.medicationChoices.push({id:'choice' + 0});
					}
				});
		}

		function getAllergyData(UUID) {
			var uuid = UUID;
			$http({
					method: 'GET',
					url: "http://127.0.0.1:8000/api/userallergies"
				})
				.then(function successCallback(response) {
					if(response && response.data && response.data.length !== 0){
						for(var allergies = 0; allergies < response.data.length; allergies++){
							$scope.allergyChoices.push({
								id: 'choice' + allergies,
								name : response.data[allergies].name,
								datestart : new Date(response.data[allergies].startdate),
								dateend : new Date(response.data[allergies].enddate),
								description : response.data[allergies].description
							});
						}
					} else {
						$scope.allergyChoices.push({id:'choice' + 0});
					}
				});
		}

		function getImmunizationData(UUID) {
			var uuid = UUID;
			$http({
					method: 'GET',
					url: "http://127.0.0.1:8000/api/userimmunization"
				})
				.then(function successCallback(response) {
					if(response && response.data && response.data.length !== 0){
						for(var immunizations = 0; immunizations < response.data.length; immunizations++){
							$scope.immunizationChoices.push({
								id: 'choice' + immunizations,
								name : response.data[immunizations].name,
								dateimmunized : new Date(response.data[immunizations].dateimmunized),
								dateexpired : new Date(response.data[immunizations].dateexpired),
								description : response.data[immunizations].description
							});
						}
					} else {
						$scope.immunizationChoices.push({id:'choice' + 0});
					}
				});
		}

		function getTestResultData(UUID) {
			var uuid = UUID;
			$http({
					method: 'GET',
					url: "http://127.0.0.1:8000/api/usertestresult"
				})
				.then(function successCallback(response) {
					if(response && response.data && response.data.length !== 0){
						for(var results in response.data){
							var testtype = response.data[results].testtype;
							if(testtype === "urine"){
								response.data[results].date = new Date(response.data[results].date);
								$scope.urine = response.data[results];
							} else if(testtype === "blood"){
								response.data[results].date = new Date(response.data[results].date);
								$scope.blood = response.data[results];
							} else {
								response.data[results].date = new Date(response.data[results].date);
								$scope.vital = response.data[results];
							}
						}
					}
				});
		}

		function putImmunzationData(updateImmunizationData){
			$http({
					method: 'PUT',
					url: 'http://127.0.0.1:8000/api/userimmunization',
					data: updateImmunizationData,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function successCallback(response) {
					if (response.status === 200) {
						location.href = "/";
					}
				});
		}

		function putMedicationData(updatedMedicineData){
			$http({
					method: 'PUT',
					url: 'http://127.0.0.1:8000/api/usermedicines',
					data: updatedMedicineData,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function successCallback(response) {
					if (response.status === 200) {
						location.href = "/";
					}
				});
		}

		function putAllergyData(updateAllergyData){
			$http({
					method: 'PUT',
					url: 'http://127.0.0.1:8000/api/userallergies',
					data: updateAllergyData,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function successCallback(response) {
					if (response.status === 200) {
						location.href = "/";
					}
				});
		}

		$scope.submitImmunization = function(){
			var updatedUserData = $scope.immunizationChoices;

			for(var keys in updatedUserData){
				putImmunzationData(updatedUserData[keys]);
			}
		};

		$scope.submitMecicine = function(){
			var updatedUserData = $scope.medicationChoices;

			for(var keys in updatedUserData){
				putMedicationData(updatedUserData[keys]);
			}
		};

		$scope.submitAllergy = function(){
			var updatedUserData = $scope.allergyChoices;

			for(var keys in updatedUserData){
				putAllergyData(updatedUserData[keys]);
			}
		};

		$scope.submitTest = function(testtype){
			var testType = testtype;

			var typeScopeValue = {
				"urine": $scope.urine,
				"blood": $scope.blood,
				"vital": $scope.vital
			};

			$http({
					method: 'PUT',
					url: 'http://127.0.0.1:8000/api/usertestresult',
					data: typeScopeValue[testType],
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function successCallback(response) {
					if (response.status === 200) {
						location.href = "/";
					}
				});

		};

		$scope.$watch('selectedPatient.title', function(newValue, oldValue) {
			if(newValue === undefined){
				$scope.user = {};
				$scope.medicationChoices = [];
				$scope.allergyChoices = [];
				$scope.immunizationChoices = [];
				$scope.urine = {};
				$scope.blood = {};
				$scope.vital = {};
			}
			for(var names in $scope.allUsers){
				if(newValue === $scope.allUsers[names].name){
					getUserData($scope.allUsers[names].uuid);
					getMedicationData($scope.allUsers[names].uuid);
					getAllergyData($scope.allUsers[names].uuid);
					getImmunizationData($scope.allUsers[names].uuid);
					getTestResultData($scope.allUsers[names].uuid);
				}
			}
		});
	}])

	;
})(angular);

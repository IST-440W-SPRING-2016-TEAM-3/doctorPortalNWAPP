(function(angular, undefined) {
	angular.module("clientportal", [])

	.controller("main", ['$scope', '$http', function($scope, $http) {
		$scope.getLocation = function() {
			return document.cookie;
		};

		// $scope.choices = [{
		// 	id: 'choice1'
		// }];

		$scope.allergyChoices = [{
			id: 'choice1'
		}];
		$scope.medicationChoices = [{
			id: 'choice1'
		}];
		$scope.immunizationChoices = [{
			id: 'choice1'
		}];
		// $scope.addNewChoice = function() {
		// 	var newItemNo = $scope.choices.length + 1;
		// 	$scope.choices.push({
		// 		'id': 'choice' + newItemNo
		// 	});
		// };
		//
		// $scope.showAddChoice = function(choice) {
		// 	return choice.id === $scope.choices[$scope.choices.length - 1].id;
		// };

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
			return choice.id === $scope.immunizationChoices[$scope.allergyChoices.length - 1].id;
		};

		$('.datepicker1').datepicker({});

		$('.datepicker2').datepicker({});
	}])

	.directive('nawAppointmentsTable', ['$compile', '$http', function($compile, $http) {
		function _link(scope, element, attrs) {
			var userAppointments = [];

			var table = angular.element('<table class="table table-striped"></table>'),
				tableHead = angular.element('<thead></thead>'),
				tableHeadRow = angular.element('<tr></tr>'),
				tableHeadCell = angular.element('<th></th>'),
				tableBody = angular.element('<tbody></tbody>'),
				tableBodyRow = angular.element('<tr></tr>'),
				tableBodyCell = angular.element('<td></td>');

			$http({
					method: 'GET',
					url: 'http://127.0.0.1:8000/api/appointments',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function successCallback(response) {

					//Keys to ignore when generating HTML for grid
					var ignore = {
						"_id": "_id",
						"__v": "__v",
						"uuid": "uuid",
					};

					//Extracts user data from response of GET reuest and stores in userAppointments variable
					for (var r = 0; r < response.data.length; r++) {
						userAppointments[r] = response.data[r];
					}

					for (var a = 0; a < userAppointments.length; a++) {
						for (var keyss in userAppointments[a]) {
							if (!ignore[keyss]) {}
						}
					}
				}, function errorCallback(response) {});
		}

		return {
			restrict: "E",
			link: _link
		};
	}])

	;
})(angular);

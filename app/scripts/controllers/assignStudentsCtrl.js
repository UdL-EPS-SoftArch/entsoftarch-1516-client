'use strict';

/**
 * @ngdoc function
 * @name thesismarketApp.controller:AssignStudentCtrl
 * @description
 * # Create a new assign with student and proposal
 * Controller of the thesismarketApp
 */

angular.module('thesismarketApp')
  .controller('StudentsAssignmentsCtrl', function($scope, StudentAssignment) {

    $scope.studentsAssignments = [];

    StudentAssignment.query().$promise.then(function (studentsAssignments) {
      $scope.studentsAssignments = studentsAssignments._embeddedItems;

      $scope.studentsAssignments.forEach(function(studentAssignment) {
          studentAssignment._resources('assigns').get().$promise.then(function(studentOffer) {
            studentAssignment.assigns = studentOffer;
            studentAssignment.assigns.agent = studentOffer._resources('agent').get();
          });
      });

    });

  });

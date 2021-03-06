'use strict';

/**
 * @ngdoc function
 * @name thesismarketApp.controller:PublishProposalCtrl
 * @description
 * # PublishProposalCtrl
 * Controller of the thesismarketApp
 */
angular.module('thesismarketApp')

.controller('PublishProposalCtrl', function ($scope, $rootScope, $state, PublishProposals, StudentOffer, RegisterProposals) {


    var vm = this;
    $scope.user = $rootScope.loggedInUsername;
    $scope.error = '';

  $scope.register = function (publication) {
    var proposalRegistration = {
      registers: '/proposalPublications/' + publication._links.self.href.split('/').pop() };

    RegisterProposals.save(proposalRegistration).$promise
      .then(function () {
        $state.go('registerproposal');
      })
      .catch(function (error) {
        $scope.error = error;
      });

  };

  $scope.addStudentOffer = function (publishProposal) {
      var studentOffer = {
        target: '/proposalPublications/' + publishProposal._links.self.href.split('/').pop() };

      StudentOffer.save(studentOffer).$promise
        .then(function () {
          $state.go('studentOffers');
        })
        .catch(function (error) {
          $scope.error = error;
        });
    };

    //init function
    function init() {

        vm.publishProposals = [];

        PublishProposals.query().$promise.then(function (publishProposals) {
            vm.publishProposals = publishProposals._embeddedItems;
            vm.publishProposals.forEach(function (publishProposal) {
                publishProposal.publishes = publishProposal._resources('publishes').get();
                publishProposal.agent = publishProposal._resources('agent').get();
                publishProposal.commentedBy = publishProposal._resources('commentedBy').get();
            });

        }).catch(function (error) {
            $scope.error = error;
        });
    }
    init();
});

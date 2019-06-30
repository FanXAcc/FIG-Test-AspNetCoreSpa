"use strict";

var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http, $filter) {

    // Initialization
    $scope.sortingOrder = 'firstName';
    $scope.pagedItems = [];
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.currentPage = 0;
    $scope.itemsPerPage = 18;
    $scope.reverse = false;

    // Get customers
    $http.get('http://localhost:5000/api/customer').then(function (response) {
        $scope.items = response.data;
        $scope.search();
    }); 

    // Search
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for (var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });

        // Do sorting
        if ($scope.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;

        // Do paging
        $scope.paging();
    };

    // Get search match
    var searchMatch = function (item, query) {
        if (!query) {
            return true;
        }
        return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    };

    // Change order when sorting
    $scope.sortBy = function (newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

        // icon setup
        $('th i').each(function () {
            // icon reset
            $(this).removeClass().addClass('icon-sort');
        });
        if ($scope.reverse)
            $('th.' + new_sorting_order + ' i').removeClass().addClass('icon-chevron-up');
        else
            $('th.' + new_sorting_order + ' i').removeClass().addClass('icon-chevron-down');
    };

    // Set range
    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    // Calculate pages
    $scope.paging = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    // Previous page
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    // Current page
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // Next page
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
});

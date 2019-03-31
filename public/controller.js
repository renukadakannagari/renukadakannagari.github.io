app.controller('mainController', ['$scope', '$timeout', 'httpFactory', function ($scope, $timeout, httpFactory) {
    'use strict';
    getCashBlotter();
    $scope.selected = [];
    $scope.strategiesFlag = false;
    $scope.tracsactionFlag = false;
    $scope.limitOptions = [5, 10, 15];
    $scope.stratgiesData =[];
    $scope.caseBlotterHeader = ["Business","Currency","SPOT","Today","TOMORROW","1M","1W","1Y","3M"];
    $scope.strategiesHeader = ["ranking","strategy sub id","strategy type","value date","ccy","amt generated/invested due to strategy","required maturity(days)","minimum investment period(days)","minimum deposit/borrowing","minimum deposit ccy","cost of strategy","funding required/to be invested", "other cost(tax,vat)", "savings/earnings due to strategy","time to execute(days)","risk rating","uncertainity in cash flows","source departmentid","targetdeptid","note"];
    $scope.transactionHeader = ["Entity","Region","Country","Location","Business","Currency","BusinessDate","today","tomorrow","spot","1W","2W","1M","3M","6M","1Y","2Y"];
    $scope.options = {
      rowSelection: true,
      multiSelect: true,
      autoSelect: true,
      decapitate: false,
      largeEditDialog: false,
      boundaryLinks: false,
      limitSelect: true,
      pageSelect: true
    };
    
    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

    function getCashBlotter() {
        const api="/get_cashblotter"
        httpFactory.get(api).then(function(res) {
            console.log('data', res);
            $scope.CashBlotterData = {
                "count": 10,
                "data": res.data
            }
        });
    }
    function strategies(business, amount, tenure){
        const api="/get_strategies?business="+business+"&amount="+amount+"&tenure="+tenure;
        httpFactory.get(api).then(function(res) {
            console.log('strategies ', res);
            $scope.stratgiesData = {
                "count": 10,
                "data": res.data
            }
        });
    }
    function tracsaction(business){
        const api="/get_cashflows?business="+business
        httpFactory.get(api).then(function(res) {
            console.log('get_cashflows ', res);
            $scope.tracsactionsData = {
                "count": 10,
                "data": res.data
            }
        });
    }
    $scope.toggleLimitOptions = function () {
      $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };
    
    $scope.loadStuff = function () {
      $scope.promise = $timeout(function () {
        // loading
        getCashBlotter();
      }, 2000);
    }
    
    $scope.logItem = function (item) {
      console.log(item.name, 'was selected');
    };
    
    $scope.logOrder = function (order) {
      console.log('order: ', order);
    };
    
    $scope.logPagination = function (page, limit) {
      console.log('page: ', page);
      console.log('limit: ', limit);
    }
    $scope.onOver = function(){
        console.log('on over header');
    }
    $scope.onclickCaseBoltter = function(business) {
        console.log('click name', business);
        tracsaction(business);
        $scope.tracsactionFlag = true;

    }
    $scope.onDbCaseBoltter = function(business, amount, tenure) {
        console.log('dibule click name', business);
        console.log('dibule click name', amount);
        console.log('dibule click name', tenure);
        strategies(business, amount, tenure);
        $scope.strategiesFlag = true;

    }
  }]);
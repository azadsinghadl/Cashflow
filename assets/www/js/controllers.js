
CashFlow.controller('DashboardCtrl',['$scope','$ionicModal','$stateParams','$state',function($scope,$ionicModal, $stateParams,$state) {
  console.log("inside contriller");
  $scope.DetailsScenario = function () {
    
    console.log("inside details");
    $state.go("CashTabs.ClientProfile");

  };
 $ionicModal.fromTemplateUrl('AddScenario.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModel = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };

$ionicModal.fromTemplateUrl('AddScenario.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    debugger;
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  
}])
CashFlow.controller('ClientProfileCtrl',['$scope','$state', function($scope,$state) {
console.log('ClientProfileCtrl');
$scope.showDashboard = function(){
  $state.go("DashBoard");

};
}])

CashFlow.controller('ScenarioCtrl',['$scope','$state','$ionicPopover','$ionicModal', function($scope,$state,$ionicPopover,$ionicModal) {
console.log("ScenarioCtrl");
// negivation to ScenarioDetails
$scope.ScenarioDetails = function(){
  $state.go('ScenarioDetails');
};
// negivation to dashboard
$scope.showDashboard = function(){
  $state.go("DashBoard");

};

//open scenario  model
$ionicModal.fromTemplateUrl('AddScenario.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.addScenario = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    /////
// $scope.addScenario = function(){
//   debugger;
// };

///ionic popover to edit scenrio details
$ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
   $scope.openPopover = function($event) {
     debugger;
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });



}])
CashFlow.controller('ScenarioDetailsCtrl',['$scope','$state','$ionicPopover','$ionicModal',function($scope,$state,$ionicPopover,$ionicModal){
   console.log("ScenarioDetailsCtrl");



   $scope.showScenario = function(){
     $state.go("CashTabs.Scenario");
   };
   $scope.addContent = function(){
     debugger;
   };
   $scope.AssetsData = function(){
     debugger;
   };
    $scope.liabilityData = function(){
     debugger;
   }
    $scope.TaxationData = function(){
     debugger;
   }
    $scope.SuperData = function(){
     debugger;
   }
    $scope.PensionData = function(){
     debugger;
   }
    $scope.Age_PensionData = function(){
     debugger;
   };

   //ionic popover to Scenario forms
$ionicPopover.fromTemplateUrl('EditFormList.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
   $scope.openPopover = function($event) {
     debugger;
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });


////////////////////////////////////////// income model changes and save//////////////////////////////////////////////////   
$scope.IncstartValueIf = true; 
$scope.DataFieldChange = function(){
    debugger;
//fields change on select
        if ($("#IncStartDateTypeId").val() == "6") {
            debugger;
            $scope.IncstartValueIf = false;
            $scope.IncStartDateIf = true;
            // $("#IncStartDate").show();IncstartValueIf
            // $("#IncStartDateValues").hide();IncStartDateIf
           // $("#IncStartDate").val(currentFinancialYear);

        }
        else if ($("#IncStartDateTypeId").val() == "4" || $("#IncStartDateTypeId").val() == "5") {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").hide();
            //$("#IncStartDate").val('');
             $scope.IncstartValueIf = false;
            $scope.IncStartDateIf = false;
        }
        else {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").show();
            //$("#IncStartDate").val('');
             $scope.IncstartValueIf = true;
             $scope.IncStartDateIf = false;
        }
  

};
$scope.typeIDchange = function(){
        debugger;
        if ($("#TypeID").val() == "2") {
            $scope.income.Taxable = false;
            $scope.IncSupercontribIf = false;
            $scope.IncCenterLinkIf = true;
           // $('#chkTaxable').removeAttr('checked');
           // $("#dvSuperContributions").hide();
           // $("#SuperContributions").val('');
            //$("#dvCentrelinkExempt").show();
        }
        else if ($("#TypeID").val() == "1") {
            //$('#chkTaxable').prop('checked', true);
            $scope.income.Taxable = true;
            $scope.IncSupercontribIf = true;
            $scope.IncCenterLinkIf = false;
            //alert($('#chkTaxable').val());
            //$("#dvSuperContributions").show();
           // $('#chkCentrelinkExempt').removeAttr('checked');
           // $("#dvCentrelinkExempt").hide();
        }
  
};
$scope.IncEndValueIf = true;
$scope.DurationChange = function(){
            debugger;
             if ($("#DurationTypeId").val() == "6") {
            debugger;
            $scope.IncEndValueIf = false;
            $scope.IncDurationEndIf = true;
            // $("#IncStartDate").show();IncstartValueIf
            // $("#IncStartDateValues").hide();IncStartDateIf
           // $("#IncStartDate").val(currentFinancialYear);

        }
        else if ($("#DurationTypeId").val() == "4" || $("#DurationTypeId").val() == "5") {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").hide();
            //$("#IncStartDate").val('');
            $scope.IncEndValueIf = false;
            $scope.IncDurationEndIf = false;
        }
        else {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").show();
            //$("#IncStartDate").val('');
             $scope.IncEndValueIf = true;
        }
  
};
$scope.GrowthRateChange = function(){
            debugger;
            if($("#GrowthRateTypeId").val() == "3"){
                $scope.IncgrowthRateIf = true;
            }
            else 
            {
              $scope.IncgrowthRateIf = false;  
            }


};

    $scope.saveIncome = function (data) {
        
        $scope.temp = {
            id: 10005,
            OwnerId: 0,
            Description: data.Description,
            endYear: 2019,
            endYearDays: 334,
            startDate: '2017-07-01',
            startYear: 2017,
            startYearDays: 365,
            Amount: data.Amount,
            Taxable: data.Taxable,
            growth: 5,
            taxation: 0.10
        }
console.log("inside");
        if(ValidatePageIncome() == true){
            console.log("INSIDE income validation");
            $scope.closeModal1();
            income.push($scope.temp);
           // console.log(income);
            initiateSheet(true);
            
        }
    };
  //income model
  $ionicModal.fromTemplateUrl('incomeDetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.Incomemodal = modal;
    });
    $scope.addIncome = function () {
        $scope.Incomemodal.show();
    };
      $scope.closeModal = function() {
    $scope.Incomemodal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.Incomemodal.remove();
  });

///////////////////////////////////////////////////////////////// Expeses save and changes ///////////////////////////////////////////////
    $scope.ExpStartValueIf = true;
    $scope.ExpStartDateType = function(){
        if ($("#ExpStartDateTypeId").val() == "6") {
            debugger;
            $scope.ExpStartValueIf = false;
            $scope.ExpStartDateIf = true;
            // $("#IncStartDate").show();IncstartValueIf
            // $("#IncStartDateValues").hide();IncStartDateIf
           // $("#IncStartDate").val(currentFinancialYear);

        }
        else if ($("#ExpStartDateTypeId").val() == "4" || $("#ExpStartDateTypeId").val() == "5") {
            // $("#dvIncStartDate").hide();
            debugger;
            // $("#dvIncStartDateValues").hide();
            //$("#IncStartDate").val('');
            $scope.ExpStartValueIf = false;
            $scope.ExpStartDateIf = false;
        }
        else {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").show();
            //$("#IncStartDate").val('');
             $scope.ExpStartValueIf = true;
            //  $scope.ExpStartDateIf = false;
        }

    };
    $scope.ExpGrowthRate = function(){
        if($("#ExpGrowthRateType").val() == "3"){
                $scope.ExpgrowthRateIf = true;

        }
        else {
            $scope.ExpgrowthRateIf = false;
        }

    };
      $scope.ExpFrequencyRate = function(){
        if($("#ExpFrequencyType").val() == "2"){
                $scope.ExpFrequencyValueIf = true;

        }
        else {
            $scope.ExpFrequencyValueIf = false;
        }

    };
    $scope.ExpEndValueIf = true;
    $scope.ExpDurationDateType = function(){
        if ($("#ExpDurationType").val() == "6") {
            debugger;
            $scope.ExpEndValueIf = false;
            $scope.ExpDurationEndIf = true;
            // $("#IncStartDate").show();IncstartValueIf
            // $("#IncStartDateValues").hide();IncStartDateIf
           // $("#IncStartDate").val(currentFinancialYear);

        }
        else if ($("#ExpDurationType").val() == "4" || $("#ExpDurationType").val() == "5") {
            // $("#dvIncStartDate").hide();
            debugger;
            // $("#dvIncStartDateValues").hide();
            //$("#IncStartDate").val('');
            $scope.ExpEndValueIf = false;
            $scope.ExpDurationEndIf = false;
        }
        else {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").show();
            //$("#IncStartDate").val('');
             $scope.ExpEndValueIf = true;
            //  $scope.ExpStartDateIf = false;
        }

    };

    $scope.saveExpense = function () {

        console.log('inside save Expense');
        if(ValidatePageExpense() == true){
            console.log("inside expense validation complete");
            $scope.closeModal1();
            expense.push($scope.expense);
            initiateSheet(true);
        }
    };
//expense model

 $ionicModal.fromTemplateUrl('expenseDetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.Expensemodal = modal;
    });
    $scope.addExpense = function () {
        $scope.Expensemodal.show();
    };
    $scope.closeModal = function() {
    $scope.Expensemodal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.Expensemodal.remove();
  });
  
     ///////////////////////////////super contribution save and changes //////////////////////////////////////////////////////////
$scope.ConStartValueIf = true;
    $scope.ConStartDateType = function(){
         debugger;
        if ($("#ConStartDateType").val() == "6") {
            debugger;
            $scope.ConStartValueIf = false;
            $scope.ConStartDateIf = true;
            // $("#IncStartDate").show();IncstartValueIf
            // $("#IncStartDateValues").hide();IncStartDateIf
           // $("#IncStartDate").val(currentFinancialYear);

        }
        else if ($("#ConStartDateType").val() == "4" || $("#ConStartDateType").val() == "5") {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").hide();
            //$("#IncStartDate").val('');
             $scope.ConStartValueIf = false;
            $scope.ConStartDateIf = false;
        }
        else {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").show();
            //$("#IncStartDate").val('');
             $scope.ConStartValueIf = true;
             $scope.ConStartDateIf = false;
        }

    };
        $scope.ConAmountIf = true;
        $scope.ConAmountType = function(){
                if($("#ConAmountType").val() == "2"){
                    $scope.ConAmountIf = false;

                }
                else{
                    $scope.ConAmountIf = true;
                }

        };


    $scope.ConGrowthRateType = function(){

        if($("#ConGrowthRateType").val() == "3"){

            $scope.ConGrowthRateIf = true;
        }
        else{
            $scope.ConGrowthRateIf = false;
        }
    };

    $scope.ConDurationType = function(){
        if ($("#ConDurationType").val() == "6") {
            debugger;
            $scope.ConEndValueIf = false;
            $scope.ConDurationDateIf = true;
            // $("#IncStartDate").show();IncstartValueIf
            // $("#IncStartDateValues").hide();IncStartDateIf
           // $("#IncStartDate").val(currentFinancialYear);

        }
        else if ($("#ConDurationType").val() == "4" || $("#ConDurationType").val() == "5") {
            // $("#dvIncStartDate").hide();
            debugger;
            // $("#dvIncStartDateValues").hide();
            //$("#IncStartDate").val('');
            $scope.ConEndValueIf = false;
            $scope.ConDurationDateIf = false;
        }
        else {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").show();
            //$("#IncStartDate").val('');
             $scope.ConEndValueIf = true;
            $scope.ConDurationDateIf = false;
        }

    };
    $scope.saveSuperContributions = function () {
        console.log("inside save contribution");

        if(ValidatePageContribution() == true){
            $scope.closeModal1();
            console.log('Contribution Page Validation Complete');

        }
        
    };
  //Super Contribution Model
   $ionicModal.fromTemplateUrl('conrtibutionDetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.Contributionmodal = modal;
    });
    $scope.addSuperContribution = function () {
        $scope.Contributionmodal.show();
    }; 
    $scope.closeModal = function() {
    $scope.Contributionmodal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.Contributionmodal.remove();
  });


//////////////////////////////////////  assets save and changes  //////////////////////////////////////////////////////////////////
$scope.AssInvestmentClassType = function(){
           debugger;
        if($("#AssInvestmentClassTypeID").val() =="1" || $("#AssInvestmentClassTypeID").val() =="4" ){

            $scope.AssIncomeRateIf = false;
            $scope.AssFrankedIncomeIf = false;
            $scope.AssRentIf = false;
            $scope.AssTaxFreeIf = false;
            $scope.AssRiskProfilrIf = false;
                    
        }
        else if($("#AssInvestmentClassTypeID").val() =="2"){

            $scope.AssRentIf = true;
            $scope.AssTaxFreeIf = true;
            $scope.AssRiskProfilrIf = false;
            $scope.AssIncomeRateIf = false;
            $scope.AssFrankedIncomeIf = false;

        }
        else {

            $scope.AssRentIf = false;
            $scope.AssTaxFreeIf = true;
            $scope.AssRiskProfilrIf = true;
            $scope.AssIncomeRateIf = true;
            $scope.AssFrankedIncomeIf = true;
        }
};
$scope.AssStartValueIf = true;
$scope.AssStartDateType = function(){
            if ($("#AssStartDateType").val() == "6") {
            debugger;
            $scope.AssStartValueIf = false;
            $scope.AssStartDateIf = true;
            // $("#IncStartDate").show();IncstartValueIf
            // $("#IncStartDateValues").hide();IncStartDateIf
           // $("#IncStartDate").val(currentFinancialYear);

        }
        else if ($("#AssStartDateType").val() == "4" || $("#AssStartDateType").val() == "5") {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").hide();
            //$("#IncStartDate").val('');
            $scope.AssStartValueIf = false;
            $scope.AssStartDateIf = false;
        }
        else {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").show();
            //$("#IncStartDate").val('');
             $scope.AssStartValueIf = true;
        }
  

};


    $scope.saveAssets = function () {
        console.log('inside save Assets');
        if(ValidatePageAssets() == true) {
            console.log("Assets validation complete");
            $scope.closeModal1();
            investment.push($scope.assets);
        // console.log(investment);
            initiateSheet(true);
        //  $state.go('adl.client.scenarioDetails');
        }
       

    };
//Assets model

$ionicModal.fromTemplateUrl('assetsDetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.Assetsmodal = modal;
    });
    $scope.addAssets = function () {
        $scope.Assetsmodal.show();
    };
    $scope.closeModal = function() {
    $scope.Assetsmodal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.Assetsmodal.remove();
  });


    /////////////////////////////////////////////////liabilities save and changes //////////////////////////////////////////////////////////////
$scope.LbyStartValueIf = true;
$scope.LbyStartDateFn = function(){
        debugger;
        if ($("#LbyStartDateType").val() == "6") {
            debugger;
            $scope.LbyStartValueIf = false;
            $scope.LbyStartDateIf = true;
            // $("#IncStartDate").show();IncstartValueIf
            // $("#IncStartDateValues").hide();IncStartDateIf
           // $("#IncStartDate").val(currentFinancialYear);

        }
        else if ($("#LbyStartDateType").val() == "4" || $("#LbyStartDateType").val() == "5") {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").hide();
            //$("#IncStartDate").val('');
             $scope.LbyStartValueIf = false;
            $scope.LbyStartDateIf = false;
        }
        else {
            // $("#dvIncStartDate").hide();
            // $("#dvIncStartDateValues").show();
            //$("#IncStartDate").val('');
             $scope.LbyStartValueIf = true;
        }

};
    $scope.saveLiabilities = function (data) {
        console.log('inside save 111111');
        
        // $scope.liabilities = {
        //     id: 20001,
        //     OwnerId: 1,
        //     //Description: 'Home Loan',
        //     openingAmount: data.openingAmount,
        //     startDate: '2012-07-31',
        //     endDate: '2025-05-31',
        //     startYear: 2016,
        //     interest: data.interest,
        //     term: data.term
        // };
        if(ValidatePageLiability() == true){
            console.log("Liability Page validation complete");
            $scope.closeModal1();
            liability.push($scope.liabilities);
            initiateSheet(true);

        };
        
        // $state.go('adl.client.scenarioDetails');

    };

  // Liabilities Model

  $ionicModal.fromTemplateUrl('liabilitiesDetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.Liabilitiesmodal = modal;
    });
    $scope.addLiabilities = function () {
        $scope.Liabilitiesmodal.show();
    };
     $scope.closeModal = function() {
    $scope.Liabilitiesmodal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.Liabilitiesmodal.remove();
  });


///////////////////////////////////////////////annutations save and changes / //////////////////////////////////////////////////
    $scope.AnnutationPercentageIf = true;
    $scope.AnnutationFeeType = function(){
        if($("#AnnutationFeeType").val() ==2){

            $scope.AnnutationAmountIf = true;
            $scope.AnnutationPercentageIf = false;
        }
        else{
            $scope.AnnutationPercentageIf = true;
            $scope.AnnutationAmountIf = false;
        }

    };
    $scope.AnnutationIndexationType = function(){
        if($('#AnnutationIndexationType').val() == "3"){
            $scope.SuperIndexationIf = true;
        }
        else{
             $scope.SuperIndexationIf = false;
        }
        
    };
    $scope.AnnutationStartValueIf = true;
    $scope.AnnutationStartDateType = function(){
        if($('#AnnutationStartDateType').val() == "6"){
                $scope.AnnutationStartValueIf = false;
                $scope.AnnutationStartDateIf = true;
        }
        else if($('#AnnutationStartDateType').val() == "4"|| $('#AnnutationStartDateType').val() == "5"){
              $scope.AnnutationStartValueIf = false;
                $scope.AnnutationStartDateIf = false;  
        }
        else{ 
        
              $scope.AnnutationStartValueIf = true;
              $scope.AnnutationStartDateIf = false;  
        }

    };
    $scope.AnnutationDurationValueIf = true;
    $scope.AnnutationDurationType = function(){
        if($('#AnnutationDurationType').val() == "6"){
                $scope.AnnutationDurationValueIf = false;
                $scope.AnnutationDuarationDateIf = true;
        }
        else if($('#AnnutationDurationType').val() == "4"|| $('#AnnutationDurationType').val() == "5"){
              $scope.AnnutationDurationValueIf = false;
                $scope.AnnutationDuarationDateIf = false;  
        }
        else{ 
        
              $scope.AnnutationDurationValueIf = true;
              $scope.AnnutationDuarationDateIf = false;  
        }
        
    };
    $scope.saveSuperAnnuations = function () {
        console.log('inside save super Annutations');
        if(ValidatePageAnnutation() == true){
            console.log("Annutation apge validation complate");
            $scope.closeModal1();
            superannuation.push($scope.annutaion);
            initiateSheet(true);
        }
        

    };

// Super Annutation model
$ionicModal.fromTemplateUrl('superAnnutationDetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.Annutaionmodal = modal;
    });
    $scope.addSuperAnnutation = function () {
        $scope.Annutaionmodal.show();
    };
    $scope.closeModal = function() {
    $scope.Annutaionmodal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.Annutaionmodal.remove();
  });


 ///////////////////////////////////////////////////////Pension save and changes ///////////////////////////////////////////////////
    $scope.savePensions = function () {
        console.log('inside save pansion');
        if(ValidatePagePension() == true){
            console.log("inside pension Validation Complete");
            $scope.closeModal1();
            pension.push($scope.pension);
            initiateSheet(true);

        }
    }; 
// Pension Model

 $ionicModal.fromTemplateUrl('pensionDetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.Pensionsmodal = modal;
    });
    $scope.addPensions = function () {
        $scope.Pensionsmodal.show();
    };
    $scope.closeModal = function() {
    $scope.Pensionsmodal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.Pensionsmodal.remove();
  });

  // documentReady fn
    $(document).ready(function () {
        debugger
        var param2 = '74';
        //ReadJsonData(param2);
        var scenarioData =  {"Table":[{"id":1131,"OwnerId":1077,"startDate":"2016-05-06","Description":"Salaried Income","Taxable":true,"Amount":78000.00,"type":1,"SuperContributions":10.00,"growth":5.00,"endDate":"2043-05-06"},{"id":1132,"OwnerId":1078,"startDate":"2008-05-06","Description":"Self-Employment Income","Taxable":true,"Amount":45000.00,"type":1,"SuperContributions":0.00,"growth":5.00,"endDate":"2038-05-06"},{"id":1133,"OwnerId":1079,"startDate":"2015-07-01","Description":"Income from annuities","Taxable":false,"Amount":12000.00,"type":2,"SuperContributions":0.00,"growth":5.00,"endDate":"2025-06-30"},{"id":1134,"OwnerId":1079,"startDate":"2015-07-01","Description":"Income from allowances","Taxable":true,"Amount":24000.00,"type":2,"SuperContributions":0.00,"growth":5.00,"endDate":"2025-06-30"},{"id":1135,"OwnerId":1077,"startDate":"2016-05-06","Description":"Fringe Benefits","Taxable":false,"Amount":1000.00,"type":2,"SuperContributions":0.00,"growth":5.00,"endDate":"2043-05-06"},{"id":1136,"OwnerId":1078,"startDate":"2015-10-05","Description":"Income from business ventures","Taxable":false,"Amount":13000.00,"type":2,"SuperContributions":0.00,"growth":5.00,"endDate":"2020-05-07"}],"Table1":[{"id":1042,"OwnerId":1077,"startDate":"2016-05-06","Description":"Core Expenses","Taxable":true,"Amount":1500.00,"growth":4.00,"endDate":"2045-06-30"},{"id":1043,"OwnerId":1077,"startDate":"2015-07-01","Description":"School Fees","Taxable":false,"Amount":2500.00,"growth":4.00,"endDate":"2030-06-30"},{"id":1044,"OwnerId":1078,"startDate":"2008-05-06","Description":"Holiday","Taxable":false,"Amount":10000.00,"growth":4.00,"endDate":"2038-05-06"},{"id":1045,"OwnerId":1079,"startDate":"2015-07-01","Description":"Entertainment","Taxable":false,"Amount":1100.00,"growth":4.00,"endDate":"2035-06-30"}],"Table2":[{"id":1057,"OwnerId":1077,"startDate":"2016-05-06","opening":75000.00,"income":0.00,"growth":4.00,"taxFreeIncome":0.00,"frankedIncome":0.00,"type":1,"Description":"Personal Residence","rent":0.00},{"id":1058,"OwnerId":1077,"startDate":"2018-07-01","opening":35000.00,"income":0.00,"growth":5.00,"taxFreeIncome":2.00,"frankedIncome":0.00,"type":2,"Description":"Property on Rent","rent":1000.00},{"id":1059,"OwnerId":1077,"startDate":"2017-10-10","opening":5000.00,"income":6.00,"growth":4.00,"taxFreeIncome":2.00,"frankedIncome":5.00,"type":3,"Description":"Shares","rent":0.00},{"id":1060,"OwnerId":1077,"startDate":"2015-07-01","opening":47000.00,"income":0.00,"growth":4.00,"taxFreeIncome":0.00,"frankedIncome":0.00,"type":4,"Description":"Car","rent":0.00},{"id":1061,"OwnerId":1078,"startDate":"2015-07-01","opening":85000.00,"income":0.00,"growth":5.00,"taxFreeIncome":0.00,"frankedIncome":0.00,"type":1,"Description":"Own Residence","rent":0.00},{"id":1062,"OwnerId":1078,"startDate":"2015-08-12","opening":14000.00,"income":7.00,"growth":5.00,"taxFreeIncome":5.00,"frankedIncome":6.00,"type":3,"Description":"Managed Funds","rent":0.00},{"id":1063,"OwnerId":1079,"startDate":"2018-07-01","opening":45000.00,"income":0.00,"growth":5.00,"taxFreeIncome":2.00,"frankedIncome":0.00,"type":2,"Description":"Joint Property on rent","rent":1200.00}],"Table3":[],"Table4":[],"Table5":[{"id":1011,"OwnerId":1077,"openingAmount":45000.00,"ncc":15000.00,"feeAmount":1000.00,"feeType":2,"incomeRate":5.00,"growthRate":4.00,"frankingRate":2.00,"taxFree":2.00,"insurancePremium":2700.00,"startDate":"2015-07-01","endDate":"2030-06-30","insuranceGrowth":4.00}],"Table6":[{"id":1013,"OwnerId":1077,"startDate":"2016-05-06","Description":"Concessional Contribution","type":1,"Amount":25000.00,"growth":5.00,"endDate":"2043-05-06"},{"id":1014,"OwnerId":1078,"startDate":"2015-07-05","Description":"Own Contributions","type":1,"Amount":15000.00,"growth":5.00,"endDate":"2030-06-30"}],"Table7":[],"Table8":[],"Table9":[{"StartYear":2015,"Duration":30,"ScenarioId":74,"ClientId":1077,"AwoteRate":5.00}],"Table10":[{"id":1077,"dobYear":1978,"dob":"1978-05-06T00:00:00","fullname":"Alia","type":1},{"id":1078,"dobYear":1985,"dob":"1985-08-12T00:00:00","fullname":"Ria","type":2},{"id":1079,"dobYear":2016,"dob":"2016-06-13T00:00:00","fullname":"Joint","type":3}],"Table11":[{"YearID":2015,"familySituation":0,"maxPension":22542.00,"incFullPensionThres":4212.00,"incNilPensionThres":49296.00,"deemLimitThres":48600.00,"deemRateLow":1.75,"deemRateHigh":3.25},{"YearID":2015,"familySituation":1,"maxPension":16991.00,"incFullPensionThres":7488.00,"incNilPensionThres":75452.00,"deemLimitThres":80600.00,"deemRateLow":1.75,"deemRateHigh":3.25},{"YearID":2016,"familySituation":0,"maxPension":22542.00,"incFullPensionThres":4212.00,"incNilPensionThres":49296.00,"deemLimitThres":48600.00,"deemRateLow":1.75,"deemRateHigh":3.25},{"YearID":2016,"familySituation":1,"maxPension":16991.00,"incFullPensionThres":7488.00,"incNilPensionThres":75452.00,"deemLimitThres":80600.00,"deemRateLow":1.75,"deemRateHigh":3.25}],"Table12":[{"YearID":2015,"familySituation":0,"isHomeOwner":false,"astFullPensionThres":348500.00,"astNilPensionThres":932500.00},{"YearID":2015,"familySituation":0,"isHomeOwner":true,"astFullPensionThres":202000.00,"astNilPensionThres":783500.00},{"YearID":2015,"familySituation":1,"isHomeOwner":false,"astFullPensionThres":433000.00,"astNilPensionThres":1312000.00},{"YearID":2015,"familySituation":1,"isHomeOwner":true,"astFullPensionThres":286500.00,"astNilPensionThres":1163000.00},{"YearID":2016,"familySituation":0,"isHomeOwner":false,"astFullPensionThres":348500.00,"astNilPensionThres":932500.00},{"YearID":2016,"familySituation":0,"isHomeOwner":true,"astFullPensionThres":202000.00,"astNilPensionThres":783500.00},{"YearID":2016,"familySituation":1,"isHomeOwner":false,"astFullPensionThres":433000.00,"astNilPensionThres":1312000.00},{"YearID":2016,"familySituation":1,"isHomeOwner":true,"astFullPensionThres":286500.00,"astNilPensionThres":1163000.00},{"YearID":2017,"familySituation":0,"isHomeOwner":false,"astFullPensionThres":450000.00,"astNilPensionThres":747000.00},{"YearID":2017,"familySituation":0,"isHomeOwner":true,"astFullPensionThres":250000.00,"astNilPensionThres":547000.00},{"YearID":2017,"familySituation":1,"isHomeOwner":false,"astFullPensionThres":575000.00,"astNilPensionThres":1023000.00},{"YearID":2017,"familySituation":1,"isHomeOwner":true,"astFullPensionThres":375000.00,"astNilPensionThres":823000.00},{"YearID":2018,"familySituation":0,"isHomeOwner":false,"astFullPensionThres":450000.00,"astNilPensionThres":747000.00},{"YearID":2018,"familySituation":0,"isHomeOwner":true,"astFullPensionThres":250000.00,"astNilPensionThres":547000.00},{"YearID":2018,"familySituation":1,"isHomeOwner":false,"astFullPensionThres":575000.00,"astNilPensionThres":1023000.00},{"YearID":2018,"familySituation":1,"isHomeOwner":true,"astFullPensionThres":375000.00,"astNilPensionThres":823000.00},{"YearID":2019,"familySituation":0,"isHomeOwner":false,"astFullPensionThres":450000.00,"astNilPensionThres":747000.00},{"YearID":2019,"familySituation":0,"isHomeOwner":true,"astFullPensionThres":250000.00,"astNilPensionThres":547000.00},{"YearID":2019,"familySituation":1,"isHomeOwner":false,"astFullPensionThres":575000.00,"astNilPensionThres":1023000.00},{"YearID":2019,"familySituation":1,"isHomeOwner":true,"astFullPensionThres":375000.00,"astNilPensionThres":823000.00},{"YearID":2020,"familySituation":0,"isHomeOwner":false,"astFullPensionThres":450000.00,"astNilPensionThres":747000.00},{"YearID":2020,"familySituation":0,"isHomeOwner":true,"astFullPensionThres":250000.00,"astNilPensionThres":547000.00},{"YearID":2020,"familySituation":1,"isHomeOwner":false,"astFullPensionThres":575000.00,"astNilPensionThres":1023000.00},{"YearID":2020,"familySituation":1,"isHomeOwner":true,"astFullPensionThres":375000.00,"astNilPensionThres":823000.00},{"YearID":2021,"familySituation":0,"isHomeOwner":false,"astFullPensionThres":450000.00,"astNilPensionThres":747000.00},{"YearID":2021,"familySituation":0,"isHomeOwner":true,"astFullPensionThres":250000.00,"astNilPensionThres":547000.00},{"YearID":2021,"familySituation":1,"isHomeOwner":false,"astFullPensionThres":575000.00,"astNilPensionThres":1023000.00},{"YearID":2021,"familySituation":1,"isHomeOwner":true,"astFullPensionThres":375000.00,"astNilPensionThres":823000.00}],"Table13":[{"Column1":"2016-06-22"}]}
        loadData(scenarioData, false);
    });
  
 }])

CashFlow.controller('IndexCtrl',function($state,$scope){

    $scope.ScenarioTab = function(){
      $state.go('CashTabs.Scenario');
    }
    $scope.GoalsTab = function(){
      $state.go('CashTabs.Goals');
    };
    $scope.ProfileTab = function(){
      $state.go('CashTabs.ClientProfile');
    };
    $scope.SettingsTab = function(){
      $state.go('CashTabs.Settings');
    };
  })
  
CashFlow.controller('GoalsCtrl',function($state,$scope){
console.log("golas");

});
CashFlow.controller('SettingsCtrl',function($state,$scope){
console.log("SettingsCtrl");

});

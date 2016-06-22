////////////////////////////////////////////////////// add scanario validation/////////////////////////////////////////////////////////////
    function ValidatePageScenario() {
        console.log("inside validate js");
        return fnDuration();
    }

    function fnDuration() {
        //Validation for Description
        if ($("#Description").val().trim() == "") {
            console.log("description is null");
            $("#spnMsgDescription").html("Description is Required Field");
            //$rootScope.showAlert("error.Message", 'Error');
            return false;
        }
        //Validation for start date type
        if ($("#Duration").val() == "") {
            $("#spnMsgDuration").html("Duration is Required Field");
            return false;
        }
        else if ($("#Duration").val() > 20) {
            $("#spnMsgDuration").html("Duration Should not be more than 20");
            return false;
        }
        else if ($("#Duration").val() < 0) {
            $("#spnMsgDuration").html("Duration Should not be in Negative");
            return false;
        }
        else {
            $("#spnMsgDuration").html("");
            return fnCPI();
        }
    }
    function fnCPI() {
        //Validation for start date type
        if ($("#CPI").val() == "") {
            $("#spnMsgCPI").html("CPI is Required Field");
            return false;
        }
        else if ($("#CPI").val() < 0) {
            $("#spnMsgCPI").html("CPI Should not be in Negative");
            return false;
        }
        else if ($("#CPI").val() > 100) {
            $("#spnMsgCPI").html("CPI Should not be more than 100");
            return false;
        }
        else {
            $("#spnMsgCPI").html("");
            return fnAWOTE();
        }
    }
    function fnAWOTE() {
        //Validation for start date type
        if ($("#AWOTE").val() == "") {
            $("#spnMsgAwote").html("AWOTE is Required Field");
            return false;
        }
        else if ($("#AWOTE").val() < 0) {
            $("#spnMsgAwote").html("AWOTE Should not be in Negative");
            return false;
        }
        else if ($("#AWOTE").val() > 100) {
            $("#spnMsgAwote").html("AWOTE Should not be more than 100");
            return false;
        }
        else {
            $("#spnMsgAwote").html("");
            return fnPartnerRetAge();
        }
    }
    function fnPartnerRetAge() {
        //Validation for start date type
        if ($("#PartnerRetirementAge").val() == "") {
            $("#spnMsgPartnerRetirementAge").html("Partner Retirement Age is Required Field");
            return false;
        }
        else if ($("#PartnerRetirementAge").val() > 67) {
            $("#spnMsgPartnerRetirementAge").html("Partner Retirement Age Should not be more than 67");
            return false;
        }
        else {
            $("#spnMsgPartnerRetirementAge").html("");
            return fnDescription();
        }
    }
    function fnDescription() {
        //Start Date
        if ($("#Description").val() == "") {
            $("#spnMsgDescription").html("Description is Required Field");
            return false;
        }
        else {
            
            return fnClientRetAge();
        }
    }
    function fnClientRetAge() {
        //Validation for start date type
        if ($("#ClientRetirementAge").val() == "") {
            $("#spnMsgClientRetirementAge").html("Client Retirement Age is Required Field");
            return false;
        }
        else if ($("#ClientRetirementAge").val() > 67) {
            $("#spnMsg").html("Client Retirement Age Should not be more than 67");
            return false;
        }
        else {
            $("#spnMsg").html("");
            return true;
        }
    }


/////////////////////////////////////////////////// add income validations///////////////////////////////////////////////////////////////////////
    function ValidatePageIncome() {
        console.log("inside income validation js");
        debugger;
        return IncStartDate();
    }
    function IncStartDate() {
        console.log($("#IncStartDateTypeId").val());
        if ($("#IncStartDateTypeId").val() == "1" || $("#IncStartDateTypeId").val() == "2") {
            if ($("#IncStartDateTypeValues").val() == "") {
                $("#spnMsgStartDate").html("Start Value is Required Field");
                return false;
            }
            else if ($("#IncStartDateTypeValues").val() <= 14) {
                $("#spnMsgStartDate").html("Start Value Should not be less than 15 years");
                return false;
            }
            else {
                $("#spnMsgStartDate").html("");
                return IncDurationEndDate();
            }
        }
        else if ($("#IncStartDateTypeId").val() == "3") {
            if ($("#IncStartDateTypeValues").val() == "") {
                $("#spnMsgStartDate").html("Start Value Value is Required Field");
                return false;
            }
            else if ($("#IncStartDateTypeValues").val() <= 0) {
                $("#spnMsgStartDate").html("Start Value Should not be less than 0");
                return false;
            }
            else if ($("#IncStartDateTypeValues").val() > 50) {
                $("#spnMsgStartDate").html("Start Value Should not be more than 50");
                return false;
            }
            else {
                $("#spnMsgStartDate").html("");
                return IncDurationEndDate();
            }
        }
        else if ($("#IncStartDateTypeId").val() == "6") {
            re = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
            var d = new Date(new Date().setYear(new Date().getFullYear() + 25))
            //d.setFullYear(d.getFullYear() + 25, d.getMonth(), d.getDay());
            if ($("#IncStartDate").val() == "") {
                $("#spnMsgStartDate").html("StartDate is Required Field");
                $("#IncStartDate").focus();
                return false;
            }
                //else if ($("#IncStartDate").val() == '') {
                //    $("#spnMsg").html("StartDate Please select date first");
                //    return false;
                //}
            else if (Date.parse($("#IncStartDate").val()) > d) {
                $("#spnMsgStartDate").html("StartDate should be less than 25 years from current date");
                $("#IncStartDate").focus();
                return false;
            }
            else {
                 $("#spnMsgStartDate").html("");
                return IncDurationEndDate();
            }
        }
    }
    function IncDurationEndDate() {
        //Validation for end date type
        console.log("inside end duartion validation");
        if ($("#DurationTypeId").val() == "1" || $("#DurationTypeId").val() == "2") {
            if ($("#DurationEndValues").val() == "") {
                $("#spnMsgDurationType").html("End Value is Required Field");
                return false;
            }
            else if ($("#DurationEndValues").val() < 14 || $("#DurationEndValues").val() > 90) {
                $("#spnMsgDurationType").html("End Value Should between 15-90 years");
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return IncfnCompareDates();
            }
        }
        else if ($("#DurationTypeId").val() == "3") {
            debugger;
            if ($("#DurationEndValues").val() == "") {
                $("#spnMsgDurationType").html("End Value Value is Required Field");
                return false;
            }
            else if ($("#DurationEndValues").val() <= 0) {
                $("#spnMsgDurationType").html("End Value Should not be less than 0");
                return false;
            }
            else if ($("#DurationEndValues").val() > 50) {
                $("#spnMsgDurationType").html("End Value Should not be more than 50");
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return IncfnCompareDates();
            }
        }
        else if ($("#DurationTypeId").val() == "6") {
            re = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
            var d = new Date(new Date().setYear(new Date().getFullYear() + 50))
            //d.setFullYear(d.getFullYear() + 25, d.getMonth(), d.getDay());
            if ($("#DurationEnd").val() == "") {
                $("#spnMsgDurationType").html("End Duration is Required Field");
                $("#DurationEnd").focus();
                return false;
            }
            else if (Date.parse($("#DurationEnd").val()) > d) {
                $("#spnMsgDurationType").html("End Duration should be less than 50 years from current date");
                $("#DurationEnd").focus();
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return IncfnCompareDates();
            }
        }
    }

    function IncfnCompareDates() {
        //Amount
        if ($("#DurationTypeId").val() == "6" && $("#IncStartDateTypeId").val() == "6") {
            if (Date.parse($("#IncStartDate").val()) >= Date.parse($("#DurationEnd").val())) {
                $("#spnMsgDurationType").html("End Date Should be greater than Start Date");
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return IncfnDescription();
            }
        }
        else {
            $("#spnMsgDurationType").html("");
            return IncfnDescription();
        }

    }
    function IncfnDescription() {
        //Start Date
        if ($("#Description").val() == "") {
            $("#spnMsgDescription").html("Description is Required Field");
            return false;
        }
        else {
            var temp = $("#Description").val();
            console.log(temp.indexOf("="));
            if(temp.indexOf("=") >-1 || temp.indexOf(">") >-1 || temp.indexOf("<") >-1 ){
               $("#spnMsgDescription").html("Description should not allowed = < >.Please remove them");
            return false; 
            }
            $("#spnMsgDescription").html("");
            return IncAmount();
        }
    }
    function IncAmount() {
        //Amount
        if ($("#Amount").val() == "") {
            $("#spnMsgAmount").html("Amount is Required Field");
            return false;
        }
        else if (parseInt($("#Amount").val()) <= 0) {
            $("#spnMsgAmount").html("Amount cannot be zero or negative");
            return false;
        }
        else if (parseInt($("#Amount").val()) >= 99999999.99) {
            $("#spnMsgAmount").html("Max Amount Allowed is 99999999.99");
            return false;
        }
        else {
            $("#spnMsgAmount").html("");
            return IncfnGrowthRate();
        }
    }
    function IncfnGrowthRate() {
        debugger
        if ($("#GrowthRateTypeId").val() == 3) {
            if ($("#GrowthRate").val() > 100) {
                $("#spnMsgGrowthRate").html("GrowthRate Should not be greater than 100");
                return false;
            }
            else if (parseInt($("#GrowthRate").val()) <= 0) {
                $("#spnMsgGrowthRate").html("GrowthRate cannot be zero or negative");
                return false;
            }
            else {
                $("#spnMsgGrowthRate").html("");
                //true;
                return true;
            }
        }
        else {
            return true;
        }
    }
////////////////////////////////////////////// Expense Validation /////////////////////////////////////////////////////////////////////////////////

  function ValidatePageExpense() {
        console.log("inside income validation js");
        debugger;
        return ExpStartDate();
    }
    function ExpStartDate() {
        console.log($("#ExpStartDateTypeId").val());
        if ($("#ExpStartDateTypeId").val() == "1" || $("#ExpStartDateTypeId").val() == "2") {
            if ($("#ExpStartValue").val() == "") {
                $("#spnMsgStartDate").html("Start Value is Required Field");
                return false;
            }
            else if ($("#ExpStartValue").val() <= 17) {
                $("#spnMsgStartDate").html("Start Value Should not be less than 18 years");
                return false;
            }
            else {
                $("#spnMsgStartDate").html("");
                return ExpDurationEndDate();
            }
        }
        else if ($("#ExpStartDateTypeId").val() == "3") {
            if ($("#ExpStartValue").val() == "") {
                $("#spnMsgStartDate").html("Start Value Value is Required Field");
                return false;
            }
            else if ($("#ExpStartValue").val() <= 0) {
                $("#spnMsgStartDate").html("Start Value Should not be less than 0");
                return false;
            }
            else if ($("#ExpStartValue").val() > 50) {
                $("#spnMsgStartDate").html("Start Value Should not be more than 50");
                return false;
            }
            else {
                $("#spnMsgStartDate").html("");
                return ExpDurationEndDate();
            }
        }
        else if ($("#ExpStartDateTypeId").val() == "6") {
            re = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
            var d = new Date(new Date().setYear(new Date().getFullYear() + 35))
            //d.setFullYear(d.getFullYear() + 25, d.getMonth(), d.getDay());
            if ($("#ExpStartDate").val() == "") {
                $("#spnMsgStartDate").html("StartDate is Required Field");
                $("#ExpStartDate").focus();
                return false;
            }
                //else if ($("#IncStartDate").val() == '') {
                //    $("#spnMsg").html("StartDate Please select date first");
                //    return false;
                //}
            else if (Date.parse($("#ExpStartDate").val()) > d) {
                $("#spnMsgStartDate").html("StartDate should be less than 35 years from current date");
                $("#ExpStartDate").focus();
                return false;
            }
            else {
                 $("#spnMsgStartDate").html("");
                return ExpDurationEndDate();
            }
        }
    }
    function ExpDurationEndDate() {
        //Validation for end date type
        console.log("inside end duartion validation");
        if ($("#ExpDurationType").val() == "1" || $("#ExpDurationType").val() == "2") {
            if ($("#ExpEndValue").val() == "") {
                $("#spnMsgDurationType").html("End Value is Required Field");
                return false;
            }
            else if ($("#ExpEndValue").val() < 14 || $("#DurationEndValues").val() > 90) {
                $("#spnMsgDurationType").html("End Value Should between 15-90 years");
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return ExpfnCompareDates();
            }
        }
        else if ($("#ExpDurationType").val() == "3") {
            debugger;
            if ($("#ExpEndValue").val() == "") {
                $("#spnMsgDurationType").html("End Value Value is Required Field");
                return false;
            }
            else if ($("#ExpEndValue").val() <= 0) {
                $("#spnMsgDurationType").html("End Value Should not be less than 0");
                return false;
            }
            else if ($("#ExpEndValue").val() > 50) {
                $("#spnMsgDurationType").html("End Value Should not be more than 50");
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return ExpfnCompareDates();
            }
        }
        else if ($("#ExpDurationType").val() == "6") {
            re = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
            var d = new Date(new Date().setYear(new Date().getFullYear() + 60))
            //d.setFullYear(d.getFullYear() + 25, d.getMonth(), d.getDay());
            if ($("#ExpDurationEnd").val() == "") {
                $("#spnMsgDurationType").html("End Duration is Required Field");
                $("#ExpDurationEnd").focus();
                return false;
            }
            else if (Date.parse($("#ExpDurationEnd").val()) > d) {
                $("#spnMsgDurationType").html("End Duration should be less than 60 years from current date");
                $("#ExpDurationEnd").focus();
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return ExpfnCompareDates();
            }
        }
    }

    function ExpfnCompareDates() {
        //Amount
        if ($("#ExpDurationType").val() == "6" && $("#ExpStartDateTypeId").val() == "6") {
            if (Date.parse($("#ExpStartDate").val()) >= Date.parse($("#ExpDurationEnd").val())) {
                $("#spnMsgDurationType").html("End Date Should be greater than Start Date");
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return ExpfnDescription();
            }
        }
        else {
            $("#spnMsgDurationType").html("");
            return ExpfnDescription();
        }

    }
    function ExpfnDescription() {
        //Start Date
        if ($("#ExpDescription").val() == "") {
            $("#spnMsgDescription").html("Description is Required Field");
            return false;
        }
        else {
            var temp = $("#ExpDescription").val();
            console.log(temp.indexOf("="));
            if(temp.indexOf("=") >-1 || temp.indexOf(">") >-1 || temp.indexOf("<") >-1 ){
               $("#spnMsgDescription").html("Description should not allowed = < >.Please remove them");
            return false; 
            }
            $("#spnMsgDescription").html("");
            return ExpAmount();
        }
    }
    function ExpAmount() {
        //Amount
        if ($("#ExpAmount").val() == "") {
            $("#spnMsgAmount").html("Amount is Required Field");
            return false;
        }
        else if (parseInt($("#ExpAmount").val()) <= 0) {
            $("#spnMsgAmount").html("Amount cannot be zero or negative");
            return false;
        }
        else if (parseInt($("#ExpAmount").val()) >= 99999999.99) {
            $("#spnMsgAmount").html("Max Amount Allowed is 99999999.99");
            return false;
        }
        else {
            $("#spnMsgAmount").html("");
            return ExpfnGrowthRate();
        }
    }
    function ExpfnGrowthRate() {
        debugger
        if ($("#ExpGrowthRateType").val() == 3) {
            if ($("#ExpGrowthRate").val() > 100) {
                $("#spnMsgGrowthRate").html("GrowthRate Should not be greater than 100");
                return false;
            }
            else if (parseInt($("#ExpGrowthRate").val()) <= 0) {
                $("#spnMsgGrowthRate").html("GrowthRate cannot be zero or negative");
                return false;
            }
            else {
                $("#spnMsgGrowthRate").html("");
                //true;
                return true;
            }
        }
        else {
            return true;
        }
    }

////////////////////////////////////////////////////Assets Validation ////////////////////////////////////////////////////////////////////


    function ValidatePageAssets() {
        debugger;
        return AssStartDate();

    }
    function AssStartDate() {
        if ($("#AssStartDateType").val() == "1" || $("#AssStartDateType").val() == "2") {
            if ($("#AssStartDate").val() == "") {
                $("#spnMsgAssStartDateType").html("Start Value is Required Field");
                return false;
            }
            else if ($("#AssStartDate").val() <= 14) {
                $("#spnMsgAssStartDateType").html("Start Value Should not be less than 15 years");
                return false;
            }
            else {
                return AssfnDescription();
            }
        }
        else if ($("#AssStartDateType").val() == "3") {
            if ($("#AssStartValue").val() == "") {
                $("#spnMsgAssStartDateType").html("Start Value Value is Required Field");
                return false;
            }
            else if ($("#AssStartValue").val() <= 0) {
                $("#spnMsgAssStartDateType").html("Start Value Should not be less than 0");
                return false;
            }
            else if ($("#AssStartValue").val() > 25) {
                $("#spnMsgAssStartDateType").html("Start Value Should not be more than 25");
                return false;
            }
            else {
                return AssfnDescription();
            }
        }
        else if ($("#AssStartDateType").val() == "6") {
            re = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
            var d = new Date(new Date().setYear(new Date().getFullYear() + 25))
            //d.setFullYear(d.getFullYear() + 25, d.getMonth(), d.getDay());
            if ($("#AssStartDate").val() == "") {
                $("#spnMsgAssStartDateType").html("Start Date is Required Field");
                $("#Ass StartDate").focus();
                return false;
            }
                //else if ($("#InvStartDate").val() == '') {
                //    $("#spnMsg").html("StartDate Please select date first");
                //    return false;
                //}
            else if (Date.parse($("#AssStartDate").val()) > d) {
                $("#spnMsgAssStartDateType").html("StartDate should be less than 25 years from current date");
                $("#AssStartDate").focus();
                return false;
            }
            else {
                return AssfnDescription();
            }
        }
    }


    function AssfnDescription() {
        //Start Date
        if ($("#AssDescripsion").val() == "") {
            $("#spnMsgAssDescripsion").html("Description is Required Field");
            return false;
        }
        
        else {
            var temp = $("#AssDescription").val();
            console.log(temp.indexOf("="));
            if(temp.indexOf("=") >-1 || temp.indexOf(">") >-1 || temp.indexOf("<") >-1 ){
               $("#spnMsgDescription").html("Description should not allowed = < >.Please remove them");
            return false; 
            }
            $("#spnMsgDescription").html("");

            return AssAmount();
        }
    }

    function AssAmount() {
        //Amount
        if ($("#AssAmount").val() == "") {
            $("#spnMsgAssAmount").html("Amount is Required Field");
            return false;
        }
        else if (parseInt($("#AssAmount").val()) <= 0) {
            $("#spnMsgAssAmount").html("Amount cannot be zero or negative");
            return false;
        }
        else if (parseInt($("#AssAmount").val()) >= 99999999.99) {
            $("#spnMsgAssAmount").html("Max Amount Allowed is 99999999.99");
            return false;
        }
            //else if (Amountblur() == false) {
            //    return false;
            //}
        else {
            $("#spnMsgAssAmount").html("");
            return AssIncomeRate();
            //true;

        }
    }
    function AssIncomeRate() {
        if ($("#AssInvestmentClassTypeID").val() == "3") {
            if ($("#AssIncomeRate").val() > 100) {
                $("#spnMsgAssIncomeRate").html("Income Rate Should not be greater than 100");
                return false;
            }
            else if (parseInt($("#AssIncomeRate").val()) <= 0) {
                $("#spnMsgAssIncomeRate").html("Income Rate cannot be zero or negative");
                return false;
            }
            else {
                $("#spnMsgAssIncomeRate").html("");
                //true;
                return AssGrowthRate();
            }
        }
        else {
            $("#spnMsgAssIncomeRate").html("");
            //true;
            return AssGrowthRate();
        }
    }

    function AssGrowthRate() {
        if ($("#AssGrowthRate").val() > 100) {
            $("#spnMsgAssGrowthRate").html("GrowthRate Should not be greater than 100");
            return false;
        }
        else if (parseInt($("#AssGrowthRate").val()) <= 0) {
            $("#spnMsgAssGrowthRate").html("GrowthRate cannot be zero or  negative");
            return false;
        }
        else {
            $("#spnMsgAssGrowthRate").html("");
            //true;
            return AssFrankedIncome()
        }
    }

    function AssFrankedIncome() {
        //FrankedIncome
        if ($("#AssInvestmentClassTypeID").val() == "3") {
            if ($("#AssFrankedIncome").val() == "") {
                $("#spnMsgAssFrankedIncome").html("FrankedIncome is Required Field");
                return false;
            }
            else if ($("#AssFrankedIncome").val() > 100) {
                $("#spnMsgAssFrankedIncome").html("FrankedIncome Should not be greater than 100");
                return false;
            }
            else if (parseInt($("#AssFrankedIncome").val()) <= 0) {
                $("#spnMsgAssFrankedIncome").html("FrankedIncome cannot be zero or  negative");
                return false;
            }
            else {
                $("#spnMsgAssFrankedIncome").html("");
                return true;
            }
        }
        else {
            $("#spnMsgAssFrankedIncome").html("");
            return true;
        }
    }
/////////////////////////////////////////////////// liability Validation ///////////////////////////////////////////////////////


function ValidatePageLiability() {
       debugger;
        return LbyfnStartDate();
    }
    function LbyfnStartDate() {
        if ($("#LbyStartDateType").val() == "1" || $("#LbyStartDateType").val() == "2") {
            if ($("#LbyStartValue").val() == "") {
                $("#spnMsgLbyStartDateType").html("Start Value is Required Field");
                return false;
            }
            else if ($("#LbyStartValue").val() <= 14) {
                $("#spnMsgLbyStartDateType").html("Start Value Should not be less than 15 years");
                return false;
            }
            else {
                return LbyAmount();
            }
        }
        else if ($("#LbyStartDateType").val() == "3") {
            if ($("#LbyStartValue").val() == "") {
                $("#spnMsgLbyStartDateType").html("Start Value Value is Required Field");
                return false;
            }
            else if ($("#LbyStartValue").val() <= 0) {
                $("#spnMsgLbyStartDateType").html("Start Value Should not be less than 0");
                return false;
            }
            else if ($("#LbyStartValue").val() > 25) {
                $("#spnMsgLbyStartDateType").html("Start Value Should not be more than 25");
                return false;
            }
            else {
                return LbyAmount();
            }
        }
        else if ($("#LbyStartDateType").val() == "6") {
            re = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
            var d = new Date(new Date().setYear(new Date().getFullYear() + 25))
            //d.setFullYear(d.getFullYear() + 25, d.getMonth(), d.getDay());
            if ($("#LbyStartDate").val() == "") {
                $("#spnMsgLbyStartDateType").html("Start Date is Required Field");
                $("#LbyStartDate").focus();
                return false;
            }
                //else if ($("#StartDate").val() == '') {
                //    $("#spnMsg").html("StartDate Please select date first");
                //    return false;
                //}
            else if (Date.parse($("#LbyStartDate").val()) > d) {
                $("#spnMsgLbyStartDateType").html("Start Date should be less than 25 years from current date");
                $("#LbyStartDate").focus();
                return false;
            }
            else {
                return LbyAmount();
            }
        }
        else {
            return LbyAmount();
        }
    }


    function LbyAmount() {
        //Amount
        if ($("#LbyAmount").val() == "") {
            $("#spnMsgLbyAmount").html("Amount is Required Field");
            return false;
        }
        else if (parseInt($("#LbyAmount").val()) <= 0) {
            $("#spnMsgLbyAmount").html("Amount cannot be zero or negative");
            return false;
        }
        else if (parseInt($("#LbyAmount").val()) >= 99999999.99) {
            $("#spnMsgLbyAmount").html("Max Amount Allowed is 99999999.99");
            return false;
        }
        else {
            $("#spnMsgLbyAmount").html("");
            return LbyInterestRate();
        }
    }
    function LbyInterestRate() {
        //IncomeRateType
        if ($("#LbyInterestRate").val() == "") {
            $("#spnMsgLbyInterestRate").html("InterestRate is Required Field");
            return false;
        }
        else if ($("#LbyInterestRate").val() > 100) {
            $("#spnMsgLbyInterestRate").html("InterestRate Should not be greater than 100");
            return false;
        }
        else if (parseInt($("#LbyInterestRate").val()) <= 0) {
            $("#spnMsgLbyInterestRate").html("InterestRate cannot be zero or negative");
            return false;
        }
        else {
            $("#spnMsgLbyInterestRate").html("");
            return LbyfnTaxDeductibility();
        }
    }

    function LbyfnTaxDeductibility() {
        //IncomeRateType
        if ($("#LbyTaxDeductibility").val() == "") {
            $("#spnMsgLbyTaxDeductibility").html("TaxDeductibility is Required Field");
            return false;
        }
        else if ($("#LbyTaxDeductibility").val() > 100) {
            $("#spnMsgLbyTaxDeductibility").html("TaxDeductibility Should not be greater than 100");
            return false;
        }
        else if (parseInt($("#LbyTaxDeductibility").val()) < 0) {
            $("#spnMsgLbyTaxDeductibility").html("TaxDeductibility cannot be negative");
            return false;
        }
        else {
            $("#spnMsgLbyTaxDeductibility").html("");
            //true;
            return LbyfnDescription();
        }
    }

    function LbyfnDescription() {
        //Start Date
        if ($("#LbyDescription").val() == "") {
            $("#spnMsgLbyDescription").html("Description is Required Field");
            return false;
        }
        else {
            var temp = $("#LbyDescription").val();
            console.log(temp.indexOf("="));
            if(temp.indexOf("=") >-1 || temp.indexOf(">") >-1 || temp.indexOf("<") >-1 ){
               $("#spnMsgLbyDescription").html("Description should not allowed = < >.Please remove them");
                return false; 
            } 
            $("#spnMsgLbyDescription").html("");  
            return LbyRepaymentAmount();
        }
    }

    function LbyRepaymentAmount() {
        if (parseInt($("#LbyRepaymentAmount").val()) <= 0) {
            $("#spnMsgLbyRepaymentAmount").html("RepaymentAmount cannot be zero or negative");
            return false;
        }
        else {
            $("#spnMsgLbyRepaymentAmount").html("");
            return true;
        }
    }



/////////////////////////////////////////////////////// Super Contribution validation //////////////////////////////////////////


 function ValidatePageContribution() {
        debugger;
        return ConfnStartDate();
    }
     function ConfnStartDate() {
        if ($("#ConStartDateType").val() == "1" || $("#ConStartDateType").val() == "2") {
            if ($("#ConStartValue").val() == "") {
                $("#spnMsgConStartDateType").html("Start Value is Required Field");
                return false;
            }
            else if ($("#ConStartValue").val() <= 14) {
                $("#spnMsgConStartDateType").html("Start Value Should not be less than 15 years");
                return false;
            }
            else {
                return ConfnDurationEndDate();
            }
        }
        else if ($("#ConStartDateType").val() == "3") {
            if ($("#ConStartValue").val() == "") {
                $("#spnMsgLbyStartDateType").html("Start Value Value is Required Field");
                return false;
            }
            else if ($("#ConStartValue").val() <= 0) {
                $("#spnMsgLbyStartDateType").html("Start Value Should not be less than 0");
                return false;
            }
            else if ($("#ConStartValue").val() > 25) {
                $("#spnMsgLbyStartDateType").html("Start Value Should not be more than 25");
                return false;
            }
            else {
                return ConfnDurationEndDate();
            }
        }
        else if ($("#ConStartDateType").val() == "6") {
            re = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
            var d = new Date(new Date().setYear(new Date().getFullYear() + 25))
            //d.setFullYear(d.getFullYear() + 25, d.getMonth(), d.getDay());
            if ($("#ConStartDate").val() == "") {
                $("#spnMsgLbyStartDateType").html("Start Date is Required Field");
                $("#ConStartDate").focus();
                return false;
            }
                //else if ($("#StartDate").val() == '') {
                //    $("#spnMsg").html("StartDate Please select date first");
                //    return false;
                //}
            else if (Date.parse($("#ConStartDate").val()) > d) {
                $("#spnMsgLbyStartDateType").html("Start Date should be less than 25 years from current date");
                $("#ConStartDate").focus();
                return false;
            }
            else {
                return ConfnDurationEndDate();
            }
        }
        else {
            return ConfnDurationEndDate();
        }
    }

    function ConfnDurationEndDate() {
        //Validation for end date type
        if ($("#ConDurationType").val() == "1" || $("#ConDurationType").val() == "2") {
            if ($("#ConEndValue").val() == "") {
                $("#spnMsgConDurationType").html("End Value is Required Field");
                return false;
            }
            else if ($("#ConEndValue").val() < 17 || $("#ConEndValue").val() > 67) {
                $("#spnMsgConDurationType").html("End Value Should between 18-67 years");
                return false;
            }
            else {
                $("#spnMsgConDurationType").html("");
                return ConfnCompareDates();
            }
        }
            //Men women get dynamically later
        // else if ($("#ConDurationType").val() == "4" || $("#ConDurationType").val() == "5") {
        //     if ($("#ConEndValue").val() == "") {
        //         $("#spnMsg").html("End Value Value is Required Field");
        //         return false;
        //     }
        //     else if ($("#DurationEndValues").val() <= 0) {
        //         $("#spnMsg").html("End Value Should not be less than 0");
        //         return false;
        //     }
        //     else if ($("#DurationEndValues").val() < 67) {
        //         $("#spnMsg").html("End Value Should not be less than 65/67 years in case of Male/Female");
        //         return false;
        //     }
        //     else {
        //         $("#spnMsg").html("");
        //         return fnCompareDates();
        //     }
        // }
        else if ($("#ConDurationType").val() == "3") {
            debugger;
            //var myDate = new Date();
            //myDate.setFullYear(myDate.getFullYear() + 50);
            if ($("#ConEndValue").val() == "") {
                $("#spnMsgConDurationType").html("End Value Value is Required Field");
                return false;
            }
            else if ($("#ConEndValue").val() <= 0) {
                $("#spnMsgConDurationType").html("End Value Should not be less than 0");
                return false;
            }
                //else if ($("#DurationEndValues").val() > 50) {
                //    $("#spnMsg").html("End Value Should not be more than 50");
                //    return false;
                //}
            else {
                $("#spnMsgConDurationType").html("");
                return ConfnCompareDates();
            }
        }
        else if ($("#ConDurationType").val() == "6") {
            re = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
            var d = new Date(new Date().setYear(new Date().getFullYear() + 25))
            //d.setFullYear(d.getFullYear() + 25, d.getMonth(), d.getDay());
            if ($("#ConDurationDate").val() == "") {
                $("#spnMsgConDurationType").html("StartDate is Required Field");
                $("#ConDurationDate").focus();
                return false;
            }
                //else if ($("#IncStartDate").val() == '') {
                //    $("#spnMsg").html("StartDate Please select date first");
                //    return false;
                //}
            else if (Date.parse($("#ConDurationDate").val()) > d) {
                $("#spnMsgConDurationType").html("StartDate should be less than 25 years from current date");
                $("#ConDurationDate").focus();
                return false;
            }
            else {
                 $("#spnMsgConDurationType").html("");
                return ConfnCompareDates();
            }
           // return fnCompareDates();
        }
    }

    function ConfnCompareDates() {
        //Amount
        if ($("#ConDurationType").val() == "6" && $("#ConStartDateType").val() == "6") {
            if (Date.parse($("#ContStartDate").val()) >= Date.parse($("#ConDurationDate").val())) {
                $("#spnMsgConDurationType").html("End Date Should be greater than Start Date");
                return false;
            }
            else {
                $("#spnMsgConDurationType").html("");
                return ConfnDescription();
            }
        }
        else {
            $("#spnMsgConDurationType").html("");
            return ConfnDescription();
        }
    }
    function ConfnDescription() {
        //Start Date
        if ($("#ConDescription").val() == "") {
            $("#spnMsgConDescription").html("Description is Required Field");
            return false;
        }
        else {
            var temp = $("#ConDescription").val();
            console.log(temp.indexOf("="));
            if(temp.indexOf("=") >-1 || temp.indexOf(">") >-1 || temp.indexOf("<") >-1 ){
               $("#spnMsgConDescription").html("Description should not allowed = < >.Please remove them");
                return false; 
            } 
            $("#spnMsgConDescription").html("");

            return true;
        }
    }

/////////////////////////////////////Super Annutation Validation ////////////////////////////////////////////////////////////////////////


    function ValidatePageAnnutation() {
        debugger;
        return AntfnInsurancePremium();
    }

    function AntfnInsurancePremium() {
        //InsurancePremium
        if (parseInt($("#AnnutationInsurancePremium").val()) <= 0) {
            $("#spnMsgInsurancePremium").html("InsurancePremium cannot be zero or negative");
            return false;
        }
        else if (parseFloat($("#AnnutationInsurancePremium").val()) >= 99999999.99) {
            $("#spnMsg").html("Max InsurancePremium Allowed is 99999999.99");
            return false;
        }
        else {
            $("#spnMsg").html("");
            return AntfnNccAmount();
        }
    }

    function AntfnNccAmount() {
        //NccAmount 
        if (parseInt($("#AnnutationNccAmount").val()) <= 0) {
            $("#spnMsgNccAmount").html("NccAmount cannot be zero or  negative");
            return false;
        }
        else if (parseFloat($("#AnnutationNccAmount").val()) >= 99999999.99) {
            $("#spnMsgNccAmount").html("Max NccAmount Allowed is 99999999.99");
            return false;
        }
        else {
            $("#spnMsgNccAmount").html("");
            return AntfnStartBalance()
        }
    }

    function AntfnStartBalance() {
        //StartBalance
        if (parseInt($("#AnnutationStartBalance").val()) <= 0) {
            $("#spnMsgStartBalance").html("StartBalance cannot be zero or negative");
            return false;
        }
        else if (parseFloat($("#AnnutationStartBalance").val()) >= 99999999.99) {
            $("#spnMsgStartBalance").html("Max StartBalance Allowed is 99999999.99");
            return false;
        }
        else {
            $("#spnMsgStartBalance").html("");
            return AntfnFranking();
        }
    }
    function AntfnFranking() {
        //GrowthRate
        if ($("#AnnutationFranking").val() > 100) {
            $("#spnMsgFranking").html("Franking Should not be greater than 100");
            return false;
        }
        else if (parseInt($("#AnnutationFranking").val()) < 0) {
            $("#spnMsgFranking").html("Franking cannot be negative");
            return false;
        }
        else {
            $("#spnMsgFranking").html("");
            return AntfnGrowthRate();
        }
    }

    function AntfnGrowthRate() {
        //GrowthRate
        if ($("#AnnutationGrowthRate").val() > 100) {
            $("#spnMsgGrowthRate").html("GrowthRate Should not be greater than 100");
            return false;
        }
        else if (parseInt($("#AnnutationGrowthRate").val()) < 0) {
            $("#spnMsgGrowthRate").html("GrowthRate cannot be negative");
            return false;
        }
        else {
            $("#spnMsgGrowthRate").html("");
            return AntfnTaxFree();
        }
    }

    function fnTaxFree() {
        //GrowthRate
        if ($("#AnnutationTaxFree").val() > 100) {
            $("#spnMsgTaxFree").html("TaxFree Should not be greater than 100");
            return false;
        }
        else if (parseInt($("#AnnutationTaxFree").val()) < 0) {
            $("#spnMsgTaxFree").html("TaxFree cannot be negative");
            return false;
        }
        else {
            $("#spnMsgTaxFree").html("");
            return AntfnIncome();
        }
    }

    function AntfnIncome() {
        //IncomeRateType
        if ($("#AnnutationIncome").val() == "") {
            $("#spnMsgIncome").html("Income is Required Field");
            return false;
        }
        else if ($("#AnnutationIncome").val() > 100) {
            $("#spnMsgIncome").html("Income Should not be greater than 100");
            return false;
        }
        else if (parseInt($("#AnnutationIncome").val()) <= 0) {
            $("#spnMsgIncome").html("Income cannot be zero or negative");
            return false;
        }
        else {
            $("#spnMsgIncome").html("");
            //true;
            return AntfnStartDate();
        }
    }

    function AntfnStartDate() {
        if ($("#AnnutationStartDateType").val() == "1" || $("#AnnutationStartDateType").val() == "2") {
            if ($("#AnnutationStartValue").val() == "") {
                $("#spnMsgStartDate").html("Start Value is Required Field");
                return false;
            }
            else if ($("#AnnutationStartValue").val() <= 14) {
                $("#spnMsgStartDate").html("Start Value Should not be less than 15 years");
                return false;
            }
            else {
                return AntfnDurationEndDate();
            }
        }
        else if ($("#AnnutationStartDateType").val() == "3") {
            if ($("#AnnutationStartValue").val() == "") {
                $("#spnMsgStartDate").html("Start Value Value is Required Field");
                return false;
            }
            else if ($("#AnnutationStartValue").val() <= 0) {
                $("#spnMsgStartDate").html("Start Value Should not be less than 0");
                return false;
            }
            else if ($("#AnnutationStartValue").val() > 25) {
                $("#spnMsgStartDate").html("Start Value Should not be more than 25");
                return false;
            }
            else {
                return AntfnDurationEndDate();
            }
        }
        else if ($("#AnnutationStartDateType").val() == "6") {
            re = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
            var d = new Date(new Date().setYear(new Date().getFullYear() + 25))
            //d.setFullYear(d.getFullYear() + 25, d.getMonth(), d.getDay());
            if ($("#AnnutationStartDate").val() == "") {
                $("#spnMsgStartDate").html("StartDate is Required Field");
                $("#AnnutationStartDate").focus();
                return false;
            }
                //else if ($("#InvStartDate").val() == '') {
                //    $("#spnMsg").html("StartDate Please select date first");
                //    return false;
                //}
            else if (($("#AnnutationStartDate").val()) > d) {
                $("#spnMsgStartDate").html("StartDate should be less than 25 years from current date");
                $("#AnnutationStartDate").focus();
                return false;
            }
            else {
                return AntfnDurationEndDate();
            }
        }
    }

    function AntfnDurationEndDate() {
        //Validation for end date type
        if ($("#AnnutationDurationType").val() == "1" || $("#AnnutationDurationType").val() == "2") {
            if ($("#DurationValue").val() == "") {
                $("#spnMsgDurationType").html("End Value is Required Field");
                return false;
            }
            else if ($("#DurationValue").val() < 14 || $("#DurationValue").val() > 90) {
                $("#spnMsgDurationType").html("End Value Should between 15-90 years");
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return AntfnCompareDates();
            }
        }
        else if ($("#AnnutationDurationType").val() == "3") {
            debugger;
            if ($("#DurationValue").val() == "") {
                $("#spnMsgDurationType").html("End Value  is Required Field");
                return false;
            }
            else if ($("#DurationValue").val() <= 0) {
                $("#spnMsgDurationType").html("End Value Should not be less than 0");
                return false;
            }
            else if ($("#DurationValue").val() > 50) {
                $("#spnMsgDurationType").html("End Value Should not be more than 50");
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return AntfnCompareDates();
            }
        }
        else if ($("#AnnutationDurationType").val() == "6") {
            re = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
            var d = new Date(new Date().setYear(new Date().getFullYear() + 50))
            //d.setFullYear(d.getFullYear() + 25, d.getMonth(), d.getDay());
            if ($("#DurationDate").val() == "") {
                $("#spnMsgDurationType").html("EndDate is Required Field");
                $("#DurationDate").focus();
                return false;
            }
            else if (($("#DurationDate").val()) > d) {
                $("#spnMsgDurationType").html("EndDate should be less than 50 years from current date");
                $("#DurationDate").focus();
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return AntfnCompareDates();
            }
        }
    }

    function AntfnCompareDates() {
        //Amount
        if ($("#AnnutationDurationType").val() == "6" && $("#AnnutationStartDateType").val() == "6") {
            if (($("#AnnutationStartDate").val()) >= ($("#DurationDate").val())) {
                $("#spnMsgDurationType").html("End Date Should be greater than Start Date");
                return false;
            }
            else {
                $("#spnMsgDurationType").html("");
                return AntfnFeeType();
            }
        }
        else {
            $("#spnMsgDurationType").html("");
            return AntfnFeeType();
        }

    }
    function AntfnFeeType() {
        //Amount
        if ($("#AnnutationFeeType").val() == "1") {
            if ($("#AnnutationFeePercentage").val() >= 100) {
                $("#spnMsgFeePercentage").html("Percentage Should be less than or equal to 100");
                return false;
            }
            else {
                $("#spnMsgFeePercentage").html("");
                return AntfnDescription();
            }
        }
        else {
            $("#spnMsgFeePercentage").html("");
            return AntfnDescription();
        }

    }

    function AntfnDescription() {
        //Start Date
        if ($("#AnnutationDescription").val() == "") {
            $("#spnMsgDescription").html("Description is Required Field");
            return false;
        }
        else {
            return true;
        }
    }

//////////////////////////////////////////////////// Pansion Validation //////////////////////////////////////////////////////////////////



    function ValidatePagePension() {
        debugger;
        return PenfnAmount();
    }

    function PenfnAmount() {
        //Amount
        if ($("#PenAmount").val() == "") {
            $("#spnMsgAmount").html("Amount is Required Field");
            return false;
        }
        else if (parseInt($("#PenAmount").val()) <= 0) {
            $("#spnMsgAmount").html("Amount cannot be zero or negative");
            return false;
        }
        else if (parseInt($("#PenAmount").val()) >= 99999999.99) {
            $("#spnMsgAmount").html("Max Amount Allowed is 99999999.99");
            return false;
        }
        else {
            $("#spnMsgAmount").html("");
            return PenfnGrowthRate();
        }
    }

    function PenfnGrowthRate() {
        if ($("#PenGrowthRate").val() > 100) {
            $("#spnMsgGrowthRate").html("GrowthRate Should not be greater than 100");
            return false;
        }
        else if (parseInt($("#PenGrowthRate").val()) <= 0) {
            $("#spnMsgGrowthRate").html("GrowthRate cannot be zero or negative");
            return false;
        }
        else {
            $("#spnMsgGrowthRate").html("");
            //true;
            return PenfnFranking()
        }
    }

    function PenfnFranking() {
        if ($("#PenFranking").val() > 100) {
            $("#spnMsgFranking").html("Franking Should not be greater than 100");
            return false;
        }
        else if (parseInt($("#PenFranking").val()) < 0) {
            $("#spnMsgFranking").html("Franking cannot be negative");
            return false;
        }
        else {
            $("#spnMsgFranking").html("");
            //true;
            return PenfnNccAmount()
        }
    }

    function PenfnNccAmount() {
        if (parseInt($("#PenNccAmount").val()) < 0) {
            $("#spnMsgNccAmount").html("NccAmount cannot be negative");
            return false;
        }
        else if (parseInt($("#PenNccAmount").val()) >= 99999999.99) {
            $("#spnMsgNccAmount").html("Max NccAmount Allowed is 99999999.99");
            return false;
        }
        else {
            $("#spnMsgNccAmount").html("");
            //true;
            return PenfnTaxFree()
        }
    }

    function PenfnTaxFree() {
        if (parseInt($("#PenTaxFree").val()) <= 0) {
            $("#spnMsgTaxFree").html("TaxFree cannot be zero or negative");
            return false;
        }
        else if (parseInt($("#PenTaxFree").val()) >= 99999999.99) {
            $("#spnMsgTaxFree").html("Max TaxFree Allowed is 99999999.99");
            return false;
        }
        else {
            $("#spnMsgTaxFree").html("");
            return true;
        }
    }


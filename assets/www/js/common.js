//Get Current Financial Year
function getCurrentFiscalYear() {
    //Get Current Australian Year
    var today = new Date();
    debugger
    //get current month
    var curMonth = today.getMonth();
    var fiscalYr = "";

    if (curMonth < 6) {         
        fiscalYr = (today.getFullYear() - 1).toString() + '-07-01';
    } else {        
        fiscalYr = today.getFullYear().toString() + '-07-01';
    }

    return fiscalYr;
}
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
};
function OpenSheet(type,id){
    var changeTab = false;
      //var type = 'Liability';
        if (type != undefined && type.trim() != "") {
            //var spread = $("#excelArea").data("spread");
           // var id = '1077'; //$('#CFtabDroplist select').val();
            if (id == undefined)
                return false;
            var sheetId = type + '_' + id;
            //var sheetId = 'Texation_1079'
            if (sheetId != undefined && sheetId.trim() != '') {
                var sheet = spread.getSheetFromName(sheetId);
                if (sheet != undefined) {
                    spread.setActiveSheet(sheetId);
                    changeTab = true;
                    lastRenderedTab = sheetId;
                }
            }
            switch (type) {
                case 'CashAccount': renderCAGraph(id); break;
                case 'Taxation': renderTaxGraph(id); break;
                case 'Super': renderSuperGraph(id); break;
                case 'Pension': renderPensionGraph(id); break;
                case 'Asset': case 'Liability': renderAstLiaGraph(id); break;
            }

        }
};

 
    function enableTabs() {
        var tabs = $("#CFtabHead div");
        $.each(tabs, function (index, tab) {
            $(tab).css("display", "block");
        });
    }
    function setDefaultTab(type,name) {
        var defaultTab;
        var isSet = false;
        if (name != undefined) {
            defaultTab = $('#CFtabHead  label[for="' + name + '"]');
            isSet = openSheet(name);
        }
        else if (type == 1 && partnerAge < 0 || type == 3) {
            defaultTab = $('#CFtabHead label[for="CashAccount"]');
            isSet = openSheet('CashAccount');
        }
        else {
            defaultTab = $('#CFtabHead label[for="Asset"]');
            isSet = openSheet('Asset');
        }
        if (isSet) {
            var tabs = $("#CFtabHead div label");
            $.each(tabs, function (index, tab) {
                $(tab).removeAttr("class", "tab_selected");
                $(tab).attr("class", "label_common col-10 control-label");
            });
            $(defaultTab).attr("class", "tab_selected col-10 control-label");
        }
    }
var clientAge = -1, partnerAge = -1, startYear = 0, years = 0;
var awoteRate = 0;
var lastRenderedTab;
var spread;
var rowLookup = [];
//temporary objects to check sheet rendering.
var testFactors = [{
    incomeSingle: 0.5,
    incomeCouple: 0.25,
    assetSingle: 78,
    assetCouple: 39
}];
var reverseTax = [
{
    RIndex: 1,
    taxPaid: 0,
    marginalTaxRate: 0.015,
    bracketStep: 0,
    netIncome: 0
},
{
    RIndex: 2,
    taxPaid: 273,
    marginalTaxRate: 0.205,
    bracketStep: 18200,
    netIncome: 17927
},
{
    RIndex: 3,
    taxPaid: 4127,
    marginalTaxRate: 0.340,
    bracketStep: 37000,
    netIncome: 32783
},
{
    RIndex: 4,
    taxPaid: 18747,
    marginalTaxRate: 0.385,
    bracketStep: 80000,
    netIncome: 61253
},
{
    RIndex: 5,
    taxPaid: 57247,
    marginalTaxRate: 0.465,
    bracketStep: 180000,
    netIncome: 122753
}
];
var expense = [
            {
                id: 10001,
                OwnerId: 0,
                Description: 'Trips',
                startYear: 2016,
                Amount: 5500,
                Taxable: false,
                growth: 0.15,
                taxation: 0.10
            },
            {
                id: 10002,
                OwnerId: 1,
                Description: 'Telephone Bills',
                startYear: 2018,
                Amount: 7500,
                Taxable: true,
                growth: 0.20,
                taxation: 0.10
            },
            {
                id: 10003,
                OwnerId: 1,
                Description: 'Living expense',
                startYear: 2017,
                Amount: 35000,
                Taxable: false,
                growth: 0,
                taxation: 0.10
            },
            {
                id: 10004,
                OwnerId: 0,
                Description: 'Education',
                startYear: 2019,
                Amount: 15000,
                Taxable: true,
                growth: 0.30,
                taxation: 0.10
            },
            {
                id: 10005,
                OwnerId: 1,
                Description: 'Office Rent',
                startYear: 2017,
                Amount: 5000,
                Taxable: true,
                growth: 0.05,
                taxation: 0.10
            },
            {
                id: 10006,
                OwnerId: 0,
                Description: 'Medical',
                startYear: 2020,
                Amount: 30000,
                Taxable: false,
                growth: 0.030,
                taxation: 0.10
            }
];
var income = [
            {
                id: 10001,
                OwnerId: 0,
                Description: 'Employment',
                startYear: 2016,
                Amount: 550000,
                Taxable: false,
                growth: 0.15,
                taxation: 0.10
            },
            {
                id: 10002,
                OwnerId: 1,
                Description: '2nd Employment',
                startYear: 2018,
                Amount: 750000,
                Taxable: true,
                growth: 0.20,
                taxation: 0.10
            },
            {
                id: 10003,
                OwnerId: 0,
                Description: 'Other Income',
                startYear: 2017,
                Amount: 350000,
                Taxable: false,
                growth: 0,
                taxation: 0.10
            },
            {
                id: 10004,
                OwnerId: 1,
                Description: 'Bonus-wa',
                startYear: 2019,
                Amount: 150000,
                Taxable: true,
                growth: 0.30,
                taxation: 0.10
            },
            {
                id: 10005,
                OwnerId: 0,
                Description: 'Rent',
                startYear: 2017,
                Amount: 50000,
                Taxable: true,
                growth: 0.05,
                taxation: 0.10
            },
            {
                id: 10006,
                OwnerId: 1,
                Description: 'Consultancy',
                startYear: 2020,
                Amount: 300000,
                Taxable: false,
                growth: 0.030,
                taxation: 0.10
            }
];

var investment = [
            {
                id: 10001,
                OwnerId: 1,
                classId: 1,
                Description: '24 Local St',
                startYear: 2016,
                opening: 800000,
                income: 0,
                growth: 0,
                taxFreeIncome: 1,
                frankedIncome: 0
            },
            {
                id: 10002,
                OwnerId: 1,
                classId: 3,
                Description: 'Australian Shares',
                startYear: 2018,
                opening: 233820,
                income: 4,
                growth: 3,
                taxFreeIncome: 0.10,
                frankedIncome: 1
            },
            {
                id: 10003,
                OwnerId: 1,
                classId: 3,
                Description: 'Managed Fund',
                startYear: 2017,
                opening: 69500,
                income: 4,
                growth: 3,
                taxFreeIncome: 0.10,
                frankedIncome: 0.35
            },
            {
                id: 10004,
                OwnerId: 1,
                classId: 4,
                Description: 'New Inv',
                startYear: 2016,
                opening: 180000,
                income: 4,
                growth: 3,
                taxFreeIncome: 0.05,
                frankedIncome: 0.30
            },
            {
                id: 10005,
                OwnerId: 1,
                classId: 2,
                Description: 'Investment Property 123',
                startYear: 2020,
                opening: 500000,
                income: 4,
                growth: 3,
                taxFreeIncome: 0.10,
                frankedIncome: 0
            },
            {
                id: 10006,
                OwnerId: 1,
                classId: 4,
                Description: 'Car',
                startYear: 2016,
                opening: 30000,
                income: 0,
                growth: 0,
                taxFreeIncome: 1,
                frankedIncome: 0
            },
            {
                id: 10007,
                OwnerId: 1,
                classId: 4,
                Description: 'Offset Account',
                startYear: 2016,
                opening: 30000,
                income: 0,
                growth: 0,
                taxFreeIncome: 1,
                frankedIncome: 0
            },
            {
                id: 10008,
                OwnerId: 0,
                classId: 1,
                Description: 'Local St',
                startYear: 2016,
                opening: 800000,
                income: 0,
                growth: 0,
                taxFreeIncome: 1,
                frankedIncome: 0
            },
            {
                id: 10009,
                OwnerId: 0,
                classId: 3,
                Description: 'Aus Shares',
                startYear: 2018,
                opening: 233820,
                income: 4,
                growth: 3,
                taxFreeIncome: 0.10,
                frankedIncome: 1
            },
            {
                id: 10010,
                OwnerId: 0,
                classId: 3,
                Description: 'M Fund',
                startYear: 2017,
                opening: 69500,
                income: 4,
                growth: 3,
                taxFreeIncome: 0.10,
                frankedIncome: 0.35
            },
            {
                id: 10011,
                OwnerId: 0,
                classId: 4,
                Description: 'New Inv',
                startYear: 2016,
                opening: 180000,
                income: 4,
                growth: 3,
                taxFreeIncome: 0.05,
                frankedIncome: 0.30
            }
];
var pension = [
    {
        id: 20001,
        OwnerId: 0,
        Description: 'New Pension',
        opening: 33868,
        startYear: 2016,
        extraPayment: 2032,
        extraStart: 2016,
        extraEnd: 2016,
        returnRate: 0.06
    },
    {
        id: 20002,
        OwnerId: 1,
        Description: 'New Pension partner',
        opening: 230000,
        startYear: 2017,
        extraPayment: 0,
        extraStart: 2016,
        extraEnd: 2016,
        returnRate: 0.07
    },
    {
        id: 20003,
        OwnerId: 0,
        Description: 'Pension client',
        opening: 30000,
        startYear: 2018,
        extraPayment: 0,
        extraStart: 2016,
        extraEnd: 2016,
        returnRate: 0.07
    }
];
var liability = [
    {
        id: 20001,
        OwnerId: 1,
        Description: 'Home Loan',
        openingAmount: 5500000,
        startYear: 2016,
        interest: 0.12,
        term: 15,
    },
    {
        id: 20002,
        OwnerId: 0,
        Description: 'Car Loan',
        openingAmount: 950000,
        startYear: 2016,
        interest: 0.06,
        term: 5,
    },
    {
        id: 20003,
        OwnerId: 1,
        Description: 'Bike Loan',
        openingAmount: 300000,
        startYear: 2018,
        interest: 0.06,
        term: 3,
    },
    {
        id: 20004,
        OwnerId: 0,
        Description: 'Chotu Home Loan',
        openingAmount: 3000000,
        startYear: 2017,
        interest: 0.12,
        term: 3,
    }
];
var superannuation = [
{
    id: 300001,
    OwnerId: 1,
    openingAmt: 28504,
    income: 150000,
    superContrib: 0.095,
    growthRate: 0.04,
    Description: 'BHP Salary',
    type: 'Employment',
    cc: 15000,
    ncc: 0,
    pensionRollover: 0,
    etpWithdrawl: 0,
    insurancePremiums: 500,
    incomeGrowth: 0.05
}];
var entity = [
{
    id: 0,
    dobYear: 1992,
},
{
    id: 1,
    dobYear: 1991,
}];
var pensionRates = [
    {
        YearId: 2015,
        familySituation: 0,
        maxPension: 22365.20,
        incFullPensionThres: 4160.00,
        incNillPensionThres: 48890.40,
        deemLimitThres: 48000.00,
        deemRateLow: 1.75,
        deemRateHigh: 3.25
    },
    {
        YearId: 2015,
        familySituation: 1,
        maxPension: 16858.40,
        incFullPensionThres: 7384.00,
        incNillPensionThres: 74817.60,
        deemLimitThres: 79600.00,
        deemRateLow: 1.75,
        deemRateHigh: 3.25
    }
];
var pensionAssetRates = [
    {
        YearId: 2015,
        familySituation: 0,
        isHomeOwner: 1,
        astFullPensionThres: 202000.00,
        astNillPensionThres: 775500.00,
    },
    {
        YearId: 2015,
        familySituation: 1,
        isHomeOwner: 0,
        astFullPensionThres: 433000.00,
        astNillPensionThres: 1298000.00,
    },
    {
        YearId: 2015,
        familySituation: 0,
        isHomeOwner: 0,
        astFullPensionThres: 348500.00,
        astNillPensionThres: 922000.00,
    },
    {
        YearId: 2015,
        familySituation: 1,
        isHomeOwner: 1,
        astFullPensionThres: 286500.00,
        astNillPensionThres: 1151500.00,
    }
];
var contributions, reInvestments, redemptions;
//design variables.
var defaultStyle, style_mainHeading, style_mainHeading_text, style_subHeading, style_rowHeading, style_rowHeading_text, style_rowHeading_even, style_rowHeading_even_text, style_footer, style_footer_text;
//$(document).ready(function () {
//    //ReadJsonData();
//    initiateSheet(false);
//});
function ReadJsonData(value, isRefresh) {
    isRefresh = isRefresh == undefined ? 0 : isRefresh;
    var scenData;
    $.ajax({
        type: 'GET',
        url: '../../Scenario/GetScenarioData?id=' + value,
        success: function (scenarioData) {
            if (scenarioData != undefined) {
                //income = scenarioData.Table;
                //expense = scenarioData.Table1;
                //investment = scenarioData.Table2;
                //liability = scenarioData.Table3;
                //pension = scenarioData.Table4;
                //superannuation = scenarioData.Table5;
                //scenData = scenarioData.Table6;
                //entity = scenarioData.Table7;
                //pensionRates = scenarioData.Table8;
                //pensionAssetRates = scenarioData.Table9;
                //if (scenData != undefined) {
                //    if (scenData.length > 0) {
                //        startYear = scenData[0].StartYear;
                //        years = scenData[0].Duration;
                //        awoteRate = scenData[0].AwoteRate;
                //    }
                //}
                //if (entity != undefined) {
                //    clientAge = startYear - entity[0].dobYear;
                //    if (entity.length > 1) {
                //        partnerAge = startYear - entity[1].dobYear;
                //    }
                //}
                //if (isRefresh == 1)
                //    initiateSheet(true);
                //else
                //    initiateSheet(false);
                loadData(scenarioData, isRefresh);
            }
        },
        error: function (emp) {
            alert('error');
        }
    });

}
function loadData(data, refresh) {
    
    income = data.Table;
    expense = data.Table1;
    investment = data.Table2;
    liability = data.Table3;
    pension = data.Table4;
    superannuation = data.Table5;
    contributions = data.Table6;
    reInvestments = data.Table7;
    redemptions = data.Table8;
    scenData = data.Table9;
    entity = data.Table10;    
    pensionRates = data.Table11;
    pensionAssetRates = data.Table12;
    if (scenData != undefined) {
        if (scenData.length > 0) {
            startYear = scenData[0].StartYear;
            years = scenData[0].Duration;
            awoteRate = scenData[0].AwoteRate;
        }
    }
    if (entity != undefined&&entity.length>0) {
        clientAge = getCurrentAgeInFinancialYear(entity[0].dob);
        if (entity.length > 1) {
            partnerAge = getCurrentAgeInFinancialYear(entity[1].dob);
        }
    }
    if (refresh == 1)
        initiateSheet(true);
    else
        initiateSheet(false);
        
}
function initiateSheet(isRefresh) {
    var sheetUsed = 0;
    var totalSheets = partnerAge < 0 ? 7 : 16;
    if (isRefresh) {
        //spread = $('#excelArea').data('spread');
        spread.clearSheets();
        spread.setSheetCount(totalSheets);
    }
    else {
        spread = new GcSpread.Sheets.Spread(document.getElementById('excelArea'), {
            sheetCount: totalSheets
        });
    }
    //}
    //else {
    //    spread = $('#excelArea').data('spread');
    //    spread.setSheetCount(totalSheets);
    //}
    indexPensionRates();
    spread.tabStripVisible(false);
    spread.newTabVisible(false);
    spread.suspendCalcService(false);
    spread.isPaintSuspended(true);
    //spread.autoFitType($.wijmo.wijspread.AutoFitType.Cell);
    spread.scrollbarMaxAlign(true);
    spread.scrollIgnoreHidden(true);
    spread.scrollbarShowMax(true);
    //Now code for implementing sheets.    
    indexCashflowData();    
    renderDesignElements();//All design definition will be created.
    var jointId;
    for (var i = 0; i < entity.length; i++) {
        renderAsset(entity[i].id, sheetUsed++);
        if (entity[i].type == 1 || entity[i].type == 2)
            renderPension(entity[i].id, sheetUsed++);
        renderLiability(entity[i].id, sheetUsed++);
    }
    for (var i = 0; i < entity.length; i++) {
        if (partnerAge < 0 && entity[i].type == 1) {
            renderCashAccount(entity[i].id, sheetUsed++);//as there is no logic available.        
            break;
        }
        else if (partnerAge >= 0 && entity[i].type == 3) {
            renderJointCashAccount(entity[i].id, sheetUsed++);
            jointId = entity[i].id;
        }
    }
    for (var i = 0; i < entity.length; i++) {
        if (entity[i].type == 1 || entity[i].type == 2) {
            renderTaxation(entity[i].id, sheetUsed++, jointId);
            renderSuper(entity[i].id, sheetUsed++, jointId);
            renderAgePension(entity[i].id, sheetUsed++);
        }
    }

    spread.resumeCalcService(true);
    spread.isPaintSuspended(false);
    fitSheetsColumn(totalSheets);
    renderEntity();
    //Adding context menu.
    $("#excelArea").bind("contextmenu", processContextMenu);
    $("#excelArea").mouseup(function (e) {
        // hide context menu when the mouse down on SpreadJS        
        if (e.button !== 2) {
            hideContextMenu();
        }
    });
}
function renderEntity() {
    var previousTab = lastRenderedTab;
    if (entity.length > 0) {
        $("#CFtabDroplist select option").remove();
        for (var i = 0; i < entity.length; i++) {
            if (entity[i].type == 1 && partnerAge < 0) {
                $("#CFtabDroplist select").append($("<option></option>").val(entity[i].id).html(entity[i].fullname).prop('selected', true));
               // enableTabs();
                //setDefaultTab(1);
                renderCAGraph(entity[i].id);//primary function
            }
            else if (entity[i].type == 3) {
                $("#CFtabDroplist select").append($("<option></option>").val(entity[i].id).html('Overall Position').prop('selected', true));
                //enableTabs();
                $('#CFtabHead div label[for="Pension"]').parent().css("display", "none");
                $('#CFtabHead div label[for="AgePension"]').parent().css("display", "none");
                $('#CFtabHead div label[for="Super"]').parent().css("display", "none");
                $('#CFtabHead div label[for="Taxation"]').parent().css("display", "none");
                //setDefaultTab(3);
                renderCAGraph(entity[i].id);
            }
            else {
                $("#CFtabDroplist select").append($("<option></option>").val(entity[i].id).html(entity[i].fullname));
            }
        }
        if (previousTab != undefined && previousTab.trim() != '') {
            debugger;
            var last = previousTab.split('_');
            if (last != undefined && last.length == 2) {
                $("#CFtabDroplist select").val(last[1]);
                setActiveTab(last[1], last[0]);
            }
        }
    }
}
function renderCAGraph(ownerId) {
    var totalInflows, totalOutflows;
    var cashSheet = spread.getSheetFromName("CashAccount_" + ownerId);
    var inflowRow = cashSheet.getCustomName('totalInflow' + ownerId);
    var outflowRow = cashSheet.getCustomName('totalOutflow' + ownerId);
    totalInflows = inflowRow != undefined ? cashSheet.getArray(inflowRow._baseRow - 1, inflowRow._baseColumn - 1, 1, years) : [];
    totalOutflows =outflowRow!=undefined? cashSheet.getArray(outflowRow._baseRow - 1, outflowRow._baseColumn - 1, 1, years):[];
    var yearsArr = [];
    for (var i = 0; i < years; i++) {
        yearsArr.push(startYear + i);
    }
    if (totalInflows.length > 0 && totalOutflows.length > 0) {
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Inflows Vs Outflows'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            xAxis: {
                categories: yearsArr,//['2016', '2017', '2018', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Total Inflows',
                data: totalInflows[0]
            }, {
                name: 'Total Outflows',
                data: totalOutflows[0]

            }]
        });
    }
}
function renderTaxGraph(ownerId) {
    var totalTaxation;
    var taxSheet = spread.getSheetFromName("Taxation_" + ownerId);
    var taxRow = taxSheet.getCustomName('totalTax' + ownerId);
    if (taxRow != undefined && taxRow != null) {
        totalTaxation = taxSheet.getArray(taxRow._baseRow - 1, taxRow._baseColumn - 1, 1, years);
        var yearsArr = [];
        for (var i = 0; i < years; i++) {
            yearsArr.push(startYear + i);
        }
        if (totalTaxation.length > 0) {
            $('#container').highcharts({
                title: {
                    text: 'Total Taxation'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                xAxis: {
                    categories: yearsArr,//['2016', '2017', '2018', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                },
                yAxis: {
                    title: {
                        text: 'Total Tax'
                    }, plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' units'
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Total Tax',
                    data: totalTaxation[0]
                }]
            });
        }
    }
}
function renderSuperGraph(ownerId) {
    var closingBalance;
    var superSheet = spread.getSheetFromName("Super_" + ownerId);
    if (superSheet != undefined && superSheet != null) {
        var closingRow = superSheet.getCustomName('closingBalance' + ownerId);
        if (closingRow != undefined && closingRow != null) {
            closingBalance = superSheet.getArray(closingRow._baseRow - 1, closingRow._baseColumn - 1, 1, years);
            var yearsArr = [];
            for (var i = 0; i < years; i++) {
                yearsArr.push(startYear + i);
            }
            $('#container').highcharts({
                title: {
                    text: 'Super Balance'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                xAxis: {
                    categories: yearsArr,//['2016', '2017', '2018', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                },
                yAxis: {
                    title: {
                        text: 'closing Balance'
                    }, plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' units'
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'closing Balance',
                    data: closingBalance[0]
                }]
            });
        }
    }
}
function renderPensionGraph(ownerId) {
    var totalPensionOpening;
    var pensionSheet = spread.getSheetFromName("Pension_" + ownerId);
    if (pensionSheet != undefined && pensionSheet != null) {
        var pensionRow = pensionSheet.getCustomName('pensionTotalOpening');
        if (pensionRow != undefined && pensionRow != null) {
            totalPensionOpening = pensionSheet.getArray(pensionRow._baseRow - 1, pensionRow._baseColumn - 1, 1, years);
            var yearsArr = [];
            for (var i = 0; i < years; i++) {
                yearsArr.push(startYear + i);
            }
            if (totalPensionOpening.length > 0) {
                $('#container').highcharts({
                    title: {
                        text: 'Total Pension'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    xAxis: {
                        categories: yearsArr,//['2016', '2017', '2018', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                    },
                    yAxis: {
                        title: {
                            text: 'closing Balance'
                        }, plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        shared: true,
                        valueSuffix: ' units'
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Total Pension Opening',
                        data: totalPensionOpening[0]
                    }]
                });
            }
        }
    }
}
function renderAstLiaGraph(ownerId) {
    //rendering asset graph.
    var arrTotalLiabilityClosing, arrTotalAssetClosing;
    var assetSheet = spread.getSheetFromName("Asset_" + ownerId);
    var liaSheet = spread.getSheetFromName("Liability_" + ownerId);
    var astClosing = assetSheet.getCustomName('TotalInvClosing');
    var liaClosing = liaSheet.getCustomName('TotalLiabilityClosing');
    arrTotalAssetClosing =astClosing!=undefined? assetSheet.getArray(astClosing._baseRow - 1, astClosing._baseColumn - 1, 1, years):[];
    arrTotalLiabilityClosing =liaClosing!=undefined? liaSheet.getArray(liaClosing._baseRow - 1, liaClosing._baseColumn - 1, 1, years):[];
    var yearsArr = [];
    for (var i = 0; i < years; i++) {
        yearsArr.push(startYear + i);
    }
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Asset Vs Liability'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        xAxis: {
            categories: yearsArr,//['2016', '2017', '2018', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Total Asset Closing',
            data: arrTotalAssetClosing[0]
        }, {
            name: 'Total Liability Closing',
            data: arrTotalLiabilityClosing[0]

        }]
    });
}

function renderDesignElements() {
    defaultStyle = new GcSpread.Sheets.Style();
    defaultStyle.foreColor = "Black";
    defaultStyle.formatter = "#,##";
    defaultStyle.font = "10.5pt Calibri"; defaultStyle.textIndent = 0.25;
    defaultStyle.borderLeft = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    defaultStyle.borderTop = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    defaultStyle.borderRight = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    defaultStyle.borderBottom = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    defaultStyle.hAlign = GcSpread.Sheets.HorizontalAlign.right;
    defaultStyle.vAlign = GcSpread.Sheets.VerticalAlign.center;

    //Defining style for differnt text representation. 
    //This style will be used in main heading like Financial year and Age Headers.
    style_mainHeading = new GcSpread.Sheets.Style();
    style_mainHeading.foreColor = "#41a3ea";
    style_mainHeading.backColor = "#ebf3fb";
    style_mainHeading.font = "bold 10.5pt Calibri";
    style_mainHeading.hAlign = GcSpread.Sheets.HorizontalAlign.left;
    style_mainHeading.borderLeft = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_mainHeading.borderTop = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_mainHeading.borderRight = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_mainHeading.borderBottom = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    //This style will be used in main heading data.
    style_mainHeading_text = new GcSpread.Sheets.Style();
    style_mainHeading_text.foreColor = "#4f4f4f";
    style_mainHeading_text.backColor = "#ebf3fb";
    style_mainHeading_text.font = "bold 10.5pt Calibri";
    style_mainHeading_text.textIndent = 1;
    style_mainHeading_text.hAlign = GcSpread.Sheets.HorizontalAlign.center;
    style_mainHeading_text.borderLeft = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_mainHeading_text.borderTop = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_mainHeading_text.borderRight = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_mainHeading_text.borderBottom = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    //This style will be used for Data headings .
    style_subHeading = new GcSpread.Sheets.Style();
    style_subHeading.foreColor = "Black";//"#666666";
    style_subHeading.backColor = "#f8f9fa";
    style_subHeading.font = "bold 10.5pt Calibri";
    style_subHeading.hAlign = GcSpread.Sheets.HorizontalAlign.left;
    style_subHeading.borderLeft = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_subHeading.borderTop = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_subHeading.borderRight = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_subHeading.borderBottom = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    //This style will be used for Data row heading.
    style_rowHeading = new GcSpread.Sheets.Style();
    style_rowHeading.foreColor = "#4f4f4f";
    style_rowHeading.backColor = "#ffffff";
    style_rowHeading.hAlign = GcSpread.Sheets.HorizontalAlign.left;
    style_rowHeading.borderLeft = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading.borderTop = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading.borderRight = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading.borderBottom = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    //This style will be used for Data row heading.
    style_rowHeading_text = new GcSpread.Sheets.Style();
    style_rowHeading_text.foreColor = "#4f4f4f";
    style_rowHeading_text.backColor = "#ffffff";
    style_rowHeading_text.hAlign = GcSpread.Sheets.HorizontalAlign.right;
    style_rowHeading_text.textIndent = 0.25;
    style_rowHeading_text.borderLeft = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading_text.borderTop = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading_text.borderRight = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading_text.borderBottom = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    //This style will be used for Even Data row heading.
    style_rowHeading_even = new GcSpread.Sheets.Style();
    style_rowHeading_even.foreColor = "#4f4f4f";
    style_rowHeading_even.backColor = "#f8f9fa";//"#f8f9fa";
    style_rowHeading_even.hAlign = GcSpread.Sheets.HorizontalAlign.left;
    style_rowHeading_even.borderLeft = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading_even.borderTop = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading_even.borderRight = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading_even.borderBottom = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    //This style will be used for Even Data row heading.
    style_rowHeading_text_even = new GcSpread.Sheets.Style();
    style_rowHeading_text_even.foreColor = "#4f4f4f";
    style_rowHeading_text_even.backColor = "#f8f9fa";//"#f8f9fa";
    style_rowHeading_text_even.hAlign = GcSpread.Sheets.HorizontalAlign.right;
    style_rowHeading_text_even.textIndent = 0.25;
    style_rowHeading_text_even.borderLeft = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading_text_even.borderTop = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading_text_even.borderRight = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_rowHeading_text_even.borderBottom = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    //This style will be used for Data row heading.
    style_footer = new GcSpread.Sheets.Style();
    style_footer.foreColor = "Black";
    style_footer.backColor = "#ebf3fb";
    style_footer.font = "bold 10.5pt Calibri";
    style_footer.hAlign = GcSpread.Sheets.HorizontalAlign.left;
    style_footer.borderLeft = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_footer.borderTop = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_footer.borderRight = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_footer.borderBottom = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    //This style will be used for Data row heading.
    style_footer_text = new GcSpread.Sheets.Style();
    style_footer_text.foreColor = "Black";
    style_footer_text.backColor = "#ebf3fb";
    style_footer_text.font = "bold 10.5pt Calibri";
    style_footer_text.hAlign = GcSpread.Sheets.HorizontalAlign.right;
    style_footer_text.textIndent = 0.25;
    style_footer_text.borderLeft = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_footer_text.borderTop = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_footer_text.borderRight = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
    style_footer_text.borderBottom = new GcSpread.Sheets.LineBorder("#cacaca", $.wijmo.wijspread.LineStyle.thin);
}
function renderCashAccount(ownerId, sheetCount) {
    var tempInc, temp;
    var col = 0, row = 0, displayedRow = 0;
    var cashOpeningRow = 0;
    var isInflow = false, isOutflow = false;
    var inflowStartRowIndex = 0, outflowStartRowIndex = 0, inflowTotalRowIndex = 0, outflowTotalRowIndex = 0;
    var totalTaxableIncome = '', totalEmployeeContributions='';
    var openingRow = 0;
    var incomeDuration = 0, expenseDuration = 0;
    var sheetName = "CashAccount_" + ownerId;
    var ownerIncome = $.grep(income, function (element, index) {
        return element.OwnerId == ownerId;
    });
    var ownerTaxableIncome = $.grep(income, function (element, index) {
        return element.Taxable == true;
    });
    var ownerNonTaxableIncome = $.grep(income, function (element, index) {
        return element.Taxable == false;
    });
    var ownerInvIncome = $.grep(investment, function (element, index) {
        return element.OwnerId == ownerId && (element.income > 0||element.rent>0);
    });
    var ownerExpense = $.grep(expense, function (element, index) {
        return element.OwnerId == ownerId;
    });
    var ownerLiaExpense = $.grep(liability, function (element, index) {
        return element.OwnerId == ownerId;
    });
    var ownerContributionData = $.grep(contributions, function (element, index) {
        return element.OwnerId == ownerId;
    });
    var ownerInvRedemption = $.grep(investment, function (element, index) {
        return element.OwnerId == ownerId;
    });
    var openingAmount = 0;
    var cashAccount = spread.getSheet(sheetCount);
    cashAccount.setName("CashAccount_" + ownerId);
    cashAccount.setColumnCount(years + 1, 1);
    //cashAccount.setRowHeaderVisible(false);
    //cashAccount.setColumnHeaderVisible(false);
    cashAccount.setDefaultStyle(defaultStyle, GcSpread.Sheets.SheetArea.viewport);
    cashAccount.getRow(row).hAlign = GcSpread.Sheets.HorizontalAlign.right;

    //Setting the first row Age.
    cashAccount.setValue(row, 0, ' Financial Year ');
    cashAccount.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    cashAccount.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.
    cashAccount.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        cashAccount.setValue(row, col + 1, '  '+(startYear + col) + '/' + (startYear + col+1)+'  ');
    }    
    //Setting the second row Financial year.
    row++;
    cashAccount.setValue(row, 0, ' Client Age ');
    cashAccount.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    cashAccount.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
    cashAccount.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        cashAccount.setValue(row, col + 1, '' + (clientAge + col));
        cashAccount.getCell(row, col + 1).formatter("##");
    }
    if (partnerAge > 0) {
        row++;
        cashAccount.setValue(row, 0, ' Partner Age ');
        cashAccount.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
        cashAccount.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
        for (var col = 0; col < years; col++)//looping for years.
        {
            cashAccount.setValue(row, col + 1, '' + (partnerAge + col));
            cashAccount.getCell(row, col + 1).formatter("##");
        }
        cashAccount.setFrozenRowCount(3);
        cashAccount.frozenlineColor("#cacaca");
    }
    else {
        cashAccount.setFrozenRowCount(2);
        cashAccount.frozenlineColor("#cacaca");
    }



    //Setting opening balance row will be always at 3rd position.
    row++;
    openingRow = row;
    cashAccount.setValue(row, 0, ' Opening ');
    cashAccount.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);
    cashAccount.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);
    cashAccount.setValue(row, 1, openingAmount);
    cashAccount.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    cashAccount.addCustomName("cashOpening", "=0", row + 1, 2);
    cashOpeningRow = row + 1;
    //Setting inflow section.
    row++;
    cashAccount.setValue(row, 0, ' Inflows ');
    cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
    inflowStartRowIndex = row + 1;
    if (ownerIncome.length > 0) {
        if (ownerTaxableIncome.length > 0) {
            row++;
            isInflow = true;
            cashAccount.setValue(row, 0, '  Taxable Earned Income ');
            cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
            //Now looping for each Taxable income.
            displayedRow = 0;
            for (var inc in ownerTaxableIncome) {
                tempInc = ownerTaxableIncome[inc];
                col = Math.abs(tempInc.startYear - startYear) + 1;//this will ensure that income display should start from exact year when it is started.
                incomeDuration = (parseInt(tempInc.endYear) - parseInt(tempInc.startYear)) + 1;
                if (incomeDuration > years) {
                    incomeDuration = years;
                }
                row++;
                displayedRow++;
                cashAccount.setValue(row, 0, ' ' + tempInc.Description);
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                if (displayedRow % 2 == 0) {
                    cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                else {
                    cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                if (incomeDuration <= 1) {
                    cashAccount.setFormula(row, col, '=' + tempInc.Amount + '*' + getDaysInFinancialYear(tempInc.startDate, tempInc.endDate) + '/365');//.formatter("#.##%");                                
                }
                else {
                    cashAccount.setFormula(row, col, '=' + tempInc.Amount + '*' + tempInc.startYearDays + '/365');                                                                cashAccount.setFormula(row, col + 1, '=' + tempInc.Amount + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + tempInc.growth + '/100)');
                    if (incomeDuration > 2) {                        
                        cashAccount.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + tempInc.growth + '/100)');

                        var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                        var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, incomeDuration - 2);//excluding first & last year(-2)
                        cashAccount.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                        //rendering last year data.
                        if ((parseInt(tempInc.endYear) - parseInt(tempInc.startYear) + 1) <= years) {
                            cashAccount.setFormula(row, (col + incomeDuration - 1), '=' + GetAbsoluteExcelCell(row + 1, col + incomeDuration - 1) + '*(1+' + tempInc.growth + '/100)*(' + tempInc.endYearDays + '/365)');//.formatter("#.##%");
                        }
                    }                    
                }
                totalTaxableIncome += GetAbsoluteExcelCell(row + 1, 2) + '+';
                if (tempInc.type == 1 && tempInc.SuperContributions > 0) {
                    tempInc.SuperContributions = tempInc.SuperContributions > 100 ? 100 : tempInc.SuperContributions;
                    totalEmployeeContributions += '(' + GetAbsoluteExcelCell(row + 1, 2) + '*' + tempInc.SuperContributions + '/100)+';
                }
                rowLookup[sheetName + "_" + row] = "inc_" + tempInc.id;

            }
        }
        if (ownerNonTaxableIncome.length > 0) {
            isInflow = true;
            row++;
            cashAccount.setValue(row, 0, '  Non Taxable Earned Income ');
            cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
            //Now looping for each Non Taxable income.
            displayedRow = 0;

            for (var inc in ownerNonTaxableIncome) {
                tempInc = ownerNonTaxableIncome[inc];
                col = Math.abs(tempInc.startYear - startYear) + 1;//this will ensure that income display should start from exact year when it is started.
                incomeDuration = (parseInt(tempInc.endYear) - parseInt(tempInc.startYear)) + 1;
                if (incomeDuration > years)
                    incomeDuration = years;
                row++;
                displayedRow++;
                cashAccount.setValue(row, 0, ' ' + tempInc.Description);
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                if (displayedRow % 2 == 0) {
                    cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                else {
                    cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                if (incomeDuration <= 1) {
                    cashAccount.setFormula(row, col, '=' + tempInc.Amount + '*' + getDaysInFinancialYear(tempInc.startDate, tempInc.endDate) + '/365');//.formatter("#.##%");                                
                }
                else {
                    cashAccount.setFormula(row, col, '=' + tempInc.Amount + '*' + tempInc.startYearDays + '/365');                               
                    cashAccount.setFormula(row, col + 1, '=' + tempInc.Amount + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + tempInc.growth + '/100)');
                    if (incomeDuration > 2) {                        
                        cashAccount.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + tempInc.growth + '/100)');

                        var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                        var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, incomeDuration - 2);//excluding first & last year(-2)
                        cashAccount.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                        //rendering last year data.
                        if ((parseInt(tempInc.endYear) - parseInt(tempInc.startYear) + 1) <= years) {
                            cashAccount.setFormula(row, (col + incomeDuration - 1), '=' + GetAbsoluteExcelCell(row + 1, col + incomeDuration - 1) + '*(1+' + tempInc.growth + '/100)*(' + tempInc.endYearDays + '/365)');//.formatter("#.##%"); 
                        }
                    }                    
                }
                if (tempInc.type == 1 && tempInc.SuperContributions > 0) {
                    tempInc.SuperContributions = tempInc.SuperContributions > 100 ? 100 : tempInc.SuperContributions;
                    totalEmployeeContributions += '(' + GetAbsoluteExcelCell(row + 1, 2) + '*' + tempInc.SuperContributions + '/100)+';
                }
                rowLookup[sheetName + "_" + row] = "inc_" + tempInc.id;
            }
        }
    }
    //Setting income from investment.
    if (ownerInvIncome.length > 0) {
        isInflow = true;
        var sheetName = 'Asset_' + ownerId;
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var ownerAssetSheet = spread.getSheetFromName('Asset_' + ownerId);
        row++;
        cashAccount.setValue(row, 0, '  Investment Income ');
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
        displayedRow = 0;
        col = 1;
        var assetSheetData;
        for (var inv in ownerInvIncome) {
            temp = ownerInvIncome[inv];
            assetSheetData = ownerAssetSheet.getCustomName('invOpening' + temp.id);
            if (assetSheetData != undefined && assetSheetData._baseRow != undefined && assetSheetData._baseColumn != undefined) {
                row++;
                cashAccount.setValue(row, 0, '   ' + temp.Description);
                cashAccount.setFormula(row, 1, '=' + sheetName + '!' + GetAbsoluteExcelCell(assetSheetData._baseRow - 2, assetSheetData._baseColumn));
                displayedRow++;
                if (displayedRow % 2 == 0) {
                    cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                else {
                    cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                var startInvIncome = new GcSpread.Sheets.Range(row, 1, 1, 1);
                var endInvIncome = new GcSpread.Sheets.Range(row, 1, 1, years);
                cashAccount.fillAuto(startInvIncome, endInvIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            }
        }
    }
    //Setting income from investment redemption.
    if (ownerInvRedemption.length > 0) {
        isInflow = true;
        var sheetName = 'Asset_' + ownerId;
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var ownerAssetSheet = spread.getSheetFromName('Asset_' + ownerId);
        row++;
        cashAccount.setValue(row, 0, '  Investment Redemptions ');
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
        displayedRow = 0;
        col = 1;
        var redemption, isRedemption = false;
        for (var inv in ownerInvRedemption) {
            tempInv = ownerInvRedemption[inv];
            redemption = ownerAssetSheet.getCustomName('invRedemption' + tempInv.id);
            if (redemption != undefined && redemption._baseRow != undefined && redemption._baseColumn != undefined) {
                row++;
                isRedemption = true;
                cashAccount.setValue(row, 0, '   ' + tempInv.Description);
                cashAccount.setFormula(row, 1, '=' + sheetName + '!' + GetAbsoluteExcelCell(redemption._baseRow, redemption._baseColumn));
                displayedRow++;
                if (displayedRow % 2 == 0) {
                    cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                else {
                    cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                var startRed = new GcSpread.Sheets.Range(row, 1, 1, 1);
                var endRed = new GcSpread.Sheets.Range(row, 1, 1, years);
                cashAccount.fillAuto(startRed, endRed, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            }
        }
        if (!isRedemption)
            cashAccount.getRow(row).visible(false);
    }
    //Setting income from Pension.
    var pensionSheet = spread.getSheetFromName('Pension_' + ownerId);
    var totalPensionRow = pensionSheet.getCustomName('totalPension' + ownerId);
    if (totalPensionRow != undefined && totalPensionRow._baseRow != undefined && totalPensionRow._baseColumn) {
        col = 1;
        row++;
        cashAccount.setValue(row, 0, '   Pension and Annuity Income ');
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
        row++;
        cashAccount.setValue(row, 0, '   Income from Pension');
        cashAccount.setFormula(row, 1, '=Pension_' + ownerId + '!' + GetAbsoluteExcelCell(totalPensionRow._baseRow, totalPensionRow._baseColumn));
        cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        var startPensionIncome = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endPensionIncome = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(startPensionIncome, endPensionIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    }

    if (isInflow)//Show total inflow if there is any income.
    {
        row++;
        cashAccount.setValue(row, 0, ' Total inflows ');
        cashAccount.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(inflowStartRowIndex + 1, 2) + ':' + GetAbsoluteExcelCell(row, 2) + ')');//check cell formula.
        cashAccount.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var startTotalInflow = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endTotalInflow = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(startTotalInflow, endTotalInflow, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        cashAccount.addCustomName("totalInflow" + ownerId, "=0", row + 1, 2);
        inflowTotalRowIndex = row;
    }

    //Setting up outflow section now.
    row++;
    cashAccount.setValue(row, 0, ' Outflows ');
    cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    outflowStartRowIndex = row + 1;
    if (ownerExpense.length > 0) {
        var tempExp;
        isOutflow = true;
        //row++;

        //cashAccount.setValue(row, 0, '   Type of expense');
        //cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
        //Now looping for each Taxable income.
        displayedRow = 0;
        for (var exp in ownerExpense) {
            tempExp = ownerExpense[exp];
            col = Math.abs(tempExp.startYear - startYear) + 1;//this will ensure that income display should start from exact year when it is started.         
            expenseDuration = (parseInt(tempExp.endYear) - parseInt(tempExp.startYear)) + 1;
            if (expenseDuration > years) {
                expenseDuration = years;
            }
            row++;
            displayedRow++;
            cashAccount.setValue(row, 0, ' ' + tempExp.Description);
            cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            if (displayedRow % 2 == 0) {
                cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            if (expenseDuration <= 1) {
                cashAccount.setFormula(row, col, '=' + tempExp.Amount + '*' + getDaysInFinancialYear(tempExp.startDate, tempExp.endDate) + '/365');//.formatter("#.##%");                                
            }
            else {
                cashAccount.setFormula(row, col, '=' + tempExp.Amount + '*' + tempInc.startYearDays + '/365');      
                cashAccount.setFormula(row, col + 1, '=' + tempExp.Amount + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + tempExp.growth + '/100)');
                if (expenseDuration > 2) {                    
                    cashAccount.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + tempExp.growth + '/100)');

                    var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                    var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, expenseDuration - 2);//excluding first & last year(-2)
                    cashAccount.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                    //rendering last year data.
                    if ((parseInt(tempExp.endYear) - parseInt(tempExp.startYear) + 1) <= years) {
                        cashAccount.setFormula(row, (col + expenseDuration - 1), '=' + GetAbsoluteExcelCell(row + 1, col + expenseDuration - 1) + '*(1+' + tempInc.growth + '/100)*(' + tempInc.endYearDays + '/365)');//.formatter("#.##%"); 
                    }
                }                
            }
            rowLookup[sheetName + "_" + row] = "exp_" + tempExp.id;
        }
    }
    //Setting Super contributions.
    var ownerSuperSheet = spread.getSheetFromName('Super_' + ownerId);
    displayedRow = 0;
    if (ownerSuperSheet != undefined) {
        var concessionalRow = ownerSuperSheet.getCustomName('concessionalRow');
        var nonConcessionalRow = ownerSuperSheet.getCustomName('nonConcessionalRow');
        row++;
        cashAccount.setValue(row, 0, '   Super Contributions');
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
        if (nonConcessionalRow != undefined && nonConcessionalRow._baseRow != undefined && nonConcessionalRow._baseColumn != undefined) {
            displayedRow++; row++;
            cashAccount.setValue(row, 0, '   Non Concessional Contributions');
            cashAccount.setFormula(row, 1, '=Super_' + ownerId + '!' + GetAbsoluteExcelCell(nonConcessionalRow._baseRow, nonConcessionalRow._baseColumn));
            displayedRow++;
            if (displayedRow % 2 == 0) {
                cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startCc = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endCc = new GcSpread.Sheets.Range(row, 1, 1, years);
            cashAccount.fillAuto(startCc, endCc, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        }
        if (concessionalRow != undefined && concessionalRow._baseRow != undefined && concessionalRow._baseColumn != undefined) {
            displayedRow++; row++;
            cashAccount.setValue(row, 0, '   Concessional Contributions');
            cashAccount.setFormula(row, 1, '=Super_' + ownerId + '!' + GetAbsoluteExcelCell(concessionalRow._baseRow, concessionalRow._baseColumn));
            displayedRow++;
            if (displayedRow % 2 == 0) {
                cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startCc = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endCc = new GcSpread.Sheets.Range(row, 1, 1, years);
            cashAccount.fillAuto(startCc, endCc, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        }
        if (displayedRow == 0) {
            if (cashAccount.getRow(row) != undefined)
                cashAccount.getRow(row).visible(false);//hiding Super Contribution row as there is no data to display.
        }

    }

    //Setting expenses incurred for liabilities.
    if (ownerLiaExpense.length > 0) {
        var tempExp;
        isOutflow = true;
        row++;
        cashAccount.setValue(row, 0, '   Loan Repayments');
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
        //Now looping for each Taxable income.
        var liabilitySheet = spread.getSheetFromName('Liability_' + ownerId);
        var totalRepaymentRow;
        displayedRow = 0;
        if (liabilitySheet != undefined) {
            for (var exp in ownerLiaExpense) {
                tempExp = ownerLiaExpense[exp];
                totalRepaymentRow = liabilitySheet.getCustomName('totalRepayment' + tempExp.id);
                if (totalRepaymentRow != undefined && totalRepaymentRow._baseRow != undefined && totalRepaymentRow._baseColumn != undefined) {
                    row++;
                    cashAccount.setValue(row, 0, ' ' + tempExp.Description);
                    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                    cashAccount.setFormula(row, 1, '=Abs(Liability_' + ownerId + '!' + GetAbsoluteExcelCell(totalRepaymentRow._baseRow, totalRepaymentRow._baseColumn) + ')');
                    displayedRow++;
                    if (displayedRow % 2 == 0) {
                        cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    }
                    else {
                        cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    }
                    var startPensionIncome = new GcSpread.Sheets.Range(row, 1, 1, 1);
                    var endPensionIncome = new GcSpread.Sheets.Range(row, 1, 1, years);
                    cashAccount.fillAuto(startPensionIncome, endPensionIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                }

            }
        }
    }

    //Adding Personal Contributions.
    if (ownerContributionData.length > 0) {
        row++;
        cashAccount.setValue(row, 0, ' Personal Contributions ');
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
        isOutflow = true;
        //Now looping for each contribution.            
        for (var cont in ownerContributionData) {
            tempCont = ownerContributionData[cont];
            col = Math.abs(tempCont.startYear - startYear) + 1;//this will ensure that contribution display should start from exact year when it is started.
            contDuration = (parseInt(tempCont.endYear) - parseInt(tempCont.startYear)) + 1;
            if (contDuration > years) {
                contDuration = years;
            }
            row++;
            displayedRow++;
            cashAccount.setValue(row, 0, ' ' + tempCont.Description);
            cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            if (displayedRow % 2 == 0) {
                cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            if (contDuration <= 1) {
                cashAccount.setFormula(row, col, '=' + tempCont.Amount + '*' + getDaysInFinancialYear(tempCont.startDate, tempCont.endDate) + '/365');//.formatter("#.##%");                                
            }
            else {
                cashAccount.setFormula(row, col, '=' + tempCont.Amount + '*' + tempCont.startYearDays + '/365');        
                cashAccount.setFormula(row, col + 1, '=' + tempCont.Amount + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + tempCont.growth + '/100)');
                if (contDuration > 2) {                    
                    cashAccount.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + tempCont.growth + '/100)');

                    var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                    var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, contDuration - 2);//excluding first & last year(-2)
                    cashAccount.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                    //rendering last year data.
                    if ((parseInt(tempCont.endYear) - parseInt(tempCont.startYear) + 1) <= years) {
                        cashAccount.setFormula(row, (col + contDuration - 1), '=' + GetAbsoluteExcelCell(row + 1, col + contDuration - 1) + '*(1+' + tempCont.growth + '/100)*(' + tempCont.endYearDays + '/365)');//.formatter("#.##%");
                    }
                }               
            }            
        }
        col = 1;//Reset the col.
    }


    row++;
    cashAccount.setValue(row, 0, '   Tax');
    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
    //Setting row for tax. Formula will be rendered by Tax sheet.
    row++;
    cashAccount.setValue(row, 0, '   TaxPayable');
    cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    cashAccount.addCustomName("cashTaxRow_" + ownerId, "=0", row + 1, 2);
    //include liabilities, super contribution and tax.
    if (isOutflow||isInflow)//Show total Outflow if there is any expense or income.
    {
        row++;
        cashAccount.setValue(row, 0, ' Total Outflows ');
        cashAccount.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(outflowStartRowIndex + 1, 2) + ':' + GetAbsoluteExcelCell(row, 2) + ')');//check cell formula.
        cashAccount.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var startTotalOutflow = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endTotalOutflow = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(startTotalOutflow, endTotalOutflow, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        cashAccount.addCustomName("totalOutflow" + ownerId, "=0", row + 1, 2);
        outflowTotalRowIndex = row;
    }
    if (inflowTotalRowIndex > 0 && outflowTotalRowIndex > 0)//setting net cashflow row.
    {
        row++;
        cashAccount.setValue(row, 0, '  Cashflow');
        cashAccount.setFormula(row, 1, '=' + GetAbsoluteExcelCell(inflowTotalRowIndex + 1, 2) + '-' + GetAbsoluteExcelCell(outflowTotalRowIndex + 1, 2));//check cell formula.
        cashAccount.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var startCashflow = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endCashflow = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(startCashflow, endCashflow, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        row++;
        cashAccount.setValue(row, 0, ' Closing Balance');
        cashAccount.setFormula(row, 1, '=' + GetAbsoluteExcelCell(cashOpeningRow, 2) + '+' + GetAbsoluteExcelCell(row, 2));//check cell formula.
        cashAccount.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var startCb = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endCb = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(startCb, endCb, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);

        //setting remainig portion of opening row.
        cashAccount.setFormula(openingRow, 2, '=' + GetAbsoluteExcelCell(row + 1, 2));
        var startOpening = new GcSpread.Sheets.Range(openingRow, 2, 1, 1);
        var endOpening = new GcSpread.Sheets.Range(openingRow, 2, 1, years - 1);
        cashAccount.fillAuto(startOpening, endOpening, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    }

    //Setting total taxable income required in Tax Sheet. Hidden in this sheet.
    row++;
    totalTaxableIncome = totalTaxableIncome.slice(0, -1);
    cashAccount.setValue(row, 0, ' Total Taxable Income ');
    cashAccount.setFormula(row, 1, '=' + totalTaxableIncome);
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var r3 = new GcSpread.Sheets.Range(row, 1, 1, years);
    cashAccount.fillAuto(start, r3, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    cashAccount.addCustomName('CashTaxableIncome_' + ownerId, "0", row + 1, 2);
    cashAccount.getRow(row).visible(false);
    //Setting total Employe contribution required in Super Sheet. Hidden in this sheet.
    row++;
    totalEmployeeContributions = totalEmployeeContributions.slice(0, -1);
    cashAccount.setValue(row, 0, ' CashAccountEmployerContribution_');
    cashAccount.setFormula(row, 1, '=' + totalEmployeeContributions);
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var r3 = new GcSpread.Sheets.Range(row, 1, 1, years);
    cashAccount.fillAuto(start, r3, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    cashAccount.addCustomName('CashAccountEmployerContribution_' + ownerId, "0", row + 1, 2);
    cashAccount.getRow(row).visible(false);

    cashAccount.setRowCount(row + 1);
    //for (var i = 0; i <= years; i++) {
    //    cashAccount.autoFitColumn(i);
    //}
    cashAccount.clearSelection();
}

function renderJointCashAccount(ownerId, sheetCount) {
    var tempInc, temp;
    var col = 0, row = 0, displayedRow = 0;
    var isInflow = false, isOutflow = false;
    var cashRowOpening = 0;
    var inflowStartRowIndex = 0, outflowStartRowIndex = 0, inflowTotalRowIndex = 0, outflowTotalRowIndex = 0;
    var totalTaxableIncome = [],totalOwnersEmployeeContributions=[];
    var totalEntityTaxableIncome = '', totalEmployeeContributions='';
    var openingRow = 0;
    var incomeDuration = 0, expenseDuration = 0;
    var sortedEntities = [];
    for (i = 0; i < entity.length; i++) {
        if (entity[i].type == 1)
            sortedEntities[0] = entity[i];
        else if (entity[i].type == 2)
            sortedEntities[1] = entity[i];
        else if (entity[i].type == 3)
            sortedEntities[2] = entity[i];
    }
    var sheetName = "CashAccount_" + ownerId;

    var openingAmount = 0;
    var cashAccount = spread.getSheet(sheetCount);
    cashAccount.setName("CashAccount_" + ownerId);
    cashAccount.setColumnCount(years + 1, 1);
    //cashAccount.setRowHeaderVisible(false);
    //cashAccount.setColumnHeaderVisible(false);
    cashAccount.setDefaultStyle(defaultStyle, GcSpread.Sheets.SheetArea.viewport);

    //Setting the first row Age.
    cashAccount.setValue(row, 0, ' Financial Year ');
    cashAccount.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    cashAccount.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.
    cashAccount.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        cashAccount.setValue(row, col + 1, ' '+'  '+(startYear + col) + '/' + (startYear + col + 1)+'  '+' ');
    }
    //Setting the second row Financial year.
    row++;
    cashAccount.setValue(row, 0, ' Client Age ');
    cashAccount.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    cashAccount.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
    cashAccount.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        cashAccount.setValue(row, col + 1, '' + (clientAge + col));
        cashAccount.getCell(row, col + 1).formatter("##");
    }
    if (partnerAge > 0) {
        row++;
        cashAccount.setValue(row, 0, ' Partner Age ');
        cashAccount.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
        cashAccount.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
        for (var col = 0; col < years; col++)//looping for years.
        {
            cashAccount.setValue(row, col + 1, '' + (partnerAge + col));
            cashAccount.getCell(row, col + 1).formatter("##");
        }
        cashAccount.setFrozenRowCount(3);
        cashAccount.frozenlineColor("#cacaca");
    }
    else {
        cashAccount.setFrozenRowCount(2);
        cashAccount.frozenlineColor("#cacaca");
    }



    //Setting opening balance row will be always at 3rd position.
    row++;
    openingRow = row;
    cashAccount.setValue(row, 0, ' Opening ');
    cashAccount.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);
    cashAccount.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);
    cashAccount.setValue(row, 1, openingAmount);
    cashAccount.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    cashAccount.addCustomName("cashOpening", "=0", row + 1, 2);
    cashRowOpening = row + 1;
    //Setting inflow section.
    inflowStartRowIndex = row + 2;
    for (var e = 0; e < sortedEntities.length; e++) {
        if (sortedEntities[e].type == 1 || sortedEntities[e].type == 2 || sortedEntities[e].type == 3) {
            var entIncome = $.grep(income, function (element, index) {
                return element.OwnerId == sortedEntities[e].id;
            });
            var entTaxableIncome = $.grep(entIncome, function (element, index) {
                return element.Taxable == true;
            });
            var entNonTaxableIncome = $.grep(entIncome, function (element, index) {
                return element.Taxable == false;
            });
            var entInvIncome = $.grep(investment, function (element, index) {
                return element.OwnerId == sortedEntities[e].id && (element.income > 0||element.rent>0);
            });
            var entInvRedemption = $.grep(investment, function (element, index) {
                return element.OwnerId == sortedEntities[e].id;
            });

            row++;
            cashAccount.setValue(row, 0, ' Inflows(' + sortedEntities[e].fullname + ')');
            cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
            if (entIncome.length > 0) {
                if (entTaxableIncome.length > 0) {
                    row++;
                    isInflow = true;
                    cashAccount.setValue(row, 0, '   Taxable Earned Income ');
                    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                    cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
                    //Now looping for each Taxable income.
                    displayedRow = 0;
                    for (var inc in entTaxableIncome) {
                        tempInc = entTaxableIncome[inc];
                        col = Math.abs(tempInc.startYear - startYear) + 1;//this will ensure that income display should start from exact year when it is started.
                        incomeDuration = (parseInt(tempInc.endYear) - parseInt(tempInc.startYear)) + 1;
                        if (incomeDuration > years) {
                            incomeDuration = years;
                        }
                        row++;
                        displayedRow++;
                        cashAccount.setValue(row, 0, ' ' + tempInc.Description);
                        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                        if (displayedRow % 2 == 0) {
                            cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                            cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        }
                        else {
                            cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                            cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        }
                        if (incomeDuration <= 1) {
                            cashAccount.setFormula(row, col, '=' + tempInc.Amount + '*' + getDaysInFinancialYear(tempInc.startDate, tempInc.endDate) + '/365');//.formatter("#.##%");                                
                        }
                        else {
                            cashAccount.setFormula(row, col, '=' + tempInc.Amount + '*' + tempInc.startYearDays + '/365');//.formatter("#.##%");              
                            cashAccount.setFormula(row, col + 1, '=' + tempInc.Amount + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + tempInc.growth + '/100)');
                            if (incomeDuration > 2) {                                
                                cashAccount.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + tempInc.growth + '/100)');

                                var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                                var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, incomeDuration - 2);//excluding first & last year(-2)
                                cashAccount.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                                //rendering last year data.
                                if ((parseInt(tempInc.endYear) - parseInt(tempInc.startYear) + 1) <= years) {
                                    cashAccount.setFormula(row, (col + incomeDuration - 1), '=' + GetAbsoluteExcelCell(row + 1, col + incomeDuration - 1) + '*(1+' + tempInc.growth + '/100)*(' + tempInc.endYearDays + '/365)');//.formatter("#.##%");
                                }
                            }                            
                        }
                        totalEntityTaxableIncome += GetAbsoluteExcelCell(row + 1, 2) + '+';
                        if (tempInc.type == 1 && tempInc.SuperContributions > 0) {
                            tempInc.SuperContributions = tempInc.SuperContributions > 100 ? 100 : tempInc.SuperContributions;
                            totalEmployeeContributions += '(' + GetAbsoluteExcelCell(row + 1, 2) + '*' + tempInc.SuperContributions + '/100)+';
                        }
                        rowLookup[sheetName + "_" + row] = "inc_" + tempInc.id;

                    }
                    totalTaxableIncome[sortedEntities[e].id] = totalEntityTaxableIncome;
                    totalEntityTaxableIncome = '';
                }
                if (entNonTaxableIncome.length > 0) {
                    isInflow = true;
                    row++;
                    cashAccount.setValue(row, 0, '   Non Taxable Earned Income ');
                    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                    cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
                    //Now looping for each Non Taxable income.
                    displayedRow = 0;

                    for (var inc in entNonTaxableIncome) {
                        tempInc = entNonTaxableIncome[inc];
                        col = Math.abs(tempInc.startYear - startYear) + 1;//this will ensure that income display should start from exact year when it is started.
                        incomeDuration = (parseInt(tempInc.endYear) - parseInt(tempInc.startYear)) + 1;
                        if (incomeDuration > years)
                            incomeDuration = years;
                        row++;
                        displayedRow++;
                        cashAccount.setValue(row, 0, ' ' + tempInc.Description);
                        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                        if (displayedRow % 2 == 0) {
                            cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                            cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        }
                        else {
                            cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                            cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        }
                        if (incomeDuration <= 1) {
                            cashAccount.setFormula(row, col, '=' + tempInc.Amount + '*' + getDaysInFinancialYear(tempInc.startDate, tempInc.endDate) + '/365');//.formatter("#.##%");                                
                        }
                        else {
                            cashAccount.setFormula(row, col, '=' + tempInc.Amount + '*' + tempInc.startYearDays + '/365');//.formatter("#.##%");              
                            cashAccount.setFormula(row, col + 1, '=' + tempInc.Amount + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + tempInc.growth + '/100)');
                            if (incomeDuration > 2) {                                
                                cashAccount.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + tempInc.growth + '/100)');

                                var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                                var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, incomeDuration - 2);//excluding first & last year(-2)
                                cashAccount.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                                //rendering last year data.
                                if ((parseInt(tempInc.endYear) - parseInt(tempInc.startYear) + 1) <= years) {
                                    cashAccount.setFormula(row, (col + incomeDuration - 1), '=' + GetAbsoluteExcelCell(row + 1, col + incomeDuration - 1) + '*(1+' + tempInc.growth + '/100)*(' + tempInc.endYearDays + '/365)');//.formatter("#.##%"); 
                                }
                            }                            
                        }
                        if (tempInc.type == 1 && tempInc.SuperContributions > 0) {
                            tempInc.SuperContributions = tempInc.SuperContributions > 100 ? 100 : tempInc.SuperContributions;
                            totalEmployeeContributions += '(' + GetAbsoluteExcelCell(row + 1, 2) + '*' + tempInc.SuperContributions + '/100)+';
                        }
                        rowLookup[sheetName + "_" + row] = "inc_" + tempInc.id;
                    }
                }
            }
            totalOwnersEmployeeContributions[sortedEntities[e].id] = totalEmployeeContributions;
            totalEmployeeContributions = '';//Clearing this entity's contributions.
            //Setting income from investment.
            if (entInvIncome.length > 0) {
                isInflow = true;
                var sheetName = 'Asset_' + sortedEntities[e].id;
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                var ownerAssetSheet = spread.getSheetFromName('Asset_' + sortedEntities[e].id);
                row++;
                cashAccount.setValue(row, 0, '   Investment Income ');
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
                displayedRow = 0;
                col = 1;
                var assetSheetData;
                for (var inv in entInvIncome) {
                    temp = entInvIncome[inv];
                    assetSheetData = ownerAssetSheet.getCustomName('invOpening' + temp.id);
                    if (assetSheetData != undefined && assetSheetData._baseRow != undefined && assetSheetData._baseColumn != undefined) {
                        row++;
                        cashAccount.setValue(row, 0, '   ' + temp.Description);
                        cashAccount.setFormula(row, 1, '=' + sheetName + '!' + GetAbsoluteExcelCell(assetSheetData._baseRow - 2, assetSheetData._baseColumn));
                        displayedRow++;
                        if (displayedRow % 2 == 0) {
                            cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                            cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        }
                        else {
                            cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                            cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        }
                        var startInvIncome = new GcSpread.Sheets.Range(row, 1, 1, 1);
                        var endInvIncome = new GcSpread.Sheets.Range(row, 1, 1, years);
                        cashAccount.fillAuto(startInvIncome, endInvIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                    }
                }
            }

            //Setting income from investment redemption.
            if (entInvRedemption.length > 0) {
                isInflow = true;
                var sheetName = 'Asset_' + sortedEntities[e].id;
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                var ownerAssetSheet = spread.getSheetFromName('Asset_' + sortedEntities[e].id);
                row++;
                cashAccount.setValue(row, 0, '  Investment Redemptions ');
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
                displayedRow = 0;
                col = 1;
                var redemption, isRedemption = false;
                for (var inv in entInvRedemption) {
                    tempInv = entInvRedemption[inv];
                    redemption = ownerAssetSheet.getCustomName('invRedemption' + tempInv.id);
                    if (redemption != undefined && redemption._baseRow != undefined && redemption._baseColumn != undefined) {
                        row++;
                        isRedemption = true;
                        cashAccount.setValue(row, 0, '   ' + tempInv.Description);
                        cashAccount.setFormula(row, 1, '=' + sheetName + '!' + GetAbsoluteExcelCell(redemption._baseRow, redemption._baseColumn));
                        displayedRow++;
                        if (displayedRow % 2 == 0) {
                            cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                            cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        }
                        else {
                            cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                            cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        }
                        var startRed = new GcSpread.Sheets.Range(row, 1, 1, 1);
                        var endRed = new GcSpread.Sheets.Range(row, 1, 1, years);
                        cashAccount.fillAuto(startRed, endRed, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                    }
                }
                if (!isRedemption)
                    cashAccount.getRow(row).visible(false);
            }

            //Setting income from Pension.
            var pensionSheet = spread.getSheetFromName('Pension_' + sortedEntities[e].id);
            if (pensionSheet != undefined) {
                var totalPensionRow = pensionSheet.getCustomName('totalPension' + sortedEntities[e].id);
                if (totalPensionRow != undefined && totalPensionRow._baseRow != undefined && totalPensionRow._baseColumn) {
                    isInflow = true;
                    col = 1;
                    row++;
                    cashAccount.setValue(row, 0, '   Pension and Annuity Income ');
                    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                    cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
                    row++;
                    cashAccount.setValue(row, 0, '   Income from Pension');
                    cashAccount.setFormula(row, 1, '=Pension_' + sortedEntities[e].id + '!' + GetAbsoluteExcelCell(totalPensionRow._baseRow, totalPensionRow._baseColumn));
                    cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    var startPensionIncome = new GcSpread.Sheets.Range(row, 1, 1, 1);
                    var endPensionIncome = new GcSpread.Sheets.Range(row, 1, 1, years);
                    cashAccount.fillAuto(startPensionIncome, endPensionIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

                }
            }
        }
    }
    if (isInflow)//Show total inflow if there is any income.
    {
        
        row++;
        cashAccount.setValue(row, 0, ' Total inflows ');
        cashAccount.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(inflowStartRowIndex + 1, 2) + ':' + GetAbsoluteExcelCell(row, 2) + ')');//check cell formula.
        cashAccount.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var startTotalInflow = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endTotalInflow = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(startTotalInflow, endTotalInflow, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        cashAccount.addCustomName("totalInflow" + ownerId, "=0", row + 1, 2);
        inflowTotalRowIndex = row;
    }

    //Setting up outflow section now.
    outflowStartRowIndex = row + 2;
    for (var e = 0; e < sortedEntities.length; e++) {
        if (sortedEntities[e].type == 1 || sortedEntities[e].type == 2 || sortedEntities[e].type == 3) {
            var entExpense = $.grep(expense, function (element, index) {
                return element.OwnerId == sortedEntities[e].id;
            });
            var entLiaExpense = $.grep(liability, function (element, index) {
                return element.OwnerId == sortedEntities[e].id;
            });
            var ownerContributionData = $.grep(contributions, function (element, index) {
                return element.OwnerId == sortedEntities[e].id;
            });
            row++;
            cashAccount.setValue(row, 0, ' Outflows(' + sortedEntities[e].fullname + ')');
            cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
            cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            if (entExpense.length > 0) {
                var tempExp;
                isOutflow = true;
                //row++;

                //cashAccount.setValue(row, 0, '   Type of expense');
                //cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
                //Now looping for each Taxable income.
                displayedRow = 0;
                for (var exp in entExpense) {
                    tempExp = entExpense[exp];
                    col = Math.abs(tempExp.startYear - startYear) + 1;//this will ensure that income display should start from exact year when it is started.         
                    expenseDuration = (parseInt(tempExp.endYear) - parseInt(tempExp.startYear)) + 1;
                    if (expenseDuration > years) {
                        expenseDuration = years;
                    }
                    row++;
                    displayedRow++;
                    cashAccount.setValue(row, 0, ' ' + tempExp.Description);
                    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                    if (displayedRow % 2 == 0) {
                        cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    }
                    else {
                        cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    }
                    if (expenseDuration <= 1) {
                        cashAccount.setFormula(row, col, '=' + tempExp.Amount + '*' + getDaysInFinancialYear(tempExp.startDate, tempExp.endDate) + '/365');//.formatter("#.##%");                                
                    }
                    else {
                        cashAccount.setFormula(row, col, '=' + tempExp.Amount + '*' + tempInc.startYearDays + '/365');//.formatter("#.##%");                  
                        cashAccount.setFormula(row, col + 1, '=' + tempExp.Amount + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + tempExp.growth + '/100)');
                        if (expenseDuration > 2) {                            
                            cashAccount.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + tempExp.growth + '/100)');

                            var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                            var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, expenseDuration - 2);//excluding first & last year(-2)
                            cashAccount.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                            //rendering last year data.
                            if ((parseInt(tempExp.endYear) - parseInt(tempExp.startYear) + 1) <= years) {
                                cashAccount.setFormula(row, (col + expenseDuration - 1), '=' + GetAbsoluteExcelCell(row + 1, col + expenseDuration - 1) + '*(1+' + tempInc.growth + '/100)*(' + tempInc.endYearDays + '/365)');//.formatter("#.##%"); 
                            }
                        }                       
                    }
                    rowLookup[sheetName + "_" + row] = "exp_" + tempExp.id;
                }
            }
            //Setting Super contributions.
            var ownerSuperSheet = spread.getSheetFromName('Super_' + sortedEntities[e].id);
            displayedRow = 0;
            if (ownerSuperSheet != undefined) {
                var concessionalRow = ownerSuperSheet.getCustomName('concessionalRow');
                var nonConcessionalRow = ownerSuperSheet.getCustomName('nonConcessionalRow');
                row++;
                cashAccount.setValue(row, 0, '   Super Contributions');
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
                if (nonConcessionalRow != undefined && nonConcessionalRow._baseRow != undefined && nonConcessionalRow._baseColumn != undefined) {
                    isOutflow = true;
                    displayedRow++; row++;
                    cashAccount.setValue(row, 0, '   Non Concessional Contributions');
                    cashAccount.setFormula(row, 1, '=Super_' + sortedEntities[e].id + '!' + GetAbsoluteExcelCell(nonConcessionalRow._baseRow, nonConcessionalRow._baseColumn));
                    displayedRow++;
                    if (displayedRow % 2 == 0) {
                        cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    }
                    else {
                        cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    }
                    var startCc = new GcSpread.Sheets.Range(row, 1, 1, 1);
                    var endCc = new GcSpread.Sheets.Range(row, 1, 1, years);
                    cashAccount.fillAuto(startCc, endCc, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                }
                if (concessionalRow != undefined && concessionalRow._baseRow != undefined && concessionalRow._baseColumn != undefined) {
                    isOutflow = true;
                    displayedRow++; row++;
                    cashAccount.setValue(row, 0, '   Concessional Contributions');
                    cashAccount.setFormula(row, 1, '=Super_' + sortedEntities[e].id + '!' + GetAbsoluteExcelCell(concessionalRow._baseRow, concessionalRow._baseColumn));
                    displayedRow++;
                    if (displayedRow % 2 == 0) {
                        cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    }
                    else {
                        cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    }
                    var startCc = new GcSpread.Sheets.Range(row, 1, 1, 1);
                    var endCc = new GcSpread.Sheets.Range(row, 1, 1, years);
                    cashAccount.fillAuto(startCc, endCc, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                }
                if (displayedRow == 0) {
                    if (cashAccount.getRow(row) != undefined)
                        cashAccount.getRow(row).visible(false);//hiding Super Contribution row as there is no data to display.
                }

            }

            //Adding Personal Contributions.
            if (ownerContributionData.length > 0) {
                row++;
                cashAccount.setValue(row, 0, ' Personal Contributions ');
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
                isOutflow = true;
                //Now looping for each contribution.            
                for (var cont in ownerContributionData) {
                    tempCont = ownerContributionData[cont];
                    col = Math.abs(tempCont.startYear - startYear) + 1;//this will ensure that contribution display should start from exact year when it is started.
                    contDuration = (parseInt(tempCont.endYear) - parseInt(tempCont.startYear)) + 1;
                    if (contDuration > years) {
                        contDuration = years;
                    }
                    row++;
                    displayedRow++;
                    cashAccount.setValue(row, 0, ' ' + tempCont.Description);
                    cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                    if (displayedRow % 2 == 0) {
                        cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    }
                    else {
                        cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                        cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    }
                    if (contDuration <= 1) {
                        cashAccount.setFormula(row, col, '=' + tempCont.Amount + '*' + getDaysInFinancialYear(tempCont.startDate, tempCont.endDate) + '/365');//.formatter("#.##%");                                
                    }
                    else {
                        cashAccount.setFormula(row, col, '=' + tempCont.Amount + '*' + tempCont.startYearDays + '/365');//.formatter("#.##%");                
                        cashAccount.setFormula(row, col + 1, '=' + tempCont.Amount + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + tempCont.growth + '/100)');
                        if (contDuration > 2) {           
                            cashAccount.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + tempCont.growth + '/100)');

                            var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                            var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, contDuration - 2);//excluding first & last year(-2)
                            cashAccount.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                            //rendering last year data.
                            if ((parseInt(tempCont.endYear) - parseInt(tempCont.startYear) + 1) <= years) {
                                cashAccount.setFormula(row, (col + contDuration - 1), '=' + GetAbsoluteExcelCell(row + 1, col + contDuration - 1) + '*(1+' + tempCont.growth + '/100)*(' + tempCont.endYearDays + '/365)');//.formatter("#.##%");
                            }
                        }                        
                    }
                }
                col = 1;//Reset the col.
            }

            //Setting expenses incurred for liabilities.
            if (entLiaExpense.length > 0) {
                var tempExp;
                isOutflow = true;
                row++;
                cashAccount.setValue(row, 0, '   Loan Repayments');
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
                //Now looping for each Taxable income.
                var liabilitySheet = spread.getSheetFromName('Liability_' + sortedEntities[e].id);
                var totalRepaymentRow;
                displayedRow = 0;
                if (liabilitySheet != undefined) {
                    for (var exp in entLiaExpense) {
                        tempExp = entLiaExpense[exp];
                        totalRepaymentRow = liabilitySheet.getCustomName('totalRepayment' + tempExp.id);
                        if (totalRepaymentRow != undefined && totalRepaymentRow._baseRow != undefined && totalRepaymentRow._baseColumn != undefined) {
                            row++;
                            cashAccount.setValue(row, 0, ' ' + tempExp.Description);
                            cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                            cashAccount.setFormula(row, 1, '=Abs(Liability_' + sortedEntities[e].id + '!' + GetAbsoluteExcelCell(totalRepaymentRow._baseRow, totalRepaymentRow._baseColumn) + ')');
                            displayedRow++;
                            if (displayedRow % 2 == 0) {
                                cashAccount.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                                cashAccount.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                            }
                            else {
                                cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                                cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                            }
                            var startPensionIncome = new GcSpread.Sheets.Range(row, 1, 1, 1);
                            var endPensionIncome = new GcSpread.Sheets.Range(row, 1, 1, years);
                            cashAccount.fillAuto(startPensionIncome, endPensionIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                            cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                        }

                    }
                }

            }
            if (sortedEntities[e].type != 3) {
                row++;
                cashAccount.setValue(row, 0, '   Tax');
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                cashAccount.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
                //Setting row for tax. Formula will be rendered by Tax sheet.
                row++;
                isOutflow = true;
                cashAccount.setValue(row, 0, '   TaxPayable');
                cashAccount.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                cashAccount.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                cashAccount.addCustomName("cashTaxRow_" + sortedEntities[e].id, "=0", row + 1, 2);
            }
        }
    }
    //include liabilities, super contribution and tax.
    if (isOutflow||isInflow)//Show total Outflow if there is any expense or income.
    {
        row++;
        cashAccount.setValue(row, 0, ' Total Outflows ');
        cashAccount.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(outflowStartRowIndex + 1, 2) + ':' + GetAbsoluteExcelCell(row, 2) + ')');//check cell formula.
        cashAccount.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var startTotalOutflow = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endTotalOutflow = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(startTotalOutflow, endTotalOutflow, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        cashAccount.addCustomName("totalOutflow" + ownerId, "=0", row + 1, 2);
        outflowTotalRowIndex = row;
    }
    if (inflowTotalRowIndex > 0 && outflowTotalRowIndex > 0)//setting net cashflow row.
    {
        row++;
        cashAccount.setValue(row, 0, '  Cashflow');
        cashAccount.setFormula(row, 1, '=' + GetAbsoluteExcelCell(inflowTotalRowIndex + 1, 2) + '-' + GetAbsoluteExcelCell(outflowTotalRowIndex + 1, 2));//check cell formula.
        cashAccount.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var startCashflow = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endCashflow = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(startCashflow, endCashflow, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        row++;
        cashAccount.setValue(row, 0, ' Closing Balance');
        cashAccount.setFormula(row, 1, '=' + GetAbsoluteExcelCell(cashRowOpening, 2) + '+' + GetAbsoluteExcelCell(row, 2));//check cell formula.
        cashAccount.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        cashAccount.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var startCb = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endCb = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(startCb, endCb, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);

        //setting remainig portion of opening row.
        cashAccount.setFormula(openingRow, 2, '=' + GetAbsoluteExcelCell(row + 1, 2));
        var startOpening = new GcSpread.Sheets.Range(openingRow, 2, 1, 1);
        var endOpening = new GcSpread.Sheets.Range(openingRow, 2, 1, years - 1);
        cashAccount.fillAuto(startOpening, endOpening, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    }

    //Setting total taxable income required in Tax Sheet. Hidden in this sheet.
    for (var tax in totalTaxableIncome) {
        
        row++;
        totalEntityTaxableIncome = totalTaxableIncome[tax].slice(0, -1);
        cashAccount.setValue(row, 0, ' Total Taxable Income ');
        cashAccount.setFormula(row, 1, '=' + totalEntityTaxableIncome);
        var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var r3 = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(start, r3, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        cashAccount.addCustomName('CashTaxableIncome_' + tax, "0", row + 1, 2);
        cashAccount.getRow(row).visible(false);
    }
    for (var ec in totalOwnersEmployeeContributions) {

        row++;
        totalEmployeeContributions = totalOwnersEmployeeContributions[ec].slice(0, -1);
        cashAccount.setValue(row, 0, ' Total Employer Contribution_'+ec);
        cashAccount.setFormula(row, 1, '=' + totalEmployeeContributions);
        var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var r3 = new GcSpread.Sheets.Range(row, 1, 1, years);
        cashAccount.fillAuto(start, r3, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        cashAccount.addCustomName('CashAccountEmployerContribution_' + ec, "0", row + 1, 2);
        cashAccount.getRow(row).visible(false);
    }

    cashAccount.setRowCount(row + 1);
    //for (var i = 0; i <= years; i++) {
    //    cashAccount.autoFitColumn(i);
    //}
    cashAccount.clearSelection();
}
function renderAsset(ownerId, sheetCount) {
    //variable required.
    var totalAssetOpening = '', totalAssetClosing = '';
    var displayedRow = 0, row = 0, col = 0;
    var tempInv;
    var totalAssetOpening = '', totalTaxableInvIncome = '', totalFrankingCredits = '';
    var totalPropertInvOpening = '', totalNonPersonalExHomeInv = '', totalDeemedInv = '',totalCapitalGains='';
    var hidIncRow = 0;
    var sheetName;
    var redStartRow=0,redEndRow=0,assetStartRow=0,assetEndRow=0;
    //Getting all investment related to this owner.
    var ownerInvestment = $.grep(investment, function (element, index) {
        return element.OwnerId == ownerId;
    });
    //Creating sheet
    sheetName = "Asset_" + ownerId;
    var assetSheet = spread.getSheet(sheetCount);
    assetSheet.setName("Asset_" + ownerId);
    assetSheet.setColumnCount(years + 1);
    //assetSheet.setRowHeaderVisible(false);
    //assetSheet.setColumnHeaderVisible(false);
    assetSheet.setDefaultStyle(defaultStyle, GcSpread.Sheets.SheetArea.viewport);
    //Setting the first row Age.
    assetSheet.setValue(row, 0, ' Financial Year ');
    assetSheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    assetSheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.
    assetSheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        assetSheet.setValue(row, col + 1, '  '+(startYear + col) + '/' + (startYear + col + 1)+'  ');
    }
    //Setting the second row Financial year.
    row++;
    assetSheet.setValue(row, 0, ' Client Age ');
    assetSheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    assetSheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
    assetSheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        assetSheet.setValue(row, col + 1, '' + (clientAge + col));
        assetSheet.getCell(row, col + 1).formatter("##");
    }
    if (partnerAge > 0) {
        row++;
        assetSheet.setValue(row, 0, ' Partner Age ');
        assetSheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        assetSheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
        assetSheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
        for (var col = 0; col < years; col++)//looping for years.
        {
            assetSheet.setValue(row, col + 1, '' + (partnerAge + col));
            assetSheet.getCell(row, col + 1).formatter("##");
        }
        assetSheet.setFrozenRowCount(3);
        assetSheet.frozenlineColor("#cacaca");
    }
    else {
        assetSheet.setFrozenRowCount(2);
        assetSheet.frozenlineColor("#cacaca");
    }


    //Now looping for each investments.
    for (var a in ownerInvestment) {
        tempInv = ownerInvestment[a];
        var assetReinv = $.grep(reInvestments, function (element, index) {
            return element.assetId == tempInv.id;
        });
        var assetRedemption = $.grep(redemptions, function (element, index) {
            return element.assetId == tempInv.id;
        });
        var col = Math.abs(tempInv.startYear - startYear) + 1;//this will ensure that investment display should start from exact year when it is started.
        row++;
        assetSheet.setValue(row, 0, ' ' + tempInv.Description + ' ');
        assetSheet.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;
        //assetSheet.autoFitRow(row);
        row++;
        assetStartRow = row;
        displayedRow = 0;//Count for odd even rows.
        //tax free income row.
        assetSheet.setValue(row, 0, ' Tax Free % ');
        assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        assetSheet.setValue(row, col, (tempInv.taxFreeIncome/100));//.formatter("#.##%");
        assetSheet.getCell(row, col).formatter("##%");
        if (tempInv.taxFreeIncome < 0 || tempInv.type == 1 || tempInv.type == 4)//hide the tax free income row if it is non-taxable i.e 100%
            assetSheet.getRow(row).visible(false);
        else {
            displayedRow++;
            if (displayedRow % 2 == 0) {
                assetSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startTaxFree = new GcSpread.Sheets.Range(row, col, 1, 1);
            var endTaxFree = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(tempInv.startYear - startYear));
            assetSheet.fillLinear(startTaxFree, endTaxFree, GcSpread.Sheets.FillSeries.Row, 0, 1);
        }
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;
        //franked income row.
        row++;
        assetSheet.setValue(row, 0, ' Franked Income % ');
        if (tempInv.frankedIncome <= 0 || tempInv.type == 1)//hide the franked income row if it is zero i.e 100%
            assetSheet.getRow(row).visible(false);
        else {
            displayedRow++;
            if (displayedRow % 2 == 0) {
                assetSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            assetSheet.setValue(row, col, tempInv.frankedIncome / 100);//.formatter("#.##%");
            assetSheet.getCell(row, col).formatter("##%");
            var startFranked = new GcSpread.Sheets.Range(row, col, 1, 1);
            var endFranked = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(tempInv.startYear - startYear));
            assetSheet.fillLinear(startFranked, endFranked, GcSpread.Sheets.FillSeries.Row, 0, 1);
        }
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;
        //Taxable income
        row++;
        assetSheet.setValue(row, 0, ' Taxable Income ');
        assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        assetSheet.setFormula(row, col, '=' + GetAbsoluteExcelCell(row + 4, col + 1) + '-(' + GetAbsoluteExcelCell(row + 4, col + 1) + '*' + tempInv.taxFreeIncome+'/100)');
        if (tempInv.taxFreeIncome < 0 || tempInv.type == 1)//hide the taxable income row if it is non-taxable i.e 100%
            assetSheet.getRow(row).visible(false);
        else {
            totalTaxableInvIncome += GetAbsoluteExcelCell(row + 1, 2) + '+';
            displayedRow++;
            if (displayedRow % 2 == 0) {
                assetSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startTaxableInc = new GcSpread.Sheets.Range(row, col, 1, 1);
            var endTaxableInc = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(tempInv.startYear - startYear));
            assetSheet.fillAuto(startTaxableInc, endTaxableInc, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        }
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;
        //franked credits.
        row++;
        assetSheet.setValue(row, 0, ' Franking Credits ');
        assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        assetSheet.setFormula(row, col, '=' + GetAbsoluteExcelCell(row + 3, col + 1) + '*(' + tempInv.frankedIncome + '/100)*30/70');
        if (tempInv.frankedIncome <= 0 || tempInv.type == 1)//hide the franked credit row if it is zero i.e 100%
            assetSheet.getRow(row).visible(false);
        else {
            totalFrankingCredits += GetAbsoluteExcelCell(row + 1, 2) + '+';
            displayedRow++;
            if (displayedRow % 2 == 0) {
                assetSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startFrankedCredits = new GcSpread.Sheets.Range(row, col, 1, 1);
            var endFrankedCredits = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(tempInv.startYear - startYear));
            assetSheet.fillAuto(startFrankedCredits, endFrankedCredits, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        }
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;
        //Income
        row++;
        hidIncRow = row;
        if (tempInv.type != 2) {
            assetSheet.setValue(row, 0, ' Income ');
            assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            assetSheet.setFormula(row, col, '=' + GetAbsoluteExcelCell(row + 3, col + 1) + '*' + tempInv.income + '/100');                        
                var startIncome = new GcSpread.Sheets.Range(row, col, 1, 1);
                var endIncome = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(tempInv.startYear - startYear));
                assetSheet.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        }
        else {
            //Render the rent as income.
            assetSheet.setValue(row, 0, ' Rent Income ');
            assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            assetSheet.setFormula(row, col, '=' + GetAbsoluteExcelCell(row + 2, col + 1) + '*' + tempInv.income + '/100');
                          
                var invDuration=years - Math.abs(tempInv.startYear - startYear);                
                assetSheet.setFormula(row, col, '=' + tempInv.rent + '*' + tempInv.startYearDays + '/365');
                if(invDuration>1){
                    assetSheet.setFormula(row, col + 1, '=' + tempInv.rent + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + tempInv.growth + '/100)');
                    if (invDuration > 2) {
                        assetSheet.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + tempInv.growth + '/100)');

                        var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                        var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, invDuration - 1);//excluding first year.
                        assetSheet.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);                        
                    }
                }
        }
        assetSheet.getRow(row).visible(false);
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;
        //Actual Income row.
        row++;
        assetSheet.setValue(row, 0, ' Income ');
        assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        assetSheet.setFormula(row, col, '=' + GetAbsoluteExcelCell(row, col + 1) + '-' + GetAbsoluteExcelCell(row+5, col + 1));        
        if ((tempInv.type != 2 && tempInv.income <= 0) || (tempInv.type == 2 && (tempInv.rent == undefined || tempInv.rent <= 0)))
            assetSheet.getRow(row).visible(false);
        else {
            displayedRow++;
            if (displayedRow % 2 == 0) {
                assetSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
        }
        var startOpening = new GcSpread.Sheets.Range(row, col, 1, 1);
        var endOpening = new GcSpread.Sheets.Range(row, col, 1, years);
        assetSheet.fillAuto(startOpening, endOpening, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        //Hidden opening balance row for calculations.
        row++;
        assetSheet.setValue(row, 0, 'Hidden Opening ');
        assetSheet.setFormula(row, col, '=' + tempInv.opening + '*' + tempInv.startYearDays + '/365');//.formatter("#.##%");                                             
        assetSheet.setFormula(row, col + 1, '=' + GetAbsoluteExcelCell(row + 2, col + 2));
        var startOpening = new GcSpread.Sheets.Range(row, col + 1, 1, 1);
        var endOpening = new GcSpread.Sheets.Range(row, col + 1, 1, years - 1);
        assetSheet.fillAuto(startOpening, endOpening, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        assetSheet.getRow(row).visible(false);
        //Opening balance.
        row++;
        //setting first year opening balance manually from investment.
        assetSheet.setValue(row, 0, ' Opening ');
        displayedRow++;
        if (displayedRow % 2 == 0) {
            assetSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            assetSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        assetSheet.setValue(row, Math.abs(tempInv.startYear - startYear) + 1, tempInv.opening);
        totalAssetOpening += GetAbsoluteExcelCell(row + 1, 2) + '+';
        if (tempInv.ClassId == 2)
            totalPropertInvOpening += GetAbsoluteExcelCell(row + 1, 2) + '+';
        if (tempInv.ClassId != 1 && tempInv.ClassId != 4)
            totalNonPersonalExHomeInv += GetAbsoluteExcelCell(row + 1, 2) + '+';
        if (tempInv.ClassId != 1 && tempInv.ClassId != 2)//Deemed Assets.
            totalDeemedInv += GetAbsoluteExcelCell(row + 1, 2) + '+';

        var tempSecondYearInv = Math.abs(tempInv.startYear - startYear) + 2;
        assetSheet.setFormula(row, tempSecondYearInv, '=' + GetAbsoluteExcelCell(row + 5, tempSecondYearInv));
        var startOpening = new GcSpread.Sheets.Range(row, tempSecondYearInv, 1, 1);
        var endOpening = new GcSpread.Sheets.Range(row, tempSecondYearInv, 1, years - Math.abs(tempInv.startYear - startYear) - 1);
        assetSheet.fillAuto(startOpening, endOpening, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        assetSheet.addCustomName("invOpening" + tempInv.id, "=0", row + 1, 2);
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;
        //growth
        row++;
        assetSheet.setValue(row, 0, '  Growth');
        assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var formula = '=' + GetAbsoluteExcelCell(row-1, col + 1) + '*' + tempInv.growth + '/100';
        assetSheet.setFormula(row, col, formula);
        if (tempInv.growth <= 0)//hide the growth row if it is zero i.e 100%
            assetSheet.getRow(row).visible(false);
        else {
            displayedRow++;
            if (displayedRow % 2 == 0) {
                assetSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startGrowth = new GcSpread.Sheets.Range(row, col, 1, 1);
            var endGrowth = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(tempInv.startYear - startYear));
            assetSheet.fillAuto(startGrowth, endGrowth, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        }
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;
        //Reinvestment row.
        row++;
        assetSheet.setValue(row, 0, '  Reinvestment');
        assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);        
        if (assetReinv==undefined || assetReinv.length == 0)//hide the Reinvestment row if it is zero.
            assetSheet.getRow(row).visible(false);
        else {
            displayedRow++;
            if (displayedRow % 2 == 0) {
                assetSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            for (var re in assetReinv) {
                var tempReinv = assetReinv[re];
                if (tempReinv.startYear <= (startYear+years-1)) {
                    var reinvCol = tempReinv.startYear - startYear + 1;
                    var endCol = Math.abs(tempReinv.endYear - tempReinv.startYear) > years - reinvCol ? years - reinvCol : Math.abs(tempReinv.endYear - tempReinv.startYear) + 1;
                    assetSheet.setFormula(row, reinvCol, '=' + GetAbsoluteExcelCell(hidIncRow + 1, reinvCol + 1));
                    var start = new GcSpread.Sheets.Range(row, reinvCol, 1, 1);
                    var end = new GcSpread.Sheets.Range(row, reinvCol, 1, endCol);
                    assetSheet.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                }
                //skip reinvestment if it started after scenario.
            }            
        }
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;
        //Redemption row.
        row++;
        assetSheet.setValue(row, 0, '  Redemption');
        assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        if (assetRedemption==undefined||assetRedemption.length == 0)
            assetSheet.getRow(row).visible(false);
        else {
            displayedRow++;
            if (displayedRow % 2 == 0) {
                assetSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
        }
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;
        //closing
        row++;
        assetSheet.setValue(row, 0, ' Closing ');
        assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        assetSheet.setFormula(row, col, '=Sum(' + GetAbsoluteExcelCell(row - 1, col + 1) + ':' + GetAbsoluteExcelCell(row - 3, col + 1) + ')-' + GetAbsoluteExcelCell(row, col + 1));
        totalAssetClosing += GetAbsoluteExcelCell(row + 1, 2) + '+';//Getting all investments closing balance but starting formula calculation from 1st year.
        displayedRow++;
        if (displayedRow % 2 == 0) {
            assetSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            assetSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            assetSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            assetSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        var startClosing = new GcSpread.Sheets.Range(row, col, 1, 1);
        var endClosing = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(tempInv.startYear - startYear));
        assetSheet.fillAuto(startClosing, endClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        rowLookup[sheetName + "_" + row] = "inv_" + tempInv.id;

        //Redemption hidden rows.
        redStartRow = row;
        for (var red in assetRedemption) {
            row++;
            var tempRed = assetRedemption[red];
            var redCol = tempRed.startYear - startYear + 1;
            assetSheet.setValue(row, redCol, tempRed.amount);
            if (tempRed.type == 1&&tempRed.period>1)//ongoing
            {                
                assetSheet.setFormula(row, redCol+1, '=' + GetAbsoluteExcelCell(row + 1, redCol+1) + '*(1+' + tempRed.growth + '/100)');
                var startRed = new GcSpread.Sheets.Range(row, redCol+1, 1, 1);
                var endRed = new GcSpread.Sheets.Range(row, redCol + 1, 1, tempRed.period - 1);
                assetSheet.fillAuto(startRed, endRed, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            }
            assetSheet.getRow(row).visible(false);
        }
        redEndRow = row;
        //Capital gain logic.
        var redCount = assetRedemption.length;
        for (var red in assetRedemption) {
            row++;
            var tempRed = assetRedemption[red];
            var redCol = tempRed.startYear - startYear + 1;
            assetSheet.setValue(row, redCol, (tempRed.amount-tempRed.costBase)/2);
            if (tempRed.type == 1 && tempRed.period > 1)//ongoing
            {
                assetSheet.setFormula(row, redCol + 1, '=(' + GetAbsoluteExcelCell(row - redCount + 1, redCol + 2) + '-' + tempRed.costBase + ')/2');
                var startRed = new GcSpread.Sheets.Range(row, redCol + 1, 1, 1);
                var endRed = new GcSpread.Sheets.Range(row, redCol + 1, 1, tempRed.period - 1);
                assetSheet.fillAuto(startRed, endRed, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            }
            totalCapitalGains +=GetAbsoluteExcelCell(row + 1, 2) + '+';
            assetSheet.getRow(row).visible(false);
        }
        
        if (redStartRow != redEndRow) {
            var formula = '=if(Sum(' + GetAbsoluteExcelCell(redStartRow + 2, 2) + ':' + GetAbsoluteExcelCell(redEndRow + 1, 2) + ')>Sum(' + GetAbsoluteExcelCell(redStartRow - 1, 2) + ':' + GetAbsoluteExcelCell(redStartRow - 4, 2) + '),Sum(' + GetAbsoluteExcelCell(redStartRow - 1, 2) + ':' + GetAbsoluteExcelCell(redStartRow - 4, 2) + '),Sum(' + GetAbsoluteExcelCell(redStartRow + 2, 2) + ':' + GetAbsoluteExcelCell(redEndRow + 1, 2) + ')';
            assetSheet.setFormula(redStartRow - 1, 1, formula);//'=Sum(' + GetAbsoluteExcelCell(redStartRow + 2, 2) + ':' + GetAbsoluteExcelCell(redEndRow + 2, 2) + ')');
            var startRed = new GcSpread.Sheets.Range(redStartRow - 1, 1, 1, 1);
            var endRed = new GcSpread.Sheets.Range(redStartRow-1,1, 1, years);
            assetSheet.fillAuto(startRed, endRed, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            assetSheet.addCustomName("invRedemption" + tempInv.id, "=0", redStartRow, 2);
        }
        //Grouping logic..
        assetSheet.rowRangeGroup.group(assetStartRow, row - assetStartRow);
        assetSheet.rowRangeGroup.expand(0, false);

    }
    assetSheet.rowRangeGroup.direction = $.wijmo.wijspread.RangeGroupDirection.Backward;

    //Total Asset opening Amount.
    row += 2;
    totalAssetOpening = totalAssetOpening.slice(0, -1);
    assetSheet.setValue(row, 0, ' Total asset opening ');
    assetSheet.setFormula(row, 1, '=' + totalAssetOpening);
    assetSheet.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    assetSheet.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var r3 = new GcSpread.Sheets.Range(row, 1, 1, years);
    assetSheet.fillAuto(start, r3, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    assetSheet.addCustomName('TotalInvOpening', "=0", row + 1, 2);

    //Total Asset Closing Amount.
    row++;
    totalAssetClosing = totalAssetClosing.slice(0, -1);
    assetSheet.setValue(row, 0, ' Total asset closing ');
    assetSheet.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    assetSheet.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    assetSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    assetSheet.setFormula(row, 1, '=' + totalAssetClosing);
    var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
    assetSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    assetSheet.addCustomName('TotalInvClosing', "=0", row + 1, 2);
    //Total taxable income row. It will be invisible and required in Taxation sheet.
    row++;
    totalTaxableInvIncome = totalTaxableInvIncome.slice(0, -1);
    assetSheet.setValue(row, 0, ' Total Taxable Income Inv ');
    assetSheet.setFormula(row, 1, '=' + totalTaxableInvIncome);
    var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
    assetSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    assetSheet.getRow(row).visible(false);
    assetSheet.addCustomName('InvTaxableIncome', "=0", row + 1, 2);
    //Total Imputation/franking credits row. It will be invisible and required in Taxation sheet.
    row++;
    totalFrankingCredits = totalFrankingCredits.slice(0, -1);
    assetSheet.setValue(row, 0, ' Total Franking credits ');
    assetSheet.setFormula(row, 1, '=' + totalFrankingCredits);
    var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
    assetSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    assetSheet.getRow(row).visible(false);
    assetSheet.addCustomName('InvImputationCredits', "=0", row + 1, 2);
    //Total property investment.
    row++;
    totalPropertInvOpening = totalPropertInvOpening.slice(0, -1);
    assetSheet.setValue(row, 0, ' Total Property Inv ');
    assetSheet.setFormula(row, 1, '=' + totalPropertInvOpening);
    var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
    assetSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    assetSheet.getRow(row).visible(false);
    assetSheet.addCustomName('invPropertyIncome', "=0", row + 1, 2);
    //Total Ex home and personal assets.
    row++;
    totalNonPersonalExHomeInv = totalNonPersonalExHomeInv.slice(0, -1);
    assetSheet.setValue(row, 0, ' Total Property Inv ');
    assetSheet.setFormula(row, 1, '=' + totalNonPersonalExHomeInv);
    var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
    assetSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    assetSheet.getRow(row).visible(false);
    assetSheet.addCustomName('invExFamilyOpening', "=0", row + 1, 2);
    //Total of deemed assets.
    row++;
    totalDeemedInv = totalDeemedInv.slice(0, -1);
    assetSheet.setValue(row, 0, ' Total Property Inv ');
    assetSheet.setFormula(row, 1, '=' + totalDeemedInv);
    var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
    assetSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    assetSheet.getRow(row).visible(false);
    assetSheet.addCustomName('invDeemed', "=0", row + 1, 2);    
    //Total of redemption part for capital gains.
    row++;
    totalCapitalGains = totalCapitalGains.slice(0, -1);
    if (totalCapitalGains != undefined && totalCapitalGains.trim() != '') {
        assetSheet.setValue(row, 0, ' Total Red CG ');
        assetSheet.setFormula(row, 1, '=' + totalCapitalGains);
        var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
        assetSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        assetSheet.getRow(row).visible(false);
        assetSheet.addCustomName('invCapitalGain'+ownerId, "=0", row + 1, 2);
    }
    assetSheet.setRowCount(row + 1);
    //for (var i = 0; i <= years; i++) {
    //    assetSheet.autoFitColumn(i);        
    //}
    assetSheet.clearSelection();
}
function renderPension(ownerId, sheetCount) {
    //Temporary variables.
    var row = 0; col = 0, displayedRow = 0;
    var penPaymentRateRow = 0;
    var totalPensionReturn = '', totalPensionOpening = '',pensionTaxableIncome='',totalFrankedIncome='';
    //Getting all pensions related to this owner.
    var ownerPension = $.grep(pension, function (element, index) {
        return element.OwnerId == ownerId;
    });
    //Creating new sheet
    var sheetName = "Pension_" + ownerId;
    var pensionSheet = spread.getSheet(sheetCount);
    pensionSheet.setName("Pension_" + ownerId);
    //pensionSheet.setRowHeaderVisible(false);
    //pensionSheet.setColumnHeaderVisible(false);
    pensionSheet.setColumnCount(years + 1, 1);
    pensionSheet.setDefaultStyle(defaultStyle, GcSpread.Sheets.SheetArea.viewport);

    //pensionSheet first Financial year row.        
    pensionSheet.setValue(row, 0, ' Financial Year ');
    pensionSheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    pensionSheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.
    pensionSheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        pensionSheet.setValue(row, col + 1, '  '+(startYear + col) + '/' + (startYear + col + 1)+'  ');
    }
    //pensionSheet second row Age.    
    row++;
    pensionSheet.setValue(row, 0, ' Client Age ');
    pensionSheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    pensionSheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
    pensionSheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        pensionSheet.setValue(row, col + 1, '' + (clientAge + col));
        pensionSheet.getCell(row, col + 1).formatter("##");
    }
    if (partnerAge > 0) {
        row++;
        pensionSheet.setValue(row, 0, ' Partner Age ');
        pensionSheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        pensionSheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
        pensionSheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
        for (var col = 0; col < years; col++)//looping for years.
        {
            pensionSheet.setValue(row, col + 1, '' + (partnerAge + col));
            pensionSheet.getCell(row, col + 1).formatter("##");
        }
        pensionSheet.setFrozenRowCount(3);
        pensionSheet.frozenlineColor("#cacaca");
    }
    else {
        pensionSheet.setFrozenRowCount(2);
        pensionSheet.frozenlineColor("#cacaca");
    }
    //pensionSheet manually feeding txt rate.
    row++;
    var paymentRate = 3;
    penPaymentRateRow = row + 1;
    for (var col = 0; col < years; col++)//looping for years.
    {
        if (col % 3 == 0) paymentRate++;
        pensionSheet.setValue(row, col + 1, paymentRate);
    }
    pensionSheet.getRow(row).visible(false);
    for (var i = 0; i < ownerPension.length; i++) {
        pen = ownerPension[i];
        var col = Math.abs(pen.startYear - startYear) + 1;//this will ensure that pension display should start from exact year when it is started.
        row++;
        pensionSheet.setValue(row, 0, ' ' + pen.Description + ' ');
        pensionSheet.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        pensionSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        displayedRow = 0;//Count for odd even rows.    
        rowLookup[sheetName + "_" + row] = "pen_" + pen.id;
        //Opening balance.
        row++;
        displayedRow++;
        //setting first year opening balance manually from pension.
        pensionSheet.setValue(row, 0, ' Opening ');
        if (displayedRow % 2 == 0) {
            pensionSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            pensionSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        pensionSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        pensionSheet.setValue(row, col, pen.opening);
        totalPensionOpening += GetAbsoluteExcelCell(row + 1, 2) + '+';
        pensionSheet.setFormula(row, col + 1, '=' + GetAbsoluteExcelCell(row + 7, col + 1));
        var startOpening = new GcSpread.Sheets.Range(row, col + 1, 1, 1);
        var endOpening = new GcSpread.Sheets.Range(row, col + 1, 1, years - Math.abs(pen.startYear - startYear) - 1);
        pensionSheet.fillAuto(startOpening, endOpening, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        pensionSheet.addCustomName("penOpening" + pen.id, "=0", row + 1, 2);
        rowLookup[sheetName + "_" + row] = "pen_" + pen.id;

        //Pension payment
        row++;
        pensionSheet.setValue(row, 0, '  Pension Payment');
        pensionSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        if (pen.type == 2) {
            pensionSheet.setValue(row, col, pen.pensionAmount);
        }
        else {
            pensionSheet.setFormula(row, col, '=' + GetAbsoluteExcelCell(row, col + 1) + '*4/100');//applying min pen perc as 4 now.
        }
        var formula = '=' + GetAbsoluteExcelCell(row + 1, col + 1);
        if (pen.isIndex)
            formula += '*(1+' + pen.growth + '/100)';
        pensionSheet.setFormula(row, col+1, formula); 
        //totalPensionReturn += GetAbsoluteExcelCell(row + 1, 2) + '+';
        displayedRow++;
        if (displayedRow % 2 == 0) {
            pensionSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            pensionSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        var startPensionPayment = new GcSpread.Sheets.Range(row, col+1, 1, 1);
        var endPensionPayment = new GcSpread.Sheets.Range(row, col+1, 1, years - Math.abs(pen.startYear - startYear)-1);
        pensionSheet.fillAuto(startPensionPayment, endPensionPayment, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        rowLookup[sheetName + "_" + row] = "pen_" + pen.id;

        //Extra pension payment will be looped with extra payment objects.
        row++;
        pensionSheet.setValue(row, 0, '  Extra Pension Payment');
        pensionSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var extraCol = Math.abs(pen.extraStart - startYear) + 1;

        displayedRow++;
        if (displayedRow % 2 == 0) {
            pensionSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            pensionSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        if (pen.extraPayment != undefined) {
            pensionSheet.setValue(row, extraCol, pen.extraPayment);
            if (pen.extraStart != pen.extraEnd) {
                var startExtraPensionPayment = new GcSpread.Sheets.Range(row, extraCol, 1, 1);
                var endExtraPensionPayment = new GcSpread.Sheets.Range(row, extraCol, 1, Math.abs(pen.extraStart - pen.extraEnd));
                pensionSheet.fillAuto(startExtraPensionPayment, endExtraPensionPayment, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            }
        }
        rowLookup[sheetName + "_" + row] = "pen_" + pen.id;
        //Income row.
        row++;
        pensionSheet.setValue(row, 0, '  Income');
        pensionSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var formula = '=' + GetAbsoluteExcelCell(row - 2, col + 1) + '*' + pen.income + '/100';
        pensionSheet.setFormula(row, col, formula);         
        totalPensionReturn += GetAbsoluteExcelCell(row + 1, 2) + '+';
        displayedRow++;
        if (displayedRow % 2 == 0) {
            pensionSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            pensionSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        var startRor = new GcSpread.Sheets.Range(row, col, 1, 1);
        var endRor = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(pen.startYear - startYear));
        pensionSheet.fillAuto(startRor, endRor, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        rowLookup[sheetName + "_" + row] = "pen_" + pen.id;
        //Taxable Income row.
        row++;
        pensionSheet.setValue(row, 0, ' Taxable Income');
        pensionSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var formula = '=' + GetAbsoluteExcelCell(row, col + 1) + '*(1-' + pen.taxFreeIncome + '/100';
        pensionSheet.setFormula(row, col, formula);
        pensionTaxableIncome += GetAbsoluteExcelCell(row + 1, 2) + '+';
        displayedRow++;
        if (displayedRow % 2 == 0) {
            pensionSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            pensionSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        var startRor = new GcSpread.Sheets.Range(row, col, 1, 1);
        var endRor = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(pen.startYear - startYear));
        pensionSheet.fillAuto(startRor, endRor, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        rowLookup[sheetName + "_" + row] = "pen_" + pen.id;
        //Franked Income row.
        row++;
        pensionSheet.setValue(row, 0, ' Franked Income');
        pensionSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var formula = '=' + GetAbsoluteExcelCell(row - 1, col + 1) + '*' + pen.frankedIncome + '/100';
        pensionSheet.setFormula(row, col, formula);
        totalFrankedIncome += GetAbsoluteExcelCell(row + 1, 2) + '+';
        displayedRow++;
        if (displayedRow % 2 == 0) {
            pensionSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            pensionSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        var startRor = new GcSpread.Sheets.Range(row, col, 1, 1);
        var endRor = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(pen.startYear - startYear));
        pensionSheet.fillAuto(startRor, endRor, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        rowLookup[sheetName + "_" + row] = "pen_" + pen.id;
        //closing
        row++;
        pensionSheet.setValue(row, 0, ' Closing ');
        pensionSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        pensionSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        pensionSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        pensionSheet.setFormula(row, col, '=' + GetAbsoluteExcelCell(row - 5, col + 1) + '-' + GetAbsoluteExcelCell(row - 4, col + 1) + '-' + GetAbsoluteExcelCell(row - 3, col + 1) + '+' + GetAbsoluteExcelCell(row-2, col + 1));
        //totalPensionClosing += GetAbsoluteExcelCell(row + 1, 2) + '+';//Getting all pension closing balance but starting formula calculation from 1st year.
        displayedRow++;
        if (displayedRow % 2 == 0) {
            pensionSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            pensionSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            pensionSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        var startClosing = new GcSpread.Sheets.Range(row, col, 1, 1);
        var endClosing = new GcSpread.Sheets.Range(row, col, 1, years - Math.abs(pen.startYear - startYear));
        pensionSheet.fillAuto(startClosing, endClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        rowLookup[sheetName + "_" + row] = "pen_" + pen.id;
    }
    row++;
    totalPensionReturn = totalPensionReturn.slice(0, -1);
    pensionSheet.setValue(row, 0, ' Pension Income ');
    if (totalPensionReturn.trim() != '') {
        pensionSheet.setFormula(row, 1, '=' + totalPensionReturn);
        var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
        pensionSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);        
        pensionSheet.addCustomName('totalPension' + ownerId, "=0", row + 1, 2);
    }
    pensionSheet.getRow(row).visible(false);
    row++;
    pensionTaxableIncome = pensionTaxableIncome.slice(0, -1);
    pensionSheet.setValue(row, 0, ' Pension Tax Income ');
    if (pensionTaxableIncome.trim() != '') {
        pensionSheet.setFormula(row, 1, '=' + pensionTaxableIncome);
        var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
        pensionSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);        
        pensionSheet.addCustomName('PensionTaxableInc', "=0", row + 1, 2);
    }
    pensionSheet.getRow(row).visible(false);
    row++;
    totalFrankedIncome = totalFrankedIncome.slice(0, -1);
    pensionSheet.setValue(row, 0, ' Pension Tax Income ');
    if (totalFrankedIncome.trim() != '') {
        pensionSheet.setFormula(row, 1, '=' + totalFrankedIncome);
        var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
        pensionSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);        
        pensionSheet.addCustomName('PensionFrankedInc', "=0", row + 1, 2);
    }
    pensionSheet.getRow(row).visible(false);
    row++;
    totalPensionOpening = totalPensionOpening.slice(0, -1);
    pensionSheet.setValue(row, 0, ' Pension Opening ');
    pensionSheet.setFormula(row, 1, '=' + totalPensionOpening);
    var startAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var endAssetClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
    pensionSheet.fillAuto(startAssetClosing, endAssetClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    pensionSheet.getRow(row).visible(false);
    pensionSheet.addCustomName('pensionTotalOpening', "=0", row + 1, 2);
    pensionSheet.setRowCount(row + 1);
    //for (var i = 0; i <= years; i++) {
    //    pensionSheet.autoFitColumn(i);
    //}
    pensionSheet.clearSelection();
}
function renderLiability(ownerId, sheetCount) {
    var row = 0, col = 0, displayedRow = 0, colCount;
    var totalLiabilityClosing = "";
    //Getting owner's liabilities.
    var ownerLiabilities = $.grep(liability, function (element, index) {
        return element.OwnerId == ownerId;
    });
    //Created new sheet.
    var sheetName = "Liability_" + ownerId;
    var liabilitySheet = spread.getSheet(sheetCount);
    liabilitySheet.setName("Liability_" + ownerId);
    //liabilitySheet.setRowHeaderVisible(false);
    //liabilitySheet.setColumnHeaderVisible(false);
    colCount = years + 1 > 5 ? years + 1 : 5;
    liabilitySheet.setColumnCount(colCount, 1);
    liabilitySheet.setDefaultStyle(defaultStyle, GcSpread.Sheets.SheetArea.viewport);

    //Liability first Financial year row.        
    liabilitySheet.setValue(row, 0, ' Financial Year ');
    liabilitySheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    liabilitySheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.
    liabilitySheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        liabilitySheet.setValue(row, col + 1, '  '+(startYear + col) + '/' + (startYear + col + 1)+'  ');
    }
    //LIability second row Age.    
    row++;
    liabilitySheet.setValue(row, 0, ' Client Age ');
    liabilitySheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    liabilitySheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
    liabilitySheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        liabilitySheet.setValue(row, col + 1, '' + (clientAge + col));
        liabilitySheet.getCell(row, col + 1).formatter("##");
    }
    if (partnerAge > 0) {
        row++;
        liabilitySheet.setValue(row, 0, ' Partner Age ');
        liabilitySheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        liabilitySheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
        liabilitySheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
        for (var col = 0; col < years; col++)//looping for years.
        {
            liabilitySheet.setValue(row, col + 1, '' + (partnerAge + col));
            liabilitySheet.getCell(row, col + 1).formatter("##");
        }
        liabilitySheet.setFrozenRowCount(3);
        liabilitySheet.frozenlineColor("#cacaca");
    }
    else {
        liabilitySheet.setFrozenRowCount(2);
        liabilitySheet.frozenlineColor("#cacaca");
    }
    var tempLia, liaInputRow;
    col = 0;
    for (var i = 0; i < ownerLiabilities.length; i++) {
        tempLia = ownerLiabilities[i];
        displayedRow = 0;
        var liabilityEnd = tempLia.term > years ? years : tempLia.term;//It will ensure that liability ends when term completes.
        col = Math.abs(tempLia.startYear - startYear) + 1;//this will ensure that liability display should start from exact year when it is started.
        row++;
        liabilitySheet.setValue(row, 0, ' calculation data');
        liabilitySheet.setValue(row, 1, (tempLia.interest/100)/12);//Interest rate divided by 12.
        liabilitySheet.getCell(row, 1).formatter("##%");
        liabilitySheet.setValue(row, 2, tempLia.term * 12);//create function for exact term multiplier.
        liabilitySheet.setValue(row, 3, tempLia.openingAmount);//opening amount.
        liaInputRow = row + 1;
        liabilitySheet.setFormula(row, 4, '=PMT($B$' + liaInputRow + ',$C$' + liaInputRow + ',$D$' + liaInputRow + ',0)*365/365');//payment
        liabilitySheet.setFormula(row, 5, '=$E$' + liaInputRow + '*12');//yearly payment
        //liabilitySheet.getRow(row).visible(false);
        row++;
        liabilitySheet.setValue(row, 0, ' ' + tempLia.Description);
        liabilitySheet.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        rowLookup[sheetName + "_" + row] = "lia_" + tempLia.id;
        //Setting the opening Amount row.
        row++;
        liabilitySheet.setValue(row, 0, ' Opening Amount');
        liabilitySheet.setValue(row, col, tempLia.openingAmount);
        liabilitySheet.setFormula(row, col + 1, '=' + GetAbsoluteExcelCell(row + 8 + 1, col + 1));
        liabilitySheet.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.            
        var startOpening = new GcSpread.Sheets.Range(row, col + 1, 1, 1);
        var endOpening = new GcSpread.Sheets.Range(row, col + 1, 1, liabilityEnd - col);
        liabilitySheet.fillAuto(startOpening, endOpening, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        rowLookup[sheetName + "_" + row] = "lia_" + tempLia.id;
        //Setting Interest Amount row.
        row++;
        liabilitySheet.setValue(row, 0, '  Interest Amount');
        liabilitySheet.setFormula(row, col, '=-((' + GetAbsoluteExcelCell(row, col + 1) + '*$B$' + liaInputRow + ')*12/100)*' + tempLia.startYearDays + '/365');
        liabilitySheet.setFormula(row, col + 1, '=-((' + GetAbsoluteExcelCell(row, col + 2) + '*$B$' + liaInputRow + ')*12/100)*365/365');//Start Date logic is pending.
        displayedRow++;
        if (displayedRow % 2 == 0) {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        var startInterest = new GcSpread.Sheets.Range(row, col + 1, 1, 1);
        var endInterest = new GcSpread.Sheets.Range(row, col + 1, 1, liabilityEnd - col);
        liabilitySheet.fillAuto(startInterest, endInterest, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        rowLookup[sheetName + "_" + row] = "lia_" + tempLia.id;
        //Setting Principle Payment row.
        row++;
        liabilitySheet.setValue(row, 0, '  Principle Payment');
        liabilitySheet.setFormula(row, col, '=' + GetAbsoluteExcelCell(row + 2, col + 1) + '-' + GetAbsoluteExcelCell(row, col + 1));
        displayedRow++;
        if (displayedRow % 2 == 0) {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        var startPrinciple = new GcSpread.Sheets.Range(row, col, 1, 1);
        var endPrinciple = new GcSpread.Sheets.Range(row, col, 1, liabilityEnd - col + 1);
        liabilitySheet.fillAuto(startPrinciple, endPrinciple, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        rowLookup[sheetName + "_" + row] = "lia_" + tempLia.id;
        //Setting Total RePayment row.
        row++;
        liabilitySheet.setValue(row, 0, '  Total Repayment');
        liabilitySheet.setFormula(row, col, '=IF(' + GetAbsoluteExcelCell(row - 2, 2) + '+' + GetAbsoluteExcelCell(row - 1, col + 1) + '>$F$' + liaInputRow + '*' + tempLia.startYearDays + '/365,($F$' + liaInputRow + '*' + tempLia.startYearDays + '/365),(' + GetAbsoluteExcelCell(row - 2, col + 1) + '+' + GetAbsoluteExcelCell(row - 1, col + 1) + '))');
        liabilitySheet.setFormula(row, col + 1, '=IF(' + GetAbsoluteExcelCell(row - 2, 3) + '+' + GetAbsoluteExcelCell(row - 1, col + 2) + '>$F$' + liaInputRow + '*365/365,($F$' + liaInputRow + '*365/365),(' + GetAbsoluteExcelCell(row - 2, col + 2) + '+' + GetAbsoluteExcelCell(row - 1, col + 2) + '))');
        displayedRow++;
        if (displayedRow % 2 == 0) {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        var startTotal = new GcSpread.Sheets.Range(row, col + 1, 1, 1);
        var endTotal = new GcSpread.Sheets.Range(row, col + 1, 1, liabilityEnd - col);
        liabilitySheet.fillAuto(startTotal, endTotal, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        liabilitySheet.addCustomName('totalRepayment' + tempLia.id, "=0", row + 1, 2);
        rowLookup[sheetName + "_" + row] = "lia_" + tempLia.id;
        //Setting Offset Interest Amount referencing from Asset sheet
        row++;
        liabilitySheet.setValue(row, 0, '  Offset Interest Amount');//logic unknown.
        //var assetSheetData = assetSheet.getCustomName('invOpening10007');
        //liabilitySheet.setFormula(row, 1, '=(Assets!' + GetAbsoluteExcelCell(assetSheetData._baseRow, assetSheetData._baseColumn) + ')*'+incomeTestFactor+'');
        displayedRow++;
        if (displayedRow % 2 == 0) {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        //var startOffset = new GcSpread.Sheets.Range(row, 1, 1, 1);
        //var endOffset = new GcSpread.Sheets.Range(row, 1, 1, years);
        //liabilitySheet.fillAuto(startOffset, endOffset, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        rowLookup[sheetName + "_" + row] = "lia_" + tempLia.id;

        //Setting Total Adjusted Repayment
        row++;
        liabilitySheet.setValue(row, 0, '  Total Adjusted Repayment');
        displayedRow++;
        if (displayedRow % 2 == 0) {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        rowLookup[sheetName + "_" + row] = "lia_" + tempLia.id;
        //Setting Add Repayments
        row++;
        liabilitySheet.setValue(row, 0, '  Add Repayments');
        displayedRow++;
        if (displayedRow % 2 == 0) {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        rowLookup[sheetName + "_" + row] = "lia_" + tempLia.id;
        //Setting Drawdowns
        row++;
        liabilitySheet.setValue(row, 0, '  Drawdowns');
        displayedRow++;
        if (displayedRow % 2 == 0) {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            liabilitySheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            liabilitySheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        rowLookup[sheetName + "_" + row] = "lia_" + tempLia.id;
        //Setting Closing Amount row.
        row++;
        liabilitySheet.setValue(row, 0, ' Closing Amount');
        liabilitySheet.setFormula(row, col, '=' + GetAbsoluteExcelCell(row - 8 + 1, col + 1) + '+' + GetAbsoluteExcelCell(row - 6 + 1, col + 1));
        liabilitySheet.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        var startClosing = new GcSpread.Sheets.Range(row, col, 1, 1);
        var endClosing = new GcSpread.Sheets.Range(row, col, 1, liabilityEnd - col + 1);
        liabilitySheet.fillAuto(startClosing, endClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        totalLiabilityClosing += GetAbsoluteExcelCell(row + 1, 2) + "+";
        rowLookup[sheetName + "_" + row] = "lia_" + tempLia.id;
    }
    row++;
    totalLiabilityClosing = totalLiabilityClosing.slice(0, -1);
    liabilitySheet.setValue(row, 0, ' Total liability closing ');
    liabilitySheet.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    liabilitySheet.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    liabilitySheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    liabilitySheet.setFormula(row, 1, '=' + totalLiabilityClosing);
    var startClosing = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var endClosing = new GcSpread.Sheets.Range(row, 1, 1, years);
    liabilitySheet.fillAuto(startClosing, endClosing, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    liabilitySheet.addCustomName('TotalLiabilityClosing', "=0", row + 1, 2);
    liabilitySheet.setRowCount(row + 1);
    //for (var i = 0; i <= years; i++) {
    //    liabilitySheet.autoFitColumn(i);
    //}
    liabilitySheet.clearSelection();
}
function renderAgePension(ownerId, sheetCount) {
    var displayedRow = 0, row = 0, col = 0;
    var incomeTestStartRow = 0, assetTestStartRow = 0, deemedIncomeRow = 0;
    var maxPensionRow = 0, assetMaxPensionRow = 0, incomeMaxPensionRow = 0;
    var pensionIncTest = 0;
    var penIncomeRates, penAstRates;
    var cashOpeningRow = 0;
    var homeOwner = 0;
    var isCouple = partnerAge > 0 ? true : false;
    var incomeTestFactor = isCouple ? testFactors[0].incomeCouple : testFactors[0].incomeSingle;
    var assetTestFactor = isCouple ? testFactors[0].assetCouple : testFactors[0].assetSingle;

    var ownerHomeInv = $.grep(pensionRates, function (element, index) {
        return (element.OwnerId == ownerId && element.ClassId == 1);
    });
    if (ownerHomeInv != undefined && ownerHomeInv.length > 0)
        homeOwner = 1;

    if (isCouple) {
        penIncomeRates = $.grep(pensionRates, function (element, index) {
            return (element.familySituation == 1);
        });
    }
    else {
        penIncomeRates = $.grep(pensionRates, function (element, index) {
            return element.familySituation == 0;
        });
    }
    if (isCouple) {
        penAstRates = $.grep(pensionAssetRates, function (element, index) {
            return (element.familySituation == 1 && element.isHomeOwner == homeOwner);
        });
    }
    else {
        penAstRates = $.grep(pensionAssetRates, function (element, index) {
            return (element.familySituation == 0 && element.isHomeOwner == homeOwner);
        });
    }

    //Creating sheet
    var agePension = spread.getSheet(sheetCount);
    agePension.setName("AgePension_" + ownerId);
    agePension.setColumnCount(years + 1, 1);
    //agePension.setRowHeaderVisible(false);
    //agePension.setColumnHeaderVisible(false);
    agePension.setDefaultStyle(defaultStyle, GcSpread.Sheets.SheetArea.viewport);

    //Setting the first row Age.
    agePension.setValue(row, 0, ' Financial Year ');
    agePension.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    agePension.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.
    agePension.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        agePension.setValue(row, col + 1, '  '+(startYear + col) + '/' + (startYear + col + 1)+'  ');
    }
    //Setting the second row Financial year.    
    row++;
    agePension.setValue(row, 0, ' Client Age ');
    agePension.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    agePension.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
    agePension.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        agePension.setValue(row, col + 1, '' + (clientAge + col));
        agePension.getCell(row, col + 1).formatter("##");
    }
    if (partnerAge > 0) {
        row++;
        agePension.setValue(row, 0, ' Partner Age ');
        agePension.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
        agePension.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
        for (var col = 0; col < years; col++)//looping for years.
        {
            agePension.setValue(row, col + 1, '' + (partnerAge + col));
            agePension.getCell(row, col + 1).formatter("##");
        }
        agePension.setFrozenRowCount(3);
        agePension.frozenlineColor("#cacaca");
    }
    else {
        agePension.setFrozenRowCount(2);
        agePension.frozenlineColor("#cacaca");
    }
    //row++;
    //agePension.setValue(row, 0, ' TestFactors ');
    //agePension.setValue(row, 1, 0.5);
    //agePension.setValue(row, 2, 0.25);
    //agePension.setValue(row, 3, 78);
    //agePension.setValue(row, 4, 39);
    //agePension.getRow(row).visible(false);

    row++;
    agePension.setValue(row, 0, ' Calculation Factors ');
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    agePension.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
    //Setting calculation factors rows. Their logic is unknown.

    row++;
    displayedRow++;
    maxPensionRow = row;
    agePension.setValue(row, 0, '  Maximum Pension ');
    col = 1;
    for (var i = 0; i < penIncomeRates.length; i++) {
        agePension.setValue(row, col, penIncomeRates[i].maxPension);
        col++;
    }
    agePension.setFormula(row, col, '=' + GetAbsoluteExcelCell(row + 1, col) + '*(1+' + awoteRate + '/100)');
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, col, 1, 1);
    var end = new GcSpread.Sheets.Range(row, col, 1, (years - col + 1));
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    assetMaxPensionRow = row;
    col = 1;
    agePension.setValue(row, 0, '  Asset test for Maximum Pension ');
    for (var i = 0; i < penAstRates.length; i++) {
        agePension.setValue(row, col, penAstRates[i].astFullPensionThres);
        col++;
    }
    agePension.setFormula(row, col, '=' + GetAbsoluteExcelCell(row + 1, col) + '*(1+' + awoteRate + '/100)');
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, col, 1, 1);
    var end = new GcSpread.Sheets.Range(row, col, 1, (years - col + 1));
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    col = 1;
    agePension.setValue(row, 0, '  Asset test for Nil Pension ');
    for (var i = 0; i < penAstRates.length; i++) {
        agePension.setValue(row, col, penAstRates[i].astNilPensionThres);
        col++;
    }
    agePension.setFormula(row, col, '=' + GetAbsoluteExcelCell(row + 1, col) + '*(1+' + awoteRate + '/100)');
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, col, 1, 1);
    var end = new GcSpread.Sheets.Range(row, col, 1, (years - col + 1));
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    col = 1;
    incomeMaxPensionRow = row;
    agePension.setValue(row, 0, '  Income test for Maximum Pension ');
    for (var i = 0; i < penIncomeRates.length; i++) {
        agePension.setValue(row, col, penIncomeRates[i].incFullPensionThres);
        col++;
    }
    agePension.setFormula(row, col, '=' + GetAbsoluteExcelCell(row + 1, col) + '*(1+' + awoteRate + '/100)');
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, col, 1, 1);
    var end = new GcSpread.Sheets.Range(row, col, 1, (years - col + 1));
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    col = 1;
    agePension.setValue(row, 0, '  Income test for Nil Pension ');
    for (var i = 0; i < penIncomeRates.length; i++) {
        agePension.setValue(row, col, penIncomeRates[i].incNilPensionThres);
        col++;
    }
    agePension.setFormula(row, col, '=' + GetAbsoluteExcelCell(row + 1, col) + '*(1+' + awoteRate + '/100)');
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, col, 1, 1);
    var end = new GcSpread.Sheets.Range(row, col, 1, (years - col + 1));
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    //Income test rows.
    col = 1;
    row++;
    agePension.setValue(row, 0, ' Income Test ');
    agePension.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    //Setting Income test rows. Their logic is partially known.
    displayedRow = 0;

    row++;
    incomeTestStartRow = row;
    displayedRow++;
    agePension.setValue(row, 0, '  Employment Income-Client ');
    //agePension.setFormula(row, 1, '=' + cashSheetName + '!' + GetAbsoluteExcelCell(taxableIncomeRow._baseRow, taxableIncomeRow._baseColumn));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //agePension.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Self Employment Income ');
    //agePension.setFormula(row, 1, '=' + cashSheetName + '!' + GetAbsoluteExcelCell(taxableIncomeRow._baseRow, taxableIncomeRow._baseColumn));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //agePension.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Other Income ');
    //agePension.setFormula(row, 1, '=' + cashSheetName + '!' + GetAbsoluteExcelCell(taxableIncomeRow._baseRow, taxableIncomeRow._baseColumn));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //agePension.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Investment Property Income ');
    var assetSheetName = 'Asset_' + ownerId;
    var assetSheet = spread.getSheetFromName(assetSheetName);
    if (assetSheet != undefined) {
        var invPropertRow = assetSheet.getCustomName('invPropertyIncome');
        if (invPropertRow != undefined && invPropertRow._baseRow != undefined && invPropertRow._baseColumn != undefined) {
            agePension.setFormula(row, 1, '=' + assetSheetName + '!' + GetAbsoluteExcelCell(invPropertRow._baseRow, invPropertRow._baseColumn));
        }
        else {
            agePension.setValue(row, 1, 0);
        }

    }
    else {
        agePension.setValue(row, 1, 0);
    }
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Annuity Income ');
    //agePension.setFormula(row, 1, '=' + cashSheetName + '!' + GetAbsoluteExcelCell(taxableIncomeRow._baseRow, taxableIncomeRow._baseColumn));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //agePension.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Pension Income ');
    //agePension.setFormula(row, 1, '=' + cashSheetName + '!' + GetAbsoluteExcelCell(taxableIncomeRow._baseRow, taxableIncomeRow._baseColumn));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //agePension.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Deemed Income ');
    deemedIncomeRow = row;
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Offset Interest Payments ');
    //agePension.setFormula(row, 1, '=' + cashSheetName + '!' + GetAbsoluteExcelCell(taxableIncomeRow._baseRow, taxableIncomeRow._baseColumn));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //agePension.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Total Income for test ');
    agePension.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(incomeTestStartRow + 1, 2) + ':' + GetAbsoluteExcelCell(row + 1, 2) + ')-' + GetAbsoluteExcelCell(row, 2));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    pensionIncTest = row;
    agePension.setValue(row, 0, '  Age pension based on Income Test ');
    agePension.setFormula(row, 1, '=IF(' + GetAbsoluteExcelCell(maxPensionRow + 1, 2) + '-(' + GetAbsoluteExcelCell(row, 2) + '-' + GetAbsoluteExcelCell(incomeMaxPensionRow, 2) + ')*' + incomeTestFactor + '>0,(' + GetAbsoluteExcelCell(maxPensionRow + 1, 2) + '-(' + GetAbsoluteExcelCell(row, 2) + '-' + GetAbsoluteExcelCell(incomeMaxPensionRow, 2) + ')*' + incomeTestFactor + '),0)');

    agePension.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    agePension.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    //Asset test rows.
    row++;
    agePension.setValue(row, 0, ' Assets Test ');
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    agePension.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
    displayedRow = 0;
    //Setting Asset test rows. Their logic is partially known.
    row++;
    assetTestStartRow = row;
    displayedRow++;
    agePension.setValue(row, 0, '  Assets ');
    if (assetSheet != undefined) {
        var invPropertRow = assetSheet.getCustomName('invExFamilyOpening');
        if (invPropertRow != undefined && invPropertRow._baseRow != undefined && invPropertRow._baseColumn != undefined) {
            agePension.setFormula(row, 1, '=' + assetSheetName + '!' + GetAbsoluteExcelCell(invPropertRow._baseRow, invPropertRow._baseColumn));
        }
        else {
            agePension.setValue(row, 1, 0);
        }

    }
    else {
        agePension.setValue(row, 1, 0);
    }
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Superannuation-Client ');
    var superSheetName = 'Super_' + ownerId;
    var ownerSuperSheet = spread.getSheetFromName(superSheetName);
    if (ownerSuperSheet != undefined) {
        var superSheetRow = ownerSuperSheet.getCustomName('superOpening');
        if (superSheetRow != undefined && superSheetRow._baseRow != undefined && superSheetRow._baseColumn != undefined) {
            agePension.setFormula(row, 1, '=' + superSheetName + '!' + GetAbsoluteExcelCell(superSheetRow._baseRow, superSheetRow._baseColumn));
        }
        else {
            agePension.setValue(row, 1, 0);
        }

    }
    else {
        agePension.setValue(row, 1, 0);
    }
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Superannuation-Partner ');
    var otherOwnerId = 0;//Creating partner data.
    var superSheetName = 'Super_' + otherOwnerId;
    var ownerSuperSheet = spread.getSheetFromName(superSheetName);
    if (ownerSuperSheet != undefined) {
        var superSheetRow = ownerSuperSheet.getCustomName('superOpening');
        if (superSheetRow != undefined && superSheetRow._baseRow != undefined && superSheetRow._baseColumn != undefined) {
            agePension.setFormula(row, 1, '=' + superSheetName + '!' + GetAbsoluteExcelCell(superSheetRow._baseRow, superSheetRow._baseColumn));
        }
        else {
            agePension.setValue(row, 1, 0);
        }

    }
    else {
        agePension.setValue(row, 1, 0);
    }
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Annuities-Client ');
    //agePension.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(incomeTestStartRow + 1, 2) + ':' + GetAbsoluteExcelCell(row + 1, 2) + ')-' + GetAbsoluteExcelCell(row + 1, 2));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //agePension.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Annuities-Partner ');
    //agePension.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(incomeTestStartRow + 1, 2) + ':' + GetAbsoluteExcelCell(row + 1, 2) + ')-' + GetAbsoluteExcelCell(row + 1, 2));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //agePension.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Pension Balance-Client ');
    var pensionSheetName = 'Pension_' + ownerId;
    var ownerPensionSheet = spread.getSheetFromName(pensionSheetName);
    if (ownerPensionSheet != undefined) {
        var pensionSheetRow = ownerPensionSheet.getCustomName('pensionTotalOpening');
        if (pensionSheetRow != undefined && pensionSheetRow._baseRow != undefined && pensionSheetRow._baseColumn != undefined) {
            agePension.setFormula(row, 1, '=' + pensionSheetName + '!' + GetAbsoluteExcelCell(pensionSheetRow._baseRow, pensionSheetRow._baseColumn));
        }
        else {
            agePension.setValue(row, 1, 0);
        }
    }
    else {
        agePension.setValue(row, 1, 0);
    }
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Pension Balance-Partner ');
    var pensionSheetName = 'Pension_' + otherOwnerId;
    var partnerPensionSheet = spread.getSheetFromName(pensionSheetName);
    if (partnerPensionSheet != undefined) {
        var pensionSheetRow = partnerPensionSheet.getCustomName('pensionTotalOpening');
        if (pensionSheetRow != undefined && pensionSheetRow._baseRow != undefined && pensionSheetRow._baseColumn != undefined) {
            agePension.setFormula(row, 1, '=' + pensionSheetName + '!' + GetAbsoluteExcelCell(pensionSheetRow._baseRow, pensionSheetRow._baseColumn));
        }
        else {
            agePension.setValue(row, 1, 0);
        }
    }
    else {
        agePension.setValue(row, 1, 0);
    }
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Cash Account ');
    cashOpeningRow = row;
    var cashSheetName = 'CashAccount_' + ownerId;
    var ownerCashSheet = spread.getSheetFromName(cashSheetName);
    if (ownerCashSheet != undefined) {
        var cashSheetRow = ownerCashSheet.getCustomName('cashOpening');
        if (cashSheetRow != undefined && cashSheetRow._baseRow != undefined && cashSheetRow._baseColumn != undefined) {
            agePension.setFormula(row, 1, '=' + cashSheetName + '!' + GetAbsoluteExcelCell(cashSheetRow._baseRow, cashSheetRow._baseColumn));
        }
        else {
            agePension.setValue(row, 1, 0);
        }
    }
    else {
        agePension.setValue(row, 1, 0);
    }
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Liabilities ');
    //agePension.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(incomeTestStartRow + 1, 2) + ':' + GetAbsoluteExcelCell(row + 1, 2) + ')-' + GetAbsoluteExcelCell(row + 1, 2));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //agePension.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    displayedRow++;
    agePension.setValue(row, 0, '  Total Assets for Assets test ');
    agePension.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(assetTestStartRow + 1, 2) + ':' + GetAbsoluteExcelCell(row + 1, 2) + ')-' + GetAbsoluteExcelCell(row, 2));
    if (displayedRow % 2 == 0) {
        agePension.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        agePension.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        agePension.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    agePension.setValue(row, 0, '  Age pension based on Assets Test ');
    agePension.setFormula(row, 1, '=IF(' + GetAbsoluteExcelCell(maxPensionRow + 1, 2) + '-(' + GetAbsoluteExcelCell(row, 2) + '-' + GetAbsoluteExcelCell(assetMaxPensionRow + 1, 2) + ')*' + assetTestFactor + '>0,(' + GetAbsoluteExcelCell(maxPensionRow + 1, 2) + '-(' + GetAbsoluteExcelCell(row, 2) + '-' + GetAbsoluteExcelCell(assetMaxPensionRow + 1, 2) + ')*' + assetTestFactor + '),0)');
    agePension.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    agePension.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    row++;
    agePension.setValue(row, 0, '  Applicable Age pension ');
    agePension.setFormula(row, 1, '=MIN(' + GetAbsoluteExcelCell(pensionIncTest + 1, 2) + ',' + GetAbsoluteExcelCell(row, 2) + ')');
    agePension.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    agePension.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    agePension.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    //Deemed calculation rows.
    row++;
    agePension.setValue(row, 0, penIncomeRates[0].deemLimitThres);
    agePension.setValue(row, 1, penIncomeRates[0].deemRateLow);
    agePension.setValue(row, 2, penIncomeRates[0].deemRateHigh);
    row++;
    agePension.setValue(row, 0, '  Deemed Asset calc. ');
    if (assetSheet != undefined) {
        var invDeemedRow = assetSheet.getCustomName('invDeemed');
        if (invDeemedRow != undefined && invDeemedRow._baseRow != undefined && invDeemedRow._baseColumn != undefined) {
            agePension.setFormula(row, 1, '=' + assetSheetName + '!' + GetAbsoluteExcelCell(invDeemedRow._baseRow, invDeemedRow._baseColumn) + '+' + GetAbsoluteExcelCell(cashOpeningRow + 1, 2));
        }
        else {
            agePension.setFormula(row, 1, '=' + GetAbsoluteExcelCell(cashOpeningRow + 1, 2));
        }

    }
    else {
        agePension.setValue(row, 1, 0);
    }
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    //Deemed icome first segment.
    row++;
    agePension.setValue(row, 0, '  DIFS ');
    agePension.setFormula(row, 1, '=IF(' + GetAbsoluteExcelCell(row, 2) + '<' + GetAbsoluteExcelCell(row - 1, 1) + ',IF((' + GetAbsoluteExcelCell(row, 2) + '*' + GetAbsoluteExcelCell(row - 1, 2) + '/100)>0,(' + GetAbsoluteExcelCell(row, 2) + '*' + GetAbsoluteExcelCell(row - 1, 2) + '/100),0),(' + GetAbsoluteExcelCell(row - 1, 2) + '*' + GetAbsoluteExcelCell(row - 1, 1) + '/100))');
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);

    row++;
    agePension.setValue(row, 0, '  DISS ');
    agePension.setFormula(row, 1, '=IF((' + GetAbsoluteExcelCell(row - 1, 2) + '-' + GetAbsoluteExcelCell(row - 2, 1) + ')*' + GetAbsoluteExcelCell(row - 2, 3) + '>0,((' + GetAbsoluteExcelCell(row - 2, 2) + '-' + GetAbsoluteExcelCell(row - 2, 1) + ')*' + GetAbsoluteExcelCell(row - 2, 3) + '),0)');
    var start = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(row, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    //setting deemed income now.
    agePension.setFormula(deemedIncomeRow, 1, '=' + GetAbsoluteExcelCell(row + 1, 2) + '+' + GetAbsoluteExcelCell(row, 2));
    var start = new GcSpread.Sheets.Range(deemedIncomeRow, 1, 1, 1);
    var end = new GcSpread.Sheets.Range(deemedIncomeRow, 1, 1, years);
    agePension.fillAuto(start, end, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);

    agePension.setRowCount(row + 1);

    //for (var i = 0; i <= years; i++) {
    //    agePension.autoFitColumn(i);
    //}
    agePension.clearSelection();
}
function renderSuper(ownerId, sheetCount,jointId) {
    var row = 0; col = 0, displayedRow = 0;
    var startRange, endRange;
    var openingRow = 0;
    var additionRowStart = 0, totalAdditionRow = 0, totalReductionRow = 0, totalTaxRow = 0,premiumRow=0,invIncomeRow=0;
    var taxableContributions = '';
    //Getting owner's superAnnuation.
    var ownerSuperData = $.grep(superannuation, function (element, index) {
        return element.OwnerId == ownerId;
    });
    if (ownerSuperData.length == 0) {
        //create blank super
        var blankSuper = {
            id: 0,
            OwnerId: ownerId,
            openingAmount: 0,            
            growthRate: 0,
            incomeRate: 0,
            taxFree: 0,
            frankingRate:0,            
            ncc: 0,                                    
        };
        ownerSuperData.push(blankSuper);
    }
    var ownerContributionData = $.grep(contributions, function (element, index) {
        return element.OwnerId == ownerId;
    });
    //created sheet.
    var sheetName = "Super_" + ownerId;
    var superSheet = spread.getSheet(sheetCount);
    superSheet.setName(sheetName);
    superSheet.setRowHeaderVisible(false);
    superSheet.setColumnHeaderVisible(false);
    superSheet.setColumnCount(years + 1, 1);
    superSheet.setDefaultStyle(defaultStyle, GcSpread.Sheets.SheetArea.viewport);

    superSheet.setValue(row, 0, ' Financial Year ');
    superSheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    superSheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.
    superSheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        superSheet.setValue(row, col + 1, '  '+(startYear + col) + '/' + (startYear + col + 1)+'  ');
    }
    //second row Age.
    row++;
    superSheet.setValue(row, 0, ' Client Age ');
    superSheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    superSheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
    superSheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        superSheet.setValue(row, col + 1, '' + (clientAge + col));
        superSheet.getCell(row, col + 1).formatter("##");
    }
    if (partnerAge > 0) {
        row++;
        superSheet.setValue(row, 0, ' Partner Age ');
        superSheet.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
        superSheet.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
        for (var col = 0; col < years; col++)//looping for years.
        {
            superSheet.setValue(row, col + 1, '' + (partnerAge + col));
            superSheet.getCell(row, col + 1).formatter("##");
        }
        superSheet.setFrozenRowCount(3);
        superSheet.frozenlineColor("#cacaca");
    }
    else {
        superSheet.setFrozenRowCount(2);
        superSheet.frozenlineColor("#cacaca");
    }

    //Check if there is partner then use CashAccountOverallSheet.
    var cashSheetName = jointId != undefined ? 'CashAccount_' + jointId : 'CashAccount_' + ownerId;
    var cashSheet = spread.getSheetFromName(cashSheetName);

    if (ownerSuperData.length > 0) {
        //Opening Balance.
        col = 1;
        row++;
        superSheet.setValue(row, 0, ' Opening');
        superSheet.setValue(row, 1, ownerSuperData[0].openingAmount);
        openingRow = row;
        //Adding opening formula after closing row        
        row++;
        superSheet.setValue(row, 0, ' Additions');
        superSheet.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);        
        //Employer Concessional Contributions row
        row++;
        additionRowStart = row;
        superSheet.setValue(row, 0, '  Employer Concessional Contributions');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        superSheet.setValue(row, 1, 0);
        var formula=''
        if (cashSheet != undefined) {
            var ownerEmployerContribution = cashSheet.getCustomName('CashAccountEmployerContribution_' + ownerId);
            var jointEmployerContribution = cashSheet.getCustomName('CashAccountEmployerContribution_' + jointId);
            if (ownerEmployerContribution != undefined && ownerEmployerContribution._baseRow != undefined && ownerEmployerContribution._baseColumn != undefined) {    
                formula = '=' + cashSheetName + '!' + GetAbsoluteExcelCell(ownerEmployerContribution._baseRow, ownerEmployerContribution._baseColumn);
            }
            if (jointEmployerContribution != undefined && jointEmployerContribution._baseRow != undefined && jointEmployerContribution._baseColumn != undefined) {
                formula += '+' + cashSheetName + '!' + GetAbsoluteExcelCell(jointEmployerContribution._baseRow, jointEmployerContribution._baseColumn) + '/2';
            }
            if (formula != undefined && formula.trim() != '') {
                superSheet.setFormula(row, 1, formula);
            }
        }       
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        taxableContributions += GetAbsoluteExcelCell(row + 1, 2) + '+';
        row++;
        superSheet.setValue(row, 0, '  Non Concessional Contributions');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        superSheet.setValue(row, col, ownerSuperData[0].ncc);
        var formula = '=' + GetAbsoluteExcelCell(row + 1, col + 1) + '*(1+(' + ownerSuperData[0].growthRate + '/100))';
        superSheet.setFormula(row, col + 1, formula);            
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        startRange = new GcSpread.Sheets.Range(row, col + 1, 1, 1);
        if (ownerSuperData[0].duration > 0 && ownerSuperData[0].ncc > 0)
            endRange = new GcSpread.Sheets.Range(row, col + 1, 1, ownerSuperData[0].duration - 1);
        else
            endRange = new GcSpread.Sheets.Range(row, col + 1, 1, years - 1);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        
        //Self Added Contributions.
        if (ownerContributionData.length > 0) {
            //Personal Concessional Contributions row
            row++;
            superSheet.setValue(row, 0, '  Personal Concessional Contributions');
            superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            displayedRow++;
            if (displayedRow % 2 == 0) {
                superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            //Now looping for each contribution.            
            for (var cont in ownerContributionData) {
                tempCont = ownerContributionData[cont];
                col = Math.abs(tempCont.startYear - startYear) + 1;//this will ensure that income display should start from exact year when it is started.
                contDuration = (parseInt(tempCont.endYear) - parseInt(tempCont.startYear)) + 1;
                if (contDuration > years) {
                    contDuration = years;
                }
                row++;
                displayedRow++;
                superSheet.setValue(row, 0, ' ' + tempCont.Description);
                superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                if (displayedRow % 2 == 0) {
                    superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                else {
                    superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                if (contDuration <= 1) {
                    superSheet.setFormula(row, col, '=' + tempCont.Amount + '*' + getDaysInFinancialYear(tempCont.startDate, tempCont.endDate) + '/365');//.formatter("#.##%");                                
                }
                else {
                    superSheet.setFormula(row, col, '=' + tempCont.Amount + '*' + tempCont.startYearDays + '/365');
                    superSheet.setFormula(row, col + 1, '=' + tempCont.Amount + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + tempCont.growth + '/100)');
                    if (contDuration > 2) {                        
                        superSheet.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + tempCont.growth + '/100)');
                        var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                        var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, contDuration - 2);//excluding first & last year(-2)
                        superSheet.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                        //rendering last year data.
                        if ((parseInt(tempCont.endYear) - parseInt(tempCont.startYear) + 1) <= years) {
                            superSheet.setFormula(row, (col + contDuration - 1), '=' + GetAbsoluteExcelCell(row + 1, col + contDuration - 1) + '*(1+' + tempCont.growth + '/100)*(' + tempCont.endYearDays + '/365)');//.formatter("#.##%");
                        }
                    }
                    //else {
                    //    superSheet.setFormula(row, col + 1, '=' + tempCont.Amount + '*(1+' + tempCont.growth + '/100)*(' + tempCont.endYearDays + '/365)');//.formatter("#.##%"); 
                    //}
                }
                taxableContributions += GetAbsoluteExcelCell(row + 1, 2) + '+';
                rowLookup[sheetName + "_" + row] = "cont_" + tempCont.id;

            }
            col = 1;//Reset the col.
        }
       

        //Investment Income row.
        row++;
        superSheet.setValue(row, 0, '  Investment Income');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var formula = '=' + GetAbsoluteExcelCell(openingRow+1, col + 1) + '*' + ownerSuperData[0].incomeRate+'/100';
        superSheet.setFormula(row, col, formula);
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        invIncomeRow = row;
        //Investment Income row.
        row++;
        superSheet.setValue(row, 0, '  Investment Growth');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var formula = '=' + GetAbsoluteExcelCell(openingRow + 1, col + 1) + '*' + ownerSuperData[0].growthRate + '/100';
        superSheet.setFormula(row, col, formula);
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        //Total Addition row.
        row++;
        superSheet.setValue(row, 0, ' Total Additions');
        var formula = '=Sum(' + GetAbsoluteExcelCell(additionRowStart+1, col + 1) + ':' + GetAbsoluteExcelCell(row, col + 1) + ')';
        superSheet.setFormula(row, col, formula);
        superSheet.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        totalAdditionRow = row;
        //Reductions row.
        row++;
        superSheet.setValue(row, 0, ' Reduction');
        superSheet.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        //Pension Rollover row.
        displayedRow = 0;
        row++;
        reductionRowStart = row;
        superSheet.setValue(row, 0, '  Pension Rollover');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        //superSheet.setValue(row, col, ownerSuperData[0].pensionRollover);
        //var formula = '=' + GetAbsoluteExcelCell(row + 1, col + 1) + '*(1+' + ownerSuperData[0].growthRate + ')';
        //superSheet.setFormula(row, col + 1, formula);
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        //startRange = new GcSpread.Sheets.Range(row, col + 1, 1, 1);
        //endRange = new GcSpread.Sheets.Range(row, col + 1, 1, years - 1);
        //superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        //ETP Payments row.
        row++;
        superSheet.setValue(row, 0, '  ETP Payments');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        //superSheet.setValue(row, col, ownerSuperData[0].etpWithdrawl);
        //var formula = '=' + GetAbsoluteExcelCell(row + 1, col + 1) + '*(1+' + ownerSuperData[0].growthRate + ')';
        //superSheet.setFormula(row, col + 1, formula);
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        //startRange = new GcSpread.Sheets.Range(row, col + 1, 1, 1);
        //endRange = new GcSpread.Sheets.Range(row, col + 1, 1, years - 1);
        //superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        //Insurance Premiums row.
        row++;
        superSheet.setValue(row, 0, '  Insurance Premiums');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        displayedRow++;        
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        if (ownerSuperData[0].insurancePremium != undefined) {
            col = Math.abs(ownerSuperData[0].startYear - startYear) + 1;//this will ensure that Insurance premium display should start from exact year.
            var insuranceDuration = (parseInt(ownerSuperData[0].endYear) - parseInt(ownerSuperData[0].startYear)) + 1;
            if (insuranceDuration > years) {
                insuranceDuration = years;
            }

            if (insuranceDuration <= 1) {                
                superSheet.setFormula(row, col, '=' + ownerSuperData[0].insurancePremium + '*' + getDaysInFinancialYear(ownerSuperData[0].startDate, ownerSuperData[0].endDate) + '/365');//.formatter("#.##%");                                
            }
            else {
                superSheet.setFormula(row, col, '=' + ownerSuperData[0].insurancePremium + '*' + ownerSuperData[0].startYearDays + '/365');
                superSheet.setFormula(row, col + 1, '=' + ownerSuperData[0].insurancePremium + '+(' + GetAbsoluteExcelCell(row + 1, col + 1) + '*' + ownerSuperData[0].insuranceGrowth + '/100)');
                if (insuranceDuration > 2) {                    
                    superSheet.setFormula(row, col + 2, '=' + GetAbsoluteExcelCell(row + 1, col + 2) + '*(1+' + ownerSuperData[0].insuranceGrowth + '/100)');

                    var startIncome = new GcSpread.Sheets.Range(row, col + 2, 1, 1);
                    var endIncome = new GcSpread.Sheets.Range(row, col + 2, 1, insuranceDuration - 2);//excluding first & last year(-2)
                    superSheet.fillAuto(startIncome, endIncome, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                    //rendering last year data.
                    if ((parseInt(ownerSuperData[0].endYear) - parseInt(ownerSuperData[0].startYear) + 1) <= years) {
                        superSheet.setFormula(row, (col + insuranceDuration - 1), '=' + GetAbsoluteExcelCell(row + 1, col + insuranceDuration - 1) + '*(1+' + ownerSuperData[0].insuranceGrowth + '/100)*(' + ownerSuperData[0].endYearDays + '/365)');//.formatter("#.##%");
                    }
                }
                //else {
                //    superSheet.setFormula(row, col + 1, '=' + ownerSuperData[0].insurancePremium + '*(1+' + ownerSuperData[0].insuranceGrowth + '/100)*(' + ownerSuperData[0].endYearDays + '/365)');//.formatter("#.##%"); 
                //}
            }
            col = 1;
        }
        premiumRow = row;
        //Fees row.
        row++;
        superSheet.setValue(row, 0, '  Superannuation Fee');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        if (ownerSuperData[0].feeAmount != undefined && ownerSuperData[0].feeType != undefined) {
            var feeAmount = 0;
            feeAmount = ownerSuperData[0].feeAmount;
            if (ownerSuperData[0].feeType == 1) {
                ownerSuperData[0].feeAmount = ownerSuperData[0].feeAmount > 100 ? 100 : ownerSuperData[0].feeAmount;
                feeAmount = ownerSuperData[0].openingAmount * ownerSuperData[0].feeAmount / 100;
            }
            superSheet.setValue(row, 1, feeAmount);
        }
        //Total Addition row.
        debugger;
        row++;
        superSheet.setValue(row, 0, ' Total Reductions');
        var formula = '=Sum(' + GetAbsoluteExcelCell(reductionRowStart+1, col + 1) + ':' + GetAbsoluteExcelCell(row, col + 1)+')';
        superSheet.setFormula(row, col, formula);
        superSheet.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        totalReductionRow = row;
        //Taxation row.
        row++;
        superSheet.setValue(row, 0, ' Taxation');
        superSheet.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        //Taxable Contributions and Inv Income row.
        displayedRow = 0;
        row++;
        superSheet.setValue(row, 0, '  Taxable Contributions and Inv Income');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        taxableContributions = taxableContributions.slice(0, -1);
        var formula = '=' + taxableContributions + '+(' + GetAbsoluteExcelCell(invIncomeRow + 1, col + 1) + '*(1-0)+((' + GetAbsoluteExcelCell(invIncomeRow+1, col + 1) + '*0.3)*30/70)-' + GetAbsoluteExcelCell(premiumRow+1, col + 1) + ')';
        superSheet.setFormula(row, col, formula);
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        //Tax row.
        row++;
        superSheet.setValue(row, 0, '  Tax');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var superTax = 0.15;
        var formula = '=' + GetAbsoluteExcelCell(row, col + 1) + '*' + superTax;
        superSheet.setFormula(row, col, formula);            
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        //Imputation Credits row.
        row++;
        var frankingRate = 0;
        if (ownerSuperData[0].frankingRate != undefined){
            frankingRate = ownerSuperData[0].frankingRate>100?100: ownerSuperData[0].frankingRate;
        };
        superSheet.setValue(row, 0, '  Imputation Credits');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var formula = '=(' + GetAbsoluteExcelCell(row - 10, col + 1) + '*'+ ownerSuperData[0].frankingRate+'/100)*30/70';
        superSheet.setFormula(row, col, formula);            
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        //Extra Contribution Tax
        row++;
        superSheet.setValue(row, 0, '  Extra Contribution Tax');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        //Total Tax row.
        row++;
        superSheet.setValue(row, 0, ' Total Tax');
        var formula = '=' + GetAbsoluteExcelCell(row - 3 + 1, col + 1) + '-' + GetAbsoluteExcelCell(row - 2 + 1, col + 1) + '+' + GetAbsoluteExcelCell(row - 1 + 1, col + 1);
        superSheet.setFormula(row, col, formula);
        superSheet.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        totalTaxRow = row;
        //Closing row.
        row++;
        superSheet.setValue(row, 0, '  Closing Balance');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var formula = '=(' + GetAbsoluteExcelCell(openingRow + 1, col + 1) + '+' + GetAbsoluteExcelCell(totalAdditionRow + 1, col + 1) + '-' + GetAbsoluteExcelCell(totalReductionRow + 1, col + 1) + '-' + GetAbsoluteExcelCell(totalTaxRow + 1, col + 1) + ')';
        superSheet.setFormula(row, col, formula);            
        superSheet.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        superSheet.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        superSheet.addCustomName("closingBalance" + ownerId, "=0", row + 1, 2);
        //Now Adding Opening row formula
        var formula = '=' + GetAbsoluteExcelCell(row+1, col + 1);
        superSheet.setFormula(openingRow, col + 1, formula);
        superSheet.setStyle(openingRow, -1, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.
        superSheet.setRowHeight(openingRow, 30, $.wijmo.wijspread.SheetArea.viewport);
        startRange = new GcSpread.Sheets.Range(openingRow, col + 1, 1, 1);
        endRange = new GcSpread.Sheets.Range(openingRow, col + 1, 1, years - 1);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        superSheet.addCustomName('superOpening', "=0", openingRow + 1, 2);
        //Closing Non Concessional row.
        row++;
        superSheet.setValue(row, 0, '  Closing Non Concessional');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var formula = '=' + GetAbsoluteExcelCell(row - 17 + 1, col + 1);
        superSheet.setFormula(row, col, formula);            
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        //Closing Concessional row.
        row++;
        superSheet.setValue(row, 0, '  Closing Concessional');
        superSheet.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var formula = '=' + GetAbsoluteExcelCell(row - 2 + 1, col + 1) + '-' + GetAbsoluteExcelCell(row - 1 + 1, col + 1);
        superSheet.setFormula(row, col, formula);            
        displayedRow++;
        if (displayedRow % 2 == 0) {
            superSheet.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        else {
            superSheet.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            superSheet.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        }
        startRange = new GcSpread.Sheets.Range(row, col, 1, 1);
        endRange = new GcSpread.Sheets.Range(row, col, 1, years);
        superSheet.fillAuto(startRange, endRange, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);

    }
    superSheet.setRowCount(row + 1);
    //for (var i = 0; i <= years; i++) {
    //    superSheet.autoFitColumn(i);
    //}
    superSheet.clearSelection();

}

function renderTaxation(ownerId, sheetCount, jointId) {
    var displayedRow = 0, row = 0, col = 0;
    var totalCredits = '';
    var isAssessableIncome = false, isDeduction = false;
    var taxableIncomeTotal = 0, taxableDeductionTotal = 0, decutionStartRow = 0, assessableIncomeRow = 0;
    var totalTaxRow = 0, totalCreditsRow = 0;
    var colShown = (years + 1) > 6 ? years + 1 : 6;
    var taxTableStartRow = 0;

    //Creating sheet
    var taxation = spread.getSheet(sheetCount);
    taxation.setName("Taxation_" + ownerId);
    taxation.setColumnCount(colShown, 1);
    taxation.setRowHeaderVisible(false);
    taxation.setColumnHeaderVisible(false);
    taxation.setDefaultStyle(defaultStyle, GcSpread.Sheets.SheetArea.viewport);

    taxation.setValue(row, 0, ' Financial Year ');
    taxation.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    taxation.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.
    taxation.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        taxation.setValue(row, col + 1, '  '+(startYear + col) + '/' + (startYear + col + 1)+'  ');
    }
    //Setting the first row Age.    
    row++;
    taxation.setValue(row, 0, ' Client Age ');
    taxation.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    taxation.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
    taxation.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
    for (var col = 0; col < years; col++)//looping for years.
    {
        taxation.setValue(row, col + 1, '' + (clientAge + col));
        taxation.getCell(row, col + 1).formatter("##");
    }
    if (partnerAge > 0) {
        row++;
        taxation.setValue(row, 0, ' Partner Age ');
        taxation.setStyle(row, -1, style_mainHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_mainHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style for main heading only.  
        taxation.setRowHeight(row, 35, $.wijmo.wijspread.SheetArea.viewport);
        for (var col = 0; col < years; col++)//looping for years.
        {
            taxation.setValue(row, col + 1, '' + (partnerAge + col));
            taxation.getCell(row, col + 1).formatter("##");
        }
        taxation.setFrozenRowCount(3);
        taxation.frozenlineColor("#cacaca");
    }
    else {
        taxation.setFrozenRowCount(2);
        taxation.frozenlineColor("#cacaca");
    }
    //Rendering reverse tax table first & it'll be hidden.
    if (reverseTax != undefined) {
        taxTableStartRow = row + 1;
        for (var i = 0; i < reverseTax.length; i++) {
            row++;
            col = 0;//reset column.
            taxation.setValue(row, col++, reverseTax[i].RIndex);
            taxation.setValue(row, col++, reverseTax[i].taxPaid);
            taxation.setValue(row, col++, reverseTax[i].marginalTaxRate);
            taxation.setValue(row, col++, reverseTax[i].bracketStep);
            taxation.setValue(row, col++, reverseTax[i].netIncome);
            taxation.setValue(row, col++, reverseTax[i].RIndex);
            taxation.getRow(row).visible(false);
        }
        col = 0;//again reset column.
    }



    row++;
    assessableIncomeRow = row + 1;
    taxation.setValue(row, 0, ' Assessable Income ');
    taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    taxation.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
    //Check if there is partner then use CashAccountOverallSheet.
    var cashSheetName = jointId != undefined ? 'CashAccount_' + jointId : 'CashAccount_' + ownerId;
    var cashSheet = spread.getSheetFromName(cashSheetName);

    if (cashSheet != undefined) {
        var ownerTaxableIncomeRow = cashSheet.getCustomName('CashTaxableIncome_' + ownerId);
        var jointTaxableIncomeRow = cashSheet.getCustomName('CashTaxableIncome_' + jointId);
        if (ownerTaxableIncomeRow != undefined && ownerTaxableIncomeRow._baseRow != undefined && ownerTaxableIncomeRow._baseColumn != undefined) {
            isAssessableIncome = true;
            row++;
            displayedRow++;
            taxation.setValue(row, 0, '  Earned Income ');
            var formula = '=' + cashSheetName + '!' + GetAbsoluteExcelCell(ownerTaxableIncomeRow._baseRow, ownerTaxableIncomeRow._baseColumn);
            if (jointTaxableIncomeRow != undefined && jointTaxableIncomeRow._baseRow != undefined && jointTaxableIncomeRow._baseColumn != undefined) {
                formula += '+' + cashSheetName + '!' + GetAbsoluteExcelCell(jointTaxableIncomeRow._baseRow, jointTaxableIncomeRow._baseColumn) + '/2';
            }
            taxation.setFormula(row, 1, formula);
            if (displayedRow % 2 == 0) {
                taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
            taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        }
    }
    var assetSheetName = 'Asset_' + ownerId;
    var assetSheet = spread.getSheetFromName(assetSheetName);

    if (assetSheet != undefined) {
        //Row for income.
        var taxableIncomeRow = assetSheet.getCustomName('InvTaxableIncome');
        if (taxableIncomeRow != undefined && taxableIncomeRow._baseRow != undefined && taxableIncomeRow._baseColumn != undefined) {
            isAssessableIncome = true;
            row++;
            displayedRow++;
            taxation.setValue(row, 0, '  Investment Income ');
            taxation.setFormula(row, 1, '=' + assetSheetName + '!' + GetAbsoluteExcelCell(taxableIncomeRow._baseRow, taxableIncomeRow._baseColumn));
            if (displayedRow % 2 == 0) {
                taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
            taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        }
        //Row for Imputation credits aka Franking credits.
        var imputationRow = assetSheet.getCustomName('InvImputationCredits');
        if (imputationRow != undefined && imputationRow._baseRow != undefined && imputationRow._baseColumn != undefined) {
            isAssessableIncome = true;
            row++;
            displayedRow++;
            taxation.setValue(row, 0, '  Imputation Credits ');
            taxation.setFormula(row, 1, '=' + assetSheetName + '!' + GetAbsoluteExcelCell(imputationRow._baseRow, imputationRow._baseColumn));
            if (displayedRow % 2 == 0) {
                taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
            taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            totalCredits += GetAbsoluteExcelCell(row + 1, 2) + '+';
        }
    }
    if (jointId != undefined && jointId != null) {
        var jointAssetName = 'Asset_' + jointId;
        var jointAssetSheet = spread.getSheetFromName(jointAssetName);

        if (jointAssetSheet != undefined) {
            //Row for income.
            var taxableIncomeRow = jointAssetSheet.getCustomName('InvTaxableIncome');
            if (taxableIncomeRow != undefined && taxableIncomeRow._baseRow != undefined && taxableIncomeRow._baseColumn != undefined) {
                isAssessableIncome = true;
                row++;
                displayedRow++;
                taxation.setValue(row, 0, '  Joint Investment Income ');
                taxation.setFormula(row, 1, '=' + assetSheetName + '!' + GetAbsoluteExcelCell(taxableIncomeRow._baseRow, taxableIncomeRow._baseColumn) + '/2');
                displayedRow++;
                if (displayedRow % 2 == 0) {
                    taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                else {
                    taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
                var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
                taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            }
            //Row for Imputation credits aka Franking credits.
            var imputationRow = jointAssetSheet.getCustomName('InvImputationCredits');
            if (imputationRow != undefined && imputationRow._baseRow != undefined && imputationRow._baseColumn != undefined) {
                isAssessableIncome = true;
                row++;
                displayedRow++;
                taxation.setValue(row, 0, '  Joint Imputation Credits ');
                taxation.setFormula(row, 1, '=' + assetSheetName + '!' + GetAbsoluteExcelCell(taxableIncomeRow._baseRow, taxableIncomeRow._baseColumn) + '/2');
                displayedRow++;
                if (displayedRow % 2 == 0) {
                    taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                else {
                    taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                    taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                }
                var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
                var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
                taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
                taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
                totalCredits += GetAbsoluteExcelCell(row + 1, 2) + '+';
            }
        }
    }
    //Render Capital Gains.
    if (assetSheet != undefined) {
        //Row for income.
        var capFormula='';
        var capitalGainRow = assetSheet.getCustomName('invCapitalGain' + ownerId);
        if (capitalGainRow != undefined && capitalGainRow._baseRow != undefined && capitalGainRow._baseColumn != undefined) {                                    
            capFormula += assetSheetName + '!' + GetAbsoluteExcelCell(capitalGainRow._baseRow, capitalGainRow._baseColumn)+'+';
        }
        if (jointId != undefined && jointId != null) {
            var jointAssetName = 'Asset_' + jointId;
            var jointAssetSheet = spread.getSheetFromName(jointAssetName);
            if (jointAssetSheet != undefined) {
                capitalGainRow = assetSheet.getCustomName('InvTaxableIncome' + ownerId);
                if (capitalGainRow != undefined && capitalGainRow._baseRow != undefined && capitalGainRow._baseColumn != undefined) {
                    taxation.setValue(row, 0, '  Investment Income ');
                    capFormula += assetSheetName + '!' + GetAbsoluteExcelCell(capitalGainRow._baseRow, capitalGainRow._baseColumn) + '/2';
                }
            }
        }
        if (capFormula != undefined && capFormula.trim() != '') {
            debugger;
            capFormula = capFormula.slice(0, -1);
            isAssessableIncome = true;
            row++;
            displayedRow++;
            if (displayedRow % 2 == 0) {
                taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            taxation.setValue(row, 0, '  Capital Gains ');
            taxation.setFormula(row, 1, '='+capFormula);
            var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
            taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        }
    }
    //Pensiom Taxable income and franked credits.
    var pensionSheetName = 'Pension_' + ownerId;
    var penSheet = spread.getSheetFromName(pensionSheetName);
    if (penSheet != undefined) {
        var taxableIncomeRow = penSheet.getCustomName('PensionTaxableInc');
        if (taxableIncomeRow != undefined && taxableIncomeRow._baseRow != undefined && taxableIncomeRow._baseColumn != undefined) {
            isAssessableIncome = true;
            row++;
            displayedRow++;
            taxation.setValue(row, 0, '  Pension Taxable Income ');
            taxation.setFormula(row, 1, '=' + pensionSheetName + '!' + GetAbsoluteExcelCell(taxableIncomeRow._baseRow, taxableIncomeRow._baseColumn));
            if (displayedRow % 2 == 0) {
                taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
            taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        }
        //Row for Imputation credits aka Franking credits.
        var imputationRow = penSheet.getCustomName('PensionFrankedInc');
        if (imputationRow != undefined && imputationRow._baseRow != undefined && imputationRow._baseColumn != undefined) {
            isAssessableIncome = true;
            row++;
            displayedRow++;
            taxation.setValue(row, 0, '  Pension Imputation Credits ');
            taxation.setFormula(row, 1, '=' + pensionSheetName + '!' + GetAbsoluteExcelCell(imputationRow._baseRow, imputationRow._baseColumn));
            if (displayedRow % 2 == 0) {
                taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
            taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
            totalCredits += GetAbsoluteExcelCell(row + 1, 2) + '+';
        }
    }

    if (isAssessableIncome)//if there is any income then show sub total else hide assessable income row.
    {
        row++;
        taxation.setValue(row, 0, ' Sub Total(a) ');
        taxation.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(assessableIncomeRow, 2) + ':' + GetAbsoluteExcelCell(row, 2) + ')');//check cell formula.
        taxation.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var startTotalOutflow = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endTotalOutflow = new GcSpread.Sheets.Range(row, 1, 1, years);
        taxation.fillAuto(startTotalOutflow, endTotalOutflow, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        taxableIncomeTotal = row;
    }
    else {
        taxation.getRow(row).visible(false);
    }
    row++;
    taxation.setValue(row, 0, ' Non Cashflow Tax Adjustments ');
    taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    taxation.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
    row++;
    taxation.setValue(row, 0, ' Tax Deductions ');
    taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    taxation.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
    deductionStartRow = row + 1;
    displayedRow = 0;
    var superSheetName = 'Super_' + ownerId;
    var ownerSuperSheet = spread.getSheetFromName(superSheetName);
    if (ownerSuperSheet != undefined) {
        var contribData = ownerSuperSheet.getCustomName('SuperContribution');
        if (contribData != undefined && contribData._baseRow != undefined && contribData._baseColumn != undefined) {
            isDeduction = true;
            row++;
            displayedRow++;
            taxation.setValue(row, 0, '  Contributions ');
            taxation.setFormula(row, 1, '=' + superSheetName + '!' + GetAbsoluteExcelCell(contribData._baseRow, contribData._baseColumn));
            displayedRow++;
            if (displayedRow % 2 == 0) {
                taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
            taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        }
    }
    //below rows logic not available yet.
    row++;
    displayedRow++;
    taxation.setValue(row, 0, '  Tax Deductible Interest Payments ');
    //taxation.setFormula(row, 1, '=' + superSheetName + '!' + GetAbsoluteExcelCell(contribData._baseRow, contribData._baseColumn));    
    if (displayedRow % 2 == 0) {
        taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    row++;
    isDeduction = true;
    displayedRow++;
    taxation.setValue(row, 0, '  Tax Deductible Interest Payments-Joint Loans ');
    //taxation.setFormula(row, 1, '=' + superSheetName + '!' + GetAbsoluteExcelCell(contribData._baseRow, contribData._baseColumn));    
    if (displayedRow % 2 == 0) {
        taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    row++;
    displayedRow++;
    taxation.setValue(row, 0, '  Tax Deductible Expenses ');
    //taxation.setFormula(row, 1, '=' + superSheetName + '!' + GetAbsoluteExcelCell(contribData._baseRow, contribData._baseColumn));    
    if (displayedRow % 2 == 0) {
        taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

    if (cashSheet != undefined) {
        var taxDeductionRow = cashSheet.getCustomName('TaxDeductionCashSheet');//Need to know.
        if (taxDeductionRow != undefined) {
            row++;
            displayedRow++;
            taxation.setValue(row, 0, '  Tax Deductible-Joint ');
            taxation.setFormula(row, 1, '=' + cashSheetName + '!' + GetAbsoluteExcelCell(taxDeductionRow._baseRow, taxDeductionRow._baseColumn) + '/2');
            displayedRow++;
            if (displayedRow % 2 == 0) {
                taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            else {
                taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
                taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            }
            var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
            taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
            taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        }
    }
    if (isDeduction)//if there is any income then show sub total else hide assessable income row.
    {
        row++;
        taxation.setValue(row, 0, ' Sub Total(b) ');
        taxation.setFormula(row, 1, '=Sum(' + GetAbsoluteExcelCell(deductionStartRow + 1, 2) + ':' + GetAbsoluteExcelCell(row, 2) + ')');//check cell formula.
        taxation.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        var startTotalOutflow = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endTotalOutflow = new GcSpread.Sheets.Range(row, 1, 1, years);
        taxation.fillAuto(startTotalOutflow, endTotalOutflow, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        taxableDeductionTotal = row;
    }
    else {
        taxation.getRow(row).visible(false);
    }

    if (taxableIncomeTotal > 0 && taxableDeductionTotal > 0) {
        row++;
        taxation.setValue(row, 0, ' Taxable Income ');
        taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        taxation.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
        row++;
        taxation.setValue(row, 0, ' Net Taxable Income(a-b) ');
        taxation.setFormula(row, 1, '=' + GetAbsoluteExcelCell(taxableIncomeTotal + 1, 2) + '-' + GetAbsoluteExcelCell(taxableDeductionTotal + 1, 2));
        taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.        
        var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
        taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);

        row++;
        taxation.setValue(row, 0, ' Tax ');
        taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        taxation.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
        row++;
        taxation.setValue(row, 0, ' Index hidden row. ');
        if (taxTableStartRow > 0)//setting tax values if taxable table data is available.
        {
            taxation.setFormula(row, 1, '=VLOOKUP(' + GetAbsoluteExcelCell(row - 1, 2) + ',$D$' + (taxTableStartRow + 1) + ':$F$' + (taxTableStartRow + 5) + ',3)');
            taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.        
            var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
            taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        }
        taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        taxation.getRow(row).visible(false);
        row++;
        taxation.setValue(row, 0, ' Tax before Offsets & Credits(c) ');
        if (taxTableStartRow > 0)//setting tax values if taxable table data is available.
        {
            taxation.setFormula(row, 1, '=(VLOOKUP(' + GetAbsoluteExcelCell(row, 2) + ',$A$' + (taxTableStartRow + 1) + ':$D$' + (taxTableStartRow + 5) + ',2))+(' + GetAbsoluteExcelCell(row - 2, 2) + '-VLOOKUP(' + GetAbsoluteExcelCell(row, 2) + ',$A$' + (taxTableStartRow + 1) + ':$D$' + (taxTableStartRow + 5) + ',4))*(VLOOKUP(' + GetAbsoluteExcelCell(row, 2) + ',$A$' + (taxTableStartRow + 1) + ':$D$' + (taxTableStartRow + 5) + ',3))');
            taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
            taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.        
            var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
            var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
            taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        }
        taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        totalTaxRow = row;
    }
    if (totalCredits != undefined) {
        row++;
        taxation.setValue(row, 0, ' Credits ');
        taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        taxation.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
        row++;
        taxation.setValue(row, 0, '   Imputation Credits ');
        totalCredits = totalCredits.slice(0, -1);
        taxation.setFormula(row, 1, '=' + totalCredits);// + '-' + GetAbsoluteExcelCell(taxableDeductionTotal + 1, 2)); vlookup formula
        taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.        
        var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
        var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
        taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
        totalCreditsRow = row;
    }
    displayedRow = 0;
    row++;
    taxation.setValue(row, 0, ' Offsets ');
    taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    taxation.setStyle(row, -1, style_subHeading, $.wijmo.wijspread.SheetArea.viewport);
    row++;
    isOffset = true;
    displayedRow++;
    taxation.setValue(row, 0, '  Senoir Australian Tax Offset ');
    //taxation.setFormula(row, 1, '=' + superSheetName + '!' + GetAbsoluteExcelCell(contribData._baseRow, contribData._baseColumn));
    displayedRow++;
    if (displayedRow % 2 == 0) {
        taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    row++;
    isOffset = true;
    displayedRow++;
    taxation.setValue(row, 0, '  Low Income Tax Offset ');
    //taxation.setFormula(row, 1, '=' + superSheetName + '!' + GetAbsoluteExcelCell(contribData._baseRow, contribData._baseColumn));
    displayedRow++;
    if (displayedRow % 2 == 0) {
        taxation.setStyle(row, -1, style_rowHeading_text_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading_even, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    else {
        taxation.setStyle(row, -1, style_rowHeading_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
        taxation.setStyle(row, 0, style_rowHeading, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    }
    //var startTaxation = new GcSpread.Sheets.Range(row, 1, 1, 1);
    //var endTaxation = new GcSpread.Sheets.Range(row, 1, 1, years);
    //taxation.fillAuto(startTaxation, endTaxation, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    if (!isOffset) {
        taxation.getRow(row).visible(false);
    }
    //Setting total tax row.
    row++;
    taxation.setValue(row, 0, ' Total Tax ');
    var totalTaxFormula = totalTaxRow > 0 ? GetAbsoluteExcelCell(totalTaxRow + 1, 2) : '';
    totalTaxFormula += '-' + (totalCreditsRow > 0 ? GetAbsoluteExcelCell(totalCreditsRow + 1, 2) : '');
    taxation.setFormula(row, 1, '=' + totalTaxFormula);
    taxation.setStyle(row, -1, style_footer_text, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    taxation.setStyle(row, 0, style_footer, $.wijmo.wijspread.SheetArea.viewport);//setting style on complete row.
    taxation.setRowHeight(row, 30, $.wijmo.wijspread.SheetArea.viewport);
    var startTotalOutflow = new GcSpread.Sheets.Range(row, 1, 1, 1);
    var endTotalOutflow = new GcSpread.Sheets.Range(row, 1, 1, years);
    taxation.fillAuto(startTotalOutflow, endTotalOutflow, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
    taxation.addCustomName("totaltax" + ownerId, "=0", row + 1, 2);

    //Now set the tax row of cash account sheet.
    if (cashSheet != undefined) {
        var taxRow = cashSheet.getCustomName('cashTaxRow_' + ownerId);
        var taxRowIndex = 0;
        if (taxRow != undefined && taxRow._baseRow != undefined) {
            taxRowIndex = taxRow._baseRow - 1;
            cashSheet.setFormula(taxRow._baseRow - 1, 1, '=Taxation_' + ownerId + '!' + GetAbsoluteExcelCell(row + 1, 2));
            var startTax = new GcSpread.Sheets.Range(taxRowIndex, 1, 1, 1);
            var endTax = new GcSpread.Sheets.Range(taxRowIndex, 1, 1, years);
            cashSheet.fillAuto(startTax, endTax, GcSpread.Sheets.FillSeries.Row, GcSpread.Sheets.Direction.right);
        }
    }
    taxation.setRowCount(row + 1);
    //for (var i = 0; i <= years; i++) {
    //    taxation.autoFitColumn(i);
    //}
    taxation.clearSelection();
}
function indexCashflowData() {
    //index Income.
    for (var i = 0; i < income.length; i++) {        
        indexYearData(income[i]);
    }
    //Index Expense.
    for (var i = 0; i < expense.length; i++) {        
        indexYearData(expense[i]);
    }
    //index Investment.
    for (var i = 0; i < investment.length; i++) {        
        indexYearData(investment[i]);
    }
    //index liability.
    for (var i = 0; i < liability.length; i++) {        
        indexYearData(liability[i]);
    }
    //index contributions.
    for (var i = 0; i < contributions.length; i++) {        
        indexYearData(contributions[i]);
    }
    //index super.
    for (var i = 0; i < superannuation.length; i++) {        
        indexYearData(superannuation[i]);
    }
    //index Reinvestment
    for (var i = 0; i < reInvestments.length; i++) {
        indexYearData(reInvestments[i]);
    }
}
function indexYearData(object) {
    //isInv == undefined ? false : isInv;
    if (object.startDate != undefined) {
        object.startYear = getFinancialYear(object.startDate);
        if (object.startYear == 0)
            object.startYear = (new Date(object.startDate)).getFullYear();
        if (object.startYear < (startYear)) {
            //if (isAmount&&!isInv) {
            //    object.Amount = object.Amount * (Math.pow((1 + object.growth / 100), startYear - object.startYear));
            //}
            //else if (isAmount && isInv) {
            //    object.opening = object.opening * (Math.pow((1 + object.growth / 100), startYear - object.startYear));
            //}//As per Gd, no need for indexing
            object.startYear = startYear;
            object.startDate = startYear + '-07-01';
            object.startYearDays = 365;
        }
        else {
            //infer days.
            var finYearEndDate = (parseInt(object.startYear) + 1) + '-06-31';
            object.startYearDays = Math.abs(getDaysInFinancialYear(object.startDate, finYearEndDate));
        }
    }
    //indexing last year dates.
    if (object.endDate != undefined) {
        object.endYear = getFinancialYear(object.endDate);
        if (object.endYear == 0)
            object.endYear = (new Date(object.endDate)).getFullYear();
        var finYearStartDate = object.endYear + '-07-01';
        object.endYearDays = Math.abs(getDaysInFinancialYear(object.endDate, finYearStartDate));
        if (parseInt(object.startYear) > parseInt(object.endYear)) {
            object.endYear = object.startYear;
            object.endDate = object.startDate;
            object.startYearDays = 0;
            object.endYearDays = 0;
        }
    }
}

function indexPensionRates() {
    var temp;
    var incPensionRates = $.grep(pensionRates, function (element, index) {
        return element.YearID == startYear;
    });
    if (!(incPensionRates != undefined && incPensionRates != null && incPensionRates.length > 0)) {
        //Start indexing..        
        for (var i = 0; i < pensionRates.length; i++) {
            temp = pensionRates[i];
            temp.maxPension = temp.maxPension * Math.pow((1 + awoteRate / 100), startYear - temp.YearID);
            temp.incFullPensionThres = temp.incFullPensionThres * Math.pow((1 + awoteRate / 100), startYear - temp.YearID);
            temp.incNillPensionThres = temp.incNillPensionThres * Math.pow((1 + awoteRate / 100), startYear - temp.YearID);
            temp.deemLimitThres = temp.deemLimitThres * Math.pow((1 + awoteRate / 100), startYear - temp.YearID);
            temp.YearID = startYear;
        }

    }
    var astPensionRates = $.grep(pensionAssetRates, function (element, index) {
        return element.YearID == startYear;
    });
    if (!(astPensionRates != undefined && astPensionRates != null && astPensionRates.length > 0)) {
        //Start indexing..        
        for (var i = 0; i < pensionAssetRates.length; i++) {
            temp = pensionAssetRates[i];
            temp.astFullPensionThres = temp.astFullPensionThres * Math.pow((1 + awoteRate / 100), startYear - temp.YearID);
            temp.astNillPensionThres = temp.astNillPensionThres * Math.pow((1 + awoteRate / 100), startYear - temp.YearID);
            temp.YearID = startYear;
        }

    }

}
function getFinancialYear(startDate) {
    var financialStartYear = 0;
    if (startDate != undefined) {
        var startDateObj = new Date(startDate);
        var month = startDateObj.getMonth() + 1;
        if (month < 7)//Date before july comes in previous year.
            financialStartYear = startDateObj.getFullYear() - 1;
        else
            financialStartYear = startDateObj.getFullYear();
    }

    return financialStartYear;
}
function getDaysInFinancialYear(first, second) {
    if (first != undefined && second != undefined) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(first);
        var secondDate = new Date(second);
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        if (diffDays > 365)
            diffDays = 365;
        else if (diffDays < 0)
            diffDays = 0;
        return diffDays;
    }
}
function getCurrentAgeInFinancialYear(dob) {
    var scenStartDate = startYear + '-07-01';
    if (dob != undefined) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(scenStartDate);
        var secondDate = new Date(dob);
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        var age = Math.ceil(diffDays / 365);
        return age;
    }
}
function fitSheetsColumn(count) {
    var sheet;
    for (var i = 0; i < count; i++) {
        sheet = spread.getSheet(i);
        for (var j = 0; j <= years; j++) {
            sheet.autoFitColumn(j);
        }
    }
}
function GetAbsoluteExcelCell(row, column) {
    var result;
    if (column <= 26) {
        result = letter(column);
    } else {
        var modulo = column % 26;
        var quotient = Math.floor(column / 26);
        if (modulo === 0) {
            result = letter(quotient - 1) + letter(26);
        } else {
            result = letter(quotient) + letter(modulo);
        }
    }

    return result += '' + row;
}
function letter(nNum) {
    var a = "A".charCodeAt(0);
    return String.fromCharCode(a + nNum - 1);
}
$(document).on("contextmenu", function () {
    event.preventDefault();
    return false;
});
function processContextMenu(e) {
    var sheet = spread.getActiveSheet(),
        target = getHit(e.pageX, e.pageY, sheet),
        hitTestType = target.hitTestType,
        row = target.row,
        col = target.col,
        selections = sheet.getSelections();

    var isHideContextMenu = false;
    var key = sheet.getName() + "_" + row;
    var data = rowLookup[key];
    var type = '';
    var id;
    if (data != undefined) {
        type = data.split("_")[0];
        id = data.split("_")[1];
    }

    var $contextMenu = $("#contextMenu");
    $contextMenu.data("sheetArea", hitTestType);
    if (isHideContextMenu) {
        hideContextMenu();
    } else {
        $contextMenu.css({ left: e.pageX, top: e.pageY });
        $contextMenu.empty();
        switch (type.toLowerCase()) {
            case 'inv':
                $contextMenu.append('<li><a onclick="editAsset(' + id + ')"><span class="wijmo-wijmenu-text">Edit Asset</span></a></li>');
                $contextMenu.append('<li><a onclick="Open_Delete_Popup(\'inv\',' + id + ')"><span class="wijmo-wijmenu-text">Delete Asset</span></a></li>');
                $contextMenu.append('<li><a onclick="openRedem(' + id + ')"><span class="wijmo-wijmenu-text">Redemption</span></a></li>');
                $contextMenu.append('<li><a onclick="openReinv(' + id + ')"><span class="wijmo-wijmenu-text">Reinvestment</span></a></li>');
                break;
            case 'lia':
                $contextMenu.append('<li><a onclick="editLia(' + id + ')"><span class="wijmo-wijmenu-text">Edit Liability</span></a></li>');
                $contextMenu.append('<li><a onclick="Open_Delete_Popup(\'lia\',' + id + ')"><span class="wijmo-wijmenu-text">Delete Liability</span></a></li>');
                break;
            case 'inc':
                $contextMenu.append('<li><a onclick="editInc(' + id + ')"><span class="wijmo-wijmenu-text">Edit Income</span></a></li>');
                $contextMenu.append('<li><a onclick="Open_Delete_Popup(\'inc\',' + id + ')"><span class="wijmo-wijmenu-text">Delete Income</span></a></li>');
                break;
            case 'exp':
                $contextMenu.append('<li><a onclick="editExp(' + id + ')"><span class="wijmo-wijmenu-text">Edit Expense</span></a></li>');
                $contextMenu.append('<li><a onclick="Open_Delete_Popup(\'exp\',' + id + ')"><span class="wijmo-wijmenu-text">Delete Expense</span></a></li>');
                break;
            case 'pen':
                $contextMenu.append('<li><a onclick="editPension(' + id + ')"><span class="wijmo-wijmenu-text">Edit Pension</span></a></li>');
                $contextMenu.append('<li><a onclick="Open_Delete_Popup(\'pen\',' + id + ')"><span class="wijmo-wijmenu-text">Delete Pension</span></a></li>');
                break;
            case 'cont':
                $contextMenu.append('<li><a onclick="editContribution(' + id + ')"><span class="wijmo-wijmenu-text">Edit Contribution</span></a></li>');
                $contextMenu.append('<li><a onclick="Open_Delete_Popup(\'cont\',' + id + ')"><span class="wijmo-wijmenu-text">Delete Contribution</span></a></li>');
                break;
        }
        if (type != '' && id != undefined)
            $contextMenu.show();
        $(document).on("mousedown.contextmenu", function () {
            if ($(event.target).parents("#contextMenu").length === 0) {
                hideContextMenu();
            }
        });
    }
}
function getHit(pageX, pageY, sheet) {
    var offset = $("#excelArea").offset(),
            x = pageX - offset.left,
            y = pageY - offset.top;
    return sheet.hitTest(x, y);
}

function hideContextMenu() {
    $("#contextMenu").hide();
    $(document).off("mousedown.contextmenu");
}
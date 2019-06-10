
function array_count_values(arr) {
    var counts = {};
    try {
        for (var key in arr) {
            counts[arr[key]] = (counts[arr[key]]) ? counts[arr[key]] + 1 : 1;
        }
        return counts
    } catch (err) {
        console.log(err)
    }

}


function array_unique(arr) {
    try {
        let unique_array = Array.from(new Set(arr))
        return unique_array
    } catch (err) {
        console.log(err)
    }
}

function isset(obj) {
    return (typeof obj !== 'undefined') ? true : false
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;

function calculate(multiArr) {
    var nFields = multiArr.length
    var nCases = multiArr[0].length
    debugger;
    var multiArr = [[0, 1, 1, 2, 1, 1, 1, 1, 0, 2],
    [1, 1, 1, 2, 1, 1, 1, 0, 0, 2],
    [0, 1, 1, 1, 1, 0, 1, 1, 0, 2]
    ]

    //multiArr=multiArr[0].map((x,i) => multiArr.map(x => x[i]))


    //begin Fleiss' Kappa calcs

    try {

        var uArray = [];
        for (var key in multiArr) {
            tempArr = array_unique(multiArr[key]);
            uArray = uArray.concat(tempArr);
        }

        uArray = array_unique(uArray);
        var nUnique = (uArray).length;

        var cohensTable = []
        for (let i = 0; i < nUnique; i++) {
            cohensTable.push([]);
        }

        for (let i = 0; i < nCases; i++) {
            for (let n = 0; n < nFields; n++) {
                for (x = 0; x < nUnique; x++) {
                    if (!isset(cohensTable[x][i])) cohensTable[x][i] = 0;
                    if (multiArr[n][i] == uArray[x]) cohensTable[x][i]++;
                }
            }
        }

        var pSubj = []
        //generate P-sub-j's and P Bar E	
        for (let x = 0; x < nUnique; x++) {
            pSubj.push(cohensTable[x].reduce(reducer))
        }
        var cellTotal = pSubj.reduce(reducer);
        for (var key in pSubj) {
            pSubj[key] = pSubj[key] / cellTotal;
            pSubj[key] = Math.pow(pSubj[key], 2);
        }

        var pBarE = pSubj.reduce(reducer);

        var pSubi = []
        //generate P-sub-i's and P Bar	
        for (let i = 0; i < nCases; i++) {
            for (let x = 0; x < nUnique; x++) {
                if (!isset(pSubi[i])) pSubi[i] = 0;
                let temp = Math.pow(cohensTable[x][i], 2) - cohensTable[x][i];
                pSubi[i] = temp + pSubi[i];
            }
            pSubi[i] = (1 / (nFields * (nFields - 1))) * pSubi[i];
        }
        var pBar = (1 / nCases) * pSubi.reduce(reducer);
        if (pBarE != 1) fleissKappa = (pBar - pBarE) / (1 - pBarE);
        else {
            fleissKappa = "undefined*";
            noFleiss = 1;
        }

        //begin average pairwise percent calcs
        var nAgr = [];
        var remainder = nFields - 1;
        for (let i = 0; i < nFields - 1; i++) {
            for (let rem2 = remainder; rem2 > 0; rem2--) {
                aCount = 0;
                for (let c = 0; c < nCases; c++) {
                    if (multiArr[i][c] == multiArr[i + rem2][c]) aCount++;
                }
                nAgr.push(aCount / nCases);
            }
            remainder--;
        }

        var app = nAgr.reduce(reducer) / nAgr.length;

        //begin Krippendorff's Alpha calcs

        var nVals = nFields * nCases;
        var kripsTable = [];
        for (let i = 0; i < nUnique; i++) {
            kripsTable[i] = [];
        }
        remainder = nFields - 1;
        for (let i = 0; i < nFields - 1; i++) {
            for (let rem2 = remainder; rem2 > 0; rem2--) {
                for (let c = 0; c < nCases; c++) {
                    if (kripsTable[multiArr[i][c]][multiArr[i + rem2][c]] == undefined) kripsTable[multiArr[i][c]][multiArr[i + rem2][c]] = 0
                    if (kripsTable[multiArr[i + rem2][c]][multiArr[i][c]] == undefined) kripsTable[multiArr[i + rem2][c]][multiArr[i][c]] = 0
                    kripsTable[multiArr[i][c]][multiArr[i + rem2][c]] = parseInt(kripsTable[multiArr[i][c]][multiArr[i + rem2][c]]) + (1 / (nFields - 1));
                    kripsTable[multiArr[i + rem2][c]][multiArr[i][c]] = parseInt(kripsTable[multiArr[i + rem2][c]][multiArr[i][c]]) + (1 / (nFields - 1));
                }
            }
            remainder--;
        }
        var nSubC = [];

        for (var key in kripsTable) {
            if (kripsTable[key] != undefined && kripsTable[key].length > 0) {
                nSubC.push(kripsTable[key].reduce(reducer));
            }
        }


        obsMatch = [];

        for (var key in kripsTable) {
            for (var keyy in kripsTable[key]) {
                if (key == keyy) {
                    obsMatch.push(kripsTable[key][keyy]);
                }
            }
        }

        var sumObs = obsMatch.reduce(reducer);
        var nCMinus = [];

        for (var key in nSubC) {
            nCMinus.push(nSubC[key] * (nSubC[key] - 1));
        }
        var sumMinus = nCMinus.reduce(reducer);

        if (((nVals * (nVals - 1)) - sumMinus) != 0 && nUnique > 1) {
            kripsAlpha = (((nVals - 1) * sumObs) - sumMinus) / ((nVals * (nVals - 1)) - sumMinus);
        }
        else { kripsAlpha = "undefined*"; }

        //begin avg pairwise Cohen's Kappa calcs
        var arrFreqs = [];
        for (let v = 0; v < nFields; v++) {
            arrFreqs[v] = array_count_values(multiArr[v]);
        }
        var marProds = [];
        var i = 0;
        for (let v = 0; v < nFields; v++) {
            rem2 = nFields - 1;
            while (rem2 > v) {
                marProds[i] = [];
                for (var key in arrFreqs[v]) {
                    marProds[i][key] = arrFreqs[v][key] * arrFreqs[rem2][key];
                }
                i++;
                rem2--;
            }
        }

        var cohensEA = [];
        var nSqd = Math.pow(nCases, 2);
        for (var key in marProds) {
            cohensEA[key] = (1 / nSqd) * (marProds[key].reduce(reducer));
        }
        var cohensK = [];
        for (var key in cohensEA) {
            if (Math.round(cohensEA[key], 10) != 1) cohensK.push((nAgr[key] - cohensEA[key]) / (1 - cohensEA[key]));
            else {
                cohensK.push("undefined**");
                var noCohen = 1;
            }
        }
        if (noCohen != 1) apCK = cohensK.reduce(reducer) / cohensK.length
        else apCK = "undefined**";


        console.dir(apCK)
    }
    catch (error) {
        console.log(error)
    }
}
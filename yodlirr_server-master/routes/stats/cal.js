var exports=module.exports={}

function array_slice(arr, offst, lgth, preserveKeys) { // eslint-disable-line camelcase
    var key = ''

    if (Object.prototype.toString.call(arr) !== '[object Array]' || (preserveKeys && offst !== 0)) {
        // Assoc. array as input or if required as output
        var lgt = 0
        var newAssoc = {}
        for (key in arr) {
            lgt += 1
            newAssoc[key] = arr[key]
        }
        arr = newAssoc

        offst = (offst < 0) ? lgt + offst : offst
        lgth = lgth === undefined ? lgt : (lgth < 0) ? lgt + lgth - offst : lgth

        var assoc = {}
        var start = false
        var it = -1
        var arrlgth = 0
        var noPkIdx = 0

        for (key in arr) {
            ++it
            if (arrlgth >= lgth) {
                break
            }
            if (it === offst) {
                start = true
            }
            if (!start) {
                continue
            }++arrlgth
            if (typeof(key) == typeof(1) && !preserveKeys) {
                assoc[noPkIdx++] = arr[key]
            } else {
                assoc[key] = arr[key]
            }
        }
        // Make as array-like object (though length will not be dynamic)
        // assoc.length = arrlgth;
        return assoc
    }

    if (lgth === undefined) {
        return arr.slice(offst)
    } else if (lgth >= 0) {
        return arr.slice(offst, offst + lgth)
    } else {
        return arr.slice(offst, lgth)
    }
}

function array_unique(arr) {
    let unique_array = Array.from(new Set(arr))
    return unique_array
}

function isset(obj) {
    return (typeof obj !== 'undefined') ? true : false
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;

function is_numeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function array_sum(arr) {

    if (arr.length > 0)
        return arr.reduce(reducer)
    else
        return 0

}

function parseIntArray(arr) {
    arr.forEach(row => {
        row.map(item => {
            return parseInt(item, 10)
        })
    })
    return arr
}

function array_count_values(arr) {
    var counts = {};
    for (var key in arr) {
        counts[arr[key]] = (counts[arr[key]]) ? counts[arr[key]] + 1 : 1;
    }
    return counts
}

exports.kripsAlphaCalculation=function (multiArr) {
    let negVal = 0
    let nFields = multiArr.length
    let nCases = multiArr[0].length
    let invv = 1
    let blank = 0;
    debugger;
   
    let uArray = [];
   
    let nUnique = 0;
    let kripsTable = [];
    for (var key in multiArr) {
        tempArr = array_unique(multiArr[key]);
        uArray = uArray.concat(tempArr);
    }
    uArray = array_unique(uArray);
    nUnique = (uArray).length
    for (var key in multiArr) {
        for (var keyy in multiArr[key]) {
            if (multiArr[0][0] != multiArr[key][keyy]) {
                invv = 0;
                break;
            }
        }
    }
    if (invv == 1) {
        return "no variation therefore no reliability coefficients could be calculated"
    }
    for (var key in multiArr) {
        tempArr = array_unique(multiArr[key]);
        uArray = uArray.concat(tempArr);
    }
    uArray = array_unique(uArray);
    nUnique = (uArray).length;
    uArray = uArray.sort()
    let nVals = (nFields * nCases) //this will be different if any data are missing
    
    for (var key in uArray) {
        kripsTable[uArray[key]] = [];
    }
    let remainder = nFields - 1;
    for (let i = 0; i < nFields - 1; i++) {
        for (let rem2 = remainder; rem2 > 0; rem2--) {
            for (let c = 0; c < nCases; c++) {
                denom = 0;
                for (col = 0; col < nFields; col++)
                    if (is_numeric(multiArr[col][c])) denom++;
                if (is_numeric(multiArr[i][c]) && is_numeric(multiArr[i + rem2][c])) { //missing data pt 3: ensure values exist
                    kripsTable[multiArr[i][c]][multiArr[i + rem2][c]] = (kripsTable[multiArr[i][c]][multiArr[i + rem2][c]]) == undefined ? 0 + (1 / (denom - 1)) : parseInt(kripsTable[multiArr[i][c]][multiArr[i + rem2][c]]) + (1 / (denom - 1));
                    kripsTable[multiArr[i + rem2][c]][multiArr[i][c]] = (kripsTable[multiArr[i + rem2][c]][multiArr[i][c]]) == undefined ? 0 + (1 / (denom - 1)) : parseInt(kripsTable[multiArr[i + rem2][c]][multiArr[i][c]]) + (1 / (denom - 1));
                }
            }
        }
        remainder--;
    }

    let nSubC = [];
    for (var key in kripsTable) {
        if (kripsTable[key] != undefined) {
            nSubC.push(array_sum(kripsTable[key]));

        }
    }

    let obsMatch = [];
    for (var key in kripsTable) {
        for (var keyy in kripsTable[key]) {
            if (key == keyy) {
                obsMatch.push(kripsTable[key][keyy]);
            }
        }
    }
    let sumObs = array_sum(obsMatch);
    let nCMinus = [];
    for (var key in nSubC) {
        nCMinus.push(nSubC[key] * (nSubC[key] - 1));
    }
    let sumMinus = array_sum(nCMinus);
    if (((nVals * (nVals - 1)) - sumMinus) != 0) kripsAlpha = (((nVals - 1) * sumObs) - sumMinus) / ((nVals * (nVals - 1)) - sumMinus);
    else kripsAlpha = undefined;
    
    return kripsAlpha
}

function ksAlphCal() {
    //testing K's alpha - INTERVAL + RATIO + ORDINAL
    let offDiags = kripsTable;
    intNumer = [];
    if (negVal != 1) ratNumer = [];
    for (var key in offDiags) {
        for (var keyy in offDiags[key]) {
            if (key < keyy) {
                intNumer.push(Math.pow((key - keyy), 2) * offDiags[key][keyy]);
                if (negVal != 1) ratNumer.push(Math.pow((key - keyy), 2) * offDiags[key][keyy] * (1 / Math.pow((key + keyy), 2)));
            }
        }
    }


    intTop = array_sum(intNumer);
    if (negVal != 1) ratTop = array_sum(ratNumer);
    marginals = [];
    intDenom = [];
    for (var key in uArray) {
        marginals[uArray[key]] = 0
    };
    marginalsK = [];
    for (var yek in marginals) {
        for (var key in multiArr) {
            for (var kye in multiArr[key]) {
                if (multiArr[key][kye] == yek) {
                    marginals[yek]++;
                }
            }
        }
        marginalsK.push(marginals[yek]);
    }
    // ORDINAL STUFF
    ordNumer = [];
    p = 0;
    m = 0;
    for (var key in offDiags) {
        for (var keyy in offDiags[key]) {
            if (key < keyy) {
                for (var kye in marginals) {
                    if (keyy > kye) {
                        m++;
                    }
                }
                sumGK = array_sum(array_slice(marginalsK, p + 1, m - p - 1));
                ordNumer.push(offDiags[key][keyy] * Math.pow((marginals[key] / 2 + sumGK + marginals[keyy] / 2), 2));
                m = 0;
            }
        }
        p++;
    }
    ordTop = array_sum(ordNumer);

    // end ORDINAL
    i = 1;
    x = 0;
    uArray2 = [];
    ratDenom = []
    let ordDenom = [];
    for (var key in uArray) {
        uArray2.push(uArray[key])
    }
    for (var yek in marginals) {
        for (let j = i; j < marginalsK.length; j++) {
            intDenom.push(marginals[yek] * marginalsK[j] * Math.pow((yek - uArray2[j]), 2));
            if (negVal != 1) ratDenom.push(marginals[yek] * marginalsK[j] * Math.pow((yek - uArray2[j]), 2) * (1 / Math.pow((yek + uArray2[j]), 2)));

            if (j > x) {
                ordCK = (marginals[yek] / 2 + array_sum(array_slice(marginalsK, x + 1, j - x - 1)) + marginalsK[j] / 2);
            } else {
                ordCK = 0;
            }
            ordDenom.push(marginals[yek] * marginalsK[j] * Math.pow(ordCK, 2));
        }
        i++;
        x++;
    }
    ordBott = array_sum(ordDenom);
    intBott = array_sum(intDenom);
    if (negVal != 1) ratBott = array_sum(ratDenom);
    /*
    echo "intTop <br /> intBott <br /> blank <br /><pre>";


    //print_r(kripsTable);
    print_r(entries);
    echo "</pre>";
    */
    ordKripsA = 1 - ((nVals - 1) * (ordTop / ordBott));
    intKripsA = 1 - ((nVals - 1) * (intTop / intBott));
    if (negVal != 1) ratKripsA = 1 - ((nVals - 1) * (ratTop / ratBott));
    else ratKripsA = undefined;

    return {
        ordKripsA,
        intKripsA
    }
}
  
  

 exports.fleissKappaCalcs=function (multiArr) {
    //begin Fleiss' Kappa calcs
    let nFields = multiArr.length
    let nCases = multiArr[0].length
    let uArray = [];
    for (var key in multiArr) {
        let tempArr = array_unique(multiArr[key]);
        uArray = uArray.concat(tempArr);
    }

    uArray = array_unique(uArray);
    let nUnique = (uArray).length;

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

    return fleissKappa
}

exports.pairwisePercentCalcs=function(multiArr) {
    //begin average pairwise percent calcs
    let nFields = multiArr.length
    let nCases = multiArr[0].length
    let nAgr = [];
    let remainder = nFields - 1;
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

    let app = nAgr.reduce(reducer) / nAgr.length;

    return app
}



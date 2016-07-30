

var size = 4;
var series = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

exports.rowIndices = function(size, series) {
    var outerArr = [];
    for (var i=0; i<(size*size); i+=size) {
        var innerArr = [];
        for (var j=i; j<i+size; j++) {
            innerArr.push(series[j]);
        }
        outerArr.push(innerArr);
    }
    return outerArr;
};

// console.log(rowIndices());

exports.columnIndices = function(size, series) {
    var outerArr = [];
    for (var i=0; i<size; i++) {
        var innerArr = [];
        for (var j=i; j<(size*size); j+=size) {
            innerArr.push(series[j]);
        }
        outerArr.push(innerArr);
    }
    return outerArr;
};

// console.log(columnIndices());

exports.ltrIndices = function(size, series) {
    var outerArr = [];
    for (var i=0; i<(size*size); i+=(size+1)) {
        outerArr.push(series[i]);
    }
    return outerArr;
};

// console.log(ltrIndices());

exports.rtlIndices = function(size, series) {
    var outerArr = [];
    for (var i=(size-1); i<(size*size-1); i+=(size-1)) {
        outerArr.push(series[i]);
    }
    return outerArr;
};

// console.log(rtlIndices());
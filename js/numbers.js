var nums = generateNumbers();
var numShuffled = shuffle(nums);
var position = new Array();
var classList = new Array();
var indexDivs = new Array();

function createEmptyTable() {
    var divs = [];
    for (var i = 0; i < 12; i++) {
        divs.push("<div></div>");
    }
    $('#areaPlay').html(divs.join(''));
}

function displayNumbers() {
    $("#areaPlay div").each(function (i) {
        $(this).html(numShuffled[i][0] + "+" + numShuffled[i][1]);
        $(this).addClass(classList[i]);
    });
}

function showNumbers() {
    var numberDivs = $("#areaPlay div").length;
    if (numberDivs == 0) {
        createEmptyTable();
    }
    displayNumbers();
}

function generateNumbers() {
    var sums = [], a, b, c, d;
    for (var i = 0; i < 6; i++) {
        do {
            a = Math.floor(Math.random() * 10) + 1;
            b = Math.floor(Math.random() * 10) + 1;
            var firstSum = a + b;
        }
        while (a == b || (a <= 3 && b <= 3));
        do {
            c = Math.floor(Math.random() * 10) + 1;
            d = firstSum - c;
        }
        while (a == c || b == c || c >= firstSum || c == d || d <= 0);
        sums[i] = [];
        sums[i][0] = a;
        sums[i][1] = b;
        sums[i + 6] = [];
        sums[i + 6][0] = c;
        sums[i + 6][1] = d;
    }
    return sums;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function newNumbers() {
    nums = generateNumbers();
    numShuffled = shuffle(nums);
}

function validateSolution() {
    var divSelected = $("#areaPlay .show");
    divSelected.click(function click() {
        $(this).attr("selected", "selected");
        var index = $("#areaPlay div").index(this);
        position.push(index);
        console.log(position);
        var indexLength = $("div[selected]").length;
        console.log(indexLength);
        if (indexLength == 2) {
            if ((numShuffled[position[0]][0] + numShuffled[position[0]][1] == (numShuffled[position[1]][0] + numShuffled[position[1]][1]))) {
                position = [];
                $(".show[selected]").addClass('solved');
                $(".show[selected]").removeClass('show');
                $(".solved[selected]").removeAttr('selected');
            }
            else {
                $(".show[selected]").removeAttr('selected');
                position = [];
            }
        }
        save();
        var numbersSolved = $('.solved').length;
        if (numbersSolved == 12) {
            $('#areaPlay').hide();
            $('#solved').show();
        }
    });
}

function prepareSave() {
    classList = [];
    indexDivs = [];
    $("#areaPlay div").each(function () {
        var index = ($(this).attr('class'));
        classList.push(index);
        var indexD = $("#areaPlay div").index(this);
        indexDivs.push(indexD);
    });
}

function save() {
    prepareSave();
    $.ajax({
        method: "post",
        url: "./date/add.php",
        data: {
            id: indexDivs,
            numbers: numShuffled,
            classes: classList
        }
    });
}

function load() {
    $.ajax('date/list.php', {
        cache: false,
        dataType: 'json'
    }).done(function (listNumbers) {
        for (var i = 0; i < 12; i++) {
            numShuffled[i][0] = listNumbers[i].firstNumber;
            numShuffled[i][1] = listNumbers[i].secondNumber;
            classList[i] = listNumbers[i].class;
        }
        showNumbers();
        validateSolution();
    });
}

function prepareReset() {
    newNumbers();
    classList = ['show', 'show', 'show', 'show', 'show', 'show', 'show', 'show', 'show', 'show', 'show', 'show'];
    position = [];
    $("#areaPlay div").each(function () {
        var indexD = $("#areaPlay div").index(this);
        indexDivs.push(indexD);
        $(this).removeClass("solved");
        $(".show[selected]").removeAttr('selected');
    });
    displayNumbers();
}

function reset() {
    prepareReset();
    $.ajax({
        method: "post",
        url: "./date/add.php",
        data: {
            id: indexDivs,
            numbers: numShuffled,
            classes: classList
        }
    });
}

$(document).ready(function () {
    load();
    $('#reset').click(function () {
        reset();
        $('#areaPlay').show();
        $('#solved').hide();
        window.location.reload();
    });
});

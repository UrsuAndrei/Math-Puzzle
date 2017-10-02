var nums;

function createDivs(divs, i) {
    var div = document.createElement("DIV");
    divs[i] = div;
    div.setAttribute("class", i);
    document.getElementById("areaPlay").appendChild(div);
    var label = document.createElement("LABEL");
    div.appendChild(label);
    var input = document.createElement("input");
    input.type = 'checkbox';
    label.appendChild(input);
    var p = document.createElement("p");
    label.appendChild(p);
    input[i] = input;
    input[i].setAttribute("class", i);
}
function create(n) {
    var divs = [];
    for (var x = 0; x < n; x++) {
        createDivs(divs, x);
    }
    var num = numbers(n);
    nums = shuffle(num);
    var targetDiv = document.getElementById("areaPlay").getElementsByTagName("p");
    for (var i = 0; i < n; i++) {
        targetDiv[i].innerHTML = nums[i][0] + '+' + nums[i][1];
        console.info(targetDiv[i].innerHTML);
    }
    $("input").change(function check() {
        $(this).parent().parent().toggleClass("click");
        var a = $("input:checked").length;
        var cls = new Array();
        $("input:checked").each(function () {
            cls.push([$(this).attr("class")]);
        });
        if(a==2){
            if ((nums[cls[0]][0] + nums[cls[0]][1] == nums[cls[1]][0] + nums[cls[1]][1])) {
                $(".click").addClass("hide");
                $(".hide").fadeTo(1000, 0.6);
                $("input:checked").attr("disabled", true);
                $("input:checked").attr('checked', false);
                ;
                $(".click").removeClass("click");
            }
            else {
                $("input").attr('checked', false);
                $(".click").removeClass("click");
            }}
    });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function numbers(n) {
    var sums = [];
    var a;
    var b;
    var c;
    var d;
    for (var i = 0; i < n / 2; i++) {
        do {
            a = Math.floor(Math.random() * 10) + 1;
            b = Math.floor(Math.random() * 10) + 1;
            var first = a + b;
        }
        while (a == b || (a == 1 && b == 2) || (a == 2 && b == 1) || (a == 3 && b == 1) || (a == 1 && b == 3));
        do {
            c = Math.floor(Math.random() * 10) + 1;
            d = first - c;
        }
        while (a == c || b == c || c >= first || c == d || d <= 0);
        sums[i] = [];
        sums[i][0] = a;
        sums[i][1] = b;
        sums[i + n / 2] = [];
        sums[i + n / 2][0] = c;
        sums[i + n / 2][1] = d;
    }
    console.info(sums);
    return sums;
}
$.ajax("date/list.php",{
    cache:false,
    dataType: 'json'
}).done(function (numbers) {
    console.debug('contacts loaded', numbers);
    contacte.forEach(createRow);
    $("#contacts-list tbody").html(tableContent);

    $('#contacts-list a.edit').click(function() {
        var id = $(this).data('id');
        var contact = contacte.find(function(c) {
            return c.id == id;
        });
        console.debug('remove', id, contact, this);

        $('input[name=id]').val(contact.id);
        $('input[name=lastName]').val(contact.lastName);
        $('input[name=firstName]').val(contact.firstName);
        $('input[name=phone]').val(contact.phone);
    });
});
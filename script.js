num_a = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 
         'ninty'];
num_b = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
          'seventeen', 'eighteen', 'nineteen'];
num_c = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
suffix = ['billion', 'million','thousand', 'seconds'];

ids = ['#bill', '#mill', '#thou', '#unit']; // The target id's of the html


function unix(time){
    /* takes in unix timestamp and returns array of text*/
    time = pad(time);
    
    time_list = [];
    for (var i = 0; i < 12; i += 3){
        var temp = time.substring(i, i+3);
        time_list.push(temp)
    };
    a = []
    for (var n in time_list){
        a.push(convert(time_list[n]) + ' ' + suffix[n]);
    }

    return a;
}


function convert(num){
    /* Takes three digit number string and converts to text */
    var s = "";
    num = num.split('');

    var x = parseInt(num[0], 10);
    var y = parseInt(num[1], 10);
    var z = parseInt(num[2], 10);

    var hund = false;
    var teen = false;
    var tens = false;


    if (x > 0){                   // hundreds
        s += num_c[x] + ' hundred';
        hund = true;
    }

    if (y == 1){                  // teens
        if (hund){
        s += ' and ';   
        }
        s += num_b[z];
        teen = true;         
    } else if (y > 1) {           // tens
        if (hund){
            s += ' and ';   
        }
        s += num_a[y];
        tens = true;
    }

    if (z > 0 && !teen){          // units
        if (!tens && hund) {
            s += ' and';
        }
        s += ' ' + num_c[z];
    }

    if (s == ''){
        s = 'zero'      // on the rare occasion 000 is the input
    }


    return s.trim()
}


function pad(s) {
    /* takes in number and returns it "padded" to three places as a string */
    s = s.toString();
    while (s.length < 12) {
        s = "0" + s
    };
    return s;
}


function populate(){
    dt = new Date();
    t = Math.floor(dt.getTime() / 1000);
    $('#epoch').text(t);
    a = unix(t);
    
    for (var i in ids){
        $(ids[i]).text(a[i]);
    }
}


populate();  // single instance for during development. 
setInterval(populate, 1000);

$(document).ready(function(){
    $('.pres').hide(0).delay(1000).fadeIn(3000);
});
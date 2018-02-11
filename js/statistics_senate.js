/*eslint-env browser*/
/*eslint "no-console": "off"*/
/*global $ data*/

var statistics = {
    glance: {

        "number_of_democrats": "0",
        "number_of_republicans": "0",
        "number_of_independents": "0",
        "number_of_rep_total": "0",
        "votes_with_party_pct_democrats": "0",
        "votes_with_party_pct_republicans": "0",
        "votes_with_party_pct_independents": "0",
        "votes_with_party_pct_total": "0"

    },


    bottom_10_percent: [
        /*{
            "fullname": "dafault",
            "number_missed_votes": "0",
            "percentage_missed": "0"

        }*/
    ],

    top_10_percent: [
        /*{
            "fullname": "dafault",
            "number_missed_votes": "0",
            "percentage_missed": "0"

        }*/
    ],


    bottom_10_percent_loyalty: [
        /*{
            "fullname": "dafault",
            "N_party_votes": "0",
            "percentage_party_votes": "0"

    }*/
    ],

    top_10_percent_loyalty: [
       /*{
            "fullname": "dafault",
            "N_party_votes": "0",
            "percentage_party_votes": "0"

    }*/
    ],
};




$(document).ready(function () {
    function getCorrectJason(url){
        var senateUrl= "https://nytimes-ubiqum.herokuapp.com/congress/113/senate";
        var houseUrl= "https://nytimes-ubiqum.herokuapp.com/congress/113/house";
        if(document.getElementById("senate")){
          return senateUrl;
        }
        else{
       return  houseUrl;
        }
           }
 
    
    $.getJSON(getCorrectJason(), function( data ){
    var membersArray = data.results[0].members;



    var republicanArray = getPartyArray(membersArray, "R");

    var democratArray = getPartyArray(membersArray, "D");

    var independantArray = getPartyArray(membersArray, "I");

    var totalmembers = (republicanArray.length + democratArray.length + independantArray.length);
    console.log(totalmembers);



    statistics.glance.number_of_republicans = republicanArray.length;

    console.log(statistics);

    statistics.glance.number_of_democrats = democratArray.length;
    console.log(statistics);

    statistics.glance.number_of_independents = independantArray.length;
    console.log(statistics);

    statistics.glance.number_of_rep_total = totalmembers;



    console.log(republicanArray.length);

    console.log(democratArray.length);

    console.log(independantArray.length);



    //AVERAGE***************************

    var averagerepublicans = getPercentPartyVotesAverage(republicanArray);
    console.log(+(averagerepublicans));
    statistics.glance.votes_with_party_pct_republicans = averagerepublicans;
    console.log(statistics);

    var averagedemocrats = getPercentPartyVotesAverage(democratArray);
    console.log(+(averagedemocrats));
    statistics.glance.votes_with_party_pct_democrats = averagedemocrats;
    console.log(statistics);


    var averageindependents = getPercentPartyVotesAverage(independantArray);
    console.log(+(averageindependents));
    statistics.glance.votes_with_party_pct_independents = averageindependents;
    console.log(statistics);



    var total_average = getPercentPartyVotesAverage(membersArray);
    console.log(+(total_average));
    statistics.glance.votes_with_party_pct_total = total_average;
    console.log(statistics);






    createTable1();
    percentageTenLeastEngaged(membersArray);
    percentageTenTescendentMostEngaged(membersArray);
    createTable2();
    createTable3();





function createTable1() {
    $("#table1").html( "<tr><td>Democrats</td><td>" + statistics.glance.number_of_democrats + "</td><td>" + statistics.glance.votes_with_party_pct_democrats + "</td></tr>" + "<tr><td>Republicans</td><td>" + statistics.glance.number_of_republicans + "</td><td>" + statistics.glance.votes_with_party_pct_republicans + "</td></tr>" + "<tr><td>Independents</td><td>" + statistics.glance.number_of_independents + "</td><td>" + statistics.glance.votes_with_party_pct_independents + "</td></tr>" + "<tr><td>Total</td><td>" + statistics.glance.number_of_rep_total + "</td><td>" + statistics.glance.votes_with_party_pct_total + "</td></tr>");

}



function getPartyArray(members, partyString) {
    var generalarray = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == partyString)
            generalarray.push(members[i]);
    }
    return generalarray;

}


//use + adelante de members[i] para convertirlo en numero
function getPercentPartyVotesAverage(members) {
    var suma = 0;
    for (var i = 0; i < members.length; i++) {
        suma += +(members[i].votes_with_party_pct);

    }
    var average = suma / members.length;
    var entero = average.toFixed();
    return entero;


}


//***************+++++++++++LEAST ENGAGED ATTENDANCE++++*******************
function sorted(membersArray) {
    var myArray = membersArray.sort(function (a, b) {
        return b.missed_votes - a.missed_votes;
    });

    return myArray;

    //}
}


function percentageTenLeastEngaged(Array) {
    var sortedarray = sorted(Array);

    var arrayvacio = [];

    for (var i = 0; i < ((sortedarray.length) * 0.10); i++) {

        var dieznofixed = (sortedarray.length) * 0.10;
        var diez = dieznofixed.toFixed();


        if (i < diez) {
            arrayvacio.push(sortedarray[i]);
        } else if (sortedarray[diez - 1].missed_votes == sortedarray[i].missed_votes) {
            arrayvacio.push(sortedarray[i]);
        }
    }
    for (var j = 0; j < arrayvacio.length; j++) {
        var statmember = {
            fullname: getmemberfullname(arrayvacio[j]),
            number_missed_votes: arrayvacio[j].missed_votes,
            percentage_missed: arrayvacio[j].missed_votes_pct
        };
        statistics.bottom_10_percent.push(statmember);
    }



}

function createTable2() {
    var table2 = $("#table2");

    for (var i = 0; i < statistics.top_10_percent.length; i++) {

        var new_row = document.createElement("tr");
        table2.append(new_row);


        new_row.insertCell().innerHTML = statistics.bottom_10_percent[i].fullname;

        new_row.insertCell().innerHTML = statistics.bottom_10_percent[i].number_missed_votes;

        new_row.insertCell().innerHTML = statistics.bottom_10_percent[i].percentage_missed;
    }
}









//************+++++++++++FIN LEAST+++++++++++************



//********************MOST ENGAGED ATTENDENCE****************************************
//****HAGO TABLA MOST ENGAGED***



/*
function createTable3() {
   var table3= document.getElementById("table3");
    
    for(var i=0; i < statistics.top_10_percent.length; i++){
      
    var new_row1 = document.createElement("tr");
    table3.append(new_row1);


    new_row1.insertCell().innerHTML = statistics.top_10_percent[i].fullname;

    new_row1.insertCell().innerHTML = statistics.top_10_percent[i].number_missed_votes;
    
    new_row1.insertCell().innerHTML = statistics.top_10_percent[i].percentage_missed;
        }
}

*/
//***FIN TABLA***

function sorteDescendant(arraydecendant) {
    var myArayDescendant = arraydecendant.sort(function (a, b) {
        return a.missed_votes - b.missed_votes;



    });
    return myArayDescendant;

}


function percentageTenTescendentMostEngaged(Array) {
    var descendantarray = sorteDescendant(Array);

    var arrayvacio = [];

    for (var i = 0; i < ((descendantarray.length) * 0.10); i++) {

        var dieznofixed = (descendantarray.length) * 0.10;
        var diez = dieznofixed.toFixed();


        if (i < diez) {
            arrayvacio.push(descendantarray[i]);
        } else if (descendantarray[diez - 1].missed_votes == descendantarray[i].missed_votes) {
            arrayvacio.push(descendantarray[i]);
        }
    }

    for (var j = 0; j < arrayvacio.length; j++) {
        var statmember = {
            fullname: getmemberfullname(arrayvacio[j]),
            number_missed_votes: arrayvacio[j].missed_votes,
            percentage_missed: arrayvacio[j].missed_votes_pct
        };
        statistics.top_10_percent.push(statmember);
    }



}




function getmemberfullname(member) {
    console.log(member);

    var fullname = member.first_name;
    if (member.middle_name == null) {
        fullname += " ";
    } else {
        fullname += " " + member.middle_name + " ";
    }

    fullname += member.last_name;
    return fullname;
}

function createTable3() {
    var table3 = $("#table3");

    for (var i = 0; i < statistics.top_10_percent.length; i++) {

        var new_row1 = document.createElement("tr");
        table3.append(new_row1);


        new_row1.insertCell().innerHTML = statistics.top_10_percent[i].fullname;

        new_row1.insertCell().innerHTML = statistics.top_10_percent[i].number_missed_votes;

        new_row1.insertCell().innerHTML = statistics.top_10_percent[i].percentage_missed;
    }
}

//********************MOST ENGAGED FIN****************************************
});
    
    });
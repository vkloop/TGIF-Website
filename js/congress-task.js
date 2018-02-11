/*eslint-env browser*/
/*eslint "no-console": "off"*/
/*global $*/


$(document).ready(function () {

  
    function getCorrectJason(url) {
        var senateUrl = "https://nytimes-ubiqum.herokuapp.com/congress/113/senate";
        var houseUrl = "https://nytimes-ubiqum.herokuapp.com/congress/113/house";
        if (document.getElementById("senate")) {
            return senateUrl;
        } else {
            return houseUrl;
        }
    }


    $.getJSON(getCorrectJason(), function (data) {

        var membersArray = data.results[0].members;


        fillStates(membersArray);

        $(".party").on("change", function () {
            filter();
        });

        $(".drop").on("change", function () {
            filter();
        });




        

        function membersInfoUsingMustache(array) {

            var template = $('#order-template').html();
            var info = Mustache.render(template, data.results[0]);
            $('#senate-data-body').html(info);

 
            $('#senate-data-body').dataTable({
                "bScrollCollapse": true,
                "fixedHeader": true
            });


            $('a.gallery').colorbox();

       


        }

        membersInfoUsingMustache(membersArray);
        
        
        
  

 
          
      


        
        function fillStates(statesArray) {
            var dropdowns = $("#dropdown-filter");
            var noduplicates = [];

            var finalorder = statesArray.sort(function (a, b) {
                return (a.state > b.state) ? 1 : ((b.state > a.state) ? -1 : 0);
            });

            $(finalorder).each(function (i, member) {
                
                
               
                if (!noduplicates.includes(member.state)) {
                    noduplicates.push(member.state);
                    dropdowns.append($("<option/>").val(member.state).text(member.state));

                }



            });


        }

     

        function filter() {
            var checked = [];
            $(".party:checked").each(function () {

                checked.push($(this).val());




            });

           

            $(".myRow").each(function () {

                var value = $(this).find(".partyValue").text();
                var stateValue = $(this).find(".stateValue").text();

                var shouldShow = checked.length == 0 || checked.includes(value);

                var selectState = $("#dropdown-filter").val();
                var shouldShow2 = (stateValue == selectState) || selectState == "--All--";


                if (shouldShow && shouldShow2) {
                    $(this).show();
                } else {
                    $(this).hide();
                }

            });





        }
    });
    
      
     
    
   
   
});

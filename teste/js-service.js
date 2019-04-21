$(document).ready(function () {

    function throwErrorCallback(error) {
        console.log("error", error.responseJSON.code, "\n", error.responseJSON.message);
    }

    function ajaxRequest(urlBase, sucessfn) {
        $.ajax({

            url: urlBase + "?ts=1&apikey=d93dfe8054eb00fbcb5e429132d9b7ab&hash=c0de40ceda5d49863e94a86c80938b77",
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                $("#loading").html("<div class='loading-center'><h1 class='center'>Loading</h1><img src='loading.gif' width='50%'></div>");
            },
            complete: function () {
                $("#loading").html("");
            },
            success: sucessfn,
            error: throwErrorCallback


        });
    }

    /********************************
     * REQUEST LIST OF CHARACTERS
     *******************************/

    ajaxRequest("http://gateway.marvel.com/v1/public/characters", getList);

    function getList(data) {
        var result = data.data.results;
        result.forEach(function (element, index) {

            var comicsUrI = data.data.results[index].comics.collectionURI;

            

        });

        console.log(result);

        var thumb = $(".thumb");

        result.forEach(function (element, index) {
            var comics = data.data.results[index];
            var comicsName = "<h1>" + comics.name + "</h1>";
            var comicsURL = data.data.results[index].urls[0].url;

    /*************************************
    * SEARCH
    ************************************/
            $("#search-input").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                console.log(value);
                
                $(".thumb .card").filter(function() {
                  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
              });

    /*************************************
    * END OF SEARCH
    ************************************/

            var arrOfNames = [];
            arrOfNames.push(comics.name); 
            //console.log(arrOfNames);
            
            var comicsThumb =  "<a href='" + comicsURL + "' target='_blank'>"
                               + "<img class='img-info' width='85%' src='"
                               + element.thumbnail.path + "/portrait_xlarge" + ".jpg'>" + "</a>";

            thumb.append("<div class='card'>" + comicsName + comicsThumb + "</div>");

        });


    }

    /*************************************
     * REQUEST LIST OF COMICS DETAILS URL
     ************************************/


    var whatIsWrittenInSearch = $(".search-txt").val();






});



/*************************************
* REQUEST LIST OF COMICS DETAILS
*************************************/

// ajaxRequest(comicsUrI, getListOfCharComics);

// arr.forEach(function (element, index) {
        //     var content = $(".paragraph-" + index);
        //     content.append("<br><br>" + arr[index].title + "<br><br>" + arr[index].description);
        // });

        // $(".img-info").click(function () {
        //     switchCondition = true;
        //     $(".hid").css("display", "block");
        // })
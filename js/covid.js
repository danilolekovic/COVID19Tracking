let totalCases = undefined;

$.getJSON("https://corona.lmao.ninja/v2/countries/Canada", function(data) {
    totalCases = data.cases;
    $("#confirmed").html(data.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $("#deaths").html(data.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $("#recoveries").html(data.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $("#newCases").html(data.todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $("#newDeaths").html(data.todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
});

$("g").on("click", function() {
    $("g").removeClass("active");
    $(this).addClass("active");
    let date = new Date();
    let today = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString().substr(2, 2);

    let yDate = new Date(date);
    yDate.setDate(yDate.getDate() - 1);
    let yesterday = (yDate.getMonth() + 1).toString() + "/" + yDate.getDate().toString() + "/" + yDate.getFullYear().toString().substr(2, 2);

    let province = $(this).attr("id").split("_").join(" ");

    if (province == "Nunavut") {
        $("#province").html("Information for the territory of <span>Nunavut</span> is unavailable at the moment.");
        $("#province2").html("");
        $("#province3").html("");
    } else {

        $("#province").html("Today, there have been <span><img src='./img/loading.gif' alt='...'></span> reported cases and <span><img src='./img/loading.gif' alt='...'></span> deaths in <span>" + province + "</span>.");
        $("#province2").html("In total, there have been <span><img src='./img/loading.gif' alt='...'></span> cases and <span><img src='./img/loading.gif' alt='...'></span> deaths in <span>" + province + "</span>.");
        $("#province3").html("Approximately <span><img src='./img/loading.gif' alt='...'></span>% of Canada's total cases are in <span>" + province + "</span>.");    

        $.getJSON("https://corona.lmao.ninja/v2/historical/CA/" + province.split(" ").join("%20") + "?lastdays=2", function(data) {
            if (data["timeline"]["cases"][today] == undefined) {
                $("#province").html("At the moment, the numbers of COVID-19 cases or deaths in <span>" + province + "</span> are unavailable.");
                $("#province2").html("In total, there have been <span>" + data["timeline"]["cases"][yesterday].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span> cases and <span>" + data["timeline"]["deaths"][yesterday].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span> deaths in <span>" + province + "</span>.");
                $("#province3").html("Approximately " + parseFloat(data["timeline"]["cases"][yesterday] / totalCases * 100).toFixed(2) + "% of Canada's total cases are in <span>" + province + "</span>.");    
            } else {
                $("#province").html("Today, there have been <span>" + (data["timeline"]["cases"][today] - data["timeline"]["cases"][yesterday]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span> reported cases and <span>" + (data["timeline"]["deaths"][today] - data["timeline"]["deaths"][yesterday]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span> deaths in <span>" + province + "</span>.");
                $("#province2").html("In total, there have been <span>" + data["timeline"]["cases"][today].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span> cases and <span>" + data["timeline"]["cases"][today].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span> deaths in <span>" + province + "</span>.");
                $("#province3").html("Approximately " + parseFloat(data["timeline"]["cases"][today] / totalCases * 100).toFixed(2) + "% of Canada's total cases are in <span>" + province + "</span>.");    
            }
        });
    }
});

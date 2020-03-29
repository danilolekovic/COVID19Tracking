$.getJSON("https://corona.lmao.ninja/countries/Canada", function(data) {
    $("#confirmed").html(data.cases);
    $("#deaths").html(data.deaths);
    $("#recoveries").html(data.recovered);
    $("#newCases").html(data.todayCases);
    $("#newDeaths").html(data.todayDeaths);
    $("#perMillionCases").html(data.casesPerOneMillion);
});
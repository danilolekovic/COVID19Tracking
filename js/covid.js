$.getJSON("https://pomber.github.io/covid19/timeseries.json", function(data) {
    jsonToday = data.Canada[data.Canada.length - 1];
    $("#confirmed").html(jsonToday.confirmed);
    $("#deaths").html(jsonToday.deaths);
    $("#recoveries").html(jsonToday.recovered);

    jsonYesterday = data.Canada[data.Canada.length - 2];
    $("#newCases").html(jsonToday.confirmed - jsonYesterday.confirmed);
    $("#newDeaths").html(jsonToday.deaths - jsonYesterday.deaths);
    $("#newRecoveries").html(jsonToday.recovered - jsonYesterday.recovered);

    json2weeks = data.Canada[data.Canada.length - 14];
    $("#newCases2").html(jsonToday.confirmed - json2weeks.confirmed);
    $("#newDeaths2").html(jsonToday.deaths - json2weeks.deaths);
    $("#newRecoveries2").html(jsonToday.recovered - json2weeks.recovered);
});
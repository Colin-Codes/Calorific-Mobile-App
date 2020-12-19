/*global window:true*/
/*global document:true*/
/*global location:true*/
/*global localStorage:true*/
/*global selectDate:true*/
/*global alert:true*/
/*global initialise:true*/
window.onload = function () {
    /*document.getElementById("btnAction").addEventListener("click", function () {
        localStorage.setItem("state", "ADD");
        location.href = "detail.html";
    });*/
    initialise();
};

var db = window.openDatabase('Calorific', '1.0', 'Calorific database', 5 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('SELECT DISTINCT (SELECT [index].picture FROM [counter] INNER JOIN [index] ON [index].key = [counter].key WHERE [counter].date = T0.date ORDER BY IfNull([counter].qty,0) * [index].calories DESC) AS picture, T0.date, (SELECT IfNull(SUM(IfNull( [counter].qty,0) * [index].calories),0) AS calories FROM [counter] INNER JOIN [index] ON [index].key = [counter].key WHERE [counter].date = T0.date) AS calories FROM [counter] T0 INNER JOIN [index] T1 ON T0.key = T1.key ORDER BY T0.date DESC', [], function (tx, results) {
        var len = results.rows.length, List = document.getElementById("list"), i;
        for (i = 0; i < len; i = i + 1) {
            var Date = results.rows.item(i).date, Calories = results.rows.item(i).calories, Picture = results.rows.item(i).picture;
            List.innerHTML += '<div class="row"><div class="col-4"><img style="max-width: 100%; height: auto;" id="smallImage" src="' + Picture + '" /></div><div class="col-8 container"><span class="row col-12">' + Date + ', ' + Calories + ' cal.</span><div class="row"><button class="btn btn-success col-12" onclick="selectDate(\'' + Date + '\')">Select this date</button></div></div></div>';
        }
    });
});

function selectDate (date) {
    document.getElementById('datePicker').value = date;
    location.href = "counter.html";
}
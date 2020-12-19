/*global window:true*/
/*global document:true*/
/*global location:true*/
/*global localStorage:true*/
/*global initialise:true*/
/*global viewList:true*/
/*global getSelectedDate:true*/
window.onload = function () {
    initialise();
    viewList('SELECT [index].key, [index].name, [index].picture, IfNull([counter].qty,0) AS qty, [counter].date, IfNull([counter].qty,0) * [index].calories AS calories FROM [counter] INNER JOIN [index] ON [index].key = [counter].key WHERE [counter].date = ? ORDER BY IfNull([counter].qty,0) * [index].calories DESC', [getSelectedDate()]);
};

var db = window.openDatabase('Calorific', '1.0', 'Calorific database', 5 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('SELECT IfNull(SUM(IfNull( [counter].qty,0) * [index].calories),0) AS calories FROM [counter] INNER JOIN [index] ON [index].key = [counter].key WHERE [counter].date = ?', [getSelectedDate()], function (tx, results) {
        var len = results.rows.length, Title = document.getElementById("title"), i;
        for (i = 0; i < len; i = i + 1) {
            var Calories = results.rows.item(i).calories;
            Title.innerHTML += ' Total: ' + Calories + ' calories';
        }
    });
});
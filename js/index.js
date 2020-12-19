/*global window:true*/
/*global document:true*/
/*global location:true*/
/*global localStorage:true*/
/*global getSelectedDate:true*/
/*global viewList:true*/
/*global initialise:true*/
window.onload = function () {
    initialise();
    viewList('SELECT [index].key, [index].name, [index].picture, IfNull([counter].qty,0) AS qty, [counter].date, [index].calories FROM [index] LEFT OUTER JOIN [counter] ON [index].key = [counter].key AND [counter].date = ? ORDER BY [index].name', [getSelectedDate()]);
};
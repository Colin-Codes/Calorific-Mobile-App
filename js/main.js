/*global window:true*/
/*global document:true*/
/*global initialise:true*/
/*global localStorage:true*/
/*global alert:true*/
/*global alert:true*/
/*global updateIndex:true*/
/*global localStorage:true*/
/*global location:true*/
function initialise () {
    var today = new Date(), todayString = today.getFullYear(), todayMonth = (today.getMonth() < 9 ? '0' : '') + (today.getMonth()+1), todayDay = (today.getDate() < 10 ? '0' : '') + today.getDate();
    todayString = todayString + "-" + todayMonth + "-" + todayDay; 
    if (localStorage.getItem("date") === null) {
        localStorage.setItem("date", todayString);
    }
    if (localStorage.getItem("today") === null) {
        localStorage.setItem("date", todayString);
    }
    if (localStorage.getItem("today") != todayString) {
        localStorage.setItem("today", todayString);
        localStorage.setItem("date", todayString);        
    }
    document.getElementById("datePicker").value = localStorage.getItem("date");
}


window.onbeforeunload = function () {
    var date = document.getElementById("datePicker").valueAsDate, dateString = date.getFullYear(), dateMonth = (date.getMonth() < 9 ? '0' : '') + (date.getMonth()+1), dateDay = (date.getDate() < 10 ? '0' : '') + date.getDate();
    dateString = dateString + "-" + dateMonth + "-" + dateDay; 
    localStorage.setItem("date", dateString);
};

function getSelectedDate () {
    var date = document.getElementById("datePicker").valueAsDate, dateString = date.getFullYear(), dateMonth = (date.getMonth() < 9 ? '0' : '') + (date.getMonth()+1), dateDay = (date.getDate() < 10 ? '0' : '') + date.getDate();
    dateString = dateString + "-" + dateMonth + "-" + dateDay; 
    return dateString;
}

function viewList (query, Array) {
    var db = window.openDatabase('Calorific', '1.0', 'Calorific database', 5 * 1024 * 1024);
    db.transaction(function (tx) {
        //tx.executeSql('DROP TABLE [index]');
        //tx.executeSql('DROP TABLE [counter]');
        tx.executeSql('CREATE TABLE IF NOT EXISTS [index] (key  INTEGER PRIMARY KEY, name, calories, picture)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS [counter] (key, date, qty)');
        tx.executeSql(query, Array, function (tx, results) {
            var len = results.rows.length, List = document.getElementById("list"), i;
            for (i = 0; i < len; i = i + 1) {
                var Name = results.rows.item(i).name, Key = results.rows.item(i).key, Calories = results.rows.item(i).calories, Picture = results.rows.item(i).picture, Qty = results.rows.item(i).qty;
                List.innerHTML += '<div class="row"><div class="col-4"><img style="max-width: 100%; height: auto;" id="smallImage" src="' + Picture + '" /></div><div class="col-8 container"><div class="row"><div class="col-12 text-left">' + Name + '</div></div><div class="row"><div class="col-6 text-left">Qty: ' + Qty + '</div><div class="col-6 text-left">Cal: ' + Calories + '</div></div><div class="row"><button class="btn btn-success col-4" onclick="addCounter(' + Key + ')">+</button><button class="btn btn-danger col-4" onclick="subtractCounter(' + Key + ')">-</button><button class="btn btn-primary col-4" onclick="detailEdit(' + Key + ')"><span class="exotic-symbol-font"><img src="fonts/settings.png" /></span></button></div></div></div></div>';
            }
        });
    });
}

function addCounter (Key) {
    var date = getSelectedDate();
    var db = window.openDatabase('Calorific', '1.0', 'Calorific database', 5 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM [counter] WHERE key = ? AND date = ?', [Key, date], function (tx, results) {
            var len = results.rows.length;
            if (len == 0) {
                tx.executeSql('INSERT INTO [counter] (key, date, qty) VALUES (?, ?, 1)', [Key, date]);
            }
        });
        tx.executeSql('UPDATE [counter] SET qty = qty + 1 WHERE key = ? AND date = ?', [Key, date]);
    });
    location.reload();
}

function subtractCounter (Key) {
    var date = getSelectedDate();
    var db = window.openDatabase('Calorific', '1.0', 'Calorific database', 5 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM [counter] WHERE key = ? AND date = ?', [Key, date], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i = i + 1) {
                var Qty = results.rows.item(i).qty;
                if (Qty == 1) {
                    tx.executeSql('DELETE FROM [counter] WHERE key = ? AND date = ?', [Key, date]);
                }   
            }
        });
        tx.executeSql('UPDATE [counter] SET qty = qty - 1 WHERE key = ? AND date = ?', [Key, date]);
    });
    location.reload();
}

function updateIndex () {
    var Name = document.getElementById("Name").value, Calories = document.getElementById("Calories").value, Picture = document.getElementById("thumbNail").getAttribute("src");
    if (Name != "" && Calories != "") {
        var db = window.openDatabase('Calorific', '1.0', 'Calorific database', 5 * 1024 * 1024), type = localStorage.getItem('state'), Key = localStorage.getItem('key');
        db.transaction(function (tx) {
            if (type == 'EDIT') {
                tx.executeSql('UPDATE [index] SET name = ?, calories = ?, picture = ? WHERE key = ?', [Name, Calories, Picture, Key]);
                alert('Changes updated');
            }
            else {
                tx.executeSql('INSERT INTO [index](name, calories, picture) VALUES (?, ?, ?)', [Name, Calories, Picture]);
                alert('Successfully added ' + Name);
            }        
        });
    }
}

function detailAdd() {
    localStorage.setItem("state", "ADD");
    location.href = "detail.html";
}

function detailEdit(Key) {
    localStorage.setItem("state", "EDIT");    
    localStorage.setItem("key", Key);
    location.href = "detail.html";
}

function refresh() {
    location.reload();
}
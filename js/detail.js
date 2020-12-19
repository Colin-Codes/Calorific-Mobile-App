/*global window:true*/
/*global document:true*/
/*global navigator:true*/
/*global Camera:true*/
/*global initialise:true*/
/*global alert:true*/
/*global cordova:true*/
/*global localStorage:true*/
/*global FileUploadOptions:true*/
/*global FileTransfer:true*/
/*global alert:true*/
/*global location:true*/
window.onload = function () {
    initialise();
    var db = window.openDatabase('Calorific', '1.0', 'Calorific database', 5 * 1024 * 1024), type = localStorage.getItem('state'), Key = localStorage.getItem('key');
    var txtName = document.getElementById('Name'), txtCalories = document.getElementById('Calories'), imgPicture = document.getElementById('thumbNail');
    document.getElementById('detailTitle').innerHTML = type;
    db.transaction(function (tx) {
        if (type == 'EDIT') {
            tx.executeSql('SELECT * FROM [index] WHERE key = ?', [Key], function (tx, results) {
                var len = results.rows.length, i;
                for (i = 0; i < len; i = i + 1) {
                    var Name = results.rows.item(i).name, Key = results.rows.item(i).key, Calories = results.rows.item(i).calories, Picture = results.rows.item(i).picture;
                    txtName.value = Name;
                    txtCalories.value = Calories;
                    imgPicture.src = Picture;
                }
            });
        }
    });
};


        
function deleteIndex() {
    var db = window.openDatabase('Calorific', '1.0', 'Calorific database', 5 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM [index] WHERE key = ?', [localStorage.getItem('key')]);
        alert(document.getElementById("Name").value + ' deleted');
    });
    location.href = "index.html";
}
                   
                   

var pictureSource;   // picture source
var destinationType; 

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function onPhotoFileSuccess(imageData) {
    try{
    //var newFile = moveFile(imageData);
    var thumbNail = document.getElementById('thumbNail');
    thumbNail.style.display = 'block';
    thumbNail.src = imageData;
        
    }
    
      catch(e) {
          alert("Error taking picture: "+ e.message);
          return;
      }
}

function capturePhotoWithFile() {
    navigator.camera.getPicture(onPhotoFileSuccess, onFail, { quality: 10, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, correctOrientation: true });
}

function getPhoto(source) {
    navigator.camera.getPicture(onPhotoFileSuccess, onFail, { quality: 10, destinationType: destinationType.FILE_URI, sourceType: source, correctOrientation: true });
}

function onFail(message) {
    alert('Failed because: ' + message);
}
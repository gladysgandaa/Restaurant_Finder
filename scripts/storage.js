var storageRef = firebase.storage().ref();
var imagesRef = storageRef.child("images");
function previewFile() {
  var file = document.querySelector("input[type=file]").files[0];
  var metadata = {
    contentType: "image/jpeg",
  };
  var uploadTask = storageRef.child("images/" + file.name).put(file, metadata);
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log("Upload is running");
          break;
      }
    },
    function (error) {
      console.log("Upload Error");
    },
    function () {
      var starsRef = storageRef.child("images/" + file.name);
      starsRef
        .getDownloadURL()
        .then(function (url) {
          document.querySelector("#preview").src = url;
          document.getElementById("image").value = url;
          var t = document.querySelector("p");
          t.innerHTML = "<b>Firebase Storage URL: </b>" + url;
        })
        .catch(function (error) {
          console.log("Error Download File");
        });
    }
  );
}

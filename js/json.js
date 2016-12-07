(function(){
  $.getJSON( "dataset.json", function( obj ) {
    var score = 0, leftdata = [], rightdata = [];
    inittwodata()
    function inittwodata() {
      leftdata.push(obj.dataone[Math.floor(Math.random() * obj.dataone.length)]);
      leftdata.push(obj.dataone[Math.floor(Math.random() * obj.dataone.length)]);

      //load two random values to left array
      rightdata.push(obj.datatwo[Math.floor(Math.random() * obj.dataone.length)]);
      rightdata.push(obj.datatwo[Math.floor(Math.random() * obj.datatwo.length)]);

      $(".headingone").html(leftdata[leftdata.length-2].question);
      $(".infoone").html(leftdata[leftdata.length-2].hint);
      $(".moneyone").html(leftdata[leftdata.length-2].value);

      $(".headingtwo").html(rightdata[rightdata.length-2].question);
      $(".infotwo").html(rightdata[rightdata.length-2].hint);
      $(".moneytwo").html(rightdata[rightdata.length-2].value);

      $("#section1").css("background-image","url("+leftdata[leftdata.length-2].image+")");
      $("#section2").css("background-image","url("+rightdata[rightdata.length-2].image+")");

      // preload the next images
      var newImageUrl1 = leftdata[leftdata.length-1].image;
      var newImageUrl2 = rightdata[rightdata.length-1].image;
      $('.loadone').attr({src: newImageUrl1} ).load(function() {} );
      $('.loadtwo').attr({src: newImageUrl2} ).load(function() {} );
      isHighScore(score);
    }
  }
})();

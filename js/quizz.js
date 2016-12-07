$(document).ready(function() {
  $.getJSON("dataset.json", function(obj) {
    var score = 0,
      leftdata = [],
      rightdata = [];

    leftdata.push(obj.dataone[Math.floor(Math.random() * obj.dataone.length)]);
    leftdata.push(obj.dataone[Math.floor(Math.random() * obj.dataone.length)]);
    rightdata.push(obj.datatwo[Math.floor(Math.random() * obj.datatwo.length)]);
    rightdata.push(obj.datatwo[Math.floor(Math.random() * obj.datatwo.length)]);
    $(".headingone").html(leftdata[leftdata.length - 2].question);
    $(".infoone").html(leftdata[leftdata.length - 2].hint);
    $(".moneyone").html();
    $(".outstanding").css("width", leftdata[leftdata.length - 2].outstandingpercent);
    $(".received").css("width", leftdata[leftdata.length - 2].receivedpercent);
    $(".outstandingfunds").html(leftdata[leftdata.length - 2].outstandingcash);
    $(".receivedfunds").html(leftdata[leftdata.length - 2].value);
    $(".headingtwo").html(rightdata[rightdata.length - 2].question);
    $(".infotwo").html(rightdata[rightdata.length - 2].hint);
    $(".moneytwo").html();
    $("#section1").css("background-image", "url(" + leftdata[leftdata.length - 2].image + ")");
    $("#section2").css("background-image", "url(" + rightdata[rightdata.length - 2].image + ")");
    // preload the next images
    var newImageUrl1 = leftdata[leftdata.length - 1].image;
    var newImageUrl2 = rightdata[rightdata.length - 1].image;
    $('.loadone').attr({
      src: newImageUrl1
    }).load(function() {});
    $('.loadtwo').attr({
      src: newImageUrl2
    }).load(function() {});
    isHighScore(score);

    function isHighScore(score) {
      if (typeof(Storage) !== "undefined") {
        //if this value exists in local storage
        if (localStorage.highscore) {
          if (localStorage.highscore < score) {
            localStorage.highscore = score;
            $("#highscore").html(localStorage.highscore);
          } else {
            localStorage.highscore = localStorage.highscore;
            $("#highscore").html(localStorage.highscore);
          }
        } else {
          localStorage.highscore = score;
          $("#highscore").html(localStorage.highscore);
        }
      }
      // if storage is not defined
      else {
        $(".highscorebox").hide();
        $(".highscore").hide();
      }
    }

    function comparetwodata(whichbutton) {
      leftdata.push(obj.dataone[Math.floor(Math.random() * obj.dataone.length)]);
      rightdata.push(obj.datatwo[Math.floor(Math.random() * obj.datatwo.length)]);
      currentleft = leftdata.length - 2
      currentright = rightdata.length - 2
      nextleft = leftdata.length - 1
      nextright = rightdata.length - 1
      switch (whichbutton) {
        case "left":
          if (leftdata[currentleft - 1].money >= rightdata[currentright - 1].money) {
            $(".moneytwo").html(rightdata[currentright - 1].value);
            $(".moneyone").html(leftdata[currentleft - 1].value);
            $('.modal-content').css('background-color', 'green').find('.modal-text').text("CORRECT");
            $('.try-again').text('Loading next question');
            $('#myModal').modal('show');
            setTimeout(function() {
              var randNumber = Math.floor(1 + (Math.random() * 100))
              if (randNumber % 2 === 0) {
                $('.col6').css('float', 'right')
              } else {
                $('.col6').css('float', 'left')
              }
              $('#myModal').modal('hide');
              $(".headingone").html(leftdata[currentleft].question);
              $(".outstanding").css("width", leftdata[currentleft].outstandingpercent);
              $(".received").css("width", leftdata[currentleft].receivedpercent);
              $(".outstandingfunds").html(leftdata[currentleft].outstandingcash);
              $(".receivedfunds").html(leftdata[currentleft].value);
              $(".infoone").html(leftdata[currentleft].hint);
              $(".moneyone").html(leftdata[currentleft].value);
              $(".headingtwo").html(rightdata[currentright].question);
              $(".infotwo").html(rightdata[currentright].hint);
              $("#section1").css("background-image", "url(" + leftdata[currentleft].image + ")");
              $("#section2").css("background-image", "url(" + rightdata[currentright].image + ")");
              var newImageUrl1 = leftdata[nextleft].image;
              var newImageUrl2 = rightdata[nextright].image;
              $('.loadone').attr({
                src: newImageUrl1
              }).load(function() {});
              $('.loadtwo').attr({
                src: newImageUrl2
              }).load(function() {});
              //update score
              score += 1;
              $("#score").html(score);
              $(".moneytwo").html("");
              $(".moneyone").html("");
              isHighScore(score);

            }, 3000);
          } else {
            $(".moneytwo").html(rightdata[currentright - 1].value);
            $(".moneyone").html(leftdata[currentleft - 1].value);
            $('.modal-content').css('background-color', 'red').find('.modal-text').text("WRONG");
            $('.try-again').text('Please try again');
            $('#myModal').modal('show');
            setTimeout(function() {
              $('#myModal').modal('hide');
              $(".headingone").html(leftdata[currentleft].question);
              $(".infoone").html(leftdata[currentleft].hint);
              $(".outstanding").css("width", leftdata[currentleft].outstandingpercent);
              $(".received").css("width", leftdata[currentleft].receivedpercent);
              $(".outstandingfunds").html(leftdata[currentleft].outstandingcash);
              $(".receivedfunds").html(leftdata[currentleft].value);
              $(".headingtwo").html(rightdata[currentright].question);
              $(".infotwo").html(rightdata[currentright].hint);
              $("#section1").css("background-image", "url(" + leftdata[currentleft].image + ")");
              $("#section2").css("background-image", "url(" + rightdata[currentright].image + ")");
              var newImageUrl1 = leftdata[nextleft].image;
              var newImageUrl2 = rightdata[nextright].image;
              $('.loadone').attr({
                src: newImageUrl1
              }).load(function() {});
              $('.loadtwo').attr({
                src: newImageUrl2
              }).load(function() {});
              score = 0;
              $("#score").html(score);
              $(".moneytwo").html("");
              $(".moneyone").html("");
            }, 3000);
          }
          break;
        case "right":
          if (rightdata[currentright - 1].money >= leftdata[currentleft - 1].money) {
            $(".moneytwo").html(rightdata[currentright - 1].value);
            $(".moneyone").html(leftdata[currentleft - 1].value);
            $('.modal-content').css('background-color', 'green').find('.modal-text').text("CORRECT");
            $('.try-again').text('Loading next question');
            $('#myModal').modal('show');
            setTimeout(function() {
              var randNumber = Math.floor(1 + (Math.random() * 100));
              if (randNumber % 2 === 0) {
                $('#section2').css('float', 'right');
                $('#section1').css('float', 'left');
              } else {
                $('#section1').css('float', 'right');
                $('#section2').css('float', 'left')
              }
              $('#myModal').modal('hide');
              $(".headingone").html(leftdata[currentleft].question);
              $(".infoone").html(leftdata[currentleft].hint);
              $(".outstanding").css("width", leftdata[currentleft].outstandingpercent);
              $(".received").css("width", leftdata[currentleft].receivedpercent);
              $(".outstandingfunds").html(leftdata[currentleft].outstandingcash);
              $(".receivedfunds").html(leftdata[currentleft].value);
              $(".headingtwo").html(rightdata[currentright].question);
              $(".infotwo").html(rightdata[currentright].hint);
              $("#section1").css("background-image", "url(" + leftdata[currentleft].image + ")");
              $("#section2").css("background-image", "url(" + rightdata[currentright].image + ")");
              var newImageUrl1 = leftdata[nextleft].image;
              var newImageUrl2 = rightdata[nextright].image;
              $('.loadone').attr({
                src: newImageUrl1
              }).load(function() {});
              $('.loadtwo').attr({
                src: newImageUrl2
              }).load(function() {});
              //update score
              score += 1;
              $("#score").html(score);
              $(".moneytwo").html("");
              $(".moneyone").html("");
              isHighScore(score);
            }, 3000);

          } else {
            $(".moneytwo").html(rightdata[currentright - 1].value);
            $(".moneyone").html(leftdata[currentright - 1].value);
            $('.modal-content').css('background-color', 'red').find('.modal-text').text("WRONG");
            $('.try-again').text('Please try again');
            $('#myModal').modal('show');
            setTimeout(function() {
              $('#myModal').modal('hide');
              $(".headingone").html(leftdata[currentleft].question);
              $(".infoone").html(leftdata[currentleft].hint);
              $(".moneyone").html(leftdata[currentleft].value);
              $(".outstanding").css("width", leftdata[currentleft].outstandingpercent);
              $(".received").css("width", leftdata[currentleft].receivedpercent);
              $(".outstandingfunds").html(leftdata[currentleft].outstandingcash);
              $(".receivedfunds").html(leftdata[currentleft].value);
              $(".headingtwo").html(rightdata[currentright].question);
              $(".infotwo").html(rightdata[currentright].hint);
              $("#section1").css("background-image", "url(" + leftdata[currentleft].image + ")");
              $("#section2").css("background-image", "url(" + rightdata[currentright].image + ")");
              var newImageUrl1 = leftdata[nextleft].image;
              var newImageUrl2 = rightdata[nextright].image;
              $('.loadone').attr({
                src: newImageUrl1
              }).load(function() {});
              $('.loadtwo').attr({
                src: newImageUrl2
              }).load(function() {});
              score = 0;
              $("#score").html(score);
              $(".moneyone").html("");
            }, 3000);
          }
          break;
      }
    }
    $("#section1").on("click", function() {
      comparetwodata("left");
    });
    $("#section2").on("click", function() {
      comparetwodata("right");
    })
  });
});

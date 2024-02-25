$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  // for the hamburger menu on mobile
  $(".hamburger").click(function (event) {
    event.stopPropagation();
    $("#mySidenav").css("width", "250px");
  });

  $(".closebtn, #mySidenav a").click(function () {
    $("#mySidenav").css("width", "0");
  });

  $(document).click(function () {
    $("#mySidenav").css("width", "0");
  });

  $("#mySidenav").click(function (event) {
    event.stopPropagation();
  });

  // for the back to top button
  $("#home-back-to-top").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800
    );
  });

  $("#back-to-top").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800
    );
  });

  // Show/hide the FAB
  $(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
      $("#back-to-top").fadeIn();
    } else {
      $("#back-to-top").fadeOut();
    }
  });
});

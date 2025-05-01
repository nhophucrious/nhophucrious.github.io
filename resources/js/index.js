$(document).ready(function () {
    $('a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var navOffset = $('.navbar').height(); // Get the height of the navbar
    
            // Prevent the browser from scrolling when the hash changes
            var scrollPosition = $(window).scrollTop();
            window.location.hash = hash;
            $(window).scrollTop(scrollPosition);
    
            $('html, body').animate({
                scrollTop: $(hash).offset().top - navOffset // Subtract the navbar height from the scroll position
            }, 800);
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
  $(".home-back-to-top").on("click", function () {
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
  // const typed = new Typed('#typed', {
  //   strings: ['Mobile Developer', 'Flutter Developer', 'Tech Enthusiast', 'SwiftUI Apprentice'],
  //   typeSpeed: 70,
  //   loop: true,
  // });

  const typed = new Typed('#name-typed', {
    strings: ['Phuc Nguyen'],
    typeSpeed: 70,
    loop: false,
    cursorChar: '|',
    blinkSpeed: 1000,
  });
});

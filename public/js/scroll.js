// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.padding = "0px";
    document.getElementById("logo").style.fontSize = "25px";
    document.getElementById("logo-img").style.height = "30px";
    
  } else {
    document.getElementById("navbar").style.padding = "2rem 0";
    document.getElementById("logo").style.fontSize = "35px";
    document.getElementById("logo-img").style.height = "50px";
  }
}
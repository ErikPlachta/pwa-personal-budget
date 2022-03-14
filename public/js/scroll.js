// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {

  if( document.documentElement.clientWidth > 750) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("toolbar").style.top = "50px";
      // document.getElementById("logo").style.fontSize = "25px";
      document.getElementById("logo").style.fontSize = "var(--fs-600";
      document.getElementById("logo-img").style.height = "30px";
      document.getElementById("navbar").style.padding = "0px";
      // document.getElementById("navbar-right").style.display = "none";
      
    } else {
      document.getElementById("toolbar").style.top = "134px";
      document.getElementById("logo").style.fontSize = "35px";
      document.getElementById("logo-img").style.height = "50px";
      document.getElementById("navbar").style.padding = "2rem 0";
      // document.getElementById("navbar-right").style.display = "flex";
    }
  }

  else {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("navbar-right").style.display = "none";
      document.getElementById("toolbar").style.top = "50px";
      document.getElementById("logo").style.fontSize = "30px";
      document.getElementById("logo-img").style.height = "30px";
      document.getElementById("navbar").style.padding = "0px";
      
    } else {
      document.getElementById("navbar-right").style.display = "flex";
      document.getElementById("toolbar").style.top = "134px";
      document.getElementById("logo").style.fontSize = "35px";
      document.getElementById("logo-img").style.height = "50px";
      document.getElementById("navbar").style.padding = "0 0 2rem 0";
    }
  }
}
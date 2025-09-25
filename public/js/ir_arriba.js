

document.addEventListener("DOMContentLoaded", function() {
  // get a reference to our predefined button
  var scrollToTopBtn = document.querySelector(".ir-arriba");
  
  // Only initialize if button exists
  if (scrollToTopBtn) {
    document.addEventListener("scroll", handleScroll);
    scrollToTopBtn.addEventListener("click", scrollToTop);
  }
  
  function handleScroll() {
    var scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var GOLDEN_RATIO = 0.02;
  
    if ((document.documentElement.scrollTop / scrollableHeight ) > GOLDEN_RATIO) {
      //show button
      if(!scrollToTopBtn.classList.contains("showScrollBtn"))
      scrollToTopBtn.classList.add("showScrollBtn")
    } else {
      //hide button
      if(scrollToTopBtn.classList.contains("showScrollBtn"))
      scrollToTopBtn.classList.remove("showScrollBtn")
    }
  }
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
});
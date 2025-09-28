

document.addEventListener("DOMContentLoaded", function() {
  // get a reference to our predefined button
  var scrollToTopBtn = document.querySelector(".ir-arriba");
  
  // Only initialize if button exists
  if (scrollToTopBtn) {
    document.addEventListener("scroll", handleScroll);
    scrollToTopBtn.addEventListener("click", scrollToTop);
  }
  
  function handleScroll() {
    // Mostrar el botón cuando se haya scrolleado más de 300px (aproximadamente después del hero)
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollPosition > 300) {
      //show button
      if(!scrollToTopBtn.classList.contains("showScrollBtn"))
      scrollToTopBtn.classList.add("showScrollBtn")
    } else {
      //hide button
      if(scrollToTopBtn.classList.contains("showScrollBtn"))
      scrollToTopBtn.classList.remove("showScrollBtn")
    }
  }  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
});
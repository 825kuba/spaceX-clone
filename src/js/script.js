// PART 0 - SCROLLING TO TOP OF PAGE ON LOAD
//////////////////////////////////////////////

// SELECTING ELEMENTS

//SECTION 1 ELEMENT
const sectionFirst = document.querySelector('.section--first');
// BODY
const container = document.querySelector('.container');

window.addEventListener('load', () => {
  container.classList.remove('hidden');
  sectionFirst.scrollIntoView();
});

// PART 1 - SHOWING AND HIDING SIDE NAVIGATION AND PAGE OVERLAY
//////////////////////////////////////////////////

//SELECTING ELEMENTS

//HEADER
const header = document.querySelector('.header');
// SIDE NAV
const sideNav = document.querySelector('.nav-side');
// OVERLAY USED TO REVEAL LINKS IN SIDE NAV
const sideNavOverlay = document.querySelector('.nav-side__overlay');
// HAMBURGER BTN
const hamburger = document.querySelector('.hamburger');
//BAR IN HAMBURGER BTN
const hamburgerBar = document.querySelector('.bar');
// PAGE OVERLAY
const overlay = document.querySelector('.overlay');
// LOGO
const logo = document.querySelector('.logo');

// WHEN EVENT FIRES ADD OR REMOVE CLASSES ACCORDINGLY
function showSideNav() {
  if (!sideNav.classList.contains('show')) {
    sideNav.classList.add('show');
    sideNavOverlay.classList.add('hidden');
    hamburgerBar.classList.add('active');
    overlay.classList.add('show');
  } else {
    sideNav.classList.remove('show');
    sideNavOverlay.classList.remove('hidden');
    hamburgerBar.classList.remove('active');
    overlay.classList.remove('show');
  }
}
// ADD EVENT LISTENER TO HAMBURGER BUTTON
hamburger.addEventListener('click', showSideNav);
// ADD EVENT LISTENER TO SIDE NAV
sideNav.addEventListener('click', function (e) {
  e.preventDefault();
  // IF THE TARGET IS NOT A LINK IN SIDE NAV, RETURN
  if (!e.target.classList.contains('nav-side__link')) return;
  // RUN FUNCTION
  showSideNav();
});
// ADD EVENT LISTENER TO PAGE OVERLAY
overlay.addEventListener('click', showSideNav);
// ADD EVENT LISTENER TO LOGO
logo.addEventListener('click', function (e) {
  e.preventDefault();
  container.classList.add('hidden');
  location.reload();
});

// PART 2 - SHOWING HEADER ON SCROLL UP AND HIDING IT ON SCROLL DOWN
//////////////////////////////////////////////////

// SELECTING ELEMENTS

//HEADER BG
const headerBG = document.querySelector('.header-bg');

// SET CURRENT POSITION
let scroll_position = 0;

// ADD EVENT LISTENER ON SCROLL EVENT
window.addEventListener('scroll', function (e) {
  // IS THE POSITION AFTER SCROLL LOWER THEN THE PREVIOUS POSITION ? ADD HIDDEN CLASS TO HEADER AND HEADER BG
  if (document.body.getBoundingClientRect().top < scroll_position) {
    header.classList.add('hidden');
    headerBG.classList.add('hidden');
  }
  // ELSE REMOVE HIDDEN CLASS FROM HEADER AND HEADER BG
  else {
    {
      header.classList.remove('hidden');
      headerBG.classList.remove('hidden');
    }
  }
  // UPDATE THE POSITION VARIABLE
  scroll_position = document.body.getBoundingClientRect().top;
});

// MAKE HEADER BG ONLY APPEAR WHEN PAGE IS NOT ON SECTION 1

// SET OBSERVER
const sectionFirstObserver = new IntersectionObserver(
  entries => {
    const [entry] = entries;
    //IF ENTRY(SECTION 1) IS INTERSECTING SET EXTRA HIDDEN CLASS ON HEADER BG - THIS WILL MAKE IT STAY HIDDEN EVEN WHEN SCROLLING UP
    if (entry.isIntersecting) headerBG.classList.add('hidden-extra');
    // ELSE REMOVE THE EXTRA HIDDEN CLASS
    else headerBG.classList.remove('hidden-extra');
  },
  {
    threshold: 0,
  }
);
//SET OBSERVING ON SECTION 1
sectionFirstObserver.observe(sectionFirst);

// PART 3 - REVEALING ELEMENTS WHEN SCROLLING DOWN
///////////////////////////////////////////////////

// SELECTING ELEMENTS

// SMALL HEADINGS
const headingsSmall = document.querySelectorAll('.heading--small');
// HEADINGS
const headings = document.querySelectorAll('.heading');
// BUTTONS
const cta = document.querySelectorAll('.cta');

// SETTING OBSERVER ON SMALL HEADINGS
const headingsSmallObserver = new IntersectionObserver(
  (entries, observer) => {
    // GET THE CURRENT ENTRY
    const [entry] = entries;
    // IF IT ISN'T INTERSECTING RETURN
    if (!entry.isIntersecting) return;
    // WHEN IT IS INTERSECTING REMOVE THE HIDDEN CLASS AND STOP OBSERVING
    entry.target.classList.remove('hidden');
    observer.unobserve(entry.target);
  },
  {
    threshold: 0,
    rootMargin: '50px',
  }
);
// OBSERVE ALL SMALL HEADINGS AND SET HIDDEN CLASS ON THEM
headingsSmall.forEach(ele => {
  ele.classList.add('hidden');
  headingsSmallObserver.observe(ele);
});

// NEXT TWO OBSERVERS WORK THE SAME WAY HENCE NO COMMENTS

// SETTING OBSERVER ON BIG HEADINGS
const headingsObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('hidden');
    observer.unobserve(entry.target);
  },
  {
    threshold: 0,
    rootMargin: '50px',
  }
);

headings.forEach(ele => {
  ele.classList.add('hidden');
  headingsObserver.observe(ele);
});

// SETTING OBSERVER ON CTA BUTTONS
const ctaObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('hidden');
    observer.unobserve(entry.target);
  },
  {
    threshold: 0,
    rootMargin: '50px',
  }
);

cta.forEach(ele => {
  ele.classList.add('hidden');
  ctaObserver.observe(ele);
});

// PART 4 - CTA BUTTON HOVER EFFECT
///////////////////////////////////////

// FOR ALL CTA ELEMENTS
cta.forEach(ele => {
  //GET THE BACKGROUND ELEMENT
  const background = ele.querySelector('.cta-background');
  // ON MOUSE ENTER
  ele.addEventListener('mouseenter', function () {
    // MAKE THE BACKGROUND GROW FROM THE BOTTOM
    background.style.transformOrigin = 'bottom';
    background.style.transform = 'scaleY(1)';
  });
  // ON MOUSE LEAVE
  ele.addEventListener('mouseleave', function () {
    // MAKE THE BACKGROUND SHRINK TOWARDS THE TOP
    background.style.transformOrigin = 'top';
    background.style.transform = 'scaleY(0)';
  });
});

// PART 5 - TOP NAVIGATION LINKS UNDERLINE HOVER EFFECT
////////////////////////////////////////////////

// SELECTING ELEMENTS
//LINKS
const underlinedLinks = document.querySelectorAll('.underlined');

// FOR EACH LINK
underlinedLinks.forEach(link => {
  // GET THE UNDERLINE ELEMENT
  const underline = link.querySelector('.link-underline');
  // ON MOUSE ENTER
  link.addEventListener('mouseenter', function () {
    // MAKE UNDERLINE GROW FROM LEFT
    underline.style.transformOrigin = 'left';
    underline.style.transform = 'scaleX(1)';
  });
  // ON MOUSE LEAVE
  link.addEventListener('mouseleave', function () {
    // MAKE UNDERLINE SHRINK TO RIGHT
    underline.style.transformOrigin = 'right';
    underline.style.transform = 'scaleX(0)';
  });
});

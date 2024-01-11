// start setting-box
// 1-open setting box
let settingBox = document.querySelector(".setting-box");
let settingBottum = document.querySelector(".setting-box .set");

settingBottum.onclick = function () {
  if (settingBox.classList.contains("open")) {
    settingBox.classList.remove("open");
  } else {
    settingBox.classList.add("open");
  }
};
// 2- main color change
let colorList = document.querySelectorAll(".setting-box .color-list li");
let mainColor = localStorage.getItem("main-color");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  colorList.forEach((e) => {
    e.classList.remove("active");
    e.dataset.color == mainColor ? e.classList.add("active") : " ";
  });
}

colorList.forEach(function (ele) {
  ele.onclick = function (li) {
    colorList.forEach((e) => e.classList.remove("active"));
    ele.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      ele.dataset.color
    );
    localStorage.setItem("main-color", ele.dataset.color);
  };
});

// 3-background option image
let backgroundOption = document.querySelectorAll(
  ".setting-box .background-box > span"
);
let mainbackground = localStorage.getItem("background-option");
if (mainbackground !== null) {
  backgroundOption.forEach((e) => {
    e.classList.remove("active");
    e.dataset.optine == mainbackground ? e.classList.add("active") : " ";
  });
}
let backgroundTrue = true;
if (localStorage.getItem("background-option") == "no") {
  backgroundTrue = false;
}
backgroundOption.forEach(function (ele) {
  ele.onclick = function (li) {
    backgroundOption.forEach((e) => e.classList.remove("active"));
    ele.classList.add("active");
    if (ele.dataset.optine == "yes") {
      if (localStorage.getItem("background-option") == "no") {
        backgroundTrue = true;
        console.log("yes");
        backgroundRandom();
      }
    } else {
      backgroundTrue = false;
      clearInterval(backgroundIntrtval);
      console.log("no");
    }
    localStorage.setItem("background-option", ele.dataset.optine);
  };
});
// 4- bullet option
let bulletOption = document.querySelectorAll(
  ".setting-box .bullets-box > span"
);
let navBullets = document.querySelector(".nav-bullets");
let mainBullet = localStorage.getItem("bullet-option");
if (mainBullet !== null) {
  if (mainBullet == "no") {
    navBullets.style.cssText = "display: none;";
  }
  bulletOption.forEach((e) => {
    e.classList.remove("active");
    e.dataset.optine == mainBullet ? e.classList.add("active") : " ";
  });
}
bulletOption.forEach(function (ele) {
  ele.onclick = function (li) {
    bulletOption.forEach((e) => e.classList.remove("active"));
    ele.classList.add("active");
    if (ele.dataset.optine == "yes") {
      if (localStorage.getItem("bullet-option") == "no") {
        navBullets.style.cssText = "display: block;";
        console.log("yes");
      }
    } else {
      backgroundTrue = false;
      navBullets.style.cssText = "display: none;";
      console.log("no");
    }
    localStorage.setItem("bullet-option", ele.dataset.optine);
  };
});
// 5-reset option

let resetButtem = document.querySelector(".setting-box .reset-option");
resetButtem.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

// end setting-box

// start bullet section
let bullet = document.querySelectorAll(".nav-bullets .bullet");

bullet.forEach((ele) => {
  ele.addEventListener("click", () => {
    document.querySelector(`.${ele.dataset.title}`).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// end bullet section

// start header menu

let menuLinks = document.querySelector("header .links");
let menuBottum = document.querySelector("div.container > header > nav > i");

menuBottum.onclick = function () {
  if (menuLinks.classList.contains("active")) {
    menuLinks.classList.remove("active");
  } else {
    menuLinks.classList.add("active");
  }
};
// end header menu

// start landing page image rendom
let landingPage = document.querySelector(".Landing-page");
let imageArray = [
  "image/landing-01.jpg",
  "image/landing-02.jpg",
  "image/landing-03.jpg",
  "image/landing-04.jpg",
  "image/landing-05.jpg",
];
let backgroundIntrtval;
let rendem = Math.floor(Math.random() * imageArray.length);
function backgroundRandom() {
  backgroundIntrtval = setInterval(function () {
    let random = Math.floor(Math.random() * imageArray.length);
    landingPage.style.backgroundImage = `url(${imageArray[random]})`;
  }, 7000);
}
if (backgroundTrue) {
  backgroundRandom();
}

// end landing page image rendom
// skills selector

let ourSkills = document.querySelector(".skills");
let interSkills = document.querySelectorAll(".skills .skill-progress span");

window.onscroll = function () {
  let skillTop = ourSkills.offsetTop;
  // console.log(skillTop);
  let skillHeight = ourSkills.offsetHeight;
  // console.log(skillHeight);
  let pageHeight = window.innerHeight;
  // console.log(pageHeight);
  let pageTop = this.pageYOffset;
  // console.log(pageTop);
  // console.log(skillTop + skillHeight - pageHeight);

  if (pageTop >= skillTop + skillHeight - pageHeight) {
    interSkills.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
  if (pageTop < skillTop - pageHeight) {
    interSkills.forEach((e) => {
      e.style.width = "0px";
    });
  }
};

// start Popup image

let ourGallery = document.querySelectorAll(".gallery .image-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", () => {
    let popOverlay = document.createElement("div");
    popOverlay.classList.add("Popup-overlay");
    document.body.append(popOverlay);

    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");

    let popup = document.createElement("img");
    popup.src = img.src;

    popupBox.append(popup);
    popOverlay.append(popupBox);

    if (img.alt !== "") {
      let imgHeader = document.createElement("h3");

      let imgText = document.createTextNode(img.alt);

      imgHeader.appendChild(imgText);
      popupBox.prepend(imgHeader);
    }
    let closeBottum = document.createElement("spam");
    closeBottum.classList.add("close-bottum");

    let closeSign = document.createTextNode("X");
    closeBottum.append(closeSign);

    popupBox.prepend(closeBottum);
  });
});
// close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-bottum") {
    let over = document.querySelector(".Popup-overlay");
    over.remove();
  }
});


// let app = angular.module("myApp",[]);

// app.controller("myCTR",function ($scope) {
//   $scope.Skills=['html5','css3','js','python'];
// })
// Setting box

let Setting_Box = document.querySelector(".Setting_Box");
SettingBox_button = document.querySelector(".Setting_Box .icon_setting i");

SettingBox_button.onclick = function () {
  this.classList.toggle("fa-spin");
  Setting_Box.classList.toggle("open");
};
//option box

let colorsListe = document.querySelectorAll(".colorsListe li");
main_colors = localStorage.getItem("colors_option");
if (main_colors !== null) {
  document.querySelector(
    ":root"
  ).style.cssText = `--main-color : ${main_colors}`;

  // remove active

  colorsListe.forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === main_colors) {
      element.classList.add("active");
    }
  });
}
// loop colors
colorsListe.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Save on localStorage
    localStorage.setItem("colors_option", e.target.dataset.color);

    // remove active

    handelActive(e)
  });
});

//loop random backgrounds

let random_backgrounds = document.querySelectorAll(".random_backgrounds span");
let BackGround_Option = true;
let main_backgroundImage = localStorage.getItem("main_Images");

if (main_backgroundImage !== null) {
  if (main_backgroundImage === "true") {
    BackGround_Option = true;
  } else {
    BackGround_Option = false;
  }
  random_backgrounds.forEach((span) => {
    span.classList.remove("active");
  });
  if (BackGround_Option === true) {
    document.querySelector(".random_backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random_backgrounds .no").classList.add("active");
  }
}

let BackGround_Interval;

random_backgrounds.forEach((span) => {
  span.addEventListener("click", (e) => {
    // remove active

    handelActive(e)

    // play and stop random back ground

    if (e.target.dataset.random === "yes") {
      BackGround_Option = true;
      console.log(BackGround_Option);
      localStorage.setItem("main_Images", true);
      randomizeImg();
    } else {
      BackGround_Option = false;
      clearInterval(BackGround_Interval);
      console.log(BackGround_Option);
      localStorage.setItem("main_Images", false);
    }
  });
});

let showBullet = document.querySelectorAll(".showBullets span");
let bulletsContainer = document.querySelector(".bullets_content");
let localBullet = localStorage.getItem("showBullet");
let optionBullet = true ;

if (localBullet !== null) {
  showBullet.forEach(span => {
    span.classList.remove("active");
  })

  if (optionBullet === true) {
    bulletsContainer.style.display = "block" ;

    document.querySelector(".showBullets .yes").classList.add("active");
  
  }else {
    bulletsContainer.style.display = "none" ;

    document.querySelector(".showBullets .no").classList.add("active");
  }

}

showBullet.forEach((span) => {
  span.addEventListener("click", (e) => {

    if (e.target.dataset.show === "yes") {
      bulletsContainer.style.display = "block" ;
      localStorage.setItem("showBullet" , true)
      optionBullet === true
    }else {
      bulletsContainer.style.display = "none" ;
      localStorage.setItem("showBullet" , false)
      optionBullet === false
    }

    handelActive(e);
  });
});


let Mood =document.querySelectorAll(".Setting_Box .OptionBox .mood span");
Mood.forEach(mood => {
  mood.addEventListener('click', (e) => {
    if (e.target.dataset.mood === "light") {
      document.querySelector(":root").style.cssText = ` 
      --back-color: #fff ;
      --main-color : ${main_colors};`
      console.log ('light');
    }if (e.target.dataset.mood === "dark") {
      document.querySelector(":root").style.cssText = `
      --back-color: #242424 ;
      --main-color : ${main_colors};`
    }

    handelActive(e);
  })
})


let LandingPage = document.querySelector(".LandingPage");
ImgsArray = [
  "../images/1.jpg",
  "../images/2.jpg",
  "../images/3.jpg",
  "../images/4.jpg",
];

function randomizeImg() {
  // console.log(BackGround_Option);
  if (BackGround_Option === true) {
    BackGround_Interval = setInterval(() => {
      let RandomNumber = Math.floor(Math.random() * ImgsArray.length);
      LandingPage.style.backgroundImage = `url(${ImgsArray[RandomNumber]})`;
    }, 10000);
  }
}

randomizeImg();

// animation skills


let OurSkills = document.querySelector(".Skills_Box");

window.onscroll = function () {
  let sKillsOffsetTop = OurSkills.offsetTop;
  // console.log(sKillsOffsetTop)
  let sKillsOuterHeight = OurSkills.offsetHeight;
  // console.log(sKillsOuterHeight)

  let windowHeight = this.innerHeight;
  // console.log(windowHeight)

  let windowScrollTop = this.pageYOffset;
  // console.log(windowScrollTop)
  let calculate = sKillsOffsetTop + sKillsOuterHeight - windowHeight;

  let allSkills = document.querySelectorAll(".Skill .Progress_Skill span");
  allSkills.forEach((skill) => {
    if (windowScrollTop > calculate) {
      skill.style.width = skill.dataset.progress;
    } else {
      skill.style.width = "0";
    }
  });
};

//create poppup box

let gallery_img = document.querySelectorAll(".gallery .gallery_Box img");

gallery_img.forEach((imge) => {
  imge.addEventListener("click", (e) => {
    let overlay = document.querySelector(".popup_gallery");
    overlay.style.display = "block";

    document.querySelector(".popup_img img").src = imge.src;
    document.querySelector(".popup_img").style.display = "block";
  });
});
document.querySelector(".close_popup").onclick = function () {
  document.querySelector(".popup_img").style.display = "none";

  document.querySelector(".popup_gallery").style.display = "none";
};
document.querySelector(".popup_gallery").onclick = function () {
  document.querySelector(".popup_img").style.display = "none";

  document.querySelector(".popup_gallery").style.display = "none";
};

function handelActive (ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  ev.target.classList.add("active");
}

document.querySelector(".reset_button").onclick = function () {

  localStorage.clear();

  window.location.reload();
}

document.querySelector(".HeaderArea .menu").onclick = function () {
    document.querySelector(".HeaderArea .links").classList.toggle("set");
}

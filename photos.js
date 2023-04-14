/*   Hung Nguyen - Assignment 4 */

"use strict"; // interpret document contents in JavaScript strict mode

let leftBtn = document.getElementById("leftarrow");
let rightBtn = document.getElementById("rightarrow");
let loadBtn = document.getElementById("reloadButton");
let image = document.getElementById("image");
let currentImgIndex = 0;
let imageList = [];
let imgTotal = imageList.length;
let waitTime = "";
let controlBtn = document.getElementById("startStop");
let control = document.getElementById("control");
let title = document.getElementById("title");

let fetchImage = () => {
  fetch("proxy.php")
    .then((res) => {
      if (res.ok) {
        return res.text();
      } else {
        return "Unable to connect to server.";
      }
    })
    .then((data) => {
      imageList = JSON.parse(data).ImageList;
      const d = new Date();
      const time = d.toLocaleTimeString();
      const day = d.toLocaleDateString();
      document.getElementById("updateDate").innerText =
        "Last Update: " + time + " " + day;

      imgTotal = imageList.length;
      currentImgIndex = 0;
      title.innerText = imageList[currentImgIndex].name.slice(7);
      image.src = imageList[currentImgIndex].name;
      if (control.innerText === "On") {
        autoSlide();
      }
    })
    .catch((err) => console.log("Unable to load image" + err));
};

document.body.onload = () => {
  fetchImage();
};
loadBtn.onclick = () => {
  clearInterval(waitTime);
  fetchImage();
};

rightBtn.onclick = () => {
  clearInterval(waitTime);
  if (currentImgIndex === imgTotal - 1) {
    currentImgIndex = 0;
  } else {
    currentImgIndex += 1;
  }
  image.src = imageList[currentImgIndex].name;
  title.innerText = imageList[currentImgIndex].name.slice(7);
  if (control.innerText === "On") {
    autoSlide();
  }
};

leftBtn.onclick = () => {
  clearInterval(waitTime);
  if (currentImgIndex === 0) {
    currentImgIndex = imgTotal - 1;
  } else {
    currentImgIndex -= 1;
  }
  image.src = imageList[currentImgIndex].name;
  title.innerText = imageList[currentImgIndex].name.slice(7);
  if (control.innerText === "On") {
    autoSlide();
  }
};

let autoSlide = () => {
  waitTime = setInterval(() => {
    if (currentImgIndex === imgTotal - 1) {
      currentImgIndex = 0;
    } else {
      currentImgIndex += 1;
    }
    image.src = imageList[currentImgIndex].name;
    title.innerText = imageList[currentImgIndex].name.slice(7);
  }, imageList[currentImgIndex].time);
};

controlBtn.onclick = () => {
  if (control.innerText === "On") {
    control.innerText = "Off";
    clearInterval(waitTime);
  } else {
    control.innerText = "On";
    autoSlide();
  }
};

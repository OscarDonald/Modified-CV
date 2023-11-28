// Function for main page

async function getIndexText() {
  const response = await fetch("data.json");

  if (response.ok) {
    const indexData = await response.json();
    console.log(indexData); // Controls if the data loads correctly

    // Create const for paragraph
    const indexBox = document.getElementById("indexBox");

    // Add the text
    const paragraphText = document.getElementById("indexParagraph");
    paragraphText.innerHTML = indexData.index.paragraph;
    indexBox.appendChild(paragraphText);
  } else {
    console.log("Error: ", response.status);
  }
}

getIndexText();

// Function for education
async function getEducation() {
  const response = await fetch("data.json");

  if (response.ok) {
    const data = await response.json();
    console.log(data); // Controls if the data loads correctly

    const kbssBox = document.getElementById("kbssBox");
    const volvoBox = document.getElementById("volvoBox");
    const educationBox = document.getElementById("educationBox");

    // Add text for workAtKBSS
    const kbssText = document.createElement("p");
    kbssText.innerHTML = data.education.workAtKBSS;
    kbssBox.appendChild(kbssText);

    // Add text for workAtVolvoCars
    const volvoText = document.createElement("p");
    volvoText.innerHTML = data.education.workAtVolvoCars;
    volvoBox.appendChild(volvoText);

    // Add text for educationBox
    // Creates a loop for not repeating code
    for (let i = 1; i <= 3; i++) {
      const educationText = document.createElement("li");
      educationText.innerHTML = data.education["myEducation" + i];
      educationBox.appendChild(educationText);
    }
  } else {
    console.log("Error:", response.status);
  }
}

getEducation();

window.addEventListener("load", () => {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light");
  }
  // Gets the themeSelector id
  const themeSelector = document.querySelector("#themeSelector");
  const body = document.body;

  // Creating a const which reads which HTML page I'm on
  const currentPage = document.body.id;

  // Sets the default class based on the current index page
  const defaultClass = currentPage === "body-index" ? "dark-index" : "dark";

  // Makes the page darkmode
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add(defaultClass);
    themeSelector.textContent = "Light mode ☀️";
  } else {
    themeSelector.textContent = "Dark mode🌙️";
  }

  // Makes the pages light mode
  themeSelector.addEventListener("click", () => {
    if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
      themeSelector.textContent = "Light mode ☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeSelector.textContent = "Dark mode🌙️";
    }

    // Toggle the default class based on the current page
    body.classList.toggle(defaultClass);

    // Set the background image only if on the index page
    if (currentPage === "body-index") {
      const backgroundImage =
        localStorage.getItem("theme") === "dark"
          ? 'url("images/background-darkmode.jpeg")'
          : 'url("images/background.jpeg")';
      body.style.backgroundImage = backgroundImage;
    }
  });
});

// https://codepen.io/strangerintheq/pen/QWmPzja

let w, h;
const ctx = canvas.getContext("2d");
const { sin, cos, PI, hypot, min, max } = Math;

function spawn() {
  const pts = many(333, () => {
    return {
      x: rnd(innerWidth),
      y: rnd(innerHeight),
      len: 0,
      r: 0,
    };
  });

  const pts2 = many(9, (i) => {
    return {
      x: cos((i / 9) * PI * 2),
      y: sin((i / 9) * PI * 2),
    };
  });

  let seed = rnd(100);
  let tx = rnd(innerWidth);
  let ty = rnd(innerHeight);
  let x = rnd(innerWidth);
  let y = rnd(innerHeight);
  let kx = rnd(0.5, 0.5);
  let ky = rnd(0.5, 0.5);
  let walkRadius = pt(rnd(50, 50), rnd(50, 50));
  let r = innerWidth / rnd(100, 150);

  function paintPt(pt) {
    pts2.forEach((pt2) => {
      if (!pt.len) return;
      drawLine(
        lerp(x + pt2.x * r, pt.x, pt.len * pt.len),
        lerp(y + pt2.y * r, pt.y, pt.len * pt.len),
        x + pt2.x * r,
        y + pt2.y * r
      );
    });
    drawCircle(pt.x, pt.y, pt.r);
  }

  return {
    follow(x, y) {
      tx = x;
      ty = y;
    },

    tick(t) {
      const selfMoveX = cos(t * kx + seed) * walkRadius.x;
      const selfMoveY = sin(t * ky + seed) * walkRadius.y;
      let fx = tx + selfMoveX;
      let fy = ty + selfMoveY;

      x += min(innerWidth / 100, (fx - x) / 10);
      y += min(innerWidth / 100, (fy - y) / 10);

      let i = 0;
      pts.forEach((pt) => {
        const dx = pt.x - x,
          dy = pt.y - y;
        const len = hypot(dx, dy);
        let r = min(2, innerWidth / len / 5);
        pt.t = 0;
        const increasing = len < innerWidth / 10 && i++ < 8;
        let dir = increasing ? 0.1 : -0.1;
        if (increasing) {
          r *= 1.5;
        }
        pt.r = r;
        pt.len = max(0, min(pt.len + dir, 1));
        paintPt(pt);
      });
    },
  };
}

const spiders = many(2, spawn);

addEventListener("pointermove", (e) => {
  spiders.forEach((spider) => {
    spider.follow(e.clientX, e.clientY);
  });
});

requestAnimationFrame(function anim(t) {
  if (w !== innerWidth) w = canvas.width = innerWidth;
  if (h !== innerHeight) h = canvas.height = innerHeight;
  ctx.fillStyle = "#000";
  drawCircle(0, 0, w * 10);
  ctx.fillStyle = ctx.strokeStyle = "#fff";
  t /= 1000;
  spiders.forEach((spider) => spider.tick(t));
  requestAnimationFrame(anim);
});

function recalc(X, Y) {
  tx = X;
  ty = Y;
}

function rnd(x = 1, dx = 0) {
  return Math.random() * x + dx;
}

function drawCircle(x, y, r, color) {
  //console.log(x,y,r)
  // ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, 0, 0, PI * 2);
  ctx.fill();
}

function drawLine(x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);

  many(100, (i) => {
    i = (i + 1) / 100;
    let x = lerp(x0, x1, i);
    let y = lerp(y0, y1, i);
    let k = noise(x / 5 + x0, y / 5 + y0) * 2;
    ctx.lineTo(x + k, y + k);
  });

  ctx.stroke();
}

function many(n, f) {
  return [...Array(n)].map((_, i) => f(i));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function noise(x, y, t = 101) {
  let w0 = sin(0.3 * x + 1.4 * t + 2.0 + 2.5 * sin(0.4 * y + -1.3 * t + 1.0));
  let w1 = sin(0.2 * y + 1.5 * t + 2.8 + 2.3 * sin(0.5 * x + -1.2 * t + 0.5));
  return w0 + w1;
}

function pt(x, y) {
  return { x, y };
}

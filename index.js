let RESIZE_TIMEOUT;
let SCROLL_TIMEOUT;
let DEBUG = true;
let DEFERRED_SCRIPTS = []
let PAPER_PATH_ID = "paper-trajectory"
let DASHED_PATH_ID = "dashed-plane-path";

function drawPaperTrajector() {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.position = "absolute";
  svg.style.top = 0;
  svg.style.left = 0;
  svg.setAttribute("height", document.body.getBoundingClientRect().height + "px");
  svg.setAttribute("width", document.body.getBoundingClientRect().width + "px");
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let plane = document.querySelector("#plane");
  let paragraphs = document.querySelectorAll(".paragraph");

  document.body.insertBefore(svg, document.body.firstChild);

  path.id = DASHED_PATH_ID;
  path.setAttribute("stroke-width", "4");
  path.setAttribute("d", createPlanePath().path);
  path.setAttribute("stroke", "var(--paper-trajectory-color)");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-linecap", "round")
  svg.appendChild(path);

  path = path.cloneNode();
  path.id = PAPER_PATH_ID;
  path.setAttribute("stroke-width", "5")
  path.setAttribute("stroke", "var(--background-color)");
  let length = path.getTotalLength();
  path.setAttribute("style", `stroke-dashoffset:${Math.round(length * getScrollPercentage(document.body) / 100)};stroke-dasharray:${Math.max(100, length)}`)
  svg.appendChild(path);

}


function createPlanePath() {
  let plane = document.querySelector("#plane");
  let paragraphs = Array.apply(null, document.querySelectorAll(".section-title")).reverse();
  let contactmeButton = document.querySelector("#contactMe");
  let title = document.querySelector('.title');
  let svgBuilder = new SVGBuilder();
  let planeRect = plane.getBoundingClientRect();
  let contactmeButtonRect = contactmeButton.getBoundingClientRect();
  svgBuilder.moveTo([contactmeButtonRect.x + window.pageXOffset + contactmeButtonRect.width / 2, contactmeButtonRect.top + window.pageYOffset + contactmeButtonRect.height / 2]);
  let center;
  for (let i = 0; i < paragraphs.length; i++) {
    center = findCenter(paragraphs[i]);
    svgBuilder.lineTo(center)
  }
  svgBuilder.lineTo(findCenter(title))
  svgBuilder.lineTo([planeRect.x + window.pageXOffset - 10, planeRect.top + window.pageYOffset - 10])
  return svgBuilder;
}

function getScrollPercentage() {
  var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

function findCenter(element){
  let elRect = element.getBoundingClientRect();
  return [elRect.x + window.pageXOffset + elRect.width/2, elRect.top + window.pageYOffset + elRect.height/2];
}

window.oncontextmenu = function() {
  alert("click");
  return false;
}

window.onload = function() {
  // LOAD OPTIONAL SCRIPTS
  //  in this way the page will load faster also on older browser
  let script;
  for (let uri of DEFERRED_SCRIPTS) {
    script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = uri;
    document.body.appendChild(script);
  }
  drawPaperTrajector();
}

window.onclick = function(event) {
  if (DEBUG) {
    console.log(event.pageX, event.pageY);
  }
}

window.onscroll = function() {
  if (SCROLL_TIMEOUT) {
    clearTimeout(SCROLL_TIMEOUT);
    SCROLL_TIMEOUT = undefined;
  }
  setTimeout(function() {
    let perc = getScrollPercentage(document.body);
    let path = document.querySelector(`#${PAPER_PATH_ID}`)
    let length = path.getTotalLength();
    path.setAttribute("style", `stroke-dashoffset:${length * perc / 100 };stroke-dasharray:${length}`);
    // path.style.strokeDashoffset = "" + Math.round(length * perc / 100);
  }, 100);
}

window.onresize = function() {

  document.querySelector('svg').remove();
  drawPaperTrajector();
}

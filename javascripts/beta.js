/*
 *  Name: Yusdesign Kuler Feed Javascript Processing
 *  License: CC-NC-ND 3.0 Unported
 */
var utistor, cnv, img, cntnr, gesso;
var cW, cH, rc, bg, d, sclr, tinge;
var bugs = [], rival, distances = [], maxDistance, spacer;

// Yusdesign jQuery Kuler Feed
jQuery.noConflict();
(function(a){a(function(){a("body").addClass("yusdesign");var g,d,h,k,l,e,m,c,f;a.ajax({type:"GET",url:"https://kuler-api.adobe.com/rss/search.cfm?searchQuery=userID:102986&itemsPerPage=50&key=5F8FD294DC6015C63AEF97E329246996",dataType:"xml"}).done(function(b){b.error||(b=a(b).find("item"),a.each(b,function(b,n){g=a(this);d=g[0];h=d.getElementsByTagNameNS("http://kuler.adobe.com/kuler/API/rss/","themeID")[0].valueOf().innerHTML.toString();k=d.getElementsByTagNameNS("http://kuler.adobe.com/kuler/API/rss/","themeTitle")[0].valueOf().innerHTML.toString();
m="http://color.adobe.com/themeID/"+h;e=a('<div id="quartz'+b+'"></div>').addClass("tinge");c=a('<div id="title'+b+'"></div>').addClass("tetra");f=a("<a>").attr("href",m).addClass("tange");f.append(a("<span>").text(k).addClass("titre"));c.append(f);l=d.getElementsByTagNameNS("http://kuler.adobe.com/kuler/API/rss/","swatch");a.each(l,function(b,d){var c=a(this)[0].getElementsByTagNameNS("http://kuler.adobe.com/kuler/API/rss/","swatchHexColor")[0].valueOf().innerHTML.toString();e.append(a("<div>").css("background-color",
"#"+c).addClass("scalar"))});c.append(e);a("div#kulerfeed").append(c)}))})})})(jQuery);

var $$ = jQuery.noConflict();
(function ($$) {
  $$(function () {
    console.log($$.fn.jquery);
  });
})(jQuery);

// Processing
function preload() {
  gesso = select('#gesso');
  createDiv('').id('cntnr').parent(gesso);
  cntnr = select('#cntnr');
  cntnr.class('cntnr').class('gesso');
  cntnrSize();
}
function setup() {
  cnv = createCanvas(cW, cH);
  cnv.style('visibility', 'visible').class('cnv').id('cnv').parent(cntnr);
  maxDistance = dist(cW / 2, cH / 2, cW, cH);
  for (var x = 0; x < cW; x++) {
    distances[x] = [];
    for (var y = 0; y < cH; y++) {
      var distance = dist(cW / 2, cH / 2, x, y);
      distances[x][y] = distance / maxDistance * 255;
    }
  }
  for (var i=0; i<50; i++) {
    rival = random(-8,8);
    bugs.push(new Jitter());
  }
  spacer = 8;
  //noLoop();
  frameRate(12);
}
function draw() {
  rc = color(utistor());
  bg = color(utistor());
  img = createImage(8, 8);
  img.loadPixels();
  d = pixelDensity();
  sclr = 4 * (d ^ 2) * img.width * img.height;
  //print(sclr);
  for (var i = 0; i < sclr; i += 4) {
    img.pixels[i] = red(rc);
    img.pixels[i + 1] = green(rc);
    img.pixels[i + 2] = blue(rc);
    img.pixels[i + 3] = alpha(rc);
  }
  img.updatePixels();
  for (var x = 0; x < cW; x += spacer) {
    for (var y = 0; y < cH; y += spacer) {
      //stroke(distances[x][y]);
      image(img, x + spacer / 2, y + spacer / 2, distances[x][y]);
      //
      //point( x + spacer/2, y + spacer/2 );
    }
  }  //background( bg );
  for (var i=0; i<bugs.length; i++) {
    bugs[i].rival = randomGaussian(8);
    bugs[i].move();
    bugs[i].display();
  }
  line(mouseX, mouseY, pmouseX, pmouseY);
  //print(pmouseX + " -> " + mouseX);
}
function mousePressed() {
  redraw();
}
function windowResized() {
  resizeCanvas(cW, cH);
}
function utistor() {
  var r, g, b, a;
  r = randomGaussian(255);
  g = randomGaussian(255);
  b = randomGaussian(255);
  a = 1; // randomGaussian(0);
  return color(r, g, b, a);
}
function cntnrSize() {
  cH = cntnr.height;
  cW = cntnr.width;
  return cH, cW;
}
function mouseWheel(event) {
  redraw();
  print(event.delta);
  rival += event.delta;
  //return bugs.rival;
  //return false;
}
// Jitter class
function Jitter(rival) {
  this.x = random(width);
  this.y = random(height);
  this.dia = random(10, 30);
  this.rival = rival;
  this.velox = function(rival) {
    this.rival += random(-this.rival, this.rival);
  };
  this.move = function() {
    this.x += random(-this.velox, this.velox) + this.rival;
    this.y += random(-this.velox, this.velox) + this.rival;
  };
  this.display = function() {
    ellipse(this.x, this.y, this.dia, this.dia);
  };
}

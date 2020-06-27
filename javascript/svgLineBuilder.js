SVGBuilder = function() {
  this.lastPoint = [];
  this.path = "";
}

SVGBuilder.prototype.lineTo = function(point) {
  this.path += ` L${point[0]}, ${point[1]}`
  this.lastPoint = point;
}

SVGBuilder.prototype.moveTo = function(point) {
  this.path += ` M${point[0]} ${point[1]}`
  this.lastPoint = point;
}

SVGBuilder.prototype.CubicBezier = function(point, ctrlPoint1, ctrlPoint2) {
  this.path += ` C${ctrlPoint1[0]} ${ctrlPoint1[1]} ${ctrlPoint2[0]} ${ctrlPoint2[1]} ${point[0]} ${point[1]}`;
  this.lastpoint = point;
}

SVGBuilder.prototype.quadraticBezier = function(point1, point2) {
  this.path += ` Q${point2[0]} ${point2[0]} ${point1[0]} ${point1[1]}`;
  this.lastPoint = point2;
}

SVGBuilder.prototype.planeCurveWithBeforeAndAfter = function(beforePoint, afterPoint, intersection) {
  this.lineTo(intersection);
  this.CubicBezier(intersection, symmetry(beforePoint, intersection), symmetry(afterPoint, intersection));
  this.lineTo(afterPoint);
}

SVGBuilder.prototype.curvedLine = function(beforePoint, afterPoint, curvature = 10) {
  // TODO: creae a function to draw the Bezier with 2 points
}

function symmetry(firstPoint, middlePoint) {
  return [2 * middlePoint[0] - firstPoint[0], 2 * middlePoint[1] - firstPoint[1]]
}

function center(point1, point2) {
  return [(point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2]
}


window.SVGBuilder = SVGBuilder;

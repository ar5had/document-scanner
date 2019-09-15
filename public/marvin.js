function MarvinColorModelConverter() {}
function MarvinImage(t, e, i) {
  ;(this.image = null),
    (this.canvas = null),
    (this.ctx = null),
    (this.data = null),
    (this.colorModel = null == i ? MarvinImage.COLOR_MODEL_RGB : i),
    null != t && this.create(t, e),
    i == MarvinImage.COLOR_MODEL_BINARY && (this.arrBinaryColor = new Array(t * e))
}
function MarvinImageMask(t, e) {
  ;(this.width = t),
    (this.height = e),
    (this.arrMask = 0 != t && 0 != e ? MarvinJSUtils.createMatrix2D(width, height) : null)
}
function MarvinSegment(t, e, i, r) {
  ;(this.x1 = t),
    (this.x2 = i),
    (this.y1 = e),
    (this.y2 = r),
    -1 != t &&
      -1 != e &&
      -1 != i &&
      -1 != r &&
      ((this.width = i - t + 1), (this.height = r - e + 1), (this.area = this.width * this.height))
}
function MarvinColor(t, e, i) {
  return (this.red = t), (this.green = e), (this.blue = i), this
}
;(MarvinColorModelConverter.rgbToBinary = function(t, e) {
  for (
    var i = new MarvinImage(t.getWidth(), t.getHeight(), MarvinImage.COLOR_MODEL_BINARY), r = 0;
    r < t.getHeight();
    r++
  )
    for (var n = 0; n < t.getWidth(); n++) {
      Math.ceil(
        0.3 * t.getIntComponent0(n, r) +
          0.59 * t.getIntComponent1(n, r) +
          0.11 * t.getIntComponent2(n, r)
      ) <= e
        ? i.setBinaryColor(n, r, !0)
        : i.setBinaryColor(n, r, !1)
    }
  return i
}),
  (MarvinColorModelConverter.binaryToRgb = function(t) {
    for (
      var e = new MarvinImage(t.getWidth(), t.getHeight(), MarvinImage.COLOR_MODEL_RGB), i = 0;
      i < t.getHeight();
      i++
    )
      for (var r = 0; r < t.getWidth(); r++)
        t.getBinaryColor(r, i)
          ? e.setIntColor(r, i, 255, 0, 0, 0)
          : e.setIntColor(r, i, 255, 255, 255, 255)
    return e
  }),
  (MarvinColorModelConverter.rgbToHsv = function(t) {
    for (var e, i, r, n = new Array(3 * t.length), o = 0; o < t.length; o++) {
      ;(e = (16711680 & t[o]) >>> 16),
        (i = (65280 & t[o]) >>> 8),
        (r = 255 & t[o]),
        (e /= 255),
        (i /= 255),
        (r /= 255)
      var a,
        s,
        h,
        l = Math.max(Math.max(e, i), r),
        g = l - Math.min(Math.min(e, i), r)
      ;(a =
        0 != g
          ? l == e
            ? r <= i
              ? ((i - r) / g) * 60
              : ((i - r) / g) * 60 + 360
            : l == i
            ? ((r - e) / g) * 60 + 120
            : ((e - i) / g) * 60 + 240
          : 0),
        (h = l),
        (s = 0 != g ? g / h : 0),
        (n[3 * o] = a),
        (n[3 * o + 1] = s),
        (n[3 * o + 2] = h)
    }
    return n
  }),
  (MarvinColorModelConverter.hsvToRgb = function(t) {
    for (var e = new Array(t.length / 3), i = 0, r = 0; i < t.length; i += 3, r++) {
      var n = t[i],
        o = t[i + 1],
        a = t[i + 2],
        s = Math.ceil((n / 60) % 6),
        h = n / 60 - s,
        l = a * (1 - o),
        g = a * (1 - h * o),
        u = a * (1 - (1 - h) * o),
        p = 0,
        M = 0,
        c = 0
      switch (Math.ceil(s)) {
        case 0:
          ;(p = Math.ceil(255 * a)), (M = Math.ceil(255 * u)), (c = Math.ceil(255 * l))
          break
        case 1:
          ;(p = Math.ceil(255 * g)), (M = Math.ceil(255 * a)), (c = Math.ceil(255 * l))
          break
        case 2:
          ;(p = Math.ceil(255 * l)), (M = Math.ceil(255 * a)), (c = Math.ceil(255 * u))
          break
        case 3:
          ;(p = Math.ceil(255 * l)), (M = Math.ceil(255 * g)), (c = Math.ceil(255 * a))
          break
        case 4:
          ;(p = Math.ceil(255 * u)), (M = Math.ceil(255 * l)), (c = Math.ceil(255 * a))
          break
        case 5:
          ;(p = Math.ceil(255 * a)), (M = Math.ceil(255 * l)), (c = Math.ceil(255 * g))
      }
      e[r] = 4278190080 + (p << 16) + (M << 8) + c
    }
    return e
  }),
  (MarvinImage.COLOR_MODEL_RGB = 0),
  (MarvinImage.COLOR_MODEL_BINARY = 1),
  (MarvinImage.prototype.create = function(t, e) {
    ;(this.canvas = document.createElement('canvas')),
      (this.canvas.width = t),
      (this.canvas.height = e),
      (this.ctx = this.canvas.getContext('2d')),
      (this.imageData = this.ctx.getImageData(0, 0, t, e)),
      (this.width = t),
      (this.height = e)
  }),
  (MarvinImage.prototype.setDimension = function(t, e) {
    this.create(t, e)
  }),
  (MarvinImage.prototype.load = function(t, e) {
    ;(this.onload = e), (this.image = new Image())
    var i = this
    ;(this.image.onload = function() {
      i.callbackImageLoaded(i)
    }),
      (this.image.crossOrigin = 'anonymous'),
      (this.image.src = t)
  }),
  (MarvinImage.prototype.callbackImageLoaded = function(t) {
    ;(t.width = t.image.width),
      (t.height = t.image.height),
      (t.canvas = document.createElement('canvas')),
      (t.canvas.width = t.image.width),
      (t.canvas.height = t.image.height),
      (t.ctx = t.canvas.getContext('2d')),
      t.ctx.drawImage(t.image, 0, 0),
      (this.imageData = t.ctx.getImageData(0, 0, t.getWidth(), t.getHeight())),
      null != t.onload && t.onload()
  }),
  (MarvinImage.prototype.clone = function() {
    var t = new MarvinImage(this.getWidth(), this.getHeight(), this.colorModel)
    return MarvinImage.copyColorArray(this, t), t
  }),
  (MarvinImage.prototype.update = function(t) {
    this.canvas.getContext('2d').putImageData(this.imageData, 0, 0)
  }),
  (MarvinImage.prototype.clear = function(t) {
    for (var e = 0; e < this.getHeight(); e++)
      for (var i = 0; i < this.getWidth(); i++) this.setIntColor(i, e, t)
  }),
  (MarvinImage.prototype.getColorModel = function() {
    return this.colorModel
  }),
  (MarvinImage.prototype.getAlphaComponent = function(t, e) {
    var i = 4 * (e * this.getWidth() + t)
    return this.imageData.data[3 + i]
  }),
  (MarvinImage.prototype.setAlphaComponent = function(t, e, i) {
    var r = 4 * (e * this.getWidth() + t)
    this.imageData.data[3 + r] = i
  }),
  (MarvinImage.prototype.getIntComponent0 = function(t, e) {
    var i = 4 * (e * this.getWidth() + t)
    return this.imageData.data[i]
  }),
  (MarvinImage.prototype.getIntComponent1 = function(t, e) {
    var i = 4 * (e * this.getWidth() + t)
    return this.imageData.data[1 + i]
  }),
  (MarvinImage.prototype.getIntComponent2 = function(t, e) {
    var i = 4 * (e * this.getWidth() + t)
    return this.imageData.data[2 + i]
  }),
  (MarvinImage.prototype.setIntColor = function(t, e, i, r, n, o) {
    null == r
      ? this.setIntColor1(t, e, i)
      : null == n && null == o
      ? this.setIntColor2(t, e, i, r)
      : null == o
      ? this.setIntColor3(t, e, i, r, n)
      : this.setIntColor4(t, e, i, r, n, o)
  }),
  (MarvinImage.prototype.getIntColor = function(t, e) {
    var i = 4 * (e * this.getWidth() + t)
    return (
      4294967296 +
      (this.imageData.data[3 + i] << 24) +
      (this.imageData.data[i] << 16) +
      (this.imageData.data[1 + i] << 8) +
      this.imageData.data[2 + i]
    )
  }),
  (MarvinImage.prototype.setIntColor1 = function(t, e, i) {
    var r = (4278190080 & i) >>> 24,
      n = (16711680 & i) >> 16,
      o = (65280 & i) >> 8,
      a = 255 & i
    this.setIntColor4(t, e, r, n, o, a)
  }),
  (MarvinImage.prototype.setBinaryColor = function(t, e, i) {
    var r = e * this.getWidth() + t
    this.arrBinaryColor[r] = i
  }),
  (MarvinImage.prototype.getBinaryColor = function(t, e) {
    var i = e * this.getWidth() + t
    return this.arrBinaryColor[i]
  }),
  (MarvinImage.copyColorArray = function(t, e) {
    if (t.getColorModel() == e.getColorModel())
      switch (t.getColorModel()) {
        case MarvinImage.COLOR_MODEL_RGB:
          for (var i = 0; i < t.imageData.data.length; i++)
            e.imageData.data[i] = t.imageData.data[i]
          break
        case MarvinImage.COLOR_MODEL_BINARY:
          for (i = 0; i < t.arrBinaryColor.length; i++) e.arrBinaryColor[i] = t.arrBinaryColor[i]
      }
  }),
  (MarvinImage.prototype.drawRect = function(t, e, i, r, n) {
    for (var o = t; o < t + i; o++) this.setIntColor(o, e, n), this.setIntColor(o, e + (r - 1), n)
    for (o = e; o < e + r; o++) this.setIntColor(t, o, n), this.setIntColor(t + (i - 1), o, n)
  }),
  (MarvinImage.prototype.fillRect = function(t, e, i, r, n) {
    for (var o = t; o < t + i; o++)
      for (var a = e; a < e + r; a++)
        o < this.getWidth() && a < this.getHeight() && this.setIntColor(o, a, n)
  }),
  (MarvinImage.prototype.setColorToAlpha = function(t, e) {
    for (var i = 0; i < this.height; i++)
      for (var r = 0; r < this.width; r++)
        (16777215 & this.getIntColor(r, i)) == (16777215 & t) && this.setAlphaComponent(r, i, e)
  }),
  (MarvinImage.prototype.setAlphaToColor = function(t) {
    for (var e = 0; e < this.height; e++)
      for (var i = 0; i < this.width; i++)
        0 == this.getAlphaComponent(i, e) && this.setIntColor(i, e, 4294967295)
  }),
  (MarvinImage.prototype.setIntColor2 = function(t, e, i, r) {
    var n = (16711680 & r) >> 16,
      o = (65280 & r) >> 8,
      a = 255 & r
    this.setIntColor4(t, e, i, n, o, a)
  }),
  (MarvinImage.prototype.setIntColor3 = function(t, e, i, r, n) {
    this.setIntColor4(t, e, 255, i, r, n)
  }),
  (MarvinImage.prototype.setIntColor4 = function(t, e, i, r, n, o) {
    var a = 4 * (e * this.getWidth() + t)
    ;(this.imageData.data[a] = r),
      (this.imageData.data[1 + a] = n),
      (this.imageData.data[2 + a] = o),
      (this.imageData.data[3 + a] = i)
  }),
  (MarvinImage.prototype.getWidth = function() {
    return this.width
  }),
  (MarvinImage.prototype.getHeight = function() {
    return this.height
  }),
  (MarvinImage.prototype.isValidPosition = function(t, e) {
    return 0 <= t && t < this.width && 0 <= e && e < this.height
  }),
  (MarvinImage.prototype.draw = function(t, e, i, r) {
    null == e && (e = 0),
      null == i && (i = 0),
      t.getContext('2d').putImageData(this.imageData, e, i)
  }),
  (MarvinImage.prototype.toBlob = function() {
    return this.update(), MarvinImage.dataURItoBlob(this.canvas.toDataURL('image/png'))
  }),
  (MarvinImage.dataURItoBlob = function(t) {
    var e
    e = 0 <= t.split(',')[0].indexOf('base64') ? atob(t.split(',')[1]) : unescape(t.split(',')[1])
    for (
      var i = t
          .split(',')[0]
          .split(':')[1]
          .split(';')[0],
        r = new Uint8Array(e.length),
        n = 0;
      n < e.length;
      n++
    )
      r[n] = e.charCodeAt(n)
    return new Blob([r], { type: i })
  }),
  (MarvinImageMask.prototype.getWidth = function() {
    return this.width
  }),
  (MarvinImageMask.prototype.getHeight = function() {
    return this.height
  }),
  (MarvinImageMask.prototype.addPixel = function(t, e) {
    this.arrMask[t][e] = !0
  }),
  (MarvinImageMask.prototype.removePixel = function(t, e) {
    this.arrMask[t][e] = !1
  }),
  (MarvinImageMask.prototype.clear = function() {
    if (null != this.arrMask)
      for (var t = 0; t < height; t++) for (var e = 0; e < width; e++) this.arrMask[e][t] = !1
  }),
  (MarvinImageMask.prototype.getMask = function() {
    return this.arrMask
  }),
  (MarvinImageMask.prototype.addRectRegion = function(t, e, i, r) {
    for (var n = t; n < t + i; n++) for (var o = e; o < e + r; o++) this.arrMask[n][o] = !0
  }),
  (MarvinImageMask.createNullMask = function() {
    return new MarvinImageMask(0, 0)
  }),
  (MarvinImageMask.NULL_MASK = MarvinImageMask.createNullMask()),
  (MarvinSegment.segmentMinDistance = function(t, e) {
    for (var i, r, n = 0; n < t.size() - 1; n++)
      for (var o = n + 1; o < t.size(); o++)
        (i = t[n]),
          (r = t[o]),
          MarvinMath.euclidianDistance(
            (i.x1 + i.x2) / 2,
            (i.y1 + i.y2) / 2,
            (r.x1 + r.x2) / 2,
            (r.y1 + r.y2) / 2
          ) < e && (t.splice(o, 1), o--)
  }),
  (MarvinColor.prototype.setId = function(t) {
    this.id = t
  }),
  (MarvinColor.prototype.getId = function() {
    return this.id
  }),
  (MarvinColor.prototype.setName = function(t) {
    this.name = t
  }),
  (MarvinColor.prototype.getName = function() {
    return this.name
  })
var MarvinJSUtils = new Object()
;(MarvinJSUtils.createMatrix2D = function(t, e, i) {
  for (var r = new Array(t), n = 0; n < r.length; n++) (r[n] = new Array(e)), r[n].fill(i)
  return r
}),
  (MarvinJSUtils.createMatrix3D = function(t, e, i, r) {
    for (var n = new Array(t), o = 0; o < n.length; o++) {
      n[o] = new Array(e)
      for (var a = 0; a < n[o].length; a++) (n[o][a] = new Array(i)), n[o][a].fill(r)
    }
    return n
  }),
  (MarvinJSUtils.createMatrix4D = function(t, e, i, r, n) {
    for (var o = new Array(t), a = 0; a < o.length; a++) {
      o[a] = new Array(e)
      for (var s = 0; s < o[a].length; s++) {
        o[a][s] = new Array(i)
        for (var h = 0; h < o[a][s].length; h++) (o[a][s][h] = new Array(r)), o[a][s][h].fill(n)
      }
    }
    return o
  })
var MarvinMath = new Object()
function DetermineFixedCameraBackground() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function DetermineSceneBackground() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function GaussianBlur() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function AlphaBoundary() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function AverageColor() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function BlackAndWhite() {
  MarvinAbstractImagePlugin.super(this), (this.MAX_RLEVEL = 0.03), this.load()
}
function BrightnessAndContrast() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function ColorChannel() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Emboss() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function GrayScale() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Invert() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Sepia() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Thresholding() {
  MarvinAbstractImagePlugin.super(this),
    this.load(),
    (this.threshold = null),
    (this.thresholdRange = null),
    (this.neighborhood = null),
    (this.range = null)
}
function ThresholdingNeighborhood() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function CombineByAlpha() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function MergePhotos() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Convolution() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Moravec() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Prewitt() {
  MarvinAbstractImagePlugin.super(this),
    (this.matrixPrewittX = [[1, 0, -1], [1, 0, -1], [1, 0, -1]]),
    (this.matrixPrewittY = [[1, 1, 1], [0, 0, 0], [-1, -1, -1]]),
    this.load()
}
function BoundaryFill() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function ErrorDiffusion() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
;(MarvinMath.getTrueMatrix = function(t, e) {
  for (var i = MarvinJSUtils.createMatrix2D(t, e), r = 0; r < t; r++)
    for (var n = 0; n < e; n++) i[r][n] = !0
  return i
}),
  (MarvinMath.scaleMatrix = function(t, e) {
    for (var i = MarvinJSUtils.createMatrix2D(t.length, t.length), r = 0; r < t.length; r++)
      for (var n = 0; n < t.length; n++) i[r][n] = t[r][n] * e
    return i
  }),
  (MarvinMath.euclideanDistance = function(t, e, i, r, n, o) {
    return null != o
      ? MarvinMath.euclideanDistance3D(t, e, i, r, n, o)
      : MarvinMath.euclideanDistance3D(t, e, i, r)
  }),
  (MarvinMath.euclideanDistance2D = function(t, e, i, r) {
    var n = t - i,
      o = e - r
    return Math.sqrt(n * n + o * o)
  }),
  (MarvinMath.euclideanDistance3D = function(t, e, i, r, n, o) {
    var a = t - r,
      s = e - n,
      h = i - o
    return Math.sqrt(a * a + s * s + h * h)
  }),
  (DetermineFixedCameraBackground.prototype.load = function() {
    this.initialized = !1
  }),
  (DetermineFixedCameraBackground.prototype.initialize = function(t) {
    ;(this.weights = this.weights = MarvinJSUtils.createMatrix4D(
      t.getWidth(),
      t.getHeight(),
      3,
      26,
      0
    )),
      (initialized = !0)
  }),
  (DetermineFixedCameraBackground.prototype.process = function(t, e, i, r, n) {
    this.initialized || this.initialize(t)
    for (var o = 0; o < t.getHeight(); o++)
      for (var a = 0; a < t.getWidth(); a++) {
        var s = t.getIntComponent0(a, o),
          h = t.getIntComponent1(a, o),
          l = t.getIntComponent2(a, o)
        weights[a][o][0][s / 10]++,
          weights[a][o][1][h / 10]++,
          weights[a][o][2][l / 10]++,
          e.setIntColor(
            a,
            o,
            255,
            this.getProbableColor(weights[a][o][0]),
            this.getProbableColor(weights[a][o][1]),
            this.getProbableColor(weights[a][o][2])
          )
      }
  }),
  (DetermineFixedCameraBackground.prototype.getProbableColor = function(t) {
    for (var e = -1, i = 0, r = 0; r < t.length; r++) (-1 == e || t[r] > e) && ((e = t[r]), (i = r))
    return 10 * i
  }),
  (DetermineSceneBackground.prototype.load = function() {
    this.setAttribute('threshold', 30)
  }),
  (DetermineSceneBackground.prototype.process = function(t, e) {
    for (var i = this.getAttribute('threshold'), r = t[0], n = 0; n < r.getHeight(); n++)
      for (var o = 0; o < r.getWidth(); o++)
        e.setIntColor(o, n, this.getBackgroundPixel(o, n, t, i))
  }),
  (DetermineSceneBackground.prototype.getBackgroundPixel = function(t, e, i, r) {
    var n = new Array()
    for (var o in i) {
      var a = i[o],
        s = new Array(4)
      if (
        ((s[0] = a.getIntComponent0(t, e)),
        (s[1] = a.getIntComponent1(t, e)),
        (s[2] = a.getIntComponent2(t, e)),
        (s[3] = 0) == n.length)
      )
        n.push(s)
      else {
        var h = !1
        for (var l in n) {
          var g = n[l]
          if (
            Math.abs(g[0] - s[0]) < 0.3 * r &&
            Math.abs(g[1] - s[1]) < 0.3 * r &&
            Math.abs(g[2] - s[2]) < 0.3 * r
          ) {
            ;(g[0] = Math.floor((g[0] + s[0]) / 2)),
              (g[1] = Math.floor((g[1] + s[1]) / 2)),
              (g[2] = Math.floor((g[2] + s[2]) / 2)),
              g[3]++,
              (h = !0)
            break
          }
        }
        h || n.push(s)
      }
    }
    var u = -1,
      p = 0
    for (g = null, o = 0; o < n.length; o++)
      (g = n[o]), (-1 == u || g[3] > u) && ((u = g[3]), (p = o))
    return 4278190080 + ((g = n[p])[0] << 16) + (g[1] << 8) + g[2]
  }),
  (GaussianBlur.prototype.load = function() {
    ;(this.RED = 0),
      (this.GREEN = 1),
      (this.BLUE = 2),
      (this.kernelMatrix = null),
      (this.resultMatrix = null),
      (this.appiledkernelMatrix = null),
      (this.radius = null),
      this.setAttribute('radius', 3)
  }),
  (GaussianBlur.prototype.process = function(t, e, i, r, n) {
    this.radius = this.getAttribute('radius')
    var o,
      a = t.getWidth(),
      s = t.getHeight()
    ;(this.kernelMatrix = this.getGaussianKernel()),
      (this.resultMatrix = MarvinJSUtils.createMatrix3D(a, s, 3, 0)),
      (this.appiledkernelMatrix = MarvinJSUtils.createMatrix2D(a, s, 0))
    for (var h = r.getMask(), l = 0; l < a; l++)
      for (var g = 0; g < s; g++)
        (null != h && !h[l][g]) || ((o = t.getIntColor(l, g)), this.applyKernel(l, g, o, e))
    for (l = 0; l < a; l++)
      for (g = 0; g < s; g++)
        (null != h && !h[l][g]) ||
          ((this.resultMatrix[l][g][this.RED] =
            (this.resultMatrix[l][g][0] / this.appiledkernelMatrix[l][g]) % 256),
          (this.resultMatrix[l][g][this.GREEN] =
            (this.resultMatrix[l][g][1] / this.appiledkernelMatrix[l][g]) % 256),
          (this.resultMatrix[l][g][this.BLUE] =
            (this.resultMatrix[l][g][2] / this.appiledkernelMatrix[l][g]) % 256),
          e.setIntColor(
            l,
            g,
            t.getAlphaComponent(l, g),
            Math.floor(this.resultMatrix[l][g][0]),
            Math.floor(this.resultMatrix[l][g][1]),
            Math.floor(this.resultMatrix[l][g][2])
          ))
  }),
  (GaussianBlur.prototype.getGaussianKernel = function() {
    for (
      var t,
        e,
        i,
        r = MarvinJSUtils.createMatrix2D(2 * this.radius + 1, 2 * this.radius + 1),
        n = this.radius / 3,
        o = 1;
      o <= 2 * this.radius + 1;
      o++
    )
      for (var a = 1; a <= 2 * this.radius + 1; a++)
        (e = Math.abs(o - (this.radius + 1))),
          (i = Math.abs(a - (this.radius + 1))),
          (t = Math.sqrt(e * e + i * i)),
          (r[a - 1][o - 1] = (1 / (2 * Math.PI * n * n)) * Math.exp((-t * t) / (2 * n * n)))
    return r
  }),
  (GaussianBlur.prototype.applyKernel = function(t, e, i, r) {
    for (var n = e; n < e + 2 * this.radius; n++)
      for (var o = t; o < t + 2 * this.radius; o++)
        0 <= o - this.radius &&
          o - this.radius < r.getWidth() &&
          0 <= n - this.radius &&
          n - this.radius < r.getHeight() &&
          ((this.resultMatrix[o - this.radius][n - this.radius][this.RED] +=
            ((16711680 & i) >>> 16) * this.kernelMatrix[o - t][n - e]),
          (this.resultMatrix[o - this.radius][n - this.radius][this.GREEN] +=
            ((65280 & i) >>> 8) * this.kernelMatrix[o - t][n - e]),
          (this.resultMatrix[o - this.radius][n - this.radius][this.BLUE] +=
            (255 & i) * this.kernelMatrix[o - t][n - e]),
          (this.appiledkernelMatrix[o - this.radius][n - this.radius] += this.kernelMatrix[o - t][
            n - e
          ]))
  }),
  (AlphaBoundary.prototype.load = function() {
    this.setAttribute('radius', 5)
  }),
  (AlphaBoundary.prototype.process = function(t, e, i, r, n) {
    for (var o = this.getAttribute('radius'), a = 0; a < e.getHeight(); a++)
      for (var s = 0; s < e.getWidth(); s++) this.alphaRadius(e, s, a, o)
  }),
  (AlphaBoundary.prototype.alphaRadius = function(t, e, i, r) {
    for (
      var n, o = t.getAlphaComponent(e, i), a = 0, s = 0, h = Math.floor(r / 2), l = i - h;
      l < i + h;
      l++
    )
      for (var g = e - h; g < e + h; g++)
        0 <= g &&
          g < t.getWidth() &&
          0 <= l &&
          l < t.getHeight() &&
          ((a += t.getAlphaComponent(g, l)), s++)
    ;(n = Math.floor(a / s)) < o && t.setAlphaComponent(e, i, n)
  }),
  (AverageColor.prototype.load = function() {}),
  (AverageColor.prototype.process = function(t, e, i, r, n) {
    for (var o = 0, a = 0, s = 0, h = 0; h < t.getWidth(); h++)
      for (var l = 0; l < t.getHeight(); l++)
        (o += t.getIntComponent0(h, l)),
          (a += t.getIntComponent1(h, l)),
          (s += t.getIntComponent2(h, l))
    var g = t.getWidth() * t.getHeight()
    ;(o = Math.round(o / g)),
      (a = Math.round(a / g)),
      (s = Math.round(s / g)),
      null != i && i.set('averageColor', [o, a, s])
  }),
  (BlackAndWhite.prototype.load = function() {
    ;(this.grayScale = new GrayScale()), this.setAttribute('level', 10)
  }),
  (BlackAndWhite.prototype.process = function(t, e, i, r, n) {
    this.grayScale.process(t, e)
    for (
      var o, a = this.getAttribute('level'), s = (a / 100) * this.MAX_RLEVEL, h = 0, l = 0;
      l < e.getHeight();
      l++
    )
      for (var g = 0; g < e.getWidth(); g++)
        (o =
          (o = t.getIntComponent0(g, l)) <= 127
            ? Math.max(o * (1 - (127 - o) * s), 0)
            : Math.min(o * (1 + (o - 127) * s), 255)),
          h++ < 1 &&
            (console.log('gray:' + o), console.log('level:' + a), console.log('rlevel:' + s)),
          e.setIntColor(g, l, 255, Math.floor(o), Math.floor(o), Math.floor(o))
  }),
  (BrightnessAndContrast.prototype.load = function() {
    this.setAttribute('brightness', 0), this.setAttribute('contrast', 0)
  }),
  (BrightnessAndContrast.prototype.process = function(t, e, i, r, n) {
    var o,
      a,
      s,
      h = this.getAttribute('brightness'),
      l = this.getAttribute('contrast')
    l = Math.pow((127 + l) / 127, 2)
    for (var g = 0; g < t.getWidth(); g++)
      for (var u = 0; u < t.getHeight(); u++)
        (o = t.getIntComponent0(g, u)),
          (a = t.getIntComponent1(g, u)),
          (s = t.getIntComponent2(g, u)),
          (o += (1 - o / 255) * h) < 0 && (o = 0),
          255 < o && (o = 255),
          (a += (1 - a / 255) * h) < 0 && (a = 0),
          255 < a && (a = 255),
          (s += (1 - s / 255) * h) < 0 && (s = 0),
          255 < s && (s = 255),
          e.setIntColor(
            g,
            u,
            t.getAlphaComponent(g, u),
            Math.floor(o),
            Math.floor(a),
            Math.floor(s)
          )
    for (g = 0; g < t.getWidth(); g++)
      for (u = 0; u < t.getHeight(); u++)
        (o = e.getIntComponent0(g, u)),
          (a = e.getIntComponent1(g, u)),
          (s = e.getIntComponent2(g, u)),
          (o /= 255),
          (o -= 0.5),
          (o *= l),
          (o += 0.5),
          (a /= 255),
          (a -= 0.5),
          (a *= l),
          (a += 0.5),
          (s /= 255),
          (s -= 0.5),
          (s *= l),
          (s += 0.5),
          (o *= 255) < 0 && (o = 0),
          255 < o && (o = 255),
          (a *= 255) < 0 && (a = 0),
          255 < a && (a = 255),
          (s *= 255) < 0 && (s = 0),
          255 < s && (s = 255),
          e.setIntColor(
            g,
            u,
            t.getAlphaComponent(g, u),
            Math.floor(o),
            Math.floor(a),
            Math.floor(s)
          )
  }),
  (ColorChannel.prototype.load = function() {
    this.setAttribute('red', 0), this.setAttribute('green', 0), this.setAttribute('blue', 0)
  }),
  (ColorChannel.prototype.process = function(t, e, i, r, n) {
    var o,
      a,
      s,
      h = this.getAttribute('red'),
      l = this.getAttribute('green'),
      g = this.getAttribute('blue'),
      u = 1 + Math.abs((h / 100) * 2.5),
      p = 1 + Math.abs((l / 100) * 2.5),
      M = 1 + Math.abs((g / 100) * 2.5)
    ;(u = 0 < h ? u : 1 / u), (p = 0 < l ? p : 1 / p), (M = 0 < g ? M : 1 / M)
    for (var c = 0; c < t.getHeight(); c++)
      for (var v = 0; v < t.getWidth(); v++)
        (o = t.getIntComponent0(v, c)),
          (a = t.getIntComponent1(v, c)),
          (s = t.getIntComponent2(v, c)),
          (o = Math.min(o * u, 255)),
          (a = Math.min(a * p, 255)),
          (s = Math.min(s * M, 255)),
          e.setIntColor(v, c, 255, o, a, s)
  }),
  (Emboss.prototype.load = function() {}),
  (Emboss.prototype.process = function(t, e, i, r, n) {
    for (var o = r.getMask(), a = 0; a < t.getWidth(); a++)
      for (var s = 0; s < t.getHeight(); s++)
        if (null == o || o[a][s]) {
          var h = 0,
            l = 0,
            g = 0
          g =
            0 < s && 0 < a
              ? ((h = t.getIntComponent0(a, s) - t.getIntComponent0(a - 1, s - 1)),
                (l = t.getIntComponent1(a, s) - t.getIntComponent1(a - 1, s - 1)),
                t.getIntComponent2(a, s) - t.getIntComponent2(a - 1, s - 1))
              : (l = h = 0)
          var u = h
          Math.abs(l) > Math.abs(u) && (u = l), Math.abs(g) > Math.abs(u) && (u = g)
          var p = Math.max(Math.min(128 + u, 255), 0)
          e.setIntColor(a, s, 255, p, p, p)
        } else e.setIntColor(a, s, 255, t.getIntColor(a, s))
  }),
  (GrayScale.prototype.load = function() {}),
  (GrayScale.prototype.process = function(t, e, i, r, n) {
    var o, a, s, h, l
    null != r && (o = r.getMask())
    for (var g = 0; g < t.getWidth(); g++)
      for (var u = 0; u < t.getHeight(); u++)
        (null != o && !o[g][u]) ||
          ((a = t.getIntComponent0(g, u)),
          (s = t.getIntComponent1(g, u)),
          (h = t.getIntComponent2(g, u)),
          (l = Math.ceil(0.3 * a + 0.59 * s + 0.11 * h)),
          e.setIntColor(g, u, t.getAlphaComponent(g, u), l, l, l))
  }),
  (Invert.prototype.load = function() {}),
  (Invert.prototype.process = function(t, e, i, r, n) {
    for (var o, a, s, h = r.getMask(), l = 0; l < t.getWidth(); l++)
      for (var g = 0; g < t.getHeight(); g++)
        (null != h && !h[l][g]) ||
          ((o = 255 - t.getIntComponent0(l, g)),
          (a = 255 - t.getIntComponent1(l, g)),
          (s = 255 - t.getIntComponent2(l, g)),
          e.setIntColor(l, g, t.getAlphaComponent(l, g), o, a, s))
  }),
  (Sepia.prototype.load = function() {
    this.setAttribute('txtValue', '20'), this.setAttribute('intensity', 20)
  }),
  (Sepia.prototype.process = function(t, e, i, r, n) {
    var o, a, s, h
    h = this.getAttribute('intensity')
    t.getWidth(), t.getHeight()
    for (var l = r.getMask(), g = 0; g < t.getWidth(); g++)
      for (var u = 0; u < t.getHeight(); u++)
        (null != l && !l[g][u]) ||
          ((o = a = s =
            ((o = t.getIntComponent0(g, u)) +
              (a = t.getIntComponent1(g, u)) +
              (s = t.getIntComponent2(g, u))) /
            3),
          (o = this.truncate(o + 2 * h)),
          (a = this.truncate(a + h)),
          e.setIntColor(g, u, t.getAlphaComponent(g, u), o, a, s))
  }),
  (Sepia.prototype.truncate = function(t) {
    return t < 0 ? 0 : 255 < t ? 255 : t
  }),
  (Thresholding.prototype.load = function() {
    this.setAttribute('threshold', 125),
      this.setAttribute('thresholdRange', -1),
      this.setAttribute('neighborhood', -1),
      this.setAttribute('range', -1),
      (this.pluginGray = new GrayScale())
  }),
  (Thresholding.prototype.process = function(t, e, i, r, n) {
    ;(this.threshold = this.getAttribute('threshold')),
      (this.thresholdRange = this.getAttribute('thresholdRange')),
      (this.neighborhood = this.getAttribute('neighborhood')),
      (this.range = this.getAttribute('range')),
      -1 == this.thresholdRange && (this.thresholdRange = 255 - threshold),
      this.pluginGray.process(t, e, i, r, n)
    var o = r.getMask()
    ;-1 == this.neighborhood && -1 == this.range
      ? this.hardThreshold(t, e, o)
      : this.contrastThreshold(t, e)
  }),
  (Thresholding.prototype.hardThreshold = function(t, e, i) {
    for (var r = 0; r < t.getHeight(); r++)
      for (var n = 0; n < t.getWidth(); n++)
        if (null == i || i[n][r]) {
          var o = t.getIntComponent0(n, r)
          o < this.threshold || o > this.threshold + this.thresholdRange
            ? e.setIntColor(n, r, t.getAlphaComponent(n, r), 0, 0, 0)
            : e.setIntColor(n, r, t.getAlphaComponent(n, r), 255, 255, 255)
        }
  }),
  (Thresholding.prototype.contrastThreshold = function(t, e) {
    this.range = 1
    for (var i = 0; i < t.getWidth(); i++)
      for (var r = 0; r < t.getHeight(); r++)
        checkNeighbors(i, r, neighborhood, neighborhood, t)
          ? e.setIntColor(i, r, 0, 0, 0)
          : e.setIntColor(i, r, 255, 255, 255)
  }),
  (Thresholding.prototype.checkNeighbors = function(t, e, i, r, n) {
    var o,
      a = 0
    o = n.getIntComponent0(t, e)
    for (var s = 0 - i; s <= i; s++)
      for (var h = 0 - r; h <= r; h++)
        (0 == s && 0 == h) ||
          (o < getSafeColor(t + s, e + h, n) - range && -1 != getSafeColor(t + s, e + h, n) && a++)
    return i * r * 0.5 < a
  }),
  (Thresholding.prototype.getSafeColor = function(t, e, i) {
    return 0 <= t && t < i.getWidth() && 0 <= e && e < i.getHeight() ? i.getIntComponent0(t, e) : -1
  }),
  (ThresholdingNeighborhood.prototype.load = function() {
    this.setAttribute('neighborhoodSide', 10),
      this.setAttribute('samplingPixelDistance', 1),
      this.setAttribute('thresholdPercentageOfAverage', 1)
  }),
  (ThresholdingNeighborhood.prototype.process = function(t, e, i, r, n) {
    for (
      var o = this.getAttribute('neighborhoodSide'),
        a = this.getAttribute('samplingPixelDistance'),
        s = this.getAttribute('thresholdPercentageOfAverage'),
        h = 0;
      h < t.getHeight();
      h++
    )
      for (var l = 0; l < t.getWidth(); l++) this.theshold(t, e, l, h, s, o, a)
  }),
  (ThresholdingNeighborhood.prototype.theshold = function(t, e, i, r, n, o, a) {
    for (var s = -1, h = -1, l = 0, g = 0, u = a, p = r - o / 2; p < r + (u + o / 2); p += u)
      for (var M = i - o / 2; M < i + o / 2; M += u)
        if (0 <= M && 0 <= p && M < t.getWidth() && p < t.getHeight()) {
          var c = t.getIntComponent0(M, p)
          ;(-1 == s || c < s) && (s = c), (-1 == h || h < c) && (h = c), (g += c), l++
        }
    ;(g /= l),
      (c = t.getIntComponent0(i, r)) < g * n || h - s <= 30
        ? e.setIntColor(i, r, 255, 0, 0, 0)
        : e.setIntColor(i, r, 255, 255, 255, 255)
  }),
  (CombineByAlpha.prototype.load = function() {
    this.setAttribute('x', 0), this.setAttribute('y', 0), this.setAttribute('imageOther', null)
  }),
  (CombineByAlpha.prototype.process = function(t, e, i, r, n) {
    var o = this.getAttribute('imageOther'),
      a = this.getAttribute('x'),
      s = this.getAttribute('y')
    if (null != o)
      for (var h = 0; h < t.getHeight(); h++)
        for (var l = 0; l < t.getWidth(); l++) {
          var g = l - a,
            u = h - s
          if (0 <= g && g < o.getWidth() && 0 <= u && u < o.getHeight()) {
            var p = o.getAlphaComponent(g, u)
            if (0 != p) {
              var M = p / 255,
                c = t.getIntComponent0(l, h),
                v = t.getIntComponent1(l, h),
                d = t.getIntComponent2(l, h),
                f = o.getIntComponent0(g, u),
                m = o.getIntComponent1(g, u),
                b = o.getIntComponent2(g, u),
                A = Math.floor(c * (1 - M) + f * M),
                y = Math.floor(v * (1 - M) + m * M),
                I = Math.floor(d * (1 - M) + b * M)
              e.setIntColor(l, h, Math.max(t.getAlphaComponent(a, s), p), A, y, I)
            } else e.setIntColor(l, h, t.getIntColor(l, h))
          } else e.setIntColor(l, h, t.getIntColor(l, h))
        }
  }),
  (MergePhotos.prototype.load = function() {
    ;(this.background = new DetermineSceneBackground()),
      this.background.load(),
      this.setAttribute('threshold', 30)
  }),
  (MergePhotos.prototype.process = function(t, e) {
    if (0 < t.length) {
      var i = this.getAttribute('threshold')
      this.background.setAttribute('threshold', i)
      var r = t[0].clone()
      this.background.process(t, r), MarvinImage.copyColorArray(r, e), this.mergePhotos(t, e, r, i)
    }
  }),
  (MergePhotos.prototype.mergePhotos = function(t, e, i, r) {
    for (var n in t) {
      var o = t[n]
      this.mergePhotosSingle(o, e, i, r)
    }
  }),
  (MergePhotos.prototype.mergePhotosSingle = function(t, e, i, r) {
    for (var n, o, a, s, h, l, g = 0; g < t.getHeight(); g++)
      for (var u = 0; u < t.getWidth(); u++)
        (n = t.getIntComponent0(u, g)),
          (o = t.getIntComponent1(u, g)),
          (a = t.getIntComponent2(u, g)),
          (s = i.getIntComponent0(u, g)),
          (h = i.getIntComponent1(u, g)),
          (l = i.getIntComponent2(u, g)),
          (Math.abs(n - s) > r || Math.abs(o - h) > r || Math.abs(a - l) > r) &&
            e.setIntColor(u, g, 255, n, o, a)
  }),
  (Convolution.prototype.load = function() {
    this.setAttribute('matrix', null)
  }),
  (Convolution.prototype.process = function(t, e, i, r, n) {
    var o = this.getAttribute('matrix')
    if (null != o && 0 < o.length)
      for (var a = 0; a < t.getHeight(); a++)
        for (var s = 0; s < t.getWidth(); s++)
          a >= o.length / 2 &&
          a < t.getHeight() - o.length / 2 &&
          s >= o[0].length / 2 &&
          s < t.getWidth() - o[0].length / 2
            ? this.applyMatrix(s, a, o, t, e)
            : e.setIntColor(s, a, 4278190080)
  }),
  (Convolution.prototype.applyMatrix = function(t, e, i, r, n) {
    for (
      var o,
        a,
        s = 0,
        h = 0,
        l = 0,
        g = Math.ceil(i[0].length / 2),
        u = Math.ceil(i.length / 2),
        p = 0;
      p < i.length;
      p++
    )
      for (var M = 0; M < i[0].length; M++)
        0 != i[p][M] &&
          ((a = e + (p - u)),
          0 <= (o = t + (M - g)) &&
            o < n.getWidth() &&
            0 <= a &&
            a < n.getHeight() &&
            ((s += i[p][M] * r.getIntComponent0(o, a)),
            (h += i[p][M] * r.getIntComponent1(o, a)),
            (l += i[p][M] * r.getIntComponent2(o, a))))
    ;(s = Math.abs(s)),
      (h = Math.abs(h)),
      (l = Math.abs(l)),
      (s += n.getIntComponent0(t, e)),
      (h += n.getIntComponent1(t, e)),
      (l += n.getIntComponent2(t, e)),
      (s = Math.min(s, 255)),
      (h = Math.min(h, 255)),
      (l = Math.min(l, 255)),
      (s = Math.max(s, 0)),
      (h = Math.max(h, 0)),
      (l = Math.max(l, 0)),
      n.setIntColor(t, e, r.getAlphaComponent(t, e), Math.floor(s), Math.floor(h), Math.floor(l))
  }),
  (Moravec.prototype.load = function() {
    this.setAttribute('matrixSize', 3), this.setAttribute('threshold', 0)
  }),
  (Moravec.prototype.process = function(t, e, i, r, n) {
    var o = this.getAttribute('matrixSize'),
      a = this.getAttribute('threshold'),
      s = new MarvinImage(t.getWidth(), t.getHeight())
    Marvin.grayScale(t, s)
    for (
      var h = MarvinJSUtils.createMatrix2D(s.getWidth(), s.getHeight(), 0),
        l = MarvinJSUtils.createMatrix2D(s.getWidth(), s.getHeight(), 0),
        g = 0;
      g < s.getHeight();
      g++
    )
      for (var u = 0; u < s.getWidth(); u++)
        (h[u][g] = this.c(u, g, o, s)), h[u][g] < a && (h[u][g] = 0)
    for (u = 0; u < h.length; u++)
      for (g = 0; g < h[u].length; g++)
        (l[u][g] = this.nonmax(u, g, o, h)), 0 < l[u][g] && (l[u][g] = 1)
    null != i && i.set('cornernessMap', l)
  }),
  (Moravec.prototype.nonmax = function(t, e, i, r) {
    var n = Math.floor(i / 2)
    if (0 <= t - (n + 1) && t + (n + 1) < r.length && 0 <= e - (n + 1) && e + (n + 1) < r[0].length)
      for (var o = -n; o <= n; o++)
        for (var a = -n; a <= n; a++) if ((0 != o || 0 != a) && r[t][e] < r[t + o][e + a]) return 0
    return r[t][e]
  }),
  (Moravec.directions = [[1, 0], [-1, 0], [0, 1], [0, -1], [-1, -1], [1, -1], [-1, 1], [1, 1]]),
  (Moravec.prototype.c = function(t, e, i, r) {
    var n,
      o = -1,
      a = Math.floor(i / 2)
    if (
      0 <= t - (a + 1) &&
      t + (a + 1) < r.getWidth() &&
      0 <= e - (a + 1) &&
      e + (a + 1) < r.getHeight()
    )
      for (var s = 0; s < Moravec.directions.length; s++) {
        n = 0
        for (var h = -a; h <= a; h++)
          for (var l = -a; l <= a; l++)
            n += Math.pow(
              r.getIntComponent0(t + h, e + l) -
                r.getIntComponent0(
                  t + h + Moravec.directions[s][0],
                  e + l + Moravec.directions[s][1]
                ),
              2
            )
        ;(-1 == o || n < o) && (o = n)
      }
    return o
  }),
  (Prewitt.prototype.load = function() {
    ;(this.convolution = new Convolution()), this.setAttribute('intensity', 1)
  }),
  (Prewitt.prototype.process = function(t, e, i, r, n) {
    var o = this.getAttribute('intensity')
    1 == o
      ? (this.convolution.setAttribute('matrix', this.matrixPrewittX),
        this.convolution.process(t, e, null, r, this.previewMode),
        this.convolution.setAttribute('matrix', this.matrixPrewittY),
        this.convolution.process(t, e, null, r, this.previewMode))
      : (this.convolution.setAttribute('matrix', MarvinMath.scaleMatrix(this.matrixPrewittX, o)),
        this.convolution.process(t, e, null, r, n),
        this.convolution.setAttribute('matrix', MarvinMath.scaleMatrix(this.matrixPrewittY, o)),
        this.convolution.process(t, e, null, r, n))
  }),
  (BoundaryFill.prototype.load = function() {
    this.setAttribute('x', 0),
      this.setAttribute('y', 0),
      this.setAttribute('color', 4294901760),
      this.setAttribute('tile', null),
      this.setAttribute('threshold', 0)
  }),
  (BoundaryFill.prototype.process = function(t, e, i, r, n) {
    var o,
      a,
      s,
      h = new Array(),
      l = this.getAttribute('x'),
      g = this.getAttribute('y'),
      u = this.getAttribute('tile')
    if (((this.threshold = this.getAttribute('threshold')), e.isValidPosition(l, g))) {
      t.getIntColor(l, g)
      var p = t.getIntComponent0(l, g),
        M = t.getIntComponent1(l, g),
        c = t.getIntComponent2(l, g),
        v = this.getAttribute('color'),
        d = MarvinJSUtils.createMatrix2D(e.getWidth(), e.getHeight, !1)
      for (d[l][g] = !0, h.push(new MarvinPoint(l, g)); 0 < h.length; ) {
        for (
          a = new MarvinPoint((o = h.splice(0, 1)[0]).x, o.y), s = new MarvinPoint(o.x, o.y);
          0 <= a.x - 1 && this.match(t, a.x - 1, a.y, p, M, c, this.threshold) && !d[a.x - 1][a.y];

        )
          a.x--
        for (
          ;
          s.x + 1 < t.getWidth() &&
          this.match(t, s.x + 1, s.y, p, M, c, this.threshold) &&
          !d[s.x + 1][s.y];

        )
          s.x++
        for (var f = a.x; f <= s.x; f++)
          (d[f][o.y] = !0),
            0 <= o.y - 1 &&
              this.match(t, f, o.y - 1, p, M, c, this.threshold) &&
              !d[f][o.y - 1] &&
              h.push(new MarvinPoint(f, o.y - 1)),
            o.y + 1 < e.getHeight() &&
              this.match(t, f, o.y + 1, p, M, c, this.threshold) &&
              !d[f][o.y + 1] &&
              h.push(new MarvinPoint(f, o.y + 1))
      }
      if (null != u);
      else
        for (var m = 0; m < e.getHeight(); m++)
          for (var b = 0; b < e.getWidth(); b++) d[b][m] && e.setIntColor(b, m, v)
    }
  }),
  (BoundaryFill.prototype.match = function(t, e, i, r, n, o, a) {
    return (
      Math.abs(t.getIntComponent0(e, i) - r) +
        Math.abs(t.getIntComponent1(e, i) - n) +
        Math.abs(t.getIntComponent2(e, i) - o) <=
      a
    )
  }),
  (ErrorDiffusion.prototype.load = function() {
    this.threshold = 128
  }),
  (ErrorDiffusion.prototype.process = function(t, e, i, r, n) {
    var o, a
    Marvin.grayScale(t, e, i, r, n), null != r && (a = r.getMask())
    for (var s = 0; s < e.getHeight(); s++)
      for (var h = 0; h < e.getWidth(); h++) {
        var l
        if (null == a || a[h][s])
          (o =
            (l = e.getIntComponent0(h, s)) > this.threshold
              ? (e.setIntColor(h, s, t.getAlphaComponent(h, s), 255, 255, 255), -(255 - l))
              : (e.setIntColor(h, s, t.getAlphaComponent(h, s), 0, 0, 0), l)),
            h + 1 < e.getWidth() &&
              ((l = e.getIntComponent0(h + 1, s)),
              (l += Math.floor(0.4375 * o)),
              (l = this.getValidGray(l)),
              e.setIntColor(h + 1, s, t.getAlphaComponent(h + 1, s), l, l, l),
              s + 1 < e.getHeight() &&
                ((l = e.getIntComponent0(h + 1, s + 1)),
                (l += Math.floor(0.0625 * o)),
                (l = this.getValidGray(l)),
                e.setIntColor(h + 1, s + 1, t.getAlphaComponent(h + 1, s + 1), l, l, l))),
            s + 1 < e.getHeight() &&
              ((l = e.getIntComponent0(h, s + 1)),
              (l += Math.floor(0.3125 * o)),
              (l = this.getValidGray(l)),
              e.setIntColor(h, s + 1, t.getAlphaComponent(h, s + 1), l, l, l),
              0 <= h - 1 &&
                ((l = e.getIntComponent0(h - 1, s + 1)),
                (l += Math.floor(0.1875 * o)),
                (l = this.getValidGray(l)),
                e.setIntColor(h - 1, s + 1, t.getAlphaComponent(h - 1, s + 1), l, l, l)))
      }
  }),
  (ErrorDiffusion.prototype.getValidGray = function(t) {
    return t < 0 ? 0 : 255 < t ? 255 : t
  })
var MarvinAbstractImagePlugin = new Object()
function Closing() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Dilation() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Erosion() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function FindTextRegions() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function IteratedFunctionSystem() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Crop() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function FloodfillSegmentation() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function Scale() {
  MarvinAbstractImagePlugin.super(this), this.load()
}
function MarvinAttributes() {
  this.hashAttributes = new Object()
}
function MarvinPoint(t, e) {
  ;(this.x = t), (this.y = e)
}
;(MarvinAbstractImagePlugin.super = function(t) {
  ;(t.attributes = {}),
    (t.setAttribute = MarvinAbstractImagePlugin.setAttribute),
    (t.getAttribute = MarvinAbstractImagePlugin.getAttribute)
}),
  (MarvinAbstractImagePlugin.setAttribute = function(t, e) {
    this.attributes[t] = e
  }),
  (MarvinAbstractImagePlugin.getAttribute = function(t, e) {
    return this.attributes[t]
  }),
  (Closing.prototype.load = function() {
    ;(this.matrix = MarvinJSUtils.createMatrix2D(3, 3, !0)), this.setAttribute('matrix', 3)
  }),
  (Closing.prototype.process = function(t, e, i, r, n) {
    var o = this.getAttribute('matrix')
    t.getColorModel() == MarvinImage.COLOR_MODEL_BINARY &&
      null != o &&
      (Marvin.morphologicalDilation(t, e, o),
      MarvinImage.copyColorArray(e, t),
      Marvin.morphologicalErosion(t, e, o))
  }),
  (Dilation.prototype.load = function() {
    ;(this.matrix = MarvinJSUtils.createMatrix2D(3, 3, !0)), this.setAttribute('matrix', 3)
  }),
  (Dilation.prototype.process = function(t, e, i, r, n) {
    var o = this.getAttribute('matrix')
    if (t.getColorModel() == MarvinImage.COLOR_MODEL_BINARY && null != o) {
      MarvinImage.copyColorArray(t, e)
      for (var a = 0; a < t.getHeight(); a++)
        for (var s = 0; s < t.getWidth(); s++) this.applyMatrix(s, a, o, t, e)
    }
  }),
  (Dilation.prototype.applyMatrix = function(t, e, i, r, n) {
    var o,
      a,
      s = i[0].length / 2,
      h = i.length / 2
    if (r.getBinaryColor(t, e))
      for (var l = 0; l < i.length; l++)
        for (var g = 0; g < i.length; g++)
          (l == h && g == s) ||
            !i[l][g] ||
            ((a = e + (l - h)),
            0 < (o = t + (g - s)) &&
              o < n.getWidth() &&
              0 < a &&
              a < n.getHeight() &&
              n.setBinaryColor(o, a, !0))
  }),
  (Erosion.prototype.load = function() {
    ;(this.matrix = MarvinJSUtils.createMatrix2D(3, 3, !0)), this.setAttribute('matrix', 3)
  }),
  (Erosion.prototype.process = function(t, e, i, r, n) {
    var o = this.getAttribute('matrix')
    if (t.getColorModel() == MarvinImage.COLOR_MODEL_BINARY && null != o) {
      MarvinImage.copyColorArray(t, e)
      for (var a = 0; a < t.getHeight(); a++)
        for (var s = 0; s < t.getWidth(); s++) this.applyMatrix(s, a, o, t, e)
    }
  }),
  (Erosion.prototype.applyMatrix = function(t, e, i, r, n) {
    var o,
      a,
      s = Math.floor(i[0].length / 2),
      h = Math.floor(i.length / 2)
    if (!r.getBinaryColor(t, e))
      for (var l = 0; l < i.length; l++)
        for (var g = 0; g < i[0].length; g++)
          (l == h && g == s) ||
            !i[l][g] ||
            ((a = e + (l - h)),
            0 <= (o = t + (g - s)) &&
              o < n.getWidth() &&
              0 <= a &&
              a < n.getHeight() &&
              n.setBinaryColor(o, a, !1))
  }),
  (FindTextRegions.prototype.load = function() {
    this.setAttribute('maxWhiteSpace', 10),
      this.setAttribute('maxFontLineWidth', 10),
      this.setAttribute('minTextWidth', 30),
      this.setAttribute('grayScaleThreshold', 127)
  }),
  (FindTextRegions.prototype.process = function(t, e, i, r, n) {
    t = t.clone()
    var o = this.getAttribute('maxWhiteSpace'),
      a = this.getAttribute('maxFontLineWidth'),
      s = this.getAttribute('minTextWidth'),
      h = this.getAttribute('grayScaleThreshold')
    Marvin.thresholding(t, t, h)
    for (var l = [], g = 0; g < t.getHeight(); g++) l.push([])
    for (
      var u,
        p = MarvinJSUtils.createMatrix2D(t.getWidth(), t.getHeight, !1),
        M = -1,
        c = 0,
        v = 0,
        d = 0,
        f = 0;
      f < t.getHeight();
      f++
    )
      for (var m = 0; m < t.getWidth(); m++)
        if (!p[m][f]) {
          if (
            (4294967295 == (u = t.getIntColor(m, f)) && -1 != M && (v++, (d = 0)),
            4278190080 == u && (d++, -1 == M && (M = m), (v = 0)),
            o < v || a < d || m == t.getWidth() - 1)
          ) {
            if (s <= c) (S = l[f]).push([M, f, M + c, f])
            ;(c = d = v = 0), (M = -1)
          }
          ;-1 != M && c++, (p[m][f] = !0)
        }
    for (f = 0; f < t.getHeight() - 2; f++)
      for (var b = l[f], A = f + 1; A <= f + 2; A++) {
        var y = l[A]
        for (g = 0; g < b.length; g++)
          for (var I = b[g], C = 0; C < y.length; C++) {
            var x = y[C]
            if (
              (I[0] <= x[0] && I[2] >= x[2]) ||
              (I[0] >= x[0] && I[0] <= x[2]) ||
              (I[2] >= x[0] && I[2] <= x[2])
            ) {
              ;(I[0] = Math.min(I[0], x[0])),
                (I[2] = Math.max(I[2], x[2])),
                (I[3] = x[3]),
                b.splice(g, 1),
                g--,
                y.splice(C, 1),
                y.push(I)
              break
            }
          }
      }
    var w = []
    for (f = 0; f < t.getHeight(); f++) {
      var S = l[f]
      for (var g in S) {
        var k = S[g]
        w.push(new MarvinSegment(k[0], k[1], k[2], k[3]))
      }
    }
    i.set('matches', w)
  }),
  (IteratedFunctionSystem.prototype.load = function() {
    ;(this.rules = []),
      (this.EXAMPLE_RULES =
        '0,0,0,0.16,0,0,0.01\n0.85,0.04,-0.04,0.85,0,1.6,0.85\n0.2,-0.26,0.23,0.22,0,1.6,0.07\n-0.15,0.28,0.26,0.24,0,0.44,0.07\n'),
      this.setAttribute('rules', this.EXAMPLE_RULES),
      this.setAttribute('iterations', 1e6)
  }),
  (IteratedFunctionSystem.prototype.process = function(t, e, i, r, n) {
    this.loadRules()
    var o,
      a,
      s,
      h,
      l,
      g,
      u = this.getAttribute('iterations'),
      p = 999999999,
      M = 999999999,
      c = -999999999,
      v = -99999999,
      d = [0, 0]
    e.clear(4294967295)
    for (var f = 0; f < u; f++)
      (g = this.getRule()),
        this.applyRule(d, g),
        (o = d[0]) < p && (p = o),
        c < o && (c = o),
        (a = d[1]) < M && (M = a),
        v < a && (v = a)
    var m = e.getWidth(),
      b = e.getHeight(),
      A = Math.abs(c - p),
      y = Math.abs(v - M)
    y < A ? b < y * (l = m / A) && (l *= b / (y * l)) : m < A * (l = b / y) && (l *= m / (A * l)),
      (l *= 0.9),
      (s = Math.floor(m / 2 - (p + A / 2) * l)),
      (h = Math.floor(b - (b / 2 - (M + y / 2) * l))),
      (d[0] = 0)
    for (f = d[1] = 0; f < u; f++)
      (g = this.getRule()),
        this.applyRule(d, g),
        (o = Math.floor(d[0] * l + s)),
        (a = h - Math.floor(d[1] * l)),
        0 <= o && o < m && 0 <= a && a < b && e.setIntColor(Math.floor(o), Math.floor(a), 255, 0)
  }),
  (IteratedFunctionSystem.prototype.loadRules = function() {
    this.rules = []
    for (var t = this.getAttribute('rules').split('\n'), e = 0; e < t.length; e++)
      this.addRule(t[e])
  }),
  (IteratedFunctionSystem.prototype.addRule = function(t) {
    var e = (t = t.replace(/ /g, '')).split(',')
    if (7 == e.length) {
      var i = new Object()
      ;(i.a = parseFloat(e[0])),
        (i.b = parseFloat(e[1])),
        (i.c = parseFloat(e[2])),
        (i.d = parseFloat(e[3])),
        (i.e = parseFloat(e[4])),
        (i.f = parseFloat(e[5])),
        (i.probability = parseFloat(e[6])),
        this.rules.push(i)
    }
  }),
  (IteratedFunctionSystem.prototype.getRule = function() {
    var t,
      e = Math.random(),
      i = 0
    for (t = 0; t < this.rules.length; t++)
      if (e < (i += this.rules[t].probability)) return this.rules[t]
    return 0 != t ? this.rules[t - 1] : this.rules[0]
  }),
  (IteratedFunctionSystem.prototype.applyRule = function(t, e) {
    var i = e.a * t[0] + e.b * t[1] + e.e,
      r = e.c * t[0] + e.d * t[1] + e.f
    ;(t[0] = i), (t[1] = r)
  }),
  (Crop.prototype.load = function() {
    this.setAttribute('x', 0),
      this.setAttribute('y', 0),
      this.setAttribute('width', 0),
      this.setAttribute('height', 0)
  }),
  (Crop.prototype.process = function(t, e, i, r, n) {
    var o = this.getAttribute('x'),
      a = this.getAttribute('y'),
      s = this.getAttribute('width'),
      h = this.getAttribute('height')
    e.setDimension(s, h)
    for (var l = o; l < o + s; l++)
      for (var g = a; g < a + h; g++) e.setIntColor(l - o, g - a, t.getIntColor(l, g))
  }),
  (FloodfillSegmentation.prototype.load = function() {
    this.setAttribute('returnType', 'MarvinSegment')
  }),
  (FloodfillSegmentation.prototype.process = function(t, e, i, r, n) {
    if (null != i) {
      var o = this.getAttribute('returnType'),
        a = t.clone(),
        s = this.floodfillSegmentation(t, a)
      switch (o) {
        case 'MarvinSegment':
          i.set('segments', s)
          break
        case 'MarvinBlobSegment':
          i.set('blobSegments', blobSegments(a, s))
      }
    }
  }),
  (FloodfillSegmentation.prototype.floodfillSegmentation = function(t, e) {
    e.clear(4278190080)
    for (var i = 1, r = 0; r < t.getHeight(); r++)
      for (var n = 0; n < t.getWidth(); n++) {
        if (0 == (16777215 & (h = e.getIntColor(n, r))) && 0 < t.getAlphaComponent(n, r)) {
          var o = 4278190080 | i++
          Marvin.boundaryFill(t, e, n, r, o)
        }
      }
    var a,
      s = new Array(i - 1)
    for (r = 0; r < e.getHeight(); r++)
      for (n = 0; n < e.getWidth(); n++) {
        var h
        16777215 != (h = 16777215 & e.getIntColor(n, r)) &&
          0 < h &&
          (null == (a = s[h - 1]) && ((a = new MarvinSegment()), (s[h - 1] = a)),
          (-1 == a.x1 || n < a.x1) && (a.x1 = n),
          (-1 == a.x2 || n > a.x2) && (a.x2 = n),
          (a.width = a.x2 - a.x1 + 1),
          (-1 == a.y1 || r < a.y1) && (a.y1 = r),
          (-1 == a.y2 || r > a.y2) && (a.y2 = r),
          (a.height = a.y2 - a.y1 + 1),
          a.area++)
      }
    return s
  }),
  (FloodfillSegmentation.prototype.blobSegments = function(t, e) {
    for (var i, r, n = new Array(e.length), o = 0; o < e.length; o++) {
      ;(r = e[o]), (i = 4278190080 + (o + 1)), (n[o] = new MarvinBlobSegment(r.x1, r.y1))
      var a = new MarvinBlob(r.width, r.height)
      n[o].setBlob(a)
      for (var s = r.y1; s <= r.y2; s++)
        for (var h = r.x1; h <= r.x2; h++)
          t.getIntColor(h, s) == i && a.setValue(h - r.x1, s - r.y1, !0)
    }
    return n
  }),
  (Scale.prototype.load = function() {
    this.setAttribute('newWidth', 0), this.setAttribute('newHeight', 0)
  }),
  (Scale.prototype.process = function(t, e, i, r, n) {
    if (!n) {
      var o = t.getWidth(),
        a = t.getHeight(),
        s = this.getAttribute('newWidth'),
        h = this.getAttribute('newHeight')
      ;(e.getWidth() == s && e.getHeight() == h) || e.setDimension(s, h)
      for (
        var l, g, u = Math.floor((o << 16) / s), p = Math.floor((a << 16) / h), M = 0;
        M < h;
        M++
      )
        for (var c = 0; c < s; c++)
          (l = Math.floor((c * u) >> 16)),
            (g = Math.floor((M * p) >> 16)),
            e.setIntColor(c, M, t.getAlphaComponent(l, g), t.getIntColor(l, g))
    }
  }),
  (MarvinAttributes.prototype.set = function(t, e) {
    this.hashAttributes[t] = e
  }),
  (MarvinAttributes.prototype.get = function(t, e) {
    var i = this.hashAttributes[t]
    return null != i ? i : e
  }),
  (MarvinAttributes.prototype.clone = function() {
    var t = new MarvinAttributes()
    for (var e in this.hashAttributes) t.set(e, this.hashAttributes[e])
    return t
  }),
  (MarvinPoint.prototype.setX = function(t) {
    this.x = t
  }),
  (MarvinPoint.prototype.getX = function() {
    return this.x
  }),
  (MarvinPoint.prototype.setY = function(t) {
    this.y = y
  }),
  (MarvinPoint.prototype.getY = function() {
    return this.y
  })
var marvinLoadPluginMethods = function(t) {
    ;(Marvin.plugins = new Object()),
      (Marvin.plugins.alphaBoundary = new AlphaBoundary()),
      (Marvin.alphaBoundary = function(t, e, i) {
        Marvin.plugins.alphaBoundary.setAttribute('radius', i),
          Marvin.plugins.alphaBoundary.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.averageColor = new AverageColor()),
      (Marvin.averageColor = function(t) {
        var e = new MarvinAttributes()
        return (
          Marvin.plugins.averageColor.process(t, null, e, MarvinImageMask.NULL_MASK, !1),
          e.get('averageColor')
        )
      }),
      (Marvin.plugins.blackAndWhite = new BlackAndWhite()),
      (Marvin.blackAndWhite = function(t, e, i) {
        Marvin.plugins.blackAndWhite.setAttribute('level', i),
          Marvin.plugins.blackAndWhite.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.boundaryFill = new BoundaryFill()),
      (Marvin.boundaryFill = function(t, e, i, r, n, o) {
        Marvin.plugins.boundaryFill.setAttribute('x', i),
          Marvin.plugins.boundaryFill.setAttribute('y', r),
          Marvin.plugins.boundaryFill.setAttribute('color', n),
          null != o && Marvin.plugins.boundaryFill.setAttribute('threshold', o),
          Marvin.plugins.boundaryFill.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.brightnessAndContrast = new BrightnessAndContrast()),
      (Marvin.brightnessAndContrast = function(t, e, i, r) {
        Marvin.plugins.brightnessAndContrast.setAttribute('brightness', i),
          Marvin.plugins.brightnessAndContrast.setAttribute('contrast', r),
          Marvin.plugins.brightnessAndContrast.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.colorChannel = new ColorChannel()),
      (Marvin.colorChannel = function(t, e, i, r, n) {
        Marvin.plugins.colorChannel.setAttribute('red', i),
          Marvin.plugins.colorChannel.setAttribute('green', r),
          Marvin.plugins.colorChannel.setAttribute('blue', n),
          Marvin.plugins.colorChannel.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.crop = new Crop()),
      (Marvin.crop = function(t, e, i, r, n, o) {
        Marvin.plugins.crop.setAttribute('x', i),
          Marvin.plugins.crop.setAttribute('y', r),
          Marvin.plugins.crop.setAttribute('width', n),
          Marvin.plugins.crop.setAttribute('height', o),
          Marvin.plugins.crop.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.combineByAlpha = new CombineByAlpha()),
      (Marvin.combineByAlpha = function(t, e, i, r, n) {
        Marvin.plugins.combineByAlpha.setAttribute('imageOther', e),
          Marvin.plugins.combineByAlpha.setAttribute('x', r),
          Marvin.plugins.combineByAlpha.setAttribute('y', n),
          Marvin.plugins.combineByAlpha.process(t, i, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.emboss = new Emboss()),
      (Marvin.emboss = function(t, e) {
        Marvin.plugins.emboss.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.halftoneErrorDiffusion = new ErrorDiffusion()),
      (Marvin.halftoneErrorDiffusion = function(t, e) {
        Marvin.plugins.halftoneErrorDiffusion.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.findTextRegions = new FindTextRegions()),
      (Marvin.findTextRegions = function(t, e, i, r, n) {
        var o = new MarvinAttributes()
        return (
          Marvin.plugins.findTextRegions.setAttribute('maxWhiteSpace', Marvin.getValue(e, 10)),
          Marvin.plugins.findTextRegions.setAttribute('maxFontLineWidth', Marvin.getValue(i, 10)),
          Marvin.plugins.findTextRegions.setAttribute('minTextWidth', Marvin.getValue(r, 30)),
          Marvin.plugins.findTextRegions.setAttribute(
            'grayScaleThreshold',
            Marvin.getValue(n, 127)
          ),
          Marvin.plugins.findTextRegions.process(t, null, o, MarvinImageMask.NULL_MASK, !1),
          o.get('matches')
        )
      }),
      (Marvin.plugins.floodfillSegmentation = new FloodfillSegmentation()),
      (Marvin.floodfillSegmentation = function(t) {
        var e = new MarvinAttributes()
        return (
          Marvin.plugins.floodfillSegmentation.setAttribute('returnType', 'MarvinSegment'),
          Marvin.plugins.floodfillSegmentation.process(t, null, e, MarvinImageMask.NULL_MASK, !1),
          e.get('segments')
        )
      }),
      (Marvin.plugins.gaussianBlur = new GaussianBlur()),
      (Marvin.gaussianBlur = function(t, e, i) {
        Marvin.plugins.gaussianBlur.setAttribute('radius', Marvin.getValue(i, 3)),
          Marvin.plugins.gaussianBlur.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.invertColors = new Invert()),
      (Marvin.invertColors = function(t, e) {
        Marvin.plugins.invertColors.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.iteratedFunctionSystem = new IteratedFunctionSystem()),
      (Marvin.iteratedFunctionSystem = function(t, e, i, r) {
        Marvin.plugins.iteratedFunctionSystem.setAttribute('rules', i),
          Marvin.plugins.iteratedFunctionSystem.setAttribute('iterations', r),
          Marvin.plugins.iteratedFunctionSystem.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.grayScale = new GrayScale()),
      (Marvin.grayScale = function(t, e) {
        Marvin.plugins.grayScale.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.mergePhotos = new MergePhotos()),
      (Marvin.mergePhotos = function(t, e, i) {
        Marvin.plugins.mergePhotos.setAttribute('threshold', i),
          Marvin.plugins.mergePhotos.process(t, e)
      }),
      (Marvin.plugins.moravec = new Moravec()),
      (Marvin.moravec = function(t, e, i, r) {
        var n = new MarvinAttributes()
        return (
          Marvin.plugins.moravec.setAttribute('matrixSize', i),
          Marvin.plugins.moravec.setAttribute('threshold', r),
          Marvin.plugins.moravec.process(t, e, n, MarvinImageMask.NULL_MASK, !1),
          n.get('cornernessMap')
        )
      }),
      (Marvin.plugins.morphologicalDilation = new Dilation()),
      (Marvin.morphologicalDilation = function(t, e, i) {
        Marvin.plugins.morphologicalDilation.setAttribute('matrix', i),
          Marvin.plugins.morphologicalDilation.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.morphologicalErosion = new Erosion()),
      (Marvin.morphologicalErosion = function(t, e, i) {
        Marvin.plugins.morphologicalErosion.setAttribute('matrix', i),
          Marvin.plugins.morphologicalErosion.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.morphologicalClosing = new Closing()),
      (Marvin.morphologicalClosing = function(t, e, i) {
        Marvin.plugins.morphologicalClosing.setAttribute('matrix', i),
          Marvin.plugins.morphologicalClosing.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.prewitt = new Prewitt()),
      (Marvin.prewitt = function(t, e, i) {
        Marvin.plugins.prewitt.setAttribute('intensity', Marvin.getValue(i, 1)),
          Marvin.plugins.prewitt.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.scale = new Scale()),
      (Marvin.scale = function(t, e, i, r) {
        if (null == r) {
          var n = t.getHeight() / t.getWidth()
          r = Math.floor(n * i)
        }
        Marvin.plugins.scale.setAttribute('newWidth', i),
          Marvin.plugins.scale.setAttribute('newHeight', r),
          Marvin.plugins.scale.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.sepia = new Sepia()),
      (Marvin.sepia = function(t, e, i) {
        Marvin.plugins.sepia.setAttribute('intensity', i),
          Marvin.plugins.sepia.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.thresholding = new Thresholding()),
      (Marvin.thresholding = function(t, e, i, r) {
        Marvin.plugins.thresholding.setAttribute('threshold', i),
          Marvin.plugins.thresholding.setAttribute('thresholdRange', r),
          Marvin.plugins.thresholding.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      }),
      (Marvin.plugins.thresholdingNeighborhood = new ThresholdingNeighborhood()),
      (Marvin.thresholdingNeighborhood = function(t, e, i, r, n) {
        Marvin.plugins.thresholdingNeighborhood.setAttribute('thresholdPercentageOfAverage', i),
          Marvin.plugins.thresholdingNeighborhood.setAttribute('neighborhoodSide', r),
          Marvin.plugins.thresholdingNeighborhood.setAttribute('samplingPixelDistance', n),
          Marvin.plugins.thresholdingNeighborhood.process(t, e, null, MarvinImageMask.NULL_MASK, !1)
      })
  },
  Marvin = new Object()
;(Marvin.getValue = function(t, e) {
  return null != t ? t : e
}),
  marvinLoadPluginMethods()

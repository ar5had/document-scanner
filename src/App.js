import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import UploadFile from './UploadFile'
import ButtonsGroup from './ButtonsGroup'

const MarvinImage = window.MarvinImage
const Marvin = window.Marvin

let image = new MarvinImage()
let mapImg
let cropRect

const StyledApp = styled.div`
  text-align: center;
`

const ControlsWrapper = styled.div`
  margin: 40px 0;
  img {
    max-height: 60vh;
    width: 100%;
    object-fit: contain;
  }
`

const App = () => {
  const [src, changeSrc] = useState('')
  const srcRef = useRef(src)
  const canvasRef = useRef(null)

  const makeBW = () => {
    if (mapImg) {
      return
    }
    let newImage = image.clone()
    Marvin.blackAndWhite(image, newImage, 1)
    newImage.draw(canvasRef.current)
    image = newImage
  }

  const detectEdges = () => {
    const factor = image.width / image.height
    const newImage = new MarvinImage(image.width, image.height)
    const ctx = canvasRef.current.getContext('2d')

    Marvin.scale(image, newImage, image.height)
    mapImg = Marvin.moravec(newImage.clone(), newImage, 5, 10000)

    ctx.fillStyle = '#ff0000'

    for (let x = 0; x < mapImg.length; x++) {
      for (let y = 0; y < mapImg.length; y++) {
        if (mapImg[x][y] > 0) {
          // scale up the corners coordinates
          ctx.fillRect(Math.floor(x * factor), Math.floor(y * factor), 10, 10)
        }
      }
    }

    image = newImage
  }

  const selectCropArea = () => {
    if (!mapImg) {
      return
    }

    image.draw(canvasRef.current, image.width, image.height)

    const factor = image.width / image.height

    let x1 = 9999
    let x2 = 0
    let y1 = 9999
    let y2 = 0

    for (let x = 0; x < mapImg.length; x++) {
      let minY = 9999
      let maxY = 0

      for (let y = 0; y < mapImg.length; y++) {
        if (mapImg[x][y]) {
          if (y < minY) {
            minY = y
          }
          if (y > maxY) {
            maxY = y
          }
        }
      }

      if (maxY - minY > 30) {
        if (x < x1) {
          x1 = x
        }
        if (x > x2) {
          x2 = x
        }
        if (minY < y1) {
          y1 = minY
        }
        if (maxY > y2) {
          y2 = maxY
        }
      }
    }

    // Scale up to the original resolution
    x1 = Math.floor(x1 * factor)
    x2 = Math.floor(x2 * factor)
    y1 = Math.floor(y1 * factor)
    y2 = Math.floor(y2 * factor)

    // Add some margin
    x1 -= Math.floor((x2 - x1) * 0.2)
    x2 += Math.floor((x2 - x1) * 0.2)
    y1 -= Math.floor((y2 - y1) * 0.1)
    y2 += Math.floor((y2 - y1) * 0.1)

    cropRect = [x1, y1, x2 - x1, y2 - y1]

    let ctx = canvasRef.current.getContext('2d')

    ctx.strokeStyle = '#ff0000'
    ctx.lineWidth = 4
    ctx.rect(x1, y1, x2 - x1, y2 - y1)
    ctx.stroke()
  }

  const crop = () => {
    if(!cropRect) {
      return;
    }

    const [x1, y1, w, h] = cropRect

    // Clear canvas
    canvasRef.current.getContext("2d").clearRect(0, 0, x1, y1);
    canvasRef.current.getContext("2d").clearRect(x1, 0, image.width, y1);
    canvasRef.current.getContext("2d").clearRect(0, 0, x1, image.height);
    canvasRef.current.getContext("2d").clearRect(x1 + w, 0, image.width, image.height);
    canvasRef.current.getContext("2d").clearRect(0, y1 + h, image.width, image.height);
  }

  const reset = () => {
    // clear canvas
    canvasRef.current
      .getContext('2d')
      .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    uploadImg(src)
    mapImg = null
    cropRect = null
  }

  const uploadImg = (imgURL) => {
    canvasRef.current.width = window.innerWidth - 40

    image.load(imgURL, () => {
      image.draw(canvasRef.current)
    })

    changeSrc(imgURL)
    srcRef.current = imgURL
  }

  return (
    <StyledApp>
      <h3> Upload Document Image</h3>
      <UploadFile changeImg={uploadImg} />
      <ControlsWrapper>
        {src && (
          <ButtonsGroup
            reset={reset}
            makeBW={makeBW}
            crop={crop}
            selectCropArea={selectCropArea}
            detectEdges={detectEdges}
          />
        )}
        <canvas ref={canvasRef} id="canvas" height="1000"></canvas>
      </ControlsWrapper>
    </StyledApp>
  )
}

export default App

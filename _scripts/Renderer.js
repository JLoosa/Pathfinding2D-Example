/**
 * @author Created by Jacob Loosa
 * 2020-08-28
 */

/**
 * Primary canvas reference
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("PathCanvas");
let context = canvas.getContext("2d")
// The expected resolution will be a multiple of 100 in both dimensions
let width = canvas.width
let height = canvas.height
console.log("Rendered canvas size:", width, height)
let tileSize = 10
// Use bitwise or to force arguments to be integers
let model = new Model((width / tileSize) | 0, (height/ tileSize) | 0)
let ceh = new EventHandler(canvas, model)
let beh = new ButtonEventHandler(document.getElementById("MaterialSelector"), model)

let COLOR_GRID = 'gray'



/**
 * Draw a line connecting two points on the canvas
 * @param {number} x1 X-Value of first point
 * @param {number} y1 Y-value of first point
 * @param {number} x2 X-value of second point
 * @param {number} y2 Y-value of second point
 */
let drawLine = function(x1, y1, x2, y2) {
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
}

/**
 * Draw a rectangle that covers the region bounded by two opposite corners
 * @param {number} x1 X-Value of the first corner
 * @param {number} y1 Y-Value of the first corner
 * @param {number} x2 X-Value of the second corner
 * @param {number} y2 Y-Value of the second corner
 * @param {boolean} relative Set to true if the coordinates of the second point are relative to the first point
 */
let drawRect = function (x1, y1, x2, y2, relative = false) {
    if (!relative)
        context.fillRect(x1, y1, x2-x1, y2-y1)
    else
        context.fillRect(x1, y1, x2, y2)
}

/**
 * Renders the tile at the given position
 * @param {number} x X-position of the tile
 * @param {number} y Y-position of the tile
 */
let drawTile = function (x, y) {
    context.strokeStyle = COLOR_GRID
    let tileType = model.getTileType(x, y)
    context.fillStyle = tileType.getColor()
    drawRect(x * tileSize, y * tileSize, tileSize, tileSize, true)
}

/**
 * Draws the lines needed to make the canvas appear as a grid.
 */
let drawGrid = function () {
    context.strokeStyle = COLOR_GRID
    context.fillStyle = COLOR_GRID
    for (let x = 1; x < model.getWidth(); x++) {
        drawLine(x*tileSize+0.5, 0, x*tileSize+0.5, height)
    }
    for (let y = 1; y < model.getHeight(); y++) {
        drawLine(0, y*tileSize+0.5, width, y*tileSize+0.5)
    }
    context.stroke()
}

/**
 * Draws all of the tiles onto the canvas
 */
let drawAllTiles = function () {
    for (let x = 0; x < model.getWidth(); x++)
        for (let y = 0; y < model.getHeight(); y++)
            drawTile(x, y)
    context.stroke()
}


let lastChangeTime = -1
let main = function () {
    console.log("Total number of tiles:", (model.getWidth() * model.getHeight()))
    setInterval(() => {
        if (model.lastChangeTime <= lastChangeTime)
            return
        drawAllTiles()
        drawGrid()
        lastChangeTime = model.lastChangeTime
    }, 1000 / 30)
}

main()
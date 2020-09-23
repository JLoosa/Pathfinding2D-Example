/**
 * @author Jacob Loosa
 * @abstract Stores and manages the data required for the application to run.
 *
 * The Model class is used to create and manage a Two-Dimensional array of "tiles" that are
 * representative of a pathfinding environment. This model does not support resizing after being constructed.
 *
 * Positions within the matrix are referenced as an (x, y) pair
 * - this pair is 0-based and measured from the upper left corner
 *
 */
class Model {

    lastChangeTime = Date.now()
    activeTile;

    /**
     * Mapping of Tile Types to Pathing Weights
     */
    registeredTiles = {};

    /**
     * Safely register a new tile into the model
     * @param {TileType} tile
     */
    registerTile(tile) {
        if (tile.getName() in this.registeredTiles)
            return false
        this.registeredTiles[tile.getName()] = tile
        return true
    }

    // Private Fields
    /**
     * Internal 1D map of the tiles
     * @type {TileType[]}
     */
    #tileMap = null
    /**
     * Width of internal map
     * @type {number}
     */
    #width = 0
    /**
     * Height of internal map
     * @type {number}
     */
    #height = 0

    /**
     * Creates a new Model
     * @param {number} width The width of the model's 2D tile map
     * @param {number} height The height of the model's 2D tile map
     */
    constructor(width, height) {

        this.#width = width
        this.#height = height

        // Register the default tile type
        let emptyTile = new TileType(TILE_NAME_EMPTY, 10, '#FFFFFF')
        this.registerTile(emptyTile)
        this.activeTile = emptyTile

        // Build the internal array
        this.#tileMap = new Array(width * height).fill(this.activeTile)

    }

    /**
     * Get the width of the model's internal map
     * @returns {number}
     */
    getWidth() {
        return this.#width
    }

    /**
     * Get the height of the model's internal map
     * @returns {number}
     */
    getHeight() {
        return this.#height
    }

    /**
     * Convert a giving point to a single index in the model's internal map.
     * @param x X coordinate
     * @param y Y coordinate
     * @returns {number}
     */
    #IX(x, y) {
        if (x < 0 || x >= this.#width) return -1
        if (y < 0 || y >= this.#height) return -1
        return x + y * this.#width;
    }

    /**
     * Assign a tile type to a given tile in the model's internal map
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {TileType} type
     * @returns {boolean}
     */
    setTileType(x, y, type) {
        let index = this.#IX(x, y)
        if (index === -1){
            console.log("Invalid index")
            return false
        }
        this.#tileMap[index] = type
        this.lastChangeTime = Date.now()
        return true
    }

    /**
     * Gets the type of a given tile from the internal map
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @returns {TileType}
     */
    getTileType(x, y) {
        let index = this.#IX(x, y)
        if (index === -1)
            return null
        return this.#tileMap[index]
    }


}

const TILE_NAME_EMPTY = "Empty"

class TileType {
    #name = "INVALID"
    #weight = Number.NaN
    #color = "#FFFFFF"

    /**
     * Create a new Tile Type with the given attributes
     * @param name The name of the type
     * @param weight The pathing weight of the type
     * @param color The color it will render as
     */
    constructor(name, weight, color) {
        this.#name = name
        this.#weight = weight
        this.#color = color
    }

    getWeight() {
        return this.#weight
    }

    getName() {
        return this.#name
    }

    getColor() {
        return this.#color
    }

}



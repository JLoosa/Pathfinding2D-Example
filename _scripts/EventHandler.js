
class EventHandler {

    /**
     * Internal reference to the primary HTMLElement
     * @type {HTMLCanvasElement}
     */
    #canvas = null

    /**
     * Internal reference to the primary Model
     * @type {Model}
     */
    #model = null

    /**
     * Boolean to check if the mouse is currently being dragged
     * @type {boolean}
     */
    #mouseDragging = false

    /**
     * Creates a new EventHandler and connects it to an existing canvas and model
     * Although the constructor states that the canvas is an HTMLElement, it must be an HTMLCanvasElement
     * @param {HTMLElement} canvas
     * @param {Model} model
     */
    constructor(canvas, model) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement))
            throw new Error("Invalid HTMLCanvasElement used in EVentHandler Constructor")
        if (!model || !(model instanceof Model))
            throw new Error("Invalid Model used in EVentHandler Constructor")
        this.#canvas = canvas
        this.#model = model
        console.log("Events are being registered.")
        this.#registerEvents()
    }

    #registerEvents() {
        this.#canvas.addEventListener('mousedown', (e) => this.#onMouseDown(e))
        this.#canvas.addEventListener('mousemove', (e) => this.#onMouseMove(e))
        this.#canvas.addEventListener('mouseup', (e) => this.#onMouseUp(e))
        this.#canvas.addEventListener('mouseleave', (e) => this.#onMouseLeave(e))
    }

    /**
     * Called when the user presses a button on the mouse
     * @param {MouseEvent} event
     */
    #onMouseDown(event) {
        this.#mouseDragging = true
        this.#paintAtMouse(event.offsetX, event.offsetY)
    }


    /**
     * Called when the user drags the mouse
     * @param {MouseEvent} event
     */
    #onMouseMove(event) {
        if (this.#mouseDragging) {
            this.#paintAtMouse(event.offsetX, event.offsetY)
        }
    }


    /**
     * Called when the user releases a button on the mouse
     * @param {MouseEvent} event
     */
    #onMouseUp(event) {
        this.#mouseDragging = false
    }

    /**
     * Called when the mouse leaves the canvas
     * @param {MouseEvent} event
     */
    #onMouseLeave(event) {
        this.#mouseDragging = false
    }

    #paintAtMouse(mouseX, mouseY) {
        let tileX = this.#mouseXToTileX(mouseX)
        let tileY = this.#mouseYToTileY(mouseY)
        // If either of these are below 0, we are off of the canvas
        if (tileX < 0 || tileY < 0) return
        if (!model.setTileType(tileX, tileY, this.#model.activeTile))
            console.log("Failed to update model!")
    }

    /**
     * Convert the given mouse X position to an x coordinate for a tile.
     * @param mouseX The mouse X position that you would like to convert
     * @returns {number} the X value of the tile at the given mouse X position
     */
    #mouseXToTileX(mouseX) {
        if (mouseX < 0 || mouseX >= this.#canvas.width)
            return -1
        return (mouseX / this.#canvas.width * this.#model.getWidth()) | 0
    }

    /**
     * Convert the given mouse Y position to an x coordinate for a tile.
     * @param mouseY The mouse Y position that you would like to convert
     * @returns {number} the Y value of the tile at the given mouse X position
     */
    #mouseYToTileY(mouseY) {
        if (mouseY < 0 || mouseY >= this.#canvas.height)
            return -1
        return (mouseY / this.#canvas.height * this.#model.getHeight()) | 0
    }
}

class ButtonEventHandler {
    /**
     * Internal reference to model
     * @type {Model}
     */
    #model = null;

    /**
     * Internal reference to parent element
     * @type {HTMLElement}
     */
    #parent = null

    /**
     * Creates a new ButtonEventHandler to define various brushes
     * Automatically ties to the provided parent element and model
     * @param {HTMLElement} parentElement
     * @param {Model} model
     */
    constructor(parentElement, model) {
        if (!canvas || !(canvas instanceof HTMLElement))
            throw new Error("Invalid HTMLElement used in EVentHandler Constructor")
        if (!model || !(model instanceof Model))
            throw new Error("Invalid Model used in EVentHandler Constructor")

        this.#model = model
        this.#parent = parentElement
        this.#addNewTiles()
    }

    #addNewTiles() {
        this.#createButton(model.registeredTiles[TILE_NAME_EMPTY])
        this.#registerAndCreateButton("Road", 7.5, '#9a9c9a')
        this.#registerAndCreateButton("Barrier", Number.POSITIVE_INFINITY, "#000000")
    }

    /**
     * Create a new button to represent a new tile type in the model
     * @param {string} name The name of the tile you would like to register
     * @param {number} weight The pathing weight of the tile. Empty space is 10.
     * @param {string} color the color of the tile. Empty space is white.
     * @return {boolean} true if the tile name was available
     */
    #registerAndCreateButton(name, weight, color) {
        let tileType = new TileType(name, weight, color)
        if (!this.#model.registerTile(tileType)) {
            console.log("Failed to create TileType. Name already registered:", tileType.getName())
            return false;
        }
        console.log("Created tile type:", tileType.getName())
        this.#createButton(tileType)
    }

    #createButton(tileType) {
        let button = document.createElement("button")
        button.title = "Weight: " + tileType.getWeight()
        button.innerHTML = tileType.getName()
        button.style.backgroundColor = "#FFFFFF"
        button.addEventListener('click', () => {
            if (model.activeTile !== tileType) {
                model.activeTile = tileType
            }
            else {
                model.activeTile = model.registeredTiles[TILE_NAME_EMPTY]
            }
        })
        this.#parent.appendChild(button)

    }

}




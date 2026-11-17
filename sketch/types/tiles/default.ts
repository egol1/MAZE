/**
 * Class representing a `Tile`.
 * Used to draw things in-game .
 */
class Tile {
    /**
     * The position of this tile.
     * @type {Vector2}
     */
    position: Vector2 = new Vector2(0, 0);

    /**
     * The size of this tile.
     * @type {Vector2}
     */
    size: Vector2 = new Vector2(10, 10);

    /**
     * The rotation of this tile.
     */
    rotation: number = 0;

    /**
     * The color of this tile.
     * @type {Color}
     */
    color: Color = new Color(255, 255, 255, 255);

    /**
     * Create a new `Tile`.
     * @constructor
     * @param {Vector2} position The position of this tile.
     * @param {Vector2} size The size of this tile.
     * @param {Color} color The color of this tile.
     */
    constructor(position: Vector2, size: Vector2, color: Color) {
        this.position = position;
        this.size = size;
        this.color = color;
    }

    draw(p: p5) {
        p.push();
        p.fill(...this.color.toArray());
        p.noStroke();
        p.rect(this.position.x, this.position.y, this.size.x, this.size.y);
        p.pop();
    }

    /**
     * Check if a point is contained in this tile.
     * @param {Vector2} point The point to check if it is contained. 
     * @returns {boolean} Whether this tile contains the point
     */
    contains(point: Vector2): boolean {
        return (
            point.x >= this.position.x &&
            point.x <= this.position.x + this.size.x &&
            point.y >= this.position.y &&
            point.y <= this.position.y + this.size.y
        );
    }

    /**
     * Checks if another `Tile` collides with this one.
     * @param {Tile} tile The tile to check collision with.
     * @returns {boolean} Whether it collides
     */
    collidesWith(tile: Tile): boolean {
        return (
            this.position.x < tile.position.x + tile.size.x &&
            this.position.x + this.size.x > tile.position.x &&
            this.position.y < tile.position.y + tile.size.y &&
            this.position.y + this.size.y > tile.position.y
        );
    }
}
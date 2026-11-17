/**
 * Cell, used for gameplay instead of decoration.
 * @class
 * @extends Tile
 */
class Cell extends Tile {
    /**
     * The layer this cell is on.
     */
    layer: number;

    /**
     * The weight of this cell. Determines how hard other cells have to push.
     */
    weight: number;

    /**
     * Whether the cell is collidable or not. Determines if this can even collide with other cells.
     */
    collidable: boolean;

    /**
     * Whether the cell is movable or not. Determines if this can even move due to other cells.
     */
    movable: boolean;

    /**
     * Create a new `Cell`.
     * @constructor
     * @param {Vector2} position The position of the cell
     * @param {Vector2} size The size of the cell
     * @param {Color} color The color of the cell
     * @param {number} layer The layer of the cell to determine the cells it can collide with
     * @param {number} weight The weight of the cell
     * @param {boolean} collidable Whether the cell can collide with other cells
     * @param {boolean} movable Whether the cell is movable by other cells
     */
    constructor(position: Vector2, size: Vector2, color: Color, layer: number, weight: number, collidable: boolean, movable: boolean) {
        super(position, size, color);

        this.layer = layer;
        this.weight = weight;
        this.collidable = collidable;
        this.movable = movable;
    }

    /**
     * Update this cell.
     * @param {Game} game The game this cell should be attached to
     */
    update(game: Game) {
    }

    /**
     * Move this cell, while trying to move other cells.
     * @param {Game} game The game this cell should be attached to
     * @param {Vector2} delta How much it will move
     * @param {number} power How hard it will push
     * @returns 
     */
    move(game: Game, delta: Vector2, power: number) {
        const visited = new Set<Cell>();
        const toMove: Cell[] = [];

        const canMoveChain = (cell: Cell): boolean => {
            if (visited.has(cell)) return true;
            visited.add(cell);

            const future = new Tile(
                new Vector2(cell.position.x + delta.x, cell.position.y + delta.y),
                cell.size,
                cell.color
            );

            const blockers = game.cells.filter(other =>
                other !== cell &&
                other.layer === cell.layer &&
                other.collidable &&
                future.collidesWith(other)
            );

            for (const blocker of blockers) {
                if (!canMoveChain(blocker) || !blocker.movable) return false;
            }

            toMove.push(cell);
            return true;
        };

        if (!canMoveChain(this)) return;

        const totalWeight = toMove.reduce((sum, cell) => cell !== this ? sum + cell.weight : sum, 0);

        if (totalWeight > power) return;

        for (const cell of toMove) {
            cell.position.x += delta.x;
            cell.position.y += delta.y;
        }
    }

    draw(p: p5) {
        super.draw(p);
        if (this.collidable && this.movable && this.weight !== undefined) {
            p.push();

            p.fill(255, 255);
            p.stroke(0, 255);

            p.text(this.weight.toString(), this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);

            p.pop();
        }
    }
}
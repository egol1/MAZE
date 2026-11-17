/**
 * Class for satisfiable cells who require {@link Player} cells.
 * @extends SatisfiableCell
 */
class Finish extends SatisfiableCell {
    /**
     * @type {Cell}
     * @param {boolean} needsSatisfaction Whether or not this cell needs satisfaction.
     */
    constructor(position: Vector2, size: Vector2, layer: number, needsSatisfaction: boolean) {
        super(position, size, new Color(0, 255, 128, 255), layer, 1, false, false, needsSatisfaction);
    }

    update(game: Game) {
        this.satisfied = game.cells.filter(cell =>
            cell.layer === this.layer &&
            cell.collidesWith(this) &&
            cell instanceof Player
        ).length > 0;
    }
}
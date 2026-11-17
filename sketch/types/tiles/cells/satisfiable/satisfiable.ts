/**
 * Class for cells that can be satisfied.
 * @class
 * @extends Cell
 */
class SatisfiableCell extends Cell {
    needsSatisfaction: boolean = true;
    satisfied: boolean = false;

    /**
     * @type {Cell}
     */
    constructor(position: Vector2, size: Vector2, color: Color, layer: number, weight: number, collidable: boolean, movable: boolean, needsSatisfaction: boolean) {
        super(position, size, color, layer, weight, collidable, movable);

        this.satisfied = false;
        this.needsSatisfaction = needsSatisfaction;
    }
}
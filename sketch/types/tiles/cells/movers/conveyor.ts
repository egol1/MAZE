/**
 * Conveyor to push movables around.
 * @extends Cell
 */
class Conveyor extends Cell {
    /**
     * The direction to push colliding cells.
     */
    direction: Vector2 = new Vector2(0, 0);

    /**
     * The force to push the colliding cells with.
     */
    power: number = 1;

    /**
     * @type {Cell}
     * @param {Vector2} direction The direction to push colliding cells.
     * @param {number} power The force to push the colliding cells with.
     */
    constructor(position: Vector2, size: Vector2, layer: number, direction: Vector2, power: number) {
        super(position, size, new Color(0, 0, 255, 255), layer, 1, false, false);
        this.direction = direction;
        this.power = power;
    }

    update(game: Game) {
        game.cells.filter(cell =>
            cell.layer === this.layer &&
            cell !== this &&
            cell.collidesWith(this) &&
            cell.movable &&
            cell.collidable
        ).forEach(cell => cell.move(game, this.direction, this.power));
    }

    draw(p: p5) {
        super.draw(p);

        p.push();

        p.rotate(this.rotation);
        p.fill(0, 0, 0, 255);
        p.noStroke();

        p.push();

        p.translate(this.position.x + (this.size.x / 2), this.position.y + (this.size.y / 2));
        p.rotate(this.direction.angle());
        p.scale(0.75);

        p.beginShape();
        p.vertex(-this.size.x / 2, -this.size.y / 2);
        p.vertex(-this.size.x / 4, 0);
        p.vertex(-this.size.x / 2, this.size.y / 2);
        p.vertex(this.size.x / 2, 0);
        p.endShape();

        p.pop();

        p.stroke(this.color.r, this.color.g, this.color.b, this.color.a / 2);
        p.translate(this.position.x + (this.size.x / 2), this.position.y + (this.size.y / 2));
        p.line(0, 0, this.direction.x, this.direction.y);

        p.pop();
    }
}
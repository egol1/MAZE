/**
 * Player cell.
 * @extends InputtableCell
 */

class Player extends InputtableCell {
    /**
     * How much weight the cell can push before being unable to.
     */
    pushForce: number = 1;

    /**
     * @type {Cell}
     */
    constructor(position: Vector2, size: Vector2, layer: number) {
        super(position, size, new Color(255, 0, 0, 255), layer, 2, true, true);
    }

    draw(p: p5) {
        p.push();

        p.fill(...this.color.toArray());
        p.noStroke();
        p.ellipse(this.position.x, this.position.y, this.size.x, this.size.y);

        p.fill(255, 255);
        p.stroke(0, 255);
        p.text(this.weight.toString(), this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);

        p.pop();
    }

    handleInput(game: Game, key: string) {
        let moveFactor: Vector2 = new Vector2(0, 0);
        switch (key) {
            case "w":
                moveFactor = new Vector2(0, -1);
                break;
            case "a":
                moveFactor = new Vector2(-1, 0);
                break;
            case "s":
                moveFactor = new Vector2(0, 1);
                break;
            case "d":
                moveFactor = new Vector2(1, 0);
                break;
            default:
                break;
        }

        this.move(game, new Vector2(this.size.x * moveFactor.x, this.size.y * moveFactor.y).rotate(this.rotation), this.pushForce + 1);
    }
}
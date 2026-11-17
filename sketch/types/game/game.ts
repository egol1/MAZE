class Game {
    cells: Cell[] = [];
    definitions: { [key: number | string]: (position: Vector2, size: Vector2, layer: number) => Cell } = {
        1.1: (position, size, layer) => {
            return new Cell(position, size, Color.fromGray(255, 255), layer, 1, true, false);
        },
        1.2: (position, size, layer) => {
            return new Finish(position, size, layer, true);
        },
        1.3: (position, size, layer) => {
            return new Cell(position, size, Color.fromGray(128, 255), layer, 1, true, true);
        },
        1.4: (position, size, layer) => {
            return new Pedestal(position, size, layer, true);
        },
        211: (position, size, layer) => {
            return new Conveyor(position, size, layer, new Vector2(0, -size.y), 1);
        },
        212: (position, size, layer) => {
            return new Conveyor(position, size, layer, new Vector2(size.x, 0), 1);
        },
        213: (position, size, layer) => {
            return new Conveyor(position, size, layer, new Vector2(0, size.y), 1);
        },
        214: (position, size, layer) => {
            return new Conveyor(position, size, layer, new Vector2(-size.x, 0), 1);
        },
        3.1: (position, size, layer) => {
            return new Player(position, size, layer);
        },
        100: (position, size, layer) => {
            return new Cell(position, size, Color.fromGray(128, 255), layer, 1, true, true);
        },
    };
    updateKeys: string[] = ["space", "w", "a", "s", "d", "up", "left", "down", "right"];


    constructor() { }

    draw(p: p5) {
        this.cells.forEach(cell => cell instanceof SatisfiableCell && cell.draw(p));
        this.cells.forEach(cell => cell instanceof InputtableCell && cell.draw(p));
        this.cells.forEach(cell => !(cell instanceof InputtableCell) && !(cell instanceof SatisfiableCell) && cell.draw(p));
    }

    update(p: gameP5) {
        this.cells.forEach(cell => {
            cell.update(this);
        });

        if (this.checkSatisfied(p)) p.onLevelClear();
    }

    checkSatisfied(p: p5): boolean {
        let satisfiable: SatisfiableCell[] = this.cells.filter(cell => cell instanceof SatisfiableCell);
        satisfiable = satisfiable.filter(cell => cell.needsSatisfaction);
        return satisfiable.length === satisfiable.filter(cell => cell.satisfied).length;
    }

    loadLevel(p: p5, level: Level) {
        this.cells = [];
        console.log("Level:", level);

        p.resizeCanvas(level.canvasSize.x, level.canvasSize.y);

        let allDefinitions: { [key: number | string]: (position: Vector2, size: Vector2, layer: number) => Cell } = { ...this.definitions, ...level.definitions }
        let x: number, y: number = 0;
        level.layers.forEach((layer: LevelLayer) => {
            y = 0;
            layer.cells.forEach((cellNumberRow: number[]) => {
                x = 0;
                cellNumberRow.forEach((cellNumber: number) => {
                    if (allDefinitions[cellNumber]) this.cells.push(allDefinitions[cellNumber](
                        new Vector2(x * layer.cellSize.x, y * layer.cellSize.y),
                        layer.cellSize,
                        layer.layer,
                    ));
                    x++;
                });
                y++;
            });
        });
    }

    keyPressed(p: gameP5, code: number) {
        let char: string = InputHandler.fromCode(code);
        this.cells.filter(cell => cell instanceof InputtableCell).forEach(cell => {
            cell.handleInput(this, char);
        });
        if (this.updateKeys.includes(char)) this.update(p);
    }

    getCellsAt(cell: Cell) {
        return this.cells.filter(other => other.collidesWith(cell) && other !== cell && other.layer === cell.layer);
    }
}
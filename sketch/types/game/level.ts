class LevelLayer {
    cells: (number[])[] = [[]];
    cellSize: Vector2 = new Vector2(10, 10);
    position: Vector2 = new Vector2(0, 0);
    layer: number = 0;
}

class Level {
    layers: LevelLayer[] = [];
    canvasSize: Vector2 = new Vector2(100, 100);
    definitions?: { [key: number | string]: (position: Vector2, size: Vector2, layer: number) => Cell } = {};
}
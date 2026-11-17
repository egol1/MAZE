let main = function (p: gameP5) {
  let game: Game;
  let levels: { levels: Level[] };
  let levelIndex: number = 0;
  let finished: boolean = false;

  p.preload = function () {
    levels = p.loadJSON("sketch/data/levels.json", {}, 'json') as { levels: Level[] };
    levelIndex = 0;
  }

  p.setup = function () {
    // Source - https://stackoverflow.com/a/55507887
    // Posted by Phil, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-11-16, License - CC BY-SA 4.0

    document.getElementById('download')?.addEventListener('click', () => {
      let dl = document.createElement('a')
      dl.download = 'levels.json' // target filename
      dl.href = `data:application/json;charset=utf-8,${JSON.stringify(levels)}`
      dl.click()
    })
    p.createCanvas(100, 100);
    p.frameRate(60);

    p.ellipseMode(p.CORNER);
    p.rectMode(p.CORNER);
    p.angleMode(p.DEGREES);
    p.textAlign(p.CENTER, p.CENTER);

    game = new Game();
    game.loadLevel(p, levels.levels[levelIndex]);
  }

  p.draw = function () {
    if (finished) {
      p.background(0);

      p.push();
      p.resizeCanvas(64, 64);
      p.fill(255, 255, 255);
      p.stroke(0, 0, 0);

      p.textSize(32);
      p.text("Fin", this.width / 2, this.height / 2);

      p.pop();

      return;
    }

    p.background(0);
    game.draw(p);

    p.push();
    p.fill(255, 255);
    p.stroke(0, 255);
    p.textAlign(p.LEFT, p.TOP);
    p.text(levelIndex + 1, 5, 5);
    p.pop();
  }

  p.keyPressed = function () {
    game.keyPressed(p, p.keyCode);
  }

  p.onLevelClear = function () {
    console.log(levelIndex, levels.levels.length - 1);
    if (++levelIndex > levels.levels.length - 1) {
      console.log("Finished!");
      finished = true;

      game.cells = [];
      return;
    }

    game.loadLevel(p, levels.levels[levelIndex]);
  }
}

class gameP5 extends p5 {
  onLevelClear() { }
}

let mainP5 = new gameP5(main);
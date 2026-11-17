"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var main = function (p) {
    var game;
    var levels;
    var levelIndex = 0;
    var finished = false;
    p.preload = function () {
        levels = p.loadJSON("sketch/data/levels.json", {}, 'json');
        levelIndex = 0;
    };
    p.setup = function () {
        document.getElementById('download').addEventListener('click', function () {
            var dl = document.createElement('a');
            dl.download = 'levels.json';
            dl.href = "data:application/json;charset=utf-8,".concat(JSON.stringify(levels));
            dl.click();
        });
        p.createCanvas(100, 100);
        p.frameRate(60);
        p.ellipseMode(p.CORNER);
        p.rectMode(p.CORNER);
        p.angleMode(p.DEGREES);
        p.textAlign(p.CENTER, p.CENTER);
        game = new Game();
        game.loadLevel(p, levels.levels[levelIndex]);
    };
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
    };
    p.keyPressed = function () {
        game.keyPressed(p, p.keyCode);
    };
    p.onLevelClear = function () {
        console.log(levelIndex, levels.levels.length - 1);
        if (++levelIndex > levels.levels.length - 1) {
            console.log("Finished!");
            finished = true;
            game.cells = [];
            return;
        }
        game.loadLevel(p, levels.levels[levelIndex]);
    };
};
var gameP5 = (function (_super) {
    __extends(gameP5, _super);
    function gameP5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    gameP5.prototype.onLevelClear = function () { };
    return gameP5;
}(p5));
var mainP5 = new gameP5(main);
var InputHandler = (function () {
    function InputHandler() {
    }
    InputHandler.fromCode = function (code) {
        var _a;
        return (_a = InputHandler.keyOverrides[code]) !== null && _a !== void 0 ? _a : String.fromCharCode(code).toLocaleLowerCase();
    };
    InputHandler.keyOverrides = {
        9: "tab",
        13: "enter",
        16: "shift",
        17: "control",
        18: "alt",
        32: "space",
        37: "a",
        38: "w",
        39: "d",
        40: "s",
    };
    return InputHandler;
}());
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Color = (function () {
    function Color(r, g, b, a) {
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.a = 255;
        this.r = Color.clamp(r);
        this.g = Color.clamp(g);
        this.b = Color.clamp(b);
        this.a = Color.clamp(a);
    }
    Color.fromArray = function (arr) {
        return new (Color.bind.apply(Color, __spreadArray([void 0], arr, false)))();
    };
    Color.fromObject = function (dict) {
        return new Color(dict.r, dict.g, dict.b, dict.a);
    };
    Color.fromGray = function (v, a) {
        if (a === void 0) { a = 255; }
        return new Color(v, v, v, a);
    };
    Color.fromHSV = function (h, s, v, a) {
        var r = 0, g = 0, b = 0;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a !== null && a !== void 0 ? a : 255);
    };
    Color.clamp = function (v) {
        return Math.min(Math.max(0, v), 255);
    };
    Color.add = function (a, b) {
        return new Color(a.r + b.r, a.g + b.g, a.b + b.b, a.a + b.a);
    };
    Color.prototype.clamp = function () {
        return new Color(Color.clamp(this.r), Color.clamp(this.g), Color.clamp(this.b), Color.clamp(this.a));
    };
    Color.prototype.toString = function () {
        return "r: ".concat(this.r, ", g: ").concat(this.g, ", b: ").concat(this.b, ", a: ").concat(this.a);
    };
    Color.prototype.toObject = function () {
        return { r: this.r, g: this.g, b: this.b, a: this.a };
    };
    Color.prototype.toArray = function () {
        return [this.r, this.g, this.b, this.a];
    };
    Color.prototype.toGray = function () {
        var mono = Math.round(0.299 * this.r + 0.587 * this.g + 0.114 * this.b);
        return new Color(mono, mono, mono, this.a);
    };
    Color.prototype.toHSV = function () {
        var r = this.r / 255, g = this.g / 255, b = this.b / 255;
        var h = 0, s = 0, v = 0;
        var cMax = Math.max(this.r, Math.max(this.g, this.b)), cMin = Math.min(this.r, Math.min(this.g, this.b));
        var delta = cMax - cMin;
        if (cMax == cMin)
            h = 0;
        else if (cMax == r)
            h = (60 * ((g - b) / delta) + 360) % 360;
        else if (cMax == g)
            h = (60 * ((b - r) / delta) + 120) % 360;
        else if (cMax == b)
            h = (60 * ((r - g) / delta) + 240) % 360;
        if (cMax == 0)
            s = 0;
        else
            s = (delta / cMax) * 100;
        v = cMax * 100;
        return {
            h: h,
            s: s,
            v: v,
        };
    };
    return Color;
}());
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Game = (function () {
    function Game() {
        this.cells = [];
        this.definitions = {
            1.1: function (position, size, layer) {
                return new Cell(position, size, Color.fromGray(255, 255), layer, 1, true, false);
            },
            1.2: function (position, size, layer) {
                return new Finish(position, size, layer, true);
            },
            1.3: function (position, size, layer) {
                return new Cell(position, size, Color.fromGray(128, 255), layer, 1, true, true);
            },
            1.4: function (position, size, layer) {
                return new Pedestal(position, size, layer, true);
            },
            211: function (position, size, layer) {
                return new Conveyor(position, size, layer, new Vector2(0, -size.y), 1);
            },
            212: function (position, size, layer) {
                return new Conveyor(position, size, layer, new Vector2(size.x, 0), 1);
            },
            213: function (position, size, layer) {
                return new Conveyor(position, size, layer, new Vector2(0, size.y), 1);
            },
            214: function (position, size, layer) {
                return new Conveyor(position, size, layer, new Vector2(-size.x, 0), 1);
            },
            3.1: function (position, size, layer) {
                return new Player(position, size, layer);
            },
            100: function (position, size, layer) {
                return new Cell(position, size, Color.fromGray(128, 255), layer, 1, true, true);
            },
        };
        this.updateKeys = ["space", "w", "a", "s", "d", "up", "left", "down", "right"];
    }
    Game.prototype.draw = function (p) {
        this.cells.forEach(function (cell) { return cell instanceof SatisfiableCell && cell.draw(p); });
        this.cells.forEach(function (cell) { return cell instanceof InputtableCell && cell.draw(p); });
        this.cells.forEach(function (cell) { return !(cell instanceof InputtableCell) && !(cell instanceof SatisfiableCell) && cell.draw(p); });
    };
    Game.prototype.update = function (p) {
        var _this = this;
        this.cells.forEach(function (cell) {
            cell.update(_this);
        });
        if (this.checkSatisfied(p))
            p.onLevelClear();
    };
    Game.prototype.checkSatisfied = function (p) {
        var satisfiable = this.cells.filter(function (cell) { return cell instanceof SatisfiableCell; });
        satisfiable = satisfiable.filter(function (cell) { return cell.needsSatisfaction; });
        return satisfiable.length === satisfiable.filter(function (cell) { return cell.satisfied; }).length;
    };
    Game.prototype.loadLevel = function (p, level) {
        var _this = this;
        this.cells = [];
        console.log("Level:", level);
        p.resizeCanvas(level.canvasSize.x, level.canvasSize.y);
        var allDefinitions = __assign(__assign({}, this.definitions), level.definitions);
        var x, y = 0;
        level.layers.forEach(function (layer) {
            y = 0;
            layer.cells.forEach(function (cellNumberRow) {
                x = 0;
                cellNumberRow.forEach(function (cellNumber) {
                    if (allDefinitions[cellNumber])
                        _this.cells.push(allDefinitions[cellNumber](new Vector2(x * layer.cellSize.x, y * layer.cellSize.y), layer.cellSize, layer.layer));
                    x++;
                });
                y++;
            });
        });
    };
    Game.prototype.keyPressed = function (p, code) {
        var _this = this;
        var char = InputHandler.fromCode(code);
        this.cells.filter(function (cell) { return cell instanceof InputtableCell; }).forEach(function (cell) {
            cell.handleInput(_this, char);
        });
        if (this.updateKeys.includes(char))
            this.update(p);
    };
    Game.prototype.getCellsAt = function (cell) {
        return this.cells.filter(function (other) { return other.collidesWith(cell) && other !== cell && other.layer === cell.layer; });
    };
    return Game;
}());
var LevelLayer = (function () {
    function LevelLayer() {
        this.cells = [[]];
        this.cellSize = new Vector2(10, 10);
        this.position = new Vector2(0, 0);
        this.layer = 0;
    }
    return LevelLayer;
}());
var Level = (function () {
    function Level() {
        this.layers = [];
        this.canvasSize = new Vector2(100, 100);
        this.definitions = {};
    }
    return Level;
}());
var Tile = (function () {
    function Tile(position, size, color) {
        this.position = new Vector2(0, 0);
        this.size = new Vector2(10, 10);
        this.rotation = 0;
        this.color = new Color(255, 255, 255, 255);
        this.position = position;
        this.size = size;
        this.color = color;
    }
    Tile.prototype.draw = function (p) {
        p.push();
        p.fill.apply(p, this.color.toArray());
        p.noStroke();
        p.rect(this.position.x, this.position.y, this.size.x, this.size.y);
        p.pop();
    };
    Tile.prototype.contains = function (point) {
        return (point.x >= this.position.x &&
            point.x <= this.position.x + this.size.x &&
            point.y >= this.position.y &&
            point.y <= this.position.y + this.size.y);
    };
    Tile.prototype.collidesWith = function (tile) {
        return (this.position.x < tile.position.x + tile.size.x &&
            this.position.x + this.size.x > tile.position.x &&
            this.position.y < tile.position.y + tile.size.y &&
            this.position.y + this.size.y > tile.position.y);
    };
    return Tile;
}());
var Cell = (function (_super) {
    __extends(Cell, _super);
    function Cell(position, size, color, layer, weight, collidable, movable) {
        var _this = _super.call(this, position, size, color) || this;
        _this.layer = layer;
        _this.weight = weight;
        _this.collidable = collidable;
        _this.movable = movable;
        return _this;
    }
    Cell.prototype.update = function (game) {
    };
    Cell.prototype.move = function (game, delta, power) {
        var _this = this;
        var visited = new Set();
        var toMove = [];
        var canMoveChain = function (cell) {
            if (visited.has(cell))
                return true;
            visited.add(cell);
            var future = new Tile(new Vector2(cell.position.x + delta.x, cell.position.y + delta.y), cell.size, cell.color);
            var blockers = game.cells.filter(function (other) {
                return other !== cell &&
                    other.layer === cell.layer &&
                    other.collidable &&
                    future.collidesWith(other);
            });
            for (var _i = 0, blockers_1 = blockers; _i < blockers_1.length; _i++) {
                var blocker = blockers_1[_i];
                if (!canMoveChain(blocker) || !blocker.movable)
                    return false;
            }
            toMove.push(cell);
            return true;
        };
        if (!canMoveChain(this))
            return;
        var totalWeight = toMove.reduce(function (sum, cell) { return cell !== _this ? sum + cell.weight : sum; }, 0);
        if (totalWeight > power)
            return;
        for (var _i = 0, toMove_1 = toMove; _i < toMove_1.length; _i++) {
            var cell = toMove_1[_i];
            cell.position.x += delta.x;
            cell.position.y += delta.y;
        }
    };
    Cell.prototype.draw = function (p) {
        _super.prototype.draw.call(this, p);
        if (this.collidable && this.movable && this.weight !== undefined) {
            p.push();
            p.fill(255, 255);
            p.stroke(0, 255);
            p.text(this.weight.toString(), this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
            p.pop();
        }
    };
    return Cell;
}(Tile));
var InputtableCell = (function (_super) {
    __extends(InputtableCell, _super);
    function InputtableCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputtableCell.prototype.handleInput = function (game, key) { };
    return InputtableCell;
}(Cell));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(position, size, layer) {
        var _this = _super.call(this, position, size, new Color(255, 0, 0, 255), layer, 2, true, true) || this;
        _this.pushForce = 1;
        return _this;
    }
    Player.prototype.draw = function (p) {
        p.push();
        p.fill.apply(p, this.color.toArray());
        p.noStroke();
        p.ellipse(this.position.x, this.position.y, this.size.x, this.size.y);
        p.fill(255, 255);
        p.stroke(0, 255);
        p.text(this.weight.toString(), this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
        p.pop();
    };
    Player.prototype.handleInput = function (game, key) {
        var moveFactor = new Vector2(0, 0);
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
    };
    return Player;
}(InputtableCell));
var Conveyor = (function (_super) {
    __extends(Conveyor, _super);
    function Conveyor(position, size, layer, direction, power) {
        var _this = _super.call(this, position, size, new Color(0, 0, 255, 255), layer, 1, false, false) || this;
        _this.direction = new Vector2(0, 0);
        _this.power = 1;
        _this.direction = direction;
        _this.power = power;
        return _this;
    }
    Conveyor.prototype.update = function (game) {
        var _this = this;
        game.cells.filter(function (cell) {
            return cell.layer === _this.layer &&
                cell !== _this &&
                cell.collidesWith(_this) &&
                cell.movable &&
                cell.collidable;
        }).forEach(function (cell) { return cell.move(game, _this.direction, _this.power); });
    };
    Conveyor.prototype.draw = function (p) {
        _super.prototype.draw.call(this, p);
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
    };
    return Conveyor;
}(Cell));
var SatisfiableCell = (function (_super) {
    __extends(SatisfiableCell, _super);
    function SatisfiableCell(position, size, color, layer, weight, collidable, movable, needsSatisfaction) {
        var _this = _super.call(this, position, size, color, layer, weight, collidable, movable) || this;
        _this.needsSatisfaction = true;
        _this.satisfied = false;
        _this.satisfied = false;
        _this.needsSatisfaction = needsSatisfaction;
        return _this;
    }
    return SatisfiableCell;
}(Cell));
var Finish = (function (_super) {
    __extends(Finish, _super);
    function Finish(position, size, layer, needsSatisfaction) {
        return _super.call(this, position, size, new Color(0, 255, 128, 255), layer, 1, false, false, needsSatisfaction) || this;
    }
    Finish.prototype.update = function (game) {
        var _this = this;
        this.satisfied = game.cells.filter(function (cell) {
            return cell.layer === _this.layer &&
                cell.collidesWith(_this) &&
                cell instanceof Player;
        }).length > 0;
    };
    return Finish;
}(SatisfiableCell));
var Pedestal = (function (_super) {
    __extends(Pedestal, _super);
    function Pedestal(position, size, layer, needsSatisfaction) {
        return _super.call(this, position, size, new Color(0, 0, 255, 255), layer, 1, false, false, needsSatisfaction) || this;
    }
    Pedestal.prototype.update = function (game) {
        var _this = this;
        this.satisfied = game.cells.filter(function (cell) {
            return cell.layer === _this.layer &&
                cell.collidesWith(_this) &&
                cell.movable &&
                !(cell instanceof Player) &&
                cell !== _this;
        }).length > 0;
    };
    return Pedestal;
}(SatisfiableCell));
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    Vector2.fromArray = function (arr) {
        return new Vector2(arr[0], arr[1]);
    };
    Vector2.fromObject = function (dict) {
        return new Vector2(dict.x, dict.y);
    };
    Vector2.fromPolar = function (r, a) {
        return new Vector2(0, r).rotate((a * 180) / Math.PI);
    };
    Vector2.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector2.magnitude = function (v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };
    Vector2.prototype.angle = function () {
        return Math.atan2(this.y, this.x) * (180 / Math.PI);
    };
    Vector2.prototype.rotate = function (degrees) {
        var r = degrees * (Math.PI / 180);
        return new Vector2(this.x * Math.cos(r) - this.y * Math.sin(r), this.x * Math.sin(r) + this.y * Math.cos(r));
    };
    Vector2.prototype.rotateAroundPoint = function (pivot, angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var dx = this.x - pivot.x;
        var dy = this.y - pivot.y;
        return new Vector2(cos * dx - sin * dy + pivot.x, sin * dx + cos * dy + pivot.y);
    };
    Vector2.prototype.dot = function (v) {
        return (this.x * v.x) + (this.y * v.y);
    };
    Vector2.dot = function (v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y);
    };
    Vector2.prototype.project = function (v) {
        var bMagSquared = v.magnitude() * v.magnitude();
        if (bMagSquared === 0)
            return new Vector2(0, 0);
        var scalar = (this.dot(v)) / bMagSquared;
        return new Vector2(scalar * v.x, scalar * v.y);
    };
    Vector2.project = function (v1, v2) {
        var bMagSquared = v2.magnitude() * v2.magnitude();
        if (bMagSquared === 0)
            return new Vector2(0, 0);
        var scalar = (v1.dot(v2)) / bMagSquared;
        return new Vector2(scalar * v2.x, scalar * v2.y);
    };
    Vector2.prototype.scalarProject = function (v) {
        var bMag = Math.abs(v.magnitude());
        if (bMag === 0)
            return bMag;
        return this.dot(v) / bMag;
    };
    Vector2.scalarProject = function (v1, v2) {
        var bMag = Math.abs(v2.magnitude());
        if (bMag === 0)
            return bMag;
        return v1.dot(v2) / bMag;
    };
    Vector2.prototype.cross = function (v) {
        return this.x * v.y - this.y * v.x;
    };
    Vector2.cross = function (v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    };
    Vector2.prototype.toString = function () {
        return "".concat(this.x, ", ").concat(this.y);
    };
    Vector2.prototype.toObject = function () {
        return { x: this.x, y: this.y };
    };
    Vector2.prototype.toArray = function () {
        return [this.x, this.y];
    };
    return Vector2;
}());
//# sourceMappingURL=build.js.map
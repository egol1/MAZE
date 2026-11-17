/**
 * Class for a vector with 2.
 * Only uses degrees.
 */
class Vector2 {
    /**
     * X value of this vector.
     */
    x: number = 0;

    /**
     * Y value of this vector.
     */
    y: number = 0;

    /**
     * Creates a `Vector2`.
     * @constructor
     * @param {number} x X
     * @param {number} y Y
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Creates a `Vector2` from an array.
     * @param {readonly [number, number]} arr Array with 2 numbers
     * @returns {Vector2} A new Vector2
     */
    static fromArray(arr: readonly [number, number]): Vector2 {
        return new Vector2(arr[0], arr[1]);
    }

    /**
     * Creates a `Vector2` from an object.
     * @param {{ x: number, y: number }} dict Dictionary with numbers .x, and .y
     * @returns {Vector2} A new Vector2
     */
    static fromObject(dict: { x: number, y: number }): Vector2 {
        return new Vector2(dict.x, dict.y);
    }

    /**
     * Creates a `Vector2` from polar coordinates.
     * @param {number} r Radius
     * @param {number} a Angle in radians
     */
    static fromPolar(r: number, a: number) {
        return new Vector2(0, r).rotate((a * 180) / Math.PI);
    }

    /**
     * Get the magnitude of this vector.
     * @returns {number} The magnitude
     */
    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * Get the magnitude of the vector.
     * @param {Vector2} v The vector
     * @returns {number} The magnitude
     */
    static magnitude(v: Vector2): number {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }


    /**
     * Get the angle of this vector.
     * @returns {number} The angle
     */
    angle(): number {
        return Math.atan2(this.y, this.x) * (180 / Math.PI);
    }

    /**
     * Creates a vector rotated `degrees` amount.
     * @param {number} degrees Rotation in degrees
     * @returns {Vector2} The Vector2, but rotated `degrees` amount.
     */
    rotate(degrees: number): Vector2 {
        const r = degrees * (Math.PI / 180);

        return new Vector2(
            this.x * Math.cos(r) - this.y * Math.sin(r),
            this.x * Math.sin(r) + this.y * Math.cos(r)
        )
    }

    /**
     * Rotates a point around a pivot.
     * @param pivot The pivot of the rotation.
     * @param angle The rotation in degrees.
     */
    rotateAroundPoint(pivot: Vector2, angle: number): Vector2 {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const dx = this.x - pivot.x;
        const dy = this.y - pivot.y;

        return new Vector2(
            cos * dx - sin * dy + pivot.x,
            sin * dx + cos * dy + pivot.y
        );
    }

    /**
     * Calculates the dot product of this vector and the other vector.
     * @param {Vector2} v The other vector
     * @returns {number} The dot product of this and other
     */
    dot(v: Vector2): number {
        return (this.x * v.x) + (this.y * v.y);
    }
    /**
     * Calculates the dot product of two vectors.
     * @param {Vector2} v1 The first vector
     * @param {Vector2} v2 The second vector
     * @returns {number} The dot product of the first and the second vector
     */
    static dot(v1: Vector2, v2: Vector2): number {
        return (v1.x * v2.x) + (v1.y * v2.y);
    }

    /**
     * Calculates the projection of this onto the other vector.
     * @param {Vector2} v The other vector
     * @returns {Vector2} The projection of this onto the other vector
     */
    project(v: Vector2): Vector2 {
        const bMagSquared = v.magnitude() * v.magnitude();
        if (bMagSquared === 0) return new Vector2(0, 0);

        const scalar = (this.dot(v)) / bMagSquared;

        return new Vector2(scalar * v.x, scalar * v.y);
    }
    /**
     * Calculates the projection of two vectors.
     * @param {Vector2} v1 The first vector
     * @param {Vector2} v2 The second vector
     * @returns {Vector2} The projection of the first onto the second vector
     */
    static project(v1: Vector2, v2: Vector2): Vector2 {
        const bMagSquared = v2.magnitude() * v2.magnitude();
        if (bMagSquared === 0) return new Vector2(0, 0);

        const scalar = (v1.dot(v2)) / bMagSquared;

        return new Vector2(scalar * v2.x, scalar * v2.y);
    }

    /**
     * Calculates the scalar projection of this onto the other vetor.
     * @param {Vector2} v The other vector
     * @returns {Number} The length of the projection of this onto other
     */
    scalarProject(v: Vector2): Number {
        const bMag = Math.abs(v.magnitude());
        if (bMag === 0) return bMag;

        return this.dot(v) / bMag;
    }
    /**
     * Get the scalar projection of v1 onto v2.
     * @param {Vector2} v1 The first vector
     * @param {Vector2} v2 The second vector
     * @returns {Number} The length of the projection of v1 onto v2
     */
    static scalarProject(v1: Vector2, v2: Vector2): Number {
        const bMag = Math.abs(v2.magnitude());
        if (bMag === 0) return bMag;

        return v1.dot(v2) / bMag;
    }

    /**
     * Calculates the cross product of this onto the other vector.
     * @param {Vector2} v The other vector
     * @returns {Number} The cross product of this with the other vector
     */
    cross(v: Vector2): number {
        return this.x * v.y - this.y * v.x;
    }
    /**
     * Calculates the cross product of v1 and v2.
     * @param {Vector2} v1 The first vector
     * @param {Vector2} v1 The second vector
     * @returns {Number} The cross product of v1 and v2
     */
    static cross(v1: Vector2, v2: Vector2): number {
        return v1.x * v2.y - v1.y * v2.x;
    }

    /**
     * Convert this vector into a string.
     * @returns {string}
     */
    toString(): string {
        return `${this.x}, ${this.y}`;
    }

    /**
     * Convert this vector into an object.
     * @returns {{ x: number, y: number }} 
     */
    toObject(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }

    /**
     * Convert this vector into an array.
     * @returns {[number, number]} 
     */
    toArray(): [number, number] {
        return [this.x, this.y];
    }
}
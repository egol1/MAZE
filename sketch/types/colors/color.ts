/**
 * Class representing `Color`.
 */
class Color {
    /**
     * Red value (0 - 255)
     */
    r: number = 255;

    /**
     * Green value (0 - 255)
     */
    g: number = 255;

    /**
     * Blue value (0 - 255)
     */
    b: number = 255;

    /**
     * Alpha value (0 - 255)
     */
    a: number = 255;

    /**
     * Creates a `Color`.
     * @constructor
     * @param {number} r Red (0 - 255)
     * @param {number} g Green (0 - 255)
     * @param {number} b Blue (0 - 255)
     * @param {number} a Alpha (0 - 255)
     */
    constructor(r: number, g: number, b: number, a: number) {
        this.r = Color.clamp(r);
        this.g = Color.clamp(g);
        this.b = Color.clamp(b);
        this.a = Color.clamp(a);
    }

    /**
     * Creates a `Color` from an array.
     * @param {readonly [number, number, number, number]} arr Array with 4 numbers (0 - 255)
     */
    static fromArray(arr: readonly [number, number, number, number]): Color {
        return new Color(...arr);
    }

    /**
     * Creates a `Color` from an object.
     * @param {{ r: number, g: number, b: number, a: number }} dict Dictionary with numbers .r, .g, .b and .a (0 - 255)
     */
    static fromObject(dict: { r: number, g: number, b: number, a: number }): Color {
        return new Color(dict.r, dict.g, dict.b, dict.a);
    }

    /**
     * Creates a `Color` from a grey color.
     * @param {number} v Value (0 - 255)
     * @param {number} a Alpha (0 - 255)
     */
    static fromGray(v: number, a: number = 255): Color {
        return new Color(v, v, v, a);
    }

    /**
     * Creates a `Color` from HSV to RGBA.
     * @param {number} h Hue [0 - 360]
     * @param {number} s Saturation [0 - 100]
     * @param {number} v Value [0 - 100]
     * @returns {Color} The RGB `Color`
     */
    static fromHSV(h: number, s: number, v: number): Color
    /**
     * Creates a `Color` from HSVA to RGBA.
     * @param {number} h Hue [0 - 360]
     * @param {number} s Saturation [0 - 100]
     * @param {number} v Value [0 - 100]
     * @param {number} a Alpha [0 - 255] (Default: 255)
     * @returns {Color} The RGB `Color`
     */
    static fromHSV(h: number, s: number, v: number, a: number): Color
    static fromHSV(h: number, s: number, v: number, a?: number): Color {
        let r: number = 0, g: number = 0, b: number = 0;
        let i: number = Math.floor(h * 6);
        let f: number = h * 6 - i;
        let p: number = v * (1 - s);
        let q: number = v * (1 - f * s);
        let t: number = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return new Color(
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255),
            a ?? 255
        );
    }

    /**
     * Clamp a number to [0 - 255].
     * @param {number} v Value
     * @returns {number} Value clamped to [0 - 255]
     */
    private static clamp(v: number): number {
        return Math.min(Math.max(0, v), 255);
    }

    /**
     * Add 2 `Color`s together.
     * Clamped to [0 - 255]
     * @param {Color} a Color 1
     * @param {Color} b Color 2
     */
    static add(a: Color, b: Color): Color {
        return new Color(
            a.r + b.r,
            a.g + b.g,
            a.b + b.b,
            a.a + b.a
        );
    }

    /**
     * Clamp this color to (0 - 255).
     * @returns {Color} The clamped color
     */
    clamp(): Color {
        return new Color(
            Color.clamp(this.r),
            Color.clamp(this.g),
            Color.clamp(this.b),
            Color.clamp(this.a)
        );
    }

    /**
     * Convert this color to a string.
     * @returns {string}
     */
    toString(): string {
        return `r: ${this.r}, g: ${this.g}, b: ${this.b}, a: ${this.a}`;
    }

    /**
     * Convert this color to an object with .r, .g, .b and .a.
     * @returns {{ r: number, g: number, b: number, a: number }}
     */
    toObject(): { r: number, g: number, b: number, a: number } {
        return { r: this.r, g: this.g, b: this.b, a: this.a };
    }

    /**
     * Convert this color to an array.
     * @returns {[number, number, number, number]}
     */
    toArray(): [number, number, number, number] {
        return [this.r, this.g, this.b, this.a];
    }

    /**
     * Convert this color to a monochromatic/gray color.
     * @returns {Color}
     */
    toGray(): Color {
        const mono = Math.round(0.299 * this.r + 0.587 * this.g + 0.114 * this.b);
        return new Color(
            mono,
            mono,
            mono,
            this.a,
        )
    }

    /**
     * Convert this color to a HSV dictionary.
     * @returns {{ h: number, s: number, v: number }}
     */
    toHSV(): { h: number, s: number, v: number } {
        let r: number = this.r / 255, g: number = this.g / 255, b: number = this.b / 255;
        let h: number = 0, s: number = 0, v: number = 0;

        let cMax: number = Math.max(this.r, Math.max(this.g, this.b)), cMin: number = Math.min(this.r, Math.min(this.g, this.b));
        let delta: number = cMax - cMin;

        if (cMax == cMin) h = 0;
        else if (cMax == r) h = (60 * ((g - b) / delta) + 360) % 360;
        else if (cMax == g) h = (60 * ((b - r) / delta) + 120) % 360;
        else if (cMax == b) h = (60 * ((r - g) / delta) + 240) % 360;

        if (cMax == 0) s = 0;
        else s = (delta / cMax) * 100;

        v = cMax * 100;

        return {
            h,
            s,
            v,
        };
    }
}
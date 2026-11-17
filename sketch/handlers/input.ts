class InputHandler {
    static keyOverrides: { [key: number]: string } = {
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

    static fromCode(code: number) {
        return InputHandler.keyOverrides[code] ?? String.fromCharCode(code).toLocaleLowerCase();
    }
}
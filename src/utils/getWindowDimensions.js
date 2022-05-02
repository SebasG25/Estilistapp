/**
 * The function getWindowDimensions() returns an object with the properties width and height, which are
 * assigned the values of the innerWidth and innerHeight properties of the window object.
 * @returns An object with two properties, width and height.
 */
export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
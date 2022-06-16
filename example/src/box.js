const createBox = (className) => {
    const box = document.createElement('div');
    box.setAttribute('class', `box ${className}`);
    return box;
}
export default createBox;
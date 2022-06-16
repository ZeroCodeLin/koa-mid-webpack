import createBox from './box';

const log = (msg) => {
    console.log(msg);
}

const root = document.getElementById('root');

const renderBoxes = (...boxes) => {
    boxes.forEach(box => root.appendChild(box))
}


renderBoxes(createBox('red'), createBox('blue'), createBox('green'));

log('render box success!')
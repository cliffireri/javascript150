const refreshButton = document.querySelector('.refresh-btn');
const container = document.querySelector('.container');
const maxPaletteBoxes = 32;
const generatePalette = () => {
    container.innerHTML = ""
    for(let i = 0; i < maxPaletteBoxes; i++) {
        let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
        randomHex = `#${randomHex.padStart(6, "0")}`;

        const color = document.createElement('li');
        color.classList.add('color');
        color.innerHTML = `
            <div class="rect-box" style="background:${randomHex}"></div>
            <span class="hex-value">${randomHex}</span>
        `
        color.addEventListener("click", () => copyColor(color, randomHex))

        container.appendChild(color)
    }    
    
}

const copyColor = (ele, hexValue) => {
    const colorElement = ele.querySelector('.hex-value');
    navigator.clipboard.writeText(hexValue).then(() => {
        colorElement.textContent = "COPIED";
        setTimeout(() => colorElement.textContent = hexValue, 1000);
    }).catch(e => alert("Failed to copy the color code"))
    
    
}

generatePalette();

refreshButton.addEventListener('click', generatePalette)
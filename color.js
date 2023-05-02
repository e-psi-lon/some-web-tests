const sliders = document.querySelectorAll('input[type="range"]');
const colorDiv = document.querySelector('#color-box');

const updateColor = () => {
    const red = sliders[0].value;
    sliders[0].previousElementSibling.innerText =  `Rouge (${red})`;
    const green = sliders[1].value;
    sliders[1].previousElementSibling.innerText = `Vert (${green})`;
    const blue = sliders[2].value;
    sliders[2].previousElementSibling.innerText = `Bleu (${blue})`;
    colorDiv.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    sliders[0].style.backgroundImage = `linear-gradient(to right, rgb(${red}, 0, 0), rgb(255, ${green}, ${blue}))`;
    sliders[1].style.backgroundImage = `linear-gradient(to right, rgb(0, ${green}, 0), rgb(${red}, 255, ${blue}))`;
    sliders[2].style.backgroundImage = `linear-gradient(to right, rgb(0, 0, ${blue}), rgb(${red}, ${green}, 255))`;
}

sliders.forEach(slider => slider.addEventListener('input', updateColor))
updateColor();
colorDiv.addEventListener('contextmenu', (event) => {
    if (document.querySelector('.custom-menu')) {
        document.querySelector('.custom-menu').remove();
    }
    event.preventDefault(); 
    const customMenu = document.createElement('div'); 
    customMenu.classList.add('custom-menu');
    customMenu.innerHTML = '<ul><li>Copy Hex</li><li>Copy RGB</li></ul>'; 
    document.body.appendChild(customMenu); 
    customMenu.style.position = 'fixed'; 
    customMenu.style.top = `${event.clientY}px`;
    customMenu.style.left = `${event.clientX}px`;

    const copyHexOption = customMenu.querySelector('li:first-child'); 
    const copyRgbOption = customMenu.querySelector('li:last-child'); 

    copyHexOption.addEventListener('click', () => {
        navigator.clipboard.writeText(`#${Number(sliders[0].value).toString(16)}${Number(sliders[1].value).toString(16)}${Number(sliders[2].value).toString(16)}`); 
        customMenu.remove();
    });
    copyRgbOption.addEventListener('click', () => {
        navigator.clipboard.writeText(`${sliders[0].value}, ${sliders[1].value}, ${sliders[2].value}`); 
        customMenu.remove();
    });
    document.addEventListener('click', (event) => {
        if (!customMenu.contains(event.target)) {
        customMenu.remove();
        }
    });
});
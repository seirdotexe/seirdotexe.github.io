const buttonBezier = document.querySelector('button[name="bezier_button"]');
const buttonCatmullRom = document.querySelector('button[name="catmullrom_button"]');
const buttonStop = document.querySelector('button[name="luxor_stop"]');

buttonBezier.addEventListener('click', () => (buttonBezier.disabled = true, buttonCatmullRom.disabled = true));
buttonCatmullRom.addEventListener('click', () => (buttonBezier.disabled = true, buttonCatmullRom.disabled = true));
buttonStop.addEventListener('click', () => (buttonBezier.disabled = false, buttonCatmullRom.disabled = false));
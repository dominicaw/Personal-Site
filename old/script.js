let themeSwitcher = document.querySelector('[name="theme-switch"]');
let body = document.body;

themeSwitcher.addEventListener('change', () => {
    if (themeSwitcher.checked) { 
       body.classList.add('light-theme');
       body.classList.remove('dark-theme'); 
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme'); 
    }
});

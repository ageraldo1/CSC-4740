var days = 7;
var kwh_cost = 0.0018

let btn_days = [document.querySelector('#dt_today'), document.querySelector('#dt_week'), document.querySelector('#dt_month'), document.querySelector('#dt_tri'), document.querySelector('#dt_sem'), document.querySelector('#dt_year')];

function setDefaults() {
    let kwh = document.querySelector('#kwh_cost');
    let btn = document.querySelector('#dt_week');

    kwh.value = kwh_cost;    
    kwh.addEventListener('change', (e) => {
        kwh_cost = e.target.value;
        init();
    });

    btn.classList.add('active');
}

function addBntEventListener(){
    btn_days.forEach(btn => {
        btn.addEventListener('click', handleDaySelectionEvent);
    })
}

function handleDaySelectionEvent() {
    days = this.value;

    btn_days.forEach(btn => {
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
        }
    });

    this.classList.add('active');
    init();
}

let selectUnit = document.querySelector("#selectUnit").addEventListener('change', (e) => {
    init();
});

function toggleSpinner() {
    let spinner = document.querySelector('#loader');

    if (spinner.style.display === 'none'){
        spinner.style.display = 'block'

    } else {
        spinner.style.display = 'none'
    }

}
setDefaults();
addBntEventListener();

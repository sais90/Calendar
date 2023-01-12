window.onload = start;
function start() {
    let calendar1 = new Calendar();
    calendar1.render(this.now2);
    // calendar1.render(this.datePointed);
}

class Calendar {
    constructor() {
        this.now = new Date();
        //this.now = new Date(2022, 3, 28);
        this.today = this.now.getDate();
        this.year = this.now.getFullYear();
        this.month = this.now.getMonth();
        this.firstDayOfCurrentMonth = new Date(this.year, this.month, 1);
        // this.dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        this.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
            'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        this.monthNamesCase = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля',
            'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        // this.datePointed = new Date(this.now);

        this.now2 = new Date(this.now);
        
    }

    changePrevMonth = () => {
        this.firstDayOfCurrentMonth.setMonth(this.firstDayOfCurrentMonth.getMonth() - 1);
        this.render();
    }

    changeNextMonth = () => {
        this.firstDayOfCurrentMonth.setMonth(this.firstDayOfCurrentMonth.getMonth() + 1);
        this.render();
    }

    createPrevButton = () => {
        let button_prev = document.getElementById('button-prev');
        button_prev.addEventListener('click', this.changePrevMonth);
    }

    createNextButton = () => {
        let button_next = document.getElementById('button-next');
        button_next.addEventListener('click', this.changeNextMonth);

        document.getElementById('wrapper-table').innerHTML = null;
    }

    createFullDate = () => {
        document.getElementById('date-selected').innerHTML = this.now2.getDate() + ' ' + this.monthNamesCase[this.now2.getMonth()] + ' ' + this.now2.getFullYear();
    }
    // createFullDate = (datePointed) => {
    //     document.getElementById('date-selected').innerHTML = datePointed.getDate() + ' ' + this.monthNamesCase[datePointed.getMonth()] + ' ' + datePointed.getFullYear();
    // }

    createCurrentMonthFrame = () => {
        document.getElementById('month-current').innerHTML = this.monthNames[this.firstDayOfCurrentMonth.getMonth()];
    }

    createCurrentYearFrame = () => {
        document.getElementById('year-current').innerHTML = this.firstDayOfCurrentMonth.getFullYear();
    }

    createTable = () => {
        for (let i = 0; i < 6; i++) {
            let weekString = document.createElement('div');
            weekString.className = 'week-string';
            weekString.id = `string-week-${i}`;
            document.getElementById('wrapper-table').appendChild(weekString);
            for (let j = 1; j < 8; j++) {
                let td = document.createElement('div');
                td.className = 'td';
                td.id = `td-${i*6 + i + j}`;
                document.getElementById(`string-week-${i}`).appendChild(td);
            }
        }
    }

    fillTable = () => {

        let date = new Date(this.firstDayOfCurrentMonth.getTime() + 1);
        date.setDate(this.firstDayOfCurrentMonth.getDate() - this.firstDayOfCurrentMonth.getDay() + 1);

        if (date.getDate() === 2) {
            date.setDate(date.getDate() - 7);
        }

        for (let i = 1; i < 43; i++) {

            let td = document.getElementById(`td-${i}`);
            td.append(date.getDate());  

            if (date.getMonth() === this.firstDayOfCurrentMonth.getMonth()) {
                td.classList.add('this-month-day');
            }

            // if (date.getMonth() === this.firstDayOfCurrentMonth.getMonth() - 1) {
            //     td.classList.add('prev-month-day');
            // }

            // if (date.getMonth() === this.firstDayOfCurrentMonth.getMonth() + 1) {
            //     td.classList.add('next-month-day');
            // }


            if (date.getDate() === this.now .getDate() && date.getMonth() === this.now.getMonth() && date.getFullYear() === this.now.getFullYear()) {
                td.classList.add('today');
            }

            let datePointed = new Date(date);

            if (datePointed.getDate() === this.now.getDate() && datePointed.getMonth() === this.now.getMonth() && datePointed.getFullYear() === this.now.getFullYear()) {
                td.classList.add('today-pointed-active');
            };
             
            td.onclick = () => {
                this.setPointedDate(td, datePointed);
            }; 

            date.setDate(date.getDate() + 1);
        }
    }

    setPointedDate = (td, datePointed) => {
        let selectedElements = document.getElementsByClassName('current-date');
        Array.from(selectedElements).forEach((elem) => elem.classList.remove('current-date'));
        let todayPointed = document.getElementsByClassName('today-pointed-active');
        Array.from(todayPointed).forEach((elem) => elem.classList.remove('today-pointed-active'));

        td.classList.add('current-date');

        if (datePointed.getDate() === this.now.getDate() && datePointed.getMonth() === this.now.getMonth() && datePointed.getFullYear() === this.now.getFullYear()) {
            //code is valid, need to work with style
            td.classList.add('today-pointed-active')
        }
         

        if ((datePointed.getMonth() === this.firstDayOfCurrentMonth.getMonth() - 1) || (datePointed.getFullYear() === this.firstDayOfCurrentMonth.getFullYear() - 1)) {
            console.log('hi');
            this.changePrevMonth();
        }

        if ((datePointed.getMonth() === this.firstDayOfCurrentMonth.getMonth() + 1) || (datePointed.getFullYear() === this.firstDayOfCurrentMonth.getFullYear() + 1)) {
            console.log('bye');
            this.changeNextMonth();
        }

        this.now2 = datePointed;


        this.createFullDate(this.now2);
        // this.createFullDate(datePointed);
        
    }




    // fillTable = () => {

    //     let date = new Date(this.firstDayOfCurrentMonth.getTime() + 1);
    //     date.setDate(this.firstDayOfCurrentMonth.getDate() - this.firstDayOfCurrentMonth.getDay());

    //     let i = 0;
    //     do {
    //         let weekString = document.createElement('div');
    //         weekString.className = 'week-string';
    //         weekString.id = `string-week-${i}`;
    //         document.getElementById('wrapper-table').appendChild(weekString);

    //         if (date.getDate() === 2) {
    //             continue;
    //         }

    //         for (let j = 0; j < 7; j++) {

    //             let day = document.createElement('div');
    //             day.classList.add('day');

    //             document.getElementById(`string-week-${i}`).appendChild(day);

    //             let currentDate = new Date(date.getTime());
    //             day.onclick = () => {
    //                 this.pointedDate = currentDate;
    //                 let selectedElements = document.getElementsByClassName('current-date');
    //                 Array.from(selectedElements).forEach((elem) => elem.classList.remove('current-date'));
                    
    //                 let selectedToday = document.getElementsByClassName('today-pointed-active');
    //                 Array.from(selectedToday).forEach((elem) => elem.classList.remove('today-pointed-active'));

    //                 document.getElementById('date-selected').innerHTML =
    //                 currentDate.getDate() + ' ' + this.monthNamesCase[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
                    
    //                 if (this.pointedDate.getMonth() === this.firstDayOfCurrentMonth.getMonth() - 1) {
    //                     this.firstDayOfCurrentMonth.setMonth(this.firstDayOfCurrentMonth.getMonth() - 1);
    //                     this.render();
    //                 }

    //                 if (this.pointedDate.getMonth() === this.firstDayOfCurrentMonth.getMonth() + 1) {
    //                     this.firstDayOfCurrentMonth.setMonth(this.firstDayOfCurrentMonth.getMonth() + 1);
    //                     this.render();
    //                 }
                    
    //                 day.classList.add('current-date');
    //             }

    //             day.innerHTML = date.getDate();

    //             if (date.getDate() === this.today && date.getMonth() === this.now.getMonth() && date.getFullYear() === this.now.getFullYear()) {
    //                 let todayPointed = document.createElement('div');
    //                 day.append(todayPointed);
    //                 day.classList.add('today');
    //                 todayPointed.classList.add('today-pointed');

    //                 if (this.pointedDate === this.now) {
    //                     todayPointed.classList.add('today-pointed-active');
    //                 }

    //                 let currentDate = new Date(date.getTime());

    //                 day.onclick = () => {
    //                     let selectedElements = document.getElementsByClassName('current-date');
    //                     Array.from(selectedElements).forEach((elem) => elem.classList.remove('current-date'));
    
    //                     todayPointed.classList.add('today-pointed-active');
    //                     document.getElementById('date-selected').innerHTML =
    //                     currentDate.getDate() + ' ' + this.monthNamesCase[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
    //                 }
    //             }

    //             if (date.getMonth() === this.firstDayOfCurrentMonth.getMonth()) {
    //                 day.classList.add('this-month-day');
    //             }

    //             if (date.getDate() === this.pointedDate.getDate() && date.getMonth() === this.pointedDate.getMonth() && date.getFullYear() === this.pointedDate.getFullYear()) {
    //                 day.classList.add('current-date');
    //             }

    //             date.setDate(date.getDate() + 1);
    //         }
    //         i++;
    //     } while (date.getMonth() === this.firstDayOfCurrentMonth.getMonth());
    // }

    // backToPointedDate = () => {
    //     let headerDate = document.getElementById('date-selected');
    //     headerDate.onclick = () => {
    //         this.firstDayOfCurrentMonth.setMonth(this.pointedDate.getMonth());
    //         this.firstDayOfCurrentMonth.setFullYear(this.pointedDate.getFullYear());
    //         this.render();
    //     }
    // }

    render = () => {
        this.createPrevButton(this.now2);
        this.createNextButton();
        this.createFullDate(this.now2);
        // this.createFullDate(this.datePointed);
        this.createCurrentMonthFrame();
        this.createCurrentYearFrame();
        this.createTable();
        this.fillTable();
        // this.backToPointedDate();
    }
}

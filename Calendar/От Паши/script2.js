window.onload = start;


function start () {
    let calendar1 = new Calendar();
    calendar1.render();
    }


class Calendar {
    constructor() {
        this.now = new Date();

        this.year = this.now.getFullYear();
        this.month = this.now.getMonth();

        this.firstDayOfCurrentMonth = new Date(this.year, this.month, 1);
        this.selectedDate = this.now;

        this.dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    }

    // searchFirstDayOfCalendar = () => {

    // }

    changePrevMonth = () => {
        this.firstDayOfCurrentMonth.setMonth(this.firstDayOfCurrentMonth.getMonth() - 1);
        this.render();
    }

    changeNextMonth = () => {
        this.firstDayOfCurrentMonth.setMonth(this.firstDayOfCurrentMonth.getMonth() + 1);
        this.render();
    }

    creatPrevButton = () => {
        let button_prev = document.getElementById('button-prev');
        button_prev.addEventListener('click', this.changePrevMonth);
    }

    creatNextButton = () => {
        let button_next = document.getElementById('button-next');
        button_next.addEventListener('click', this.changeNextMonth);

        let calendarWrapper = document.getElementById('wrapper-calendar');
        calendarWrapper.innerHTML = null
    }

    creatTable = () => {
        let calendarWrapper = document.getElementById('wrapper-calendar');


        let weekday = document.createElement('div');
        weekday.className = 'weekday';

        this.dayNames.forEach(name => {
            let td = document.createElement('div');
            td.className = 'td';
            td.innerHTML = name;
            weekday.append(td);
        })

        calendarWrapper.appendChild(weekday);

    }

    render = () => {
        console.log('render')
        this.creatPrevButton();
        this.creatNextButton();
        this.creatTable();
        this.fillTable();
    }

    fillTable = () => {
        console.log('fillTable')

        let date = new Date(this.firstDayOfCurrentMonth.getTime());
        date.setDate(this.firstDayOfCurrentMonth.getDate() - this.firstDayOfCurrentMonth.getDay() + 1);

        console.log(date);


        // let date = this.firstDayOfCurrentMonth.setDate(this.firstDayOfCurrentMonth.getDate() - this.firstDayOfCurrentMonth.getDay());

        for (let i = 0; i === 0 || date.getMonth() === this.firstDayOfCurrentMonth.getMonth(); i++) {



            let weekString = document.createElement('div');
            weekString.className = 'week-string';
            weekString.id = `string-week-${i}`;
            document.getElementById('wrapper-calendar').appendChild(weekString);


            // this.calendarWrapper.appendChild(weekString);
            // weekString.innerHTML = 'hi';

            for (let j = 0; j < 7; j++) {
                // let date = this.firstDayOfCurrentMonth;
                // date.setDate(this.firstDayOfCurrentMonth.getDate() - this.firstDayOfCurrentMonth.getDay());


                let day = document.createElement('div');
                day.className = 'day';
                document.getElementById(`string-week-${i}`).appendChild(day);


                day.innerHTML = date.getDate()

                date.setDate(date.getDate() + 1)
            }
        }
    }

}

// let calendar1 = new Calendar();
// calendar1.render();

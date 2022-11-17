window.onload = render;

function render() {
    let currentMonthIndex = 0;

    showCurrentMonth();

    function showCurrentMonth() {
        document.getElementsByTagName("body")[0].innerHTML = "";
        let currentMonth = new Calendar({ n: currentMonthIndex });
        currentMonth.start();
        creatPrevButton();
        creatNextButton();
    }

    function showPrevMonth() {
        currentMonthIndex--;
        showCurrentMonth();
    }
    function showNextMonth() {
        currentMonthIndex++;
        showCurrentMonth();
    }

    function creatPrevButton() {
        let button_prev = document.getElementById('button-prev');
        button_prev.addEventListener('click', showPrevMonth);
    }

    function creatNextButton() {
        let button_next = document.getElementById('button-next');
        button_next.addEventListener('click', showNextMonth);
    }
}

class Calendar {
    constructor({ n }) {
        this.n = n;
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getUTCMonth() + this.n;
        this.today = this.date.getDate();
        this.first_day_of_current_month = new Date(this.year, this.month, 1);
        this.first_wday_of_current_month = this.first_day_of_current_month.getDay();
        this.oneHour = 1000 * 60 * 60;
        this.oneDay = this.oneHour * 24;
        this.nextMonth = new Date(this.year, this.month + 1, 1);
        this.number_of_days_of_current_month = Math.ceil((this.nextMonth.getTime() - this.first_day_of_current_month.getTime()) / this.oneDay);

        this.prevMonth = new Date(this.year, this.month - 1, 1);
        this.last_day_of_prev_month = Math.ceil((this.first_day_of_current_month.getTime() - this.prevMonth.getTime()) / this.oneDay);

        this.first_wday_of_next_month = this.nextMonth.getDay();


        this.last_day_of_current_month = new Date(this.year, this.month, this.number_of_days_of_current_month);

        this.last_wday_of_current_month = this.last_day_of_current_month.getDay();

        this.month_array = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        this.month_array_case = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
            "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];


    }

    creatTable() {
        let body = document.getElementsByTagName("body")[0];

        let wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        let header = document.createElement("div");
        header.className = "header";

        let month_slider = document.createElement("div");
        month_slider.className = "month-slider";

        let day_table = document.createElement("table");
        day_table.className = "calendar";

        body.appendChild(wrapper);

        wrapper.appendChild(header);
        wrapper.appendChild(month_slider);
        wrapper.appendChild(day_table);



        // day_table.innerHTML = "<tr  colspan=7 rowspan=1  id='month'>"+this.month_array[this.month]+"</tr>"+
        // "<tr class='weekday'><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr>";



        header.innerHTML = this.today + " " + this.month_array_case[this.month] + " " + this.year + " г." + "<hr>";

        month_slider.innerHTML = "<button id='button-prev'> < </button>" + this.month_array[this.month] + " " + this.year +
            "<button id='button-next'> > </button>";

        day_table.innerHTML = "<tr class='weekday'><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr>";
        // day_table.innerHTML = "<tr><td colspan=7 rowspan=1 id='month'>"+this.month_array[this.month]+"</td></tr>"+
        // "<tr class='weekday'><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr>";


        for (let k = 0; k < 6; k++) {
            day_table.innerHTML += "<tr class='weekline'><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        }
    }


    fillTable() {
        for (let i = 1; i < this.number_of_days_of_current_month; i++) {
            let td_d = document.getElementsByTagName("td");
            if (i == this.first_wday_of_current_month) {
                for (let j = 0; j < this.number_of_days_of_current_month; j++) {
                    td_d[6 + i + j].innerHTML = 1 + j;
                    td_d[6 + i + j].className = "day-of-month";
                }

                for (let z = 0; z < this.number_of_days_of_current_month; z++) {
                    if (td_d[z].innerHTML == this.today) {
                        td_d[z].className = "today";
                    }
                }
            }
        }
        //заполняем сначала
        for (let i = 1; i < this.first_wday_of_current_month; i++) {
            let td_d = document.getElementsByTagName("td");
            td_d[i + 6].innerHTML = this.last_day_of_prev_month - this.first_wday_of_current_month + (i + 1);
        }
        //заполняем в конце
        for (let i = 7; i > this.last_wday_of_current_month; i--) {
            let td_d = document.getElementsByTagName("td");
            td_d[i + 41].innerHTML = i - 1;
        }
    }

    start() {
        this.creatTable();
        this.fillTable();
    }
}

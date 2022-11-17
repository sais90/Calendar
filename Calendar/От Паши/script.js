window.onload = () => {
    const calendar = new Calendar();
    calendar.render()
};



class Calendar {
    constructor() {
    this.date  = new Date();
    this.year = this.date.getFullYear();
    // this.month = this.date.getUTCMonth() + this.n;
    this.month = this.date.getUTCMonth() + 1;

    this.today = this.date.getDate();



    this.first_day_of_current_month = new Date(this.year, this.month, 1);
    this.first_wday_of_current_month = this.first_day_of_current_month.getDay();
    this.oneHour = 1000 * 60 * 60;
    this.oneDay = this.oneHour * 24;
    // this.nextMonth = this.first_day_of_current_month.setMonth(this.first_day_of_current_month.getMonth() + 1);
    this.number_of_days_of_current_month = Math.ceil((this.first_day_of_current_month.getTime() - this.first_day_of_current_month.getTime()) / this.oneDay);

    // this.prevMonth = this.first_day_of_current_month.setMonth(this.first_day_of_current_month.getMonth() - 1);
    this.last_day_of_prev_month = Math.ceil((this.first_day_of_current_month.getTime() - this.first_day_of_current_month.getTime()) / this.oneDay);

    this.first_wday_of_next_month = this.first_day_of_current_month.getDay();


    this.last_day_of_current_month = new Date(this.year, this.month, this.number_of_days_of_current_month);

    this.last_wday_of_current_month = this.last_day_of_current_month.getDay();

    this.month_array = ["Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

    this.month_array_case = ["Января","Февраля","Марта","Апреля","Мая","Июня",
    "Июля","Августа","Сентября","Октября","Ноября","Декабря"];


    }

    creatTable () {
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

        month_slider.innerHTML = "<button id='button-prev'> < </button>"+this.month_array[this.month] + " " + this.year+
        "<button id='button-next'> > </button>";

        day_table.innerHTML = "<tr class='weekday'><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr>";
        // day_table.innerHTML = "<tr><td colspan=7 rowspan=1 id='month'>"+this.month_array[this.month]+"</td></tr>"+
        // "<tr class='weekday'><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr>";


        for (let k = 0; k < 6; k++) {
            day_table.innerHTML += "<tr class='weekline'><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        }





    }


    fillTable () {
        for (let i=1; i < this.number_of_days_of_current_month; i++) {
            let td_d = document.getElementsByTagName("td");
            if (i == this.first_wday_of_current_month) {
                for (let j=0; j < this.number_of_days_of_current_month; j++) {
                    td_d[6+i+j].innerHTML = 1+j;
                    td_d[6+i+j].className = "day-of-month";
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
            td_d[i+6].innerHTML = this.last_day_of_prev_month - this.first_wday_of_current_month + (i+1);
        }
        //заполняем в конце
        for (let i = 7; i > this.last_wday_of_current_month; i--) {
            let td_d = document.getElementsByTagName("td");
            td_d[i+41].innerHTML = i-1;
        }
    }

    start () {
        // this.creatStructure();
        this.creatTable();
        // this.creatPrevButton();
        // this.creatNextButton();
        this.fillTable();
    }

     showPrevMonth=() => {

        this.first_day_of_current_month.setMonth(this.first_day_of_current_month.getMonth() - 1);
        this.start();
        this.creatPrevButton();
        this.creatNextButton();
    }

showNextMonth =() => {

        this.first_day_of_current_month.setMonth(this.first_day_of_current_month.getMonth() + 1);
        this.start();
        this.creatPrevButton();
        this.creatNextButton();
    }

     creatPrevButton () {
        let button_prev = document.getElementById ('button-prev');
        button_prev.addEventListener('click', this.showPrevMonth);
    }

     creatNextButton () {
        let button_next = document.getElementById ('button-next');
        button_next.addEventListener('click', this.showNextMonth);
    }

    dayNames = ['ПН', 'ВТ', 'СР'];

    creat123 = () => {
        let calendar = document.getElementsByTagName('body')[0];

        console.log(calendar)

        this.dayNames.forEach(name => {
            const td = document.createElement("td")
            td.innerHTML = name;
            calendar.append(td)
        })
    }

    render() {
        console.log(this.first_day_of_current_month)








        this.start();

        this.creatPrevButton();

        this.creatNextButton();

        this.creat123()



        }
}



class Calendar1 {
    constructor() {
        this.now = new Date();
        this.firstDayOfCurrentMonth = new Date(this.year, this.month, 1);
        this.selectedDate = this.now;

        this.dayNames = ['ПН', 'ВТ']
    }

    changeNextMonth = () => {
        this.firstDayOfCurrentMonth.setMonth(this.firstDayOfCurrentMonth.getMonth() + 1);
        this.render()
    }

    changePrevMonth = () => {
        this.firstDayOfCurrentMonth.setMonth(this.firstDayOfCurrentMonth.getMonth() - 1);
        this.render()
    }

    selectDay = () => {
        this.firstDayOfCurrentMonth.setMonth(this.firstDayOfCurrentMonth.getMonth() - 1);
        this.render()
    }

    creatPrevButton = () => {
        let button_prev = document.getElementById('button-prev');
        button_prev.addEventListener('click', this.changeNextMonth);
    }

    creatNextButton = () => {
        let button_next = document.getElementById('button-next');
        button_next.addEventListener('click', this.changePrevMonth);
    }

    creatHeader = () => {

    }

    creatTable = () => {
        let weekday = document.createElement("weekday")

        this.dayNames.forEach(name => {
            const td = document.createElement("td")
            td.innerHTML = name;
            weekday.append(td)
        })
    }

    render = () => {
        this.creatPrevButton();
        this.creatNextButton();
        this.creatTable()
    }


    fillTable () {
        // первый день календаря (понедельник)
        let date =


        for (let i = 0; i === 0 || date.getMonth() === this.firstDayOfCurrentMonth.getMonth; i++) {
            // строим недели



                for (let j = 0; j < 7; j++) {
                    // строим дни
                    date.setDate(date.getDate() + 1)
                }



            }
        }

    }
}


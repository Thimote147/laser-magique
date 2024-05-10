const moment = require('moment');
const Calendar = require("../../models/Calendar.js");

function generateCalendar(year, month, option) {
    let calendar = [];

    const firstDayOfMonth = moment(`${year}-${month}-01`, 'YYYY-MM-DD');

    const daysInMonth = firstDayOfMonth.daysInMonth();

    const startingDayOfWeek = firstDayOfMonth.day();

    let currentWeek = [];

    for (let i = 1; i < startingDayOfWeek; i++) {
        currentWeek.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let people;

        if (option === "working") {
            if (day < 10) {
                people = Calendar.working(year + "-" + month + "-0" + day);
            } else {
                people = Calendar.working(year + "-" + month + "-" + day);
            }
        } else {
            if (day < 10) {
                people = Calendar.notWorking(year + "-" + month + "-0" + day);
            } else {
                people = Calendar.notWorking(year + "-" + month + "-" + day);
            }
        }

        let addPeople = [];

        for (let i = 0; i < people.length; i++) {
            if (option === "working") {
                addPeople.push(people[i].beginning_day.split('T')[1] + " : " + people[i].member);
            } else {
                addPeople.push(people[i].member);
            }
        }

        currentWeek.push({ date: day, people: addPeople });

        if (currentWeek.length === 7) {
            calendar.push(currentWeek);
            currentWeek = [];
        }
    }

    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push(null);
        }
        calendar.push(currentWeek);
    }

    return calendar;
}

function formatDateTime(dateTime) {
    if (dateTime.length === 5) {
        dateTime = new Date().toISOString().split("T")[0] + "T" + dateTime;
    }

    if ((new Date(dateTime).toLocaleTimeString().split(" ")[1] == "AM" && new Date(dateTime).toLocaleTimeString().slice(0, 1) != 12) || (new Date(dateTime).toLocaleTimeString().split(" ")[1] == "PM" && new Date(dateTime).toLocaleTimeString().slice(0, 1) == 12)) {
        if (parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 2)) < 10) {
            dateTime = new Date(dateTime).toISOString().split("T")[0] + "T0" + (parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 1)) % 12) + new Date(dateTime).toLocaleTimeString().slice(1, 4);
        } else {
            if (parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 2)) == 12) {
                dateTime = new Date(dateTime).toISOString().split("T")[0] + "T0" + (parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 2)) % 12) + new Date(dateTime).toLocaleTimeString().slice(2, 5);
            } else {
                dateTime = new Date(dateTime).toISOString().split("T")[0] + "T" + (parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 2)) % 12) + new Date(dateTime).toLocaleTimeString().slice(2, 5);
            }
        }
    } else {
        if (parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 2)) < 10) {
            dateTime = new Date(dateTime).toISOString().split("T")[0] + "T" + (12 + parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 1))) + new Date(dateTime).toLocaleTimeString().slice(1, 4);
        } else {
            if (parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 2)) == 12) {
                dateTime = new Date(dateTime).toISOString().split("T")[0] + "T" + parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 2)) + new Date(dateTime).toLocaleTimeString().slice(2, 5);
            } else {
                dateTime = new Date(dateTime).toISOString().split("T")[0] + "T" + (12 + parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 2))) + new Date(dateTime).toLocaleTimeString().slice(2, 5);
            }
        }
    }
    return dateTime;
};

function formatHour(dateTime) {
    const date = new Date(dateTime);
    if (date.getMinutes() < 10) {
        return `${date.getHours()}:0${date.getMinutes()}`;
    } else {
        return `${date.getHours()}:${date.getMinutes()}`;
    }
};

function forToday(reservations) {
    let forToday = [];

    reservations.forEach((reservation) => {
        if (today(reservation.date) === true) {
            reservation.date = formatHour(reservation.date);
            forToday.push(reservation);
        };
    });

    return forToday;
};

function price(persons, activities, nbr_laser, nbr_vr, nbr_ct, soft, aquarius, capri_sun, chips, pop_corn, bonbon, deposit, payment_bcc, payment_cash) {
    let price;

    if (activities === "Laser Game") {
        if (nbr_laser == 0) {
            nbr_laser = 1;
        }
        nbr_vr = 0;
        nbr_ct = 0;
        price = 8 * persons * nbr_laser;
    } else if (activities === "Réalité Virtuelle") {
        if (nbr_vr == 0) {
            nbr_vr = 1;
        }
        nbr_laser = 0;
        nbr_ct = 0;
        price = 10 * persons * nbr_vr
    } else if (activities === "Cyber Games") {
        if (nbr_ct == 0) {
            nbr_ct = 1;
        }
        nbr_laser = 0;
        nbr_vr = 0;
        price = 20 * persons * nbr_ct
    } else if (activities === "Anniversaire Laser Game") {
        if (nbr_laser != 3) {
            nbr_laser = 3;
        }
        nbr_vr = 0;
        nbr_ct = 0;

        if (persons <= 10) {
            price = 200;
        } else {
            price = 20 * persons;
        }
    } else if (activities === "Anniversaire Trio Pack") {
        if (nbr_laser != 1) {
            nbr_laser = 1;
        }
        if (nbr_vr != 1) {
            nbr_vr = 1;
        }
        if (nbr_ct != 1) {
            nbr_ct = 1;
        }

        if (persons <= 8) {
            price = 280;
        } else {
            price = 35 * persons;
        }
    }
    else if (activities === "Famille Trio Pack") {
        if (nbr_laser != 1) {
            nbr_laser = 1;
        }
        if (nbr_vr != 1) {
            nbr_vr = 1;
        }
        if (nbr_ct != 1) {
            nbr_ct = 1;
        }
        price = 35 * persons;
    } else if (activities === "Laser Game + Réalité Virtuelle") {
        if (nbr_laser == 0) {
            nbr_laser = 1;
        }
        if (nbr_vr == 0) {
            nbr_vr = 1;
        }
        nbr_ct = 0;

        price = ((8 * nbr_laser) + (10 * nbr_vr)) * persons;
    } else if (activities === "Laser Game + Cyber Games") {
        if (nbr_laser == 0) {
            nbr_laser = 1;
        }
        if (nbr_ct == 0) {
            nbr_ct = 1;
        }
        nbr_vr = 0;

        if (nbr_ct == 1) {
            price = ((8 * nbr_laser) + 20) * persons;
        } else if (nbr_ct == 2) {
            price = ((8 * nbr_laser) + 36) * persons;
        } else if (nbr_ct == 3) {
            price = ((8 * nbr_laser) + 51) * persons;
        } else {
            price = ((8 * nbr_laser) + 51 + (15 * (nbr_ct - 3))) * persons;
        }
    } else if (activities === "Réalité Virtuelle + Cyber Games") {
        price = 30 * persons
    } else if (activities === "Laser Game + Réalité Virtuelle + Cyber Games") {
        price = 35 * persons
    }

    const food = (soft * 2.5) + (aquarius * 3.5) + (capri_sun * 2) + (chips * 2) + (pop_corn * 3.5) + (bonbon * 3);
    const remaining = price - deposit - payment_bcc - payment_cash + food;
    const total = price + food;

    return { nbr_laser: nbr_laser, nbr_vr: nbr_vr, nbr_ct: nbr_ct, price: price, remaining: remaining, total: total };
};

function today(dateTime) {
    return new Date(dateTime).toISOString().split("T")[0] == new Date().toISOString().split("T")[0]
};

function substractionHours(beginning_hour, ending_hour) {

    function timeToMilliseconds(time) {
        let parts = time.split(':');
        let hours = parseInt(parts[0], 10);
        let minutes = parseInt(parts[1], 10);
        return (hours * 60 + minutes) * 60 * 1000;
    }

    let milliseconds1 = timeToMilliseconds(beginning_hour);
    let milliseconds2 = timeToMilliseconds(ending_hour);

    let milliseconds = milliseconds2 - milliseconds1;

    var hours = Math.floor(milliseconds / (1000 * 60 * 60));
    var minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

    var formattedHours = hours;
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return formattedHours + "h" + formattedMinutes;
}


module.exports = {
    formatDateTime, formatHour, forToday, price, substractionHours, today, generateCalendar
};
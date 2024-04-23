function formatDateTime(dateTime) {
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
                console.log(parseInt(new Date(dateTime).toLocaleTimeString().slice(0, 2)))
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


module.exports = {
    formatDateTime, formatHour, forToday, price, today
};
const express = require('express');
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const Bcrypt = require('bcrypt');
const { capitalize, formatHour, substractionHours } = require("./functions/function.js");

function addHours(time1, time2) {

    function timeToMinutes(time) {
        const [hours, minutes] = time.split("h").map(Number);
        return hours * 60 + minutes;
    }

    const totalMinutes = timeToMinutes(time1) + timeToMinutes(time2);

    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    const formattedHours = newHours;
    const formattedMinutes = (newMinutes < 10 ? "0" : "") + newMinutes;

    return formattedHours + "h" + formattedMinutes;
}

function salary(member, hours) {
    if (member == "Joachim") {
        return ((hours.split("h")[0] * 15) + ((hours.split("h")[1] * 15) / 60))
    } else {
        return ((hours.split("h")[0] * 10) + ((hours.split("h")[1] * 10) / 60))
    }
}

router.get('/', (req, res) => {
    if (req.session.connected) {
        let allDay = Gestion.getHours(req.session.member.id);
        let totalMoney = 0;
        let totalHours = "0h00";
        let formatDay = [];

        let today = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });
        today = capitalize(today);

        allDay.forEach((hour) => {
            if (hour.day.slice(0, 7) == new Date().toISOString().slice(0, 7)) {
                hour.day = new Date(hour.day).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });
                hour.day = capitalize(hour.day);
                hour.today = (today === hour.day);
                if (hour.today && hour.beginning_hour == hour.ending_hour && hour.beginning_hour < formatHour(new Date().getTime()).split("h").join(":")) {
                    hour.hours = substractionHours(hour.beginning_hour, formatHour(new Date().getTime()).split("h").join(":"));
                    hour.money = salary(req.session.member.name, hour.hours).toFixed(2);
                }
                totalMoney += hour.money;
                totalHours = addHours(totalHours, hour.hours);

                formatDay.push(hour);
            }
        });

        if (req.session.member.is_admin) {
            let hours_members = []

            Gestion.allMembers().forEach((member) => {
                let hours = "0h00"

                Gestion.getHours(member.id).forEach((data) => {
                    if (data.day.slice(0, 7) == new Date().toISOString().slice(0, 7)) {
                        hours = addHours(hours, data.hours);
                    }
                });

                hours_members.push({ id: member.id, firstname: member.firstname, lastname: member.lastname, email: member.email, phone_number: member.phone_number, hours: hours, salary: salary(member.firstname, hours) });
            });

            res.render("gestion/profile.hbs", { members: hours_members, hours: formatDay, totalMoney: totalMoney, totalHours: totalHours, error: req.session.error, today: today });
            req.session.error = null;
        } else {
            res.render("gestion/profile.hbs", { hours: formatDay, totalMoney: totalMoney, totalHours: totalHours, error: req.session.error, today: today });
            req.session.error = null;
        };
    } else {
        res.render("gestion/login.hbs");
    }
});

router.post('/manage', (req, res) => {
    if (req.body.manage_button === "modify") {
        req.session.modify = true;
        res.redirect("/profile");
    } else if (req.body.manage_button === "save") {
        if (req.body.password != Gestion.login(req.session.member.firstname)) {
            Gestion.updateMember(req.body.firstname, req.body.email, req.body.phone_number, Bcrypt.hashSync(req.body.password, 10));
        }
        req.session.modify = false;
        res.redirect("/profile");
    } else if (req.body.manage_button === "disconnect") {
        req.session.destroy();
        res.redirect('/gestion');
    }
});

router.post("/add_hours", (req, res) => {
    Gestion.addHours(req.session.member.id, new Date().toISOString().split('T')[0], req.body.beginning_hour, req.body.beginning_hour);
    res.redirect("/profile");
});

router.post("/update_hours", (req, res) => {
    const difference = substractionHours(req.body.beginning_hour, req.body.ending_hour);

    if (salary(req.session.member.firstname, difference) <= 0) {
        req.session.error = "L'heure de fin ne peut pas être inférieur ou égale à l'heure de début"
    } else {
        Gestion.updateHours(req.body.id, req.body.ending_hour, difference, salary(req.session.member.firstname, difference));
    }
    res.redirect("/profile");
});

router.post("/delete_hours", (req, res) => {
    Gestion.deleteHours(req.body.id);
    res.redirect("/profile");
});

router.post("/delete_member", (req, res) => {
    Gestion.deleteMember(req.body.id);

    res.redirect("/profile");
});

router.post("/add_member", (req, res) => {
    Gestion.addMember(req.body.firstname, req.body.lastname);

    res.redirect("/profile");
});

router.post("/switch_status", (req, res) => {
    if (req.session.member.is_admin == 1) {
        Gestion.updateStatus(req.session.member.id, 0)
    } else {
        Gestion.updateStatus(req.session.member.id, 1)
    }
    req.session.member = Gestion.member(req.session.member.firstname);
    res.redirect("/profile")
})

module.exports = router;
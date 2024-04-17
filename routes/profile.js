const express = require('express');
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const Bcrypt = require('bcrypt');

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

function salary(hours) {
    return ((hours.split("h")[0] * 10) + ((hours.split("h")[1] * 10) / 60))
}

router.get('/', (req, res) => {
    if (req.session.connected) {
        let formatDay = Gestion.getHours(req.session.member.id);
        let totalMoney = 0;
        let totalHours = "0h00";

        formatDay.forEach((hour) => {
            hour.day = new Date(hour.day).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });
            hour.day = hour.day.charAt(0).toUpperCase() + hour.day.slice(1)
            totalMoney += hour.money;
            totalHours = addHours(totalHours, hour.hours);
        });

        if (req.session.member.is_admin) {
            let hours_members = []

            Gestion.allMembers().forEach((member) => {
                let hours = "0h00"

                Gestion.getHours(member.id).forEach((data) => {
                    hours = addHours(hours, data.hours);
                });

                hours_members.push({ firstname: member.firstname, lastname: member.lastname, email: member.email, phone_number: member.phone_number, hours: hours, salary: salary(hours) });
            });

            res.render("profile.hbs", { members: hours_members, hours: formatDay, totalMoney: totalMoney, totalHours: totalHours, error: req.session.error });
            req.session.error = null;
        } else {
            res.render("profile.hbs", { hours: formatDay, totalMoney: totalMoney, totalHours: totalHours, error: req.session.error });
            req.session.error = null;
        };
    } else {
        res.render("login.hbs");
    }
});

router.post('/manage', (req, res) => {
    if (req.body.manage_button === "modify") {
        req.session.modify = true;
        res.redirect("/profil");
    } else if (req.body.manage_button === "save") {
        Gestion.updateMember(req.body.firstname, req.body.email, req.body.phone_number, Bcrypt.hashSync(req.body.password, 10));
        req.session.modify = false;
        res.redirect("/profil");
    } else if (req.body.manage_button === "disconnect") {
        req.session.destroy();
        res.redirect('/gestion');
    }
});

router.post("/add_hours", (req, res) => {
    Gestion.addHours(req.session.member.id, new Date().toISOString().split('T')[0], req.body.beginning_hour, req.body.beginning_hour);
    res.redirect("/profil");
});

router.post("/update_hours", (req, res) => {
    const difference = substractionHours(req.body.beginning_hour, req.body.ending_hour);

    console.log(req.body.ending_hour);

    if (salary(difference) <= 0) {
        req.session.error = "L'heure de fin ne peut pas être inférieur ou égale à l'heure de début"
    } else {
        Gestion.updateHours(req.body.id, req.body.ending_hour, difference, salary(difference));
    }
    res.redirect("/profil");
});

router.post("/delete_hours", (req, res) => {
    Gestion.deleteHours(req.body.id);
    res.redirect("/profil");
});

router.post("/delete_member", (req, res) => {
    Gestion.deleteMember(req.body.id);

    res.redirect("/profil");
});

router.post("/add_member", (req, res) => {
    Gestion.addMember(req.body.firstname, req.body.lastname);

    res.redirect("/profil");
});

//temporaire
router.post("/switch_status", (req, res) => {
    if (req.session.member.is_admin == 1) {
        Gestion.updateStatus(req.session.member.id, 0)
    } else {
        Gestion.updateStatus(req.session.member.id, 1)
    }
    req.session.member = Gestion.member(req.session.member.firstname);
    res.redirect("/profil")
})

module.exports = router;
let date = new Date()
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()

let city = document.getElementById("city")
let select_city = document.getElementById("select_city")
let date_p = document.getElementById("date")
let date_melad = document.getElementById("date_melad")
let Sunrise = document.getElementById("Sunrise")
let faj = document.getElementById("faj")
let Dhuhr = document.getElementById("Dhuhr")
let Asr = document.getElementById("Asr")
let Maghrib = document.getElementById("Maghrib")
let Isha = document.getElementById("Isha")
select_city.addEventListener("change", _ => {
    request(select_city.value)
})
function convertTO_12h(num) {
    let h = num.slice(0, 2)
    let m = num.slice(2)
    if (+h > 12) {
        let results = "0" + (+h - 12).toString() + m + "م";
        return results
    }
}


function request(theCity = "cairo") {
    if (theCity == "mansoura") {
        city.innerHTML = "المنصورة"
    } else if (theCity == "cairo") {
        city.innerHTML = "القاهرة"
    } else {
        city.innerHTML = "الفيوم"
    }
    axios.get(`http://api.aladhan.com/v1/calendarByCity/2024/6?city=${theCity}&country=EG&method=5`)
        .then(Response => {
            date_p.innerHTML = `${Response.data.data[day - 1].date.hijri.weekday.ar}
        ${+(Response.data.data[day - 1].date.hijri.day) + 1}
        ${Response.data.data[day - 1].date.hijri.month.ar}
        ${(Response.data.data[day - 1].date.hijri.year)} هجرياً
        `
            date_melad.innerHTML = `
        ${Response.data.data[day - 1].date.gregorian.date}        
        `
            let Asr_t = Response.data.data[day - 1].timings.Asr.replace("(EEST)", "")
            // console.log(convertTO_12h(Asr_t))
            convertTO_12h(Asr_t)
            Sunrise.innerHTML = `${(Response.data.data[day - 1].timings.Sunrise.replace("(EEST)", ""))} ص`
            faj.innerHTML = `${(Response.data.data[day - 1].timings.Fajr.replace("(EEST)", ""))} ص`
            Dhuhr.innerHTML = `${(Response.data.data[day - 1].timings.Dhuhr.replace("(EEST)", ""))} ص`
            Asr.innerHTML = `${convertTO_12h(Response.data.data[day - 1].timings.Asr.replace("(EEST)", ""))}`
            Maghrib.innerHTML = `${convertTO_12h((Response.data.data[day - 1].timings.Maghrib.replace("(EEST)", "")))}`
            Isha.innerHTML = `${convertTO_12h((Response.data.data[day - 1].timings.Isha.replace("(EEST)", "")))}`
            console.log(Response.data.data[15].timings)
        }).catch(error => alert("api" + error))
}
request()



// convertTO_12h("16:31")
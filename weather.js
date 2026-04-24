/**
 * Weather index
 * 1: Temperature (Heat = Tiers+, Cold = Exp gain+)
 * 2: Wind (Exp speed)
 * 3: Rain/Snow (Rain: Layers; Snow: Artifacts)
 * 3a: Lightning (Rune luck)
 * 3b: Hail (Rune Bulk)
 */

function roll_rand_weather() {
    var s = []
    var t = function () { return (Math.log2(1 / Math.random()) + 1) ** 1.5 }
    s[0] = new Decimal(t()).times(Math.random() < 0.5 ? -1 : 1)
    if (s[0].gte(0)) {
        s[0] = s[0].pow(0.4)
    }
    if (Math.random() < 0.5) {
        s[1] = new Decimal(t()).times(2)
    }
    s[0] = new Decimal(s[0])
    if (Math.random() < 0.25) {
        s[2] = new Decimal(t()).pow(1.05).times(s[0].add(25).min(40).max(10).pow(0.25).div(5).add(1))
        if (Math.random() < 0.5 && s[2].gte(30)) {
            s[3] = new Decimal(t())
            if (Math.random() < 0.5 && s[2].gte(60)) {
                s[2] = s[2].div(2)
                s[4] = new Decimal(t()).pow(0.5).times(s[2])
            }
        }
    }
    for (i = 0; i <= 4; i++){
        s[i] = (s[i] == null ? new Decimal(0):s[i]) //normally shit like this wont exist
    }
    return s
}

function two_box(i, j, h,c="#ffffff") {
    var h = h-5 //not like im lazy or whatever
    return `<div style="background-color: ${c};position: absolute; top:${h}% ;height: 10% ;width: 45%; left: 2.5%">${i}</div><div style="background-color: ${c};position: absolute;height: 10%; top:${h}%;width: 45%; left: 52.5%">${j}</div>`
}

function get_color(stat, amt) {
    if (amt.lte("1e15")) {
        amt = amt.toNumber()
    }
    else {
        return "#000000"
    }
    if (stat == 0) {
        if (amt < 0) {
            //hsl(59, 54%, 56%) --> hsl(231, 54%, 56%) from 0 to -40
            if (amt > -40) {
                return `hsl(${59-174/40*amt},54%,56%)`
            }
            //hsl(231, 54%, 56%) --> hsl(274, 54%, 50%) from -40 to -65 (-15 to -40)
            if (amt > -65) {
                return `hsl(${231 - 43/25 * (amt+40)},54%,56%)`
            }
            else {return `hsl(274,${amt+119}%,${amt+121}%)`}
        } else {
            if (amt < 20) {
                return `hsl(${59-amt*59/20},54%,56%)`
            }
            if (amt < 35) {
                return `hsl(0,${54+(amt-20)/15*46}%,56%)`
            }
            else {return `hsl(0,100%,56%)`}
        }
    }
    if (stat == 1||stat==3) {
        return `hsl(0,0%,${100/(100+amt)*50+50}%)`
    }
    if (stat == 2) {
        return `hsl(232,100%,${Math.max(50,91-amt/30*31)}%)`
    }
}

function effect_weather(data=player.weather) {
    var eff = []
    if (data[0].gte(0)) {
        eff[0] = data[0].add(1).log10().pow(2).div(50).add(1)
    }
    else {
        eff[0] = data[0].times(-10).add(1).pow(0.7)
    }
    eff[1] = [data[1].div(5).add(1).pow(3).sub(1).div(10).add(10).log10().pow(1.25).pow10().sub(9),data[1].add(1).log(2)]
    if (data[0].lte("-25")) {
        eff[2] = data[2].pow(1.25).add(1).log10().pow(1.25).pow10()
    }
    else {
        eff[2] = data[2].add(1).pow(2).log10().pow(2).pow10()
    }
    eff[3] = data[3].div(4).add(1).log10().add(1)
    eff[4] = data[4].times(2).floor()
    return eff
}

function determine_whether_this_box_should_even_exist(req,info) {
    if (!req.eq(0)) { return info }
    else {return ""}
}

function dwtb(r, i) {
    return determine_whether_this_box_should_even_exist(r,i)
}

function display_weather_html(i) {
    var u = effect_weather(i)
    var t = ""
    t = t + dwtb(i[0], two_box(`Temp: ${format(i[0].add(25))}&deg;C`, i[0].gte(0) ? `Points exp. ^${format(u[0],4)} ` : `*${format(u[0])} Experience`, 10,get_color(0,i[0])))
    t = t + dwtb(i[1], two_box(`Wind: ${format(i[1])} km/h`, `/${format(u[1][0])} Level time<br>+${format(u[1][1])} base level`, 22, get_color(1, i[1])))
    t = t + dwtb(i[2], two_box(`${i[0].lte(-25) ? "Snow" : "Rain"}: ${format(i[2])} ${i[0].lte(-25) ? "c" : "m"}m/h`, i[0].lte(-25) ? `x${format(u[2])} artifacts` : `x${format(u[2])} Layer gain`, 34, get_color(i[0].gte(-25)?2:3, i[2])))
    t = t + dwtb(i[3], two_box(`Lightning: ${format(i[3])}/km<sup>2</sup>`, `x${format(u[3], 4)} rune luck`,46))
    t = t + dwtb(i[4], two_box(`Hail: ${format(i[3])} cm`, `+${format(u[4],0)} rune bulk`,58))  //WHAT
    return t
}

function update_weather() {
    dg("weather_tab", display_weather_html(player.weather))
}
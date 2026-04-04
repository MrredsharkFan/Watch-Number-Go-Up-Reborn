const layer_names = ["Rebirth", "Ascension", "Transcension", "Reincarnation", "Velocity", "Accelration", "Jerk", "Infinity", "Eternal", "Quantum", "Reality", "Ghostify",
    "Hydraulic", "Chromatic","Affinity","Void","Heaven"
]

function el_boost_ind(amt, la) {
    var la = new Decimal(la)
    var amt = new Decimal(amt)
    var expo1 = la.add(1).pow(0.95).div(2).pow10()
    var expo2 = la.div(10).add(1).pow(-0.8).times(-1).add(1).times(0.8)
    return amt.add(1).log10().pow(0.6).pow10().pow(expo1)
}

function el_boost(list=player.el) {
    var r = new Decimal(1)
    for (var i in list) {
        r = r.times(el_boost_ind(list[i],i))
    }
    return r
}

function get_gain(la) {
    if (la == 1) { var b = player.rp.div("1e2000") }
    else {
        var la = new Decimal(la)
        var b = player.el[la-1]
    }
    var x = b.div(100000).add(1).log10().pow(0.55).pow10().sub(1)
    if (x.gte(1e3)) {
        x = x.pow(0.5).times(10**1.5)
    }
    return x
}

function el_reset() {
    if (get_gain(el).gte(1)) {
        if (player.el.length < el + 1) { player.el[el] = get_gain(el) }
        else { player.el[el] = player.el[el].add(get_gain(el)) }
        rebirth()
        player.rp = new Decimal(0)
        for (var i = 0; i <= el - 1; i++) {
            player.el[i] = new Decimal(0)
        }
    }
}

function fix_latter_zeroes() {
    if (player.el[player.el.length-1].eq(0)){player.el.pop()}
}

function el_money_boost(){return new Decimal(player.el.length).sub(1).pow10()}
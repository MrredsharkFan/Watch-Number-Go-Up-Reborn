const layer_names = ["Rebirth", "Ascension", "Transcension", "Reincarnation", "Velocity", "Accelration", "Jerk", "Infinity", "Eternal", "Quantum", "Reality", "Ghostify",
    "Hydraulic", "Chromatic", "Affinity", "Void", "Heaven", "Abtruse", "Dilemma", "Worldly", "Ending", "Testifical", "Pentimento", "Rhythmic", "Absolute", "Omega", "Epsilon", "Zeta",
    "Eta","Internal","External","Incremental","Recursion","Derivative","Hell"
]

function el_boost_ind(amt, la) {
    var la = new Decimal(la).times(el_effect()[1])
    var amt = new Decimal(amt)
    var expo1 = la.add(1).pow(0.95).div(2).pow10()
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
        var b = player.el[la - 1]
    }
    var la = new Decimal(la)
    var x = b.div(100000).add(1).log10().pow(0.55).pow10()
    var x = x.sub(1)
    if (x.gte(1e3)) {
        x = x.pow(0.5).times(10 ** 1.5)
    }
    x = x.times(get_art_effect(1))
    if (la.times(el_effect()[0]).gte(4)) { x = x.div(la.times(el_effect()[0]).sub(3).pow10()) }
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
    if (player.el.length == 0) { return null }
    if (player.el[player.el.length-1].eq(0)){player.el.pop()}
}

function el_money_boost() {
    return new Decimal(player.el.length).times(el_effect()[1]).max(1).sub(1).pow10()
}

function get_actual_layer_name(num) {
    var num = new Decimal(num)
    var num = num.times(el_effect()[0]).round()
    var q = layer_names.length
    var r = num.mod(q)
    var s = num.div(q).floor()
    var t = `${layer_names[r]}`
    if (s.gte(0.5)) { t = `${t}+${s}` }
    return `${t} [#${num}]`
}

function el_col() {
    if (player.el.length>=18) {
        player.el = [new Decimal(1e-10), new Decimal(1e-10)]
        player.el_col = player.el_col.add(1)
        el = 1
    }
}

function el_effect(amt=player.el_col){return [amt.pow_base(2),amt.pow_base(new Decimal(2).add(amt.add(1).pow(0.8).sub(1)))]}
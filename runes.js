const rune_rarity_name = [
    "Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythical", "Divine", "Super", "Mega", "Ultra", "Omega", "Extreme", "Ultimate", "Hyper", "Godly",
    "Unique", "Exotic", "Supreme", "Celestial", "Eternal", "Cosmic", "Onerous", "Hydraulic", "Supernatural", "Void", "Heavenly", "Hellish", "Transcendent", "Omnipotent",
    "Penultimate", "Universal", "Kiloversal", "Metaversal", "Omniversal", "Unbounded", "Delimited", "Postous", "Endgame", "Infinite", "Quantum", "Ghostify",
    "Ordinal","Emperial","Galactic","Fragmented","Dissocated","Evaporated","Hurricanal","Axiomatic","Poisonous","Jokingly","Absolute","Ending","Absurdity"
]

function actual_name(num) {
    const r = rune_rarity_name.length
    num = new Decimal(num)
    num = num.times(rune_col_power().round())
    var u = num.mod(r)
    var v = num.div(r)
    var q = `${rune_rarity_name[u]}`
    if (v.gte(0.5)) { q = `${q}<sup>${format(v,v.lte(new Decimal(player.comma_format).pow10())?0:3)}</sup>` }
    return q
}


function indiv_rune_eff(amt, tier) {
    var amt = new Decimal(amt)
    var tier = new Decimal(tier).times(rune_col_power());
    return amt.add(1).pow(tier.div(3).add(1)).sub(1).times(tier.add(1).pow(0.5).sub(4).pow10()).add(1)
}

function total_rune_eff(data) {
    var j = new Decimal(1)
    for (i in data) {
        if (!data[i].eq(0)) {
            j = j.times(indiv_rune_eff(data[i], i))
        }
    }
    j = j.pow(get_art_effect(0)[1])
    return j
}

function display_rarity_html(data) {
    var q = ""
    var s = Math.max(data.length - 14, 0)
    var data = data.slice(s)
    for (var i in data) {
        var n = Number(i) + Number(s)
        q = q + `<div style="position: absolute; opacity: ${data[i].eq(0) ? 50 : 100}%; 
        height: 5%; font-size: 80%; width: 90%; top:${5 + i * 6}%; 
        background-color: hsl(${(Number(i) + Number(s)) * 70},50%,90%)">
        ${format(data[i])} ${actual_name(n)} 
        [#${format(new Decimal(n).times(rune_col_power()))}]&rarr; 
        x${format(indiv_rune_eff(data[i], n))} points</div>`
    }
    return q
}

function luck() {
    var l = new Decimal(3)
    var l2 = player.rune_level.div(3).add(1)
    l2 = l2.times(get_art_effect(3)).div(rune_col_power())
    if (player.exp.gte("1e5")) { l2 = l2.times(get_exp_rune_luck()) }
    l2 = l2.times(effect_weather()[2])
    l = l.root(l2).max(1.0000001)
    return l
}

function roll_rarity() {return new Decimal(1 / Math.random()).log(luck()).floor().min(100)}

function actual_roll() {
    if (player.money.gte(rune_cost())){
        var t = roll_rarity()
        var u = t.pow_base(luck())
        dg("rune_recent", `You received a ${actual_name(t)} rune! (Chance: 1/${format(u)})`)
        dgs("rune_recent","color",`hsl(${t*70},50%,40%)`)
        if (player.runes[t] == null) {
            player.runes[t] = new Decimal(1)
        } else {
            player.runes[t] = player.runes[t].add(effect_weather()[3])
        }
        player.money = player.money.sub(rune_cost())
    }
}

function roll_upgrade() {
    if (player.money.gte(rup_cost())) {
        player.money = player.money.sub(rup_cost())
        player.rune_level = player.rune_level.add(1)
    }
}

function downgrade(){player.rune_level = player.rune_level.sub(1).max(0)}

function money_gain() {
    var m = player.points.add(676767).log10().div(10).sub(3).max(0).add(1).sub(1)
    m = m.times(el_money_boost())
    m = m.times(get_art_effect(2))
    return m
}
 

function rune_cost() { return player.rune_level.div(1.5).add(1).pow10() }
function rup_cost() { return player.rune_level.div(1.4).add(3).pow10() }

function artifact_power(data=player.runes) {
    var j = new Decimal(0)
    for (i in data) {
        if (!data[i].eq(0)) {
            j = j.add(indiv_rune_eff(data[i], i).add(1).log10().pow(new Decimal(i).add(1).log10().add(1)).times(i))
        }
    }
    j = j.pow(0.7).div(1000).times(rune_col_art_power())
    return [j.floor(),j.mod(1)]
}


//collapse shit
function rune_col_power(amt = player.rune_col) { return amt.pow_base(2) }
function rune_col_art_power(amt = player.rune_col) {return amt.pow_base(new Decimal(2).add(amt))}

function rune_col() {
    if (player.runes.length >= 100) {
        player.runes = []
        player.rune_col = player.rune_col.add(1)
    }
}
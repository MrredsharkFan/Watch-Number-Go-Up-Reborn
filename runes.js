const rune_rarity_name = [
    "Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythical", "Divine", "Super", "Mega", "Ultra", "Omega", "Extreme", "Ultimate", "Hyper", "Godly",
    "Unique", "Exotic", "Supreme", "Celestial", "Eternal", "Cosmic", "Onerous", "Hydraulic", "Supernatural", "Void", "Heavenly", "Hellish", "Transcendent", "Omnipotent",
    "Penultimate", "Universal", "Kiloversal", "Metaversal", "Omniversal", "Unbounded", "Delimited", "Postous", "Endgame", "Infinite", "Quantum", "Ghostify",
    "Ordinal","Emperial","Galactic","Fragmented","Dissocated","Evaporated","Hurricanal","Axiomatic","Poisonous","Jokingly","Absolute","Ending","Absurdity"
]


function indiv_rune_eff(amt, tier) {
    var amt = new Decimal(amt)
    var tier = new Decimal(tier);
    return amt.times(tier.div(3).sub(3).pow10()).add(1).pow(tier.div(10).add(1))
}

function total_rune_eff(data) {
    var j = new Decimal(1)
    for (i in data) {
        j = j.times(indiv_rune_eff(data[i], i))
    }
    return j
}

function display_rarity_html(data) {
    var q = ""
    for (var i in data) {
        q = q+`<div style="position: absolute; height: 5%; font-size: 80%; width: 90%; top:${5+i*6}%; background-color: #eba">${format(data[i])} ${rune_rarity_name[i]} &rarr; x${format(indiv_rune_eff(data[i],i))} points</div>`
    }
    return q
}

function luck() {
    return new Decimal(1)
}

function roll_rarity() {return new Decimal(1 / Math.random()).times(luck()).log(3).floor()}

function actual_roll() {
    if (player.money.gte(10)){
        var t = roll_rarity()
        if (player.runes[t] == null) {
            player.runes[t] = new Decimal(1)
        } else {
            player.runes[t] = player.runes[t].add(1)
        }
        player.money = player.money.sub(10)
    }
}

function money_gain() { return player.points.log10().div(10).sub(3).max(0).add(1).sub(1) }
const difficulty_names = [
    "Instant Win","Unfailable","Lovely","Cakewalk","Effortlessless",

    "Effortless", "Easy", "Medium", "Hard", "Difficult", "Challenging", "Intense", "Remorseless", "Insane", "Extreme", "Terrifying", "Catastrophic",
    "Horrific", "Unreal", "Nil", "Error", "Unreasonable", "Unacceptable", "Unlivable", "Nullifying", "Tartarus", "Hellish", "Calamity", "Unimaginable", "Omega",
    "Infinite"
]
const difficulty_mods_2 = ["--","-","","+","++"]
const difficulty_mods = ["Belowground","Baseline","Baseline~Low","Low","Low~Mid","Mid","Mid~High","High","High~Skyline","Skyline"]

function get_difficulty_rating(i) {
    var i = new Decimal(i)
    var s = difficulty_mods_2[i.times(50).mod(5).floor()]
    var s1 = difficulty_mods[i.times(10).mod(10).floor()]
    var s2 = difficulty_names[i.floor()]
    return `${s1}${s} ${s2}`
}

function get_difficulty_skill(s) {
    var s = new Decimal(s)
    var p = s.div(100).add(1).log10().add(1).log10()
    if (p.gte(13)) {
        p = p.div(1.3).log10().times(6).add(7)
    }
    if (p.gte(16)) {
        p = p.div(1.6).log10().times(6).add(10)
    }
    if (p.gte(18)) {
        p = p.div(1.8).log10().times(8).add(10)
    }
    return p
}
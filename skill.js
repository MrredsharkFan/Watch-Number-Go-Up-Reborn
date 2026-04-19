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

function reroll_diff() {
    var l = ((Math.log2(1 / Math.random()) + 4) ** 2 - 16)/10
    player.rolled_diff = new Decimal(l)
    player.level_end_time = -6767676767676767
}

function get_attempt_time(l) {
    var l = new Decimal(l)
    var l = l.pow(0.95).pow_base(2).pow(new Decimal(2).tetrate(l.div(30).add(0.5)))
    l = l.div(get_experience_effect(player.exp))
    return l
}

function chance(l) {
    var l = new Decimal(l)
    var r = get_difficulty_skill(player.skill).sub(l)
    return r.pow10()
}

function start_level() {
    if (player.level_end_time < Date.now()) {
        player.level_end_time = get_attempt_time(player.rolled_diff).toNumber() * 1000 + Date.now()
    }
}

function remaining_time() {return player.level_end_time - Date.now()}
function get_level_percent() {return Math.max(remaining_time()/1000/get_attempt_time(player.rolled_diff)*100,0)}
function get_skill_gain(diff = player.rolled_diff,b=true) {
    diff = new Decimal(diff);
    var v = diff.times(1.7).pow(2).pow_base(2)
    if (b) { v = v.times(player.points.log10().log10().sub(21).max(0).add(1).pow(5)) }
    return v
}

function detect_end() {
    if (get_level_percent() > 100) { 
        player.level_end_time = get_attempt_time(player.rolled_diff).toNumber() * 1000 + Date.now()
     }
    if (remaining_time() < 0 && !(remaining_time() < -67676767676767)) {
        if ((1 / Math.random()) > level_chance()) {
            player.skill = player.skill.add(get_skill_gain())
            if (player.rolled_diff.gte(player.hcomp)) { player.hcomp = player.rolled_diff }
        }
        player.level_end_time = -6767676767676767
    }
}

function base_level_chance(diff) {
    var diff = new Decimal(diff)
    var bc = diff.div(3).add(1).pow_base(diff.add(1).times(2).pow(1.5))
    if (diff.gte(13)) { bc = bc.div(1.3).slog().add(diff.div(13).sub(1));  bc = new Decimal(10).tetrate(bc)}
    return bc.div(s).max(0).add(1)
}

function level_chance(diff = player.rolled_diff) {
    var s = base_level_chance(get_difficulty_skill(player.skill))
    if (player.exp.gte("2e5")){s = s.times(get_exp_level_chance())}
    return base_level_chance(diff).div(s).max(1)
}

//boosts
function get_boost_chance(lvl) {
    var lvl = new Decimal(lvl)
    var b = lvl.pow_base(1.2).times(10).div(base_level_chance(get_difficulty_skill(player.skill))).times(50).max(1)
    b = b.div(get_exp_upg_chance())
    return b
}

function skill_upgrade(i) {
    if ((1 / Math.random()) > get_boost_chance(player.skill_boost[i])) {
        player.skill_boost[i] = player.skill_boost[i].add(1)
    }
}

function skill_effects(id) {
    if (id == 0) {
        return player.skill_boost[id].pow(1.56).div(5).pow_base(1.03).sub(1).add(1)
    } else {
        return player.skill_boost[id].pow(1.4).pow_base(1.25)
    }
}

//here because it's long
function render_skills() {
    dg("skill_pexp_chance", format(get_boost_chance(player.skill_boost[0])))
    dg("skill_layer_chance", format(get_boost_chance(player.skill_boost[1])))
    dg("skill_pexp", format(skill_effects(0),4))
    dg("skill_layer", format(skill_effects(1)))
}

//experience time!!!!!
function get_experience_gain(lvl=player.hcomp) { return get_skill_gain(lvl, false).log10().pow(0.3).pow10().sub(1) }
function get_experience_effect(amt = player.exp) { return amt.div(1000).add(1).log(2).pow(2).add(1) }
function get_exp_rune_luck(amt = player.exp) { return amt.div(1e5).add(1).log(10).pow(0.25).add(1).max(1) }
function get_exp_level_chance(amt = player.exp) { return amt.div(2e5).add(1).pow(0.5).max(1).sub(1).pow_base(10) }
function get_exp_upg_chance(amt = player.exp) { return amt.div(3e5).add(1).pow(0.75).max(1).sub(1).pow_base(5) }
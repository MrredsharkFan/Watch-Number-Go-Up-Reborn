last_tick = Date.now()

el = 1

function pps() {
    var p = upgrade_effect(player.upgrade)
    p = p.times(reb_boost())
    p = p.times(total_rune_eff(player.runes))
    p = p.times(el_boost())
    p = p.pow(get_art_effect(0)[0])
    p = p.pow(skill_effects(0))
    return p
}

function OoM_pt(dt) {
    return player.points.div(pps().times(dt)).pow(-1).log10().div(dt)
}


function upg_cost(amt) { return new Decimal.pow(4, amt).times(10) }

function eff_upgrade(amt = player.upgrade) {
    if (amt.gte(10000)) {
        amt = amt.div(10000).root(amt.div(1e4).add(1).log10().add(1).pow(0.005)).times(10000)
    }
    return amt
}

function upgrade_effect(amt) {
    var amt = new Decimal(amt)
    var amt = eff_upgrade(amt)
    return new Decimal.pow(2, amt.pow(0.5).mod(1).pow(0.25).add(amt.pow(0.5).floor()).pow(new Decimal(2).sub(amt.pow(-0.5))).add(amt))
}


function buy_upg() {
    if (upg_cost(player.upgrade).lte(player.points)) {
        if (player.total_points.lte(1e100)) {
            if (player.upgrade.lte("1e6")) { player.points = player.points.sub(upg_cost(player.upgrade)) }
            player.upgrade = player.upgrade.add(1)
        } else {
            player.upgrade = player.points.div(10).log(4).floor().add(1)
            if (player.upgrade.lte("1e6")) { player.points = player.points.sub(upg_cost(player.upgrade.sub(1))) }
        }
    }
}

function remain(amt) {
    var amt = eff_upgrade(amt)
    return [amt.times(1 - 1e-10).pow(0.5).ceil().pow(2).sub(amt), amt.sub(1).pow(0.5).mod(1)]
}

function rp_gain() { return player.points.div(1e5).add(1).log10().pow(0.9).pow10().sub(1).pow(0.5) }

function reb_boost() {
    return player.rp.times(10).add(1).log10().pow(0.75).pow10().pow(0.55)
}

function tab_open(name,req) {
    if (req) {
        dgs(`${name}_div`, "visibility", "visible")
        dgs(`${name}_locked`, "visibility", "hidden")
    } else {
        dgs(`${name}_div`, "visibility", "hidden")
        dgs(`${name}_locked`, "visibility", "visible")
    }
}

function tab_visible(name, req) {
    dgs(name, "visibility", req ? "visible" : "hidden")
}

function tab_logic() {
    tab_open("reb", player.points.gte(1e5) || player.rp.gte(1))
    tab_open("ru", player.total_points.gte(1e30))
    tab_open("el", player.total_points.gte("1e10000"))
    tab_open("ar", player.total_points.gte("1e67000"))
    tab_open("col", player.total_points.gte("ee9"))
    dgs("el_box_alt","visibility",player.total_points.gte("1e10000")?"visible":"hidden")
}

function rebirth() {
    console.log(player.points)
    if (rp_gain().gte(1)) {
        player.rp = player.rp.add(rp_gain())
        player.upgrade = new Decimal(0)
        player.points = new Decimal(0)
    }
}

function automate_stuff() {
    if (player.total_points.gte("1e500")) {
        buy_upg()
    }
    if (player.money.gte("1e200")) {
        player.rune_level = player.money.add(1).div(1000).log10().times(1.4).max(0).add(1e-5)
    }
}

function el_automation(dt) { //putting it here because it fits the dt shitposts
    var t = player.el.length
    if (t >= 4) {
        player.rp = player.rp.add(rp_gain().times(dt))
        for (var i = 1; i <= t - 4; i++) {
            player.el[i] = player.el[i].add(get_gain(i).times(dt))
        }
    }
}

function incrps() {
    if (player.ppt<=0){return new Decimal(0)}
    var v = player.points.add(1).log10().add(1).log10().sub(20).max(1).log10().add(1).pow(3).sub(1)
    return v
}




TIME = 0


function tick() {
    dt = (Date.now() - last_tick) / 1000 + 1e-15
    TIME = TIME + dt
    last_tick = Date.now()
    try {
        player.total_points = player.total_points.add(pps().times(dt))
        player.money = player.money.add(money_gain().times(dt))

        el_automation(dt)
        dg("fps", Math.min(1 / dt,1000).toFixed(2) + "fps")
        dg("upg_effect", format(upgrade_effect(player.upgrade)) + " points")
        dg("upg_cost", format(upg_cost(player.upgrade)))
        dg("pps", OoM_pt(dt).gte(100) ? format(OoM_pt(dt)) + " OoMs/s" : format(pps()) + "/s")
        dg("upg_boost_remain", "Next boost in " + format(remain(player.upgrade)[0]) + " upgrades")
        dg("eff_upg", `${format(player.upgrade)} bought upgrades, ${(player.upgrade.gte(1e4) ? "Effective upgrades: " + format(eff_upgrade()) : "")}<br>Tier ${format(player.upgrade.sub(1).max(0).pow(0.5).floor())}`)

        dg("rp", format(player.rp))
        dg("rp_gain", format(rp_gain()))
        dg("rp_eff", format(reb_boost()))

        dg("rune_stats", format(total_rune_eff(player.runes)))
        dg("rune_stats_2", format(luck(), 6))
        dg("runes", display_rarity_html(player.runes))
        dg("money", format(player.money))
        dg("mps", format(money_gain()))
        dg("rune_cost", format(rune_cost()))
        dg("rup_cost", format(rup_cost()))

        dg("ell", get_actual_layer_name(el))
        dg("elp", format(player.el[el]))
        dg("elp_eff", format(el_boost_ind(new Decimal(player.el[el]), el)))
        dg("elp_gain", format(get_gain(el)))
        dg("el_money", format(el_money_boost()))

        dg("rune_col", actual_name(new Decimal(100)))
        dg("rune_col_eff", `Rune effect & scaling: x${format(rune_col_power())}, Artifacts: x${format(rune_col_art_power())}`)
        dg("rune_col_chance", format(luck().pow(100)))

        dg("el_col", get_actual_layer_name(new Decimal(17)))
        dg("el_col_eff", `Scaling: x${format(el_effect()[0])}, Effect: x${format(el_effect()[1])}`)

        dgs("el_box", "background-color", `hsl(${el * 30 + 180},80%,90%)`)
        dgs("el_box_alt", "background-color", `hsl(${el * 30 + 180},80%,90%)`)
        dg("el_qol", `Reset to get 100% of ${get_actual_layer_name(el - 3)}/s!`)
        dgs("el_qol", "visibility", el >= 3 ? "visible" : "hidden")

        dg("ar_gain", `+${format(artifact_power()[0])} (${format(artifact_power()[1].times(100))}%)`)
        dgs("ubar5", "width", `${artifact_power()[1].times(100)}%`)

        dgs("ubar", "width", `${player.points.div(upg_cost(player.upgrade)).times(100).min(100)}%`)
        dgs("ubar2", "width", `${remain(player.upgrade)[1].times(100)}%`)
        dgs("ubar3", "width", `${player.total_points.add(1).log10().min(100)}%`)
        dgs("ubar4", "width", `${player.total_points.add(1).log10().div(5).min(100)}%`)
        dgs("ubar6", "width", `${player.money.add(1).log10().div(2).min(100)}%`)


        dg("qual", `${format(player.total_points.add(1).log10().add(1).log10().div(21).times(100).min(100), 5)}%`)
        dgs("qual", "width", `${player.total_points.add(1).log10().add(1).log10().div(21).pow(3).times(90).min(90)}%`)
        dgs("qual", "background-color", `hsl(${player.total_points.add(1).log10().add(1).log10().div(21).pow(3).times(150).min(150)},100%,25%)`)

        player.points = player.points.add(pps().times(dt))
        dg("points", format(player.points))

        //PAGE 2
        dg("skill_num", format(player.skill))
        dg("skill_diff", `${format(get_difficulty_skill(player.skill), 5)} (${get_difficulty_rating(get_difficulty_skill(player.skill))})`)
        dg("reroll_diff", format(player.rolled_diff, 2, false))
        dg("level_time", format_time(get_attempt_time(player.rolled_diff)))
        dg("skill_chance", level_chance().lt(100)?`${format(level_chance().pow(-1).times(100))}%`:`1/${format(level_chance())}`)
        dg("skill_gain", `+${format(get_skill_gain())}`)

        dgs("ubar7", "width", `${get_level_percent()}%`)
        
        detect_end()






    
        tab_logic()
        automate_stuff()
        fix_latter_zeroes()

        draw_artifact()
        render_skills()

        player.notation = document.getElementById("notation").value
        player.comma_format = document.getElementById("comma_slider").value
        dg("comma_value", player.comma_format)
        dgs("hallbtn", "background-color", `hsl(${TIME * 100 % 360},100%,10%)`)
    }
    catch (err) {
        console.log(err)
    }
    detectNaN()
}

setInterval(tick,1,1)
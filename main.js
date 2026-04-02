function dg(id, context) { document.getElementById(id).innerHTML = context }
function dgc(id) { return document.getElementById(id)}
function dgs(id, param, context) {document.getElementById(id).style[param] = context}

function initPlayer() {
    return {
        points: new Decimal(0),
        upgrade: new Decimal(0),
        rp: new Decimal(0),
        runes: [new Decimal(0)],
        money: new Decimal(0),
        total_points: new Decimal(0),
        rune_level: new Decimal(0),
        notation: "Sc"
    }
}

player = initPlayer()

last_tick = Date.now()

function pps() {
    var p = upgrade_effect(player.upgrade)
    p = p.times(reb_boost())
    p = p.times(total_rune_eff(player.runes))
    return p
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

function reb_boost(){return player.rp.times(10).add(1).log10().pow(0.75).pow10().pow(0.55)}

function tab_logic() {
    if (player.points.gte(1e5)||player.rp.gte(1)) {
        dgs("reb_div", "visibility", "visible")
        dgs("reb_locked", "visibility", "hidden")
    } else {
        dgs("reb_div", "visibility", "hidden")
        dgs("reb_locked", "visibility", "visible")
    }
    if (player.points.gte(1e30)) {
        dgs("ru_div", "visibility", "visible")
        dgs("ru_locked", "visibility", "hidden")
    } else {
        dgs("ru_div", "visibility", "hidden")
        dgs("ru_locked", "visibility", "visible")
    }
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
}


function tick() {
    dt = (Date.now() - last_tick) / 1000
    last_tick = Date.now()
    player.total_points = player.total_points.add(pps().times(dt))
    player.money = player.money.add(money_gain().times(dt))
    dg("fps", (1/dt).toFixed(2) + "fps")
    dg("upg_effect", format(upgrade_effect(player.upgrade))+" points")
    dg("upg_cost", format(upg_cost(player.upgrade)))
    dg("pps", format(pps()))
    dg("upg_boost_remain", "Next boost in " + format(remain(player.upgrade)[0]) + " upgrades")
    dg("eff_upg", format(player.upgrade)+" bought upgrades<br>"+(player.upgrade.gte(1e4)?"Effective upgrades: "+format(eff_upgrade()):""))

    dg("rp", format(player.rp))
    dg("rp_gain", format(rp_gain()))
    dg("rp_eff", format(reb_boost()))

    dg("rune_stats", format(total_rune_eff(player.runes)))
    dg("rune_stats_2", format(luck()))
    dg("runes", display_rarity_html(player.runes))
    dg("money", format(player.money))
    dg("mps", format(money_gain()))
    dg("rune_cost", format(rune_cost()))
    dg("rup_cost", format(rup_cost()))

    dgs("ubar", "width", `${player.points.div(upg_cost(player.upgrade)).times(100).min(100)}%`)
    dgs("ubar2", "width", `${remain(player.upgrade)[1].times(100)}%`)
    dgs("ubar3", "width", `${player.total_points.add(1).log10().min(100)}%`)
    dgs("ubar4", "width", `${player.total_points.add(1).log10().div(5).min(100)}%`)

    player.points = player.points.add(pps().times(dt))
    dg("points", format(player.points))
    
    tab_logic()
    automate_stuff()

    player.notation = document.getElementById("notation").value
}

setInterval(tick,1,1)
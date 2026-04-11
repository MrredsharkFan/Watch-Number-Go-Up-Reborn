//welcome to page 2
//basically a glorified artifact booster but glorified

const useful_boxes = [54, 42, 14, 49]
const boosts = ["Points", "Artifact gain", "Rune luck", "Layers gain"]
hover = -1

function init_upgrade() {
    var t = ""
    for (var i = 0; i <= 63; i++) {
        t = t + `<button id="iud${i}" style="background-color: hsl(0,100%,50%);
        left: ${(i % 8) * 10 + 10}%; top: ${Math.floor(i / 8) * 10 + 10}%; color: white" onmouseenter="hover = ${i}" class="upg_btn" 
        onclick="upg_btn_cl(${i})"><b id="iu${i}"></b><br>#${i}</button>`
    }
    return t
}

dg("upg_incr", init_upgrade())

function gri(x,y) {
    try { return player.incr_upg[x + y] }
    catch (err){return 0}
}

function upg_btn_cl(x) {
    if (player.incr.gte(incr_cost(x))) {
        player.incr = player.incr.sub(incr_cost(x))
        var row = x % 8
        var column = Math.floor(x / 8)
        if (row == 0 || row == 7 || column == 0 || column == 7) { } else {
            var q = [gri(x, -1), gri(x, -9), gri(x, -8), gri(x, -7), gri(x, 7), gri(x, 8), gri(x, 9), gri(x, 1)]
            player.incr_upg[x] = new Decimal(q[0].add(q[1].pow(3)).sub(q[2]).sub(q[3]).sub(q[4]).sub(q[5]).sub(q[6]).sub(q[7])).add(1).abs().pow(0.5)
        }
    }
}

function draw_grid() {
    for (var i in player.incr_upg) {
        dg(`iu${i}`, format(player.incr_upg[i]))
        dgs(`iud${i}`, "background-color", `hsl(${player.incr_upg[i].add(1).log10().times(100)},100%,30%)`)
    }
}

function incr_cost(amt) {
    return new Decimal(player.incr_upg[amt]).pow(2).add(10)
}

function incr_effect() {
    var v = [0, 0, 0, 0]
    for (var i in v) {
        v[i] = player.incr_upg[useful_boxes[i]]
    }
    v[0] = player.incr.add(1).log10().add(1).pow(v[0].add(1).log10().add(1).log10()).sub()
    v[1] = v[1].add(1).pow(player.incr.add(1).log10().add(1).log10().pow(1.25).add(1.5)).pow(0.4)
    v[2] = v[2].add(1).log10().add(1).pow(player.incr.add(1).log10().add(1).log10().pow(0.8).add(1))
    v[3] = new Decimal(player.incr.add(1).log10().add(1.5)).pow(v[3].add(1).log10().add(1).pow(2.125).sub(1)).pow(3)
    return v
}

function display_incr_effects() {
    var w = incr_effect()
    var q = ''
    for (var i in w) {
        q = q + `Your number on grid #${useful_boxes[i]} &rarr; ${i == 0 ? "^":"x"}${format(w[i],i!=3?4:2)} ${boosts[i]}<hr>`
    }
    return q
}
//welcome to page 2
//basically a glorified artifact booster but glorified

function init_upgrade() {
    var t = ""
    for (var i = 0; i <= 63; i++) {
        t = t + `<button onclick="upg_btn_cl(${i})" id="iu${i}" style="width: 10%; height: 10%; background-color: hsl(0,50%,50%); position: absolute; left: ${(i%8)*10+10}%; top: ${Math.floor(i/8)*10+10}%; color: white">0</button>`
    }
    return t
}

dg("upg_incr", init_upgrade())

function gri(x) {
    return player.incr_upg[(x+640)%64].toNumber()
}

function upg_btn_cl(x) {
    var q = [gri(x - 1), gri(x + 1), gri(x + 8), gri(x - 8), gri(x + 9), gri(x - 9), gri(x - 7), gri(x + 7)].sort()
    while (!(q.at(-1)==q.at(-2)&&q.at(-2)==q.at(-3)&&q.at(-1)==q.at(-3))&&q.length>=1){q.pop()}
    player.incr_upg[x] = new Decimal(q.at(-1)).add(1)
}

function draw_grid() {
    for (i in player.incr_upg) {
        dg(`iu${i}`, format(player.incr_upg[i]))
        dgs(`iu${i}`, "background-color", `hsl(${player.incr_upg[i].toNumber()*10},50%,50%)`)
    }
}
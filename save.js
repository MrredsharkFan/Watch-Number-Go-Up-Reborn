

function initPlayer() {
    return {
        points: new Decimal(0),
        upgrade: new Decimal(0),
        rp: new Decimal(0),
        el: [new Decimal(0), new Decimal(0)], //eternal_layers
        runes: [new Decimal(0)],
        money: new Decimal(0),
        total_points: new Decimal(0),
        rune_level: new Decimal(0),
        notation: "S",
        comma_format: 6,
        artifact: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        rune_col: new Decimal(0),
        el_col: new Decimal(0)
    }
}

player = initPlayer()






function save() {
    localStorage.setItem("wngu-r2",JSON.stringify(player))
}
setInterval(save, 1000, 1)

function load() {
    var u = JSON.parse(localStorage.getItem("wngu-r2"))
    const player_vars_d = ["points", "rp", "upgrade", "money", "total_points", "rune_level", "rune_col","el_col"]
    const player_vars_l = ["runes", "el","artifact"]
    const player_vars_str = ["notation","comma_format"]
    console.log(JSON.parse(localStorage.getItem("wngu-r2")))
    for (var i in player_vars_d) {
        player[player_vars_d[i]] = new Decimal(u[player_vars_d[i]])
    }
    for (var i in player_vars_l) {
        player[player_vars_l[i]] = initPlayer()[player_vars_l[i]]
        for (var j in u[player_vars_l[i]]) {
            player[player_vars_l[i]][j] = new Decimal(u[player_vars_l[i]][j])
        }
    }
    for (var i in player_vars_str) {
        player[player_vars_str[i]] = u[player_vars_str[i]]
    }
}

load()
document.getElementById("notation").value = player.notation
document.getElementById("comma_slider").value = player.comma_format
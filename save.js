function save() {
    localStorage.setItem("wngu-r2",JSON.stringify(player))
}
setInterval(save, 1000, 1)

function load() {
    var u = JSON.parse(localStorage.getItem("wngu-r2"))
    const player_vars_d = ["points", "rp", "upgrade", "money", "total_points", "rune_level"]
    const player_vars_l = ["runes", "el"]
    const player_vars_str = ["notation"]
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




function save() {
    localStorage.setItem("wngu-r2",JSON.stringify(player))
}
setInterval(save, 1000, 1)

function load() {
    var u = JSON.parse(localStorage.getItem("wngu-r2"))
    const player_vars_d = ["points", "rp", "upgrade", "money", "total_points","rune_level"]
    const player_vars_l = ["runes"]
    console.log(JSON.parse(localStorage.getItem("wngu-r2")))
    for (var i in player_vars_d) {
        u[player_vars_d[i]] = new Decimal(u[player_vars_d[i]])
    }
    for (var i in player_vars_l) {
        for (var j in u[player_vars_l[i]]) {
            console.log(j)
            console.log(u[player_vars_l[i]])
            u[player_vars_l[i]][j] = new Decimal(u[player_vars_l[i]][j]) //oh yeah i finally learnt how to code
        }
    }
    player = u
}
load()
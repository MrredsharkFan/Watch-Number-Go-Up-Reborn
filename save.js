

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
        notation: "S:0",
        comma_format: 6,
        artifact: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        rune_col: new Decimal(0),
        el_col: new Decimal(0),
        ppt: 0
    }
}

player = initPlayer()
page = 0

const player_vars_d = ["points", "rp", "upgrade", "money", "total_points", "rune_level", "rune_col", "el_col"]
const player_vars_l = ["runes", "el", "artifact"]
const player_vars_str = ["notation", "comma_format", "ppt"]

function detectNaN() {
    for (var i in player_vars_d) {
        if (player[player_vars_d[i]].isNan()) { player[player_vars_d[i]] = initPlayer()[player_vars_d[i]] }
    }
    for (var i in player_vars_l) {
        for (var j in player[player_vars_l[i]]) {
            if (player[player_vars_l[i]][j].isNan()) {
                console.log(player[player_vars_l[i]][j])
                player[player_vars_l[i]][j] = initPlayer()[player_vars_l[i]][j]
            }
        }
    }
    for (var i in player_vars_str) {
        if (player[player_vars_str[i]] == NaN) { player[player_vars_str[i]] = initPlayer()[player_vars_str[i]]}
    }
}



function save() {
    detectNaN()
    localStorage.setItem("wngu-r2",JSON.stringify(player))
}
setInterval(save, 1000, 1)

function load() {
    var u = JSON.parse(localStorage.getItem("wngu-r2"))
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

const banks = 
    [
        '{"points":"2.043003169079786e33","upgrade":"51","rp":"50940685.83932298","el":[],"runes":["0"],"money":"33.407522397840694","total_points":"2.05990526939912e33","rune_level":"0","notation":"S: e3e30","comma_format":"3","artifact":["0","0","0","0"],"rune_col":"0","el_col":"0"}',
        '{"points":"ee18.462381728479194","upgrade":"4.816615295496871e18","rp":"ee16.44976069286683","el":["0","8.390981179645335e557620080","1.4551642090436863e32343","2.652497812897698e173","1.2788839406270651e29","8.640962156108554e21","2.846883553823959e19","1.7978547956814073e17","1156243811980532.2","7162318249574.587","6248671.836074918","7361.352649842252","5.7897410719710685"],"runes":["199","162","132","117","100","88","63","59","54","47","31","31","29","21","20","20","8","16","10","4","13","6","12","10","8","1","4","3","3","1","1","3","2","2","1","1",null,null,null,null,null,null,null,"2",null,null,null,null,"1"],"money":"2.5474284210164875e62","total_points":"ee18.611989653923114","rune_level":"83","notation":"S:e33","comma_format":"9","artifact":["5028477","3049278","2716953","2311065"],"rune_col":"4","el_col":"1"}'
    ]


function bank(num) {
    localStorage.setItem("wngu-r2", banks[num])
    load()
}



document.getElementById("notation").value = player.notation
document.getElementById("comma_slider").value = player.comma_format
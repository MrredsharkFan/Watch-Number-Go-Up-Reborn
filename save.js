

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
        ppt: 0,

        incr: new Decimal(0),
        incr_upg: "0".repeat(64).split("").map(x => new Decimal(x))
    }
}

player = initPlayer()
page = 0

const player_vars_d = ["points", "rp", "upgrade", "money", "total_points", "rune_level", "rune_col", "el_col", "incr"]
const player_vars_l = ["runes", "el", "artifact","incr_upg"]
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
        if (player[player_vars_str[i]] == undefined){player[player_vars_str[i]] = initPlayer()[player_vars_str[i]]}
    }
}

load()

const banks = 
    [
        '{"points":"2.043003169079786e33","upgrade":"51","rp":"50940685.83932298","el":[],"runes":["0"],"money":"33.407522397840694","total_points":"2.05990526939912e33","rune_level":"0","notation":"S: e3e30","comma_format":"3","artifact":["0","0","0","0"],"rune_col":"0","el_col":"0", "ppt": 0}',
        '{"points":"ee18.462381728479194","upgrade":"4.816615295496871e18","rp":"ee16.44976069286683","el":["0","8.390981179645335e557620080","1.4551642090436863e32343","2.652497812897698e173","1.2788839406270651e29","8.640962156108554e21","2.846883553823959e19","1.7978547956814073e17","1156243811980532.2","7162318249574.587","6248671.836074918","7361.352649842252","5.7897410719710685"],"runes":["199","162","132","117","100","88","63","59","54","47","31","31","29","21","20","20","8","16","10","4","13","6","12","10","8","1","4","3","3","1","1","3","2","2","1","1",null,null,null,null,null,null,null,"2",null,null,null,null,"1"],"money":"2.5474284210164875e62","total_points":"ee18.611989653923114","rune_level":"83","notation":"S:e33","comma_format":"9","artifact":["5028477","3049278","2716953","2311065"],"rune_col":"4","el_col":"1", "ppt":0}',
        '{ "points": "106.48066535177266", "upgrade": "0", "rp": "8.548618720416567", "el": [], "runes": ["0"], "money": "0", "total_points": "17378054.392854534", "rune_level": "0", "notation": "S:0", "comma_format": "6", "artifact": ["0", "0", "0", "0"], "rune_col": "0", "el_col": "0", "ppt": 0 }',
        '{"points":"204961.10936365311","upgrade":"7","rp":"0","el":[],"runes":["0"],"money":"0","total_points":"259571.10936365952","rune_level":"0","notation":"S:e33","comma_format":"6","artifact":["0","0","0","0"],"rune_col":"0","el_col":"0", "ppt": 0}',
        '{ "points": "1.9195399096838899e90663", "upgrade": "150588", "rp": "3.5834471236487486e14476", "el": ["0", "4.870893421505723e88", "63410044.98013941", "1145.6472380948264"], "runes": ["467", "349", "271", "198", "168", "126", "97", "75", "65", "49", "43", "32", "15", "15", "18", "8", "11", "2", "3", "7", "1", "2", "3", "1", null, "1", "1"], "money": "2788753091.3356676", "total_points": "5.330109715618603e90663", "rune_level": "8", "notation": "S:e33", "comma_format": "15", "artifact": ["4", "2", "3", "5"], "rune_col": "0", "el_col": "0", "ppt": 0 }',
        '{ "points": "1.513212851943907e114", "upgrade": "185", "rp": "2.2969121524723435e29", "el": [], "runes": ["270", "96", "37", "10", "1", "4", "1"], "money": "684.9798342088854", "total_points": "1.5197257476345378e114", "rune_level": "0", "notation": "S:e3e30", "comma_format": "3", "artifact": ["0", "0", "0", "0"], "rune_col": "0", "el_col": "0" }',
        '{ "points": "ee21.029818246836296", "upgrade": "1.779010366708757e21", "rp": "ee18.625806426488683", "el": ["0", "4.037401962109029e8773311313", "1.9759902061642913e147158", "1.3329088227527632e372", "2.5500474410541565e35", "1.4511551876999074e24", "3.116561993362038e21", "1.9781776260596806e19", "1.3108074727542645e17", "844708884154750", "5218939295373.871", "28756317.59034941", "15557.842102317425", "2.7704229946200307"], "runes": ["162", "141", "136", "114", "88", "88", "66", "82", "54", "59", "47", "33", "32", "33", "42", "22", "21", "15", "16", "16", "11", "7", "13", "10", "5", "5", "4", "3", "6", "2", "1", "4", "7", "1", "6", "5", "2", "1", "2", "0", "0", "1", "0", "0", "0", "0", "2", "1", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1"], "money": "2.3065071609557886e71", "total_points": "ee21.029818246836292", "rune_level": "94", "notation": "S:e33", "comma_format": "9", "artifact": ["18540767", "12296794", "10248253", "5294812"], "rune_col": "4", "el_col": "1", "ppt": 1 }',
        '{ "points": "2.995187231356636e505", "upgrade": "838", "rp": "6.993731266396493e109", "el": [], "runes": ["1781", "635", "201", "71", "15", "8", "5"], "money": "3765.0933282876413", "total_points": "4.115014578407481e505", "rune_level": "0", "notation": "S:e3e30", "comma_format": "3", "artifact": ["0", "0", "0", "0"], "rune_col": "0", "el_col": "0" }',
        '{"points":"1.9924665581687933e10024","upgrade":"16649","rp":"6.891844415436027e1965","el":[],"runes":["7322","3114","1259","525","222","119","46","14","6","2","3","0","0","1"],"money":"149192.77155397309","total_points":"3.6508095679972654e10024","rune_level":"1","notation":"S:e3e30","comma_format":"3","artifact":["0","0","0","0"],"rune_col":"0","el_col":"0"}',
        '{"points":"1.043376227337392e67348","upgrade":"111862","rp":"6.9189853334868445e11078","el":["0","2.500481908092575e76","51693059.28403633","507.6297629331988"],"runes":["13035","7058","4219","2517","1697","1171","858","596","419","348","229","213","120","96","78","48","36","25","25","12","10","9","9","1","3","1","4","0","0","2","3","0","1"],"money":"198480155.51364347","total_points":"2.4809282613932595e67348","rune_level":"8","notation":"S:e3e30","comma_format":"3","artifact":["0","0","0","0"],"rune_col":"0","el_col":"0","ppt":0}',
        '{"points":"ee260.3837874288996","upgrade":"4.019274436597898e260","rp":"ee234.04437848008877","el":["0","ee128.42337816838486","ee70.3318279969477","ee38.38147540265725","ee20.80878147579751","3.444608687579106e139251478881","1.4960690360247066e673111","7.253382460996743e838","5.864784649953375e48","4.026045443338044e21","1231033184345.6873","1798.745396915347"],"runes":["59","32","39","36","33","25","17","10","22","13","16","13","8","10","10","5","7","6","6","2","2","3","3","0","1","0","2","1","0","0","0","0","0","0","0","0","0","1","0","0","1","0","0","0","0","0","0","0","1"],"money":"1.7872766344663178e1260","total_points":"ee260.3837874288996","rune_level":"1760.1530784888596","notation":"S:e3003","comma_format":"9","artifact":["1.647386371881762e19","6.328640933895643e19","1.8521415803436958e19","1.4418505651721178e19"],"rune_col":"11","el_col":"3","ppt":1,"incr":"25118.08616545629","incr_upg":["0","0","0","0","0","0","0","0","0","3.3676843407010564","3.651122423117564","2.5928248564074665","0","4.27679816850679","3.085145563156505","0","0","4.530925063539537","4.508868417825218","6.344595153723178","1.5960397240221196","6.364849074523602","8.430072239847457","0","0","6.03838066490637","8.317646958608943","5.553428965078268","16.01232714491059","1.2926207913333227","10.167829162957604","0","0","7.268010209981019","13.95201282116098","23.404305186800286","8.83261249746295","0","0","0","0","8.329390384130441","14.451256649057148","51.0965516330481","111.431644120142","29.57694896826545","35.7832277832623","0","0","7.058605488078063","21.22823921744007","54.67279995973799","365.28786331060644","1176.3729683483261","134.64337120877457","0","0","0","0","0","0","0","0","0"]}'
    ]


function bank(num) {
    if (confirm("Are you sure you want to use this save? This will OVERRIDE your progress!")) {
        localStorage.setItem("wngu-r2", banks[num])
        location.reload()
    }
}

function import_player(data) {
    if (confirm("Are you sure you want to use this save to override the previous save?")) {
        localStorage.setItem("wngu-r2", data)
        location.reload()
    }
}



document.getElementById("notation").value = player.notation
document.getElementById("comma_slider").value = player.comma_format
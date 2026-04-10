const t1 = "K,M,B,T,Qa,Qi,Sx,Sp,Oc,No".split(",")
const t1_1 = ",U,D,T,Qa,Qi,Sx,Sp,Oc,No".split(",")
const t1_2 = ",Dc,Vg,Tg,Qag,Qig,Sxg,Spg,Ocg,Nog".split(",")
const t1_3 = ",Ce,De,Te,Qae,Qie,Sxe,Spe,Oce,Noe".split(",")

const t2_1 = ",Mi,Mc,Na,Pi,Fm,At,Zp,Yt,Xo".split(",")

const DOT_DIGITS =
    "⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿" +
    "⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿" +
    "⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿" +
    "⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿"


//i know NOTHING about regex so i let AI gen this part
//could've copied from ad notations for more dignity but i suck
function commaFormat(num) {
    var v = num.toString().split(".")
    v[0] = v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return v.join(".")
}

function standard(n, la) {
    var n = new Decimal(n)
    if (la.eq(1) && n.gte(1000000000)) {
        la = n.log10().div(3).sub(3).floor().max(0).add(1)
        n = n.div(la.sub(1).times(3).pow10()).floor()
    }
    var c = ""
    if (n.lte(9)) {
        return `${t1[n]}`
    } else {
        if (n.gte(1000)) {
            c = `${standard(n.div(1000).floor().sub(1), la.add(1))}${t2_1[la]}-`
        }
        c = `${c}${t1_1[n.mod(10)]}${t1_2[(n.div(10).floor()).mod(10)]}${t1_3[(n.div(100).floor()).mod(10)]}`
    }
    return c
}

function ltl(x) {
    const l = "0123456789abcdefghijklmnopqrstuvwxyz"
    const m = "abcdefghijklmnopqrstuvwxyz"
    var x = x.split("").map(y => m[l.indexOf(y)]).join("")
    return x
}

function modLog(num) {
    return num.log(2).mod(1).pow_base(2).add(num.log(2).floor()).sub(1)
}

function dot_sub(num,prec) {
    var v = num.log10().mod(1).pow10().div(10)
    var u = ""
    for (i = 0; i < prec; i++){
        v = v.mod(1)
        v = v.times(254)
        u = u + DOT_DIGITS[v.floor()]
    }
    return u
}

function dots(num) {
    if (num.sign == -1) { return '⠁'+dots(num.times(-1))}
    if (num.eq(0)) { return "⣿"}
    if (num.lt(1)) { return "⣿"+dots(num.pow(-1))}
    return "⣿⣿"+dot_sub(num,4)+dot_sub(num.log10().floor(),num.log10().log10().floor().add(1))
}

function hex(num) {
    var v = num
    var j = ""
    for (i = 0; i < 32; i++) {
        if (!v.gt(0)) { v = modLog(v.times(-1)).times(-1); j = j + "0" } else { v = modLog(v); j = j + "1" }
    }
    return parseInt(j,2).toString(16)
}

function format(num, prec = 2) {
    var no = player.notation
    if (no[0] == "S") { var lim = no.split(":")[1] }
    else {var lim = new Decimal(0)}
    var num = new Decimal(num)
    if (no[0] == "H") { return hex(num) }
    if (no[0] == "D") { return dots(num) }
    if (num.eq(0)) {return num.toFixed(prec)}
    if (num.lt(0)) { return `-${format(num.times(-1))}` }
    if (num.lt(0.001)){return `${format(num.pow(-1))}<sup>-1</sup>`}
    if (num.lte(`e${player.comma_format}`)) { return commaFormat(num.toFixed(prec)) }
    else if (num.lte(lim)) {
        var n = num.log10().div(3).floor().sub(1)
        var m = num.log10().mod(3).pow10()
        if (num.lte("e3e9")) { return `${format(m,prec)} ${standard(n, new Decimal(1))}` }
        else { return `${standard(n, new Decimal(1))}s` }
    }
    else if (num.lte("10^^5")) {
        if (no[0]=="I"){return `${format(num.log(new Decimal(2).pow(1024)),prec+1)}&infin;`}
        if (num.lte(`ee${player.comma_format}`)) { return `${num.log10().mod(1).pow10().toFixed(prec)}e${format(num.log10().floor().add(0.01), 0)}` }
        if (num.lte(`eee${player.comma_format}`)) { return `e${format(num.log10(), prec + 1)}` }
        return `e${format(num.log10(),prec)}`
    }
    else {
        return num.mag < 1e10 ? `${format(Math.log10(num.mag))}F${format(num.layer,0)}` : `${format(Math.log10(Math.log10(num.mag)))}F${format(num.layer+1,0)}`
    }
}
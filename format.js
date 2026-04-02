const t1 = "K,M,B,T,Qa,Qi,Sx,Sp,Oc,No".split(",")
const t1_1 = ",U,D,T,Qa,Qi,Sx,Sp,Oc,No".split(",")
const t1_2 = ",Dc,Vg,Tg,Qag,Qig,Sxg,Spg,Ocg,Nog".split(",")
const t1_3 = ",Ce,De,Te,Qae,Qie,Sxe,Spe,Oce,Noe".split(",")

const t2_1 = ",Mi,Mc,Na,Pi,Fm,At,Zp,Yt,Xo".split(",")




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

function format(num, prec = 2) {
    var no = player.notation
    if (no[0] == "S") { var lim = no.split(":")[1] }
    else {var lim = new Decimal(0)}
    var num = new Decimal(num)
    if (num.lt(0)) { return `-${format(num.times(-1))}` }
    if (num.lte(1000000)) { return num.toFixed(prec) }
    else if (num.lte(lim)) {
        var n = num.log10().div(3).floor().sub(1)
        var m = num.log10().mod(3).pow10()
        if (num.lte("e3e9")) { return `${format(m)} ${standard(n, new Decimal(1))}` }
        else { return `${standard(n, new Decimal(1))}s` }
    }
    else if (num.lte("10^^5")) {
        if (no[0]=="I"){return `${format(num.log(new Decimal(2).pow(1024)),prec+1)}&infin;`}
        if (num.lte("e1000000")){return `${num.log10().mod(1).pow10().toFixed(prec)}e${format(num.log10(),0)}`}
        return `e${format(num.log10())}`
    }
    else {
        return num.mag < 1e10 ? `${format(Math.log10(num.mag))}F${format(num.layer,0)}` : `${format(Math.log10(Math.log10(num.mag)))}F${format(num.layer+1,0)}`
    }
}
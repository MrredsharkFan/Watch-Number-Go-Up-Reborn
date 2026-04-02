const t1 = "K,M,B,T,Qa,Qi,Sx,Sp,Oc,No".split(",")
const t1_1 = ",U,D,T,Qa,Qi,Sx,Sp,Oc,No".split(",")
const t1_2 = ",Dc,Vg,Tg,Qag,Qig,Sxg,Spg,Ocg,Nog".split(",")
const t1_3 = ",Ce,De,Te,Qae,Qie,Sxe,Spe,Oce,Noe".split(",")

const t2_1 = ",Mi,Mc,Na,Pi,Fm,At,Zp,Yt,Xo".split(",")




function standard(n, la) {
    var n = new Decimal(n)
    if (la.eq(1)&&n.gte(1000000000)) {
        la = n.log10().div(3).sub(3).floor().max(0).add(1)
        n = n.div(la.sub(1).times(3).pow10()).floor()
    }
    var c = ""
    if (n.lte(9)) {
        return `${t1[n]}`
    } else {
        if (n.gte(1000)) {
            c = `${standard(n.div(1000).
                floor().sub(1), la.add(1))}${t2_1[la]}-`
        }
        c = `${c}${t1_1[n.mod(10)]}${t1_2[(n.div(10).floor()).mod(10)]}${t1_3[(n.div(100).floor()).mod(10)]}`
    }
    return c
}

function format(num) {
    var num = new Decimal(num)
    if (num.lt(0)) { return `-${format(num.times(-1))}` }
    if (num.lte(1000)) { return num.toFixed(3) }
    else if (num.lte("e3e30")) {
        var n = num.log10().div(3).floor().sub(1)
        var m = num.log10().mod(3).pow10()
        return `${format(m)}${standard(n,new Decimal(1))}`
    }
}
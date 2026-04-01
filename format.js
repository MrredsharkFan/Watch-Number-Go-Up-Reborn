const t1 = "K,M,B,T,Qa,Qi,Sx,Sp,Oc,No".split(",")
const t1_1 = ",U,D,T,Qa,Qi,Sx,Sp,Oc,No".split(",")
const t1_2 = ",Dc,Vg,Tg,Qag,Qig,Sxg,Spg,Ocg,Nog".split(",")
const t1_3 = ",Ce,De,Te,Qae,Qie,Sxe,Spe,Oce,Noe".split(",")






function format(num) {
    var num = new Decimal(num)
    if (num.lte(1000)) { return num.toFixed(3) }
    else if (num.lte("1e3003")) {
        var n = num.log10().div(3).floor().sub(1)
        var m = num.log10().mod(3).pow10()
        if (n.lte(9)) {
            return `${format(m)}${t1[n]}`
        } else {
            return `${format(m)}${t1_1[n % 10]}${t1_2[(n.div(10).floor()) % 10]}${t1_3[(n.div(100).floor())%10]}`
        }
    }
    else if (num.lte("1e1000000")) { return `${format(num.log10().mod(1).pow10())}e${num.log10().floor()}` }
    else if (num.lte("10^^5")) { return `e${format(num.log10())}` }
    else {return "fcuk you"}
}
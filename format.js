function format(num) {
    var num = new Decimal(num)
    if (num.lte(1e6)) { return num.toFixed(3) }
    else if (num.lte("1e1000000")) { return `${format(new Decimal.pow(10, num.log10().mod(1)))}e${num.log10().floor()}` }
    else if (num.lte("10^^5")) { return `e${format(num.log10())}` }
    else {return "fcuk you"}
}
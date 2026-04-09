const artifact_names = ["point","omega","money","luck"]


function draw_artifact(input=player.artifact) {
    for (var i in input) {
        dg(`a${i}`,`${format(input[i])} ${artifact_names[i]} artifacts<br>${effect_text(i,input[i])}`)
    }
}

function artifact_button_load() {
    var t = ""
    for (var i = 0; i <= 3; i++) {
        t = t+`<button onclick="artifact_reset(${i})" class="ar_button" id="a${i}" style="top: ${i*24+2}%; width: 66%; left: 32%; height: 24%; position: absolute"></button>`
    }
    return t
}

function artifact_reset(id) {
    if (artifact_power()[0].gte(1)) {
        player.artifact[id] = player.artifact[id].add(artifact_power()[0])
        rebirth()
        player.runes = [new Decimal(0)]
        player.money = new Decimal(0)
    }
}

function get_art_effect(id,amt=player.artifact[id]) {
    if (id == 0) { return [amt.div(100).add(1).log10().add(1).log10().div(3).add(1), amt.add(1).pow(0.64)] }
    if (id == 1) { return amt.add(1).pow(1.25) }
    if (id == 2) { return amt.add(1).pow(0.75) }
    else { return amt.div(2).add(1).log10().div(3).add(1).pow(1.25) }
}

function effect_text(id, amt) {
    if (id == 0) {
        var e = get_art_effect(id, amt)
        return `^${format(e[0],4)} points, ^${format(e[1],4)} rune multiplier`
    }
    var e = get_art_effect(id, amt)
    e = format(e,id==3?4:2)
    if (id == 1) { return `*${e} all reset stats` }
    if (id == 2) { return `*${e} money` }
    if (id == 3) {return `*${e} luck`}
}

dg("ar_btn",artifact_button_load())
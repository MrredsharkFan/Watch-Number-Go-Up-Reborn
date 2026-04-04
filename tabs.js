current_tab = ""
function update_tabs(name) {
    document.getElementById(name).style.top = current_tab == name ? "10%" : "110%"
}
function tab(input) {
    var ou = current_tab
    if (input == current_tab) {
        current_tab = ""
    } else {
        current_tab = input
    }
    if (ou != "") { update_tabs(ou) }
    update_tabs(input)
}
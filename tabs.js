current_tab = ""
function update_tabs() {
    document.getElementById("Settings").style.top = current_tab == "Settings" ? "10%" : "110%"
}
function tab(input) {
    if (input == current_tab) {
        current_tab = ""
    } else {
        current_tab = input
    }
    update_tabs()
}
_ADDCOMMAND(new _COMMAND("open paper", function(p) {
    if(_FILEFROMPATH() != false && _FILEFROMPATH().type == "txt") {
        //disable typing in terminal
        _TYPINGINPUT = false;
        //textarea
        Message.raw(`
        <textarea id="PAPEREDITOR" class="pn t normal" style="border-color:white;"></textarea>
        `);
        //this will set the old documents value into the textarea for actual editing
        document.getElementById("PAPEREDITOR").innerText = _FILEFROMPATH().content;
        //save
        Message.raw(`
        <button onclick="_PAPEREDITORSAVE()" class="pn t normal" style="border-color:transparent;">[save]</button>
        `);
        //exit without save
        Message.raw(`
        <button onclick="_PAPEREDITOREXIT()" class="pn t normal" style="border-color:transparent;">[exit]</button>
        `);
    } else {
        Message.sendSystem(_TYPINGCURRENT);
        Message.out.error("file must be type `txt`!");
    }
}))
function _PAPEREDITORSAVE() {
    _FILEFROMPATH().content = document.getElementById("PAPEREDITOR").value;
    _TYPINGCURRENT = "";
    _UPDATEKEYBOARD();
    _EXECUTECOMMAND("clr");
    //allow typing again
    _TYPINGINPUT = true;
}
function _PAPEREDITOREXIT() {
    _TYPINGCURRENT = "";
    _UPDATEKEYBOARD();
    _EXECUTECOMMAND("clr");
    //allow typing again
    _TYPINGINPUT = true;
}
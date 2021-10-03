/** macro executor: it takes a list of commands, and executes them all as long as they are in a .macro format. */
_ADDCOMMAND(new _COMMAND("open macro", function(p) {
    /** example:
     * clr&cfile*h,txt&cd*h&open paper
     * SEPERATED by &'s.
     */
    Message.sendSystem(_TYPINGCURRENT);
    _TYPINGCURRENT = "";
    _UPDATEKEYBOARD();
    if(_FILEFROMPATH() != false && _FILEFROMPATH() != undefined ? _FILEFROMPATH().type == "macro" : false) {
        var list=_FILEFROMPATH().content.split("&");
        //diable system messages during execution
        _SYSMESSAGE = false;
        for(i2=0;i2<list.length;i2++) {
            _EXECUTECOMMAND(list[i2]);
        }
        //allow system messages again
        _SYSMESSAGE = true;
    } else {
        Message.out.error("macro: found invalid file");
    } 
}));
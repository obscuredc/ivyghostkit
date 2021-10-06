/** variable STD */
/** variable commands */
_ADDCOMMAND(new _COMMAND("ivar", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    if(_GETVARIABLE(p[0]) != false) {
        var v = _GETVARIABLE(p[0]);
        Message.out.nom(`ID: ${v.ID},<br>VALUE: ${v.VALUE}`, "normal");
    } else {
        Message.out.nom(`invalid variable id`, "error");
    }
}))
_ADDCOMMAND(new _COMMAND("cvar", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    _ADDVARIABLE(new _VARIABLE(p[0], p[1], VTYPES.NORMAL));
}))
/** planned: var inspect (var info), var set*varname,vals, var get*varname,(file[filename] | var[varname] to set valueOf) */

/* normal std */

_ADDCOMMAND(new _COMMAND("cd", function(p) {
    var c=p[0];
    if(c == "" || c == undefined) {
        Message.sendSystem(_TYPINGCURRENT);
        _SYSTEMATTRCHANGE("", _SYSTEMAPPLICATION);
    } else if(FileSystem[c]) {
        Message.sendSystem(_TYPINGCURRENT);
        _SYSTEMATTRCHANGE(c, _SYSTEMAPPLICATION);
    } else {
        //error, not a real file
        Message.sendSystem(_TYPINGCURRENT);
        Message.out.nom(`invalid path ${c}`, "error");
    }
}));
_ADDCOMMAND(new _COMMAND("cfile", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    Message.out.nom(`created file ${p[0]}.${p[1]}`)
    _FILESYSTEMADD(new file(p[0], "", p[1]));
}))
_ADDCOMMAND(new _COMMAND("clr", function(p) {
    IO.out.innerHTML = "";
}))
_ADDCOMMAND(new _COMMAND("rfile", function (p) {
    Message.sendSystem(_TYPINGCURRENT);
    try {
        Message.out.nom(FileSystem[_SYSTEMPATH].content, "normal");
    } catch {
        Message.out.error(`invalid file!`);
    }
}))
_ADDCOMMAND(new _COMMAND("del", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    try {
        if(!_SYSTEMPATH == "") {
            FileSystem[_SYSTEMPATH] = undefined;
            _SYSTEMATTRCHANGE("", _SYSTEMAPPLICATION);
            Message.out.nom("deleted current file!", "normal");
        } else {
            Message.out.error("cannot delete empty file!");
        }
    } catch {
        Message.out.error(`invalid file!`);
    }
}))
_ADDCOMMAND(new _COMMAND("retype", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    try {
        if(!_SYSTEMPATH == "") {
            FileSystem[_SYSTEMPATH].type = p[0];
            Message.out.nom("retyped current file", "normal");
        } else {
            Message.out.error("cannot retype empty file!");
        }
    } catch {
        Message.out.error(`invalid file!`);
    }
}))
_ADDCOMMAND(new _COMMAND("info", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    try {
        if(!_SYSTEMPATH == "" && _FILEFROMPATH() != false) {
            Message.out.nom(`Type: ${_FILEFROMPATH().type},<br>
            Name: ${_FILEFROMPATH().id},<br>length: ${_FILEFROMPATH().content.length}
            `, "normal");
        } else {
            Message.out.error("cannot get info of empty file!");
        }
    } catch {
        Message.out.error(`invalid file!`);
    }
}))
_ADDCOMMAND(new _COMMAND("out", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    Message.out.nom(p.join(","));
}))
_ADDCOMMAND(new _COMMAND("version", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    Message.out.nom(_SYSTEMVERSION + " written by " + _AUTHORS.join(","));
    Message.out.nom(`distribution: ${_SYSTEMDIST}.`);
}))
_ADDCOMMAND(new _COMMAND("help", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    Message.out.nom("Avalible commands:");
    for(i=0; i<CommandRegistry.length;i++) {
        Message.out.nom(CommandRegistry[i].id, "normal");
    }
}))
_ADDCOMMAND(new _COMMAND("time", function (p) {
    //get time
    var d = new Date();
    Message.sendSystem(_TYPINGCURRENT);
    Message.out.nom(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}@${d.getHours() <= 12 ? d.getHours() + "AM" : d.getHours() - 12 + "PM" }:${d.getMinutes()}.${d.getSeconds()}`);
}))
_ADDCOMMAND(new _COMMAND("efile", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    try {
        if(!_SYSTEMPATH == "" && _FILEFROMPATH() == false ? false : _FILEFROMPATH().type == "txt") {
            FileSystem[_SYSTEMPATH].content = p.join(",");
            Message.out.nom("changed documents text", "normal");
        } else {
            Message.out.error("cannot edit empty file!");
        }
    } catch {
        Message.out.error(`invalid file!`);
    }
}))
_ADDCOMMAND(new _COMMAND("afile", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    try {
        if(!_SYSTEMPATH == "" && _FILEFROMPATH() == false ? false : _FILEFROMPATH().type == "txt") {
            FileSystem[_SYSTEMPATH].content += p.join(",");
            Message.out.nom("changed documents text", "normal");
        } else {
            Message.out.error("cannot edit empty file!");
        }
    } catch {
        Message.out.error(`invalid file!`);
    }
}))
_ADDCOMMAND(new _COMMAND("bfile", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    try {
        if(!_SYSTEMPATH == "" && _FILEFROMPATH() == false ? false : _FILEFROMPATH().type == "txt") {
            FileSystem[_SYSTEMPATH].content = p.join(",") + FileSystem[_SYSTEMPATH];
            Message.out.nom("changed documents text", "normal");
        } else {
            Message.out.error("cannot edit empty file!");
        }
    } catch {
        Message.out.error(`invalid file!`);
    }
}))

_ADDCOMMAND(new _COMMAND("listfile", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    //lists all files and their infos
    Message.out.nom("finding files", "special")
    if(FileSystem.discoverProps.length !=0) {
        for(i3=0;i3<FileSystem.discoverProps.length;i3++) {
           var t = FileSystem[FileSystem.discoverProps[i3]];
           try {
                Message.out.nom(`found \`${t.id}\`:`, "warn");
                Message.out.nom(`name: ${t.id},<br>type: ${t.type},<br>length: ${t.content.length}`);
           } catch {
               Message.out.nom(`found deleted file`, "warn");
           }
        }
    } else {
        Message.out.nom("there are no files", "warn");
    }
}))
_ADDCOMMAND(new _COMMAND("exelog", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    Message.out.nom(_EXECUTIONLOG.join("<br>"), "normal");
}))
_ADDCOMMAND(new _COMMAND("tip", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    var tips = ["dont worry", "never gonna give you up", "instead of studying i did this", "good advice.", "will i die alone?", "a cruel programmer's thesis"];
    var n = Math.floor(Math.random() * (tips.length));

    Message.out.nom(tips[n], "normal");
}))
/** Macro */
/** macro executor: it takes a list of commands, and executes them all as long as they are in a .macro format. */
_ADDCOMMAND(new _COMMAND("open macro", function(p) {
    _SYSTEMATTRCHANGE(_SYSTEMPATH, "macro");
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
    _SYSTEMATTRCHANGE(_SYSTEMPATH, "native");
}));
/** DLLs and Macros are the same except for the seperator: this is so DLL files can create Macro files */
/** DLL example:
 *  out<Starting;cd;out<Ending
 */
_ADDCOMMAND(new _COMMAND("open dll", function(p) {
    _SYSTEMATTRCHANGE(_SYSTEMPATH, "dll");
    Message.sendSystem(_TYPINGCURRENT);
    _TYPINGCURRENT = "";
    _UPDATEKEYBOARD();
    if(_FILEFROMPATH() != false && _FILEFROMPATH() != undefined ? _FILEFROMPATH().type == "dll" : false) {
        var list=_FILEFROMPATH().content.split(";");
        //diable system messages during execution
        _SYSMESSAGE = false;
        _PARSECOMMANDSPLITTER = "<";
        for(i2=0;i2<list.length;i2++) {
            _EXECUTECOMMAND(list[i2]);
        }
        //allow system messages again
        _SYSMESSAGE = true;
        //reset to defaults
        _PARSECOMMANDSPLITTER = "*";
    } else {
        Message.out.error("dll: found invalid file");
    } 
    _SYSTEMATTRCHANGE(_SYSTEMPATH, "native");
}));
//whatever you put down here will be executed in the terminal from the start as a macro
var _OSBOOTPAYLOAD;
//this file runs the terminal and all setup commands.
/** stuff to do on load. */

_ADDVARIABLE(new _VARIABLE("_SYSTEMVERSION", _SYSTEMVERSION, VTYPES.CONSTANT));
_ADDVARIABLE(new _VARIABLE("_SYSTEMDIST", _SYSTEMDIST, VTYPES.CONSTANT));

_LOADAFTERBOOT(); //show welcome message & img

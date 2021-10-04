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
_ADDCOMMAND(new _COMMAND("listfile", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    //lists all files and their infos
    Message.out.nom("finding files", "special")
    if(FileSystem.discoverProps.length !=0) {
        for(i3=0;i3<FileSystem.discoverProps.length;i3++) {
           var t = FileSystem[FileSystem.discoverProps[i3]];
           Message.out.nom(`found \`${t.id}\`:`, "warn");
           Message.out.nom(`name: ${t.id},<br>type: ${t.type},<br>length: ${t.content.length}`);
        }
    } else {
        Message.out.nom("there are no files", "t warn");
    }
}))
_ADDCOMMAND(new _COMMAND("exelog", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    Message.out.nom(_EXECUTIONLOG.join("<br>"), "normal");
}))

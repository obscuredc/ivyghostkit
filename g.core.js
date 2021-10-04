_SYSTEMVERSION = "ivy ghostkit 100";
_SYSTEMDIST = "standard";
_AUTHORS = ["obscuredc"];

/** IO SECTION + UI */
var IO = {
    out: document.getElementById("IO-out")
}

var Message = {
    raw: function (_msg) {
        IO.out.innerHTML += _msg;
    },
    _LOCALID: 0
}
_SYSMESSAGE = true;
Message.send = function (_msg, auth) {
    Message.raw(`<p id="MessageSend${Message._LOCALID}" class="pn">${auth}:${_msg}</p>`);
    ++Message._LOCALID;
    return Message._LOCALID - 1;
}
Message.sendSystem = function (_msg, cssatr) {
    if(_SYSMESSAGE == true) {
        Message.raw(`<p id="MessageSend${Message._LOCALID}" class="pn t ${cssatr}"><span class="t special">${_SYSTEMAPPLICATION}</span>${_SYSTEMPATH == "" ? "" : "@" + _SYSTEMPATH}:${_msg}</p>`);
        ++Message._LOCALID;
        return Message._LOCALID - 1;
    }
}
Message.out = {};
Message.out.normal = function (_msg) {
    return Message.sendSystem(_msg, "normal");
}
Message.out.warn = function (_msg) {
    return Message.sendSystem(_msg, "warn");
}
Message.out.error = function (_msg) {
    return Message.sendSystem(_msg, "error");
}
Message.out.nom = function(_msg, cssattr) {
    Message.raw(`<p id="MessageSend${Message._LOCALID}" class="pn t ${cssattr}">${_msg}</p>`);
    ++Message._LOCALID;
    return Message._LOCALID - 1;
}
/** VirtualFile and Path */
class file {
    constructor(id, content, type) {
        this.id=id;
        this.content=content;
        this.type=type;
    }
    editContent(n) {
        this.content=n;
    }
}
function _FILESYSTEMADD(file) {
    FileSystem[file.id] = file;
    FileSystem.discoverProps.push(file.id);
}
var FileSystem = {
    discoverProps: []
}
var _SYSTEMPATH, _SYSTEMAPPLICATION = "";
function _FILEFROMPATH() {
    return _SYSTEMPATH == "" && FileSystem[_SYSTEMPATH] != undefined ? false : FileSystem[_SYSTEMPATH];
}
function _SYSTEMATTRCHANGE(path, app) {
    _SYSTEMPATH = path;
    _SYSTEMAPPLICATION = app;
    _UPDATEKEYBOARD();
}
/** VoidKeyboard */
_TYPINGINPUT = true;
_TYPINGEDITCHAR = `\u2588`; //use unicode because it breaks when using raw character for some technical reason
_TYPINGCURRENT = "";
_VOIDKEYBOARD = document.getElementById("VoidKeyboard");
function _UPDATEKEYBOARD() {
    _VOIDKEYBOARD.innerHTML = `<span class="t special">${_SYSTEMAPPLICATION}</span>${_SYSTEMPATH == "" ? "" : "@" + _SYSTEMPATH}:` + _TYPINGCURRENT + `<span class="t blink">${_TYPINGEDITCHAR}</span>`;
}
document.addEventListener("keydown", function (event) {
    switch(event.key) {
        case "Control":
        case "Shift":
        case "Alt":
        case "Escape":
        case "Tab":
        case "CapsLock":
        case "Meta":
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
            break;
        case "Backspace":
            _TYPINGCURRENT = _TYPINGCURRENT.substring(0, _TYPINGCURRENT.length - 1);
            _UPDATEKEYBOARD();
            break;
        case "Enter":
            _EXECUTECOMMAND(_TYPINGCURRENT);
            _TYPINGCURRENT = "";
            _UPDATEKEYBOARD();
            break;
        default:
            if(_TYPINGINPUT) {
                _TYPINGCURRENT += event.key;
                _UPDATEKEYBOARD();
                break;
            }
    }
})

/** Command Executor */
_EXECUTIONLOG = [];
class _COMMAND {
    constructor(id, onexec) {
        this.id=id;
        /** accept single param: it will have an ordered array by
         * user input order of parameters. IE: `add*1,2` -> {cmd:"add",params:["1", "2"]}
         */
        this.onexec=onexec;
    }
    execute(p) {
        this.onexec(p);
    }
}
var CommandRegistry = [];
function _COMMANDBYID(id) {
    for(i = 0; i < CommandRegistry.length; i++) {
        if(CommandRegistry[i].id==id) {
            return CommandRegistry[i];
        }
    }
    return false;
}
function _ADDCOMMAND(c) {
    CommandRegistry.push(c);
}
function _PARSECOMMAND(_STRRAW) {
    /** expect: COMMAND*PARAM1,PARAM2... */
    var s=_STRRAW.split("*");
    if(s[1]) {
        return {
            cmd:s[0],
            params:s[1].split(",")
        }
    } else {
        return {
            cmd:s[0],
            params:[]
        }
    }
}
function _EXECUTECOMMAND(raw) {
    _EXECUTIONLOG.push(raw);
    var f = _PARSECOMMAND(raw);
    if(_COMMANDBYID(f.cmd) != false || undefined) {
        _COMMANDBYID(f.cmd).execute(f.params);
    } else {
        // Command doesn't exist!
        Message.sendSystem(_TYPINGCURRENT);
        Message.out.nom(`invalid cmd \`${f.cmd}\``, "error");
    }
}

//onstart
_SYSTEMPATH = "";
_SYSTEMAPPLICATION = "native";
//render block for typing
_UPDATEKEYBOARD();

Message.sendSystem("welcome to the ivy ghostkit!");

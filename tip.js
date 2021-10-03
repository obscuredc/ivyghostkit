_ADDCOMMAND(new _COMMAND("tip", function(p) {
    Message.sendSystem(_TYPINGCURRENT);
    var tips = ["dont worry", "never gonna give you up", "instead of studying i did this", "good advice.", "will i die alone?"];
    var n = Math.floor(Math.random() * (tips.length));

    Message.out.nom(tips[n], "normal");
}))
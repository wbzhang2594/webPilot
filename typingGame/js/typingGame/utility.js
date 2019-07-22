function createChar(num) {
    var stage = document.getElementById("stage");


    for (var i = 0; i < num; i++) {

        let targetCharacter = CharacterFactory.getInstance().createCharacter();
        var actor = targetCharacter.actor;

        stage.appendChild(actor);
    }

}

class TargetCharacter {
    constructor(name) {
        var role = document.getElementById("role_targetC");
        var newRole = role.cloneNode(true);

        newRole.name = name;
        this._actor = newRole;

        this._charValue = createRandomCharacter(newRole);

    }

    get charValue() {
        return this._charValue;
    }

    set charValue(value) {
        this._charValue = value;
    }

    get actor() {
        return this._actor;
    }
    set actor(value) {
        this._actor = value;
    }

    dispose() {
        this._actor.parentNode.removeChild(this.actor);
    }
}

class CharacterFactory {
    constructor() {
        this.instance = null;
        this.index = 0;
        this.charSet = [];
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new CharacterFactory();
        }
        return this.instance;
    }

    createCharacter() {

        var targetCharacter = new TargetCharacter(this.index++);
        this.charSet.push(targetCharacter);
        return targetCharacter;
    }

    findAndRemove(char) {
        if (char.length != 1 || char < "0" || char > "z") {
            return;
        }

        for (var i = this.charSet.length - 1; i >= 0; i--) {
            var tempChar = this.charSet[i];
            if (tempChar.charValue == char) {
                tempChar.dispose();
                this.charSet.splice(i, 1);
            }
        }

    }

}

function createRandomCharacter(node) {
    var rand = randomstring(1);
    node.value = rand;
    node.getElementsByClassName("content")[0].innerText = rand;

    if (0 <= rand && rand <= 9) {
        node.style.color = "red";
    }
    if ('a' <= rand && rand <= 'z') {
        node.style.color = "orange";
    }

    return rand;
}

function randomstring(L) {
    var s = '';
    var randomchar = function() {
        var n = Math.floor(Math.random() * 62);
        if (n < 10) return n; //1-10
        if (n < 36) return String.fromCharCode(n + 55); //A-Z
        return String.fromCharCode(n + 61); //a-z
    }
    while (s.length < L) s += randomchar();
    return s;
}
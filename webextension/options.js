function saveOptions(e) {

    var minimal = false;

    if (document.querySelector("#tipStyle").value == 'minimal') {
        minimal = true;
    }

    var storageItem = browser.storage.local.set({
        'top': document.querySelector("#top").value,
        'currency': document.querySelector("#currency").value,
        'period': document.querySelector("#period").value,
        'ignoreCase': document.querySelector("#ignoreCase").checked,
        'checkNames': document.querySelector("#checkNames").checked,
        'time': null,
        'minimal': minimal
    });

    e.preventDefault();
}

function setCurrentChoice(settings) {
    document.querySelector("#top").value = settings.top || '0';
    document.querySelector("#currency").value = settings.currency || 'usd';
    document.querySelector("#period").value = settings.period || '24h';
    document.querySelector("#ignoreCase").checked = settings.ignoreCase || true;
    document.querySelector("#checkNames").checked = settings.checkNames || true;
    document.querySelector("#tipStyle").value = (settings.minimal ? 'minimal' : 'widget');
}

function onError(error) {
    console.error("Cryptip Error: " + error)
}

function restoreOptions() {
    var storageItem = browser.storage.local.get();
    storageItem.then(setCurrentChoice, onError);
}


function resetOptions() {
    var clearing = browser.storage.local.clear();
}

//document.addEventListener('DOMContentLoaded', restoreOptions);
restoreOptions();
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", resetOptions);
function ModalBrowser()
{
    this.callbacks = {}
    this.defaultHeight = 480;
    this.currentId;
}

ModalBrowser.prototype.show = function (id, url, title, dialogClass, height){
    if(typeof height === "undefined") height = this.defaultHeight;
    dialogClass = (typeof dialogClass === "undefined") ? '' : ' ' + dialogClass;

    var docBody = document.getElementsByTagName('body').item(0);
    var modalElem = document.createElement('div');
    modalElem.id = id;
    modalElem.setAttribute('class', 'modal fade');
    docBody.appendChild(modalElem);

    var dialogElem = document.createElement('div');
    dialogElem.setAttribute('class', 'modal-dialog' + dialogClass);
    modalElem.appendChild(dialogElem);

    var contentElem = document.createElement('div');
    contentElem.setAttribute('class', 'modal-content');
    dialogElem.appendChild(contentElem);

    var headerElem = document.createElement('div');
    headerElem.setAttribute('class', 'modal-header');
    var headerClose = document.createElement('button');
    headerClose.setAttribute('type', 'button');
    headerClose.setAttribute('class', 'close');
    headerClose.setAttribute('data-dismiss', 'modal');
    headerClose.setAttribute('aria-label', 'Close');
    headerElem.appendChild(headerClose);
    var timesElem = document.createElement('span');
    timesElem.setAttribute('aria-hidden', 'true');
    timesElem.innerHTML = '&times;';
    headerClose.appendChild(timesElem);

    var titleElem = document.createElement('h4');
    titleElem.setAttribute('class', 'modal-title');
    titleElem.innerText = title;
    headerElem.appendChild(titleElem);
    contentElem.appendChild(headerElem);

    var bodyElem = document.createElement('div');
    bodyElem.setAttribute('class',  'modal-body');
    bodyElem.setAttribute('style',  'height:' + height + 'px;');
    contentElem.appendChild(bodyElem);
    bodyElem.innerHTML = '<iframe frameborder="0" style="width:100%;height:100%;" src="' + url + '"></iframe>';

    var footerElem = document.createElement('div');
    footerElem.setAttribute('class', 'modal-footer');
    contentElem.appendChild(footerElem);

    var footerClose = document.createElement('button');
    footerClose.setAttribute('type', 'button');
    footerClose.setAttribute('class', 'btn btn-default');
    footerClose.setAttribute('data-dismiss', 'modal');
    footerClose.innerText = 'Close';
    footerElem.appendChild(footerClose);

    this.currentId = id;
    var dialog = $('#' + id);

    dialog.modal('show');

    dialog.on('hidden.bs.modal', function (e) {
        this.remove();
    });
}

ModalBrowser.prototype.appendCallback = function(id, callback){
    this.callbacks[id] = callback;
}

ModalBrowser.prototype.call = function(args){
    this.callbacks[this.currentId].apply(this, args);
}

ModalBrowser.prototype.close = function(args){
    $('#' + this.currentId).modal('hide');
}

var modalBrowser = new ModalBrowser();

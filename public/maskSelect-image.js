"use strict";

(function () {
  var st = void 0,
      dom = void 0,
      catchDom = void 0,
      aftercatchDom = void 0,
      suscribeEvents = void 0,
      event = void 0,
      fn = void 0,
      initialize = void 0;
  dom = {};
  st = {
    container: ".js-maskSelect", //contenedor de la estructura html del select
    maskSelect: ".js-text-maskSelect", //elemento que contiene al nombre e ícono seleccionado
    select: ".js-select-maskSelect", //select nativo
    maskIcon: "js-iconSelected", //elemento donde se agregará el ícono de la opción
    optionSelected: ".js-optionSelected" };

  catchDom = function catchDom() {
    dom.container = $(st.container);
    dom.maskSelect = $(st.maskSelect);
    dom.select = $(st.select);
    dom.maskIcon = $(st.maskIcon);
    dom.optionSelected = $(st.optionSelected);
  };

  aftercatchDom = function aftercatchDom() {
    fn.addIconSelectedFirsOption();
  };

  suscribeEvents = function suscribeEvents() {
    dom.optionSelected.on('DOMNodeInserted', event.onChange);
  };

  event = {};

  event.onChange = function () {
    fn.addIconOptions();
  };

  fn = {};

  fn.addIconSelectedFirsOption = function () {
    $(st.maskSelect).each(function (i, e) {
      if ($(e).children().hasClass(st.maskIcon)) {
        fn.addIcon(e);
      }
    });
  };

  fn.addIconOptions = function () {
    var option = $(st.select).find('option');
    $(option).each(function (i, e) {
      if ($(e).attr('selected')) {
        var containerIcon = $(e).parents('select').siblings(st.maskSelect).find('[data-icon="icon"]');
        var classIcon = $(e).val();
        containerIcon.removeAttr('class');
        containerIcon.addClass('js-iconSelected ' + classIcon);
      }
    });
  };

  fn.addIcon = function (e) {
    var select = $(e).siblings('select')[0];
    var optionSelected = $(select).find('option:selected').val();
    $(e).find('.' + st.maskIcon).addClass(optionSelected);
  };

  initialize = function initialize() {
    catchDom();
    aftercatchDom();
    suscribeEvents();
  };
  return {
    init: initialize
  };
})().init();
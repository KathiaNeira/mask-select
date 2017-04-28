'use strict';

(function () {
	var dom = void 0,
	    st = void 0,
	    catchDom = void 0,
	    aftercatchDom = void 0,
	    suscribeEvents = void 0,
	    event = void 0,
	    fn = void 0,
	    initialize = void 0;
	dom = {};
	st = {
		container: '.js-maskSelect',
		maskSelect: '.js-text-maskSelect',
		select: '.js-select-maskSelect',
		maskOption: '.js-option-maskSelect',
		maskOptionSelected: '.js-optionSelected',
		classHover: 'hover'
	};

	var KEY_UP = 38;
	var KEY_DOWN = 40;
	var KEY_ENTER = 13;
	var KEY_ESC = 27;

	catchDom = function catchDom() {
		dom.select = $(st.select);
		dom.maskOption = $(st.maskOption);
		dom.maskSelect = $(st.maskSelect);
		dom.container = $(st.container);
	};

	aftercatchDom = function aftercatchDom() {
		fn.initSelect();
	};

	suscribeEvents = function suscribeEvents() {
		dom.maskSelect.on('click', event.onClick);
		$(document).on('click', '.js-option', event.value);
		dom.maskSelect.on('keydown', event.keydown);
		$(window).on('click', event.closeMaskSelect);
	};

	event = {};

	event.onClick = function (e) {
		fn.showHideOptions(e);
	};

	event.value = function (e) {
		fn.appendOptionSelected(e);
	};

	event.keydown = function (evt) {
		fn.upAndDownOptions(evt);
	};

	event.closeMaskSelect = function (e) {
		var $element;
		$element = $(e.target);
		if (!$element.hasClass('js-text-maskSelect')) {
			$(st.maskOption).removeClass('u-block');
		}
	};

	fn = {};
	// Inicializando el select
	fn.initSelect = function () {
		var optionsSelected = $.map($(st.select), fn.getOptionSelect);
		var options = $.map($(st.select), fn.getOptions);
		fn.appendOptionsMasks(optionsSelected);
		fn.createItems(options);
		fn.addHoverOptionSelected(optionsSelected);
	};

	// Obteniendo la opción seleccionada
	fn.getOptionSelect = function (element) {
		var optionSelected = $(element).find(':selected');
		var selected = optionSelected[0];
		$(selected).attr('selected', true);
		return optionSelected[0];
	};

	// Obteniendo todas las opciones
	fn.getOptions = function (element) {
		var options = $(element).find('option');
		return options;
	};

	// Agregando el texto de la opción seleccionada a la máscara
	fn.appendOptionsMasks = function (optionsSelected) {
		$.each(optionsSelected, function (i, e) {
			fn.appendTextOption(e);
		});
	};

	fn.appendTextOption = function (e) {
		var container = $(e).parents(st.container);
		var maskTextOption = $(container).find(st.maskOptionSelected);
		var textOption = $(e).text();
		$(maskTextOption).html(textOption);
	};

	// Creando la lista donde se apenearan las opciones
	fn.createItems = function (options) {
		$.each(options, function (i, e) {
			var parents = $(e).parents(st.container);
			var ul = $(parents).find(st.maskOption);
			$.each(e, function (i, e) {
				fn.appendOptionsInMask(ul, i, e);
			});
		});
	};

	// Agregando efecto de selected a la máscara de opciones
	fn.addHoverOptionSelected = function (optionsSelected) {
		$.each(optionsSelected, function (i, e) {
			fn.addHover(e);
		});
	};

	fn.addHover = function (e) {
		var container = $(e).parents(st.container);
		var ul = $(container).find(st.maskOption);
		var items = $(ul).find('li');
		var position = $(e).index();
		var itemsSelected = $(items)[position];
		$(itemsSelected).addClass(st.classHover);
	};

	//Apeneando los valores de los selecte a la máscara
	fn.appendOptionsInMask = function (ul, i, e) {
		var container = $(e).parents(st.container);
		var icon = $(container).find('[data-icon]');
		if (!icon.length) {
			$(ul).append('<li data-position="' + i + '" class="js-option"><span class="js-option-text">' + e.text + '</span></li>');
		} else {
			$(ul).append('<li data-position="' + i + '" class="js-option"><span class="u-ico_category ' + e.value + '"></span><span class="js-option-text u-option-text">' + e.text + '</span></li>');
		}
	};

	// Mostrando y ocultando la máscara de opciones
	fn.showHideOptions = function (e) {
		var target = e.target;
		var ul = $(target).siblings('ul');
		fn.removeBlockAllSelect(ul);
	};

	fn.removeBlockAllSelect = function (ul) {
		$.each($(st.select).siblings('ul'), function (i, e) {
			if (e === ul[0]) {
				$(e).toggleClass('u-block');
			} else {
				$(e).removeClass('u-block');
			}
		});
	};

	fn.appendOptionSelected = function (e) {
		var target = e.target;
		var container = $(target).parents(st.container);
		var maskSelect = $(container).find(st.maskSelect);
		var select = $(container).find('select');
		var ul = $(container).find('ul');
		var positionItems = $(target).index();
		var optionSelected = $(select).find('option')[positionItems];
		fn.removeSelected(select);
		$(optionSelected).attr('selected', true);
		fn.removeHover(ul);
		$(target).addClass(st.classHover);
		fn.appendTextOption(optionSelected);
		$(ul).removeClass('u-block');
		$(select).change();
		console.log('container', container);
		maskSelect.focus();
	};

	// removiendo el selected anterior
	fn.removeSelected = function (select) {
		$.each($(select).find('option'), function (i, e) {
			$(e).removeAttr('selected');
		});
	};

	fn.removeHover = function (ul) {
		$.each($(ul).find('li'), function (i, e) {
			$(e).removeClass(st.classHover);
		});
	};

	fn.upAndDownOptions = function (evt) {
		var target = evt.target;
		var select = $(target).siblings('select');
		var ul = $(select).siblings('ul');
		var optionSelected = '';
		$($(select).find('option')).each(function (i, element) {
			if ($(element).attr('selected')) {
				optionSelected = element;
			}
		});
		fn.removeSelected(select);
		var key = evt.keyCode;
		switch (key) {
			case KEY_UP:
				fn.upOption(evt, target, optionSelected);
				break;
			case KEY_DOWN:
				fn.downOption(evt, target, optionSelected);
				break;
			case KEY_ESC:
				$(ul).removeClass('u-block');
				break;
			case KEY_ENTER:
				$(ul).toggleClass('u-block');
				break;
		}
		$(select).change();
		evt.preventDefault();
	};

	fn.upOption = function (e, target, optionSelected) {
		var optionPrev = $(optionSelected).prev();
		fn.addSelectedNewOption(optionPrev);
		var option = fn.detectLastOption(target);
		fn.addSelectedToOption(optionPrev, option);
	};

	fn.downOption = function (e, target, optionSelected) {
		var optionNext = $(optionSelected).next();
		fn.addSelectedNewOption(optionNext);
		var option = fn.detectFirstOption(target);
		fn.addSelectedToOption(optionNext, option);
	};

	fn.addSelectedNewOption = function (otherOption) {
		$(otherOption).attr('selected', true);
		var option = otherOption[0];
		fn.addStyleMask(option, otherOption);
	};

	fn.addStyleMask = function (option, otherOption) {
		var container = $(option).parents(st.container);
		var ul = $(container).find('ul');
		fn.appendTextOption(option);
		fn.removeHover(ul);
		fn.addHover(otherOption);
	};

	fn.detectFirstOption = function (target) {
		var container = $(target).parents(st.container);
		var select = $(container).find('select');
		var option = $(select).find('option')[0];
		return option;
	};

	fn.detectLastOption = function (target) {
		var container = $(target).parents(st.container);
		var select = $(container).find('select');
		var option = $(select).find('option:last');
		return option;
	};

	fn.addSelectedToOption = function (optionToSelected, option) {
		var container = $(option).parents(st.container);
		var ul = $(container).find('ul');
		if (!optionToSelected[0]) {
			$(option).attr('selected', true);
			fn.removeHover(ul);
			fn.addHover(option);
			fn.appendTextOption(option);
		}
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
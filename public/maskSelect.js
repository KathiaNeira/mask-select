// * @Module: mask_select
// * @Description: Módulo para las máscaras de las opciones de los select
// * @author: Kathia Neira

(function() {
	var dom, st, catchDom, aftercatchDom, suscribeEvents, event, fn, initialize;
	dom = {};
	st = {
		container: '.js-maskSelect',
		maskSelect: '.js-text-maskSelect',
		select: '.js-select-maskSelect',
		maskOption: '.js-option-maskSelect',
		optionSelected: '.js-optionSelected',
		keyEnter: 13,
		keyEsc: 27,
		keyDown: 38,
		keyUp: 40
	};

	catchDom = function() {
		dom.select = $(st.select);
		dom.maskOption = $(st.maskOption);
		dom.maskSelect = $(st.maskSelect);
		dom.container = $(st.container);
	};

	aftercatchDom = function() {
		fn.addSelectedFirsOption();
	};

	suscribeEvents = function() {
		dom.maskSelect.on('click', event.onClick);
		$(document).on('click', '.js-option', event.value);
		$(window).on('click', event.closeMaskSelect);
		dom.maskSelect.on('keydown', event.keydown);
	};

	event = {};

	event.value = function(e) {
		fn.appendOptions(e);
	};

	event.onClick = function(e) {
		fn.showHideOptions(e);
	};

	event.closeMaskSelect = function(e) {
		var $element;
		$element = $(e.target);
		if (!$element.hasClass('js-text-maskSelect')) {
			$(st.maskOption).removeClass('u-block');
		}
	};

	event.keydown = function(e) {
		fn.addFocusOption(e);
	};

	fn = {};

	fn.addSelectedFirsOption = function() {
		$(st.select).each(function(i, e) {
			var containerText, firstOption, option, optionSelected, position, select, selectedItem, textFirstOption, textSelected;
			fn.createItems(e, $(e).siblings(st.maskOption));
			option = $(e).find(':selected');
			firstOption = $(e).find('option')[0];
			textFirstOption = $(firstOption).text();
			textSelected = $(option).text();
			containerText = $(e).siblings(st.maskSelect).find(st.optionSelected)[0];
			select = $(e).siblings('ul')[0];
			optionSelected = $(select).find('li');
			if (option[0] === firstOption) {
				$(firstOption).attr('selected', true);
				$(containerText).html(textFirstOption);
				$(optionSelected[0]).addClass('hover');
			} else {
				position = $(option).index();
				selectedItem = $(e).find('option')[position];
				$(selectedItem).attr('selected', true);
				$(containerText).html(textSelected);
				$(optionSelected[position]).addClass('hover');
			}
		});
	};

	fn.addHoverFirstOption = function(element) {
		var hover, li, ul;
		ul = $(element).siblings('ul')[0];
		li = $(ul).find('li')[0];
		hover = $(ul).find('li').hasClass('hover');
		if (!hover) {
			$(li).addClass('hover');
		}
	};

	fn.createItems = function(maskSelect, ul) {
		var QuantityItems, icon;
		icon = $(maskSelect).siblings(st.maskSelect).find('[data-icon]');
		QuantityItems = $(ul).find('li').length;
		if (QuantityItems <= 0) {
			$(maskSelect).find('option').each(function(i, e) {
				if (!icon.length) {
					$(ul).append('<li data-position="' + i + '" class="js-option"><span class="js-option-text">' + e.text + '</span></li>');
				} else {
					$(ul).append('<li data-position="' + i + '" class="js-option"><span class="u-ico_category ' + e.value + '"></span><span class="js-option-text u-option-text">' + e.text + '</span></li>');
				}
			});
		}
	};

	fn.showHideOptions = function(e) {
		var select, siblings, target, ul;
		target = e.target;
		select = $(target).siblings('select');
		ul = $(target).siblings('ul');
		fn.createItems(select, ul);
		siblings = $(target).siblings('select');
		$(target).parents(st.container).siblings(st.container).find('ul').removeClass('u-block');
		$(target).siblings(st.maskOption).toggleClass('u-block');
		fn.addHoverFirstOption(target);
	};

	fn.appendOptions = function(e) {
		var container, target, textFocus, value;
		target = e.target;
		value = $(target).find('.js-option-text').text();
		container = $(target).parents(dom.container).children(st.maskSelect).find(st.optionSelected);
		fn.hoverOptions(target);
		container.html(value);
		$(st.maskOption).removeClass('u-block');
		textFocus = $(target).parents('ul').siblings(st.maskSelect)[0];
		textFocus.focus();
	};

	fn.addFocusOption = function(e) {
		var listOption, listOptionSelected, maskOption, nextOption, option, optionSelected, prevOption, select, target, textOptionNext, textOptionPrev, textOptionSelected;
		target = e.target;
		maskOption = $(target).siblings('ul')[0];
		fn.closeOptionWithEnter(e, maskOption);
		listOption = $(maskOption).find('li');
		listOptionSelected = '';
		$.each(listOption, function(i, e) {
			if ($(e).hasClass('hover')) {
				listOptionSelected = e;
			}
		});
		textOptionNext = $(listOptionSelected).next('li').text();
		textOptionPrev = $(listOptionSelected).prev('li').text();
		textOptionSelected = $(target).find(st.optionSelected)[0];
		select = $(target).siblings('select');
		optionSelected = '';
		option = $(select).find('option');
		$(option).each(function(i, element) {
			if ($(element).attr('selected')) {
				optionSelected = element;
			}
		});
		nextOption = $(optionSelected).next('option')[0];
		prevOption = $(optionSelected).prev('option')[0];
		if (e.keyCode === st.keyDown) {
			fn.prevOption(prevOption, select, listOption, optionSelected, listOptionSelected, textOptionSelected, textOptionPrev);
		} else if (e.keyCode === st.keyUp) {
			fn.nextOption(nextOption, select, listOption, optionSelected, listOptionSelected, textOptionSelected, textOptionNext);
		}
		e.preventDefault();
	};

	fn.nextOption = function(nextOption, select, listOption, optionSelected, listOptionSelected, textOptionSelected, textOptionNext) {
		if (!nextOption) {
			fn.updatingOptionsDown(select, listOption);
		} else {
			fn.keyDown(optionSelected, nextOption, listOption, listOptionSelected, textOptionSelected, textOptionNext);
		}
	};

	fn.prevOption = function(prevOption, select, listOption, optionSelected, listOptionSelected, textOptionSelected, textOptionPrev) {
		if (!prevOption) {
			fn.updatingOptionsUP(select, listOption);
		} else {
			fn.keyUp(optionSelected, prevOption, listOption, listOptionSelected, textOptionSelected, textOptionPrev);
		}
	};

	fn.closeOptionWithEnter = function(e, mask) {
		var key;
		key = e.keyCode;
		if (key === st.keyEnter) {
			$(mask).toggleClass('u-block');
		} else if (key === st.keyEsc || key === 9) {
			$(mask).removeClass('u-block');
		}
	};

	fn.hoverOptions = function(e) {
		var foo, option, position;
		position = $(e).attr('data-position');
		foo = $(e).parents(st.maskOption).siblings('select').find('option').eq(position);
		option = $(e).parents(st.container).find(st.select).find('option');
		$.each(option, function(i, attrName) {
			$(attrName).removeAttr('selected');
		});
		$(foo[0]).attr('selected', true);
		$(e).parents(st.maskOption).find('li').removeClass('hover');
		$(e).addClass('hover');
	};

	fn.updatingOptionsDown = function(select, listOption) {
		var containerText, firstOption, lastOption, text;
		firstOption = $(select).find('option')[0];
		lastOption = $(select).find('option').last();
		$(lastOption).removeAttr('selected');
		$(firstOption).attr('selected', true);
		text = $(firstOption).text();
		containerText = $(select).siblings(st.maskSelect).find(st.optionSelected)[0];
		$(containerText).html(text);
		$(listOption).last().removeClass('hover');
		$(listOption).first().addClass('hover');
	};

	fn.updatingOptionsUP = function(select, listOption) {
		var containerText, firstOption, lastOption, text;
		firstOption = $(select).find('option')[0];
		lastOption = $(select).find('option').last();
		$(firstOption).removeAttr('selected');
		$(lastOption).attr('selected', true);
		text = $(lastOption).text();
		containerText = $(select).siblings(st.maskSelect).find(st.optionSelected)[0];
		$(containerText).html(text);
		$(listOption).first().removeClass('hover');
		$(listOption).last().addClass('hover');
	};

	fn.keyDown = function(optionSelected, nextOption, listOption, listOptionSelected, textOptionSelected, textOptionNext) {
		$(optionSelected).removeAttr('selected');
		$(nextOption).attr('selected', true);
		$(listOption).removeClass('hover');
		$(listOptionSelected).next('li').addClass('hover');
		$(textOptionSelected).html(textOptionNext);
	};

	fn.keyUp = function(optionSelected, prevOption, listOption, listOptionSelected, textOptionSelected, textOptionPrev) {
		$(optionSelected).removeAttr('selected');
		$(prevOption).attr('selected', true);
		$(listOption).removeClass('hover');
		$(listOptionSelected).prev('li').addClass('hover');
		$(textOptionSelected).html(textOptionPrev);
	};

	initialize = function() {
		catchDom();
		aftercatchDom();
		suscribeEvents();
	};
	return {
		init: initialize
	}
})().init()

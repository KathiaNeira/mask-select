(function() {
	let dom, st, catchDom, aftercatchDom, suscribeEvents, event, fn, initialize;
	dom={};
	st={
		container: '.js-maskSelect',
		maskSelect: '.js-text-maskSelect',
		select: '.js-select-maskSelect',
		maskOption: '.js-option-maskSelect',
		maskOptionSelected: '.js-optionSelected',
		classHover : 'hover'
	};

	const KEY_UP = 38;
	const KEY_DOWN = 40;
	const KEY_ENTER = 13;
	const KEY_ESC = 27;

	catchDom=()=>{
		dom.select = $(st.select);
		dom.maskOption = $(st.maskOption);
		dom.maskSelect = $(st.maskSelect);
		dom.container = $(st.container);
	};

	aftercatchDom=()=>{
		fn.initSelect();
	};

	suscribeEvents=()=>{
		dom.maskSelect.on('click', event.onClick);
		$(document).on('click', '.js-option', event.value);
		dom.maskSelect.on('keydown', event.keydown);
		$(window).on('click', event.closeMaskSelect);
	};

	event={};

	event.onClick =(e)=> {
		fn.showHideOptions(e);
	};

	event.value=(e)=>{
		fn.appendOptionSelected(e);
	};

	event.keydown=(evt)=>{
		fn.upAndDownOptions(evt);
	};

	event.closeMaskSelect = function(e) {
		var $element;
		$element = $(e.target);
		if (!$element.hasClass('js-text-maskSelect')) {
			$(st.maskOption).removeClass('u-block');
		}
	};

	fn={};
	// Inicializando el select
	fn.initSelect=()=>{
		let optionsSelected = $.map($(st.select), fn.getOptionSelect);
		fn.appendOptionsMasks(optionsSelected);
	};

	// Mostrando y ocultando la máscara de opciones
	fn.showHideOptions=(e)=>{
		let target = e.target;
		let ul = $(target).siblings('ul');
		let items = $(ul).find('li');
		let options = $.map($(target).siblings(st.select), fn.getOptions);
		let optionsSelected = $.each($(target).siblings(st.select).find('option'), fn.getOptionSelect);
		if ($(items).length < 1) {
			fn.createItems(options);
		}
		fn.removeBlockAllSelect(ul);
		fn.addHoverOptionSelected(optionsSelected);
	};

	// Obteniendo la opción seleccionada
	fn.getOptionSelect=(element)=>{
		let optionSelected = $(element).find(':selected');
		let selected = optionSelected[0];
		$(selected).attr('selected', true);
		return optionSelected[0];
	};

	// Obteniendo todas las opciones
	fn.getOptions=(element)=>{
		let options = $(element).find('option');
		return options;
	};

	// Agregando el texto de la opción seleccionada a la máscara
	fn.appendOptionsMasks=(optionsSelected)=>{
		$.each(optionsSelected,(i,e)=>{
			fn.appendTextOption(e);
		})
	};

	fn.appendTextOption=(e)=>{
		let container = $(e).parents(st.container);
		let maskTextOption = $(container).find(st.maskOptionSelected);
		let textOption = $(e).text();
		$(maskTextOption).html(textOption);
	};

	// Creando la lista donde se apenearan las opciones
	fn.createItems=(options)=>{
		$.each(options, (i,e)=>{
			let parents = $(e).parents(st.container);
			let ul = $(parents).find(st.maskOption);
			$.each(e, (i, e)=>{
				fn.appendOptionsInMask(ul,i,e)
			});
		})
	};

	// Agregando efecto de selected a la máscara de opciones
	fn.addHoverOptionSelected=(optionsSelected)=>{
		$.each(optionsSelected,(i,e)=>{
			if ($(e).attr('selected')) {
				fn.addHover(e);
			}
		})
	};

	fn.addHover=(e)=>{
		let container = $(e).parents(st.container);
		let ul = $(container).find(st.maskOption);
		let items = $(ul).find('li');
		let position = $(e).index();
		let itemsSelected = $(items)[position];
		$(itemsSelected).addClass(st.classHover);
	};

	//Apeneando los valores de los selecte a la máscara
	fn.appendOptionsInMask=(ul,i,e)=>{
		let container = $(e).parents(st.container)
		let icon = $(container).find('[data-icon]');
		if (!icon.length) {
			$(ul).append('<li data-position="' + i + '" class="js-option"><span class="js-option-text">' + e.text + '</span></li>');
		}else {
			$(ul).append('<li data-position="' + i + '" class="js-option"><span class="u-ico_category ' + e.value + '"></span><span class="js-option-text u-option-text">' + e.text + '</span></li>');
		}
	};


	fn.removeBlockAllSelect=(ul)=>{
		$.each($(st.select).siblings('ul'), (i,e)=>{
			if (e === ul[0]) {
				$(e).toggleClass('u-block');
			}else{
				$(e).removeClass('u-block')
			}
		});
	};

	fn.appendOptionSelected=(e)=>{
		let target = e.target;
		let container = $(target).parents(st.container);
		let maskSelect = $(container).find(st.maskSelect);
		let select = $(container).find('select');
		let ul = $(container).find('ul');
		let positionItems = $(target).index();
		let optionSelected = $(select).find('option')[positionItems];
		fn.removeSelected(select);
		$(optionSelected).attr('selected', true);
		fn.removeHover(ul);
		$(target).addClass(st.classHover);
		fn.appendTextOption(optionSelected);
		$(ul).removeClass('u-block');
		$(select).change();
		maskSelect.focus();
	};

	// removiendo el selected anterior
	fn.removeSelected=(select)=>{
		$.each($(select).find('option'), (i,e)=>{
			$(e).removeAttr('selected')
		});
	};

	fn.removeHover=(ul)=>{
		$.each($(ul).find('li'), (i,e)=>{
			$(e).removeClass(st.classHover)
		});
	};

	fn.upAndDownOptions=(evt)=>{
		let target = evt.target;
		let select = $(target).siblings('select');
		let ul = $(select).siblings('ul');
		let optionSelected = '';
		$($(select).find('option')).each(function(i, element) {
			if ($(element).attr('selected')) {
				optionSelected = element;
			}
		});

		let key = evt.keyCode;
		switch(key){
			case KEY_UP:
				fn.removeSelected(select);
				fn.upOption(evt, target, optionSelected);
				break;
			case KEY_DOWN:
				fn.removeSelected(select);
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

	fn.upOption=(e,target, optionSelected)=>{
		let optionPrev = $(optionSelected).prev();
		fn.addSelectedNewOption(optionPrev);
		let option = fn.detectLastOption(target);
		fn.addSelectedToOption(optionPrev, option);
	};

	fn.downOption=(e,target, optionSelected)=>{
		let optionNext = $(optionSelected).next();
		fn.addSelectedNewOption(optionNext);
		let option = fn.detectFirstOption(target);
		fn.addSelectedToOption(optionNext, option);
	};

	fn.addSelectedNewOption=(otherOption)=>{
		$(otherOption).attr('selected', true);
		let option = otherOption[0];
		fn.addStyleMask(option, otherOption);
	};

	fn.addStyleMask=(option, otherOption)=>{
		let container = $(option).parents(st.container);
		let ul = $(container).find('ul');
		fn.appendTextOption(option);
		fn.removeHover(ul);
		fn.addHover(otherOption);
	};

	fn.detectFirstOption=(target)=>{
		let container = $(target).parents(st.container);
		let select = $(container).find('select');
		let option = $(select).find('option')[0];
		return option
	};

	fn.detectLastOption=(target)=>{
		let container = $(target).parents(st.container);
		let select = $(container).find('select');
		let option = $(select).find('option:last');
		return option
	};

	fn.addSelectedToOption=(optionToSelected, option)=>{
		let container = $(option).parents(st.container);
		let ul = $(container).find('ul');
		if (!optionToSelected[0]) {
			$(option).attr('selected', true);
			fn.removeHover(ul);
			fn.addHover(option);
			fn.appendTextOption(option)
		}
	};

	initialize=()=>{
		catchDom();
		aftercatchDom();
		suscribeEvents();
	};

	return{
		init: initialize
	}
})().init()

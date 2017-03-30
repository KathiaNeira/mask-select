(function() {
	var dom, st, catchDom, aftercatchDom, suscribeEvents, event, fn, initialize;
	dom = {};
	st = {
		container: ".js-maskSelect", //contenedor de la estructura html del select
		maskSelect: ".js-text-maskSelect", //elemento que contiene al nombre e ícono seleccionado
		select: ".js-select-maskSelect", //select nativo
		maskOption: ".js-option-maskSelect", //elemento donde se agregará el texto de la opción seleccionada
		optionSelected: ".js-optionSelected", //elemento donde se creará la máscara de las opciones
		keyEnter: 13,
		keyEsc : 27,
		keyDown : 38,
		keyUp: 40
	};

	catchDom = () => {
		dom.select = $(st.select);
		dom.maskOption = $(st.maskOption);
		dom.maskSelect = $(st.maskSelect);
		dom.container = $(st.container);
	};

	aftercatchDom = () => {
		fn.addSelectedFirsOption();
	};
	suscribeEvents = () => {
		dom.maskSelect.on("click", event.onClick);
		$(document).on("click", '.js-option', event.value);
		$(window).on("click", event.closeMaskSelect);
		dom.maskSelect.on('keydown', event.keydown);
	};

	event = {};

	event.onChange=()=>{
		console.log('onChange');
	}

	event.value = (e) => {
		fn.appendOptions(e);
	};

	event.onClick = (e) => {
		fn.showHideOptions(e);
	};

	event.closeMaskSelect = (e) => {
		$element = $(e.target)
		if (!($element.hasClass('js-text-maskSelect')))
			$(st.maskOption).removeClass('u-block')
	};

	event.keydown = (e) => {
		fn.addFocusOption(e);
	};

	fn = {};

	//agregando el atributo selected a la primera opción del select nativo a la primera carga de la web
	fn.addSelectedFirsOption = () => {
		$(st.select).each(function(i, e) {
			firstOption = $(e).find('option')[0]
			$(firstOption).attr('selected', true)
			var text =	$(firstOption).text();
			var containerText =	$(e).siblings(st.maskSelect).find(st.optionSelected)[0];
			$(containerText).html(text);
			fn.createItems(e, $(e).siblings(st.maskOption))
			var select = $(e).siblings('ul')[0];
			var optionSelected = $(select).find('li')[0];
			$(optionSelected).addClass('hover')
		});
	};

	//Agregando el hover a la primera opción en la primera carga de la web
	fn.addHoverFirstOption=(element)=>{
		console.log('elementelement', element);
		var ul = $(element).siblings('ul')[0];
		var li = $(ul).find('li')[0];
		var hover = $(ul).find('li').hasClass('hover');
		if (!hover) {
			$(li).addClass('hover')
		}
	}

	//Apeneando los valores de las opciones a la máscara
	fn.createItems = (maskSelect, ul) => {
		var QuantityItems = $(ul).find("li").length;
		if (QuantityItems <= 0) {
			$(maskSelect).find('option').each(function(i, e) {
				$(ul).append('<li data-position="' + i + '"class="js-option">' + e.text + '</li>');
			});
		}
	};

	//Mostrando y ocultando la máscara
	fn.showHideOptions = (e) => {
		var target = e.target;
		//buscando la máscara de las opciones
		var siblings = $(target).siblings('select');
		$(target).parents(st.container).siblings(st.container).find('ul').removeClass('u-block')
		$(target).siblings(st.maskOption).toggleClass('u-block');
		//buscando la primera opcion con el selected
		fn.addHoverFirstOption(target);
		console.log('target',target);
	};

	//Apeneando el valor de la opción seleccionada
	fn.appendOptions = (e) => {
		var target = e.target;
		var value = $(target).text();
		var container = $(target).parents(dom.container).children(st.maskSelect).find(st.optionSelected);
		fn.hoverOptions(target);
		console.log('containerText', container);
		container.html(value);
		$(st.maskOption).removeClass('u-block');
		var textFocus = $(target).parents('ul').siblings(st.maskSelect)[0];
		textFocus.focus();
	};

	//Agregar el focus a la opción seleccionada por el teclafo con la tecla down y up
	fn.addFocusOption = (e) => {
		var target = e.target;
		var maskOption = $(target).siblings('ul')[0]
		fn.closeOptionWithEnter(e, maskOption);
		var listOption = $(maskOption).find('li');
		var listOptionSelected = ""
		$.each(listOption, function(i, e) {
			if ($(e).hasClass('hover')) {
				listOptionSelected = e
			}
		});
		var textOptionNext = $(listOptionSelected).next('li').text();
		var textOptionPrev = $(listOptionSelected).prev('li').text();
		var textOptionSelected = $(target).find(st.optionSelected)[0]
		var select = $(target).siblings('select');
		var optionSelected = $(select).find('option:selected')[0];
		var nextOption = $(optionSelected).next('option')[0];
		var prevOption = $(optionSelected).prev('option')[0];

		if (e.keyCode === st.keyDown) {
			fn.prevOption(prevOption, select, listOption, optionSelected,listOptionSelected, textOptionSelected, textOptionPrev);
		} else if (e.keyCode === st.keyUp) {
			fn.nextOption(nextOption,select, listOption, optionSelected, listOptionSelected, textOptionSelected, textOptionNext);
		}
	};

	//Eligiendo a la opción anterior
	fn.nextOption=(nextOption,select, listOption, optionSelected, listOptionSelected, textOptionSelected, textOptionNext)=>{
		if (!nextOption) {
			fn.updatingOptionsDown(select, listOption);
		}else{
			fn.keyDown(optionSelected, nextOption, listOption, listOptionSelected, textOptionSelected, textOptionNext);
		}
	};

	//Eligiendo a la opción siguiente
	fn.prevOption = (prevOption, select, listOption, optionSelected,listOptionSelected, textOptionSelected, textOptionPrev)=>{
		if (!prevOption) {
			fn.updatingOptionsUP(select, listOption);
		}else{
			fn.keyUp(optionSelected, prevOption, listOption, listOptionSelected, textOptionSelected, textOptionPrev);
		}
	}

	//cerrar las opciones al dar enter
	fn.closeOptionWithEnter = (e, mask) => {
		var key = e.keyCode;
		if (key === st.keyEnter) {
			$(mask).toggleClass('u-block')
		}else if (key === st.keyEsc) {
			$(mask).removeClass('u-block')
		}
	};

	//Agregando el efecto de selected a la máscara de opciones
	fn.hoverOptions = (e) => {
		var position = $(e).attr('data-position');
		var foo = $(e).parents(st.maskOption).siblings('select').find('option').eq(position);
		var option = $(e).parents(st.container).find(st.select).find('option');
		$.each(option, function(i, attrName) {
			$(attrName).removeAttr('selected');
		});
		$(foo[0]).attr('selected', true);
		$(e).parents(st.maskOption).find('li').removeClass('hover')
		$(e).addClass('hover');
	};

	//volviendo a iterar las opciones down
	fn.updatingOptionsDown = (select, listOption) => {
			//fn.addSelectedFirsOption();
			var firstOption = $(select).find('option')[0];
			var lastOption = $(select).find('option').last();
			$(lastOption).removeAttr('selected')
			$(firstOption).attr('selected', true);
			var text =	$(firstOption).text();
			var containerText =	$(select).siblings(st.maskSelect).find(st.optionSelected)[0];
			$(containerText).html(text);
			$(listOption).last().removeClass('hover');
			$(listOption).first().addClass('hover');
	};

	//volviendo a iterar las opciones up
	fn.updatingOptionsUP = (select, listOption)=>{
		var firstOption = $(select).find('option')[0];
		var lastOption = $(select).find('option').last();
		$(firstOption).removeAttr('selected')
		$(lastOption).attr('selected', true);

		var text =	$(lastOption).text();
		var containerText =	$(select).siblings(st.maskSelect).find(st.optionSelected)[0];
		$(containerText).html(text);
		$(listOption).first().removeClass('hover');
		$(listOption).last().addClass('hover');
	};

	//Presionando la tecla down
	fn.keyDown = (optionSelected, nextOption, listOption, listOptionSelected, textOptionSelected, textOptionNext) => {
		$(optionSelected).removeAttr('selected');
		$(nextOption).attr('selected', true);
		$(listOption).removeClass('hover')
		$(listOptionSelected).next('li').addClass('hover');
		$(textOptionSelected).html(textOptionNext);
	};

	//Presionando la tecla up
	fn.keyUp =(optionSelected, prevOption, listOption, listOptionSelected, textOptionSelected, textOptionPrev)=>{
		$(optionSelected).removeAttr('selected');
		$(prevOption).attr('selected', true);
		$(listOption).removeClass('hover');
		$(listOptionSelected).prev('li').addClass('hover');
		$(textOptionSelected).html(textOptionPrev);
	};

	initialize = () => {
		catchDom();
		aftercatchDom();
		suscribeEvents();
		console.log('mask Select');
	};

	return {
		init: initialize
	}
})().init()

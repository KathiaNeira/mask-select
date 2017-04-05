(function(){
  var st, dom, catchDom, aftercatchDom, suscribeEvents, event, fn, initialize;
  dom ={};
  st={
    container: ".js-maskSelect", //contenedor de la estructura html del select
		maskSelect: ".js-text-maskSelect", //elemento que contiene al nombre e ícono seleccionado
		select: ".js-select-maskSelect", //select nativo
		maskIcon: "js-iconSelected", //elemento donde se agregará el ícono de la opción
    optionSelected: ".js-optionSelected", //elemento donde se creará la máscara de las opciones
  };

  catchDom=()=>{
    dom.container = $(st.container);
    dom.maskSelect = $(st.maskSelect);
    dom.select = $(st.select);
		dom.maskIcon = $(st.maskIcon);
    dom.optionSelected = $(st.optionSelected);
  };

  aftercatchDom=()=>{
    fn.addIconSelectedFirsOption();
  };

  suscribeEvents=()=>{
    dom.optionSelected.on('DOMNodeInserted', event.onChange);
  };

  event={};

  event.onChange=()=>{
    fn.addIconOptions();
  };

  fn={};

  fn.addIconSelectedFirsOption=()=>{
    $(st.maskSelect).each(function(i,e){
      if ($(e).children().hasClass(st.maskIcon)) {
        fn.addIcon(e);
      }
    });
  };

  fn.addIconOptions=()=>{
    var option = $(st.select).find('option');
    $(option).each(function(i, e) {
      if ($(e).attr('selected')) {
        var containerIcon = $(e).parents('select').siblings(st.maskSelect).find('[data-icon="icon"]');
        var classIcon = $(e).val();
        containerIcon.removeAttr('class');
        containerIcon.addClass('js-iconSelected ' + classIcon);
      }
    });
  };

  fn.addIcon=(e)=>{
    var select =  $(e).siblings('select')[0];
    var optionSelected = $(select).find('option:selected').val();
    $(e).find('.'+ st.maskIcon).addClass(optionSelected);
  };

  initialize=()=>{
    console.log('mascara para los iconos');
    catchDom();
    aftercatchDom();
    suscribeEvents();
  }
  return {
    init: initialize
  }
})().init()

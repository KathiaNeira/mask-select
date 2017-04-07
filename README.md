# mask-select


Demo:https://kathianeira.github.io/mask-select/

Estructura Html para la máscara de las opciones sin íconos
```javascript
<div class="u-maskSelect js-maskSelect">
  <div class="u-text-maskSelect js-text-maskSelect" tabindex="1">
      <span class="js-optionSelected">
        <!--Aquí se agregará el text de la primera opción-->
      </span>
      <span class="u-arrow-mask"></span>
    </div>
    <select class="u-select-maskSelect js-select-maskSelect">
      <option value="">Option 1</option>
      <option value="">Option 2</option>
      <option value="" selected>Option 3</option>
      <option value="">Option 4</option>
      <option value="">Option 5</option>
    </select>
    <ul class="u-option-maskSelect js-option-maskSelect">
      <!--	Aquí se apenearán las opciones -->
    </ul>
  </div>
```
Estructura Html para la máscara de las opciones con íconos
```javascript
  <div class="u-maskSelect js-maskSelect">
    <div class="u-text-maskSelect js-text-maskSelect" tabindex="1">
      <!--Aquí se apeneará el ícono-->
      <span data-icon="icon" class="js-iconSelected"></span>
      <!---->
      <span class="js-optionSelected"></span>
      <span class="u-arrow-mask"></span>
    </div>
    <select class="u-select-maskSelect js-select-maskSelect">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
      <option value="option5" selected>Option 5</option>
    </select>
    <ul class="u-option-maskSelect js-option-maskSelect">
      <!--Aquí se apenearán las opciones-->
    </ul>
  </div>
```


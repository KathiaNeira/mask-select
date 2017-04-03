# mask-select

Estructura Html para que funcione la máscara de las opciones
```javascript
<div class="u-maskSelect js-maskSelect">
  <div class="u-text-maskSelect js-text-maskSelect" tabindex="1">
      <span class="js-optionSelected">
        <!-- Aquí se agregará el text de la primera opción -->
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

Versión de jquery:
https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js

Demo:
https://kathianeira.github.io/mask-select/

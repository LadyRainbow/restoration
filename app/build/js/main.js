// Как только страничка загрузилась
  window.onload = function () {

    // проверяем поддерживает ли браузер FormData
    if(!window.FormData) {
      alert("Браузер не поддерживает загрузку файлов на этом сайте");
    }
  }


  $(document).ready(function(){
      var isAdvancedUpload = function() {
          var div = document.createElement('div');
          return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }();

      var $textareaAddress = $('textarea[name="address"]');
      var $checkedDelivery = $('input[value="Доставка"]');
      var $checkedPickup = $('input[value="Самовывоз"]');


      // DRAG-&-DROP
      var $form1 = $('.input-file-wrp');

        if (isAdvancedUpload) {
          $form1.addClass('has-advanced-upload');
        }

        if (isAdvancedUpload) {

          var droppedFiles = false;

          $form1.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
          })
          .on('dragover dragenter', function() {
            $form1.addClass('is-dragover');
          })
          .on('dragleave dragend drop', function() {
            $form1.removeClass('is-dragover');
          })
          .on('drop', function(e) {
            droppedFiles = e.originalEvent.dataTransfer.files;
          });
      }

      $form1.on('submit', function(e) {
          if ($form1.hasClass('is-uploading')) return false;

          $form1.addClass('is-uploading').removeClass('is-error');

          if (isAdvancedUpload) {
            // ajax для современных браузеров
          } else {
            // ajax для старых браузеров
          }
    });

    if (isAdvancedUpload) {
      // e.preventDefault();

      var ajaxData = new FormData($form1.get(0));

      if (droppedFiles) {
        $.each( droppedFiles, function(i, file) {
          ajaxData.append( $input.attr('name'), file);
        });
      }

      $.ajax({
        url: $form1.attr('action'),
        type: $form1.attr('method'),
        data: ajaxData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        complete: function() {
          $form1.removeClass('is-uploading');
        },
        success: function(data) {
          $form1.addClass( data.success == true ? 'is-success' : 'is-error' );
          if (!data.success) $errorMsg.text(data.error);
        },
        error: function() {
          // Сохраняйте ошибки в логи, показывайте предупреждения, что угодно
        }
      });
    }
      // DRAG-&-DROP end ----------------------------

      // change text on the form block 1
    $("#input-file").change(function(){
         var filename = $(this).val().replace(/.*\\/, "");
         $(".text-form1").html("Фотографии загружены").addClass('green');
         console.log($("#input-file").val());
    });
    // change text on the form block 6
    $("#input-files").change(function(){
         var filename = $(this).val().replace(/.*\\/, "");
         console.log(filename);
         $(".text-form2").html("Фотографии загружены").addClass('green');
    });
        // ----------------------------------

    // phone mask
    $(".input-phone").mask("8 (999) 999-99-99");
    $(".input-phone2").mask("+7 (999) 999-99-99");
      //"idform" is the id of the form
      // $("#sendform").submit(function() {
      //
      //     var url = "send.php"; // the script where you handle the form input.
      //
      //     $.ajax({
      //            type: "POST",
      //            url: url,
      //            // serialize your form elements.
      //            data: $("#sendform").serialize(),
      //            success: function(data)
      //            {
      //                // "something" is the class of your form wrapper
      //                $('fieldset').html('<p class="thank">Данные отправлены!<p>');
      //            }
      //          });
      //     // avoid to execute the actual submit of the form.
      //     return false;
      // });


      $('.slick-block').slick({
          // prevArrow: $('.prev'),
          nextArrow: $('.next-pic'),
      });

      // show/hide word "free"----------------
      function shouldHideFree() {
        const counter = parseInt($('.change-value').val());
        const activeCheckboxes = $('.format input:checked').length;
        return activeCheckboxes > 1 || counter > 1;
    }
        function displayFree () {
            if (shouldHideFree()) {
                $('#free').addClass('hide');
            } else {
                $('#free').removeClass('hide');
            }
        }
        $('.format').off().on('change', () => {
            displayFree();
        });
        $('.plus').off().on('click', () => {
            let counter = parseInt($('.change-value').val());
            counter++;
            $('.change-value').val(counter);
            displayFree();
        });
        $('.minus').off().on('click', () => {
            let counter = parseInt($('.change-value').val());
            if (counter > 0) {
                counter--;
                $('.change-value').val(counter);
                displayFree();
            }
            else {
                $('.change-value').val(0);
                displayFree();
            }
        });
         // -------------------------------------

         // scroll navigation up/down
        $("ul li a").click(function (event) {
            var elementClick = $(this).attr("href")
            var destination = $(elementClick).offset().top;
            jQuery("html:not(:animated),body:not(:animated)").animate({
              scrollTop: destination
          }, 800);
            return false;
        });
        // -------------------------------------

        // Textarea
        $checkedDelivery.on('change', function() {
           $textareaAddress.attr('required', 'required');
           $textareaAddress.removeAttr('disabled');
           $textareaAddress.removeClass('disabled');
        });
        $checkedPickup.on('change', function() {
           $textareaAddress.attr('disabled', 'disabled');
           $textareaAddress.removeAttr('required');
           $textareaAddress.addClass('disabled');
        });

         //Дождёмся загрузки API и готовности DOM.
         ymaps.ready(init);
         function init() {
                 // Создание экземпляра карты и его привязка к контейнеру с
                 // заданным id ("map").
                 myMap = new ymaps.Map('map', {
                     // При инициализации карты обязательно нужно указать
                     // её центр и коэффициент масштабирования.
                     center: [55.771768, 37.632810], // Москва
                     zoom: 18
                 });
                 var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
                     // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'build/img/icon-map.png',
            // Размеры метки.
            iconImageSize: [44, 65],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-22, -65]
                });
                // Добавление метки на карту
		        myMap.geoObjects.add(myPlacemark);

         }

  })

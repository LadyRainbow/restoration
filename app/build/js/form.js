

    // VALIDATION
    $('form').each(function(){
    // Объявляем переменные (форма и кнопка отправки)
        var form = $(this),
            btn = form.find('input[value="Отправить заявку"]');

        // Добавляем каждому проверяемому полю, указание что поле пустое
        form.find('input[value=""]').addClass('empty_field');
        // Функция проверки полей формы
        function checkInput(){
          form.find('input[value=""]').each(function(){
            if($(this).val() != ''){
              // Если поле не пустое удаляем класс-указание
            $(this).removeClass('empty_field');
            } else {
              // Если поле пустое добавляем класс-указание
            $(this).addClass('empty_field');
            }
          });
        }
        function checkTextArea(){
            if($('textarea[name=address]').hasClass('disabled')) {
                $('textarea[name=address]').removeClass('empty_field');
            } else {
                console.log($('textarea[name=address]').val());
                    //
                    if($('textarea[name=address]').val() != ''){
                      // Если поле не пустое удаляем класс-указание
                    $('textarea[name=address]').removeClass('empty_field');
                    } else {
                      // Если поле пустое добавляем класс-указание
                    $('textarea[name=address]').addClass('empty_field');
                    }
            }
        }

    //
    // Функция подсветки незаполненных полей


    // Проверка в режиме реального времени
    setInterval(function(){
      // Запускаем функцию проверки полей на заполненность
      checkInput();
      checkTextArea();
      // Считаем к-во незаполненных полей
      var sizeEmpty = form.find('.empty_field').length;
      // Вешаем условие-тригер на кнопку отправки формы
      if(sizeEmpty > 0){
        if(btn.hasClass('disabled')){
          return false
        } else {
          btn.addClass('disabled')
        }
      } else {
        btn.removeClass('disabled')
      }
    },500);

});


     // applying the effect for every form
    var dropZone1 = document.getElementById('form-box');
    var dropZone2 = document.getElementById('label-file');
    var name ='';
    var formDataForForm1 = new FormData;
    var formDataForForm2 = new FormData;

    // -------------- FORM 1 --------------
    dropZone1.addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    dropZone1.addEventListener('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        files = e.dataTransfer.files; // Array of all files

        appendFilesToFormData(formDataForForm1, 'image[]', files);
         $(".text-form1").html("Фотографии загружены").addClass('green');
        // showUploadFiles(formDataForForm1, 'image[]', $('.text-form.text-form1'));
    });

    $('#file').on('change', function () {
        var files = this.files;
        appendFilesToFormData(formDataForForm1, 'image[]', files);
        $(".text-form1").html("Фотографии загружены").addClass('green');
        // showUploadFiles(formDataForForm1, 'image[]', $('.text-form.text-form1'));
    });


    function resetForm1() {
        formDataForForm1 = new FormData;
        $('.input-phone').val('');
        $('#file').val('');
        $('.text-form.text-form1').text('Прикрепите примеры фото').removeClass('green');
    }

    // function sendForm1()  {
    //     formDataForForm1.append("tel", $('#form1 .input-phone').val());
    //     formDataForForm1.append("sendform", '1');
    //     //formDataForForm1.append('checkboxField', $('.checkbox').prop('checked'));
    //     formTransport({
    //         formData: formDataForForm1,
    //         success: function(data) {
    //             resetForm1();
    //             console.log(data);
    //         },
    //         error: function(data) {
    //             // Сохраняйте ошибки в логи, показывайте предупреждения, что угодно
    //             console.log(data);
    //         }
    //     });
    // }

    // -------------- /FORM 1 --------------

    // F1 valid
    function sendForm1()  {
        var form = $('#form1');
        if($('#form1 .btn-send').hasClass('disabled')){
        // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
        function lightEmpty(){
          form.find('.empty_field').css({'border':'1px solid #d8512d'});
          // Через полсекунды удаляем подсветку
          setTimeout(function(){
            form.find('.empty_field').removeAttr('style');
          },500);
      };
        lightEmpty();
        return false
    } else {
        formDataForForm1.append("tel", $('#form1 .input-phone').val());
        formDataForForm1.append("sendform", '1');

        formTransport({
            formData: formDataForForm1,
            success: function(data) {
                resetForm1();
                alert('Письмо успешно отправлено');
            },
            error: function(data) {
                // Сохраняйте ошибки в логи, показывайте предупреждения, что угодно
                console.log(data);
            }
        });
    }


    }



    // -------------- FORM 2 --------------
    dropZone2.addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    dropZone2.addEventListener('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        files = e.dataTransfer.files; // Array of all files

        appendFilesToFormData(formDataForForm2, 'file[]', files);
         $(".text-form2").html("Фотографии загружены").addClass('green');
        // showUploadFiles(formDataForForm2, 'file[]', $('.text-form.text-form2'));
    });

    $('#input-files').on('change', function () {
        var files = this.files;
        appendFilesToFormData(formDataForForm2, 'file[]', files);
         $(".text-form2").html("Фотографии загружены").addClass('green');
        // showUploadFiles(formDataForForm2, 'file[]', $('.text-form.text-form2'));
    });

    function resetForm2() {
        formDataForForm2 = new FormData;
        $('#input-files').val('');
        $('.text-form.text-form2').text('Прикрепите примеры фото').removeClass('green');

        $('.change-value').val(1);
        $('textarea[name=message]').val('');
        $('textarea[name=address]').val('');

        $('.add-options input').prop({checked: false});
        $('.formats-wrp input').prop({checked: false});
        $('.formats-wrp label:first-child input').prop({checked: true});

        $('.contact-details input').val('');

    };

    var $inputEmail = $('input[type="email"]');

    function validEmail() {

         var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
         if(regex.test($inputEmail.val()) == false) {
             $inputEmail.addClass('invalid-email');
         } else {
             $inputEmail.removeClass('invalid-email');
         }
    };

    function sendForm2()  {
        validEmail();

        $('.add-options input').each(function () {
            if ($(this).prop('checked')) {
                formDataForForm2.append('checkOptions[]', $(this).val());
            }
        });
        $('.formats-wrp input').each(function () {
            if ($(this).prop('checked')) {
                formDataForForm2.append('checkFormat[]', $(this).val());
            }
        });

        var form = $('#form2');
        if($('#form2 .btn-send-all').hasClass('disabled') || $inputEmail.hasClass('invalid-email')){
            // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
            function lightEmpty(){
              form.find('.empty_field').css({'border':'1px solid #d8512d'});
              $('.invalid-email').css({'border':'1px solid #d8512d'});
              // Через полсекунды удаляем подсветку
              setTimeout(function(){
                form.find('.empty_field').removeAttr('style');
                $('.invalid-email').removeAttr('style');
              },500);
          };
            lightEmpty();
            return false
        }

        else {
            formDataForForm2.append('count', $('.change-value').val());
            formDataForForm2.append('message', $('textarea[name=message]').val());
            formDataForForm2.append('address', $('textarea[name=address]').val());
            formDataForForm2.append('optionRadio', $('input[name=optionRadio]:checked').val());

            formDataForForm2.append('name', $('.contact-details input[name=name]').val());
            formDataForForm2.append('tel', $('.contact-details input[name=tel]').val());
            formDataForForm2.append('email', $('.contact-details input[name=email]').val());

            formDataForForm2.append('collectForm', '1');

            formTransport({
                formData: formDataForForm2,
                success: function(data) {
                    resetForm2();
                    alert('Письмо успешно отправлено');
                    console.log(data);
                },
                error: function(data) {
                    // Сохраняйте ошибки в логи, показывайте предупреждения, что угодно
                    console.log(data);
                }
            });
        }

    }

    // -------------- /FORM 2 --------------

    // -------------- GENERAL FUNCTIONS --------------
    function formTransport(options)  {
        $.ajax({
            url: 'send.php',
            type: "POST",
            data: options.formData,

            cache: false,
            contentType: false,
            processData: false,

            success: options.success,
            error: options.error,
        });
    }

    // function showUploadFiles(formData, filesFieldName, outputElement) {
    //     // var reader = new FileReader();
    //     // reader.readAsDataURL(file);
    //     var files = formData.getAll(filesFieldName);
    //     var fileNames = files.map(function (file) {
    //     return file.name;
    //     });
    //     console.log(fileNames);
    //     outputElement.text(fileNames.join(', '));
    // }



    function appendFilesToFormData(formData, filesFieldName, files) {
        for (var i=0, file; file=files[i]; i++) {
            if (file.type.match(/image.*/)) {
                formData.append(filesFieldName, file);
            }
        }
    }

    // -------------- /GENERAL FUNCTIONS --------------

<div class="t706__cartwin-content" id="form-shop">

    <div class="t706__cartwin-top">
        <div class="t706__cartwin-heading t-name t-name_xl">Оформите Ваш заказ</div>
    </div>

    <div class="t706__cartwin-products">
        <div class="t706__product" data-cart-product-i="0">
            <div class="t706__product-thumb">
                <div class="t706__product-imgdiv" style=""></div>
            </div>
            <div class="t706__product-title t-descr t-descr_sm">Турник брусья 4в1 c упором для пресса PowerPullUp P3041<div style="opacity:0.7;font-size:12px;font-weight:400;">

                </div>

            </div>
        </div>
    </div>

    <div class="t706__orderform ">

        <form id="form94484319" name="form94484319" role="form" action="" method="POST" data-formactiontype="2" data-inputbox=".t-input-group" class="t-form js-form-proccess t-form_inputs-total_5  " data-success-callback="t702_onSuccess" data-formsended-callback="t706_onSuccessCallback" data-formcart="y">

            <input type="hidden" name="formservices[]" value="433a481de9c6c3242596fb6a7b38c42e" class="js-formaction-services">
            <input type="hidden" name="formservices[]" value="c4a3b26c89c4abe36f7a85f6d8aa87d2" class="js-formaction-services">
            <input type="hidden" name="formservices[]" value="8778a85dea6e6eaa3f7abd50a036acd9" class="js-formaction-services">

            <input type="hidden" name="tildaspec-formname" tabindex="-1" value="Cart">

            <div class="js-successbox t-form__successbox t-text t-text_md" style="display:none;"></div>

            <div class="t-form__inputsbox">


                <div class="t-input-group t-input-group_nm" data-input-lid="1496239431201">
                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no" field="li_title__1496239431201" style="">Фамилия, Имя</div>
                    <div class="t-input-block">
                        <input type="text" name="Name" class="t-input js-tilda-rule " value="" data-tilda-req="1" data-tilda-rule="name" style="color:#000000; border:1px solid #000000;  border-radius: 30px; -moz-border-radius: 30px; -webkit-border-radius: 30px;">
                        <div class="t-input-error"></div>
                    </div>
                </div>


                <div class="t-input-group t-input-group_ph" data-input-lid="1496239478607">
                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no" field="li_title__1496239478607" style="">Номер телефона</div>
                    <div class="t-input-block">
                        <input type="tel" name="Phone" class="t-input js-tilda-rule  " value="" data-tilda-req="1" data-tilda-rule="phone" pattern="[0-9]*" style="color:#000000; border:1px solid #000000;  border-radius: 30px; -moz-border-radius: 30px; -webkit-border-radius: 30px;">
                        <div class="t-input-error"></div>
                    </div>
                </div>


                <div class="t-input-group t-input-group_in" data-input-lid="1496239459190">
                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no" field="li_title__1496239459190" style="">Город</div>
                    <div class="t-input-block">
                        <input type="text" name="city" class="t-input js-tilda-rule  " value="" data-tilda-req="1" style="color:#000000; border:1px solid #000000;  border-radius: 30px; -moz-border-radius: 30px; -webkit-border-radius: 30px;">
                        <div class="t-input-error"></div>
                    </div>
                </div>


                <div class="t-input-group t-input-group_in" data-input-lid="1536164772980">
                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no" field="li_title__1536164772980" style="">Отделение Новой Почты</div>
                    <div class="t-input-block">
                        <input type="text" name="sklad" class="t-input js-tilda-rule  " value="" data-tilda-req="1" style="color:#000000; border:1px solid #000000;  border-radius: 30px; -moz-border-radius: 30px; -webkit-border-radius: 30px;">
                        <div class="t-input-error"></div>
                    </div>
                </div>


                <div class="t-input-group t-input-group_pc" data-input-lid="1551260953564">
                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no" field="li_title__1551260953564" style="">Введите промокод и получите скидку</div>
                    <div class="t-input-block">

                        <div class="t-inputpromocode__wrapper" style="display:table;width:100%;">
                            <input type="text" name="Введите промокод и получите скидку" class="t-input t-inputpromocode " value="" style="display: table-cell; color:#000000; border:1px solid #000000;  border-radius: 30px; -moz-border-radius: 30px; -webkit-border-radius: 30px;">
                            <div class="t-inputpromocode__btn t-btn" style="display:none;position:relative;height:auto; color:#fff; background: #000;">Активировать</div>
                        </div>
                        <script>
                            $(document).ready(function() {
                                function t_input_promocode_init(recid, lid) {
                                    var qel = $('#rec' + recid).find('[data-input-lid="' + lid + '"]');
                                    qel.find('.t-inputpromocode').focusin(function() {
                                        qel.find('.t-inputpromocode__btn').css("display", "table-cell");
                                    });
                                    qel.find('.t-inputpromocode__btn').click(function() {
                                        var val = qel.find('.t-inputpromocode').val();
                                        if (typeof val != 'undefined' && val != '') {
                                            console.log('PC:' + val);
                                        } else {
                                            console.log('Promocode is empty');
                                            return;
                                        }
                                        var d = {};
                                        var shem = "https://";
                                        var srv = "forms.tildacdn.com/";
                                        var subf1 = "payment/";
                                        var subf2 = "promocode/";
                                        d['promocode'] = val;
                                        d['projectid'] = $('#allrecords').attr('data-tilda-project-id');
                                        if (typeof d['projectid'] == 'undefined' || d['projectid'] == '') {
                                            alert('Promo code activation error. Bad projectid');
                                            return;
                                        }



                                        if (typeof window.t_promocode_load !== 'undefined' && window.t_promocode_load == 'y') {
                                            return;
                                        }
                                        window.t_promocode_load = 'y';
                                        var elbtnpc = $(this);
                                        elbtnpc.addClass('t-btn_sending');
                                        $.ajax({
                                            type: "POST",
                                            url: shem + srv + subf1 + subf2,
                                            data: d,
                                            dataType: "text",
                                            success: function(data) {
                                                delete window.t_promocode_load;
                                                elbtnpc.removeClass('t-btn_sending');
                                                if (data != '') {
                                                    var obj = JSON.parse(data);
                                                    if (typeof obj == 'object') {
                                                        if (typeof obj['message'] != 'undefined' && obj['message'] == 'OK') {
                                                            var lang = window.tildaBrowserLang;
                                                            if (typeof lang == 'undefined') lang = 'EN';
                                                            var str = '';
                                                            str += '<div style="font-weight:600;" class="t-text">' + (lang == 'RU' ? 'Промокод' : 'Promo code') + ' ';
                                                            str += obj['promocode'];
                                                            str += (lang == 'RU' ? ' активирован.' : ' has been activated.') + '<br>' + (lang == 'RU' ? 'Ваша скидка' : 'Your discount') + ': ';
                                                            if (typeof obj['discountsum'] != 'undefined' && obj['discountsum'] > 0) {
                                                                if (typeof window.tcart == 'object') {
                                                                    try {
                                                                        str += tcart__showPrice(obj['discountsum']);
                                                                    } catch (err) {}
                                                                } else {
                                                                    str += obj['discountsum'];
                                                                }
                                                            }
                                                            if (typeof obj['discountpercent'] != 'undefined' && obj['discountpercent'] > 0) {
                                                                str += obj['discountpercent'] + '%';
                                                            }
                                                            str += '</div>';
                                                            qel.find('.t-inputpromocode__wrapper').html(str);
                                                            try {
                                                                tcart__addPromocode(obj);
                                                            } catch (err) {}
                                                        } else {
                                                            if (typeof obj['error'] != 'undefined' && obj['error'] != '') {
                                                                alert(obj['error']);
                                                            } else {
                                                                alert('Promo code activation some error.');
                                                            }
                                                        }
                                                    } else {
                                                        alert('Promo code activation error. Bad answer from server');
                                                    }
                                                } else {
                                                    alert('Promo code activation error. Empty answer from server');
                                                }
                                            },
                                            error: function() {
                                                delete window.t_promocode_load;
                                                elbtnpc.removeClass('t-btn_sending');
                                                alert('Request timeout error (activate promo code)');
                                            },
                                            timeout: 1000 * 20
                                        });



                                    });
                                }
                                t_input_promocode_init('94484319', '1551260953564');
                            });
                        </script>

                        <div class="t-input-error"></div>
                    </div>
                </div>


                <div class="t706__cartwin-totalamount-wrap t-descr t-descr_xl" style="display: block;">
                    <div class="t706__cartwin-totalamount-info" style="font-size:14px; padding-bottom:10px; font-weight:400;"></div><span class="">Стоимость:&nbsp;</span><span class="cartwin-totalamount">0&nbsp;грн.</span>
                </div>

                <div class="t-form__submit">
                    <button type="submit" class="t-submit" style="color:#ffffff;background-color:#e31c1c;border-radius:30px; -moz-border-radius:30px; -webkit-border-radius:30px;font-family:Geometria;font-weight:700;">Оформить Заказ</button>
                </div>

            </div>

            <div style="position: absolute; left: -5000px; bottom:0;"><input type="text" name="form-spec-comments" value="Its good" class="js-form-spec-comments" tabindex="-1"></div>
        </form>


    </div>

</div>

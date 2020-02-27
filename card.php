<head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="google-site-verification" content="3rZ5wU9jYo-MfQSSo2DUkg94xDnbYYMTVw5FshDJfdI" />
    <!--metatextblock-->
    <title>Купить турник от производителя Турники.укр</title>
    <meta name="description" content="Турники для дома и офиса , высокого качества по доступной цене от производителя" />
    <meta name="keywords" content="турник,купить турник, турник для дома, турник 3в1, домашний турник," />
    <link rel="canonical" href="/">

    <meta property="og:url" content="https://xn--h1aafkolh.xn--j1amh" />
    <meta property="og:title" content="Турники.укр - Надежные турники для дома и офиса" />
    <meta property="og:description" content="Турники для дома и офиса , высокого качества по доступной цене от производителя" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="img/home/--.jpg" />

    <!--/metatextblock-->

    <meta property="fb:app_id" content="257953674358265" />

    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="x-dns-prefetch-control" content="on">


    <link rel="stylesheet" href="/css/css_tilda-grid-3.0.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/css/tilda-blocks-2.12.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/css/css_tilda-animation-1.0.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/css/css_tilda-menusub-1.0.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/css/lib/owl-carousel.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/css/lib/owl-theme-default-min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/css/css_tilda-zoom-2.0.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/css/css_tilda-popup-1.1.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/css/css_tilda-catalog-1.1.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/css/style.css" type="text/css" media="all" />

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:200,400,600,700,900&subset=cyrillic,cyrillic-ext" type="text/css" />

    <script src="/js/js_jquery-1.10.2.min.js"></script>
    <script src="/js/scripts-2.8.min.js"></script>
    <script src="/js/blocks-2.7.js.js"></script>
    <script src="/js/animation-1.0.min.js" charset="utf-8"></script>
    <script src="/js/menusub-1.0.min.js" charset="utf-8"></script>
    <script src="/js/lib/owl.carousel.min.js" charset="utf-8"></script>
    <script src="/js/js_hammer.min.js" charset="utf-8"></script>
    <script src="/js/zoom-2.0.min.js" charset="utf-8"></script>
    <script src="/js/products-1.0.min.js" charset="utf-8"></script>
    <script src="/js/catalog-1.1.min.js" charset="utf-8"></script>
    <script src="/js/forms-1.0.min.js" charset="utf-8"></script>
    <script src="/js/js_tilda-cart-1.0.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="/js/js_rentafont_webfonts.js"></script>

    <script type="text/javascript" >
     //owl slider good init
            var sync1 = $(".good-slider.owl-carousel");
            var sync2 = $(".good-slider_thumb");
            var slidesPerPage = 4; //globaly define number of elements per page
            var syncedSecondary = true;

            sync1.owlCarousel({
                items: 1,
                slideSpeed: 2000,
                nav: true,
                autoplay: false,
                dots: false,
                loop: true,
                responsiveRefreshRate: 200,
                navText: [
                    '<span><svg style="display: block" viewBox="0 0 13.9 23" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <polyline fill="none" stroke="#999999" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="3" points="1.5,1.5 11.5,11.5 1.5,21.5"></polyline></svg></span>',
                    '<span><svg style="display: block" viewBox="0 0 13.9 23" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <polyline fill="none" stroke="#999999" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="3" points="1.5,1.5 11.5,11.5 1.5,21.5"></polyline></svg></span>',
                ]
            }).on('changed.owl.carousel', syncPosition);

            sync2
                .on('initialized.owl.carousel', function() {
                    sync2.find(".owl-item").eq(0).addClass("current");
                })
                .owlCarousel({
                    items: 6,
                    dots: false,
                    nav: false,
                    smartSpeed: 200,
                    slideSpeed: 500,
                    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
                    responsiveRefreshRate: 100
                }).on('changed.owl.carousel', syncPosition2);

            function syncPosition(el) {
                //if you set loop to false, you have to restore this next line
                //var current = el.item.index;

                //if you disable loop you have to comment this block
                var count = el.item.count - 1;
                var current = Math.round(el.item.index - (el.item.count / 2) - .5);

                if (current < 0) {
                    current = count;
                }
                if (current > count) {
                    current = 0;
                }

                //end block

                sync2
                    .find(".owl-item")
                    .removeClass("current")
                    .eq(current)
                    .addClass("current");
                var onscreen = sync2.find('.owl-item.active').length - 1;
                var start = sync2.find('.owl-item.active').first().index();
                var end = sync2.find('.owl-item.active').last().index();

                if (current > end) {
                    sync2.data('owl.carousel').to(current, 100, true);
                }
                if (current < start) {
                    sync2.data('owl.carousel').to(current - onscreen, 100, true);
                }
            }

            function syncPosition2(el) {
                if (syncedSecondary) {
                    var number = el.item.index;
                    sync1.data('owl.carousel').to(number, 100, true);
                }
            }

            sync2.on("click", ".owl-item", function(e) {
                e.preventDefault();
                var number = $(this).index();
                sync1.data('owl.carousel').to(number, 300, true);
            });

    </script>


</head>

<body class="t-body">
    <div class="t-popup t-popup_show" data-track-popup="/tilda/popup/rec94484291/opened" style="background-color: rgb(255, 255, 255); display: block;">

        <div class="t-popup__container t-popup__container-static t-popup__container-animated" style="background-color:#ffffff">
            <div>
                <div class="t-store__prod-popup__container">
                    <div class="js-store-product js-product" data-product-lid="678335969404" data-product-uid="678335969404" data-product-gen-uid="367996394510" data-product-inv="" data-product-img="https://static.tildacdn.com/tild3965-3838-4436-a664-636332323461/p3041-top-prom.jpg">
                        <div class="t-store__prod-popup__slider js-store-prod-slider t-store__prod-popup__col-left t-col t-col_6">
                            <div class="t-slds " style="">
                                <div class="t-slds__main" >
                                    <div class="good-slider owl-carousel owl-theme">
                                        <div class="item-slide"><img src="img/catalog/1033q.jpg" alt=""></div>
                                        <div class="item-slide"><img src="img/catalog/1033q.jpg" alt=""></div>
                                        <div class="item-slide"><img src="img/catalog/1033q.jpg" alt=""></div>
                                        <div class="item-slide"><img src="img/catalog/1043.jpg" alt=""></div>
                                        <div class="item-slide"><img src="img/catalog/1043.jpg" alt=""></div>
                                        <div class="item-slide"><img src="img/catalog/1043.jpg" alt=""></div>
                                    </div>
                                </div>
                                <div class="t-slds__thumb">
                                    <div class="good-slider_thumb owl-carousel owl-theme">
                                        <div class="item-slide"><img src="img/catalog/1033q.jpg" alt=""></div>
                                        <div class="item-slide"><img src="img/catalog/1033q.jpg" alt=""></div>
                                        <div class="item-slide"><img src="img/catalog/1033q.jpg" alt=""></div>
                                        <div class="item-slide"><img src="img/catalog/1043.jpg" alt=""></div>
                                        <div class="item-slide"><img src="img/catalog/1043.jpg" alt=""></div>
                                        <div class="item-slide"><img src="img/catalog/1043.jpg" alt=""></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="t-store__prod-popup__info t-align_left t-store__prod-popup__col-right t-col t-col_6">
                            <div class="t-store__prod-popup__title-wrapper">

                                <div class="js-store-prod-name js-product-name t-store__prod-popup__name t-name t-name_xl" style="color:#333333;font-weight:700;font-family:'Geometria';">
                                Турник брусья 4в1 c упором для пресса PowerPullUp P3041</div>

                                <div class="t-store__prod-popup__sku t-descr t-descr_xxs"> <span class="t-store__prod-popup__brand">
                                     </span>SKU: <span class="js-store-prod-sku js-product-sku">p3041-black</span> </div>
                            </div>
                            <div class="js-store-price-wrapper t-store__prod-popup__price-wrapper">

                                <div class="js-store-prod-price t-store__prod-popup__price t-store__prod-popup__price-item t-name t-name_md" style="color:#e31c1c;font-weight:700;">
                                    <div class="js-product-price js-store-prod-price-val t-store__prod-popup__price-value" data-product-price-def="1375" data-product-price-def-str="1 375">1375</div>
                                    <div class="t-store__prod-popup__price-currency">грн.</div>
                                </div>

                                <div class="js-store-prod-price-old t-store__prod-popup__price_old t-store__prod-popup__price-item t-name t-name_md" style="color: rgb(204, 204, 204); font-weight: 700; display: none;">
                                    <div class="js-store-prod-price-old-val t-store__prod-popup__price-value"></div>
                                    <div class="t-store__prod-popup__price-currency">грн.</div>
                                </div>

                            </div>

                            <div class="js-product-controls-wrapper">
                                <div class="js-product-edition-option t-product__option" data-edition-option-id="Цвет">
                                    <div class="js-product-edition-option-name t-product__option-title t-descr t-descr_xxs" style="color:#333333;">Цвет</div>
                                    <div class="t-product__option-variants"> <select class="js-product-edition-option-variants t-product__option-select t-descr t-descr_xxs">
                                            <option value="черный">черный</option>
                                            <option value="белый">белый</option>
                                        </select> </div>
                                </div>
                            </div>

                            <div class="t-store__prod-popup__btn-wrapper">
                                   <a href="#order" class="t-store__prod-popup__btn t-btn t-btn_sm" style="color:#000000;border:1px solid #191a1b;background-color:#ffffff;border-radius:30px; -moz-border-radius:30px; -webkit-border-radius:30px;font-family:Geometria;font-weight:400;">
                                    <table style="width:100%; height:100%;">
                                        <tbody>
                                            <tr>
                                                <td class="js-store-prod-popup-buy-btn-txt">Купить</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </a>
                            </div>

                            <div class="js-store-prod-text t-store__prod-popup__text t-descr t-descr_xxs" style="color:#333333;font-weight:400;font-family:'Geometria';">
                               <strong><strong data-redactor-tag="strong">
                                   <a href="https://youtu.be/ux0ohGyR5QI" style="color:#eb0000 !important;border-bottom-color: #f00000;">ВИДЕО-ОБЗОР ТУРНИКА PowerPullUp P 3041 СМОТРЕТЬ!</a></strong>
                               </strong><br><br>Безупречный результат после хорошей силовой нагрузки гарантирует<strong> турник PowerPullUp p3041</strong>. Модель является оптимальным по соотношению цены/качества вариантом 4в1. Компактный турник с дополнительными брусьями подойдет для зала или домашних тренировок. <br><br> <strong>Возможности p3041</strong> <br>
                                <ul>
                                    <li> стандартные подтягивания для начальной тренировки торса; <br> </li>
                                    <li> работа на широком хвате, для которого есть широкий турник и удобные неопреновые ручки; <br> </li>
                                    <li> занятия на узком хвате, разрабатывающие зону предплечья; <br> </li>
                                    <li> брусья для упражнений на косые мышцы, пресс, силу рук. </li>
                                </ul> Чтобы занятия проходили с комфортом, производитель рассчитал оптимальное положение для рук, тела. Установил ручки с загибом, практичные амортизирующие подкладки для безопасных тренировок. <br><br> <strong>Количество хватов </strong><br>
                                <ol>
                                    <li>Обычный </li>
                                    <li>Широкий </li>
                                    <li>Узкий параллельный хват</li>
                                </ol><br><strong>Размеры</strong><br>
                                <ul>
                                    <li> Длина перекладины 110 см. </li>
                                    <li> Вылет от стены 42 см </li>
                                    <li> Ширина между креплениями 55 см </li>
                                    <li> Вынос брусьев от стены 76 см </li>
                                    <li> Вес 12 кг </li>
                                </ul><strong><br>Материалы</strong><br>
                                <ul>
                                    <li> Труба квадратная 30х30 мм, толщина стенки 2 мм </li>
                                    <li> Труба круглая диаметр 27 мм, толщина стенки 3 мм </li>
                                </ul><strong><br>Размер упаковки</strong><br>
                                <ul>
                                    <li> Коробка 110х50х12 см. </li>
                                    <li> Вес 12 кг </li>
                                </ul><strong><br>Немного общей полезной информации о наших товарах:</strong><br>1. Все наши турники окрашены порошковой краской, что делает их поверхность износостойкой.<br>2. Ручки всех турников сделаны из прочного и одновременно очень комфортного неопрена.<br>3. Все конструкции имеют достаточно небольшие габариты, что дает возможность крепления в помещениях разной площадью.<br>4. Максимальная нагрузка на любой турник - 200 кг.<br><br>Доставка Новой Почтой, оплата при получении или предоплата на карту Приватбанка.<br><br><strong>На все турники действует гарантия 3 года.</strong><br><br>Подтягиваясь ежедневно на турниках PowerPullUp, вы можете стать обладателем рельефной фигуры и привлекательного пресса просто у себя дома, уделяя занятиям столько времени, сколько захотите, а главное - в то время, когда это удобно именно вам!
                            </div>
                        </div>
                    </div>
                    <div class="t-store__relevants__container">
                        <div class="t-store__relevants__title-wrapper">
                            <div class="t-store__relevants__title t-uptitle t-uptitle_xxl" style="color:#333333;font-size:16px;font-weight:700;font-family:'Geometria';">See also</div>
                        </div>
                        <div class="t-store__scroll-icon-wrapper"> <svg class="t-store__scroll-icon" style="width:22px;fill:#bebebe;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                                <path d="M97.2 298.2S56.1 225 38.8 193.3c-23-42.2-26.8-60-10.9-68.8 9.9-5.5 23.6-3.2 32 11.4l19.6 31.2V44.8s-1.2-32.3 21.8-32.3c24.5 0 22.4 32.3 22.4 32.3v59.4s12.9-9.3 28-5.1c7.7 2.1 16.7 5.8 21.5 18 0 0 30.7-14.9 46 16.8 0 0 35.4-7 35.4 29.7s-44.2 134.6-44.2 134.6H97.2zM249.9.5l-10.6 10.6 24.1 23.8H158.5v15h105l-24.2 23.9 10.6 10.6 42.5-42z" class="st0"></path>
                            </svg> </div>
                        <div class="t-store__relevants-grid-cont js-store-relevants-grid-cont  t-store__grid-cont_mobile-one-row"  style="opacity: 1;">
                            <? include('template/mini-card.php'); ?>
                            <? include('template/mini-card.php'); ?>
                            <? include('template/mini-card.php'); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

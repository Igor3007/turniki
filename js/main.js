$(document).ready(function($) {

           /*// разворачивание faq
           $('.t668__accordion').on('click', function(){
               $(this).find('.t668__header').toggleClass('t668__opened');
               $(this).find('.t668__content').slideToggle()

           })
*/
           // owl slider init
            var sliderReview = $('.owl-slider.owl-carousel');

            sliderReview.owlCarousel({
                items: 1,
                dots: true,
                nav: true,
                navText: [
                    '<span><svg style="display: block" viewBox="0 0 13.9 23" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <polyline fill="none" stroke="#999999" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="3" points="1.5,1.5 11.5,11.5 1.5,21.5"></polyline></svg></span>',
                    '<span><svg style="display: block" viewBox="0 0 13.9 23" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <polyline fill="none" stroke="#999999" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="3" points="1.5,1.5 11.5,11.5 1.5,21.5"></polyline></svg></span>',
                ]
            })

             // плавный скролл
            $('a[href^="#"]').on("click", function(e){
                var elem = $(this);
                var anchor = elem.attr('href').replace('#', '');
                $('html, body').stop().animate({
                    scrollTop: $('[name='+anchor+']').offset().top
                }, 750);
                e.preventDefault();
            });

            //open form

            $(document).on('click', '.js-store-prod-btn2', function(e){

                const $cardContainer = $(this).parents('.js-product');

                //price
                $('.cartwin-totalamount').text( $cardContainer.find('.t-store__card__price').text() )

                //title
                $('.t706__product-title').text( $cardContainer.find('.js-store-prod-name').text() )

                //image
                var imagePath = $cardContainer.find('.js-product-img').attr('data-original');
                $('.t706__product-imgdiv').css({
                    'background-image': 'url(' + imagePath + ')'
                })

                //close active fancybox
                $.fancybox.close();

                //open popup
                $.fancybox.open({
                    src  : '#form-shop',
                    type : 'inline'
                });

                e.preventDefault()
            })


            // open card in popup
            $('.js-store-prod-btn').on('click', function(e){

                $.fancybox.open({
                    src  : $(this).attr('href'),
                    type : 'ajax'
                });

                e.preventDefault()

            })

            // open form-shop from popup
            $(document).on('click', '.t-store__prod-popup__btn', function(e){

                const $cardContainer = $(this).parents('.js-product');

                //price
                $('.cartwin-totalamount').text( $cardContainer.find('.js-product-price').text() )

                //title
                $('.t706__product-title').text( $cardContainer.find('.t-store__prod-popup__name').text() )

                //image
                var imagePath = $cardContainer.find('.t-slds__main .owl-item.active img').attr('src');
                $('.t706__product-imgdiv').css({
                    'background-image': 'url(' + imagePath + ')'
                })

                //close active fancybox
               // $.fancybox.close();

                //open popup
                $.fancybox.open({
                    src  : '#form-shop',
                    type : 'inline'
                });

                e.preventDefault()

            })


        }); //ready

$(document).ready(function($) {

           // разворачивание faq
           $('.t668__accordion').on('click', function(){
               $(this).find('.t668__header').toggleClass('t668__opened');
               $(this).find('.t668__content').slideToggle()

           })

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
            var $page = $('html, body');
            $('a[href*="#"]').click(function() {
                $page.animate({
                    scrollTop: $($.attr(this, 'href')).offset().top
                }, 400);
                return false;
            });

        });

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


        }); //ready

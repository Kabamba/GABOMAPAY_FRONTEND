$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop:true,
        nav:false,
        info: true,
        dots : false,
        navSpeed : 1000,
        autoplay:2000,
        smartSpeed: 2000,
        responsiveRefreshRate : 0,
        margin:10,
        responsive :{
            0 :{
                items : 1
            },

            768 :{
                items : 1,
            }
        }
    })
});



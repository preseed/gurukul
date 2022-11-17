$(document).ready(function() {
    var thumb = $('.thumb,.round-thumb'),
        thumbW, thumbH, thumbCaption, target, hoverSpeed = 500,
        hoverEase = 'easeOutExpo',
        targetNetwork = $('ul.socialSmall li a'),
        toggleMenu = $('.mobileMenuToggle'),
        lightboxTransition = 'fade',
        overlayOpacity = 0.8,
        overlayColor = '#000',
        videoWidth = 663,
        videoHeight = 385;
    lazyload = true;
    $(function() {
        if (lazyload == false || isMobile == true) return false;
        $("img.lazy").lazyload({
            placeholder: "images/blank.gif",
            effect: "fadeIn"
        });
    });
    toggleMenu.on('click', function(event) {
        if ($(this).parent().find('ul.navigation').is(':hidden')) {
            $(this).parent().find('ul.navigation').slideDown();
            $(this).addClass('open');
        } else {
            $(this).parent().find('ul.navigation').slideUp();
            $(this).removeClass('open');
        }
        event.preventDefault();
    });
    thumb.on({
        mouseenter: function() {
            if (isMobile == true) return false;
            thumbW = thumb.find('a').find('img').width();
            thumbH = thumb.find('a').find('img').height();
            thumbCaption = $(this).find('a').attr('title');
            if (!$(this).find('a').find('div').hasClass('thumb-rollover')) $(this).find('a').append('<div class="thumb-rollover"></div>');
            hoverScreen = $('.thumb-rollover')
            hoverScreen.css({
                width: thumbW,
                height: thumbH
            });
            if (typeof thumbCaption !== 'undefined' && thumbCaption !== false && $(this).find(hoverScreen).is(':empty')) {
                $(this).find(hoverScreen).append('<div class="thumbInfo">' + thumbCaption + '</div>');
                target = $(this).find(hoverScreen);
                target.stop().animate({
                    opacity: 1
                }, hoverSpeed, hoverEase);
            }
        },
        mouseleave: function() {
            if (isMobile == true) return false;
            $(this).find(hoverScreen).animate({
                opacity: 0
            }, hoverSpeed, hoverEase, function() {
                $(this).remove();
            });
        }
    });
    $('a.lightbox').fancybox({
        'transitionIn': lightboxTransition,
        'transitionOut': lightboxTransition,
        'titlePosition': 'over',
        'padding': '0',
        'overlayOpacity': overlayOpacity,
        'overlayColor': overlayColor,
        'titleFormat': function(title, currentArray, currentIndex, currentOpts) {
            var obj = currentArray[currentIndex]
            var target = $(obj).parent();
            if ($(target).next().hasClass('fancybox-html')) {
                if ($(target).next().length && $(obj).attr('rel')) {
                    return '<span id="fancybox-title-over">' + '<div class="fancybox-num"> Image:' + (currentIndex + 1) + ' / ' + currentArray.length + '</div>' + ($(target).next().html()) + '</span>';
                } else {
                    return '<span id="fancybox-title-over">' + ($(target).next().html()) + '</span>';
                }
            } else if ($(obj).attr('rel') && $(obj).attr('title')) {
                return '<span id="fancybox-title-over">' + '<div class="fancybox-num"> Image:' + (currentIndex + 1) + ' / ' + currentArray.length + '</div> ' + (title.length ? '' + title : '') + '</span>';
            } else if ($(obj).attr('rel')) {
                return '<span id="fancybox-title-over">' + '<div class="fancybox-num" style="margin-bottom:0px"> Image:' + (currentIndex + 1) + ' / ' + currentArray.length + '</div>' + '</span>';
            } else if ($(obj).attr('title')) {
                return '<span id="fancybox-title-over">' + (title.length ? '' + title : '') + '</span>';
            } else {
                $('#fancybox-title-over').hide();
            }
        },
        'onComplete': function() {
            $('#fancybox-title-over').hide().fadeIn('slow');
        }
    });
    $('a.media').fancybox({
        'transitionIn': lightboxTransition,
        'transitionOut': lightboxTransition,
        'padding': '0',
        'titlePosition': 'outside',
        'width': videoWidth,
        'height': videoHeight,
        'overlayOpacity': overlayOpacity,
        'overlayColor': overlayColor,
        'autoscale': false,
        'type': 'iframe',
        'swf': {
            'wmode': 'transparent',
            'allowfullscreen': 'true'
        }
    });
});;
$(document).ready(function() {
    var contactFormDefaults = new Array();
    contactFormDefaults['name'] = 'Your Name';
    contactFormDefaults['email'] = 'E-mail';
    contactFormDefaults['subject'] = 'Subject';
    contactFormDefaults['message'] = 'Message';
    contactFormDefaults['msg'] = $('.contactForm span#msg').html();
    $('.contactForm input[type="text"], .contactForm textarea').focus(function() {
        $(this).addClass('inputHighlight').removeClass('errorOutline');
        if ($(this).hasClass('required')) {
            $('.contactForm span#msg').html('This is a required field.').removeClass('errorMsg successMsg');
        } else {
            $('.contactForm span#msg').html(contactFormDefaults['msg']).removeClass('errorMsg successMsg');
        }
        if ($(this).val() == contactFormDefaults[$(this).attr('id')]) {
            $(this).val('');
        }
    });
    $('.contactForm input[type="text"], .contactForm textarea').blur(function() {
        $(this).removeClass('inputHighlight');
        $('.contactForm span#msg').html(contactFormDefaults['msg']).removeClass('errorMsg successMsg');
        if ($(this).val() == '') {
            $(this).val(contactFormDefaults[$(this).attr('id')]);
        }
    });
    $('.contactForm input[type="text"], .contactForm textarea').hover(function() {
        $(this).addClass('inputHighlight');
    }, function() {
        $(this).not(':focus').removeClass('inputHighlight');
    });
    $('.contactForm').submit(function() {
        $('.contactForm .submit').attr("disabled", "disabled");
        $('#msg').html('<img src="images/loader-light.gif" />').removeClass('errorMsg successMsg');
        var isError = false;
        $('.contactForm input, .contactForm textarea').each(function() {
            if ($(this).hasClass('required') && ($.trim($(this).val()) == contactFormDefaults[$(this).attr('id')] || $.trim($(this).val()) == '')) {
                $(this).addClass('errorOutline');
                $('#msg').html('There was an error sending your message. Please try again.').addClass('errorMsg');
                isError = true;
            }
            if ($(this).attr('id') == 'email') {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (reg.test($(this).val()) == false) {
                    $(this).addClass('errorOutline');
                    if (!isError) {
                        $('#msg').html('Please enter a valid e-mail address and try again.').addClass('errorMsg');
                    }
                    isError = true;
                }
            }
        });
        if (isError) {
            $('.contactForm .submit').removeAttr("disabled");
            return false;
        } else {
            var name = $('#name').val(),
                email = $('#email').val(),
                subject = $('#subject').val(),
                message = $('#message').val();
            $.ajaxSetup({
                cache: false
            });
            var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message + '&ajax=1';
            $.ajax({
                type: "POST",
                url: "php/contact.php",
                data: dataString,
                success: function(msg) {
                    if (msg == 'Mail sent') {
                        $('#msg').html('Message sent.').addClass('successMsg');
                        if (contactFormDefaults['subject']) {
                            $('#subject').val(contactFormDefaults['subject']);
                        } else {
                            $('#subject').val('');
                        }
                        if (contactFormDefaults['message']) {
                            $('#message').val(contactFormDefaults['message']);
                        } else {
                            $('#message').val('');
                        }
                    } else {
                        $('#msg').html('There was an error sending your email. Please try again.').addClass('errorMsg');
                        $('.contactForm .submit').attr("disabled", "");
                    }
                    $('.contactForm .submit').removeAttr("disabled");
                },
                error: function(ob, errStr) {
                    $('#msg').html('There was an error sending your email. Please try again.').addClass('errorMsg');
                    $('.contactForm .submit').removeAttr("disabled");
                }
            });
            return false;
        }
    });
});;
$(function() {
    var current, next, prev, target, hash, url, page, title, errorMessage = '<p>Sorry, an error occurred <br/> Check the path of the page you are loading or your connection</p>',
        projectIndex, projectLength, ajaxLoading = false,
        contentH, initialLoad = true,
        contentState = false,
        thumbContainer = $('div#folio-grid'),
        contentContainer = $('div#ajax-content-inner'),
        contentNavigation = $('#folio-navigation ul'),
        exitProject = $('div#closeProject a'),
        easeing = 'easeInOutQuint',
        folderName = 'folio',
        scrollPostition;
    $(window).bind('hashchange', function() {
        var root = '#!' + folderName + '/';
        var rootLength = root.length;
        hash = $(window.location).attr('hash');
        url = hash.replace(/[#\!]/g, '');
        document.title = 'Preseed' + (hash.replace(/[_\-\#\!\.\/]/g, ' ').replace('html', ' ').replace(folderName, ' '));
        thumbContainer.find('div.folio-thumb-container.currentProject').children().removeClass('active');
        thumbContainer.find('div.folio-thumb-container.currentProject').removeClass('currentProject');
        var correction = 50;
        if (isMobile == true) correction = 20;
        var headerH = $('.header').outerHeight() + correction;
        if (initialLoad == true && hash.substr(0, rootLength) == root) {
            $('html,body').stop().animate({
                scrollTop: (contentContainer.offset().top + 600) + 'px'
            }, 800, 'easeInOutQuint', function() {
                loadContent();
            });
        } else if (initialLoad == false && hash.substr(0, rootLength) == root) {
            $('html,body').stop().animate({
                scrollTop: (contentContainer.offset().top - headerH) + 'px'
            }, 800, 'easeInOutQuint', function() {
                if (contentState == false) {
                    loadContent();
                } else {
                    contentContainer.animate({
                        opacity: 0,
                        height: contentH
                    }, function() {
                        loadContent();
                    });
                }
                contentNavigation.fadeOut('fast');
                exitProject.fadeOut('fast');
            });
        } else if (hash == '' && initialLoad == false || hash.substr(0, rootLength) != root && initialLoad == false) {
            $('html,body').stop().animate({
                scrollTop: scrollPostition + 'px'
            }, 1000, function() {
                unloadContent();
            });
        }
        thumbContainer.find('div.folio-thumb-container .folio-thumb a[href="#!' + url + '"]').parent().parent().addClass('currentProject');
        thumbContainer.find('div.folio-thumb-container.currentProject').find('.folio-thumb').addClass('active');
    });

    function loadContent() {
        $('div#loader').fadeIn('fast').removeClass('errorMessage').html('');
        if (!ajaxLoading) {
            ajaxLoading = true;
            contentContainer.load(url + ' div#ajaxpage', function(xhr, statusText, request) {
                if (statusText == "success") {
                    ajaxLoading = false;
                    page = $('div#ajaxpage')
                    $('.flexslider').flexslider({
                        animation: "face",
                        slideDirection: "horizontal",
                        slideshow: true,
                        slideshowSpeed: 3500,
                        animationDuration: 500,
                        directionNav: true,
                        controlNav: true,
                    });
                    contentH = contentContainer.children('div#ajaxpage').height() + 'px';
                    hideLoader();
                }
                if (statusText == "error") {
                    $('div#loader').addClass('errorMessage').append(errorMessage);
                    $('div#loader').find('p').slideDown();
                }
            });
        }
    }

    function hideLoader() {
        $('div#loader').fadeOut('fast', function() {
            showContent();
        });
    }

    function showContent() {
        if (contentState == false) {
            contentContainer.animate({
                opacity: 1,
                height: contentH
            }, 800, function() {
                scrollPostition = $('html,body').scrollTop();
                contentNavigation.fadeIn('fast');
                exitProject.fadeIn();
                contentState = true
            });
        } else {
            contentContainer.animate({
                opacity: 1,
                height: contentH
            }, function() {
                scrollPostition = $('html,body').scrollTop();
                contentNavigation.fadeIn('fast');
                exitProject.fadeIn();
            });
        }
        projectIndex = thumbContainer.find('div.folio-thumb-container.currentProject').index();
        projectLength = $('div.folio-thumb-container .folio-thumb').length - 1;
        if (projectIndex == projectLength) {
            $('ul li#nextProject a').addClass('disabled');
            $('ul li#prevProject a').removeClass('disabled');
        } else if (projectIndex == 0) {
            $('ul li#prevProject a').addClass('disabled');
            $('ul li#nextProject a').removeClass('disabled');
        } else {
            $('ul li#nextProject a,ul li#prevProject a ').removeClass('disabled');
        }
    }

    function unloadContent() {
        contentContainer.animate({
            opacity: 0,
            height: '0px'
        }, function() {
            $(this).empty();
            contentState = false
        });
        contentNavigation.fadeOut();
        exitProject.fadeOut();
    }
    $('#nextProject a').on('click', function() {
        current = thumbContainer.find('.folio-thumb-container.currentProject');
        next = current.next('.folio-thumb-container');
        target = $(next).children('div').children('a').attr('href');
        $(this).attr('href', target);
        if (next.length === 0) {
            return false;
        }
        current.removeClass('currentProject');
        current.children().removeClass('active');
        next.addClass('currentProject');
        next.children().addClass('active');
    });
    $('#prevProject a').on('click', function() {
        current = thumbContainer.find('.folio-thumb-container.currentProject');
        prev = current.prev('.folio-thumb-container');
        target = $(prev).children('div').children('a').attr('href');
        $(this).attr('href', target);
        if (prev.length === 0) {
            return false;
        }
        current.removeClass('currentProject');
        current.children().removeClass('active');
        prev.addClass('currentProject');
        prev.children().addClass('active');
    });
    $('#closeProject a, #closeProjectMobile a').on('click', function() {
        unloadContent();
        thumbContainer.find('div.folio-thumb-container.currentProject').children().removeClass('active');
        $('div#loader').fadeOut();
        return false;
    });
    $(window).trigger('hashchange');
    $(window).bind('resize', function() {
        $(contentContainer).css({
            height: 'auto'
        });
    });
    initialLoad = false;
});;
(function($) {
    $.fn.epicSlider = function(options) {
        var defaults = {
            loop: true,
            slideShow: false,
            autoPlay: false,
            slideShowInterval: 2500,
            transitionSpeed: 750,
            startSlide: 0,
            shuffleSlides: false,
            easing: 'easeInOutQuint',
            fx: 'leftToRight',
            fxmobile: 'leftToRight',
            pattern: true
        };
        var options = $.extend({}, defaults, options);
        var slider = $(this),
            slides = slider.find('#slides'),
            currentSlide = slides.find('img').eq(options.startSlide),
            slideLength = slides.find('img').length,
            running = false,
            nextSlide, prevSlide, navNext, navPrev, navPlay, target, set, caption, winW, winH, winRatio, imgW, imgH, imgRatio, newW, newH, timer;

        function init() {
            resize();
            currentSlide.addClass('current').show();
            caption = currentSlide.attr('title');
            captionProcess();
            if (options.slideShow == true && options.autoPlay == true) {
                setTimer();
                running = true;
            }
        };
        if (options.slideShow == false) {
            slider.append('<div id="epic-navigation"><div class="nav-button"><div id="prev"></div></div><div class="nav-button"><div id="next"></div></div></div>');
        } else if (options.slideShow == true && options.autoPlay == false) {
            slider.append('<div id="epic-navigation" class="allcontrols"><div class="nav-button"><div id="progress"></div><div id="play"></div></div><div class="nav-button"><div id="prev"></div></div><div class="nav-button nav-last"><div id="next"></div></div></div>');
        } else {
            slider.append('<div id="epic-navigation" class="allcontrols"><div class="nav-button"><div id="progress"></div><div id="play" class="active"></div></div><div class="nav-button"><div id="prev"></div></div><div class="nav-button nav-last"><div id="next"></div></div></div>');
        }
        navNext = $('#next');
        navPrev = $('#prev');
        navPlay = $('#play');
        if (options.pattern == true) slider.append(' <div id="epic-overlay"></div>');
        if (options.fx != 'topToBottom') {
            $('#next').addClass('right');
            $('#prev').addClass('left');
        } else {
            $('#next').addClass('up');
            $('#prev').addClass('down');
        }
        if (options.loop == false) {
            navPrev.parent().addClass('disabled')
            navPrev.attr('disabled', 'disabled');
        }
        if (options.shuffleSlides == true) {
            var stack = slides.children('img');
            stack.sort(function() {
                return (Math.round(Math.random()) - 0.5);
            });
            slides.children().remove();
            for (var i = 0; i < stack.length; i++)
                slides.append(stack[i]);
            currentSlide = slides.find('img').eq(options.startSlide)
        }

        function deviceMobile() {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)) {
                options.fx = options.fxmobile;
                $(slider).touchSwipe(callback);

                function callback(direction) {
                    $.fn.epicSlider.killTimer();
                    if (direction == 'left') {
                        slide('next');
                    } else {
                        slide('prev');
                    }
                }
            };
        };
        navNext.on('click', function() {
            if (running == true) $.fn.epicSlider.killTimer();
            slide('next');
        });
        navPrev.on('click', function() {
            if (running == true) $.fn.epicSlider.killTimer();
            slide('prev');
        });
        navPlay.on('click', function() {
            if ($(this).parent().hasClass('disabled')) return false;
            if (running == false) {
                setTimer();
                $(this).addClass('active')
                running = true;
            } else {
                $.fn.epicSlider.killTimer();
                $(this).removeClass('active')
                running = false;
            }
        });
        $(document).keydown(function(e) {
            if (currentSlide.is(':animated')) return false;
            if (options.fx != 'topToBottom') {
                switch (e.which) {
                    case 37:
                        slide('prev');
                        $.fn.epicSlider.killTimer();
                        break;
                    case 39:
                        slide('next');
                        $.fn.epicSlider.killTimer();
                        break;
                }
            } else {
                switch (e.which) {
                    case 38:
                        slide('next');
                        $.fn.epicSlider.killTimer();
                        break;
                    case 40:
                        slide('prev');
                        $.fn.epicSlider.killTimer();
                        break;
                }
            }
        });
        $(window).bind('resize', function() {
            resize();
        });

        function resize() {
            winW = $(window).width()
            winH = $(window).height()
            winRatio = winH / winW
            imgW = slides.children().width()
            imgH = slides.children().height()
            imgRatio = imgH / imgW
            if (winRatio > imgRatio) {
                newH = winH;
                newW = winH / imgRatio;
            } else {
                newH = winW * imgRatio;
                newW = winW;
            };
            slides.children('img').css({
                width: newW + 'px',
                height: newH + 'px',
                left: (winW - newW) / 2 + 'px',
                top: (winH - newH) / 2 + 'px'
            });
        };

        function setTimer() {
            startProgress();
            timer = setInterval(function() {
                startProgress();
                slide('next');
            }, options.slideShowInterval);
        };

        function startProgress() {
            $('#progress').show().animate({
                width: '40px'
            }, options.slideShowInterval, 'easeInOutQuint', function() {
                $(this).css({
                    width: '0'
                })
            })
        }
        $.fn.epicSlider.killTimer = function() {
            clearInterval(timer);
            $('#progress').stop().fadeOut('fast');
            $('div#play').removeClass('active');
            running = false;
        };

        function captionProcess() {
            if (currentSlide.attr('title') != '') {
                caption = currentSlide.attr('title');
                if (options.fx != 'none') {
                    $(caption).fadeIn();
                } else {
                    $(caption).show();
                }
            };
        };

        function slide(dir) {
            if (currentSlide.is(':animated') || $(this).parent().hasClass('disabled')) return false;
            if (dir == 'next') {
                currentSlide = slides.children('img.current');
                nextSlide = currentSlide.next('img');
                if (navPrev.parent().hasClass('disabled')) navPrev.parent().removeClass('disabled');
                if (slides.find('img').length - 2 == currentSlide.index() && options.loop == false) {
                    $('#progress').stop().fadeOut('fast');
                    if (running == true) $.fn.epicSlider.killTimer();
                    navNext.parent().addClass('disabled');
                    navPlay.parent().addClass('disabled');
                }
                if (nextSlide.length === 0) {
                    if (options.loop == false) {
                        return false;
                    } else {
                        $(caption).fadeOut('fast');
                        nextSlide = slides.children('img:first-child');
                    }
                } else {
                    $(caption).fadeOut('fast');
                }
                if (options.fx == 'none') {
                    currentSlide.removeClass('current').hide();
                    nextSlide.addClass('current').show();
                    currentSlide = slides.children('img.current');
                    captionProcess();
                } else if (options.fx == 'fade') {
                    currentSlide.removeClass('current').animate({
                        opacity: 0
                    }, options.transitionSpeed, options.easing, function() {
                        $(this).hide()
                    });
                    nextSlide.addClass('current').css({
                        opacity: 0
                    }).show().animate({
                        opacity: 1
                    }, options.transitionSpeed, options.easing, function() {
                        currentSlide = slides.children('img.current');
                        captionProcess();
                    });
                } else if (options.fx == 'leftToRight') {
                    currentSlide.css({
                        zIndex: 0
                    }).removeClass('current').animate({
                        left: ((winW - newW) / 2)
                    }, options.transitionSpeed, options.easing, function() {
                        $(this).hide()
                    });
                    nextSlide.addClass('current').css({
                        left: newW,
                        zIndex: 1
                    }).show().animate({
                        left: ((winW - newW) / 2)
                    }, options.transitionSpeed, options.easing, function() {
                        currentSlide = slides.children('img.current');
                        captionProcess();
                    });
                } else if (options.fx == 'topToBottom') {
                    currentSlide.css({
                        zIndex: 0
                    }).removeClass('current').animate({
                        top: ((winH - newH) / 2)
                    }, options.transitionSpeed, options.easing, function() {
                        $(this).hide()
                    });
                    nextSlide.addClass('current').css({
                        top: -newH,
                        zIndex: 1
                    }).show().animate({
                        top: ((winH - newH) / 2)
                    }, options.transitionSpeed, options.easing, function() {
                        currentSlide = slides.children('img.current');
                        captionProcess();
                    });
                }
            } else {
                currentSlide = slides.children('img.current');
                prevSlide = currentSlide.prev('img');
                if (navNext.parent().hasClass('disabled')) navNext.parent().removeClass('disabled');
                if (navPlay.parent().hasClass('disabled')) navPlay.parent().removeClass('disabled');
                if (currentSlide.index() == 1 && options.loop == false) {
                    navPrev.parent().addClass('disabled');
                }
                if (prevSlide.length === 0) {
                    if (options.loop == false) {
                        navPrev.parent().addClass('disabled');
                        return false;
                    } else {
                        $(caption).fadeOut('fast');
                        prevSlide = slides.children('img:last-child');
                    }
                } else {
                    $(caption).fadeOut('fast');
                }
                if (options.fx == 'none') {
                    currentSlide.removeClass('current').hide();
                    prevSlide.addClass('current').show();
                    currentSlide = slides.children('img.current');
                    captionProcess();
                } else if (options.fx == 'fade') {
                    currentSlide.removeClass('current').animate({
                        opacity: 0
                    }, options.transitionSpeed, options.easing, function() {
                        $(this).hide()
                    });
                    prevSlide.addClass('current').css({
                        opacity: 0
                    }).show().animate({
                        opacity: 1
                    }, options.transitionSpeed, options.easing, function() {
                        currentSlide = slides.children('img.current');
                        captionProcess();
                    });
                } else if (options.fx == 'leftToRight') {
                    currentSlide.css({
                        zIndex: 0
                    }).removeClass('current').animate({
                        left: ((winW - newW) / 2)
                    }, options.transitionSpeed, options.easing, function() {
                        $(this).hide()
                    });
                    prevSlide.addClass('current').css({
                        left: -newW,
                        zIndex: 1
                    }).show().animate({
                        left: ((winW - newW) / 2)
                    }, options.transitionSpeed, options.easing, function() {
                        currentSlide = slides.children('img.current');
                        captionProcess();
                    });
                } else if (options.fx == 'topToBottom') {
                    currentSlide.css({
                        zIndex: 0
                    }).removeClass('current').animate({
                        top: ((winH - newH) / 2)
                    }, options.transitionSpeed, options.easing, function() {
                        $(this).hide()
                    });
                    prevSlide.addClass('current').css({
                        top: newH,
                        zIndex: 1
                    }).show().animate({
                        top: ((winH - newH) / 2)
                    }, options.transitionSpeed, options.easing, function() {
                        currentSlide = slides.children('img.current');
                        captionProcess();
                    });
                }
            }
        }
        slides.find('img').each(function() {
            var img = new Image();
            var path = $(this).attr('src');
            $(img).load(function() {
                slideLength--;
                if (!slideLength) {
                    slider.css({
                        background: 'none'
                    });
                    deviceMobile();
                    init();
                }
            }).attr('src', path).error(function() {
                alert('check image path or connection');
            });
        });
    };
})(jQuery);;;
(function(b) {
    var m, t, u, f, D, j, E, n, z, A, q = 0,
        e = {},
        o = [],
        p = 0,
        d = {},
        l = [],
        G = null,
        v = new Image,
        J = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
        W = /[^\.]\.(swf)\s*$/i,
        K, L = 1,
        y = 0,
        s = "",
        r, i, h = false,
        B = b.extend(b("<div/>")[0], {
            prop: 0
        }),
        M = b.browser.msie && b.browser.version < 7 && !window.XMLHttpRequest,
        N = function() {
            t.hide();
            v.onerror = v.onload = null;
            G && G.abort();
            m.empty()
        },
        O = function() {
            if (false === e.onError(o, q, e)) {
                t.hide();
                h = false
            } else {
                e.titleShow = false;
                e.width = "auto";
                e.height = "auto";
                m.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
                F()
            }
        },
        I = function() {
            var a = o[q],
                c, g, k, C, P, w;
            N();
            e = b.extend({}, b.fn.fancybox.defaults, typeof b(a).data("fancybox") == "undefined" ? e : b(a).data("fancybox"));
            w = e.onStart(o, q, e);
            if (w === false) h = false;
            else {
                if (typeof w == "object") e = b.extend(e, w);
                k = e.title || (a.nodeName ? b(a).attr("title") : a.title) || "";
                if (a.nodeName && !e.orig) e.orig = b(a).children("img:first").length ? b(a).children("img:first") : b(a);
                if (k === "" && e.orig && e.titleFromAlt) k = e.orig.attr("alt");
                c = e.href || (a.nodeName ? b(a).attr("href") : a.href) || null;
                if (/^(?:javascript)/i.test(c) || c == "#") c = null;
                if (e.type) {
                    g = e.type;
                    if (!c) c = e.content
                } else if (e.content) g = "html";
                else if (c) g = c.match(J) ? "image" : c.match(W) ? "swf" : b(a).hasClass("iframe") ? "iframe" : c.indexOf("#") === 0 ? "inline" : "ajax";
                if (g) {
                    if (g == "inline") {
                        a = c.substr(c.indexOf("#"));
                        g = b(a).length > 0 ? "inline" : "ajax"
                    }
                    e.type = g;
                    e.href = c;
                    e.title = k;
                    if (e.autoDimensions)
                        if (e.type == "html" || e.type == "inline" || e.type == "ajax") {
                            e.width = "auto";
                            e.height = "auto"
                        } else e.autoDimensions = false;
                    if (e.modal) {
                        e.overlayShow = true;
                        e.hideOnOverlayClick = false;
                        e.hideOnContentClick = false;
                        e.enableEscapeButton = false;
                        e.showCloseButton = false
                    }
                    e.padding = parseInt(e.padding, 10);
                    e.margin = parseInt(e.margin, 10);
                    m.css("padding", e.padding + e.margin);
                    b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", function() {
                        b(this).replaceWith(j.children())
                    });
                    switch (g) {
                        case "html":
                            m.html(e.content);
                            F();
                            break;
                        case "inline":
                            if (b(a).parent().is("#fancybox-content") === true) {
                                h = false;
                                break
                            }
                            b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup", function() {
                                b(this).replaceWith(j.children())
                            }).bind("fancybox-cancel", function() {
                                b(this).replaceWith(m.children())
                            });
                            b(a).appendTo(m);
                            F();
                            break;
                        case "image":
                            h = false;
                            b.fancybox.showActivity();
                            v = new Image;
                            v.onerror = function() {
                                O()
                            };
                            v.onload = function() {
                                h = true;
                                v.onerror = v.onload = null;
                                e.width = v.width;
                                e.height = v.height;
                                b("<img />").attr({
                                    id: "fancybox-img",
                                    src: v.src,
                                    alt: e.title
                                }).appendTo(m);
                                Q()
                            };
                            v.src = c;
                            break;
                        case "swf":
                            e.scrolling = "no";
                            C = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + e.width + '" height="' + e.height + '"><param name="movie" value="' + c + '"></param>';
                            P = "";
                            b.each(e.swf, function(x, H) {
                                C += '<param name="' + x + '" value="' + H + '"></param>';
                                P += " " + x + '="' + H + '"'
                            });
                            C += '<embed src="' + c + '" type="application/x-shockwave-flash" width="' + e.width + '" height="' + e.height + '"' + P + "></embed></object>";
                            m.html(C);
                            F();
                            break;
                        case "ajax":
                            h = false;
                            b.fancybox.showActivity();
                            e.ajax.win = e.ajax.success;
                            G = b.ajax(b.extend({}, e.ajax, {
                                url: c,
                                data: e.ajax.data || {},
                                error: function(x) {
                                    x.status > 0 && O()
                                },
                                success: function(x, H, R) {
                                    if ((typeof R == "object" ? R : G).status == 200) {
                                        if (typeof e.ajax.win == "function") {
                                            w = e.ajax.win(c, x, H, R);
                                            if (w === false) {
                                                t.hide();
                                                return
                                            } else if (typeof w == "string" || typeof w == "object") x = w
                                        }
                                        m.html(x);
                                        F()
                                    }
                                }
                            }));
                            break;
                        case "iframe":
                            Q()
                    }
                } else O()
            }
        },
        F = function() {
            var a = e.width,
                c = e.height;
            a = a.toString().indexOf("%") > -1 ? parseInt((b(window).width() - e.margin * 2) * parseFloat(a) / 100, 10) + "px" : a == "auto" ? "auto" : a + "px";
            c = c.toString().indexOf("%") > -1 ? parseInt((b(window).height() - e.margin * 2) * parseFloat(c) / 100, 10) + "px" : c == "auto" ? "auto" : c + "px";
            m.wrapInner('<div style="width:' + a + ";height:" + c + ";overflow: " + (e.scrolling == "auto" ? "auto" : e.scrolling == "yes" ? "scroll" : "hidden") + ';position:relative;"></div>');
            e.width = m.width();
            e.height = m.height();
            Q()
        },
        Q = function() {
            var a, c;
            t.hide();
            if (f.is(":visible") && false === d.onCleanup(l, p, d)) {
                b.event.trigger("fancybox-cancel");
                h = false
            } else {
                h = true;
                b(j.add(u)).unbind();
                b(window).unbind("resize.fb scroll.fb");
                b(document).unbind("keydown.fb");
                f.is(":visible") && d.titlePosition !== "outside" && f.css("height", f.height());
                l = o;
                p = q;
                d = e;
                if (d.overlayShow) {
                    u.css({
                        "background-color": d.overlayColor,
                        opacity: d.overlayOpacity,
                        cursor: d.hideOnOverlayClick ? "pointer" : "auto",
                        height: b(document).height()
                    });
                    if (!u.is(":visible")) {
                        M && b("select:not(#fancybox-tmp select)").filter(function() {
                            return this.style.visibility !== "hidden"
                        }).css({
                            visibility: "hidden"
                        }).one("fancybox-cleanup", function() {
                            this.style.visibility = "inherit"
                        });
                        u.show()
                    }
                } else u.hide();
                i = X();
                s = d.title || "";
                y = 0;
                n.empty().removeAttr("style").removeClass();
                if (d.titleShow !== false) {
                    if (b.isFunction(d.titleFormat)) a = d.titleFormat(s, l, p, d);
                    else a = s && s.length ? d.titlePosition == "float" ? '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + s + '</td><td id="fancybox-title-float-right"></td></tr></table>' : '<div id="fancybox-title-' + d.titlePosition + '">' + s + "</div>" : false;
                    s = a;
                    if (!(!s || s === "")) {
                        n.addClass("fancybox-title-" + d.titlePosition).html(s).appendTo("body").show();
                        switch (d.titlePosition) {
                            case "inside":
                                n.css({
                                    width: i.width - d.padding * 2,
                                    marginLeft: d.padding,
                                    marginRight: d.padding
                                });
                                y = n.outerHeight(true);
                                n.appendTo(D);
                                i.height += y;
                                break;
                            case "over":
                                n.css({
                                    marginLeft: d.padding,
                                    width: i.width - d.padding * 2,
                                    bottom: d.padding
                                }).appendTo(D);
                                break;
                            case "float":
                                n.css("left", parseInt((n.width() - i.width - 40) / 2, 10) * -1).appendTo(f);
                                break;
                            default:
                                n.css({
                                    width: i.width - d.padding * 2,
                                    paddingLeft: d.padding,
                                    paddingRight: d.padding
                                }).appendTo(f)
                        }
                    }
                }
                n.hide();
                if (f.is(":visible")) {
                    b(E.add(z).add(A)).hide();
                    a = f.position();
                    r = {
                        top: a.top,
                        left: a.left,
                        width: f.width(),
                        height: f.height()
                    };
                    c = r.width == i.width && r.height == i.height;
                    j.fadeTo(d.changeFade, 0.3, function() {
                        var g = function() {
                            j.html(m.contents()).fadeTo(d.changeFade, 1, S)
                        };
                        b.event.trigger("fancybox-change");
                        j.empty().removeAttr("filter").css({
                            "border-width": d.padding,
                            width: i.width - d.padding * 2,
                            height: e.autoDimensions ? "auto" : i.height - y - d.padding * 2
                        });
                        if (c) g();
                        else {
                            B.prop = 0;
                            b(B).animate({
                                prop: 1
                            }, {
                                duration: d.changeSpeed,
                                easing: d.easingChange,
                                step: T,
                                complete: g
                            })
                        }
                    })
                } else {
                    f.removeAttr("style");
                    j.css("border-width", d.padding);
                    if (d.transitionIn == "elastic") {
                        r = V();
                        j.html(m.contents());
                        f.show();
                        if (d.opacity) i.opacity = 0;
                        B.prop = 0;
                        b(B).animate({
                            prop: 1
                        }, {
                            duration: d.speedIn,
                            easing: d.easingIn,
                            step: T,
                            complete: S
                        })
                    } else {
                        d.titlePosition == "inside" && y > 0 && n.show();
                        j.css({
                            width: i.width - d.padding * 2,
                            height: e.autoDimensions ? "auto" : i.height - y - d.padding * 2
                        }).html(m.contents());
                        f.css(i).fadeIn(d.transitionIn == "none" ? 0 : d.speedIn, S)
                    }
                }
            }
        },
        Y = function() {
            if (d.enableEscapeButton || d.enableKeyboardNav) b(document).bind("keydown.fb", function(a) {
                if (a.keyCode == 27 && d.enableEscapeButton) {
                    a.preventDefault();
                    b.fancybox.close()
                } else if ((a.keyCode == 37 || a.keyCode == 39) && d.enableKeyboardNav && a.target.tagName !== "INPUT" && a.target.tagName !== "TEXTAREA" && a.target.tagName !== "SELECT") {
                    a.preventDefault();
                    b.fancybox[a.keyCode == 37 ? "prev" : "next"]()
                }
            });
            if (d.showNavArrows) {
                if (d.cyclic && l.length > 1 || p !== 0) z.show();
                if (d.cyclic && l.length > 1 || p != l.length - 1) A.show()
            } else {
                z.hide();
                A.hide()
            }
        },
        S = function() {
            if (!b.support.opacity) {
                j.get(0).style.removeAttribute("filter");
                f.get(0).style.removeAttribute("filter")
            }
            e.autoDimensions && j.css("height", "auto");
            f.css("height", "auto");
            s && s.length && n.show();
            d.showCloseButton && E.show();
            Y();
            d.hideOnContentClick && j.bind("click", b.fancybox.close);
            d.hideOnOverlayClick && u.bind("click", b.fancybox.close);
            b(window).bind("resize.fb", b.fancybox.resize);
            d.centerOnScroll && b(window).bind("scroll.fb", b.fancybox.center);
            if (d.type == "iframe") b('<iframe id="fancybox-frame" name="fancybox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" ' + (b.browser.msie ? 'allowtransparency="true""' : "") + ' scrolling="' + e.scrolling + '" src="' + d.href + '"></iframe>').appendTo(j);
            f.show();
            h = false;
            b.fancybox.center();
            d.onComplete(l, p, d);
            var a, c;
            if (l.length - 1 > p) {
                a = l[p + 1].href;
                if (typeof a !== "undefined" && a.match(J)) {
                    c = new Image;
                    c.src = a
                }
            }
            if (p > 0) {
                a = l[p - 1].href;
                if (typeof a !== "undefined" && a.match(J)) {
                    c = new Image;
                    c.src = a
                }
            }
        },
        T = function(a) {
            var c = {
                width: parseInt(r.width + (i.width - r.width) * a, 10),
                height: parseInt(r.height + (i.height - r.height) * a, 10),
                top: parseInt(r.top + (i.top - r.top) * a, 10),
                left: parseInt(r.left + (i.left - r.left) * a, 10)
            };
            if (typeof i.opacity !== "undefined") c.opacity = a < 0.5 ? 0.5 : a;
            f.css(c);
            j.css({
                width: c.width - d.padding * 2,
                height: c.height - y * a - d.padding * 2
            })
        },
        U = function() {
            return [b(window).width() - d.margin * 2, b(window).height() - d.margin * 2, b(document).scrollLeft() + d.margin, b(document).scrollTop() + d.margin]
        },
        X = function() {
            var a = U(),
                c = {},
                g = d.autoScale,
                k = d.padding * 2;
            c.width = d.width.toString().indexOf("%") > -1 ? parseInt(a[0] * parseFloat(d.width) / 100, 10) : d.width + k;
            c.height = d.height.toString().indexOf("%") > -1 ? parseInt(a[1] * parseFloat(d.height) / 100, 10) : d.height + k;
            if (g && (c.width > a[0] || c.height > a[1]))
                if (e.type == "image" || e.type == "swf") {
                    g = d.width / d.height;
                    if (c.width > a[0]) {
                        c.width = a[0];
                        c.height = parseInt((c.width - k) / g + k, 10)
                    }
                    if (c.height > a[1]) {
                        c.height = a[1];
                        c.width = parseInt((c.height - k) * g + k, 10)
                    }
                } else {
                    c.width = Math.min(c.width, a[0]);
                    c.height = Math.min(c.height, a[1])
                }
            c.top = parseInt(Math.max(a[3] - 20, a[3] + (a[1] - c.height - 40) * 0.5), 10);
            c.left = parseInt(Math.max(a[2] - 20, a[2] + (a[0] - c.width - 40) * 0.5), 10);
            return c
        },
        V = function() {
            var a = e.orig ? b(e.orig) : false,
                c = {};
            if (a && a.length) {
                c = a.offset();
                c.top += parseInt(a.css("paddingTop"), 10) || 0;
                c.left += parseInt(a.css("paddingLeft"), 10) || 0;
                c.top += parseInt(a.css("border-top-width"), 10) || 0;
                c.left += parseInt(a.css("border-left-width"), 10) || 0;
                c.width = a.width();
                c.height = a.height();
                c = {
                    width: c.width + d.padding * 2,
                    height: c.height + d.padding * 2,
                    top: c.top - d.padding - 20,
                    left: c.left - d.padding - 20
                }
            } else {
                a = U();
                c = {
                    width: d.padding * 2,
                    height: d.padding * 2,
                    top: parseInt(a[3] + a[1] * 0.5, 10),
                    left: parseInt(a[2] + a[0] * 0.5, 10)
                }
            }
            return c
        },
        Z = function() {
            if (t.is(":visible")) {
                b("div", t).css("top", L * -40 + "px");
                L = (L + 1) % 12
            } else clearInterval(K)
        };
    b.fn.fancybox = function(a) {
        if (!b(this).length) return this;
        b(this).data("fancybox", b.extend({}, a, b.metadata ? b(this).metadata() : {})).unbind("click.fb").bind("click.fb", function(c) {
            c.preventDefault();
            if (!h) {
                h = true;
                b(this).blur();
                o = [];
                q = 0;
                c = b(this).attr("rel") || "";
                if (!c || c == "" || c === "nofollow") o.push(this);
                else {
                    o = b("a[rel=" + c + "], area[rel=" + c + "]");
                    q = o.index(this)
                }
                I()
            }
        });
        return this
    };
    b.fancybox = function(a, c) {
        var g;
        if (!h) {
            h = true;
            g = typeof c !== "undefined" ? c : {};
            o = [];
            q = parseInt(g.index, 10) || 0;
            if (b.isArray(a)) {
                for (var k = 0, C = a.length; k < C; k++)
                    if (typeof a[k] == "object") b(a[k]).data("fancybox", b.extend({}, g, a[k]));
                    else a[k] = b({}).data("fancybox", b.extend({
                        content: a[k]
                    }, g));
                o = jQuery.merge(o, a)
            } else {
                if (typeof a == "object") b(a).data("fancybox", b.extend({}, g, a));
                else a = b({}).data("fancybox", b.extend({
                    content: a
                }, g));
                o.push(a)
            } if (q > o.length || q < 0) q = 0;
            I()
        }
    };
    b.fancybox.showActivity = function() {
        clearInterval(K);
        t.show();
        K = setInterval(Z, 66)
    };
    b.fancybox.hideActivity = function() {
        t.hide()
    };
    b.fancybox.next = function() {
        return b.fancybox.pos(p +
            1)
    };
    b.fancybox.prev = function() {
        return b.fancybox.pos(p - 1)
    };
    b.fancybox.pos = function(a) {
        if (!h) {
            a = parseInt(a);
            o = l;
            if (a > -1 && a < l.length) {
                q = a;
                I()
            } else if (d.cyclic && l.length > 1) {
                q = a >= l.length ? 0 : l.length - 1;
                I()
            }
        }
    };
    b.fancybox.cancel = function() {
        if (!h) {
            h = true;
            b.event.trigger("fancybox-cancel");
            N();
            e.onCancel(o, q, e);
            h = false
        }
    };
    b.fancybox.close = function() {
        function a() {
            u.fadeOut("fast");
            n.empty().hide();
            f.hide();
            b.event.trigger("fancybox-cleanup");
            j.empty();
            d.onClosed(l, p, d);
            l = e = [];
            p = q = 0;
            d = e = {};
            h = false
        }
        if (!(h || f.is(":hidden"))) {
            h = true;
            if (d && false === d.onCleanup(l, p, d)) h = false;
            else {
                N();
                b(E.add(z).add(A)).hide();
                b(j.add(u)).unbind();
                b(window).unbind("resize.fb scroll.fb");
                b(document).unbind("keydown.fb");
                j.find("iframe").attr("src", M && /^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank");
                d.titlePosition !== "inside" && n.empty();
                f.stop();
                if (d.transitionOut == "elastic") {
                    r = V();
                    var c = f.position();
                    i = {
                        top: c.top,
                        left: c.left,
                        width: f.width(),
                        height: f.height()
                    };
                    if (d.opacity) i.opacity = 1;
                    n.empty().hide();
                    B.prop = 1;
                    b(B).animate({
                        prop: 0
                    }, {
                        duration: d.speedOut,
                        easing: d.easingOut,
                        step: T,
                        complete: a
                    })
                } else f.fadeOut(d.transitionOut == "none" ? 0 : d.speedOut, a)
            }
        }
    };
    b.fancybox.resize = function() {
        u.is(":visible") && u.css("height", b(document).height());
        b.fancybox.center(true)
    };
    b.fancybox.center = function(a) {
        var c, g;
        if (!h) {
            g = a === true ? 1 : 0;
            c = U();
            !g && (f.width() > c[0] || f.height() > c[1]) || f.stop().animate({
                top: parseInt(Math.max(c[3] - 20, c[3] + (c[1] - j.height() - 40) * 0.5 - d.padding)),
                left: parseInt(Math.max(c[2] - 20, c[2] + (c[0] - j.width() - 40) * 0.5 -
                    d.padding))
            }, typeof a == "number" ? a : 200)
        }
    };
    b.fancybox.init = function() {
        if (!b("#fancybox-wrap").length) {
            b("body").append(m = b('<div id="fancybox-tmp"></div>'), t = b('<div id="fancybox-loading"><div></div></div>'), u = b('<div id="fancybox-overlay"></div>'), f = b('<div id="fancybox-wrap"></div>'));
            D = b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(f);
            D.append(j = b('<div id="fancybox-content"></div>'), E = b('<a id="fancybox-close"></a>'), n = b('<div id="fancybox-title"></div>'), z = b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), A = b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
            E.click(b.fancybox.close);
            t.click(b.fancybox.cancel);
            z.click(function(a) {
                a.preventDefault();
                b.fancybox.prev()
            });
            A.click(function(a) {
                a.preventDefault();
                b.fancybox.next()
            });
            b.fn.mousewheel && f.bind("mousewheel.fb", function(a, c) {
                if (h) a.preventDefault();
                else if (b(a.target).get(0).clientHeight == 0 || b(a.target).get(0).scrollHeight === b(a.target).get(0).clientHeight) {
                    a.preventDefault();
                    b.fancybox[c > 0 ? "prev" : "next"]()
                }
            });
            b.support.opacity || f.addClass("fancybox-ie");
            if (M) {
                t.addClass("fancybox-ie6");
                f.addClass("fancybox-ie6");
                b('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(D)
            }
        }
    };
    b.fn.fancybox.defaults = {
        padding: 10,
        margin: 40,
        opacity: false,
        modal: false,
        cyclic: false,
        scrolling: "auto",
        width: 560,
        height: 340,
        autoScale: true,
        autoDimensions: true,
        centerOnScroll: false,
        ajax: {},
        swf: {
            wmode: "transparent"
        },
        hideOnOverlayClick: true,
        hideOnContentClick: false,
        overlayShow: true,
        overlayOpacity: 0.7,
        overlayColor: "#777",
        titleShow: true,
        titlePosition: "float",
        titleFormat: null,
        titleFromAlt: false,
        transitionIn: "fade",
        transitionOut: "fade",
        speedIn: 300,
        speedOut: 300,
        changeSpeed: 300,
        changeFade: "fast",
        easingIn: "swing",
        easingOut: "swing",
        showCloseButton: true,
        showNavArrows: true,
        enableEscapeButton: true,
        enableKeyboardNav: true,
        onStart: function() {},
        onCancel: function() {},
        onComplete: function() {},
        onCleanup: function() {},
        onClosed: function() {},
        onError: function() {}
    };
    b(document).ready(function() {
        b.fancybox.init()
    })
})(jQuery);;
/*
 * jQuery FlexSlider v1.8
 * http://www.woothemes.com/flexslider/
 *
 * Copyright 2012 WooThemes
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Contributing Author: Tyler Smith
 */
(function(a) {
    a.flexslider = function(c, b) {
        var d = a(c);
        a.data(c, "flexslider", d);
        d.init = function() {
            d.vars = a.extend({}, a.flexslider.defaults, b);
            a.data(c, "flexsliderInit", true);
            d.container = a(".slides", d).eq(0);
            d.slides = a(".slides:first > li", d);
            d.count = d.slides.length;
            d.animating = false;
            d.currentSlide = d.vars.slideToStart;
            d.animatingTo = d.currentSlide;
            d.atEnd = (d.currentSlide == 0) ? true : false;
            d.eventType = ("ontouchstart" in document.documentElement) ? "touchstart" : "click";
            d.cloneCount = 0;
            d.cloneOffset = 0;
            d.manualPause = false;
            d.vertical = (d.vars.slideDirection == "vertical");
            d.prop = (d.vertical) ? "top" : "marginLeft";
            d.args = {};
            d.transitions = "webkitTransition" in document.body.style && d.vars.useCSS;
            if (d.transitions) {
                d.prop = "-webkit-transform"
            }
            if (d.vars.controlsContainer != "") {
                d.controlsContainer = a(d.vars.controlsContainer).eq(a(".slides").index(d.container));
                d.containerExists = d.controlsContainer.length > 0
            }
            if (d.vars.manualControls != "") {
                d.manualControls = a(d.vars.manualControls, ((d.containerExists) ? d.controlsContainer : d));
                d.manualExists = d.manualControls.length > 0
            }
            if (d.vars.randomize) {
                d.slides.sort(function() {
                    return (Math.round(Math.random()) - 0.5)
                });
                d.container.empty().append(d.slides)
            }
            if (d.vars.animation.toLowerCase() == "slide") {
                if (d.transitions) {
                    d.setTransition(0)
                }
                d.css({
                    overflow: "hidden"
                });
                if (d.vars.animationLoop) {
                    d.cloneCount = 2;
                    d.cloneOffset = 1;
                    d.container.append(d.slides.filter(":first").clone().addClass("clone")).prepend(d.slides.filter(":last").clone().addClass("clone"))
                }
                d.newSlides = a(".slides:first > li", d);
                var m = (-1 * (d.currentSlide + d.cloneOffset));
                if (d.vertical) {
                    d.newSlides.css({
                        display: "block",
                        width: "100%",
                        "float": "left"
                    });
                    d.container.height((d.count + d.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function() {
                        d.css({
                            position: "relative"
                        }).height(d.slides.filter(":first").height());
                        d.args[d.prop] = (d.transitions) ? "translate3d(0," + m * d.height() + "px,0)" : m * d.height() + "px";
                        d.container.css(d.args)
                    }, 100)
                } else {
                    d.args[d.prop] = (d.transitions) ? "translate3d(" + m * d.width() + "px,0,0)" : m * d.width() + "px";
                    d.container.width((d.count + d.cloneCount) * 200 + "%").css(d.args);
                    setTimeout(function() {
                        d.newSlides.width(d.width()).css({
                            "float": "left",
                            display: "block"
                        })
                    }, 100)
                }
            } else {
                d.transitions = false;
                d.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%"
                }).eq(d.currentSlide).fadeIn(d.vars.animationDuration)
            } if (d.vars.controlNav) {
                if (d.manualExists) {
                    d.controlNav = d.manualControls
                } else {
                    var e = a('<ol class="flex-control-nav"></ol>');
                    var s = 1;
                    for (var t = 0; t < d.count; t++) {
                        e.append("<li><a>" + s + "</a></li>");
                        s++
                    }
                    if (d.containerExists) {
                        a(d.controlsContainer).append(e);
                        d.controlNav = a(".flex-control-nav li a", d.controlsContainer)
                    } else {
                        d.append(e);
                        d.controlNav = a(".flex-control-nav li a", d)
                    }
                }
                d.controlNav.eq(d.currentSlide).addClass("active");
                d.controlNav.bind(d.eventType, function(i) {
                    i.preventDefault();
                    if (!a(this).hasClass("active")) {
                        (d.controlNav.index(a(this)) > d.currentSlide) ? d.direction = "next" : d.direction = "prev";
                        d.flexAnimate(d.controlNav.index(a(this)), d.vars.pauseOnAction)
                    }
                })
            }
            if (d.vars.directionNav) {
                var v = a('<ul class="flex-direction-nav"><li><a class="prev" href="#">' + d.vars.prevText + '</a></li><li><a class="next" href="#">' + d.vars.nextText + "</a></li></ul>");
                if (d.containerExists) {
                    a(d.controlsContainer).append(v);
                    d.directionNav = a(".flex-direction-nav li a", d.controlsContainer)
                } else {
                    d.append(v);
                    d.directionNav = a(".flex-direction-nav li a", d)
                } if (!d.vars.animationLoop) {
                    if (d.currentSlide == 0) {
                        d.directionNav.filter(".prev").addClass("disabled")
                    } else {
                        if (d.currentSlide == d.count - 1) {
                            d.directionNav.filter(".next").addClass("disabled")
                        }
                    }
                }
                d.directionNav.bind(d.eventType, function(i) {
                    i.preventDefault();
                    var j = (a(this).hasClass("next")) ? d.getTarget("next") : d.getTarget("prev");
                    if (d.canAdvance(j)) {
                        d.flexAnimate(j, d.vars.pauseOnAction)
                    }
                })
            }
            if (d.vars.keyboardNav && a("ul.slides").length == 1) {
                function h(i) {
                    if (d.animating) {
                        return
                    } else {
                        if (i.keyCode != 39 && i.keyCode != 37) {
                            return
                        } else {
                            if (i.keyCode == 39) {
                                var j = d.getTarget("next")
                            } else {
                                if (i.keyCode == 37) {
                                    var j = d.getTarget("prev")
                                }
                            } if (d.canAdvance(j)) {
                                d.flexAnimate(j, d.vars.pauseOnAction)
                            }
                        }
                    }
                }
                a(document).bind("keyup", h)
            }
            if (d.vars.mousewheel) {
                d.mousewheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
                d.bind(d.mousewheelEvent, function(y) {
                    y.preventDefault();
                    y = y ? y : window.event;
                    var i = y.detail ? y.detail * -1 : y.originalEvent.wheelDelta / 40,
                        j = (i < 0) ? d.getTarget("next") : d.getTarget("prev");
                    if (d.canAdvance(j)) {
                        d.flexAnimate(j, d.vars.pauseOnAction)
                    }
                })
            }
            if (d.vars.slideshow) {
                if (d.vars.pauseOnHover && d.vars.slideshow) {
                    d.hover(function() {
                        d.pause()
                    }, function() {
                        if (!d.manualPause) {
                            d.resume()
                        }
                    })
                }
                d.animatedSlides = setInterval(d.animateSlides, d.vars.slideshowSpeed)
            }
            if (d.vars.pausePlay) {
                var q = a('<div class="flex-pauseplay"><span></span></div>');
                if (d.containerExists) {
                    d.controlsContainer.append(q);
                    d.pausePlay = a(".flex-pauseplay span", d.controlsContainer)
                } else {
                    d.append(q);
                    d.pausePlay = a(".flex-pauseplay span", d)
                }
                var n = (d.vars.slideshow) ? "pause" : "play";
                d.pausePlay.addClass(n).text((n == "pause") ? d.vars.pauseText : d.vars.playText);
                d.pausePlay.bind(d.eventType, function(i) {
                    i.preventDefault();
                    if (a(this).hasClass("pause")) {
                        d.pause();
                        d.manualPause = true
                    } else {
                        d.resume();
                        d.manualPause = false
                    }
                })
            }
            if ("ontouchstart" in document.documentElement && d.vars.touch) {
                var w, u, l, r, o, x, p = false;
                d.each(function() {
                    if ("ontouchstart" in document.documentElement) {
                        this.addEventListener("touchstart", g, false)
                    }
                });

                function g(i) {
                    if (d.animating) {
                        i.preventDefault()
                    } else {
                        if (i.touches.length == 1) {
                            d.pause();
                            r = (d.vertical) ? d.height() : d.width();
                            x = Number(new Date());
                            l = (d.vertical) ? (d.currentSlide + d.cloneOffset) * d.height() : (d.currentSlide + d.cloneOffset) * d.width();
                            w = (d.vertical) ? i.touches[0].pageY : i.touches[0].pageX;
                            u = (d.vertical) ? i.touches[0].pageX : i.touches[0].pageY;
                            d.setTransition(0);
                            this.addEventListener("touchmove", k, false);
                            this.addEventListener("touchend", f, false)
                        }
                    }
                }

                function k(i) {
                    o = (d.vertical) ? w - i.touches[0].pageY : w - i.touches[0].pageX;
                    p = (d.vertical) ? (Math.abs(o) < Math.abs(i.touches[0].pageX - u)) : (Math.abs(o) < Math.abs(i.touches[0].pageY - u));
                    if (!p) {
                        i.preventDefault();
                        if (d.vars.animation == "slide" && d.transitions) {
                            if (!d.vars.animationLoop) {
                                o = o / ((d.currentSlide == 0 && o < 0 || d.currentSlide == d.count - 1 && o > 0) ? (Math.abs(o) / r + 2) : 1)
                            }
                            d.args[d.prop] = (d.vertical) ? "translate3d(0," + (-l - o) + "px,0)" : "translate3d(" + (-l - o) + "px,0,0)";
                            d.container.css(d.args)
                        }
                    }
                }

                function f(j) {
                    d.animating = false;
                    if (d.animatingTo == d.currentSlide && !p && !(o == null)) {
                        var i = (o > 0) ? d.getTarget("next") : d.getTarget("prev");
                        if (d.canAdvance(i) && Number(new Date()) - x < 550 && Math.abs(o) > 20 || Math.abs(o) > r / 2) {
                            d.flexAnimate(i, d.vars.pauseOnAction)
                        } else {
                            if (d.vars.animation !== "fade") {
                                d.flexAnimate(d.currentSlide, d.vars.pauseOnAction)
                            }
                        }
                    }
                    this.removeEventListener("touchmove", k, false);
                    this.removeEventListener("touchend", f, false);
                    w = null;
                    u = null;
                    o = null;
                    l = null
                }
            }
            if (d.vars.animation.toLowerCase() == "slide") {
                a(window).resize(function() {
                    if (!d.animating && d.is(":visible")) {
                        if (d.vertical) {
                            d.height(d.slides.filter(":first").height());
                            d.args[d.prop] = (-1 * (d.currentSlide + d.cloneOffset)) * d.slides.filter(":first").height() + "px";
                            if (d.transitions) {
                                d.setTransition(0);
                                d.args[d.prop] = (d.vertical) ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)"
                            }
                            d.container.css(d.args)
                        } else {
                            d.newSlides.width(d.width());
                            d.args[d.prop] = (-1 * (d.currentSlide + d.cloneOffset)) * d.width() + "px";
                            if (d.transitions) {
                                d.setTransition(0);
                                d.args[d.prop] = (d.vertical) ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)"
                            }
                            d.container.css(d.args)
                        }
                    }
                })
            }
            d.vars.start(d)
        };
        d.flexAnimate = function(g, f) {
            if (!d.animating && d.is(":visible")) {
                d.animating = true;
                d.animatingTo = g;
                d.vars.before(d);
                if (f) {
                    d.pause()
                }
                if (d.vars.controlNav) {
                    d.controlNav.removeClass("active").eq(g).addClass("active")
                }
                d.atEnd = (g == 0 || g == d.count - 1) ? true : false;
                if (!d.vars.animationLoop && d.vars.directionNav) {
                    if (g == 0) {
                        d.directionNav.removeClass("disabled").filter(".prev").addClass("disabled")
                    } else {
                        if (g == d.count - 1) {
                            d.directionNav.removeClass("disabled").filter(".next").addClass("disabled")
                        } else {
                            d.directionNav.removeClass("disabled")
                        }
                    }
                }
                if (!d.vars.animationLoop && g == d.count - 1) {
                    d.pause();
                    d.vars.end(d)
                }
                if (d.vars.animation.toLowerCase() == "slide") {
                    var e = (d.vertical) ? d.slides.filter(":first").height() : d.slides.filter(":first").width();
                    if (d.currentSlide == 0 && g == d.count - 1 && d.vars.animationLoop && d.direction != "next") {
                        d.slideString = "0px"
                    } else {
                        if (d.currentSlide == d.count - 1 && g == 0 && d.vars.animationLoop && d.direction != "prev") {
                            d.slideString = (-1 * (d.count + 1)) * e + "px"
                        } else {
                            d.slideString = (-1 * (g + d.cloneOffset)) * e + "px"
                        }
                    }
                    d.args[d.prop] = d.slideString;
                    if (d.transitions) {
                        d.setTransition(d.vars.animationDuration);
                        d.args[d.prop] = (d.vertical) ? "translate3d(0," + d.slideString + ",0)" : "translate3d(" + d.slideString + ",0,0)";
                        d.container.css(d.args).one("webkitTransitionEnd transitionend", function() {
                            d.wrapup(e)
                        })
                    } else {
                        d.container.animate(d.args, d.vars.animationDuration, function() {
                            d.wrapup(e)
                        })
                    }
                } else {
                    d.slides.eq(d.currentSlide).fadeOut(d.vars.animationDuration);
                    d.slides.eq(g).fadeIn(d.vars.animationDuration, function() {
                        d.wrapup()
                    })
                }
            }
        };
        d.wrapup = function(e) {
            if (d.vars.animation == "slide") {
                if (d.currentSlide == 0 && d.animatingTo == d.count - 1 && d.vars.animationLoop) {
                    d.args[d.prop] = (-1 * d.count) * e + "px";
                    if (d.transitions) {
                        d.setTransition(0);
                        d.args[d.prop] = (d.vertical) ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)"
                    }
                    d.container.css(d.args)
                } else {
                    if (d.currentSlide == d.count - 1 && d.animatingTo == 0 && d.vars.animationLoop) {
                        d.args[d.prop] = -1 * e + "px";
                        if (d.transitions) {
                            d.setTransition(0);
                            d.args[d.prop] = (d.vertical) ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)"
                        }
                        d.container.css(d.args)
                    }
                }
            }
            d.animating = false;
            d.currentSlide = d.animatingTo;
            d.vars.after(d)
        };
        d.animateSlides = function() {
            if (!d.animating) {
                d.flexAnimate(d.getTarget("next"))
            }
        };
        d.pause = function() {
            clearInterval(d.animatedSlides);
            if (d.vars.pausePlay) {
                d.pausePlay.removeClass("pause").addClass("play").text(d.vars.playText)
            }
        };
        d.resume = function() {
            d.animatedSlides = setInterval(d.animateSlides, d.vars.slideshowSpeed);
            if (d.vars.pausePlay) {
                d.pausePlay.removeClass("play").addClass("pause").text(d.vars.pauseText)
            }
        };
        d.canAdvance = function(e) {
            if (!d.vars.animationLoop && d.atEnd) {
                if (d.currentSlide == 0 && e == d.count - 1 && d.direction != "next") {
                    return false
                } else {
                    if (d.currentSlide == d.count - 1 && e == 0 && d.direction == "next") {
                        return false
                    } else {
                        return true
                    }
                }
            } else {
                return true
            }
        };
        d.getTarget = function(e) {
            d.direction = e;
            if (e == "next") {
                return (d.currentSlide == d.count - 1) ? 0 : d.currentSlide + 1
            } else {
                return (d.currentSlide == 0) ? d.count - 1 : d.currentSlide - 1
            }
        };
        d.setTransition = function(e) {
            d.container.css({
                "-webkit-transition-duration": (e / 1000) + "s"
            })
        };
        d.init()
    };
    a.flexslider.defaults = {
        animation: "fade",
        slideDirection: "horizontal",
        slideshow: true,
        slideshowSpeed: 7000,
        animationDuration: 600,
        directionNav: true,
        controlNav: true,
        keyboardNav: true,
        mousewheel: false,
        prevText: "Previous",
        nextText: "Next",
        pausePlay: false,
        pauseText: "Pause",
        playText: "Play",
        randomize: false,
        slideToStart: 0,
        animationLoop: true,
        pauseOnAction: true,
        pauseOnHover: false,
        useCSS: true,
        touch: true,
        controlsContainer: "",
        manualControls: "",
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {}
    };
    a.fn.flexslider = function(b) {
        return this.each(function() {
            if (a(this).find(".slides > li").length == 1) {
                a(this).find(".slides > li").fadeIn(400)
            } else {
                if (a(this).data("flexsliderInit") != true) {
                    new a.flexslider(this, b)
                }
            }
        })
    }
})(jQuery);;
(function($) {
    $.fn.tweet = function(o) {
        var s = $.extend({
            username: null,
            list: null,
            favorites: false,
            query: null,
            avatar_size: null,
            count: 3,
            fetch: null,
            page: 1,
            retweets: true,
            intro_text: null,
            outro_text: null,
            join_text: null,
            auto_join_text_default: "i said,",
            auto_join_text_ed: "i",
            auto_join_text_ing: "i am",
            auto_join_text_reply: "i replied to",
            auto_join_text_url: "i was looking at",
            loading_text: null,
            refresh_interval: null,
            twitter_url: "twitter.com",
            twitter_api_url: "api.twitter.com",
            twitter_search_url: "search.twitter.com",
            template: "{avatar}{time}{join}{text}",
            comparator: function(tweet1, tweet2) {
                return tweet2["tweet_time"] - tweet1["tweet_time"];
            },
            filter: function(tweet) {
                return true;
            }
        }, o);
        var url_regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

        function t(template, info) {
            if (typeof template === "string") {
                var result = template;
                for (var key in info) {
                    var val = info[key];
                    result = result.replace(new RegExp('{' + key + '}', 'g'), val === null ? '' : val);
                }
                return result;
            } else return template(info);
        }
        $.extend({
            tweet: {
                t: t
            }
        });

        function replacer(regex, replacement) {
            return function() {
                var returning = [];
                this.each(function() {
                    returning.push(this.replace(regex, replacement));
                });
                return $(returning);
            };
        }
        $.fn.extend({
            linkUrl: replacer(url_regexp, function(match) {
                var url = (/^[a-z]+:/i).test(match) ? match : "http://" + match;
                return "<a href=\"" + url + "\">" + match + "</a>";
            }),
            linkUser: replacer(/@(\w+)/gi, "@<a href=\"http://" + s.twitter_url + "/$1\">$1</a>"),
            linkHash: replacer(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi, ' <a href="http://' + s.twitter_search_url + '/search?q=&tag=$1&lang=all' + ((s.username && s.username.length == 1) ? '&from=' + s.username.join("%2BOR%2B") : '') + '">#$1</a>'),
            capAwesome: replacer(/\b(awesome)\b/gi, '<span class="awesome">$1</span>'),
            capEpic: replacer(/\b(epic)\b/gi, '<span class="epic">$1</span>'),
            makeHeart: replacer(/(&lt;)+[3]/gi, "<tt class='heart'>&#x2665;</tt>")
        });

        function parse_date(date_str) {
            return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
        }

        function relative_time(date) {
            var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
            var delta = parseInt((relative_to.getTime() - date) / 1000, 10);
            var r = '';
            if (delta < 60) {
                r = delta + ' seconds ago';
            } else if (delta < 120) {
                r = 'a minute ago';
            } else if (delta < (45 * 60)) {
                r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
            } else if (delta < (2 * 60 * 60)) {
                r = 'an hour ago';
            } else if (delta < (24 * 60 * 60)) {
                r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
            } else if (delta < (48 * 60 * 60)) {
                r = 'a day ago';
            } else {
                r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
            }
            return 'about ' + r;
        }

        function build_auto_join_text(text) {
            if (text.match(/^(@([A-Za-z0-9-_]+)) .*/i)) {
                return s.auto_join_text_reply;
            } else if (text.match(url_regexp)) {
                return s.auto_join_text_url;
            } else if (text.match(/^((\w+ed)|just) .*/im)) {
                return s.auto_join_text_ed;
            } else if (text.match(/^(\w*ing) .*/i)) {
                return s.auto_join_text_ing;
            } else {
                return s.auto_join_text_default;
            }
        }

        function build_api_url() {
            var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
            var count = (s.fetch === null) ? s.count : s.fetch;
            if (s.list) {
                return proto + "//" + s.twitter_api_url + "/1/" + s.username[0] + "/lists/" + s.list + "/statuses.json?page=" + s.page + "&per_page=" + count + "&callback=?";
            } else if (s.favorites) {
                return proto + "//" + s.twitter_api_url + "/favorites/" + s.username[0] + ".json?page=" + s.page + "&count=" + count + "&callback=?";
            } else if (s.query === null && s.username.length == 1) {
                return proto + '//' + s.twitter_api_url + '/1/statuses/user_timeline.json?screen_name=' + s.username[0] + '&count=' + count + (s.retweets ? '&include_rts=1' : '') + '&page=' + s.page + '&callback=?';
            } else {
                var query = (s.query || 'from:' + s.username.join(' OR from:'));
                return proto + '//' + s.twitter_search_url + '/search.json?&q=' + encodeURIComponent(query) + '&rpp=' + count + '&page=' + s.page + '&callback=?';
            }
        }

        function extract_template_data(item) {
            var o = {};
            o.item = item;
            o.source = item.source;
            o.screen_name = item.from_user || item.user.screen_name;
            o.avatar_size = s.avatar_size;
            o.avatar_url = item.profile_image_url || item.user.profile_image_url;
            o.retweet = typeof(item.retweeted_status) != 'undefined';
            o.tweet_time = parse_date(item.created_at);
            o.join_text = s.join_text == "auto" ? build_auto_join_text(item.text) : s.join_text;
            o.tweet_id = item.id_str;
            o.twitter_base = "http://" + s.twitter_url + "/";
            o.user_url = o.twitter_base + o.screen_name;
            o.tweet_url = o.user_url + "/status/" + o.tweet_id;
            o.reply_url = o.twitter_base + "intent/tweet?in_reply_to=" + o.tweet_id;
            o.retweet_url = o.twitter_base + "intent/retweet?tweet_id=" + o.tweet_id;
            o.favorite_url = o.twitter_base + "intent/favorite?tweet_id=" + o.tweet_id;
            o.retweeted_screen_name = o.retweet && item.retweeted_status.user.screen_name;
            o.tweet_relative_time = relative_time(o.tweet_time);
            o.tweet_raw_text = o.retweet ? ('RT @' + o.retweeted_screen_name + ' ' + item.retweeted_status.text) : item.text;
            o.tweet_text = $([o.tweet_raw_text]).linkUrl().linkUser().linkHash()[0];
            o.tweet_text_fancy = $([o.tweet_text]).makeHeart().capAwesome().capEpic()[0];
            o.user = t('<a class="tweet_user" href="{user_url}">{screen_name}</a>', o);
            o.join = s.join_text ? t(' <span class="tweet_join">{join_text}</span> ', o) : ' ';
            o.avatar = o.avatar_size ? t('<a class="tweet_avatar" href="{user_url}"><img src="{avatar_url}" height="{avatar_size}" width="{avatar_size}" alt="{screen_name}\'s avatar" title="{screen_name}\'s avatar" border="0"/></a>', o) : '';
            o.time = t('<span class="tweet_time"><a href="{tweet_url}" title="view tweet on twitter">{tweet_relative_time}</a></span>', o);
            o.text = t('<span class="tweet_text">{tweet_text_fancy}</span>', o);
            o.reply_action = t('<a class="tweet_action tweet_reply" href="{reply_url}">reply</a>', o);
            o.retweet_action = t('<a class="tweet_action tweet_retweet" href="{retweet_url}">retweet</a>', o);
            o.favorite_action = t('<a class="tweet_action tweet_favorite" href="{favorite_url}">favorite</a>', o);
            return o;
        }
        return this.each(function(i, widget) {
            var list = $('<ul class="tweet_list">').appendTo(widget);
            var intro = '<p class="tweet_intro">' + s.intro_text + '</p>';
            var outro = '<p class="tweet_outro">' + s.outro_text + '</p>';
            var loading = $('<p class="loading">' + s.loading_text + '</p>');
            if (s.username && typeof(s.username) == "string") {
                s.username = [s.username];
            }
            if (s.loading_text) $(widget).append(loading);
            $(widget).bind("tweet:load", function() {
                $.getJSON(build_api_url(), function(data) {
                    if (s.loading_text) loading.remove();
                    if (s.intro_text) list.before(intro);
                    list.empty();
                    var tweets = $.map(data.results || data, extract_template_data);
                    tweets = $.grep(tweets, s.filter).sort(s.comparator).slice(0, s.count);
                    list.append($.map(tweets, function(o) {
                        return "<li>" + t(s.template, o) + "</li>";
                    }).join('')).children('li:first').addClass('tweet_first').end().children('li:odd').addClass('tweet_even').end().children('li:even').addClass('tweet_odd');
                    if (s.outro_text) list.after(outro);
                    $(widget).trigger("loaded").trigger((tweets.length === 0 ? "empty" : "full"));
                    if (s.refresh_interval) {
                        window.setTimeout(function() {
                            $(widget).trigger("tweet:load");
                        }, 1000 * s.refresh_interval);
                    }
                });
            }).trigger("tweet:load");
        });
    };
})(jQuery);;
(function($, window) {
    $.fn.lazyload = function(options) {
        var fixedOffset = function(e) {
            var result = $(e).offset();
            if (/; CPU.*OS (?:3_2|4_0)/i.test(navigator.userAgent) && 'getBoundingClientRect' in document.documentElement) {
                result.top -= window.scrollY;
                result.left -= window.scrollX;
            }
            return result;
        };
        var FALSE = !1,
            ORIGINAL = 'original',
            SRC = 'src',
            TRUE = !FALSE,
            elements = this,
            settings = {
                threshold: 0,
                container: window,
                effect: 'show',
                namespace: '.lazyload'
            };
        if (options) $.extend(settings, options);
        var container = $(settings.container),
            namespace = settings.namespace,
            APPEAR = 'appear' + namespace,
            RESIZE = 'resize' + namespace,
            SCROLL = 'scroll' + namespace;
        var isInViewport = function(element) {
            element = $(element);
            if (!element.length) return false;
            var threshold = settings.threshold,
                offset;
            if (container[0] === window) {
                var bottom = container.height() + container.scrollTop(),
                    left = container.scrollLeft(),
                    right = container.width() + container.scrollLeft(),
                    top = container.scrollTop();
            } else {
                offset = fixedOffset(container);
                var bottom = offset.top + container.height(),
                    left = offset.left,
                    right = offset.left + container.width(),
                    top = offset.top;
            }
            offset = fixedOffset(element);
            var elementBottom = offset.top + element.height(),
                elementLeft = offset.left,
                elementRight = offset.left + element.width(),
                elementTop = offset.top;
            return (elementTop + threshold) <= bottom && (elementLeft + threshold) <= right && (elementBottom - threshold) >= top && (elementRight - threshold) > left;
        };
        elements.each(function() {
            var e = this;
            if (isInViewport($(e)) && !$(e).attr(ORIGINAL)) {
                e.loaded = TRUE;
                return;
            }
            $(e).data(ORIGINAL, $(e).attr(ORIGINAL) || $(e).attr(SRC));
            if (!$(e).attr(SRC) || settings.placeholder === $(e).attr(SRC) || (!isInViewport($(e)))) {
                settings.placeholder ? $(e).attr(SRC, settings.placeholder) : $(e).removeAttr(SRC);
                e.loaded = FALSE;
            }
            $(e).one(APPEAR, function() {
                if (this.loaded) return;
                $("<img />").load(function() {
                    $(e).hide().attr(SRC, $(e).data(ORIGINAL))[settings.effect](settings.effectSpeed).removeData(ORIGINAL);
                    e.loaded = TRUE;
                }).attr(SRC, $(e).data(ORIGINAL));
            });
        });
        container.bind(SCROLL + ' ' + RESIZE, function() {
            var counter = 0;
            elements.each(function() {
                var e = this;
                if (isInViewport(e) && !e.loaded) $(e).trigger(APPEAR);
            });
            elements = $($.grep(elements, function(e) {
                return !e.loaded;
            }));
            if (!elements.length) container.unbind(namespace);
        }).trigger(SCROLL);
        return this;
    };
})(jQuery, window);;;
(function($) {
    var touchStopEvent, touchMoveEvent, touchStartEvent, horizontalDistanceThreshold = 30,
        verticalDistanceThreshold = 75,
        scrollSupressionThreshold = 10,
        durationThreshold = 1000;
    if ("ontouchend" in document) {
        touchStopEvent = "touchend.cj_swp";
        touchMoveEvent = "touchmove.cj_swp";
        touchStartEvent = "touchstart.cj_swp";
    } else {
        touchStopEvent = "mouseup.cj_swp";
        touchMoveEvent = "mousemove.cj_swp";
        touchStartEvent = "mousedown.cj_swp";
    }
    $.fn.touchSwipe = function(cb, prevent) {
        if (prevent) this.data("stopPropagation", true);
        if (cb) return this.each(swipeBoth, [cb]);
    }
    $.fn.touchSwipeLeft = function(cb, prevent) {
        if (prevent) this.data("stopPropagation", true);
        if (cb) return this.each(swipeLeft, [cb]);
    }
    $.fn.touchSwipeRight = function(cb, prevent) {
        if (prevent) this.data("stopPropagation", true);
        if (cb) return this.each(swipeRight, [cb]);
    }

    function swipeBoth(cb) {
        $(this).touchSwipeLeft(cb).touchSwipeRight(cb);
    }

    function swipeLeft(cb) {
        var $this = $(this);
        if (!$this.data("swipeLeft")) $this.data("swipeLeft", cb);
        if (!$this.data("swipeRight")) addSwipe($this);
    }

    function swipeRight(cb) {
        var $this = $(this);
        if (!$this.data("swipeRight")) $this.data("swipeRight", cb);
        if (!$this.data("swipeLeft")) addSwipe($this);
    }
    $.fn.unbindSwipeLeft = function() {
        this.removeData("swipeLeft");
        if (!this.data("swipeRight")) this.unbindSwipe(true);
    }
    $.fn.unbindSwipeRight = function() {
        this.removeData("swipeRight");
        if (!this.data("swipeLeft")) this.unbindSwipe(true);
    }
    $.fn.unbindSwipe = function(changeData) {
        if (!changeData) this.removeData("swipeLeft swipeRight stopPropagation");
        return this.unbind(touchStartEvent + " " + touchMoveEvent + " " + touchStopEvent);
    }

    function addSwipe($this) {
        $this.unbindSwipe(true).bind(touchStartEvent, touchStart);
    }

    function touchStart(event) {
        var time = new Date().getTime(),
            data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
            $this = $(this).bind(touchMoveEvent, moveHandler).one(touchStopEvent, touchEnded),
            pageX = data.pageX,
            pageY = data.pageY,
            newPageX, newPageY, newTime;
        if ($this.data("stopPropagation")) event.stopImmediatePropagation();

        function touchEnded(event) {
            $this.unbind(touchMoveEvent);
            if (time && newTime) {
                if (newTime - time < durationThreshold && Math.abs(pageX - newPageX) > horizontalDistanceThreshold && Math.abs(pageY - newPageY) < verticalDistanceThreshold) {
                    if (pageX > newPageX) {
                        if ($this.data("swipeLeft")) $this.data("swipeLeft")("left");
                    } else {
                        if ($this.data("swipeRight")) $this.data("swipeRight")("right");
                    }
                }
            }
            time = newTime = null;
        }

        function moveHandler(event) {
            if (time) {
                data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
                newTime = new Date().getTime();
                newPageX = data.pageX;
                newPageY = data.pageY;
                if (Math.abs(pageX - newPageX) > scrollSupressionThreshold) event.preventDefault();
            }
        }
    }
})(jQuery);;
(function($) {
    var $window = $(window);
    var windowHeight = $window.height();
    $window.resize(function() {
        windowHeight = $window.height();
    });
    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;

        function update() {
            $this.each(function() {
                firstTop = $this.offset().top;
            });
            if (outerHeight) {
                getHeight = function(jqo) {
                    return jqo.outerHeight(true);
                };
            } else {
                getHeight = function(jqo) {
                    return jqo.height();
                };
            }
            if (arguments.length < 1 || xpos === null) xpos = "50%";
            if (arguments.length < 2 || speedFactor === null) speedFactor = 0.5;
            if (arguments.length < 3 || outerHeight === null) outerHeight = true;
            var pos = $window.scrollTop();
            $this.each(function() {
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }
                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }
        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);;
$(document).ready(function() {
    var wh, scrollSpeed = 1000,
        parallaxSpeedFactor = 0.6,
        scrollEase = 'easeOutExpo',
        targetSection, sectionLink = 'a.navigateTo',
        menuLink = $('ul.navigation li a'),
        section = $('.section'),
        toggleMenu = $('.mobileMenuToggle'),
        foliothumb = $('.folio-thumb'),
        thumbW, thumbH, thumbCaption, target, hoverSpeed = 500,
        hoverEase = 'easeOutExpo';
    if (isMobile == true) {
        $('.header').addClass('mobileHeader');
        $('.header').clone().prependTo('.page');
        $('.page').each(function() {
            var curr_sec = $(this).attr('id');
            $(this).children('.header').children('.inner').children('.navigation').children('li').each(function() {
                if ($(this).children('a').attr('href').substring(1) == curr_sec) {
                    $(this).children('a').addClass('active');
                }
            });
        });
    } else {
        $('.page').addClass('desktop');
        $('.teaser').addClass('fixed');
    }
    $(window).bind('load', function() {
        parallaxInit();
    });

    function parallaxInit() {
        if (isMobile == true) return false;
        $('#teaser-1').parallax();
        $('#teaser-2').parallax();
        $('#teaser-3').parallax();
    }

    function sliderHeight() {
        wh = $(window).height();
        $('#homepage').css({
            height: wh
        });
    }
    sliderHeight();
    var lH = $('.logo-homepage').height();
    var lW = $('.logo-homepage').width();
    $('.logo-homepage').hover(function() {
        if (isMobile == true) return false;
        $(this).animate({
            width: lH + 50,
            height: lW + 50,
            marginLeft: -((lH + 50) / 2),
            marginTop: -((lW + 50) / 2)
        }, {
            queue: false
        });
    }, function() {
        if (isMobile == true) return false;
        $(this).animate({
            width: lH,
            height: lW,
            marginLeft: -lH / 2,
            marginTop: -lW / 2
        }, {
            queue: false
        });
    });
    $(document).on('click', sectionLink, function(event) {
        $.fn.epicSlider.killTimer();
        targetSection = $(this).attr('href');
        document.title = 'Preseed:' + (targetSection.replace(/[_\-\#\!\.\/]/g, ' '));
        var targetOffset = $(targetSection).offset().top + 1;
        $('html,body').animate({
            scrollTop: targetOffset
        }, scrollSpeed, scrollEase, function() {});
        return false;
    });
    $(function() {
        if (isMobile == true) return false;
        section.waypoint({
            handler: function(event, direction) {
                var activeSection = $(this);
                if (direction === "up") {
                    activeSection = activeSection.prev();
                }
                var activeMenuLink = $('ul.navigation li a[href=#' + activeSection.attr('id') + ']');
                menuLink.removeClass('active');
                activeMenuLink.addClass('active');
                var targetOffset = $(activeSection).offset().top;
                if (isMobile == true && $(window).scrollTop() >= wh) $('.header').css({
                    top: targetOffset,
                    display: 'none'
                }).fadeIn();
            },
            offset: '35%'
        });
    });
    $(window).bind('scroll', function() {
        headerReveal();
    });

    function headerReveal() {
        if (isMobile == true) return false;
        if ($(window).scrollTop() >= wh) {
            if (!$('.header').is(':animated')) {
                $('.header').stop(true, true).slideDown();
                if (isMobile != true) $('.epic-graphic, .epic-caption,#epic-navigation').css({
                    position: 'absolute'
                });
            }
        } else {
            if (!$('.header').is(':animated')) {
                $('.header').stop(true, true).slideUp();
                $('ul.navigation').fadeOut();
                toggleMenu.removeClass('open');
                if (isMobile != true) $('.epic-graphic, .epic-caption,#epic-navigation').css({
                    position: 'fixed'
                });
            }
        }
    }
    foliothumb.on({
        mouseenter: function() {
            if (isMobile == true) return false;
            thumbW = foliothumb.find('a').find('img').width();
            thumbH = foliothumb.find('a').find('img').height();
            thumbCaption = $(this).find('a').attr('title');
            if (!$(this).find('a').find('div').hasClass('folio-thumb-rollover')) $(this).find('a').append('<div class="folio-thumb-rollover"></div>');
            hoverScreen = $('.folio-thumb-rollover')
            hoverScreen.css({
                width: thumbW,
                height: thumbH
            });
            if (typeof thumbCaption !== 'undefined' && thumbCaption !== false && $(this).find(hoverScreen).is(':empty')) {
                $(this).find(hoverScreen).append('<div class="thumbInfo">' + thumbCaption + '</div>');
                target = $(this).find(hoverScreen);
                target.stop().animate({
                    opacity: 1
                }, hoverSpeed, hoverEase);
            }
        },
        mouseleave: function() {
            if (isMobile == true) return false;
            $(this).find(hoverScreen).animate({
                opacity: 0
            }, hoverSpeed, 'linear', function() {
                $(this).remove();
            });
        }
    });
    $(window).bind('resize', function() {
        sliderHeight();
    });
});;
jQuery(document).ready(function($) {
    $('.accordion > dd').hide();
    $('.accordion > dt').css({
        'border-bottom-left-radius': '3px',
        'border-bottom-right-radius': '3px',
        'margin-bottom': '3px'
    });
    $('.accordion > dt > a').click(function() {
        $(this).parent().parent().children('dd').slideUp();
        $(this).parent().parent().children('dt').removeClass('active');
        $(this).parent().parent().children('dt').css({
            'border-bottom-left-radius': '3px',
            'border-bottom-right-radius': '3px',
            'margin-bottom': '3px'
        });
        $(this).parent().parent().children('dt').find('a span').html('+');
        $(this).parent().animate({
            'border-bottom-left-radius': '0',
            'border-bottom-right-radius': '0',
            'margin-bottom': '0'
        });
        $(this).parent().addClass('active');
        $(this).parent().next().slideDown();
        $(this).children('span').html('&ndash;');
        return false;
    });
});
jQuery(document).ready(function($) {
    $('.tabs .tabs_content').hide();
    $('.tabs').each(function() {
        $(this).find('.tabs_content:first').show();
        $(this).find('.tabs_nav li:first').addClass('active');
        $(this).find('.tabs_nav li a').click(function() {
            $(this).parent().parent().children('li').removeClass('active');
            $(this).parent().addClass('active');
            $(this).parent().parent().parent().children('.tabs_content').hide();
            var currentTab = $(this).attr('data-label_ref');
            $(this).parent().parent().parent().children('.tabs_content').each(function() {
                if ($(this).data('label_ref') == currentTab) $(this).show();
            });
            return false;
        });
    });
});
jQuery(document).ready(function($) {
    $(".pricing_table .pricing_table_col > ul > li:has(span.price), .pricing_table .pricing_table_col > ul > li:has(a.submit)").addClass("pricing_table_bg");
});;
/*
jQuery Waypoints - v1.1.7
Copyright (c) 2011-2012 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt
*/
(function($, k, m, i, d) {
    var e = $(i),
        g = "waypoint.reached",
        b = function(o, n) {
            o.element.trigger(g, n);
            if (o.options.triggerOnce) {
                o.element[k]("destroy")
            }
        },
        h = function(p, o) {
            if (!o) {
                return -1
            }
            var n = o.waypoints.length - 1;
            while (n >= 0 && o.waypoints[n].element[0] !== p[0]) {
                n -= 1
            }
            return n
        },
        f = [],
        l = function(n) {
            $.extend(this, {
                element: $(n),
                oldScroll: 0,
                waypoints: [],
                didScroll: false,
                didResize: false,
                doScroll: $.proxy(function() {
                    var q = this.element.scrollTop(),
                        p = q > this.oldScroll,
                        s = this,
                        r = $.grep(this.waypoints, function(u, t) {
                            return p ? (u.offset > s.oldScroll && u.offset <= q) : (u.offset <= s.oldScroll && u.offset > q)
                        }),
                        o = r.length;
                    if (!this.oldScroll || !q) {
                        $[m]("refresh")
                    }
                    this.oldScroll = q;
                    if (!o) {
                        return
                    }
                    if (!p) {
                        r.reverse()
                    }
                    $.each(r, function(u, t) {
                        if (t.options.continuous || u === o - 1) {
                            b(t, [p ? "down" : "up"])
                        }
                    })
                }, this)
            });
            $(n).bind("scroll.waypoints", $.proxy(function() {
                if (!this.didScroll) {
                    this.didScroll = true;
                    i.setTimeout($.proxy(function() {
                        this.doScroll();
                        this.didScroll = false
                    }, this), $[m].settings.scrollThrottle)
                }
            }, this)).bind("resize.waypoints", $.proxy(function() {
                if (!this.didResize) {
                    this.didResize = true;
                    i.setTimeout($.proxy(function() {
                        $[m]("refresh");
                        this.didResize = false
                    }, this), $[m].settings.resizeThrottle)
                }
            }, this));
            e.load($.proxy(function() {
                this.doScroll()
            }, this))
        },
        j = function(n) {
            var o = null;
            $.each(f, function(p, q) {
                if (q.element[0] === n) {
                    o = q;
                    return false
                }
            });
            return o
        },
        c = {
            init: function(o, n) {
                this.each(function() {
                    var u = $.fn[k].defaults.context,
                        q, t = $(this);
                    if (n && n.context) {
                        u = n.context
                    }
                    if (!$.isWindow(u)) {
                        u = t.closest(u)[0]
                    }
                    q = j(u);
                    if (!q) {
                        q = new l(u);
                        f.push(q)
                    }
                    var p = h(t, q),
                        s = p < 0 ? $.fn[k].defaults : q.waypoints[p].options,
                        r = $.extend({}, s, n);
                    r.offset = r.offset === "bottom-in-view" ? function() {
                        var v = $.isWindow(u) ? $[m]("viewportHeight") : $(u).height();
                        return v - $(this).outerHeight()
                    } : r.offset;
                    if (p < 0) {
                        q.waypoints.push({
                            element: t,
                            offset: null,
                            options: r
                        })
                    } else {
                        q.waypoints[p].options = r
                    } if (o) {
                        t.bind(g, o)
                    }
                    if (n && n.handler) {
                        t.bind(g, n.handler)
                    }
                });
                $[m]("refresh");
                return this
            },
            remove: function() {
                return this.each(function(o, p) {
                    var n = $(p);
                    $.each(f, function(r, s) {
                        var q = h(n, s);
                        if (q >= 0) {
                            s.waypoints.splice(q, 1);
                            if (!s.waypoints.length) {
                                s.element.unbind("scroll.waypoints resize.waypoints");
                                f.splice(r, 1)
                            }
                        }
                    })
                })
            },
            destroy: function() {
                return this.unbind(g)[k]("remove")
            }
        },
        a = {
            refresh: function() {
                $.each(f, function(r, s) {
                    var q = $.isWindow(s.element[0]),
                        n = q ? 0 : s.element.offset().top,
                        p = q ? $[m]("viewportHeight") : s.element.height(),
                        o = q ? 0 : s.element.scrollTop();
                    $.each(s.waypoints, function(u, x) {
                        if (!x) {
                            return
                        }
                        var t = x.options.offset,
                            w = x.offset;
                        if (typeof x.options.offset === "function") {
                            t = x.options.offset.apply(x.element)
                        } else {
                            if (typeof x.options.offset === "string") {
                                var v = parseFloat(x.options.offset);
                                t = x.options.offset.indexOf("%") ? Math.ceil(p * (v / 100)) : v
                            }
                        }
                        x.offset = x.element.offset().top - n + o - t;
                        if (x.options.onlyOnScroll) {
                            return
                        }
                        if (w !== null && s.oldScroll > w && s.oldScroll <= x.offset) {
                            b(x, ["up"])
                        } else {
                            if (w !== null && s.oldScroll < w && s.oldScroll >= x.offset) {
                                b(x, ["down"])
                            } else {
                                if (!w && s.element.scrollTop() > x.offset) {
                                    b(x, ["down"])
                                }
                            }
                        }
                    });
                    s.waypoints.sort(function(u, t) {
                        return u.offset - t.offset
                    })
                })
            },
            viewportHeight: function() {
                return (i.innerHeight ? i.innerHeight : e.height())
            },
            aggregate: function() {
                var n = $();
                $.each(f, function(o, p) {
                    $.each(p.waypoints, function(q, r) {
                        n = n.add(r.element)
                    })
                });
                return n
            }
        };
    $.fn[k] = function(n) {
        if (c[n]) {
            return c[n].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof n === "function" || !n) {
                return c.init.apply(this, arguments)
            } else {
                if (typeof n === "object") {
                    return c.init.apply(this, [null, n])
                } else {
                    $.error("Method " + n + " does not exist on jQuery " + k)
                }
            }
        }
    };
    $.fn[k].defaults = {
        continuous: true,
        offset: 0,
        triggerOnce: false,
        context: i
    };
    $[m] = function(n) {
        if (a[n]) {
            return a[n].apply(this)
        } else {
            return a.aggregate()
        }
    };
    $[m].settings = {
        resizeThrottle: 200,
        scrollThrottle: 100
    };
    e.load(function() {
        $[m]("refresh")
    })
})(jQuery, "waypoint", "waypoints", window);

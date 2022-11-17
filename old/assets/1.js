$(document).ready(function() {
    function o(o) {
        var t, i = 50,
            l = 500;
        if ("string" === jQuery.type(o)) {
            t = $("#" + o).offset().top - i;
            var n = window.scrollY;
            location.hash = o, window.scroll(0, n)
        } else t = "number" === jQuery.type(o) ? o : $(o).offset().top - i;
        e.bind("scroll DOMMouseScroll mousewheel", function(o) {
            (o.which > 0 || "mousewheel" === o.type) && e.stop().unbind("scroll DOMMouseScroll mousewheel")
        }), e.animate({
            scrollTop: t
        }, l, function() {
            e.unbind("scroll DOMMouseScroll mousewheel")
        })
    }
    var t = $("body"),
        e = $("html, body");
    t.removeClass("nojs"), $(".main article, .txt").each(function() {
        $(this).html(typogr.typogrify($(this).html()))
    }), $("img").unveil();
    var i = $(".stick, .toc");
    i.stick_in_parent({
        offset_top: 26
    }), $(window).load(function() {
        var o = {},
            t = .75 * $(window).height(),
            e = 0;
        $("h3[id], h4[id]").each(function() {
            o[this.id] = $(this).offset().top
        }), $(document).scroll(function() {
            var i = $(this),
                l = i.scrollTop();
            for (e in o) {
                if (50 > l) {
                    $(".toc li").removeClass("active");
                    break
                }
                if (o[e] > l && o[e] < l + t) {
                    $(".toc li").removeClass("active"), $(".toc a[href^='#" + e + "']").parent().addClass("active");
                    break
                }
            }
        })
    }), t.on("click", "a[href^='#']", function(t) {
        t.preventDefault();
        var e = this.href.split("#")[1],
            i = window.scrollY;
        location.hash = "", window.scroll(0, i), o(e)
    })
}),
function() {}.call(this);

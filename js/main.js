///menu layer
var _from = {left: -300, opacity: 0};
var _mid = {left: 'inherit', right: -300};
var _to = {right: -6, opacity: 1};

var _from2 = {right: -300, opacity: 0};
var _mid2 = {right: 'inherit', left: -300};
var _to2 = {left: 0, opacity: 1};

function matrixToArray(str) {
    return str.split('(')[1].split(')')[0].split(',');
}

function resize() {
    scrollRefresh();
    if ($(window).innerWidth() >= 1080) {
        $('#pagecontent').css({
            width: $(window).innerWidth() - $('#tools').outerWidth(),
            height: $(window).innerHeight() - $('#header').outerHeight() - $('#menu').outerHeight()
        });
    }
}

function changeCursor(event, $selected_tool) {
    var $self = $('#cursor');
    var _classes = [
        'pen',
        'eraser',
        'highlighter',
        'mask',
        'spotlight'
    ];


    if ($selected_tool.hasClass('btn-pen') ||
            $selected_tool.hasClass('btn-eraser') ||
            $selected_tool.hasClass('btn-highlighter') ||
            $selected_tool.hasClass('btn-mask') ||
            $selected_tool.hasClass('btn-spotlight')) {

        $self.css({
            display: 'block',
            //this works
            left: (event.clientX - 5 + $self.width() / 3),
            top: (event.clientY - 5 - $self.height()),
            //does not work to move the logo over the cursor. you can not put the icon (even non-visible corners) under the cursor, or it will eat the clicks. Could possibly do the pointer-events: none; thing.
            //also, the area the eraser erases is up and right, where the logo is naturally.
            background: $selected_tool.css('background-image') + ' no-repeat right bottom'
        }).attr('class', $selected_tool.attr('alt').toLowerCase());

    }

    $.each(_classes, function(i, v) {
        $('body').removeClass(v);
    });
    $('body').addClass($selected_tool.attr('alt').toLowerCase());

}

function scrollRefresh() {

    var _height = $('.tab-show .scroll-pane').height() + $('.tab-show .pages-tabs-scroller').height();

    if (_height > $('.tab-show').height()) {
        $('.tab-show').find('.scroll-pane').height(function() {
            return $(this).parent().height() - $(this).parents('.tab-container').find('.pages-tab-footer').height() - $(this).parent().find('.pages-tabs-scroller').height();
        });
    }

}

function timer() {
    $('#minusSec').trigger('click');
}

function changeMenu(obj) {
    var $parent = obj.parents('.panel');
    $parent.find('.tab').removeClass('tab-show');
    $parent.find('.tab[id="' + obj.attr('data-target') + '"]').addClass('tab-show');
    $parent.find('.selected').text(obj.text());
}

function swapSide() {

    $('.btn-swap').unbind();

    //right handed
    if ($('body').is('.left-handed')) {
        //if lefthanded 
        var _tools_were = (parseInt($('#tools').css('right')) == 0) ? true : false;

        $('.swappable').transition({
            right: -500,
            opacity: 0
        }).promise().done(function() {

            $('.swappable').css({
                left: -500,
                right: 'inherit'
            });

            $('body').removeClass('left-handed');

            //.tools-container
            if (parseInt($('.tools-container').css('right')) == 0) {
                $('.tools-container').css({
                    left: 0, right: 'inherit'
                });
            }
            else {
                $('.tools-container').css({
                    left: -500, right: 'inherit'
                });
            }

            //.tools-container container
            if (_tools_were) {
                $('#menu, #tools').transition({left: 0, opacity: 1});
                $('#ebookselectorwrapper').transition({
                }, function() {
                    $('.btn-swap').bind('mouseup', function() {
                        swapSide();
                    });
                });
            }
            else {
                $('#pages').transition({
                    left: 0, opacity: 1
                }, function() {
                    $('.btn-swap').bind('mouseup', function() {
                        swapSide();
                    });
                });
            }

            return false;

        });
    }
    else {
        //else righthanded
        //check if pages or tools is showing
        var _tools_were = (parseInt($('#tools').css('left')) == 0) ? true : false;

        $('.swappable').transition({
            left: -500,
            opacity: 0
        }).promise().done(function() {

            $('.swappable').css({
                right: -500,
                left: 'inherit'
            });

            $('body').addClass('left-handed');

            //.tools-container
            if (parseInt($('.tools-container').css('left')) == 0) {
                $('.tools-container').css({
                    right: 0, left: 'inherit'
                });
            }
            else {
                $('.tools-container').css({
                    right: -500, left: 'inherit'
                });
            }

            //contains .tools-container
            if (_tools_were) {
                $('#menu,#tools').transition({right: 0, opacity: 1});
                $('#ebookselectorwrapper').transition({
                }, function() {
                    $('.btn-swap').bind('mouseup', function() {
                        swapSide();
                    });
                });
            }
            else {
                $('#pages').transition({
                    right: 0, opacity: 1
                }, function() {
                    $('.btn-swap').bind('mouseup', function() {
                        swapSide();
                    });
                });
            }

            return false;

        });

    }

}

function menuShow() {
    $('.flip-overlay, #pages').fadeIn();
}

function menuHide() {

    if ($('body').is('.left-handed')) {
        if (parseInt($('#pages').css('right')) == 0) {
            $('.swappable').transition({
                right: -500,
                opacity: 0
            }).promise().done(function() {
                $('#tools, #menu').transition({
                    right: 0,
                    opacity: 1
                });
            });
        }
    }
    else {
        if (parseInt($('#pages').css('left')) == 0) {
            $('.swappable').transition({
                left: -500,
                opacity: 0
            }).promise().done(function() {
                $('#tools, #menu').transition({
                    left: 0,
                    opacity: 1
                });
            });
        }

    }
}

function closeModals(type) {
    if ($(".ui-dialog").is(":visible")) {
        if (type == "page") {	// close all dialog modals on page transitions
            $(".ui-dialog-content").dialog("close");
        }
        else {					// close all modals except for notes on EPV transitions
            $(".ui-dialog-content").not("#dialog-note").not("#dialog-timer").not('#dialog-audiop').dialog("close");
        }
    }
}

function rePositionModals() {
    if ($(".ui-dialog").is(":visible") && !$(".ui-dialog").hasClass("dialog-help-dialog")) {
        if ($('body').is('.left-handed')) {
            $(".ui-dialog").position({
                my: "right-70 bottom-20", at: "right top", of: $('#menu')
            });
        }
        else {
            $(".ui-dialog").position({
                my: "left+70 bottom-20", at: "left top", of: $('#menu')
            });
        }
    }
}

function resizeIframe(height, width) {
    $('iframe#iFrame-rcf').height(height);
    $('iframe#iFrame-rcf').width(width);
}

$(document).keydown(function(e) {
    switch (e.which) {
        case 37: // left
            e.preventDefault();
            $('a.btn.btn-left.pageloader').trigger('click');
            break;

        case 39: // right
            e.preventDefault();
            $('a.btn.btn-right.pageloader').trigger('click');
            break;

        default:
            return;
    }
});

function _attach_audio_pause_event(){
    $.jPlayer.event.pause, function(){
        $('#audioPlayer').attr('started-playing',false);
    }
}

function mainjs() {
    $(document).ready(function() {

        $('a.app-close').on('click', function() {
            TITLEMANAGER.content.quitContentExitFullscreen();
        });

        $('#pagecontent').css({
            width: $(window).innerWidth() - $('#tools').outerWidth(),
            height: $(window).innerHeight() - $('#header').outerHeight() - $('#menu').outerHeight()
        });

        _bg_initial_height = parseInt($('#dumbBg').css('height'));

        //scroll up and down the pages
//    $('.pages-tab-scrolltop').bind('mouseup', function() {
//        scrollUpDown('up', $(this));
//    });
//    $('.pages-tab-scrollbottom').bind('mouseup', function() {
//        scrollUpDown('down', $(this));
//    });

        //timer
        var _timer_int;

        //reload the ticking sound effect
        //resume / pause timer
        $('#startTimer').click(function() {
            if (!$(this).is('.pause-timer')) {

                if (parseInt($('#timerSec').val()) < 11 && parseInt($('#timerMin').val()) == 0) {
                    $('#invisibleAudioPlayer').jPlayer('play');
                }

                $(this).text('pause');
                //head start?
                _timer_int = setInterval(function() {
                    timer();
                }, 1000);
                $('#startTimer').addClass('pause-timer');
                $(this).parents('.ui-dialog').addClass('going');
            }
            else {
                $(this).text('resume');
                $('#invisibleAudioPlayer').jPlayer('stop');
                clearInterval(_timer_int);
                $('#startTimer').removeClass('pause-timer');
                $(this).parents('.ui-dialog').removeClass('going').removeClass('pulsate');
            }
        });
        //timer add button
        $('#addMin, #addSec').mouseup(function() {

            var _is_min = $(this).is('#addMin') ? true : false;
            var _current_val = parseInt((_is_min) ? $('#timerMin').val() : $('#timerSec').val());

            var _added_val = _current_val + (($(this).is('#addSec')) ? 5 : 1);

            if (!_is_min && _added_val >= 60) {
                $('#addMin').trigger('mouseup');
                if ((_added_val - 60) < 10) {
                    $('#timerSec').val('0' + (_added_val - 60));
                }
                else {
                    $('#timerSec').val(_added_val - 60);
                }
            }
            else {
                if (_added_val < 10) {
                    //append the 0
                    (_is_min) ? $('#timerMin').val('0' + _added_val) : $('#timerSec').val('0' + _added_val);
                }
                else {
                    (_is_min) ? $('#timerMin').val(_added_val) : $('#timerSec').val(_added_val);
                }
            }
        });
        $('#timerSec').keyup(function() {
            $(this).attr('data-egg', parseInt($(this).val()));
        });
        $('#addSec').mouseup(function() {
            $('#timerSec').attr('data-egg', parseInt($('#timerSec').val()));
        });
        //timer minus button
        $('#minusSec').click(function() {

            var _current_min = parseInt($('#timerMin').val());
            var _current_sec = parseInt($('#timerSec').val());

            if (_current_sec > 0) {
                $('#timerSec').val(_current_sec - 1);
                if ($('#timerSec').val() < 10) {
                    $('#timerSec').val('0' + $('#timerSec').val());
                }
            }
            else {
                if (_current_min == 0 && _current_sec == 0) {

                    $('.bigger-timer').removeClass('going').removeClass('pulsate');
                    $('#refreshTimer').trigger('mouseup');
                    $('.bigger-timer').removeClass('going').removeClass('pulsate');
                    _timer_int = 0;
                }
                else {
                    $('#timerSec').val(59);
                    $('#timerMin').val(parseInt($('#timerMin').val()) - 1);
                    if ($('#timerMin').val() < 10) {
                        $('#timerMin').val('0' + $('#timerMin').val());
                    }
                }
            }

            if (parseInt($('#timerMin').val()) == 0 && parseInt($('#timerSec').val()) == 0) {
                $('.bigger-timer').removeClass('pulsate');
            }
            else if (parseInt($('#timerMin').val()) == 0 && parseInt($('#timerSec').val()) < 11) {
                $('.bigger-timer').addClass('pulsate');
            }

            //cancels out the 1sec delay
            if (parseInt($('#timerSec').val()) <= 0 && parseInt($('#timerSec').val()) < 2) {
                $('#invisibleAlertPlayer').jPlayer('play');
                $('#invisibleAudioPlayer').jPlayer('stop');
            }
            else if (parseInt($('#timerSec').val()) < 11 && parseInt($('#timerMin').val()) < 1) {
                $('#invisibleAudioPlayer').jPlayer('play');
            }

        });
        $('#minusMin').mouseup(function() {

            var _is_min = $(this).is('#minusMin') ? true : false;
            var _current_val = parseInt(((_is_min) ? $('#timerMin').val() : $('#timerSec').val()));

            var _added_val = _current_val - 1;

            if (!_is_min && _added_val == -1 && parseInt($('#timerMin').val()) != 0) {
                $('#minusMin').trigger('mouseup');
                $('#timerSec').val('59');
            }
            else {
                if (_added_val < 10 && _added_val >= 0) {
                    //append the 0
                    (_is_min ? $('#timerMin') : $('#timerSec')).val('0' + _added_val);
                }
                else if (_added_val > -1) {
                    (_is_min ? $('#timerMin') : $('#timerSec')).val(_added_val);
                }
            }

        });
        //timer refresh
        $('#refreshTimer').mouseup(function() {
            clearInterval(_timer_int);
            $('#startTimer').removeClass('pause-timer');
            $('.bigger-timer').removeClass('going').removeClass('pulsate');
            $('#timerMin, #timerSec').val('00');
            $('#invisibleAudioPlayer').jPlayer('pause');
        });
        //timer close and pause
        $('#closeTimer').mouseup(function() {
            clearInterval(_timer_int);
            $('#invisibleAudioPlayer').jPlayer('pause');
            $('#startTimer').removeClass('pause-timer');
            $('#dialog-timer').dialog('close');
        });


        //toggle btn
        $('.btn-toggle .btn').mouseup(function() {
            $(this).parents('.btn-toggle').find('.btn').removeClass('btn-active');
            $(this).addClass('btn-active');
        });

        $('.tools-container-2 .btn:not(".btn-header")').mouseup(function(e) {
            drawoff();
            $('.tools-container-2 .btn').removeClass('current');
            $(this).addClass('current');

        });

        $('#hslPicker').ColorPickerSliders({
            color: 'rgb(249,243,25)',
            flat: true,
            connectedinput: '#hslColor',
            previewformat: 'rgb',
            swatches: ['#f2ee5f', '#54b947', '#2a8ccc', '#f89f46'],
            order: {
                hsl: 1
            },
            onchange: function(container, color) {
                $('#hslPicker').addClass('val-changed');
                $('.btn-highlighter .show-options-tip').trigger('click');
            }
        }).trigger("colorpickersliders.updateColor", '#f2ee5f');
        //does nothing if not visible
        $('.btn-highlighter').toggleClass('show-options');

        //pages
        $('#pages .expand').mouseup(function() {
            $(this).toggleClass('expand').toggleClass('minimize');
            $(this).parent().find('.sub-page').slideToggle();
        });
        $('.sub-page a').mouseup(function() {
            $('.sub-page a').removeClass('current');
            $(this).addClass('current');
        });

        $('.pages-tab-menu').on('mouseup', 'a', function() {
            var $self = $(this);
            if ($(this).is('.btn-shown')) {
                menuHide();
            }
            $(this).closest('.pages-tab-menu').find('a.btn-shown').removeClass('btn-shown');
            $(this).addClass('btn-shown');
            $(this).closest('.tab-container').find('.tab:not(#' + $(this).attr('data-target') + ')').removeClass('tab-show').fadeOut(function() {
                $self.closest('.tab-container').find('.tab#' + $self.attr('data-target')).fadeIn(function() {
                    scrollRefresh();
                }).addClass('tab-show');
            });
        });

        $('.btn-menu').mouseup(function() {
            drawoff();//deselects other tools
            menuShow();
        });

        $('#data').mouseup(function() {
            menuHide();
        });

        $('*[data-dialog="true"]').click(function() {
            generic_dialog_open($(this));
        });

        //tools and menu animation
        $('.btn-swap').bind('mouseup', function() {
            swapSide();
        });

        //tools toggle
        $('.btn-header').mouseup(function() {
            $('#tools').toggleClass('shown');
            if ($('body').is('.left-handed')) {
                $('.tools-container').css('left', 'inherit');
                if (parseInt($('.tools-container').css('right')) == 0) {
                    $('.tools-container').transition({right: -500});
                    $('#dumbBg').transition({height: _bg_initial_height});
                    $('#ribbon').transition({height: 0});
                }
                else {
                    $('.tools-container').transition({right: 0});
                    $('#dumbBg').transition({height: _bg_initial_height + $('.tools-container').outerHeight(true)});
                    $('#ribbon').transition({height: '100%'});
                }
            }
            else {
                $('.tools-container').css('right', 'inherit');
                if (parseInt($('.tools-container').css('left')) == 0) {
                    $('.tools-container').transition({left: -500});
                    $('#dumbBg').transition({height: _bg_initial_height});
                    $('#ribbon').transition({height: 0});
                }
                else {
                    $('.tools-container').transition({left: 0});
                    $('#dumbBg').transition({height: _bg_initial_height + $('.tools-container').outerHeight(true)});
                    $('#ribbon').transition({height: '100%'});
                }
            }
        });

        resize();
        $(window).resize(function(e) {
            if (!$(e.target).hasClass('ui-resizable')) {
                resize();
                rePositionModals();
                //they should not be zoomed in, or the offset thing will explode
                offset = null;
                zoom_reset();
                if (hotMode) {
                    drawHotspot($('#canvasDiv').width(), $('#canvasDiv').height(), curpg);
                }
            }
        });

        // handler to set initial iframe src natural width/height:
        $('iframe#iFrame-rcf').bind('iframeResize', function(event, width) {
            // first set width:
            $.when($(this).width(width)).done(function() {
                // then set height:
                if ($(this).contents().find('body').height() > $('div#pagecontent').height()) {
                    $(this).height($('div#pagecontent').height() * .9);
                }
                else {
                    $(this).height($(this).contents().find('body').height());
                }
            });
        });

        $('iframe#iFrame-rcf-k').bind('iframe-kResize', function(event, width) {
            // first set width:
            $.when($(this).width(width)).done(function() {
                // then set height:
                if ($(this).contents().find('.activityContainer').height() > $('div#pagecontent').height()) {
                    $(this).height($('div#pagecontent').height() * .9);
                }
                else {
                    $(this).height($(this).contents().find('.activityContainer').height());
                }
            });
        });
    });

    function hotspotReset() {

        var c = document.getElementById('hotspotCanvas');
        var context = c.getContext('2d');
        context.clearRect(0, 0, c.width, c.height);
        hotMode = false;

    }

//Global:
    snippetID = null;

//draw layer
    var sppen, ns;
    hotMode = false;

    function drawoff() {
        //http://stackoverflow.com/questions/6861430/is-it-possible-to-let-mouse-events-pass-through-a-canvas-layer
        $('#canvasDiv').css("pointer-events", "none");
        painting = false;

        $(window).unbind('mousemove');//changeCursor
        $('#cursor').fadeOut();

        ns.editing(false);

    }
    function drawon() {
        ns.editing(true);
        ns.mode(0);
        sppen.scale(scale);

        $('#canvasDiv').css("pointer-events", "inherit");

        $(window).bind('mousemove', function(e) {
            changeCursor(e, $('.tools-container-2 .current'));
        });

    }
    function pen(color, size) {
        sppen.color(color);
        sppen.width(size);
        sppen.opacity(1);
    }
    function eraser() {
        ns.editing("erase");

    }
    function highlight(rgb, a) {
        sppen.color(rgb);
        //sppen.color('#000');
        sppen.opacity(a);
        sppen.width(12);
    }
    function mask() {
        //tricky: block out everything else, then remove the block
        sppen.color('#000');
        sppen.width(1);
        ns.mode(1);//needs to after the drawon, so it puts in the draggables
    }
    function spotlight() {
        //trickier: highlight
        sppen.color('#000');
        sppen.width(1);
        ns.mode(2);
    }

    function eraser_all() {
        ns.clear();
    }

    function ORIG_generic_dialog_open($self) {

        if ($('#dialog-extend-fixed-container .ui-dialog').hasClass($self.attr('data-target') + '-dialog')) {
            $('#dialog-extend-fixed-container .ui-dialog.' + $self.attr('data-target') + '-dialog').find('.ui-dialog-titlebar-restore').trigger('click');
        }
        else {
            var _is_audio_playing = false;
            var _did_audio_reach_end = false;
            $('.dialog#' + $self.attr('data-target')).dialog({
                title: $self.attr('data-dialog-title'),
                dialogClass: ($self.attr('data-class')) ? $self.attr('data-class') : $self.attr('data-target') + '-dialog',
                width: ($self.attr('data-dialog-width')) ? $self.attr('data-dialog-width') + 'px' : 'auto', //is tiny without this,
                height: ($self.attr('data-dialog-height')) ? $self.attr('data-dialog-height') + 'px' : 'auto', //is tiny without this
                modal: (parseInt($self.attr('data-dialog-modal')) == 1) ? true : false,
                position: ((($self.attr('data-target') == 'dialog-interactive') || ($self.attr('data-target') == 'dialog-karaoke') || ($self.attr('data-target') == 'dialog-help') || ($self.attr('data-target') == 'dialog-teacher-tips')) ? {my: "center", at: "center", of: window} : (($('body').is('.left-handed')) ? {my: "right-70 bottom-20", at: "right top", of: $('#menu')} : {my: "left+70 bottom-20", at: "left top", of: $('#menu')})),
                resizable: ($self.attr('data-dialog-resizable') ? true : false),
                dragStart:function(e,ui){
                	if(typeof $('#audioPlayer').data().jPlayer !== 'undefined') {
						_is_audio_playing = $('#audioPlayer').attr('started-playing');
						_did_audio_reach_end = ($('#audioPlayer').data().jPlayer.status.currentTime == $('#audioPlayer').data().jPlayer.status.duration)?true:false;
                    }
                },
                drag:function(){
                    if(typeof $('#audioPlayer').data().jPlayer !== 'undefined' && _is_audio_playing == 'true' && !_did_audio_reach_end){
                        $('#audioPlayer').jPlayer('play');
                    }
                },
                open: function(e, ui) {
                    // set iframe size for interactive activities:
                    if ($self.attr('data-target') == 'dialog-interactive') {
                        $.when($('iframe#iFrame-rcf').width($('iframe#iFrame-rcf').contents().find('.activityContainer').css('max-width'))).done(function() {
                            if ($('iframe#iFrame-rcf').contents().find('body').height() > $('div#pagecontent').height()) {
                                $('iframe#iFrame-rcf').height($('div#pagecontent').height() * .9);
                                //$(this).dialog({height: $('div#pagecontent').height() * .9});
                            }
                            else {
                                $('iframe#iFrame-rcf').height($('iframe#iFrame-rcf').contents().find('body').height());
                                //$(this).dialog({height: $('iframe#iFrame-rcf').contents().find('body').height()});
                            }
                        });
                    }
                    else if ($self.attr('data-target') == 'dialog-karaoke') {
                        $.when($('iframe#iFrame-rcf-k').width($('iframe#iFrame-rcf-k').contents().find('.activityContainer').css('max-width'))).done(function() {
                            if ($('iframe#iFrame-rcf-k').contents().find('.activityContainer').height() > $('div#pagecontent').height()) {
                                $('iframe#iFrame-rcf-k').height($('div#pagecontent').height() * .9);
                                //$(this).dialog({height: $('div#pagecontent').height() * .9});
                            }
                            else {
                                $('iframe#iFrame-rcf-k').height($('iframe#iFrame-rcf-k').contents().find('.activityContainer').height());
                                //$(this).dialog({height: $('iframe#iFrame-rcf-k').contents().find('.activityContainer').height()});
                            }
                        });
                    }
                    else if ($self.attr('data-target') == 'dialog-answers') {
                        $('.btn-num').text('1st');
                        
                        $(this).css('max-height', $('div#pagecontent').height());
                        //$(this).find('form#answersForm').css('height', $('div#pagecontent').height() - 70).css('overflow', 'auto');
                        
//                        $(this).width(function(){
//                            return $('form .col-md-1').outerWidth(true) + $('form .form-input').outerWidth(true);
//                        });
//                        $('form .form-input input').css({
//                            'width':$('form .form-input').outerWidth(true) - ($('form span.col-md-1').outerWidth(true))
//                        });
                    }
                    else if ($self.attr('data-target') == 'dialog-note') {

                        //get the old note saved in memory
                        _old_note = $('#user_notes').text();

                        if ($self.hasClass('has-data')) {
                            $('textarea#user_notes_txtarea').hide();
                            $('div#user_notes').show();
                            $('button.save-data').hide();
                            $('button.edit-data').show();
                        }
                        else {
                            $('button.edit-data').trigger('click');
                        }
                    }
                    else if ($self.attr('data-target') == 'dialog-help') {
                        $('iframe#iFrame-help').height($('div#pagecontent').height() * .95);
                        $('iframe#iFrame-help').width($self.attr('data-dialog-width'));
                    }
                    else if ($self.attr('data-target') == 'dialog-teacher-tips') {
                        $(this).css('max-height', $('div#pagecontent').height()).css('overflow', 'auto');
                    }
                    else if ($self.attr('data-target') == 'dialog-image') {
                        $(this).css('max-height', $('div#pagecontent').height()).css('overflow', 'auto');
                    }
                    else if($self.attr('data-target') == 'dialog-timer') {
	                    $('#invisibleAudioPlayer').jPlayer({
	                        ready: function() {
	                            $(this).jPlayer('setMedia', {
	                                mp3: 'sound/tick.mp3'
	                            });
	                        },
	                        preload: 'auto',
	                        swfPath: './js/jPlayer',
	                        supplied: 'mp3',
	                        loop: true
	                    });
	                    $('#invisibleAlertPlayer').jPlayer({
	                        ready: function() {
	                            $(this).jPlayer('setMedia', {
	                                mp3: 'sound/alert.mp3'
	                            });
	                        },
	                        preload: 'auto',
	                        swfPath: './js/jPlayer',
	                        supplied: 'mp3',
	                        loop: false
	                    });
                    }
                },
                resize: function(e, ui) {
                    if ($(this).is('#dialog-note')) {
                        $('#user_notes_txtarea, #user_notes').css({
                            'width': ui.size.width - parseInt($('#dialog-note').css('padding-right')) * 2,
                            'height': ui.size.height - 105
                        });
                    }
                    else if ($(this).is('#dialog-answers')) {
                        $(this).width(function () {
                            return $(this).parents('.ui-dialog').width() - 30;
                        });

                    	$(this).find('form div.form-input .form-input-wrapper').css({
                            //'width':'auto'
                        });
                    }
                    else if($(this).is('#dialog-interactive')){
                        $('iframe', this).css({
                            'width':$(this).width(),
                            'height':$(this).height()*0.95
//                            'padding-bottom':'40px'
                        });
                    }
                    else if ($(this).is('#dialog-teacher-tips')) {
                    	$(this).css({'width':'100%'});
                    }
                },
                close: function() {
                    // take off current class on .btn:
                    $('.media-tools-container .btn.current[data-target="' + $(this).attr("id") + '"], .tools-container-2 .btn.current[data-target="' + $(this).attr("id") + '"]').removeClass('current');
                    //save and reload in the dialog
                    //so the audio playing from the iframe stop on dialog close
                    $(this).dialog('destroy');

                    //pause the sound
                    $('#refreshTimer').trigger('mouseup');

                    //$('style[class^="dialog-extend"]').remove();
                }
            }).dialogExtend({
                'minimizable': true
            });
        }
    };

    function audio_dialog_open($self) {
        $(".ui-dialog-content").not("#dialog-note, #dialog-teacher-tips, #dialog-answers").dialog("close");//double check that the page audio isn't playing
        var caption = ($('div#audioScript').css('display') == 'block') ? true : false;
        $('#dialog-audio').dialog({
            modal: 0,
            dialogClass: 'dialog-audio-dialog',
            title: 'Audio',
            minWidth: 320,
            width: 320,
            height: 'auto',
            draggable: true,
            position: (($('body').is('.left-handed')) ? {my: "right-70 bottom-20", at: "right top", of: $('#menu')} : {my: "left+70 bottom-20", at: "left top", of: $('#menu')}),
            resize: function() {

            },
            resizable: false,
            open: function() {
                // load subtitles:
                if ($('div.script-pane').attr('data-srt') != '') {
                    //$('div.srt').attr('data-video', $('video').attr('id'));
                    loadAudioSubtitles($(this));
                }
                $('#audioPlayer').jPlayer({
                    swfPath: './js/jPlayer',
                    size: {
                        width: '400px',
                        height: '0px'
                    },
                    supplied: 'mp3',
                    cssSelectorAncestor: '#dialog-audio',
                    cssSelector: {
                        videoPlay: '.jp-video-play',
                        play: '.jp-play',
                        pause: '.jp-pause',
                        stop: '.jp-stop',
                        seekBar: '.jp-seek-bar',
                        playBar: '.jp-play-bar',
                        mute: '.jp-mute',
                        unmute: '.jp-unmute',
                        volumeBar: '.jp-volume-bar',
                        volumeBarValue: '.jp-volume-bar-value',
                        volumeMax: '.jp-volume-max',
                        playbackRateBar: '.jp-playback-rate-bar',
                        playbackRateBarValue: '.jp-playback-rate-bar-value',
                        currentTime: '.jp-current-time',
                        duration: '.jp-duration',
                        fullScreen: '.jp-full-screen',
                        restoreScreen: '.jp-restore-screen',
                        repeat: '.jp-repeat',
                        repeatOff: '.jp-repeat-off',
                        gui: '.jp-gui',
                        noSolution: '.jp-no-solution'
                    },
                    timeupdate: function(e) {
                        $('#dialog-audio .script-pane p').each(function() {
                            if (parseFloat($(this).attr('data-from')) < e.jPlayer.status.currentTime && parseFloat($(this).attr('data-to')) > e.jPlayer.status.currentTime) {
                                $(this).addClass('current');
                            }
                            else {
                                $(this).removeClass('current');
                            }
                        });

                        if ($('#dialog-audio .script-pane .current').length) {
                            $('#dialog-audio .script-pane').transition({
                            	top: $('#dialog-audio .script-pane .current').position().top * -1 //+ $('.script-pane p').outerHeight()
                            }, 200);
                        }

                    },
                    solution: 'html, flash',
                    ready: function() {
                        if ($(this).attr('autoplay')) {
                            $(this).jPlayer('setMedia', {
                                mp3: $('#audioPlayer').attr('data-audio-src')
                            }).jPlayer("play");
                        }
                        else {
                            $(this).jPlayer('setMedia', {
                                mp3: $('#audioPlayer').attr('data-audio-src')
                            });
                        }
                    }
                });
                $('#audioPlayer').bind($.jPlayer.event.play, function(){
                    $('#audioPlayer').attr('started-playing',true);
                });
                $('.jp-pause').click(function(){
                    $('#audioPlayer').attr('started-playing',false);
                });
                if ($('div#audioScript').is(':visible')) {
                    $('#showAudioScript').html('Hide audioscript');
                }
                else {
                    $('#showAudioScript').html('Show audioscript');
                }
            },
            close: function() {
                $('.media-tools-container .btn.current').removeClass('current');
                $('#audioPlayer').jPlayer('destroy');
            }
        })/*.dialogExtend({
            'minimizable': false
        })*/;
    }
    ;

    function video_dialog_open($self) {

        $('#dialog-video').dialog({
            modal: 0,
            dialogClass: 'dialog-video-dialog',
            title: 'Video',
            width: (($self.attr('width')) ? parseInt($self.attr('width')) / 1.6 : 800),
            height: (($self.attr('height')) ? (parseInt($self.attr('height')) / 1.6) + 94 : 544),
            draggable: true,
            //position: {my: "center", at: "center", of: window},
            position: (($('body').is('.left-handed')) ? {my: "right-70 bottom-20", at: "right top", of: $('#menu')} : {my: "left+70 bottom-20", at: "left top", of: $('#menu')}),
            close: function() {
                $('.media-tools-container .btn.current').removeClass('current');
                //$('#videoPlayer').jPlayer('pause');
                if (typeof ival !== 'undefined') {
                    clearInterval(ival);
                }
                $('#videoPlayer').jPlayer('destroy');
            },
            open: function() {
                $('#videoPlayer').jPlayer({
                    swfPath: './js/jPlayer',
                    supplied: 'm4v',
                    //fullScreen: true,
                    size: {
                        width: (($(this).attr('width')) ? parseInt($(this).attr('width') / 1.6) + 'px' : '800px'), //'800px',
                        height: (($(this).attr('height')) ? parseInt($(this).attr('height') / 1.6) + 'px' : '450px') //'450px'
                    },
                    sizeFull: {
                        width: (window.screen.availWidth) + 'px',
                        height: (window.screen.availHeight - 60) + 'px'
                    },
                    cssSelectorAncestor: '#dialog-video',
                    cssSelector: {
                        videoPlay: '.jp-video-play',
                        play: '.jp-play',
                        pause: '.jp-pause',
                        stop: '.jp-stop',
                        seekBar: '.jp-seek-bar',
                        playBar: '.jp-play-bar',
                        mute: '.jp-mute',
                        unmute: '.jp-unmute',
                        volumeBar: '.jp-volume-bar',
                        volumeBarValue: '.jp-volume-bar-value',
                        volumeMax: '.jp-volume-max',
                        playbackRateBar: '.jp-playback-rate-bar',
                        playbackRateBarValue: '.jp-playback-rate-bar-value',
                        currentTime: '.jp-current-time',
                        duration: '.jp-duration',
                        fullScreen: '.jp-full-screen',
                        restoreScreen: '.jp-restore-screen',
                        repeat: '.jp-repeat',
                        repeatOff: '.jp-repeat-off',
                        gui: '.jp-gui',
                        noSolution: '.jp-no-solution'
                    },
                    solution: 'html, flash',
                    ready: function() {
                        if ($(this).attr('autoplay')) {
                            $(this).jPlayer('setMedia', {
                                m4v: $('#videoPlayer').attr('data-video-src'), poster: "./img/poster.png"
                            }).jPlayer("play");
                        }
                        else {
                            $(this).jPlayer('setMedia', {
                                m4v: $('#videoPlayer').attr('data-video-src'), poster: "./img/poster.png"
                            });
                        }
//                        addListeners();
                    }
                });
                // load subtitles:
                if ($('div.srt').attr('data-srt') != '') {
                    $('div.srt').attr('data-video', $('video').attr('id'));
                    loadSubtitles();
                }
                /*
                //if ($('#showVideoScript').hasClass('active') && !$('#showVideoScript').is(':hidden')) {
                if (!$('#videoScript').is(':hidden')) {
                    $('#dialog-video').transition({
                        height: '+=50px'
                    }, function() {
                        $('.video-script-window').fadeIn();
                    });
                    $('.dialog-video-dialog').transition({
                        top: '-=25px'
                    });
                }

                //if ($('#showVideoScript').is(':hidden') && $('#dialog-video').height() > 544) {
                if ($('#videoScript').is(':hidden') && $('#dialog-video').height() > 544) {	
                    $('#dialog-video').transition({
                        height: '-=50px'
                    });
                    $('.dialog-video-dialog').transition({
                        top: '+=25px'
                    });
                }*/
				//grab the original height to restore it later.
                videoHeight = $('div.ui-dialog[aria-describedby="dialog-video"]').css('height');

            },
            closeOnEscape: true,
            resizable: false
        })/*.dialogExtend({
            'minimizable': false
        })*/;
    }
    ;

    $(document).ready(function() {
        $("#canvasDiv").html('<svg id="mysvg" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;"><defs></defs><g id="drawlayer"></g><g id="tmplayer"></g><g id="selectors"></g></svg>');
        ns = new neosvg($('#mysvg'));
        sppen = ns.pen();
        //bind menu items to draw layer

        $('#tools').on('click', '.btn-pointer', function() {
            drawoff();
            if (hotMode) {
                hotspotReset();
            }
        });
        $('#tools').on('click', '.btn-pen', function() {
            //if no pen is selected
            if (!$('.btn-pen-width.selected', this).length) {
                $('.btn-pen-colors span:first-child').trigger('mouseup');
                $('.btn-pen-width-1').trigger('mouseup');
            }
            else {
                pen(($('.btn-pen-colors .selected').css('background-color') ? $('.btn-pen-colors .selected').css('background-color') : '#000'), $('.btn-pen-width.selected').attr('data-pen-size'));
            }

            drawon();
            return false;

        });
        $('#tools').on('mouseup', '.btn-pen-width, .btn-pen-colors span', function() {

            if ($(this).is('.btn-pen-width')) {
                $('.btn-pen-width').removeClass('selected');
            }
            else {
                $('.btn-pen-colors span').removeClass('selected');
            }
            $(this).addClass('selected');

            if ($('.btn-pen-width.selected').length && $('.btn-pen-colors span.selected').length) {
                $('.btn-pen').removeClass('show-options');
            }

            drawon();

            pen(($('.btn-pen-colors .selected').css('background-color') ? $('.btn-pen-colors .selected').css('background-color') : '#000'), $('.btn-pen-width.selected').attr('data-pen-size'));


        });
        $('#tools').on('click', '.btn-eraser', function() {
            drawon();
            eraser();
        });
        $('#tools').on('dblclick', '.btn-eraser', function() {
            eraser_all();
        });
        $('#tools').on('click', '.btn-highlighter', function() {
            //highlight() triggered on slider change
            drawon();
            highlight($("#hslPicker").data("color").tiny.toHexString(), 0.35);
            return false;
        });

        $('#tools').on('dblclick', '.btn-highlighter', function(e) {
            e.stopPropagation();
            $(this).toggleClass('show-options');
        });

        $('#tools').on('dblclick', '.btn-pen', function(e) {
            e.stopPropagation();
            $(this).toggleClass('show-options');
        });

        $('#tools').on('click', '.btn-hotspots', function() {
            //draw hotspot dotted lines:
            if (hotMode) {
                $(this).removeClass('current');
                hotspotReset();
            } else {
                hotMode = true;
                drawHotspot($('#canvasDiv').width(), $('#canvasDiv').height(), curpg);
            }
            drawoff();
        });
        $('body').on('click', '#showAudioScript', function() {
            $('#audioScript').fadeToggle(function() {
                if ($('div#audioScript').is(':visible')) {
                    $('#showAudioScript').html('Hide audioscript');
                }
                else {
                    $('#showAudioScript').html('Show audioscript');
                }
            });

        });
        $('body').on('click', '#showAudioScriptp', function() {
            $('#audioScriptp').fadeToggle(function() {
                if ($('div#audioScriptp').is(':visible')) {
                    $('#showAudioScriptp').html('Hide audioscript');
                }
                else {
                    $('#showAudioScriptp').html('Show audioscript');
                }
            });

        });
        $('body').on('click', '#showVideoScript', function() {
            //if ($('.video-script-window').is(':visible')) {
            if ($('#videoScript').is(':visible')) {
                $('#showVideoScript').removeClass('active');
                $('.video-script-window').fadeOut();
                $('#videoScript').fadeOut();
                /*
                if($('#dialog-video').height() > 544 && !$('#dialog-video').hasClass('jp-video-full')) {
	                $('#dialog-video').transition({
	                    height: '-=50px'
	                });
	                $('.dialog-video-dialog').transition({
	                    top: '+=25px'
	                });
                }
                */
            }
            else {
                $('#showVideoScript').addClass('active');
                $('.video-script-window').fadeIn();
                $('#videoScript').fadeIn();
                /*
                $('#dialog-video').transition({
                    height: '+=50px'
                });
                $('.dialog-video-dialog').transition({
                    top: '-=25px'
                });
                */
            }
        });
        $('.media-tools-container').on('click', '.btn-audio', function() {
            audio_dialog_open($(this))
        });
        $('.media-tools-container').on('click', '.btn-audiop', function() {
            $(".ui-dialog-content").not("#dialog-note").dialog("close");//double check that the epv audio isn't playing
            var caption = ($('div#audioScriptp').css('display') == 'block') ? true : false;
            $('#dialog-audiop').dialog({
                modal: 0,
                dialogClass: 'dialog-audiop-dialog',
                title: 'Audio',
                minWidth: 320,
                width: 320,
                height: 'auto',
                draggable: true,
                position: (($('body').is('.left-handed')) ? {my: "right-70 bottom-20", at: "right top", of: $('#menu')} : {my: "left+70 bottom-20", at: "left top", of: $('#menu')}),
                resize: function() {

                },
                resizable: false,
                open: function() {
                    // load subtitles:
                    if ($('div.script-pane').attr('data-srt') != '') {
                        //$('div.srt').attr('data-video', $('video').attr('id'));
                        loadAudioSubtitles($(this));
                    }
                    $('#audioPlayerp').jPlayer({
                        swfPath: './js/jPlayer',
                        size: {
                            width: '400px',
                            height: '0px'
                        },
                        supplied: 'mp3',
                        cssSelectorAncestor: '#dialog-audiop',
                        cssSelector: {
                            videoPlay: '.jp-video-play',
                            play: '.jp-play',
                            pause: '.jp-pause',
                            stop: '.jp-stop',
                            seekBar: '.jp-seek-bar',
                            playBar: '.jp-play-bar',
                            mute: '.jp-mute',
                            unmute: '.jp-unmute',
                            volumeBar: '.jp-volume-bar',
                            volumeBarValue: '.jp-volume-bar-value',
                            volumeMax: '.jp-volume-max',
                            playbackRateBar: '.jp-playback-rate-bar',
                            playbackRateBarValue: '.jp-playback-rate-bar-value',
                            currentTime: '.jp-current-time',
                            duration: '.jp-duration',
                            fullScreen: '.jp-full-screen',
                            restoreScreen: '.jp-restore-screen',
                            repeat: '.jp-repeat',
                            repeatOff: '.jp-repeat-off',
                            gui: '.jp-gui',
                            noSolution: '.jp-no-solution'
                        },
                        timeupdate: function(e) {

                            $('#dialog-audiop .script-pane p').each(function() {
                                if (parseFloat($(this).attr('data-from')) < e.jPlayer.status.currentTime && parseFloat($(this).attr('data-to')) > e.jPlayer.status.currentTime) {
                                    $(this).addClass('current');
                                }
                                else {
                                    $(this).removeClass('current');
                                }
                            });

                            if ($('#dialog-audiop .script-pane .current').length) {
                                $('#dialog-audiop .script-pane').transition({
                                    top: $('#dialog-audiop .script-pane .current').position().top * -1 //+ $('.script-pane p').outerHeight()
                                }, 200);
                            }

                        },
                        solution: 'html, flash',
                        ready: function() {
                            if ($(this).attr('autoplay')) {
                                $(this).jPlayer('setMedia', {
                                    mp3: $('#audioPlayerp').attr('data-audio-src')
                                }).jPlayer("play");
                            }
                            else {
                                $(this).jPlayer('setMedia', {
                                    mp3: $('#audioPlayerp').attr('data-audio-src')
                                });
                            }
                        }
                    });
                    if ($('div#audioScriptp').is(':visible')) {
                        $('#showAudioScriptp').html('Hide audioscript');
                    }
                    else {
                        $('#showAudioScriptp').html('Show audioscript');
                    }
                },
                close: function() {
                    $('.media-tools-container .btn.current').removeClass('current');
                    $('#audioPlayerp').jPlayer('destroy');
                }
            })/*.dialogExtend({
                'minimizable': false
            })*/;
		});

        $('#seekbar').mousedown(function(e) {
            $('#playbar').css({
                width: e.offsetX / $('#seekbar').width() * 100 + '%'
            });
        });
        var hammertime = Hammer(document.getElementById('seekbar')).on('dragstart', function(event) {
            _playbar_start_width = parseFloat($('#playbar').width() / $('#seekbar').width() * 100);
            $('#videoPlayer').jPlayer('pause');
        });
        var hammertime = Hammer(document.getElementById('seekbar')).on('drag', function(event) {
            $('#playbar').css({
                width: _playbar_start_width + event.gesture.deltaX / parseFloat($('#seekbar').width()) * 100 + '%'
            });
            $('#videoPlayer').jPlayer('playHead', _playbar_start_width + event.gesture.deltaX / parseFloat($('#seekbar').width()) * 100);
        });
        var hammertime = Hammer(document.getElementById('seekbar')).on('dragend', function(event) {

        });


        // resize handler for full screen videos: (fixes extra height if there are captions too)
        /*
         videoHeight = '';
         $('#videoPlayer').bind($.jPlayer.event.resize, function(event) {
         //Height here is the fullscreen height, which is going to be bad in the else block below.
         //videoHeight = (videoHeight) ? videoHeight : $('div.ui-dialog[aria-describedby="dialog-video"]').css('height');
         if ($('#dialog-video').hasClass('jp-video-full')) {
         $('#dialog-video').css('height', '');
         $('div#videoControls').find('a.jp-restore-screen').show();
         $('div#videoControls').find('a.jp-full-screen').hide();
         }
         else {
         $('div.ui-dialog[aria-describedby="dialog-video"]').css('height', videoHeight);
         $('div.ui-dialog[aria-describedby="dialog-video"]').css('position', '');
         $('div#videoControls').find('a.jp-full-screen').show();
         $('div#videoControls').find('a.jp-restore-screen').hide();
         }
         });
         */
        videoHeight = '';
        $('#videoPlayer').bind($.jPlayer.event.resize, function(event) {
            var uiDialogVideo = $('div.ui-dialog[aria-describedby="dialog-video"]');
            videoHeight = (videoHeight) ? videoHeight : uiDialogVideo.css('height');
            if ($('#dialog-video').hasClass('jp-video-full')) {
                $('#dialog-video').css('height', '');
                $('#videoScript .srt').css('font-size', '34px');
                $('#videoScript .srt').css('line-height', '1');
                if (window.TITLEMANAGER) {
                    uiDialogVideo.css('width', '');
                    uiDialogVideo.css('top', '');
                    uiDialogVideo.css('left', '');
                    var videoPlayerDiv = uiDialogVideo.find('#videoPlayer');
                    var videoPlayerDivImg = uiDialogVideo.find('#videoPlayer img');
                    var videoPlayerDivVideo = uiDialogVideo.find('#videoPlayer video');
                    videoPlayerDiv.css('height', videoPlayerDiv.height() - 58);
                    videoPlayerDivImg.css('height', videoPlayerDivImg.height() - 58);
                    videoPlayerDivVideo.css('height', videoPlayerDivVideo.height() - 58);
                }
                $('div#videoControls').find('a.jp-restore-screen').show();
                $('div#videoControls').find('a.jp-full-screen').hide();
            }
            else {
            	$('#videoScript .srt').css('font-size', '18px');
            	$('#videoScript .srt').css('line-height', '');
                $('div.ui-dialog[aria-describedby="dialog-video"]').css('height', videoHeight);
                $('div.ui-dialog[aria-describedby="dialog-video"]').css('position', '');
                $('div#videoControls').find('a.jp-full-screen').show();
                $('div#videoControls').find('a.jp-restore-screen').hide();
            }
        });
        $('#videoPlayer').bind($.jPlayer.event.pause, function(event) {
        	if(event.jPlayer.status.currentTime < 1) {
        		// set the media options again
        		$(this).jPlayer("setMedia", { m4v: event.jPlayer.status.src, poster: "./img/poster.png" });
        	}
        });
        //Oh… and you’ll need to do the same for the ‘ended’ event :
        $('#videoPlayer').bind($.jPlayer.event.ended, function(event) {
        	if(event.jPlayer.status.currentTime < 1) {
        		// set the media options again
        		$(this).jPlayer("setMedia", { m4v: event.jPlayer.status.src, poster: "./img/poster.png" });
        	}
        });
        
        $('.media-tools-container').on('click', '.btn-video', function() {
            video_dialog_open($(this));
        });

        $('.media-tools-container').on('click', '.btn', function() {
            $('.media-tools-container .btn').removeClass('current');
            $(this).addClass('current');
        });
        $('#tools').on('click', '.btn-pen .show-options-tip, .btn-highlighter .show-options-tip', function(e) {
            e.stopPropagation();
            $(this).parents('.btn').toggleClass('show-options');
        });
        $('#tools').on('click', '.btn-mask', function() {
            drawon();
            mask();
        });
        $('#tools').on('click', '.btn-spotlight', function() {
            drawon();
            spotlight();
        });
        $('#tools').on('dblclick', '.btn-spotlight', function() {
            eraser_all();
        });

        $('.select-menu').click(function() {
            $(this).toggleClass('expanded');
        });
        $('body').on('click', '.select-options a', function() {
        	// first check if it's a Teacher's Tool:
        	if($(this).hasClass('teacherstool')) {
        		$('#pages, .flip-overlay').fadeOut();
                $('.info-wrapper-close').trigger('click');
        		$(this).parents('.panel').find('.back-content #' + $(this).attr('data-target') + ' a[data-dialog="true"]').trigger('click');
        	}
        	else {
            var $parent = $(this).parents('.panel');
            $parent.find('.tab').removeClass('tab-show');
            $parent.find('.tab[id="' + $(this).attr('data-target') + '"]').addClass('tab-show');
            $parent.find('.selected').text($(this).text());
        	}
        });
        $('body').on('click', '#pages .panel-close, .flip-overlay', function() {
            $('#pages, .flip-overlay').fadeOut();
            $('.info-wrapper-close').trigger('click');
        });
        $('body').on('click', '.info', function() {

            var $self = $(this);
            var offset_x = $(this).offset().left;
            var offset_y = $(this).offset().top;

            if ($('body > .info-wrapper').length) {
                var $this = $('body > .info-wrapper');
                $('li[data-info-id="' + $this.attr('info-id') + '"]').append($this);
            }

            $('ul .info-wrapper').removeClass('show');
            $('.info-wrapper.show').remove();

            //assign the info id the inforwrapper shown
            $(this).parent().find('.info-wrapper').attr('info-id', $(this).parents('li').attr('data-info-id')).addClass('show').appendTo('body');

            $('body > .info-wrapper').css({
                left: offset_x - $('body > .info-wrapper').outerWidth(true) - 10,
                top: offset_y - 10
            });

        });
        $('body').on('click', '.info-wrapper-close', function() {
            if ($('body > .info-wrapper').length) {
                var $this = $('body > .info-wrapper');
                $('li[data-info-id="' + $this.attr('info-id') + '"]').append($this);
            }
            $('ul .info-wrapper').removeClass('show');
            $('.info-wrapper.show').remove();
        });

        // answer key dialog functions:
        $('div#dialog-answers div.button-pane > a.btn-answers-all').click(function() {
            $('div#dialog-answers').find('span').each(function() {
                $(this).html($(this).attr('answer'));
            });
        });

        $('div#dialog-answers div.button-pane > a.btn-num').click(function() {
            $('div#dialog-answers').find('span').each(function() {
                if ($(this).html() == '') {
                    $(this).html($(this).attr('answer'));
                    var tgt = parseInt($(this).parent().siblings('div.form-number').text());
                    if (tgt != $('div#dialog-answers').find('span.answerkeyAnswer').length) {
                        $('.btn-num').text(++tgt + '' + ((tgt == 2) ? 'nd' : '') + ((tgt == 3) ? 'rd' : '') + ((tgt != 2 & tgt != 3) ? 'th' : ''));
                    }
                    return false;
                }
            });
        });

        $('a.btn-reset').click(function() {
            $('div#dialog-answers form span').html('');
            $('.btn-num').text('1st');
        });


    });


// video player subtitles (srt files):
    function toSeconds(t) {
        var s = 0.0
        if (t) {
            var p = t.split(':');
            for (i = 0; i < p.length; i++)
                s = s * 60 + parseFloat(p[i].replace(',', '.'))
        }
        return s;
    }

    function strip(s) {
        return s.replace(/^\s+|\s+$/g, "");
    }

    function playSubtitles(subtitleElement) {
        var videoId = subtitleElement.attr('data-video');
        var srt = subtitleElement.text();
        subtitleElement.text('');
        srt = srt.replace(/\r\n|\r|\n/g, '\n');

        var subtitles = {};
        srt = strip(srt);
        var srt_ = srt.split('\n\n');
        for (s in srt_) {
            st = srt_[s].split('\n');
            if (st.length >= 2) {
                n = st[0];
                i = strip(st[1].split(' --> ')[0]);
                o = strip(st[1].split(' --> ')[1]);
                t = st[2];
                if (st.length > 2) {
                    for (j = 3; j < st.length; j++)
                        t += '\n' + st[j];
                }
                is = toSeconds(i);
                os = toSeconds(o);
                subtitles[is] = {i: i, o: os, t: t};
            }
        }

        var currentSubtitle = -1;
        ival = setInterval(function() {
            var currentTime = document.getElementById(videoId).currentTime;
            var subtitle = -1;

            for (s in subtitles) {
                if (s > currentTime)
                    break;
                subtitle = s;
            }

            if (subtitle > 0) {
                if (subtitle != currentSubtitle) {
                    subtitleElement.html(subtitles[subtitle].t);
                    currentSubtitle = subtitle;
                } else if (subtitles[subtitle].o < currentTime) {
                    subtitleElement.html('');
                }
            }
        }, 100);
    }

    function loadSubtitles() {
        var subtitleElement = $('div.srt');
        var videoId = subtitleElement.attr('data-video');
        if (!videoId)
            return;
        var srtUrl = subtitleElement.attr('data-srt');
        if (srtUrl) {
            subtitleElement.load(srtUrl, function(responseText, textStatus, req) {
                playSubtitles(subtitleElement)
            })
        } else {
            playSubtitles(subtitleElement);
        }
    }
// end video subtitles

// audio captions
    function loadAudioSubtitles($this) {
        var srtUrl = $this.find('div.script-pane').attr('data-srt');
        var subtitleElement = $this.find('div.script-pane');

        if (srtUrl) {
            subtitleElement.load(srtUrl, function(responseText, textStatus, req) {
                var srt = subtitleElement.text();
                subtitleElement.text('');
                srt = srt.replace(/\r\n|\r|\n/g, '\n');
                
                //var subtitles = {};
                srt = strip(srt);
                var srt_ = srt.split('\n\n');
                var html = '';
                for (s in srt_) {
                    st = srt_[s].split('\n');
                    if (st.length >= 2) {
                        n = st[0];
                        i = strip(st[1].split(' --> ')[0]);
                        o = strip(st[1].split(' --> ')[1]);
                        t = st[2];                           
                        if(typeof t === "undefined"){ t="";}   
                        if (st.length > 2) {
                            for (j = 3; j < st.length; j++)
                                t += '\n' + st[j];
                        }
                        is = toSeconds(i);
                        os = toSeconds(o);
                        //subtitles[is] = {i: i, o: os, t: t};
                        html += '<p data-from="' + is + '" data-to="' + os + '">' + t + '</p>';
                    }
                }
                subtitleElement.html(html);
            });
        }
    }
// end audio captions


    var scale = 1;  // scale of the image
    var xLast = 0;  // last x location on the screen
    var yLast = 0;  // last y location on the screen
    var xImage = 0; // last x location on the image
    var yImage = 0; // last y location on the image

    function zoom_reset() {

        scale = 1;
        xLast = yLast = xImage = yImage = 0;
        $('#pagecontent').css('-webkit-transform', 'translateX(' + (-xImage) + 'px) translateY(' + (-yImage) + 'px) scale(' + scale + ')');

        // enable scrolling & scrollbars:
        $('body').prop('style').removeProperty('overflow');
    }

    function go_zoom(xpercent, ypercent) {
        //Tricky: All the hotspot coords are fixed positions
        //content is not fixed.

        var xScreen = ($('#data').width() * xpercent / 100);
        var yScreen = ($('#data').height() * ypercent / 100);
        xImage = xImage + ((xScreen - xLast));
        yImage = yImage + ((yScreen - yLast));

        scale = 2;

        // determine the location on the screen at the new scale
        var xNew = (xScreen - xImage) / scale;
        var yNew = (yScreen - yImage) / scale;

        // save the current screen location
        xLast = xScreen;
        yLast = yScreen;

        $('#pagecontent').css('-webkit-transform', 'translateX(' + (-xImage) + 'px) translateY(' + (-yImage) + 'px) scale(' + scale + ')');

    }

    var offset = null;
    var numPages, side;
    
    function epv_zoom(hotspot) {
    	var nPages = $('#data img').length;
    	var sSide = (($('body').hasClass('left-handed'))?'left':'right');

        // Get the x and y coordinates of the center in output browser's window 
        var centerX, centerY;
        
        centerX = $('div#pagecontent').width() / 2;
        centerY = $('div#pagecontent').height() / 2;

        var img = $('#data img:first');
        if (offset == null || (nPages != numPages) || (sSide != side)) {
            offset = img.offset();
            numPages = nPages;
            side = sSide;
        }
        var baseimg = img[0];
        var rh = baseimg.height / baseimg.naturalHeight;
        var rw = baseimg.width / baseimg.naturalWidth;

        var spotcenterx = (hotspot[0] + ((hotspot[2] - hotspot[0]) / 2)) * rw;
        var spotcentery = (hotspot[1] + ((hotspot[3] - hotspot[1]) / 2)) * rh;

        scale = 1 / (((hotspot[3] - hotspot[1]) * rh) / $('div#pagecontent').height());

        scale = (scale <= 2) ? scale : 2;

        //var xdiff = -(scale * spotcenterx) + centerX - offset.left;
    	//var xdiff = -(scale * spotcenterx) + centerX - (scale * offset.left);

        // subtract 50px if right side to account for the toolbar width
        var calcOffset = ((sSide == 'left')?offset.left:offset.left - 50);
    	var xdiff = centerX - scale * (calcOffset + spotcenterx);
        var ydiff = -(scale * spotcentery) + centerY;

        $('#pagecontent').css('-webkit-transform', 'translateX(' + (xdiff) + 'px) translateY(' + (ydiff) + 'px) scale(' + scale + ')');

        $('#tools').removeClass('shown');
        // disable scrolling & scrollbars:
        $('body').css('overflow', 'hidden');
    }

    $(document).ready(function() {

        //clicking the whitespace around the images doesn't zoom out.
        $('body').on("mouseup", function(e) {
            if (scale > 1 && e.currentTarget == e.toElement) {//everything bubbles up here
                epvreset();
            }
        });
        $('#data').on("click", function(e) {
            e.preventDefault();

            //this can not respond to drawlayer clicks, but it also needs to be able to resize the draw layer.
            var img = $('#data img:first');
            var xScreen = e.pageX - img.offset().left;
            var yScreen = e.pageY - img.offset().top;


            //Is this a click in a predefined hot spot?
            var baseimg = img[0];
            var rh = baseimg.height * scale / baseimg.naturalHeight;
            var rw = baseimg.width * scale / baseimg.naturalWidth;
            //those had better be the same thing, but you never know.


            var epvs = page_contents[BOOKTITLE][curpg]['epv'];
            if (epvs)
                for (x = 0; x < epvs.length; x++) {
                    var epv = epvs[x];
                    //is there a defined hotspot?
                    if (epv['hotspot']) {
                        //is the click inside the adjusted hotspot?
                        var spot = epv['hotspot'];
                        if ((xScreen >= spot[0] * rw && yScreen >= spot[1] * rh)
                                && (xScreen <= spot[2] * rw && yScreen <= spot[3] * rh)
                                ) {
                            if (x == epvid) {
                                //clicking on the already zoomed spot.
                                epvreset();
                                return;
                            }
                            epvid = x;
                            epvloaditem(epv);

                            return;
                        }
                    }
                }
            if (scale > 1) {
                epvreset();
            }
        });

    });

    /** Hey, Look! Classes!
     * class for the storage of arrays of assets
     */
    function assetManager(_classType) {
        this.classType = _classType;
        this.assets = [];
        this.current = 0;
        this.selected = 0;
    }
    assetManager.prototype.store = function(_asset) {
        this.assets[this.current] = _asset;
        //this.selected = this.current;
        this.current += 1;
        return this.current;
    };
    assetManager.prototype.load = function(i) {
        this.selected = i;
        return this.assets[i];
    };
    assetManager.prototype.html = function() {
        //return dots sufficient for the available assets
        if (this.assets.length <= 1) {
            return '';
        }
        var str = '';
        if (this.selected != null && this.selected > 0) {
            str = '<span class="left" data-id="' + (this.selected - 1) + '">left</span> ';
        } else {
            str = '<span class="left" data-id="' + (0) + '">left</span> ';
        }
        for (var x = 0; x < this.assets.length; x++) {
            str += ' <span class="' + ((this.selected == x) ? 'current' : '') + '" data-id="' + x + '">dot' + x + '</span>';
        }
        if (this.selected != null && this.selected < this.assets.length - 1) {
            str += ' <span class="right" data-id="' + (this.selected + 1) + '">right</span>';
        } else {
            str += ' <span class="right" data-id="' + this.assets.length + '">right</span>';
        }
        return str;
    };

    var video_ass = new assetManager('video');
    var audio_ass = new assetManager('audio');
    var interactive_ass = new assetManager('interactive');
    $('#videoAss').on('click', 'span', function() {
        assetLoader(-1, video_ass.load($(this).data('id')));
    });
    $('#audioAss').on('click', 'span', function() {
        assetLoader(-1, audio_ass.load($(this).data('id')));
    });
    $('#audioAssp').on('click', 'span', function() {
        assetLoaderP(-1, audio_ass.load($(this).data('id')));
    });
    $('#interactiveAss').on('click', 'span', function() {
        assetLoader(-1, interactive_ass.load($(this).data('id')));
    });

    assetLoader_audio = function(asset, id) {
        var aplayer = $("#audioPlayer" + id);
        aplayer.attr("data-audio-src", asset['file']);
        if (typeof asset['srt'] != 'undefined' && asset['srt'] != '') {
            $('a#showAudioScript' + id).show();
            $('#audioScript' + id).show();
            $('#audioScript' + id + ' .script-pane').attr('data-srt', asset['srt']).css('top', '');
            //$('#audioScript'+id+' .script-pane').html(asset['captions']);
            
            // check if audio dialog is already open, and if true, load new captions here
            //if($("#dialog-audio" + id).dialog( "isOpen" ) === true) {
            if($(".dialog-audio" + id + "-dialog").is(":visible")) {
            	loadAudioSubtitles($("#dialog-audio" + id));
            }
        }
        else {
            $('a#showAudioScript' + id).hide();
            $('#audioScript' + id).hide();
            $('#audioScript' + id + ' .script-pane').html('').css('top', '');
        }
        aplayer.jPlayer("clearMedia");
        var ftype = asset['file'].substr(-3);
        aplayer.jPlayer("setMedia", {mp3: asset['file']});
        //NOTE: setmedia requires 'mp3': to set the file type?
        $('.media-tools-container .btn-audio' + id).show(0);

        if ((typeof asset['autoplay'] != 'undefined') && (asset['autoplay'] == 'true')) {
            aplayer.attr('autoplay', true);
        }
        else {
            if (aplayer.attr('autoplay')) {
                aplayer.removeAttr('autoplay');
            }
        }
    }
    
	assetLoader_tools = function(i,asset){		
		//TODO: urls
        if (asset['type'] === 'vocabtool') {
            if (asset['subid']) {
                //$('iframe#iFrame-vt').attr('src', './teacherstools/vocab/vocabApp.html#units=' + asset['subid']);
                $('span.btn.btn-vocabulary-tool').attr('data-src', './teacherstools/vocab/vocabApp.html#units=' + asset['subid']);
            }
            $('.media-tools-container .btn-vocabulary-tool').show(0);
        }
        if (asset['type'] === 'storytool') {
            if (UNITTITLE) {
                //$('iframe#iFrame-st').attr('src', './teacherstools/story/index.html#/activities/' + UNITTITLE);
                $('span.btn.btn-story-tool').attr('data-src', './teacherstools/story/index.html#/activities/' + UNITTITLE);
            }
            $('.media-tools-container .btn-story-tool').show(0);
        }
        if (asset['type'] === 'dialogtool') {
            if (asset['subid']) {
                //$('iframe#iFrame-dt').attr('src', './teacherstools/dialogue/index.html#/activities/' + asset['subid']);
                $('span.btn.btn-dialogue-tool').attr('data-src', './teacherstools/dialogue/index.html#/activities/' + asset['subid']);
            }
            $('.media-tools-container .btn-dialogue-tool').show(0);
        }
        if (asset['type'] === 'grammartool') {
            if (UNITTITLE) {
                //$('iframe#iFrame-gt').attr('src', './teacherstools/grammar/index.html#/activities/' + UNITTITLE);
                $('span.btn.btn-grammar-tool').attr('data-src', './teacherstools/grammar/index.html#/activities/' + UNITTITLE);
            }
            $('.media-tools-container .btn-grammar-tool').show(0);
        }
	}

	assetLoaderP = function(i, asset) {
        var assetCounter = 0;
        if (asset['type'] === 'video') {
            if (i > -1)
                assetCounter = video_ass.store(asset);
            if (assetCounter <= 1) {
                $("#videoPlayer").attr("data-video-src", asset['file']);
            }
            $('.media-tools-container .btn-video').show(0);
            $('#videoScript .srt').html('');

            if (typeof asset['srt'] != 'undefined' && asset['srt'] != '') {
                $('a#showVideoScript').addClass('active').show();
                $('#videoScript').show();
                $('.video-script-window').show();
                // load srt file
                $('#videoScript div.srt').attr('data-srt', asset['srt']);
            }
            else {
                $('a#showVideoScript').hide();
                $('#videoScript').hide();
            }

            $('#videoPlayer').jPlayer("clearMedia");
            var ftype = asset['file'].substr(-3);
            $('#videoPlayer').jPlayer("setMedia", {m4v: asset['file'], poster: "./img/poster.png"});
            if($('#videoPlayer > img').length && !$('#videoPlayer > img').is(':visible')) {
            	$('#videoPlayer > img').show();
            }
            // check for autoplay:
            if ((typeof asset['autoplay'] != 'undefined') && (asset['autoplay'] == 'true')) {
                $('#videoPlayer').attr('autoplay', true);
            }
            else {
                if ($('#videoPlayer').attr('autoplay')) {
                    $('#videoPlayer').removeAttr('autoplay');
                }
            }
            // set width, height:
            if (typeof asset['width'] != 'undefined') {
                $('#dialog-video').attr('width', asset['width']);
            }
            else {
                if ($('#dialog-video').attr('width')) {
                    $('#dialog-video').removeAttr('width');
                }
            }
            if (typeof asset['height'] != 'undefined') {
                $('#dialog-video').attr('height', asset['height']);
            }
            else {
                if ($('#dialog-video').attr('height')) {
                    $('#dialog-video').removeAttr('height');
                }
            }
            $('#videoAss').html(video_ass.html());
        }
        if (asset['type'] === 'audio') {
            if (i > -1)
                assetCounter = audio_ass.store(asset);
            if (assetCounter <= 1) {
                assetLoader_audio(asset, 'p');
            }
            $('#audioAssp').html(audio_ass.html());
        }
        if (asset['type'] === 'interactive') {
            if (i > -1)
                assetCounter = interactive_ass.store(asset);
            if (asset['id']) {
                snippetID = asset['id'];
                //getSnippet(snippetID, "activity");
                if (assetCounter <= 1) {
                    $('iframe#iFrame-rcf').attr('src', './rcf/index.html?snippetID=' + snippetID + '&book=' + currbook + ((typeof asset['options'] !== 'undefined')?asset['options']:''));
                }
            }
            $('.media-tools-container .btn-interactive').show(0);
            $('#interactiveAss').html(interactive_ass.html());
        }
        if (asset['type'] === 'karaoke') {
            if (asset['id']) {
                snippetID = asset['id'];
                //getSnippet(snippetID, "activity");
                $('iframe#iFrame-rcf-k').attr('src', './rcf/index.html?snippetID=' + snippetID + '&karaoke=1');
            } else if (asset['file']) {
                assetLoader_audio(asset, 'p');
                $('#audioAss').html(audio_ass.html());
            }
            $('.media-tools-container .btn-karaoke').show(0);
        }
        if (asset['type'] === 'answers') {
            var answersHTML = '';
            if ($.isArray(asset['content'])) {
                var max = 0;
                var maxVal = '';
                var auto_show_indices = (asset['auto_show'])?asset['auto_show']:'';
                var is_hide_numbers = asset['hide_numbers'];
                $.each(asset['content'], function(index, value) {
                    var _b = '';
                    if(auto_show_indices.length){
                        if(auto_show_indices.indexOf(index) != -1){
                            _b = value;
                        }
                    }
                    answersHTML += '<div class="form-input"><div class="form-number" style="'+(is_hide_numbers?'display:none;':'')+'" >' + (index + 1) + '</div><div class="form-input-wrapper"><span class="answerkeyAnswer" answerNum="' + (index + 1) + '" answer="' + value + '" >'+_b+'</span></div></div>'
                    // grab the max answer length to set the width of the input fields
                    if (value.length > max) {
                        max = value.length;
                        maxVal = value;
                    }
                });
                $('span#show-all-answers').show();
                $('div.button-pane').show();
                $('span#hide-all-answers').show();
                $('span#reset-answers').show();
                if(asset['content'].length <= 1) {  // only show all if there's only 1 answer key
                	$('div.button-pane a.btn-num').hide();
                }
                else {
                	$('div.button-pane a.btn-num').show();
                }
            }
            else {
                var answersHTML = asset['content'];
                $('span#show-all-answers').hide();
                $('div.button-pane').hide();
                $('span#hide-all-answers').hide();
                $('span#reset-answers').hide();
            }
            $("#dialog-answers > form").html(answersHTML);
            // estimate width of input fields in pixels:
            $("div#pagecontent").append('<span id="measure" style="position: absolute;left: -10000px;top: 0px;"><div id="dialog-answers"><div class="form-input"><div class="form-number" style=""></div><div class="form-input-wrapper"><span class="answerkeyAnswer" answerNum="" answer="" ></span></div></div></div></span>');
            var measure = $("#measure");
            var calcWidth = null;
            measure.find('.answerkeyAnswer').html(maxVal);
            measure.find('.form-input-wrapper').css("width", 'auto');
            if((measure.width() + 20) > ($('div#pagecontent').width() * .6)) {
            	$("#dialog-answers form .form-input-wrapper").css("width", ($('div#pagecontent').width() / 2) + "px");
            	calcWidth = $('div#pagecontent').width() / 2;
            }
            else {
            	$("#dialog-answers form .form-input-wrapper").css("width", (measure.width() + 20) + "px");
            	calcWidth = measure.width() + 20;
            }
            // measure individual heights and set them accordingly:
            measure.find('#dialog-answers').html(answersHTML);
            measure.find('.form-input-wrapper .answerkeyAnswer').html(function(){return $(this).attr('answer')});
            measure.find('.form-input-wrapper').css("width", calcWidth + "px");
            measure.find('.form-input-wrapper').css("height", 'auto');
            measure.find('.form-input-wrapper .answerkeyAnswer').css("height", 'auto');
            measure.find('.form-input').each(function(index) {
            	$($('#dialog-answers form .form-input-wrapper').get(index)).css('height', $(this).find('.form-input-wrapper').outerHeight());
            	$($('#dialog-answers form .form-input-wrapper .answerkeyAnswer').get(index)).css('height', $(this).find('.form-input-wrapper .answerkeyAnswer').outerHeight());
            });
            measure.remove();
            // now do it for height:
            $("div#pagecontent").append('<div id="dialog-answers"><div class="form-input"><div class="form-input-wrapper"><span id="answerkeyAnswer" style="position: absolute;left: -10000px;top: 0px;"></span></div></div></div>');
            var measure = $("#answerkeyAnswer");
            measure.html(answersHTML);
            if(measure.height() > ($('div#pagecontent').height() - 70)) {
            	$('form#answersForm').css('height', $('div#pagecontent').height() - 70).css('overflow', 'auto');
            }
            else {
            	$('form#answersForm').css('height', 'auto');
            }
            $('div#dialog-answers div.form-input span#answerkeyAnswer').remove();
            //measure.remove();
            // end estimate
            $('.media-tools-container .btn-answers').show(0);
        }
        if (asset['type'] === 'tips') {
            $("#dialog-teacher-tips").html(asset['content']);
            $('.media-tools-container .btn-teacher-tips').show(0);
        }
        if (asset['type'] === 'image') {
            $("#dialog-image").html('<img src="' + asset["file"] + '" />');
            $('.media-tools-container .btn-image').show(0);
        }
				
		assetLoader_tools(i,asset);
				
        if (i > -1) {
            //reset the animation
            $('.media-tools-container').removeClass('grow');
            //add the animation
            $('.media-tools-container > .btn').each(function() {
                if ($(this).is(':visible')) {
                    $('.media-tools-container').addClass('grow');
                    return false;
                }
                else {
                    $('.media-tools-container').removeClass('grow');
                }
            });
        }

    };	

    assetLoader = function(i, asset) {
        var assetCounter = 0;
        if (asset['type'] === 'video') {
            if (i > -1)
                assetCounter = video_ass.store(asset);
            if (assetCounter <= 1) {
                $("#videoPlayer").attr("data-video-src", asset['file']);
            }
            $('.media-tools-container .btn-video').show(0);
            $('#videoScript .srt').html('');

            if (typeof asset['srt'] != 'undefined' && asset['srt'] != '') {
                $('a#showVideoScript').addClass('active').show();
                $('#videoScript').show();
                $('.video-script-window').show();
                // load srt file
                $('#videoScript div.srt').attr('data-srt', asset['srt']);
            }
            else {
                $('a#showVideoScript').hide();
                $('#videoScript').hide();
            }

            $('#videoPlayer').jPlayer("clearMedia");
            var ftype = asset['file'].substr(-3);
            $('#videoPlayer').jPlayer("setMedia", {m4v: asset['file'], poster: "./img/poster.png"});
            if($('#videoPlayer > img').length && !$('#videoPlayer > img').is(':visible')) {
            	$('#videoPlayer > img').show();
            }
            // check for autoplay:
            if ((typeof asset['autoplay'] != 'undefined') && (asset['autoplay'] == 'true')) {
                $('#videoPlayer').attr('autoplay', true);
            }
            else {
                if ($('#videoPlayer').attr('autoplay')) {
                    $('#videoPlayer').removeAttr('autoplay');
                }
            }
            // set width, height:
            if (typeof asset['width'] != 'undefined') {
                $('#dialog-video').attr('width', asset['width']);
            }
            else {
                if ($('#dialog-video').attr('width')) {
                    $('#dialog-video').removeAttr('width');
                }
            }
            if (typeof asset['height'] != 'undefined') {
                $('#dialog-video').attr('height', asset['height']);
            }
            else {
                if ($('#dialog-video').attr('height')) {
                    $('#dialog-video').removeAttr('height');
                }
            }
            $('#videoAss').html(video_ass.html());
        }
        if (asset['type'] === 'audio') {
            if (i > -1)
                assetCounter = audio_ass.store(asset);
            if (assetCounter <= 1) {
                assetLoader_audio(asset, '');
            }
            $('#audioAss').html(audio_ass.html());
        }
        if (asset['type'] === 'interactive') {
            if (i > -1)
                assetCounter = interactive_ass.store(asset);
            if (asset['id']) {
                snippetID = asset['id'];
                //getSnippet(snippetID, "activity");
                if (assetCounter <= 1) {
                    $('iframe#iFrame-rcf').attr('src', './rcf/index.html?snippetID=' + snippetID + '&book=' + currbook + ((typeof asset['options'] !== 'undefined')?asset['options']:''));
                }
            }
            $('.media-tools-container .btn-interactive').show(0);
            $('#interactiveAss').html(interactive_ass.html());
        }
        if (asset['type'] === 'karaoke') {
            if (asset['id']) {
                snippetID = asset['id'];
                //getSnippet(snippetID, "activity");
                $('iframe#iFrame-rcf-k').attr('src', './rcf/index.html?snippetID=' + snippetID + '&karaoke=1');
            } else if (asset['file']) {
                assetLoader_audio(asset, '');
                $('#audioAss').html(audio_ass.html());
            }
            $('.media-tools-container .btn-karaoke').show(0);
        }
        if (asset['type'] === 'answers') {
            var answersHTML = '';
            if ($.isArray(asset['content'])) {
                var max = 0;
                var maxVal = '';
                var auto_show_indices = (asset['auto_show'])?asset['auto_show']:'';
                var is_hide_numbers = asset['hide_numbers'];
                $.each(asset['content'], function(index, value) {
                    var _b = '';
                    if(auto_show_indices.length){
                        if(auto_show_indices.indexOf(index) != -1){
                            _b = value;
                        }
                    }
                    answersHTML += '<div class="form-input"><div class="form-number" style="'+(is_hide_numbers?'display:none;':'')+'" >' + (index + 1) + '</div><div class="form-input-wrapper"><span class="answerkeyAnswer" answerNum="' + (index + 1) + '" answer="' + value + '" >'+_b+'</span></div></div>'
                    // grab the max answer length to set the width of the input fields
                    if (value.length > max) {
                        max = value.length;
                        maxVal = value;
                    }
                });
                $('span#show-all-answers').show();
                $('div.button-pane').show();
                $('span#hide-all-answers').show();
                $('span#reset-answers').show();
                if(asset['content'].length <= 1) {  // only show all if there's only 1 answer key
                	$('div.button-pane a.btn-num').hide();
                }
                else {
                	$('div.button-pane a.btn-num').show();
                }
            }
            else {
                var answersHTML = asset['content'];
                $('span#show-all-answers').hide();
                $('div.button-pane').hide();
                $('span#hide-all-answers').hide();
                $('span#reset-answers').hide();
            }
            $("#dialog-answers > form").html(answersHTML);
            // estimate width of input fields in pixels:
            $("div#pagecontent").append('<span id="measure" style="position: absolute;left: -10000px;top: 0px;"><div id="dialog-answers"><div class="form-input"><div class="form-number" style=""></div><div class="form-input-wrapper"><span class="answerkeyAnswer" answerNum="" answer="" ></span></div></div></div></span>');
            var measure = $("#measure");
            var calcWidth = null;
            measure.find('.answerkeyAnswer').html(maxVal);
            measure.find('.form-input-wrapper').css("width", 'auto');
            if((measure.width() + 20) > ($('div#pagecontent').width() * .6)) {
            	$("#dialog-answers form .form-input-wrapper").css("width", ($('div#pagecontent').width() / 2) + "px");
            	calcWidth = $('div#pagecontent').width() / 2;
            }
            else {
            	$("#dialog-answers form .form-input-wrapper").css("width", (measure.width() + 20) + "px");
            	calcWidth = measure.width() + 20;
            }
            // measure individual heights and set them accordingly:
            measure.find('#dialog-answers').html(answersHTML);
            measure.find('.form-input-wrapper .answerkeyAnswer').html(function(){return $(this).attr('answer')});
            measure.find('.form-input-wrapper').css("width", calcWidth + "px");
            measure.find('.form-input-wrapper').css("height", 'auto');
            measure.find('.form-input-wrapper .answerkeyAnswer').css("height", 'auto');
            measure.find('.form-input').each(function(index) {
            	$($('#dialog-answers form .form-input-wrapper').get(index)).css('height', $(this).find('.form-input-wrapper').outerHeight());
            	$($('#dialog-answers form .form-input-wrapper .answerkeyAnswer').get(index)).css('height', $(this).find('.form-input-wrapper .answerkeyAnswer').outerHeight());
            });
            measure.remove();
            // now do it for height:
            $("div#pagecontent").append('<div id="dialog-answers"><div class="form-input"><div class="form-input-wrapper"><span id="answerkeyAnswer" style="position: absolute;left: -10000px;top: 0px;"></span></div></div></div>');
            var measure = $("#answerkeyAnswer");
            measure.html(answersHTML);
            if(measure.height() > ($('div#pagecontent').height() - 70)) {
            	$('form#answersForm').css('height', $('div#pagecontent').height() - 70).css('overflow', 'auto');
            }
            else {
            	$('form#answersForm').css('height', 'auto');
            }
            $('div#dialog-answers div.form-input span#answerkeyAnswer').remove();
            //measure.remove();
            // end estimate
            $('.media-tools-container .btn-answers').show(0);
        }
        if (asset['type'] === 'tips') {
            $("#dialog-teacher-tips").html(asset['content']);
            $('.media-tools-container .btn-teacher-tips').show(0);
        }
        if (asset['type'] === 'image') {
            $("#dialog-image").html('<img src="' + asset["file"] + '" />');
            $('.media-tools-container .btn-image').show(0);
        }
				
		assetLoader_tools(i,asset);
				
        if (i > -1) {
            //reset the animation
            $('.media-tools-container').removeClass('grow');
            //add the animation
            $('.media-tools-container > .btn').each(function() {
                if ($(this).is(':visible')) {
                    $('.media-tools-container').addClass('grow');
                    return false;
                }
                else {
                    $('.media-tools-container').removeClass('grow');
                }
            });
        }

    };

    var epvid = -1;
    function epvreset() {
        zoom_reset();
        closeModals();
        epvid = -1;
        $('.media-tools-container > .btn').hide(0);
        video_ass = new assetManager('video');
        audio_ass = new assetManager('audio');
        interactive_ass = new assetManager('interactive');
        var pgdata = page_contents[BOOKTITLE][curpg];
        if (pgdata && pgdata['assets'])
            $.each(pgdata['assets'], assetLoaderP);

        $('.page-turner').removeClass('hide');
        $('.btn-epv-wrapper').removeClass('visible');

        $('a.btn.pageloader').css("pointer-events", "").css("cursor", "");
    }
    function epvload(index) {
        drawoff();//the art scales, but the pen doesn't
        var epvs = page_contents[BOOKTITLE][curpg]['epv'];
        epvid = (index + 1);
        if (epvid >= epvs.length) {
            epvreset();
            return;
        }
        epvloaditem(epvs[epvid]);
    }
    function epvloaditem(epv) {
        if (epv) {
            $('.media-tools-container > .btn').hide();
            if (epv['disable_nav']) {
                $('a.btn.pageloader').css({"pointer-events": "none", "cursor": "default"});
            }
            else {
                $('.page-turner').addClass('hide');
                $('.btn-epv-wrapper').addClass('visible');
            }
            closeModals();
            video_ass = new assetManager('video');
            audio_ass = new assetManager('audio');
            interactive_ass = new assetManager('interactive');
            if (epv['assets'])
                $.each(epv['assets'], assetLoader);
            epv_zoom(epv['hotspot']);
        } else {
            epvreset();
        }
    }

    $(document).ready(function() {
        $('.btn-epv .prev').on('click', function() {
            if (epvid > 0) {
                epvload(epvid - 2);
                return false;
            }
        });
        $('.btn-epv .next').on('click', function() {
            epvload(epvid);
            return false;
        });
        $('.btn-epv').on('click', function() {
            epvreset();
            return false;
        });
        $('body').on('keyup', function(e) {
            if ($(e.target).is('body')) {
                if (e.keyCode == 78) {//n
                    epvload(epvid);//base 1 array meets base 0 math
                } else if (e.keyCode == 80) { //p
                    if (epvid > 0) {
                        epvload(epvid - 2);
                    }
                } else if (e.keyCode == 65) { //a
                    $('.page-turner .btn-left').click();
                } else if (e.keyCode == 83) { //s
                    $('.page-turner .btn-right').click();
                }
            }
        });
    });


    var curpg, currbook, prevPg, prevBook;
    function pageload(pg, bk) {

        //cleanup
        epvid = -1;

        if (hotMode) {
            epvreset();
            $('.btn-hotspots').removeClass('current');
            hotspotReset();
            drawoff();
        }
        else {
            zoom_reset();
        }

        menuHide();
        closeModals('page');

        if (bk && BOOKTITLE !== bk) {
            BOOKTITLE = bk;
            $('#ebookselector .btn-active').removeClass('btn-active');
            $('#ebookselector a[book="' + cleanStr(bk) + '"]').addClass('btn-active');
        }
        if (bk == null) {
            bk = BOOKTITLE;
        }
        if (currbook == null) {
            currbook = BOOKTITLE;
        }
        if (pg === '#') {
            pg = curpg;
        }

        //find the HREF in the page list
        var pgdata = page_contents[BOOKTITLE][pg];
        //UNITNUM is not getting set for the in page change.
        //Component id is not getting set anywhere.
        if (UNITTITLE !== "" && UNITTITLE !== undefined) {
            $('#unitnum').html(UNITTITLE);
        } else {
            setUnitTitle(pg);
        }
        $("title").html(pgdata["title"]);
        //if you want to have a page flipping effect, it would have to happen around here
        //there might be issues if the flipper requires both pages to actually exist at
        //the same time. Possibly: move the current data to old, the new in, then flip it,
        //then clear the old data
        $("#data").html(pgdata["data"]);
        //assets
        $('.media-tools-container > .btn').hide();
        
        video_ass = new assetManager('video');
        audio_ass = new assetManager('audio');
        interactive_ass = new assetManager('interactive');
        if (pgdata['assets'])
            $.each(pgdata['assets'], assetLoaderP);
        epv = 0;
        if (pgdata['epv']) {
            $('.media-tools-container .btn-epv').show();
        }

        //would be great to be able to get the actual next in the array values
        //would be required if pg not a number
        pg = Number(pg);
        var bn = $('.page-turner');
        var bookPages = page_contents[BOOKTITLE][pg]["pages"].split('-');

        // added capability for single page views:
        bn.find('.page-num-1').html(bookPages[0]);
        bn.find('.btn-left').attr('href', Math.max(1, pg - 1));

        if (bookPages.length > 1) {
            bn.find('.page-num-2').html(bookPages[1]).show();
            bn.find('span#amp').show();
        }
        else if (bookPages.length == 1) { // single page
            bn.find('.page-num-2').html('').hide();
            bn.find('span#amp').hide();
        }

        if (page_contents[BOOKTITLE][pg + 1]) {
            bn.find('.btn-right').attr('href', pg + 1).attr('unit', '');//TODO: this unit title is wrong
        } else {
            //bn.find('.btn-right').attr('href', 1).attr('unit', '');
            bn.find('.btn-right').attr('href', pg).attr('unit', '');
        }

        //save restore notes, drawing.
        if (curpg) {
            //still not entirely sure if TITLEMAN would like a user id or if it switches based on logins.
            if (window.TITLEMANAGER && window.TITLEMANAGER.localStorage) {
                if ($('#drawlayer').html()) {
                    TITLEMANAGER.localStorage.put(currbook + curpg + "i", $('#drawlayer').html());
                } else {
                    TITLEMANAGER.localStorage.delete(currbook + curpg + "i");
                }
                if ($('#user_notes').html()) {
                    TITLEMANAGER.localStorage.put(currbook + curpg + "n", $('#user_notes').html());
                } else {
                    TITLEMANAGER.localStorage.delete(currbook + curpg + "n");
                }
            } else {
                localStorage[currbook + curpg + "i"] = $('#drawlayer').html();
                localStorage[currbook + curpg + "n"] = $('#user_notes').html();
                //could also clear these when not set, save a bit of space
            }
        }

        //cleanup
        $('#user_notes').html('');
        $('#user_notes_txtarea').val('');
        $('#data img:last').load(function() {
            //should only need to do this once
            ns.clear();
            if (hotMode) {
                drawHotspot($('#canvasDiv').width(), $('#canvasDiv').height(), pg);
            }
            $('.btn-notes').removeClass('has-data');


            if (window.TITLEMANAGER && window.TITLEMANAGER.localStorage) {
                TITLEMANAGER.localStorage.get(bk + pg + "i").then(function(img) {
                    if (typeof img !== 'undefined') {
                        $('#drawlayer').html(img);
                    }
                });
            } else {
                var img = localStorage[bk + pg + "i"];
                if (img) {
                    $('#drawlayer').html(img);
                    //will no longer stretch to match new screen size. Ironically, given svg.
                }
            }
            if (window.TITLEMANAGER && window.TITLEMANAGER.localStorage) {
                TITLEMANAGER.localStorage.get(bk + pg + "n").then(function(notes) {
                    if (typeof notes !== 'undefined') {
                        $('div#user_notes').html(notes);
                        $('.btn-notes').addClass('has-data');
                    }
                });
            } else {
                var notes = localStorage[bk + pg + "n"];
                if (notes) {
                    $('div#user_notes').html(notes);
                    $('.btn-notes').addClass('has-data');
                }
            }


            $('#data img').attr('draggable', false);//there is a css command for that.

            prevPg = curpg;
            prevBook = currbook;
            
            curpg = pg;
            currbook = bk;
            
            // disable/grey out book links if there's no mapping...
            $('a.btn.btn-ab.pageloader[book!="'+currbook+'"]').addClass('deactivated');
            var books = Object.keys(page_contents);
            var pg_link = page_contents[BOOKTITLE][curpg]['pg_link'];
            
            if(typeof pg_link !== 'undefined' && $.isArray(pg_link)) {
            	$.each(pg_link, function(k, v){
					if(typeof books[v.bookID] !== 'undefined') {
						var pgs = v.pageNum.split(',');
						$.each(page_contents[books[v.bookID]], function(k2, v2){
							if(typeof v2 !== 'undefined' && v2.pages) {
								var bpages = v2.pages.replace(/\s+/g, '').split('-');
								if(bpages.indexOf(pgs[0]) >= 0) {
									// book & page exists
									$('a.btn.btn-ab.pageloader[book="'+books[v.bookID]+'"]').removeClass('deactivated');
								}
							}
						});
					}
				});
            }
            // add auto backlink even if not explicitly defined in manifest
            if(prevBook != currbook && prevBook != null && typeof prevBook !== 'undefined') {
            	$('a.btn.btn-ab.pageloader[book="'+prevBook+'"]').removeClass('deactivated');
            }
            
        });
    }

    function drawHotspot(width, height, curpg) {
        var c = document.getElementById('hotspotCanvas');
        c.width = width;
        c.height = height;
        var context = c.getContext('2d');
        context.fillStyle = "rgba(66,49,74, 0.7)";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        var epvs = page_contents[BOOKTITLE][curpg]['epv'];
        if (epvs)
            for (var x = 0; x < epvs.length; x++) {
                var epv = epvs[x];
                //is there a defined hotspot?
                if (epv['hotspot']) {
                    var spot = epv['hotspot'];

                    // get ratio of current dimensions vs real dimensions:
                    var img = $('#data img:first');
                    var offset = img.offset();
                    var baseimg = img[0];
                    var rh = baseimg.height / baseimg.naturalHeight;
                    var rw = baseimg.width / baseimg.naturalWidth;

                    var hotspotHeight = (spot[3] - spot[1]) * rh;
                    var hotspotWidth = (spot[2] - spot[0]) * rw;

                    var hotspotX = (spot[0] * rw) + (offset.left / scale);
                    //the new margin for the tools is pushing everything over. This is not reflected in the offset
                    hotspotX = hotspotX - ($("#pagecontent").position().left / scale);
                    var hotspotY = (spot[1] * rh); /*+ offset.top*/

                    //Cut out the hotspot
                    context.clearRect(hotspotX, hotspotY, hotspotWidth, hotspotHeight);

                    // Draw the hotspot
                    context.beginPath();
                    context.lineWidth = 3;
                    context.strokeStyle = '#73cf30';

                    context.rect(hotspotX, hotspotY, hotspotWidth, hotspotHeight);
                    context.stroke();
                }
            }
    }

    function cleanStr(str) {
        return str.replace(/['"\-\=\+\_\!\~\@\[\]\&\^%()\{\}; ]/g, '');//not efficient
    }

    function siteload() {
        //set up the buttons
        //I think this might be page related
        $('.media-tools-container > .btn').hide();


        //setup the menu
        //using the full manifest
        var _info_wrapper_id = 0;
        $.each(manifest["Components"], function(index, component) {
            if ('ebook' === component['type']) {

                var book = component['title'];
                var cb = cleanStr(book);//Cerulean Blue is a gentle breeze
                //page_contents[cb] = pages;
                if (!BOOKTITLE)
                    BOOKTITLE = cb;//the first one.

                var str = '<div id="tab' + cb + '" class="work-book-container tab scrollcontent">' +
                        '<div class="scroll-pane">' +
                        '<ul class="scroll" id="BookList' + cb + '">';
                $.each(component['unit_contents'], function(uid, unit) {

                    if (!page_contents[cb]) {
                        page_contents[cb] = [];
                    }
                    $.extend(page_contents[cb], unit['page_contents']);
                    //this merges all the pages into one list, enabling the next button between the Units.
                    //just assign it to restrict it to the unit.

                    str = str + '<li>' +
                            '<a class="unit" book="' + cb + '" unit="' + uid + '" >' +
                            '<i></i><span>' + unit['title'] + '</span>' +
                            '</a>' +
                            '<ul>';
                    $.each(unit['page_contents'], function(id, page) {
                        _info_wrapper_id++;
                        str = str + '<li data-info-id="' + _info_wrapper_id + '"><a class="pageloader menuItem" book="' + cb + '" unit="' + unit['title'] + '" href="' + id + '"><span>' + page['title'] + '</span><span class="pagenumbers">p' + page['pages'] + '</span></a></li>';
                    });
                    str = str +
                            '</ul>' +
                            '</li>';
                });
                str = str +
                        '</ul>' +
                        '</div>' +
                        '<div class="pages-tabs-scroller" data-num="0">' +
                        '<a class="pages-tab-scrolltop"></a>' +
                        '<a class="pages-tab-scrollbottom"></a>' +
                        '</div>' +
                        '</div>';
                $('#pages .back-content').prepend(str);
                $('#pages .select-options').append('<a class="btn btn-pupil-book" data-target="tab' + cb + '">' + book + '</a>');

                $('#ebookselector').append('<a class="btn btn-ab pageloader book-' + cb + '" book="' + cb + '" href="#" title="'+ book + '">' + ((typeof component['abbv'] !== 'undefined')?component['abbv']:book[0]+'B') + '</a>');

            } else if (component['loader']) {

                var title = component['title'];
                var ct = cleanStr(title);
                var classname = title.replace(/\s+/g, '-').toLowerCase();
                var str = '<div id="tab' + ct + '" class="work-book-container tab scrollcontent">' +
                        '<div class="scroll-pane">' +
                        '<ul class="scroll" id="BookList' + ct + '">';
                $.each(component['contents'], function(title, val) {
                    str = str + '<li data-info-id="' + val + '" class="dialogpopper ' +
                            component['loader'] +
                            '"><a class="menuItem"><span style="width:100%">' + title + '</span></a></li>';
                });
                str = str +
                        '</ul>' +
                        '</li>';
                str = str +
                        '</div>' + '<div class="pages-tabs-scroller" data-num="0">' +
                        '<a class="pages-tab-scrolltop"></a>' +
                        '<a class="pages-tab-scrollbottom"></a>' +
                        '</div>' +
                        '</div>';
                $('#pages .back-content').prepend(str);
                $('#pages .select-options').append('<a class="btn btn-'+classname+'" data-target="tab' + ct + '">' + title + '</a>');
            } else if('teachertool' === component['type']) {
            	var title = component['title'];
                var ct = cleanStr(title);
                var classname = title.replace(/\s+/g, '-').toLowerCase();
                var _target;
                switch(title){
                    case 'Vocabulary Tool':
                        _target = 'dialog-vt';
                        _width = 1030;
                        break;
                    case 'Dialogue Tool':
                        _target = 'dialog-dt';
                        _width = 1100;
                        break;
                    case 'Story Tool':
                        _target = 'dialog-st';
                        _width = 1080;
                        break;
                    case 'Grammar Tool':
                        _target = 'dialog-gt';
                        _width = 1100;
                        break;    
                    default:
                        break;    
                }
                var str = '<div id="tab' + ct + '" class="work-book-container tab">' +
                        '<div class="scroll-pane">' +
                        '<ul class="scroll" id="BookList' + ct + '">' +
//                        '<li><a href="'+component['url']+'" target="'+((component['newWindow']==='true')?"_blank":"_self")+'"><span>' + title + '</span></a></li>' +
                        '<li><a data-dialog="true" xdata-dialog-resizable="1" data-src="'+component['src']+'" data-dialog-title="'+title+'" data-dialog-modal="1" data-target="'+_target+'" data-dialog-width="'+_width+'" data-dialog-height="100%"><span>' + title + '</span></a></li>' +
                        '</div>' +
                        '</div>';
                $('#pages .back-content').prepend(str);
                $('#pages .select-options').append('<a class="btn btn-'+classname+' teacherstool" data-target="tab' + ct + '">' + title + '</a>');
            } else {
                var title = component['title'];
                var ct = cleanStr(title);
                var classname = title.replace(/\s+/g, '-').toLowerCase();
                var str = '<div id="tab' + ct + '" class="work-book-container tab">' +
                        '<div class="scroll-pane">' +
                        '<ul class="scroll" id="BookList' + ct + '">' +
                        '<li><span>Content for ' + title + ' coming soon!</span></a></li>' +
                        '</div>' +
                        '</div>';
                $('#pages .back-content').prepend(str);
                $('#pages .select-options').append('<a class="btn btn-'+classname+'" data-target="tab' + ct + '">' + title + '</a>');
            }
        });
        $('#pages .tab:last').addClass('tab-show');
        $('#pages .pages-tab-menu .btn:first').addClass('btn-shown');
        // highlight selected book across all menus
        $('#ebookselector a[book="' + BOOKTITLE + '"]').addClass('btn-active');
        $('.panel .selected').text($('.select-options a[data-target="tab' + BOOKTITLE + '"]').text());
        changeMenu($('.select-options a[data-target="tab' + BOOKTITLE + '"]'));
        scrollRefresh();

        $('.back-content').on('click', '.unit', function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).parents('li').toggleClass('shown');
            updateScrollEventOf($(this));

            if ($(this).parents('li').hasClass('shown')) {
                if ($('body > .info-wrapper').length) {
                    var $this = $('body > .info-wrapper');
                    $('.entry:eq(' + (parseInt($this.attr('data-panel'))) + ') .scroll > li:eq(' + (parseInt($this.attr('data-index'))) + ')').append($this);
                }
            }
            return false;
        });

        $('.back-content').on('click', '.dialogpopper', function(e) {
            e.stopPropagation();
            e.preventDefault();
            //close the menu?
            //setup the dialog's src attr
            if ($(this).hasClass('interactive')) {
                $(this).attr('data-target', 'dialog-karaoke');
                $(this).attr('data-dialog-title', 'Song Activity');
                $(this).attr('data-dialog-modal', '1');
                $(this).attr('data-dialog-width', '1004');
                $(this).attr('data-dialog-height', '704');
                $('iframe#iFrame-rcf-k').attr('src', './rcf/index.html?snippetID=' + $(this).data('info-id') + '&karaoke=1');
                generic_dialog_open($(this));
            } else //if ($(this).hasClass('video'), only 2 for now 
            {
                //or get another function from asset_audio that expects just a file.
                $("#videoPlayer").attr("data-video-src", $(this).data('info-id'));
                $('a#showVideoScript').hide();
                $('#videoScript').hide();
                video_dialog_open($(this));
            }
            //open the dialog
            return false;
        });

        //scroll up and down the pages
//    $('.pages-tab-scrolltop').on('mouseup', function() {
        //disabled on init
        //there is no where to scroll up
//        scrollUpDown('up', $(this));
//    });
        $('#pages .pages-tab-scrollbottom').bind('mouseup', function() {
            scrollUpDown('down', $(this));
        });
				
		//set the logo and color
		if (manifest['logo']) {
			$('#logo img').attr('src', manifest['logo']);
		}
		if (manifest['colour']) {
			$('#header').css('border-bottom-color', manifest['colour']);
		}
    }
    var _old_note; // needed for the save warning.
    
    //INIT
    $(document).ready(function() {

        //prep the page from the manifest
        siteload();

        //$('.pageloader:not(.deactivated)').click(function(e) {
        $('body').on('click', '.pageloader:not(.deactivated, .btn-active)', function(e) {
            e.preventDefault();
            if ($(this).hasClass('btn-ab')) {
                $('.panel .selected').text($('.select-options a[data-target="tab' + $(this).attr('book') + '"]').text());
                changeMenu($('.select-options a[data-target="tab' + $(this).attr('book') + '"]'));
            }
            UNITTITLE = $(this).attr('unit');
            //pageload($(this).attr('href'), $(this).attr('book'));
            if ($(this).attr('href') === '#' && page_contents[BOOKTITLE][curpg] && page_contents[BOOKTITLE][curpg]['pg_link'] && !$(this).hasClass('btn-active')) {
				var index = null;
				// first grab which object in pg_link to link for $(this).attr('book')
				var books = Object.keys(page_contents);
				//get the index (ID) of the book
				var bkIndex = books.indexOf($(this).attr('book'));
				var pgs;
				$.each(page_contents[BOOKTITLE][curpg]['pg_link'], function(k, v){
					if (v.bookID == bkIndex) {
						pgs = v.pageNum.split(',');
						return false;
					}
				});
				
				//var pgs = page_contents[BOOKTITLE][curpg]['pg_link'].pageNum.split(',');
				//var toBook = page_contents[BOOKTITLE][curpg]['pg_link'].bookID;
				
				/*if (pgs.length > 1) {
					var books = Object.keys(page_contents);
					//remove this book from the indexes
					books.splice(books.indexOf(BOOKTITLE),1);
					//get the index of the remaining books
					index = books.indexOf($(this).attr('book'));
				}*/

				if(typeof pgs !== 'undefined') {
					$.each(page_contents[$(this).attr('book')], function(k, v){
						if(typeof v !== 'undefined' && v.pages) {
							var bpages = v.pages.replace(/\s+/g, '').split('-');
							if(bpages.indexOf(pgs[0]) >= 0) {
								index = k;
								return false;
							}
						}
					});
				}
				if(index !== null) {
					pageload(index, $(this).attr('book'));
				}
				else if(typeof page_contents[prevBook][prevPg] !== 'undefined' && page_contents[prevBook][prevPg] && prevBook == $(this).attr('book')) {
					// reverse page link even if not specified in manifest 
					if ($(this).hasClass('btn-ab') && $(this).attr('href') === '#') {
		            	pageload(prevPg, prevBook);
		            }
				}
				else {
					// page not found in specified book... do nothing
					return false;
				}
			}
            else if ($(this).hasClass('btn-ab') && $(this).attr('href') === '#' && typeof page_contents[prevBook][prevPg] !== 'undefined' && page_contents[prevBook][prevPg]) {
            	// reverse page link even if not specified in manifest
            	pageload(prevPg, prevBook);
            }
            else { // page turn arrows
				pageload($(this).attr('href'), $(this).attr('book'));
			}

            $('.flip-overlay, #pages').fadeOut();

            return false;
        });

        //Need to set BOOKTITLE, then pageload()
        //load the first page
        pageload(STARTPAGE || "1");

        $('button.edit-data').click(function() {
            $('div#user_notes').hide();
            $('textarea#user_notes_txtarea').val($('div#user_notes').text());
            $('textarea#user_notes_txtarea').show();
            $('button.edit-data').hide();
            $('textarea#user_notes_txtarea').focus();
            $('button.save-data').show();

            //unbind the dialog close event on the close button
            $('.dialog-note-dialog .ui-dialog-titlebar-close').unbind().click(function() {

                //get the new note to compare against the old note
                _new_note = $('textarea#user_notes_txtarea').val();
                var $self = $(this);
                var $self_dialog = $self.parents('.ui-dialog');

                if (_new_note == _old_note) {
                    //if same
                    //just close the dialog
                    $('#dialog-note').dialog('close');
                } else {
                    $('#dialog-note-warning').dialog({
                        title: '',
                        position: [$self_dialog.offset().left + (($self_dialog.width() - 300) / 2), $self_dialog.offset().top + (($self_dialog.height() - 136) / 2)],
                        modal: true,
                        resizable: false,
                        open: function(e, ui) {
                            var $this = $(this);
                            $this.parents('.ui-dialog').addClass('save-confirm-dialog');
                            $this.on('click', function(e) {
                                var id = $(e.target).attr('id');

                                if ('b1' == id) {
                                    $('#dialog-note-warning').dialog('close');
                                    $('button.save-data').click();
                                    $('#dialog-note').dialog('close');
                                } else if ('b2' == id) {
                                    $('#dialog-note-warning').dialog('close');
                                    $('textarea#user_notes_txtarea').val($('div#user_notes').text());
                                    $('#dialog-note').dialog('close');
                                } else if ('b3' == id) {
                                    $('#dialog-note-warning').dialog('close');
                                    //$('#dialog-note').dialog('close');
                                }
                            });
                        }
                    });
                }
            });
        });

        $('button.save-data').click(function() {
            _old_note = $('textarea#user_notes_txtarea').val();

            $('textarea#user_notes_txtarea').hide();

            var replacedText = $('textarea#user_notes_txtarea').val();
            replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            replacedText = replacedText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
            replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
            replacedText = replacedText.replace(/\n/g, "<br/>\n");

            $('div#user_notes').html(replacedText);
            $('div#user_notes').show();
            $('button.save-data').hide();
            $('button.edit-data').show();

            // from above
            if ($('#user_notes').text()) {
                $('.btn-notes').addClass('has-data');
            } else {
                $('.btn-notes').removeClass('has-data');
            }
            //$('#dialog-note').dialog('close');
            // end

            // save to db:
            var notes = replacedText;
            if (curpg) {
                if (window.TITLEMANAGER && window.TITLEMANAGER.localStorage) {
                    TITLEMANAGER.localStorage.put(currbook + curpg + "n", notes);
                } else {
                    localStorage[currbook + curpg + "n"] = notes;
                    //could also clear these when not set, save a bit of space
                }
                //success
                $('#dialog-note').append('<div class="alert alert-success">Saved</div>').find('.alert').css({
                    'margin-left': $('#dialog-note .alert').outerWidth(true) * -0.5,
                    'margin-top': $('#dialog-note .alert').outerHeight(true) * -0.5 - $('.dialog-note-dialog .ui-dialog-titlebar').outerHeight() / 2
                }).animate({
                    opacity: 1
                }).delay(1000).promise().done(function() {
                    $('#dialog-note .alert').animate({
                        opacity: 0
                    }, function() {
                        $(this).remove();
                    });
                });

            }

        });

        $('#pages a.menuItem').click(function() {
            $('#pages, .flip-overlay').fadeOut();
            $('.info-wrapper-close').trigger('click');
        });

    });

}

//check if RCF dialog is open:
function isDialogOpen() {
	if($("#dialog-interactive").hasClass("ui-dialog-content") && $("#dialog-interactive").dialog( "isOpen" ) === true) {
		return true;
	}
	else {
		return false;
	}
}

var change_int;
var dt_route_params;
var gt_route_params;
var st_object;
//var current_app = app;
var app;
var current_app;

function getCurrApp(current_app) {
	if(current_app.indexOf('slideshow') != -1){
        current_app = 'slideshow';
	}
    else if(current_app.indexOf('spotlight') != -1){
    	current_app = 'flashcards_spotlight';
	}
    else if(current_app.indexOf('disort') != -1){
    	current_app = 'flashcards_disort';
	}
    else if(current_app.indexOf('flash') != -1){
    	current_app = 'flashcards_flash';
    }
    else if(current_app.indexOf('wordmaze') != -1){
    	current_app = 'wordmaze';
    }
    else if(current_app.indexOf('pelmanism') != -1){
    	current_app = 'pelmanism';
    }
    else if(current_app.indexOf('pic_dic') != -1){
    	current_app = 'pic_dic';
    }
	return current_app;
}

function addBackButtonEvent(tool){

	$('.dialog-'+tool+'-dialog .header-back-button').removeClass('disabled');
	$('.dialog-'+tool+'-dialog .header-back-button').unbind('click');
   
	if($('.ui-dialog').find('iframe').contents().find('body').hasClass('activity-selector') && 1==2){  // not sure what this is for...
			$('.ui-dialog .header-home').click();
	}
	else {
		if($('.ui-dialog:visible').hasClass('dialog-vt-dialog') && tool == 'vt') {
			$('.dialog-vt-dialog .header-back-button').click(function(e){
				e.preventDefault();

				$('.header-gear').hide();
				var current_app = $('.ui-dialog').find('iframe').contents().find('body').attr('class');
				current_app = getCurrApp(current_app);
				var apps = ['unit-selector', 'activity-selector', 'slideshow', 'flashcards_spotlight', 'flashcards_disort', 'flashcards_flash', 'wordmaze', 'pelmanism', 'pic_dic'];
				app = apps[apps.indexOf(current_app) - 1];
				switch (app) {
					case "unit-selector":
						$('.ui-dialog.dialog-vt-dialog').find('iframe#iFrame-vt').attr('src', './teacherstools/vocab/vocabApp.html');
						$('.dialog-vt-dialog .header-back-button').unbind().addClass('disabled');
						$('.dialog-vt-dialog .header-forward-button').unbind().addClass('disabled');
						break;
					case "activity-selector":
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.unit-menu .unit-next-bt").click();
						//$('.header-back-button').unbind().addClass('disabled');
						//$('.header-forward-button').unbind().addClass('disabled');
						break;
					case "flashcards":
					case "slideshow":
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.flashcars").click();
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-activity-vocapp .unit-op.flashcards").click();
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-flashcards-vocapp .unit-op [mode=slideshow]").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-menu [mode=slideshow]").click();
						//$('.ui-dialog').find('iframe').contents().find(".ico-bt.mode [mode=slideshow]").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-app, .vocapp.flashcards-app .prev-bt, .vocapp.flashcards-app .next-bt, .vocapp.flashcards-app .image-container, .vocapp.flashcards-app .container-bt, .vocapp.flashcards-app .image-container img").show();
						break;
					case "flashcards_spotlight":
					case "spotlight":	
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.flashcars").click();
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-activity-vocapp .unit-op.flashcards").click();
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-flashcards-vocapp .unit-op [mode=spotlight]").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-menu [mode=spotlight]").click();
						//$('.ui-dialog').find('iframe').contents().find(".ico-bt.mode [mode=spotlight]").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-app, .vocapp.flashcards-app .prev-bt, .vocapp.flashcards-app .next-bt, .vocapp.flashcards-app .image-container, .vocapp.flashcards-app .container-bt, .vocapp.flashcards-app .image-container img").show();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.iframe").hide();
						break;
					case "flashcards_disort":
					case "disort":
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.flashcars").click();
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-activity-vocapp .unit-op.flashcards").click();
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-flashcards-vocapp .unit-op [mode=disort]").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-menu [mode=disort]").click();
						//$('.ui-dialog').find('iframe').contents().find(".ico-bt.mode [mode=disort]").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-app, .vocapp.flashcards-app .prev-bt, .vocapp.flashcards-app .next-bt, .vocapp.flashcards-app .image-container, .vocapp.flashcards-app .container-bt, .vocapp.flashcards-app .image-container img").show();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.iframe").hide();
						break;
					case "flashcards_flash":
					case "flash":
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.flashcars").click();
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-activity-vocapp .unit-op.flashcards").click();
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-flashcards-vocapp .unit-op [mode=flash]").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-menu [mode=flash]").click();
						//$('.ui-dialog').find('iframe').contents().find(".ico-bt.mode [mode=flash]").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-app, .vocapp.flashcards-app .prev-bt, .vocapp.flashcards-app .next-bt, .vocapp.flashcards-app .image-container, .vocapp.flashcards-app .container-bt, .vocapp.flashcards-app .image-container img").show();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.iframe").hide();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find("#choose-more").hide();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".modal-overlay").hide();
						break;
					case "wordmaze":
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-activity-vocapp .unit-op.wordmaze").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.wordmaze").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
						break;
					case "pelmanism":
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-activity-vocapp .unit-op.pelmanism").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.pelmanism").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
						break;
					case "pic_dic":
						//$('.ui-dialog').find('iframe').contents().find(".dropdown-activity-vocapp .unit-op.picture").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.picture").click();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find("#choose-more").hide();
						$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".modal-overlay").hide();
						break;
				}
			});
		}
		else if($('.ui-dialog:visible').hasClass('dialog-dt-dialog') && tool == 'dt'){
	
			var apps = ['submenu', 'dialogue', 'reinforcement', 'ordering'];
	
			$('.dialog-dt-dialog .header-back-button').click(function(){
	
				if(apps.indexOf(current_app) > -1) {
					var next_app = apps[apps.indexOf(current_app)-1];
					if(next_app == 'submenu') {
						$('#iFrame-dt').attr('src', './teacherstools/dialogue/index.html#/activities/' + dt_route_params.unitId);
					}
					else {
						document.getElementById('iFrame-dt').contentWindow.loadActivity(next_app, dt_route_params.unitId);
					}
				}
				else if($('.ui-dialog.dialog-dt-dialog').find('iframe').contents().find('body').hasClass('activitiescontroller')) {
					$('.ui-dialog.dialog-dt-dialog').find('iframe#iFrame-dt').attr('src', './teacherstools/dialogue/index.html');
					$('.dialog-dt-dialog .header-back-button').unbind().addClass('disabled');
				}
				else if($('.dialog-dt-dialog .ui-dialog').find('iframe').contents().find('body').hasClass('homecontroller')) {
					// do nothing
				}
	
			});
			/*
				if(apps.indexOf(current_app) == 0){
					$('.header-back-button').unbind().addClass('disabled');
				$('.header-forward-button').unbind().addClass('disabled');
				}
			*/
		}
		else if($('.ui-dialog:visible').hasClass('dialog-gt-dialog') && tool == 'gt'){

			var apps = ['submenu', 'dialogue', 'interactive', 'reinforcement', 'extension'];
			
			$('.dialog-gt-dialog .header-back-button').click(function(){
				
				if(apps.indexOf(current_app) > -1) {
					var next_app = apps[apps.indexOf(current_app)-1];
					if(next_app == 'submenu') {
						$('#iFrame-gt').attr('src', './teacherstools/grammar/index.html#/activities/' + gt_route_params.unitId);
					}
					else {
						document.getElementById('iFrame-gt').contentWindow.loadActivity(next_app, gt_route_params.unitId);
					}
				}
				else if($('.ui-dialog.dialog-gt-dialog').find('iframe').contents().find('body').hasClass('activitiescontroller')) {
					$('.ui-dialog.dialog-gt-dialog').find('iframe#iFrame-gt').attr('src', './teacherstools/grammar/index.html');
					$('.dialog-gt-dialog .header-back-button').unbind().addClass('disabled');
				}
				else if($('.dialog-gt-dialog .ui-dialog').find('iframe').contents().find('body').hasClass('homecontroller')) {
					// do nothing
				}

			});
			/*
			if(apps.indexOf(current_app) == 0){
				$('.header-back-button').unbind().addClass('disabled');
				$('.header-forward-button').unbind().addClass('disabled');
			}
			*/
		}
		else if($('.ui-dialog:visible').hasClass('dialog-st-dialog') && tool == 'st'){
	
			$('.dialog-st-dialog .header-back-button').click(function(){
				var _n = parseInt(st_object.currentActivityType)-1;
				
				if(st_object.currentActivityType >= 0) {
					if(_n >= 0) {
						document.getElementById('iFrame-st').contentWindow.loadActivity(_n, st_object.currentUnitId);
					}
					else {
						$('#iFrame-st').attr('src', './teacherstools/story/index.html#/activities/' + st_object.currentUnitId);
					}
				}
				else {
					$('.ui-dialog.dialog-st-dialog').find('iframe#iFrame-st').attr('src', './teacherstools/story/index.html');
					$('.dialog-st-dialog .header-back-button').unbind().addClass('disabled');
				}
			});
			/*
			if(typeof st_object !== 'undefined' && parseInt(st_object.currentActivityType)-1 == -2){
					$('.header-back-button').unbind().addClass('disabled');
				}
			*/
		}
		/*
		else {
			window.history.go(-1);
		}
		*/
	}

}

function addForwardButtonEvent(tool){
    
    $('.dialog-'+tool+'-dialog .header-forward-button').removeClass('disabled');
    $('.dialog-'+tool+'-dialog .header-forward-button').unbind('click');
    
    /*
     * if vocab dialog
     */
    if($('.ui-dialog:visible').hasClass('dialog-vt-dialog') && tool == 'vt'){
    
		var apps = ['activity-selector', 'slideshow', 'flashcards_spotlight', 'flashcards_disort', 'flashcards_flash', 'wordmaze', 'pelmanism', 'pic_dic'];

        if($('.ui-dialog').find('iframe').contents().find('body').attr('class') == 'pic_dic'){
            $('.dialog-vt-dialog .header-forward-button').unbind().addClass('disabled');
        }
        else{
            $('.dialog-vt-dialog .header-forward-button').click(function () {

                var current_app = $('.ui-dialog').find('iframe').contents().find('body').attr('class');
                current_app = getCurrApp(current_app);

                if (apps.indexOf(current_app) != -1) {
					app = apps[apps.indexOf(current_app) + 1];
					switch (app) {
						case "flashcards":
						case "slideshow":
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.flashcars").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-menu [mode=slideshow]").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
							break;
						case "flashcards_spotlight":
						case "spotlight":	
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.flashcars").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-menu [mode=spotlight]").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
							break;
						case "flashcards_disort":
						case "disort":	
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.flashcars").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-menu [mode=disort]").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
							break;
						case "flashcards_flash":
						case "flash":	
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.flashcars").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".vocapp.flashcards-menu [mode=flash]").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find("#choose-more").hide();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".modal-overlay").hide();
							break;
						case "wordmaze":
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.wordmaze").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
							break;
						case "pelmanism":
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.pelmanism").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
							break;
						case "pic_dic":
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".ico-bt.picture").click();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find('body').removeAttr('class').addClass(app);
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find("#choose-more").hide();
							$('.ui-dialog.dialog-vt-dialog').find('iframe').contents().find(".modal-overlay").hide();
							break;
					}
            	}
            });
        }
        
    }
    else if($('.ui-dialog:visible').hasClass('dialog-dt-dialog') && tool == 'dt'){
        
        var apps = ['submenu', 'dialogue', 'reinforcement', 'ordering'];
        
        $('.dialog-dt-dialog .header-forward-button').click(function(){
            var next_app = apps[apps.indexOf(current_app)+1];
            document.getElementById('iFrame-dt').contentWindow.loadActivity(next_app, dt_route_params.unitId);
        });
        
        if(apps.indexOf(current_app) == apps.length-1){
            $('.header-forward-button').unbind().addClass('disabled');
        }
        
    }
    else if($('.ui-dialog:visible').hasClass('dialog-gt-dialog') && tool == 'gt'){
        
        var apps = ['submenu', 'dialogue', 'interactive', 'reinforcement', 'extension'];
        
        $('.dialog-gt-dialog .header-forward-button').click(function(){
    		var next_app = apps[apps.indexOf(current_app)+1];
            document.getElementById('iFrame-gt').contentWindow.loadActivity(next_app, gt_route_params.unitId);
        });
        
        if(apps.indexOf(current_app) == apps.length-1){
            $('.header-forward-button').unbind().addClass('disabled');
        }
    }
    else if($('.ui-dialog:visible').hasClass('dialog-st-dialog') && tool == 'st'){
        
        $('.dialog-st-dialog .header-forward-button').click(function(){
            var _n = parseInt(st_object.currentActivityType)+1;
			document.getElementById('iFrame-st').contentWindow.loadActivity(_n, st_object.currentUnitId);
        });
        
        if(typeof st_object !== 'undefined' && parseInt(st_object.currentActivityType)+1 == 4){
        	$('.header-forward-button').unbind().addClass('disabled');
        }
    }
    
}

function iframe_change(tooltype, current, title, routeParams, app, story_object){
    
//    console.log('iframe src changed');
    
    $('#prevActivity, #nextActivity').hide();
    
    if(tooltype == 'st' || tooltype == 'dt' || tooltype == 'gt') {
    	if(tooltype == 'st') {
    		st_object = story_object;
    	} else if(tooltype == 'dt') {
    		dt_route_params = routeParams;
    		current_app = app;
    	} else if(tooltype == 'gt') {
    		gt_route_params = routeParams;
    		current_app = app;
    	}
    	if((tooltype == 'dt' && typeof app !== 'undefined' && app == 'ordering') || (tooltype == 'gt' && typeof app !== 'undefined' && app == 'extension') || (tooltype == 'st' && typeof st_object !== 'undefined' && st_object.currentActivityType == 3)){
            $('.header-forward-button').unbind().addClass('disabled');
        }
	    if(current && typeof current.$$route !== 'undefined'){ // story and dialogue/grammar tools
	        if(current.$$route.controller == 'HomeController'){
	            $('.header-back-button, .header-forward-button').addClass('disabled');
	            $('.header-back-button, .header-forward-button').unbind();
		            $('span.unitInfo').html('');
	            $('.header-home').addClass('active');
	        }
	        else if(current.$$route.controller == 'ActivitiesController') {
	        	$('.header-home').removeClass('active');
	        	addBackButtonEvent(tooltype);
	            addForwardButtonEvent(tooltype);
	        }
	        else{
	            $('.header-home').removeClass('active');
	            addBackButtonEvent(tooltype);
	            addForwardButtonEvent(tooltype);
	        }
	        if(current.$$route.controller == "ActivityController"){
	            $('#prevActivity, #nextActivity').show();
	        }
	        if(tooltype == 'st' && (current.params.activityType == 0 || current.params.activityType == 1)) {
	        	$('.header-tips').show();
	        	if($('.ui-dialog .dialog-st-dialog').find('iframe').contents().find('.modal-smart-tips').hasClass('ng-hide')) {
	        		$('.header-tips').removeClass('active');
	        	}
	        	else {
	        		$('.header-tips').addClass('active');
	        	}
	        }
	        else{
		    	$('.header-tips').hide();
	        }
        }
    }
    else{ // vocab tool
        if($('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('unit-selector')){ // home screen
             $('.header-back-button, .header-forward-button').addClass('disabled');
            $('.header-back-button, .header-forward-button').unbind();
            $('span.unitInfo').html('');
            $('.header-home').addClass('active');
        }
        else if($('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('activity-selector')){
        	$('.header-home').removeClass('active');
        	addBackButtonEvent('vt');
            addForwardButtonEvent('vt');
        	//$('.header-back-button, .header-forward-button').addClass('disabled');
            //$('.header-back-button, .header-forward-button').unbind();
        }
        else{
            $('.header-home').removeClass('active');
            addBackButtonEvent('vt');
            addForwardButtonEvent('vt');
        }
        
        if ($('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('slideshow') ||
        		$('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('spotlight') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('flashcards_spotlight') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('disort') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('flashcards_disort') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('flash') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('flashcards_flash') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('pic_dic')) {
            $('.header-gear').show();
        }
        else {
            $('.header-gear').hide();
        }
        
        if ($('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('slideshow') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('spotlight') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('flashcards_spotlight') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('disort') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('flashcards_disort') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('flash') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('flashcards_flash') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('wordmaze') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('pelmanism') ||
                $('.ui-dialog').find('iframe#iFrame-vt').contents().find('body').hasClass('pic_dic')) {
            $('#headerUnits').removeClass('disabled').addClass('enabled');
        }
        else {
            $('#headerUnits').removeClass('enabled').addClass('disabled');
        }
        
    }
    
    var _unit_info_text = '';
    
    if(title){
        _unit_info_text = title;
    }
    else{
        _unit_info_text = $('.ui-dialog:visible').find('iframe').contents().find('.vocapp:visible').find('.multipleUnits').text();
    }
    
//    console.log('unit____');
//    console.log(_unit_info_text);
    
    if(_unit_info_text != ''){
        $('.ui-dialog:visible').find('.unitInfo').text('- '+_unit_info_text);
    }
    
    //return $('.ui-dialog').find('iframe').contents().get(0).location.href;
};

function pCloseTip() {
	$('.ui-dialog.dialog-st-dialog').find('iframe').contents().find('.modal-smart-tips').addClass('ng-hide');
	$('.ui-dialog.dialog-st-dialog .header-tips').removeClass('active');
}

function pToggleTip(hideTip) {
	if(hideTip) {
		$('.ui-dialog.dialog-st-dialog .header-tips').removeClass('active');
	}
	else {
		$('.ui-dialog.dialog-st-dialog .header-tips').addClass('active');
	}
}

function toggleGear() {
	$('#headerGear').toggleClass('active');
}

function toggleUnitList() {
	$('#headerUnits').toggleClass('active');
}

function generic_dialog_open($self) {
    
    var $_this = $self;
    
    if ($('#dialog-extend-fixed-container .ui-dialog').hasClass($self.attr('data-target') + '-dialog')) {
        $('#dialog-extend-fixed-container .ui-dialog.' + $self.attr('data-target') + '-dialog').find('.ui-dialog-titlebar-restore').trigger('click');
    }
    else {
        
        var _pos = {};
        
        if($self.attr('data-target') == 'dialog-interactive' ||
                $self.attr('data-target') == 'dialog-karaoke' ||
                $self.attr('data-target') == 'dialog-help' ||
                $self.attr('data-target') == 'dialog-teacher-tips' ||
                $self.attr('data-target') == 'dialog-vt' ||
                $self.attr('data-target') == 'dialog-dt' ||
                $self.attr('data-target') == 'dialog-st' ||
                $self.attr('data-target') == 'dialog-gt'){
            _pos = {my: "center", at: "center", of: window};
        } else {
            
            
             
            if($('body').is('.left-handed')){
                _pos = {my: "right-70 bottom-20", at: "right top", of: $('#menu')};
            }
            else{
                _pos = {my: "left+70 bottom-20", at: "left top", of: $('#menu')};
            }
            
            if($('#menu').length){
                
            }
            else{
                _pos = {my: "center", at: "center", of: window};
            }
            
        }
        
        var _height = ($self.attr('data-dialog-height')) ? $self.attr('data-dialog-height') + 'px' : 'auto';
        
        if($self.data('target') == 'dialog-vt' ||
                $self.data('target') == 'dialog-st' ||
                $self.data('target') == 'dialog-dt' ||
                $self.data('target') == 'dialog-gt'){
            _height = $(window).innerHeight()*0.96;
        }
        
        $('.dialog#' + $self.attr('data-target')).dialog({
            title: $self.attr('data-dialog-title'),
            dialogClass: ($self.attr('data-class')) ? $self.attr('data-class') : $self.attr('data-target') + '-dialog',
            width: ($self.attr('data-dialog-width')) ? $self.attr('data-dialog-width') + 'px' : 'auto', //is tiny without this,
            height: _height, 
            modal: (parseInt($self.attr('data-dialog-modal')) == 1) ? true : false,
            position:_pos,
//            position: ((($self.attr('data-target') == 'dialog-interactive') || ($self.attr('data-target') == 'dialog-karaoke') || ($self.attr('data-target') == 'dialog-help') || ($self.attr('data-target') == 'dialog-teacher-tips')) ? {my: "center", at: "center", of: window} : (($('body').is('.left-handed')) ? {my: "right-70 bottom-20", at: "right top", of: $('#menu')} : {my: "left+70 bottom-20", at: "left top", of: $('#menu')})),
            resizable: ($self.attr('data-dialog-resizable') ? true : false),
            open: function(e, ui) {
                
                if(e.target.outerHTML.indexOf('dialog-dt') != -1 ||
                        e.target.outerHTML.indexOf('dialog-vt') != -1 ||
                        e.target.outerHTML.indexOf('dialog-st') != -1 ||
                        e.target.outerHTML.indexOf('dialog-gt') != -1){
                    
                    //var _iframe_src = $self.data('src');
                    var _iframe_src = $self.attr('data-src');
                    var _iframe_target = null;
                    var _tooltype = null;
                    
                    /*
                    if($(this).parents('.ui-dialog').find('.ui-dialog-titlebar .header-back-button').length == 0){
                        $(this).parents('.ui-dialog').find('.ui-dialog-titlebar').prepend('<a class="header-home"></a><a class="header-back-button disabled"></a><a class="header-forward-button disabled"></a>').append('<a id="headerUnits" class="header-units disabled"></a><a id="headerGear" class="header-gear" style="display:none;"></a><a id="headerTips" class="header-tips" style="display:none;"></a><img id="tipsLogo" src="./img/lato-logo-2.png" class="logo">');
                    }
                    */
                        
                    switch(e.target.id) {
                    	case "dialog-vt" :
                    		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar').prepend('<a class="header-home"></a><a class="header-back-button disabled"></a><a class="header-forward-button disabled"></a>').append('<a id="headerUnits" class="header-units disabled"></a><a id="headerGear" class="header-gear" style="display:none;"></a><img id="tipsLogo" src="./img/lato-logo-2.png" class="logo">');
                    		//listens to iframe load event
                            //$('.header-home').removeClass('active');
                            //gear icon
                            $('#headerGear').click(function(){
                                $('.ui-dialog').find('iframe').contents().find('.dropdown-vocapp-setting, .modal-overlay').toggle();
                                $(this).toggleClass('active');
                            });
                            //units selection icon
                            $('#headerUnits').click(function(){
                            	if($(this).hasClass('enabled')) {
                            		$('.ui-dialog').find('iframe').contents().find('.dropdown-unit-vocapp, .modal-overlay').toggle();
                                $(this).toggleClass('active');
                            	}
                            });
                            _iframe_target = 'iFrame-vt';
                            _tooltype = 'vt';
                    		break;
                    	case "dialog-dt" :
                    		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar').prepend('<a class="header-home"></a><a class="header-back-button disabled"></a><a class="header-forward-button disabled"></a>').append('<img id="tipsLogo" src="./img/lato-logo-2.png" class="logo">');
                    		_iframe_target = 'iFrame-dt';
                    		_tooltype = 'dt';
                    		break;
                    	case "dialog-st" :
                    		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar').prepend('<a class="header-home"></a><a class="header-back-button disabled"></a><a class="header-forward-button disabled"></a>').append('<a id="headerTips" class="header-tips" style="display:none;"></a><img id="tipsLogo" src="./img/lato-logo-2.png" class="logo">');
                    		//Story Tool smart tip toggle:
                            $('#headerTips').click(function(){
                                //$('.ui-dialog.dialog-st-dialog').find('iframe').contents().find('.modal-smart-tips').toggle();
                                if($(this).hasClass('active')) {
                                	$('.ui-dialog.dialog-st-dialog').find('iframe').contents().find('.modal-smart-tips').addClass('ng-hide');
                            		$(this).removeClass('active');
                            		var $scope = document.getElementById("iFrame-st").contentWindow.angular.element('#ngView').scope();
                            		$scope.$apply(function() {
                            			$scope.hideTip();
                            		});
                            	}
                            	else {
                            		$('.ui-dialog.dialog-st-dialog').find('iframe').contents().find('.modal-smart-tips').removeClass('ng-hide');
                            		$(this).addClass('active');
                            		var $scope = document.getElementById("iFrame-st").contentWindow.angular.element('#ngView').scope();
                            		$scope.$apply(function() {
                            			$scope.showTip();
                            		});
                            	}
                            });
                            _iframe_target = 'iFrame-st';
                            _tooltype = 'st';
                    		break;
                    	case "dialog-gt" :
                    		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar').prepend('<a class="header-home"></a><a class="header-back-button disabled"></a><a class="header-forward-button disabled"></a>').append('<img id="tipsLogo" src="./img/lato-logo-2.png" class="logo">');
                    		_iframe_target = 'iFrame-gt';
                    		_tooltype = 'gt';
                    		break;
                    	default :
                    		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar').prepend('<a class="header-home"></a><a class="header-back-button disabled"></a><a class="header-forward-button disabled"></a>').append('<img id="tipsLogo" src="./img/lato-logo-2.png" class="logo">');
                    		break;
                    }
                    
                    //unit info
                    var _title = $(this).parents('.ui-dialog').find('.ui-dialog-title').text();
                    $(this).parents('.ui-dialog').find('.ui-dialog-title').html(_title+'<span class="unitInfo"></span>');

                    $('.ui-dialog').find('iframe#' + _iframe_target).attr('src', _iframe_src);
                    
                    //reloads the iframe src on home button click
                    $('.ui-dialog .header-home').click(function(){
                        //$('.ui-dialog').find('iframe').attr('src', _iframe_src);
                        var tool = $self.data('target');
                        switch(tool) {
                        	case 'dialog-vt' :
                        		$('.ui-dialog').find('iframe#iFrame-vt').attr('src', './teacherstools/vocab/vocabApp.html');
                        		break;
                        	case 'dialog-st' :
                        		$('.ui-dialog').find('iframe#iFrame-st').attr('src', './teacherstools/story/index.html');
                        		break;
                        	case 'dialog-dt' :
                        		$('.ui-dialog').find('iframe#iFrame-dt').attr('src', './teacherstools/dialogue/index.html');
                        		break;
                        	case 'dialog-gt' :
                        		$('.ui-dialog').find('iframe#iFrame-gt').attr('src', './teacherstools/grammar/index.html');
                        		break;
                        	default :
                        		break;
                        }
                    });
                    
                    //back button refreshes the iframe src if it's on the activity selection page
                    addBackButtonEvent(_tooltype);
                    addForwardButtonEvent(_tooltype);
                    
                    $('.dialog#' + $self.attr('data-target')).dialogExtend({
                        'minimizable':true,
                        'minimize': function(e){
                        	if($('div#tools').length && $('div#menu').length){
                        		$('#dialog-extend-fixed-container').css('bottom', $('div#menu').height() + 'px').css('left', $('div#tools').width() + 'px');
                        	}
                            $('.ui-widget-overlay').hide();
                            $('#dialog-extend-fixed-container .ui-dialog .ui-dialog-titlebar').css('border-bottom', '0px');
                            $('#dialog-extend-fixed-container .ui-dialog .ui-dialog-titlebar-buttonpane .ui-dialog-titlebar-restore').css('margin-right', '12px');
                            //$('#dialog-extend-fixed-container .ui-dialog .ui-dialog-title').css('font-size', '14px');
                            $('#dialog-extend-fixed-container .ui-dialog .ui-dialog-title .unitInfo').hide();
                            $('#dialog-extend-fixed-container .ui-dialog .ui-dialog-titlebar #headerUnits').hide();
                            $('#dialog-extend-fixed-container .ui-dialog .ui-dialog-titlebar #headerGear').hide();
                            $('#dialog-extend-fixed-container .ui-dialog .ui-dialog-titlebar #headerTips').hide();
                            $('#dialog-extend-fixed-container .ui-dialog .ui-dialog-titlebar #tipsLogo').hide();
                            $('#dialog-extend-fixed-container .ui-dialog .ui-dialog-titlebar-restore').css({'-webkit-transform': 'scale(1.07, 1.07)', 'margin-top': '1px'});
                        },
                        'restore':function(e){
                        	$('.ui-dialog[aria-describedby="'+$(this).id+'"] .ui-dialog-titlebar').css('border-bottom', '4px #e40426 solid');
                        	$('.ui-dialog[aria-describedby="'+$(this).id+'"] .ui-dialog-titlebar-buttonpane .ui-dialog-titlebar-restore').css('margin-right', '17px');
                            //$('.ui-dialog[aria-describedby="'+$(this).id+'"] .ui-dialog-title').css('font-size', '22px');
                            $('.ui-dialog[aria-describedby="'+$(this).id+'"] .ui-dialog-title .unitInfo').show();
                            $('.ui-dialog[aria-describedby="'+$(this).id+'"] .ui-dialog-titlebar #headerUnits').show();
                            $('.ui-dialog[aria-describedby="'+$(this).id+'"] .ui-dialog-titlebar #headerGear').show();
                            $('.ui-dialog[aria-describedby="'+$(this).id+'"] .ui-dialog-titlebar #headerTips').show();
                            $('.ui-dialog[aria-describedby="'+$(this).id+'"] .ui-dialog-titlebar #tipsLogo').show();
                            $('.ui-dialog[aria-describedby="'+$(this).id+'"] .ui-dialog-titlebar-restore').css({'-webkit-transform': '', 'margin-top': ''});
                            $('.ui-widget-overlay').show();
                            addBackButtonEvent(_tooltype);
                            addForwardButtonEvent(_tooltype);
                        }
                    });
                    
                };
                
                // set iframe size for interactive activities:
                if ($self.attr('data-target') == 'dialog-interactive') {
                    $.when($('iframe#iFrame-rcf').width($('iframe#iFrame-rcf').contents().find('.activityContainer').css('max-width'))).done(function() {
                        if ($('iframe#iFrame-rcf').contents().find('body').height() > $('div#pagecontent').height()) {
                            $('iframe#iFrame-rcf').height($('div#pagecontent').height() * .9);
                            //$(this).dialog({height: $('div#pagecontent').height() * .9});
                        }
                        else {
                            $('iframe#iFrame-rcf').height($('iframe#iFrame-rcf').contents().find('body').height());
                            //$(this).dialog({height: $('iframe#iFrame-rcf').contents().find('body').height()});
                        }
                    });
                }
                else if ($self.attr('data-target') == 'dialog-karaoke') {
                    $.when($('iframe#iFrame-rcf-k').width($('iframe#iFrame-rcf-k').contents().find('.activityContainer').css('max-width'))).done(function() {
                        if ($('iframe#iFrame-rcf-k').contents().find('.activityContainer').height() > $('div#pagecontent').height()) {
                            $('iframe#iFrame-rcf-k').height($('div#pagecontent').height() * .9);
                            //$(this).dialog({height: $('div#pagecontent').height() * .9});
                        }
                        else {
                            $('iframe#iFrame-rcf-k').height($('iframe#iFrame-rcf-k').contents().find('.activityContainer').height());
                            //$(this).dialog({height: $('iframe#iFrame-rcf-k').contents().find('.activityContainer').height()});
                        }
                    });
                }
                else if ($self.attr('data-target') == 'dialog-answers') {
                    $('.btn-num').text('1st');
                    
                    $(this).css('max-height', $('div#pagecontent').height());
//                        $(this).width(function(){
//                            return $('form .col-md-1').outerWidth(true) + $('form .form-input').outerWidth(true);
//                        });
//                        $('form .form-input input').css({
//                            'width':$('form .form-input').outerWidth(true) - ($('form span.col-md-1').outerWidth(true))
//                        });
                }
                else if ($self.attr('data-target') == 'dialog-note') {

                    //get the old note saved in memory
                    _old_note = $('#user_notes').text();

                    if ($self.hasClass('has-data')) {
                        $('textarea#user_notes_txtarea').hide();
                        $('div#user_notes').show();
                        $('button.save-data').hide();
                        $('button.edit-data').show();
                    }
                    else {
                        $('button.edit-data').trigger('click');
                    }
                }
                else if ($self.attr('data-target') == 'dialog-help') {
                    $('iframe#iFrame-help').height($('div#pagecontent').height() * .95);
                    $('iframe#iFrame-help').width($self.attr('data-dialog-width'));
                }
                else if ($self.attr('data-target') == 'dialog-teacher-tips') {
                    $(this).css('max-height', $('div#pagecontent').height()).css('overflow', 'auto');
                }
                else if ($self.attr('data-target') == 'dialog-image') {
                    $(this).css('max-height', $('div#pagecontent').height()).css('overflow', 'auto');
                    $(this).css('max-width', $('div#pagecontent').width()).css('overflow', 'auto');
                    
                    $(this).find('img').css('height', $(this).height());
                    $(this).find('img').css('width', $(this).width());
                }
                //else if($self.attr('data-target') == 'dialog-timer') {
	                $('#invisibleAudioPlayer').jPlayer({
	                    ready: function() {
	                        $(this).jPlayer('setMedia', {
	                            mp3: 'sound/tick.mp3'
	                        });
	                    },
	                    preload: 'auto',
	                    swfPath: './js/jPlayer',
	                    supplied: 'mp3',
	                    loop: true
	                });
	                $('#invisibleAlertPlayer').jPlayer({
	                    ready: function() {
	                        $(this).jPlayer('setMedia', {
	                            mp3: 'sound/alert.mp3'
	                        });
	                    },
	                    preload: 'auto',
	                    swfPath: './js/jPlayer',
	                    supplied: 'mp3',
	                    loop: false
	                });
                //}
            },
            resize: function(e, ui) {
                if ($(this).is('#dialog-note')) {
                    $('#user_notes_txtarea, #user_notes').css({
                        'width': ui.size.width - parseInt($('#dialog-note').css('padding-right')) * 2,
                        'height': ui.size.height - 105
                    });
                }
                else if ($(this).is('#dialog-answers')) {

                    $(this).width(function() {
                        return $(this).parents('.ui-dialog').width() - 30;
                    });
                    /*
                    $('form div.form-input input').css({
                    	'width':$('form div.form-input').outerWidth(true) - ($('form span.col-md-1').outerWidth(true))
                	});
                	*/
                }
                else if($(this).is('#dialog-interactive')){
                    $('iframe', this).css({
                        'width':$(this).width(),
                        'height':$(this).height()*0.95
//                        'padding-bottom':'40px'
                    });
                }
                else if ($(this).is('#dialog-teacher-tips')) {
                	$(this).css({'width':'100%'});
                }
            },
            close: function() {
                clearInterval(change_int);
                // take off current class on .btn:
                $('.media-tools-container .btn.current[data-target="' + $(this).attr("id") + '"], .tools-container-2 .btn.current[data-target="' + $(this).attr("id") + '"]').removeClass('current');

                if($(this).attr('id') == 'dialog-vt' ||
                        $(this).attr('id') == 'dialog-dt' ||
                        $(this).attr('id') == 'dialog-st' ||
                        $(this).attr('id') == 'dialog-gt') {

                    switch($(this).attr('id')) {
	                	case "dialog-vt" :
                    $('#headerGear, #headerUnits').unbind();
	                		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar a#headerUnits').remove();
	                		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar a#headerGear').remove();
	                		_iframe_target = 'iFrame-vt';
	                		break;
	                	case "dialog-dt" :
	                		_iframe_target = 'iFrame-dt';
	                		break;
	                	case "dialog-st" :
	                		$('#headerTips').unbind();
	                		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar a#headerTips').remove();
	                		_iframe_target = 'iFrame-st';
	                		break;
	                	case "dialog-gt" :
	                		_iframe_target = 'iFrame-gt';
	                		break;
	                	default :
	                		break;
	                }
                    $('a.header-home, a.header-back-button, a.header-forward-button').unbind();
                    $(this).parents('.ui-dialog').find('.ui-dialog-titlebar a.header-home').remove();
            		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar a.header-back-button').remove();
            		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar a.header-forward-button').remove();
            		$(this).parents('.ui-dialog').find('.ui-dialog-titlebar img#tipsLogo').remove();
                    
            		if($('.ui-widget-overlay.ui-front').is(':visible')) {
            			$('.ui-widget-overlay.ui-front').hide();
            		}

            		$('.ui-dialog').find('iframe#' + _iframe_target).attr('src', '');
            		
            		if($self.data('from') == 'pagelevel') {
                    	$(this).dialog('close');
                    	//$(this).dialog('destroy');
                	}
                	else{
            			$(this).dialog('close');
					}
                    //$(this).dialog('destroy');
                }
                else{
                    //save and reload in the dialog
                    //so the audio playing from the iframe stop on dialog close
                    $(this).dialog('destroy');
                }

                //pause the sound
                $('#refreshTimer').trigger('mouseup');

                //$('style[class^="dialog-extend"]').remove();
            }
        });
    }
};

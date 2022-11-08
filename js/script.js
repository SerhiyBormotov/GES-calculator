// CALCULATOR

$(document).ready(function () {
    document.getElementById("calculator").reset();
    if (navigator.userAgent.search(/Trident/) <= 0) {
        $('.calculator-steps').removeClass('ie');
    }
});


$('.calculator-item-button.next').click(function () {
    var item = $(this).parent();
    if (item.is('#start')) {
        if ((!($("#c-geology").is(":checked"))) && (!($("#c-geodezy").is(":checked"))) && (!($("#c-ecology").is(":checked")))) {
            $(this).find('.tooltip-wrapper').addClass('active');
            $(this).mouseleave(function () {
                $(this).find('.tooltip-wrapper').removeClass('active');
            });
            return;
        } else {
            $('#finish-step').removeClass('blind');
            if ($("#c-geology").is(":checked")) {
                $('#geology-step').removeClass('blind');
            } else {
                $('#geology-step').addClass('blind');
            }
            if ($("#c-geodezy").is(":checked")) {
                $('#geodezy-step').removeClass('blind');
            } else {
                $('#geodezy-step').addClass('blind');
            }
            if ($("#c-ecology").is(":checked")) {
                $('#ecology-step').removeClass('blind');
            } else {
                $('#ecology-step').addClass('blind');
            }
        }
    }
    item.removeClass('active');
    item.nextAll('.calculator-item:not(.blind)').first().addClass('active');
    if (item.nextAll('.calculator-item:not(.blind)').first().is('#finish')) {
        showFinish();
    }
    $('.calculator-steps-item.active').removeClass('active').nextAll('.calculator-steps-item:not(.blind)').first().addClass('active');
    calculatorWrapperResize();

});
$('.calculator-item-button.prev').click(function () {
    var item = $(this).parent();
    item.removeClass('active');
    item.prevAll('.calculator-item:not(.blind)').first().addClass('active');
    $('.calculator-steps-item.active').removeClass('active').prevAll('.calculator-steps-item:not(.blind)').first().addClass('active');
    calculatorWrapperResize();
});


$('.calculator-steps-item').click(function () {
    if (!($(this).is('.active'))) {
        $('.calculator-steps-item.active').removeClass('active');
        $('.calculator-item.active').removeClass('active');
        $(this).addClass('active');

        if ($(this).is('#geology-step')) {
            $('#geology').addClass('active');
        }
        if ($(this).is('#geodezy-step')) {
            $('#geodezy').addClass('active');
        }
        if ($(this).is('#ecology-step')) {
            $('#ecology').addClass('active');
        }
        if ($(this).is('#finish-step')) {
            $('#finish').addClass('active');
            showFinish();
        }
        if ($(this).is('#start-step')) {
            $('#start').addClass('active');
        }
        calculatorWrapperResize();
    }
});

function calculatorWrapperResize() {
    $('.calculator-wrapper').css({
        'height': $('.calculator-item.active').outerHeight() + 'px'
    });
}

$('#c-geology').change(function () {
    $('#geology').toggleClass('blind');
    if (!($(this).is(':checked'))) {
        $('#geology-step').addClass('blind');
        $('#dom').val('');
        $('#e-podval').prop('checked', false);
        skvaj = 0;
        glub = 0;
        podval = 0;
        sumGeology = 0;
        if ((!($("#c-geodezy").is(":checked"))) && (!($("#c-ecology").is(":checked")))) {
            $('#finish-step').addClass('blind');
        }
        calculate();

    }
});
$('#c-geodezy').change(function () {
    $('#geodezy').toggleClass('blind');
    if (!($(this).is(':checked'))) {
        $('#geodezy-step').addClass('blind');
        $('#s-geod').val('');
        $('#geod-soglasovanie').prop('checked', false);
        $('#geod-otchet').prop('checked', false);
        sGeod = 0;
        geodAddOtchet = 0;
        geodAddSoglasovanie = 0;
        sumGeodezy = 0;
        if ((!($("#c-geology").is(":checked"))) && (!($("#c-ecology").is(":checked")))) {
            $('#finish-step').addClass('blind');
        }
        calculate();

    }
});
$('#c-ecology').change(function () {
    $('#ecology').toggleClass('blind');
    if (!($(this).is(':checked'))) {
        $('#ecology-step').addClass('blind');
        $('#s-ecol').val('');
        $('#ecol-spravka').prop('checked', false);
        sEcol = 0;
        ecolAdd = 0;
        sumEcology = 0;
        if ((!($("#c-geology").is(":checked"))) && (!($("#c-geodezy").is(":checked")))) {
            $('#finish-step').addClass('blind');
        }
        calculate();
    }

});


//GEOLOGY
var skvaj = 0,
    glub = 0,
    podval = 0,
    sumGeology = 0,
    sumEcology = 0,
    sumGeodezy = 0;
var priceGeology = {
    "00": 0,
    "28": 10000,
    "210": 12000,
    "212": 14000,
    "214": 16000,
    "38": 15000,
    "310": 17000,
    "312": 20000,
    "314": 25000,
    "48": 18000,
    "410": 24000,
    "412": 27000,
    "414": 32000,
    "58": 24000,
    "510": 30000,
    "512": 36000,
    "514": 42000
};
var sGeolPoints = [{
        points: '147,138 266,138 266,232 147,232 ',
        skvaj1X: 266,
        skvaj1Y: 138,
        skvaj2X: 147,
        skvaj2Y: 232,
        skvaj3X: 10000,
        skvaj3Y: 10000,
        skvaj4X: 10000,
        skvaj4Y: 10000,
        skvaj5X: 10000,
        skvaj5Y: 10000
    },
    {
        points: '137,127 288,127 288,227 219,227 219,251 137,251 ',
        skvaj1X: 287,
        skvaj1Y: 127,
        skvaj2X: 137,
        skvaj2Y: 127,
        skvaj3X: 219,
        skvaj3Y: 251,
        skvaj4X: 10000,
        skvaj4Y: 10000,
        skvaj5X: 10000,
        skvaj5Y: 10000

    },
    {
        points: '305,85 362,85 362,226 305,226 305,248 108,248 108,60 305,60 ',
        skvaj1X: 305,
        skvaj1Y: 226,
        skvaj2X: 108,
        skvaj2Y: 60,
        skvaj3X: 108,
        skvaj3Y: 248,
        skvaj4X: 362,
        skvaj4Y: 85,
        skvaj5X: 10000,
        skvaj5Y: 10000

    },
    {
        points: '16,104 221,104 221,47 391,47 391,180 330,180 330,300 84,300 84,237 16,237 ',
        skvaj1X: 330,
        skvaj1Y: 300,
        skvaj2X: 16,
        skvaj2Y: 104,
        skvaj3X: 84,
        skvaj3Y: 300,
        skvaj4X: 221,
        skvaj4Y: 104,
        skvaj5X: 391,
        skvaj5Y: 47

    },
];



$('#dom').change(function () {
    var domVal = $(this).val();
    if (domVal <= 80) {
        skvaj = 2;
        $('#s-geol').attr('points', sGeolPoints[0].points);
        $('.skvaj1').attr('cx', sGeolPoints[0].skvaj1X);
        $('.skvaj2').attr('cx', sGeolPoints[0].skvaj2X);
        $('.skvaj3').attr('cx', sGeolPoints[0].skvaj3X);
        $('.skvaj4').attr('cx', sGeolPoints[0].skvaj4X);
        $('.skvaj5').attr('cx', sGeolPoints[0].skvaj5X);
        $('.skvaj1').attr('cy', sGeolPoints[0].skvaj1Y);
        $('.skvaj2').attr('cy', sGeolPoints[0].skvaj2Y);
        $('.skvaj3').attr('cy', sGeolPoints[0].skvaj3Y);
        $('.skvaj4').attr('cy', sGeolPoints[0].skvaj4Y);
        $('.skvaj5').attr('cy', sGeolPoints[0].skvaj5Y);

    } else if (domVal <= 225) {
        skvaj = 3;
        $('#s-geol').attr('points', sGeolPoints[1].points);
        $('.skvaj1').attr('cx', sGeolPoints[1].skvaj1X);
        $('.skvaj2').attr('cx', sGeolPoints[1].skvaj2X);
        $('.skvaj3').attr('cx', sGeolPoints[1].skvaj3X);
        $('.skvaj4').attr('cx', sGeolPoints[1].skvaj4X);
        $('.skvaj5').attr('cx', sGeolPoints[1].skvaj5X);
        $('.skvaj1').attr('cy', sGeolPoints[1].skvaj1Y);
        $('.skvaj2').attr('cy', sGeolPoints[1].skvaj2Y);
        $('.skvaj3').attr('cy', sGeolPoints[1].skvaj3Y);
        $('.skvaj4').attr('cy', sGeolPoints[1].skvaj4Y);
        $('.skvaj5').attr('cy', sGeolPoints[1].skvaj5Y);
    } else if (domVal <= 400) {
        skvaj = 4;
        $('#s-geol').attr('points', sGeolPoints[2].points);
        $('.skvaj1').attr('cx', sGeolPoints[2].skvaj1X);
        $('.skvaj2').attr('cx', sGeolPoints[2].skvaj2X);
        $('.skvaj3').attr('cx', sGeolPoints[2].skvaj3X);
        $('.skvaj4').attr('cx', sGeolPoints[2].skvaj4X);
        $('.skvaj5').attr('cx', sGeolPoints[2].skvaj5X);
        $('.skvaj1').attr('cy', sGeolPoints[2].skvaj1Y);
        $('.skvaj2').attr('cy', sGeolPoints[2].skvaj2Y);
        $('.skvaj3').attr('cy', sGeolPoints[2].skvaj3Y);
        $('.skvaj4').attr('cy', sGeolPoints[2].skvaj4Y);
        $('.skvaj5').attr('cy', sGeolPoints[2].skvaj5Y);

    } else if (domVal > 400) {
        skvaj = "уточните дополнительно";
        $(this).next('.tooltip-wrapper').addClass('active');
        $(this).mouseleave(function () {
            $(this).next('.tooltip-wrapper').removeClass('active');
        });
    }
    if (glub == 0) {
        glub = 8;
    }
    calculate();

});

$('#geology input[name="etag"]').change(function () {
    if ($('#e-1').prop('checked')) {
        glub = 8;
    } else if ($('#e-3').prop('checked')) {
        glub = 10;
    } else if ($('#e-4').prop('checked')) {
        glub = 12;
    }
    if (skvaj == 0) {
        skvaj = 2;
    }
    calculate();
});

$('#e-podval').change(function () {
    if ($(this).prop('checked')) {
        podval = 2;
    } else {
        podval = 0;
    }
    calculate();
});


//ECOLOGY
var priceEcology = {
    '0': 0,
    '1': 25000,
    '5': 40000,
    '10': 650000,
    'max': function (e) {
        return e * 5000;
    },
    'e0': 0, //ЦЕНЫ ПРИ ПРОХОЖДЕНИИ ЭКСПЕРТИЗЫ
    'e1': 120000,
    'e5': 220000,
    'e10': 320000,
    'emax': function (e) {
        return e * 10000;
    }
};

var sEcolPoints = ['162,134 275,134 262,185 235,194 215,232 148,220 ', 
                    '174,86 342,106 302,183 235,194 166,278 85,206 ', 
                    '49,70 154,78 254,50 378,70 189,327 166,278 49,202 ', 
                    '49,70 162,8 380,25 325,103 392,289 337,362 183,275 92,353 28,285 69,165 '];
var sEcol = 0,
    ecolAdd = 0,
    ecolExpert = '';

$('#s-ecol').change(function () {
    var sEcolVal = $(this).val();
    if (sEcolVal <= 1) {
        sEcol = 1;
        $('#s-ecolog').attr('points', sEcolPoints[0]);
    } else
    if (sEcolVal <= 5) {
        sEcol = 5;
        $('#s-ecolog').attr('points', sEcolPoints[1]);
    } else
    if (sEcolVal <= 10) {
        sEcol = 10;
        $('#s-ecolog').attr('points', sEcolPoints[2]);
    } else
    if (sEcolVal > 10) {
        sEcol = sEcolVal;
        $('#s-ecolog').attr('points', sEcolPoints[3]);
    }
    calculate();
});
$('#ecol-spravka').change(function () {
    if ($(this).prop('checked')) {
        ecolAdd = 20000;
    } else {
        ecolAdd = 0;
    }
    calculate();
});
$('#ecol-ekspertiza').change(function () {
    if ($(this).prop('checked')) {
        ecolExpert = 'e';
    } else {
        ecolExpert = '';
    }
    calculate();
});


//GEODEZY
var geodKoefS = function () {
        return 0;
    },
    geodKoefTip = 1,
    sGeod = 0,
    geodAddOtchet = 0,
    geodAddSoglasovanie = 0;
var sGeodPoints = ['173,217 177,127 249,131 231,217 ', 
                  '131,231 128,173 176,153 178,98 263,102 255,232 ', 
                  '120,251 137,173 107,88 184,61 295,96 244,260 ', 
                  '121,318 73,173 199,110 205,54 329,82 289,314 ', 
                  '151,270 42,106 128,23 197,93 319,24 390,86 367,337 55,368 77,301 '];

var priceGeodezy = {
    'base': 10000,
    'min': 5000,
    'koefTip': {
        'chastn': 1,
        'pole': 0.7,
        'gorod': 1.2,
        'promzona': 1.8

    },
    'koefS': {
        '0,5': function (e) {
            return e * 1.4 + 2000;
        },
        '1': function (e) {
            return e * 1.3 + 1000;
        },
        '5': function (e) {
            return e * 1;
        },
        '10': function (e) {
            return e * 0.7;
        },
        '20': function (e) {
            return e * 0.5;
        },
        'max': function (e) {
            return e * 0.3;
        }
    }
};


$('#geod-otchet').change(function () {
    if ($(this).prop('checked')) {
        geodAddOtchet = 40000;
    } else {
        geodAddOtchet = 0;
    }
    calculate();
});

$('#geod-soglasovanie').change(function () {
    if ($(this).prop('checked')) {
        geodAddSoglasovanie = 20000;
    } else {
        geodAddSoglasovanie = 0;
    }
    calculate();
});

$('#s-geod').change(function () {
    sGeod = $(this).val();
    if (sGeod <= 0.5) {
        geodKoefS = priceGeodezy.koefS['0,5'];
        $('#s-geodez').attr('points', sGeodPoints[0]);
    } else
    if (sGeod <= 1) {
        geodKoefS = priceGeodezy.koefS['1'];
        $('#s-geodez').attr('points', sGeodPoints[1]);
    } else
    if (sGeod <= 5) {
        geodKoefS = priceGeodezy.koefS['5'];
        $('#s-geodez').attr('points', sGeodPoints[2]);
    } else
    if (sGeod <= 10) {
        geodKoefS = priceGeodezy.koefS['10'];
        $('#s-geodez').attr('points', sGeodPoints[3]);
    } else
    if (sGeod <= 20) {
        geodKoefS = priceGeodezy.koefS['20'];
        $('#s-geodez').attr('points', sGeodPoints[4]);
    } else
    if (sGeod > 20) {
        geodKoefS = priceGeodezy.koefS['max'];
        $('#s-geodez').attr('points', sGeodPoints[4]);
    }
    calculate();
});

$('#geodezy input[name="tip"]').change(function () {
    if ($('#tip-chastn').prop('checked')) {
        geodKoefTip = priceGeodezy.koefTip['chastn'];
    } else if ($('#tip-pole').prop('checked')) {
        geodKoefTip = priceGeodezy.koefTip['pole'];
    } else if ($('#tip-gorod').prop('checked')) {
        geodKoefTip = priceGeodezy.koefTip['gorod'];
    } else if ($('#tip-promzona').prop('checked')) {
        geodKoefTip = priceGeodezy.koefTip['promzona'];
    }
    calculate();
});


function calculate() {
    $('#skvaj').html(skvaj);
    $('#glub').html(glub + podval);
    sumGeology = priceGeology[String(skvaj) + String(glub + podval)];
    $('#geology-sum').html(sumGeology);
    if (sEcol <= 10) {
        sumEcology = priceEcology[ecolExpert + String(sEcol)] + ecolAdd;
    } else {
        sumEcology = priceEcology[ecolExpert + 'max'](sEcol) + ecolAdd;
    }
    $('#ecology-sum').html(sumEcology);
    sumGeodezy = Math.round(sGeod * geodKoefS(priceGeodezy.base) * geodKoefTip);
    if ((sumGeodezy < priceGeodezy.min) && (sumGeodezy > 0)) {
        sumGeodezy = priceGeodezy.min;
    }
    sumGeodezy = sumGeodezy + geodAddOtchet + geodAddSoglasovanie;
    $('#geodezy-sum').html(sumGeodezy);
    $('#topsum').html(sumGeology + sumEcology + sumGeodezy);

}


function showFinish() {
    if ($('#c-geology').is(':checked')) {
        $('#finish-geology').removeClass('blind');
        $('#finish-skvaj').html(skvaj);
        $('#finish-glub').html(glub + podval);
        $('#finish-geology-sum').html(sumGeology);
        $('#form-skvaj').val(skvaj);
        $('#form-glub').val(glub + podval);
        $('#form-geolsum').val(sumGeology);
    } else {
        $('#finish-geology').addClass('blind');
        $('#form-skvaj').val('');
        $('#form-glub').val('');
        $('#form-geolsum').val('');
    }

    if ($('#c-ecology').is(':checked')) {
        $('#finish-ecology').removeClass('blind');
        $('#finish-ecol-s').html($('#s-ecol').val());
        if ($('#ecol-spravka').is(':checked')) {
            $('#finish-ecol-spravka').removeClass('blind');
        } else {
            $('#finish-ecol-spravka').addClass('blind');
        }
        if ($('#ecol-ekspertiza').is(':checked')) {
            $('#finish-ecology-ekspertiza').removeClass('blind');
        } else {
            $('#finish-ecology-ekspertiza').addClass('blind');
        }
        $('#form-ecolsum').val(sumEcology);
        $('#finish-ecology-sum').html(sumEcology);
    } else {
        $('#finish-ecology').addClass('blind');
        $('#form-ecolsum').val('');
    }

    if ($('#c-geodezy').is(':checked')) {
        $('#finish-geodezy').removeClass('blind');
        $('#finish-geod-s').html($('#s-geod').val());
        $('#finish-geod-tip').html($("input[name='tip']:checked").val());
        if ($('#geod-otchet').is(':checked')) {
            $('#finish-geod-otchet').removeClass('blind');
        } else {
            $('#finish-geod-otchet').addClass('blind');
        }
        if ($('#geod-soglasovanie').is(':checked')) {
            $('#finish-geod-soglasovanie').removeClass('blind');
        } else {
            $('#finish-geod-soglasovanie').addClass('blind');
        }
        $('#form-geodsum').val(sumGeodezy);
        $('#finish-geodezy-sum').html(sumGeodezy);
    } else {
        $('#finish-geodezy').addClass('blind');
        $('#form-geodsum').val('');
    }

    $('#finish-sum').html(sumGeology + sumEcology + sumGeodezy);
    $('#form-topsum').val(sumGeology + sumEcology + sumGeodezy);
}
/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = "/jwt/"; //change virtual proxy prefix if different than jwt.
var config = {
    host: "ruhanwin",
    prefix: prefix,
    port: 443,
    isSecure: true
};
require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function(qlik) {
    qlik.setOnError(function(error) {
        $('#popupText').append(error.message + "<br>");
        $('#popup').fadeIn(1000);
    });
    $("#closePopup").click(function() {
        $('#popup').hide();
    });

    //callbacks -- inserted here --
    //open apps -- inserted here --
    var app = qlik.openApp('9e5dfa89-bd3f-4172-80b2-a596c5455ef7', config);

    //get objects -- inserted here --
    app.getObject('QV05', 'qamd');
    app.getObject('QV02', 'akDGX');
    app.getObject('QV04', 'nPLRub');
    app.getObject('QV01', 'Ydsxt');
    //create cubes and lists -- inserted here --

});
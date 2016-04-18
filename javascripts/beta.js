/*
 *  Name: Yusdesign Kuler Feed
 *  License: CC-NC-ND 3.0 Unported
 */
var utistor;
jQuery.noConflict();
(function ($) {
  $(function () {
    // “$” jQuery alias
    $('body').addClass('ysdsgn');
    var ns = 'http://kuler.adobe.com/kuler/API/rss/',
    qc = '?searchQuery=userID:102986',
    qn = '&itemsPerPage=50',
    qk = '&key=5F8FD294DC6015C63AEF97E329246996';
    var qu = 'https://kuler-api.adobe.com/rss/search.cfm' + qc + qn + qk;
    $.ajax({
      type: 'GET',
      url: qu,
      dataType: 'xml'
    }).done(function (result) {
      if (!result.error) {
        var $books = $(result).find('item');
        $.each($books, function (i, jee) {
          var $book = $(this);
          var book = $book[0];
          var $ns_tID,
          $tID,
          $tTtl,
          $swatches;
          $ns_tID = this.getElementsByTagNameNS(ns, 'themeID')[1].value;
          !$tID ? $tID = $(jee).find('themeID') : $tID = $(jee).find('kuler\\:themeID');
          !$tTtl ? $tTtl = $(jee).find('themeTitle') : $tTtl = $(jee).find('kuler\\:themeTitle');
          console.log($ns_tID);
          console.log($($tID).html() + ' ››› ' + $($tTtl).html());
          
          !$swatches ? $swatches = $(jee).find('swatch') : $swatches = $(jee).find('kuler\\:swatch');
          $.each($swatches, function (l, val) {
            var $swtch;
            !$swtch ? $swtch = $(val).find('swatchHexColor') : $swtch = $(val).find('kuler\\:swatchHexColor');
            console.log(' SWATCH 🕛 ››› ' + $($swtch).html());
          });
          
        });
      }
    });
  });
}) (jQuery);

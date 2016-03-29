/*
*  Name: Yusdesign Kuler Feed
*  License: CC-NC-ND 3.0 Unported
*/
$j = jQuery.noConflict();
var qc = '?searchQuery=userID:102986', qn = '&itemsPerPage=50', qk = '&key=5F8FD294DC6015C63AEF97E329246996';
var qu = 'https://kuler-api.adobe.com/rss/search.cfm' + qc + qn + qk;
$j.ajax({ 
  url:qu,
  dataType: 'xml'
}).done( function( response ) {
  if ( !response.error ) {
    var items = $j( response ).find( 'item' );
    $j.each( items, function( i, u ) {
      var entry = items[i];
      var entryTitle = $j( $j(entry).find('title')[1] ).text();
      var themeLink = $j( $j(entry).find('link')[0] ).text();
      var themeImageLink = $j( $j(entry).find('link')[1] ).text();
      var entryID = themeLink.slice( themeLink.lastIndexOf('/')+1 );
      $j('.gesso').append( '<div class="qi'+ i +'"></div>' );
      $j('.gesso').has('qi'+i).append( '<a class="ql'+i+'"></a>' ).attr( 'href', themeLink );
      $j('.gesso').has('ql'+i).append( '<img class="q'+i+'"/>' ).attr( 'src', themeImageLink )
      $j('.gesso').has('ql'+i).append( '<span class="t'+i+'"></span>' ).html( entryTitle );
      console.log( i + ' > ' + typeof entry + ' >> ' + themeLink + ' >> ' + entryTitle + ' <' );
      console.log( i + ' > ' + typeof entry + ' >> ' + themeImageLink + ' >> ' + entryID + ' <' );
    });
  }
});

/*
*  Name: Yusdesign Kuler Feed
*  License: CC-NC-ND 3.0 Unported
*/

$j = jQuery.noConflict();
var qc = '?searchQuery=userID:102986', qn = '&itemsPerPage=50', qk = '&key=5F8FD294DC6015C63AEF97E329246996';
var qu = 'https://kuler-api.adobe.com/rss/search.cfm' + qc + qn + qk;
var entry, entryTitle, themeLink, themeImageLink, singleImages=[], halfImages=[], ilinks=[], entryID, quler;

$j.ajax({ 
  url:qu,
  dataType: 'xml'
}).done( function( response ) {
  if ( !response.error ) {
    var items = $j( response ).find( 'item' );
    $j.each( items, function( i, u ) {
      quler = $j('<div id="qi'+i+'"></div>');
      quler.appendTo('.gesso');
      entry = items[i];
      themeImageLink = $j( $j(entry).find('link')[1] ).text();
      images.push(themeImageLink);
      entryTitle = $j( $j(entry).find('title')[1] ).text();
      themeLink = $j( $j(entry).find('link')[0] ).text();
      entryID = themeLink.slice( themeLink.lastIndexOf('/')+1 );
      quler.html('<a href="'+themeLink+'"><img src="'+themeImageLink+'"/><span>'+entryTitle+'</span></a>');
      console.log( i + ' > ' + typeof entry + ' >> ' + themeLink + ' >> ' + entryTitle + ' <' );
      console.log( i + ' > ' + typeof entry + ' >> ' + themeImageLink + ' >> ' + entryID + ' <' );
    });
  }
});

function preload( ilinks ) {
  for(var j = 0; j < ilinks.length; j++){
    singleImages.push(loadImage(ilinks[j]));
  }
}

function setup( singleImages ) {
  for(var r = 0; r < singleImages.length; r++){
    singleImages[r].loadPixels();
    halfImages.push(4 * width * height/2);
    for(var f = 0; f < halfImages.length; f++){
      singleImages[r].pixels[f+halfImages[f]] = singleImages[r].pixels[f];
    }
    singleImages[r].updatePixels();
  }
}

function draw( singleImages ) {
  for(var s = 0; s < singleImages.length; s++){
    image(singleImages[s], 0*s, 0*s);
  }
}

  var validateFieldFn;
  var validateCheckboxFn;


 // Initialize jQuery
$(function () {

  $('[data-toggle="tooltip"]').tooltip();

  $('.rotate').click(function(){
      $(this).toggleClass('down'); 
  });

        var menu = $('.sticky');
        var origOffsetY = menu.offset().top;
        function scroll() {
                if ($(window).scrollTop() >= origOffsetY) {
                    $('.navbar').addClass('bg-primary');
                } else {
                    $('.navbar').removeClass('bg-primary');
                }
        }

  document.onscroll = scroll;

  function initMap() {
        var location = new google.maps.LatLng(37.3355032,-121.89463);
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: location,
            zoom: 15,
            panControl: false,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var markerImage = 'images/pin-in-the-map.svg';

        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: markerImage
        });

        var contentString = '<div class="info-window">' +
                '<h3>Info Window Content</h3>' +
                '<div class="info-content">' +
                '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

        var styles = [{'featureType': 'landscape', 'stylers': [{'saturation': -100}, {'lightness': 65}, {'visibility': 'on'}]}, {'featureType': 'poi', 'stylers': [{'saturation': -100}, {'lightness': 51}, {'visibility': 'simplified'}]}, {'featureType': 'road.highway', 'stylers': [{'saturation': -100}, {'visibility': 'simplified'}]}, {'featureType': 'road.arterial', 'stylers': [{'saturation': -100}, {'lightness': 30}, {'visibility': 'on'}]}, {'featureType': 'road.local', 'stylers': [{'saturation': -100}, {'lightness': 40}, {'visibility': 'on'}]}, {'featureType': 'transit', 'stylers': [{'saturation': -100}, {'visibility': 'simplified'}]}, {'featureType': 'administrative.province', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'water', 'elementType': 'labels', 'stylers': [{'visibility': 'on'}, {'lightness': -25}, {'saturation': -100}]}, {'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'hue': '#ffff00'}, {'lightness': -25}, {'saturation': -97}]}];

        map.set('styles', styles);
    }//end function

    google.maps.event.addDomListener(window, 'load', initMap);
    console.log('Map loaded');

    // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[href^="#tab"]')
  .not('[href^="#collapse"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top-40
        }, 500, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(':focus')) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

    $('#modalSubscribe').on('shown.bs.modal', function (e) {
      // do something...
      var email=$('#subscriberEmail').val();
      if( email.indexOf('@') > 0 ) {
            $('#btnSubscribe').addClass('disabled');
            $('#btnSubscribe').attr('disabled','disabled');

            var datastring = 'email=' + email;
            $.ajax({
                  type: 'POST',
                  url: 'subscribe.php',
                  data: datastring,
                  success: function(){
                      $('#subscribeResult').html('Successfully subscribed!<br /><button type="button" class="btn btn-primary mt-3" data-dismiss="modal">Close</button>'); 
                      $('#subscribeCog').html(''); 
                  },//end success
                  error: function() {
                      $('#subscribeError').html('There was an error, please try again later!<br /><button type="button" class="btn btn-primary mt-3" data-dismiss="modal">Close</button>'); 
                      $('#subscribeCog').html(''); 
                  }
              });

      } else {
            $('#subscribeError').html('This is not a valid email address <br /><button type="button" class="btn btn-primary mt-3" data-dismiss="modal">Close</button>'); 
            $('#subscribeCog').html(''); 
      }

    })//end function

    $('#modalSubscribe').on('hidden.bs.modal', function (e) {
        // do something...
        $('#subscribeError').html(''); 
        $('#subscribeResult').html(''); 
        $('#subscribeCog').html('<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>'); 
    })//end function


  $('#registerButton').click(function(){
      // Perform form validation. All fileds are madnatory
        var valid=true;

        var el=$('#registrationForm').find(':input');
        for(var i=0;i<el.length;i++) {
          if(el[i].type=='radio' || el[i].type=='checkbox') { valid=validateCheckboxFn(el[i].name); };
          if(el[i].type=='text') { valid=validateFieldFn(el[i].id) };
        }

        if(valid) {
          var datastring = $('#registrationForm').serialize();
          
            $('#registerButton').addClass('disabled');
            $('#registerButton').attr('disabled','disabled');
            $('#registerCog').css('display','block');
           $.ajax({
                  type: 'POST',
                  url: 'register.php',
                  data: datastring,
                  success: function(){
                      $('#registerMsg').html('Successfully registerd!<br /><br /><button type="button" class="btn btn-primary mt-3" data-dismiss="modal">Close</button>'); 
                  },//end success
                  error: function() {
                      $('#registerMsg').html('There was an error, please try again later!<br /><br /><button type="button" class="btn btn-primary mt-3" data-dismiss="modal">Close</button>');                     
                  }
              });//end ajax

        }
  });


  validateFieldFn = function validateField(field_id) {
    // Use this for text fields
      var field='#'+field_id;
      if( $(field).val().length<2 ) {
          $(field).parent().closest('div').addClass('has-danger');
          return false;
      } else {
          $(field).parent().closest('div').removeClass('has-danger');
          return true;
      }
  }//end function

  validateCheckboxFn = function validateCheckbox(name) {
    // Use this for checkbox fields
      var val=$('input[name='+name+']:checked').val();
      if(!val) {
          $('input[name='+name+']').parent().closest('div').addClass('has-danger');
          return false;
      } else {
          $('input[name='+name+']').parent().closest('div').removeClass('has-danger');
          return true;
        }
  }//end function

});



// ------------------------------
// https://twitter.com/mattsince87
// ------------------------------


function ParticleController(target, configuration) {
    // used by particlejs
    this.target = target;
    this.config = configuration;
    // visible animation
    this.running = false;
    // whether particlejs exists
    this.ready = window.particlesJS;
};
ParticleController.prototype.start = function () {
    if(!this.ready) {
        return;
    }
    if(!this.running) {
        this.running = true;
        return window.particlesJS(this.target, this.config);
    }
};
ParticleController.prototype.stop = function () {
    if(this.ready && this.running) {
        this.running = false;
        //pJSDom stores running particle instances
        //in this case we'll only ever have one running, so we're going to
        //avoid writing unnecessary code to handle multiple instances
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
};

(function($) {
    var pConfig = {
      "particles": {
        "number": {
          "value": 40,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "edge",
          "stroke": {
            "width": 0,
            "color": "#FFF"
          }
        },
        "opacity": {
          "value": 0.7,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 8,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 19.489853095232284,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": ["bubble", "repulse"]
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 177,
            "size": 13,
            "duration": 2,
            "opacity": 0.2,
            "speed": 3
          },
          "repulse": {
            "distance": 90,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    };

    var pController = new ParticleController('splash', pConfig);
    pController.start();
    $('.arrow').on('click', function (){
      $(document).scrollTop(100);
    });
    
    $(window).on('scroll touchmove', function () {
        if($(document).scrollTop() > 0) {
            $('body').addClass('scrolled');
            //stop
            pController.stop();
            $('.subtitle, .off').addClass('hidden');

        } else {
            $('body').removeClass('scrolled');
            pController.start();
            $('.subtitle, .off').removeClass('hidden');
        }
    });

    $('.off').on('click', function () {
        var $el = $(this);
        if($el.hasClass('on')) {
            pController.start();
            $el.removeClass('on');
        } else {
            pController.stop();
            $el.addClass('on');
        }
    });
})(jQuery);
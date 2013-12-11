(function() {
  (function($, window, document) {
    var Collider, Ion;
    Ion = (function() {
      function Ion(x, y, vx, vy, r, container) {
        var $this;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.container = container;
        this.containerHeight = this.container.height();
        this.containerWidth = this.container.width();
        $this = this;
        $(window).on("resize", function() {
          $this.containerHeight = $(this).height();
          return $this.containerWidth = $(this).width();
        });
        this.render();
      }

      Ion.prototype.render = function() {
        var $this;
        this.domelement = $('<div class="ion"></div>');
        this.container.append(this.domelement);
        this.domelement.height(2 * this.r);
        this.domelement.width(2 * this.r);
        this.domelement.css("position", "absolute");
        this.domelement.css("transform", "translate3d(" + this.x + "px," + this.y + "px,0px)");
        $this = this;
        return window.setTimeout(function() {
          return $this.animate();
        }, 1);
      };

      Ion.prototype.animate = function() {
        var $this, dt, tx, ty;
        if (this.vx > 0) {
          tx = (this.containerWidth - this.x) / this.vx;
        } else {
          tx = this.x / -this.vx;
        }
        if (this.vy > 0) {
          ty = (this.containerHeight - this.y) / this.vy;
        } else {
          ty = this.y / -this.vy;
        }
        dt = tx;
        if (tx > ty) {
          dt = ty;
        }
        this.x = this.x + this.vx * dt;
        this.y = this.y + this.vy * dt;
        this.domelement.css("transition", "all " + (dt.toFixed(2)) + "s linear");
        this.domelement.css("transform", "translate3d(" + (this.x.toFixed(2)) + "px," + (this.y.toFixed(2)) + "px,0px)");
        if (tx > ty) {
          this.vy = -this.vy;
        } else {
          this.vx = -this.vx;
        }
        $this = this;
        return window.setTimeout(function() {
          return $this.animate();
        }, dt.toFixed(2) * 1000);
      };

      return Ion;

    })();
    Collider = (function() {
      function Collider(element, number, maxspeed) {
        var $this;
        this.element = element;
        this.number = number;
        this.maxspeed = maxspeed;
        this.element.css("position", "relative");
        this.element.css("overflow", "hidden");
        this.element.css("transform", "translate3d(0, 0, 0)");
        this.ions = new Array();
        this.setSize();
        this.createIons(this.number);
        $this = this;
        $(window).on("resize", function() {
          return $this.setSize();
        });
      }

      Collider.prototype.createIons = function(number) {
        var num, _i, _results;
        _results = [];
        for (num = _i = 1; 1 <= number ? _i <= number : _i >= number; num = 1 <= number ? ++_i : --_i) {
          _results.push(this.ions.push(new Ion(Math.random() * this.width, Math.random() * this.height, this.maxspeed * (1 - Math.random() * 2), this.maxspeed * (1 - Math.random() * 2), Math.random() * 15, this.element)));
        }
        return _results;
      };

      Collider.prototype.setSize = function() {
        this.height = this.element.height();
        return this.width = this.element.width();
      };

      return Collider;

    })();
    return $.fn.extend({
      collider: function(options) {
        var settings;
        settings = {
          number: 20,
          maxspeed: 100
        };
        settings = $.extend(settings, options);
        return this.each(function() {
          var collider;
          return collider = new Collider($(this), settings.number, settings.maxspeed);
        });
      }
    });
  })(jQuery, window, document);

}).call(this);

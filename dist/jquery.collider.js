(function() {
  (function($, window, document) {
    var Collider, Ion;
    Ion = (function() {
      function Ion(x, y, vx, vy, r, container) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.container = container;
        this.render();
      }

      Ion.prototype.move = function(dt) {
        this.x = this.x + this.vx * dt / 1000;
        this.y = this.y + this.vy * dt / 1000;
        this.domelement.css("left", this.x + "px");
        return this.domelement.css("top", this.y + "px");
      };

      Ion.prototype.render = function() {
        var element;
        this.domelement = $('<div class="ion"></div>');
        this.container.append(this.domelement);
        this.domelement.height(2 * this.r);
        this.domelement.width(2 * this.r);
        this.domelement.css("left", this.x + "px");
        this.domelement.css("top", this.y + "px");
        this.domelement.css("position", "absolute");
        element = this.domelement;
        return window.setTimeout(function() {
          return element.css("transition", "all 1s linear");
        }, 1);
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

      Collider.prototype.animate = function(interval) {
        var $this;
        $this = this;
        window.setTimeout(function() {
          return $this.step(interval);
        }, 1);
        return this.timer = setInterval(function() {
          return $this.step(interval);
        }, interval);
      };

      Collider.prototype.step = function(interval) {
        var ion, _i, _len, _ref, _results;
        _ref = this.ions;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ion = _ref[_i];
          if (ion.x + 2 * ion.r > this.width || ion.x < 0) {
            ion.vx = -ion.vx;
          }
          if (ion.y + 2 * ion.r > this.height || ion.y < 0) {
            ion.vy = -ion.vy;
          }
          _results.push(ion.move(interval));
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
          maxspeed: 100,
          interval: 1000
        };
        settings = $.extend(settings, options);
        return this.each(function() {
          var collider;
          collider = new Collider($(this), settings.number, settings.maxspeed);
          return collider.animate(settings.interval);
        });
      }
    });
  })(jQuery, window, document);

}).call(this);

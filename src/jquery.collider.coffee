(($, window, document) ->

  class Ion

    constructor: (@x, @y, @vx, @vy, @r, @container) ->
      @render()

    move: (dt) ->
      @x = @x + @vx * dt/1000
      @y = @y + @vy * dt/1000

      @domelement.css "left", @x + "px"
      @domelement.css "top", @y + "px"

    render: () ->
      @domelement = $ '<div class="ion"></div>'
      @container.append @domelement
      @domelement.height 2*@r
      @domelement.width 2*@r
      @domelement.css "left", @x + "px"
      @domelement.css "top", @y + "px"
      @domelement.css "position", "absolute"


  class Collider

    constructor: (@element, @number, @maxspeed) ->
      @element.css "position", "relative"
      @ions = new Array()
      @setSize()
      @createIons(@number)

      $this = this
      $(window).on "resize", ->
        $this.setSize()

    createIons: (number) ->
      for num in [1..number]
        @ions.push new Ion Math.random() * @width, Math.random() * @height, @maxspeed *(1 - Math.random() * 2) ,@maxspeed *(1 - Math.random() * 2), Math.random() * 15 , @element

    animate: (interval) ->
      $this = this
      @timer = setInterval () ->
        $this.step(interval)
      , interval

    step: (interval) ->
      for ion in @ions
        if ion.x+2*ion.r > @width || ion.x < 0
          ion.vx = -ion.vx
        if ion.y+2*ion.r > @height || ion.y < 0
          ion.vy = -ion.vy

        ion.move(interval)

    setSize: () ->
      @height = @element.height()
      @width  = @element.width()




  # extend jquery
  $.fn.extend

    collider: (options) ->

      # default settings
      settings =
        number: 20      # number of ions
        maxspeed: 100   # maximum speed in pixels/second
        interval: 10    # animation interval

      # merge default settings with options
      settings = $.extend settings, options

      # create colliders
      @each () ->
        collider = new Collider $(this), settings.number, settings.maxspeed
        collider.animate settings.interval

) jQuery, window, document
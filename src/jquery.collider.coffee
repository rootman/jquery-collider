(($, window, document) ->

  class Ion

    constructor: (@x, @y, @vx, @vy, @r, @container) ->
      @containerHeight = @container.height()
      @containerWidth = @container.width()
      $this = this

      $(window).on "resize", () ->
        $this.containerHeight = $(this).height()
        $this.containerWidth = $(this).width()

      @render()

    render: () ->
      # set initial state
      @domelement = $ '<div class="ion"></div>'
      @container.append @domelement
      @domelement.height 2*@r
      @domelement.width 2*@r
      @domelement.css "position", "absolute"
      @domelement.css "transform", "translate3d(#{@x}px,#{@y}px,0px)"

      # no initial transition please
      $this = this
      window.setTimeout () ->
        $this.animate()
      , 1

    animate: () ->
      # calculate time to bounce
      if @vx > 0
        tx = (@containerWidth - @x) / @vx
      else
        tx = @x / -@vx

      if @vy > 0
        ty = (@containerHeight - @y) / @vy
      else
        ty = @y / -@vy

      dt = tx
      if (tx > ty)
        dt = ty

      # calculate next position
      @x = @x + @vx * dt
      @y = @y + @vy * dt

      # animate to that position
      @domelement.css "transition", "all #{dt.toFixed(2)}s linear"
      @domelement.css "transform", "translate3d(#{@x.toFixed(2)}px,#{@y.toFixed(2)}px,0px)"

      # reverse velocity for next animation step
      if tx > ty
        @vy = -@vy
      else
        @vx = -@vx

      # enqueue next animation step
      $this = this
      window.setTimeout () ->
        $this.animate()
      , dt.toFixed(2) * 1000




  class Collider

    constructor: (@element, @number, @maxspeed) ->
      @element.css "position", "relative"
      @element.css "overflow", "hidden"
      @element.css "transform", "translate3d(0, 0, 0)"
      @ions = new Array()
      @setSize()
      @createIons(@number)

      $this = this
      $(window).on "resize", ->
        $this.setSize()

    createIons: (number) ->
      for num in [1..number]
        @ions.push new Ion Math.random() * @width, Math.random() * @height, @maxspeed *(1 - Math.random() * 2) ,@maxspeed *(1 - Math.random() * 2), Math.random() * 15 , @element

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

      # merge default settings with options
      settings = $.extend settings, options

      # create colliders
      @each () ->
        collider = new Collider $(this), settings.number, settings.maxspeed

) jQuery, window, document
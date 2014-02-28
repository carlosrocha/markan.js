;(function($) {
  'use strict';

  var markan   = window.markan = {},
      $window  = $(window),
      elements = [],
      settings = {
        dialog: '',
        placement: 'top',
        alignment: 'center',
        offsetY: 10,
        offsetX: 0
      },
      initialized;

  var initialize = function() {
    $window.mouseup(checkSelectionWithEventLoop)
             .keyup(checkKeys);

    initialized = true;
  };

  var checkKeys = function(e) {
    // Only check if shift + arrows are pressed
    if (e.shiftKey && e.keyCode >= 37 && e.keyCode <= 40) {
      checkSelection();
    }
  };

  var checkSelectionWithEventLoop = function(e) {
    if (isOrContains($('#markan-dialog'), e.target)) return;

    // Needed in order to get the correct selection
    setTimeout(checkSelection, 1);
  };

  var checkSelection = function() {
    var range     = selection(),
        container = range.commonAncestorContainer;

    removeBubble();

    if (!range) return;

    $.each(elements, function(i, each) {
      if (isOrContains(each, container)) {
        each.trigger('markan.selected', range);
        return false;
      }
    });
  };

  var isOrContains = function(first, second) {
    return first.is(second) || first.find(second).length > 0;
  };

  var selection = markan.selection = function() {
    var sel   = getSelection(),
        range = sel.rangeCount === 1 ? sel.getRangeAt(0) : null;

    return range && !range.collapsed ? range : false;
  };

  var removeBubble = function() {
    $('#markan-dialog').remove();
  };

  var removeAndCreate = function() {
    removeBubble();
    return $('<div id="markan-dialog">').appendTo(document.body);
  };

  var placeBubble = function(e, range) {
    var options = $(this).data('markan'),
        content = typeof options.dialog === 'function' ? options.dialog(range) : options.dialog,
        bubble  = removeAndCreate().append(content),
        top     = $window.scrollTop(),
        left    = $window.scrollLeft() - (bubble.outerWidth() / 2),
        bounds  = range.getBoundingClientRect(),
        classes = ['active'];

    if (options.placement === 'bottom') {
      top += bounds.bottom + options.offsetY;
      classes.push('point-up');
    } else {
      // Top by default
      top += bounds.top - bubble.outerHeight() - options.offsetY;
    }

    if (options.alignment === 'left') {
      left += bounds.left;
      classes.push('right-arr');
    } else if (options.alignment === 'right') {
      left += bounds.right;
      classes.push('left-arr');
    } else {
      // Center by default
      left += bounds.left + (bounds.width / 2);
    }

    bubble.css({
      top: Math.round(top) + 'px',
      left: Math.round(left) + 'px'
    }).addClass(classes.join(' '));
  };

  $.fn.markan = function(options) {
    if (!initialized) {
      initialize();
    }

    options = $.extend({}, settings, options);
    elements.push(this);
    return this.each(function() {
      $(this).data('markan', options)
             .on('markan.selected', placeBubble);
    });
  };
})(jQuery);

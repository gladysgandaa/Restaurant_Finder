Restaurants.prototype.reviewDialog = function() {
    var dialog = document.querySelector('#dialog-add-review');
    this.dialogs.add_review = new mdc.dialog.MDCDialog(dialog);
  
    var that = this;
    this.dialogs.add_review.listen('MDCDialog:accept', function() {
      var pathname = that.getCleanPath(document.location.pathname);
      var id = pathname.split('/')[2];
  
      that.addRating(id, {
        rating: rating,
        text: dialog.querySelector('#text').value,
        userName: 'Anonymous (Web)',
        timestamp: new Date(),
        userId: firebase.auth().currentUser.uid
      }).then(function() {
        that.rerender();
      });
    });
  
    var rating = 0;
  
    dialog.querySelectorAll('.star-input i').forEach(function(el) {
      var rate = function() {
        var after = false;
        rating = 0;
        [].slice.call(el.parentNode.children).forEach(function(child) {
          if (!after) {
            rating++;
            child.innerText = 'star';
          } else {
            child.innerText = 'star_border';
          }
          after = after || child.isSameNode(el);
        });
      };
      el.addEventListener('mouseover', rate);
    });
  };
  
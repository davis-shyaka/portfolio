document.getElementById('cards').onmousemove = (e) => {
  for (const card of document.getElementsByClassName('card')) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top

    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }
}

var main = function () {
  $('.btn').click(function (e) {
    console.log('here')
    var post = $('.status-box').val()
    $('<li>').text(post).prependTo('.posts')
    $('.status-box').val('')
    $('.counter').text('250')
    $('.btn').addClass('disabled')
  })
  $('.status-box').keyup(function () {
    var postLength = $(this).val().length
    var charactersLeft = 250 - postLength
    $('.counter').text(charactersLeft)
    if (charactersLeft < 0) {
      $('.btn').addClass('disabled')
    } else if (charactersLeft === 250) {
      $('.btn').addClass('disabled')
    } else {
      $('.btn').removeClass('disabled')
    }
  })
}
$('.btn').addClass('disabled')
$(document).ready(main)

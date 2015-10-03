$(document).on('search:ready', function () {
  $(".input-search").focus()
  $(".loading").remove()
})

function focusOnSearch (e) {
  var searchField = $('.input-search')[0]
  if (e.keyCode == 191 && !searchField.length) {
    searchField.focus()
    var t = searchField.get(0)
    if (t.value.length) {
      t.selectionStart = 0
      t.selectionEnd = t.value.length
    }
    return false
  }
}

var counter = 1
$.getJSON('./sources/zenoss-wiki.json', function (projects) {  
  var container = $('.container')
  Object.keys(projects).forEach( function (key) {
    var project = projects[key]
    var charHTML
    charHTML = "<div><a target='_blank' onclick=\"ga('send', 'event', 'click', 'Github: " + project['name'] + "'); return true;\" title='#" + counter + " " + project['name'] + "' href='" + 
      project['url'] + "'><i class='fa fa-" + project['icon'] + "'></i> " + project['name'] + "</a></div>"
    container.append("<li class='result emoji-wrapper'>" +
      charHTML + "<span class='keywords'>" + project["keywords"] + "</span></li>")
    counter++
  })
  $(document).trigger('search:ready')
})

$(document).keydown(function (e) { focusOnSearch(e) })

$(document).on('keydown', '.emoji-wrapper input', function (e) {
  $(".input-search").blur()
  focusOnSearch(e)
})

$(document).on('click', '.js-clear-search, .mojigroup.active', function () {
  location.hash = ""
  return false
})

$(document).on('click', '.js-contribute', function () {
  ga('send', 'event', 'contribute', 'click')
})

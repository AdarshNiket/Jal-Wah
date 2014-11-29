$(document).ready ->
  $("#registrationForm").on("submit", ->
    usrname = $(".usrname").val()
    email = $(".email").val()
    mobileno = $(".mobileno").val()
    size = $(".peopleinhome").val()
    postData =
      usrname: usrname
      flatno: flatno
      email: email
      mobileno: mobileno
      size: size

    $.ajax
      type: "POST"
      url: ""
      data: postData
      dataType: "json"
      success: (returnData) ->
        alert "success"
        return
  )


  $.ajax
    type:"GET"
    url:"data/popup.json"
    dataType:"json"
    success:(resp)->
      if resp.popupflag is true
        $('.usagewarning').popup('open')
      return


  $('.pledge').on "click", ->
    $('.usagewarning').popup('close')
    setTimeout(->
      $('.restorewater').popup('open')
    ,1000)

  $('.leaveit').on "click", ->
    debugger
    $('.usagewarning').popup('close')
    setTimeout(->
      ###$('.restorewater').popup('open')###
    ,1000)
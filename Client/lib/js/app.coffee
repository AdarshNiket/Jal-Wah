$(document).ready ->
  $("#registrationForm").on "submit", ->
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
    return

  $('.pledge').on "click", ->
    $('.consumtionoption').popup('close')
    setTimeout(->
      $('.restorewater').popup('open')
    ,1000)
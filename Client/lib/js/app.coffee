# App load Event Handlers
$(document).ready(->
  EMAIL_KEY = 'emailId'
  emailId = localStorage.getItem(EMAIL_KEY)

  if emailId
    $.ajax
        type: "GET"
        url: serverHost + "/checkUser/"+emailId
        dataType: "json"
    .done (respData)->
        if respData.status is 'SUCCESS'
          window.location.hash = "#home"
          $(".usagewarning").popup "open"  if respData.popupflag is true
        else
          $('#login').show()
        return
  else
    $('#login').show()

  # $("#registrationForm .submit").on("click", ->
  #   $("#registrationForm").trigger("submit")
  # )  
  
  $("#registrationForm").on "submit", ($event)->
    $event.preventDefault()
    usrname = $(".usrname").val()
    email = $(".email").val()
    mobileno = $(".mobileno").val()
    size = $(".peopleinhome").val()
    invitedMembers = $(".inviteemail").each (i, elem) ->
      $(elem).val()
    return
 
    postData =
      residentName: usrname
      emailId: email
      mobileNumber: mobileno
      peopleInHome: size
      invitedMembers: invitedMembers 

    $.ajax
      type: "POST"
      url: serverHost + "/createUser"
      crossDomain: true
      data: postData
      dataType: "json"
    .done (respData)->
        if respData.status is 'SUCCESS'
          localStorage.setItem(EMAIL_KEY, email)
          window.location.hash = "#home"
        return
    .fail ->
      return
    return false
) 


# Home Page Event Handlers  
$(document).ready(->
  $(".pledge").on "click",->
    $(".usagewarning").popup "close"
    
    setTimeout(->
      $(".restorewater").popup "open"
    , 1000)
    setTimeout(->
      $(".restorewater").popup "close"
    , 5000)

  $(".leaveit").on "click", ->
    $('.usagewarning').popup('close')
    setTimeout(->
      $('.icon-Pledge').show()
    ,1000)
  return

  #$('.icon-notification').on "click", ->
    #$('.notification').popup "open"
)
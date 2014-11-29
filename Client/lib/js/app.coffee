# App load Event Handlers
$(document).ready(->
  EMAIL_KEY = 'emailId'
  emailId = localStorage.getItem(EMAIL_KEY)

  if emailId
    $.ajax
        type: "GET"
        url: "/checkUser/"+emailId
        dataType: "json"
    .done (resp)->
        $(".usagewarning").popup "open"  if resp.popupflag is true
        return

  # $("#registrationForm .submit").on("click", ->
  #   $("#registrationForm").trigger("submit")
  # )
  
  $("#registrationForm").on "submit", ->
    usrname = $(".usrname").val()
    email = $(".email").val()
    mobileno = $(".mobileno").val()
    size = $(".peopleinhome").val()
    # invitedMembers = 
    postData =
      residentName: usrname
      emailId: email
      mobileNumber: mobileno
      peopleInHome: size
      # invitedMembers: [
      #   "sreejith@gmail.com"
      #   "adarsh@gmail.com"
      # ]

    $.ajax
      type: "POST"
      url: serverHost + "/createUser"
      crossDomain: true
      data: postData
      dataType: "json"
    .done (returnData)->
        if returnData.status is 'SUCCESS'
          localStorage.setItem(EMAIL_KEY, 'hai@gmail.com')
          window.location.hash = "#home"
        return
    .fail ->
      return
  return false
) 


# Pledge Page Event Handlers  
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
    debugger
<<<<<<< HEAD
    $(".usagewarning").popup "close"
  return
)
=======
    $('.usagewarning').popup('close')
    setTimeout(->
      $('.icon-Pledge').show()
    ,1000)
>>>>>>> f7f70c07120751d434b34293dec48db7f90163dd

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

  $("#container").highcharts
  chart:
    type: "bar"

  title:
    text: "Historic World Population by Region"

  subtitle:
    text: "Source: Wikipedia.org"

  xAxis:
    categories: [
      "Africa"
      "America"
      "Asia"
      "Europe"
      "Oceania"
    ]
    title:
      text: null

  yAxis:
    min: 0
    title:
      text: "Population (millions)"
      align: "high"

    labels:
      overflow: "justify"

  tooltip:
    valueSuffix: " millions"

  plotOptions:
    bar:
      dataLabels:
        enabled: true

  legend:
    layout: "vertical"
    align: "right"
    verticalAlign: "top"
    x: -40
    y: 100
    floating: true
    borderWidth: 1
    backgroundColor: ((Highcharts.theme and Highcharts.theme.legendBackgroundColor) or "#FFFFFF")
    shadow: true

  credits:
    enabled: false

  series: [
    {
      name: "Year 1800"
      data: [
        107
        31
        635
        203
        2
      ]
    }
    {
      name: "Year 1900"
      data: [
        133
        156
        947
        408
        6
      ]
    }
    {
      name: "Year 2008"
      data: [
        973
        914
        4054
        732
        34
      ]
    }
  ]


)

    


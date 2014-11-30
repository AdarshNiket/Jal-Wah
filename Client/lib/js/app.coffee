window.global = {}

(->

chartMetaData =
  chart:
    type: "column"

  xAxis:
    categories: []

  yAxis:
    min: 0
    title:
      text: "Water Usage (ltrs)"

  tooltip:
    headerFormat: "<span style=\"font-size:10px\">{point.key}</span><table>"
    pointFormat: "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>" + "<td style=\"padding:0;width:15px;\"><b>{point.y:.1f} mm</b></td></tr>"
    footerFormat: "</table>"
    shared: true
    useHTML: true

  plotOptions:
    column:
      pointPadding: 0.2
      borderWidth: 0

  series: []

window.global.renderChart =(freq, compareWidth)->
  freq = freq or 'daily'
  url = serverHost + "/usageMetrics?flatId=b502&frequency="+freq
  if(compareWidth)
    url = url + '&compareWidth='+compareWidth
  
  $.ajax
    type: "GET"
    url: url
    crossDomain: true
    dataType: "json"
  .done (respData)->
      if respData.status is 'SUCCESS'
        chartMetaData.xAxis.categories = respData.data.periods
        chartMetaData.series = respData.data.usages
        $('.chartArea').html('')
        $('.chartArea.'+freq).highcharts(chartMetaData)
      return
  .fail ->
    return

)()

# App load Event Handlers
$(document).ready(->
  EMAIL_KEY = 'emailId'
  emailId = localStorage.getItem(EMAIL_KEY)

  if emailId
    $.ajax
        type: "GET"
        crossDomain: true
        url: serverHost + "/checkUser/"+emailId
        dataType: "json"
    .done (respData)->
        if respData.status is 'SUCCESS'
          global.renderChart()
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
    invitedMembers = []
    $(".inviteemail").each (i, elem) ->
      if $(elem).val()
        invitedMembers.push($(elem).val())
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
          global.renderChart()
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


  $('.tabClick').on "click", ->
    freq = $(this).data('frequency')
    global.renderChart(freq);
    return false
)
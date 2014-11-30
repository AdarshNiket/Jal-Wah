// Generated by CoffeeScript 1.6.3
var chartMetaData;

window.global = {};

(function() {}, chartMetaData = {
  chart: {
    type: "column"
  },
  xAxis: {
    categories: []
  },
  yAxis: {
    min: 0,
    title: {
      text: "Water Usage (ltrs)"
    }
  },
  tooltip: {
    headerFormat: "<span style=\"font-size:10px\">{point.key}</span><table>",
    pointFormat: "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>" + "<td style=\"padding:0;width:15px;\"><b>{point.y:.1f} mm</b></td></tr>",
    footerFormat: "</table>",
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: []
}, window.global.renderChart = function(freq, compareWidth) {
  var url;
  freq = freq || 'daily';
  url = serverHost + "/usageMetrics?flatId=b502&frequency=" + freq;
  if (compareWidth) {
    url = url + '&compareWidth=' + compareWidth;
  }
  return $.ajax({
    type: "GET",
    url: url,
    crossDomain: true,
    dataType: "json"
  }).done(function(respData) {
    if (respData.status === 'SUCCESS') {
      chartMetaData.xAxis.categories = respData.data.periods;
      chartMetaData.series = respData.data.usages;
      $('.chartArea').html('');
      $('.chartArea.' + freq).highcharts(chartMetaData);
    }
  }).fail(function() {});
})();

$(document).ready(function() {
  var EMAIL_KEY, emailId;
  EMAIL_KEY = 'emailId';
  emailId = localStorage.getItem(EMAIL_KEY);
  if (emailId) {
    $.ajax({
      type: "GET",
      crossDomain: true,
      url: serverHost + "/checkUser/" + emailId,
      dataType: "json"
    }).done(function(respData) {
      if (respData.status === 'SUCCESS') {
        global.renderChart();
        window.location.hash = "#home";
        setTimeout(function() {
          $(".usagewarning").popup("open");
        }, 1000);
      } else {
        $('#login').show();
      }
    });
  } else {
    $('#login').show();
  }
  return $("#registrationForm").on("submit", function($event) {
    var email, invitedMembers, mobileno, postData, size, usrname;
    $event.preventDefault();
    usrname = $(".usrname").val();
    email = $(".email").val();
    mobileno = $(".mobileno").val();
    size = $(".peopleinhome").val();
    invitedMembers = [];
    $(".inviteemail").each(function(i, elem) {
      if ($(elem).val()) {
        invitedMembers.push($(elem).val());
      }
    });
    postData = {
      residentName: usrname,
      emailId: email,
      mobileNumber: mobileno,
      peopleInHome: size,
      invitedMembers: invitedMembers
    };
    $.ajax({
      type: "POST",
      url: serverHost + "/createUser",
      crossDomain: true,
      data: postData,
      dataType: "json"
    }).done(function(respData) {
      if (respData.status === 'SUCCESS') {
        localStorage.setItem(EMAIL_KEY, email);
        global.renderChart();
        window.location.hash = "#home";
      }
    }).fail(function() {});
    return false;
  });
});

$(document).ready(function() {
  $(".pledge").on("click", function() {
    $(".usagewarning").popup("close");
    setTimeout(function() {
      return $(".restorewater").popup("open");
    }, 1000);
    return setTimeout(function() {
      return $(".restorewater").popup("close");
    }, 5000);
  });
  $(".leaveit").on("click", function() {
    $('.usagewarning').popup('close');
    setTimeout(function() {
      return $('.icon-Pledge').show();
    }, 1000);
  });
  return $('.tabClick').on("click", function() {
    var freq;
    freq = $(this).data('frequency');
    global.renderChart(freq);
    return false;
  });
});

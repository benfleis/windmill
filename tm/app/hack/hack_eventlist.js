var WW_SHEET_URL = "https://spreadsheets.google.com/feeds/cells/0AlpZx_FJWIZ5dHNpaXR0SElmSmhYcHBlLXhyclV6d1E/WW_ID/public/basic?alt=json-in-script&callback=?";
var WW_SCHEDULES = ["1", "2", "3", "4"]; //thu, fri, say, sun

var isDay =  function(i) {

  var d = new Date();
  return d.getDate() == i;
};


var _WW_Callback = function(html) {
  console.log(html);
};

var loadSchedule = function(id) {
    _WW_Callback("loading");
    var wwRequestURL = WW_SHEET_URL.replace("WW_ID", id);

    var wwOnData = function(o) {
      buildSchedule(o);
    };


    $.ajax({
      url: wwRequestURL,
      success: wwOnData,
      dataType: 'json'
    });

};


var buildSchedule = function(data) {
  var entries = data.feed.entry;
  var html = [];
  html.push("<table class='schedule-list'>");
  for(var i = 0; i < entries.length; i+=4) {
    var startTime = getTimeContent(entries[i]);
    var endTime = getTimeContent(entries[i+1]);
    var title = getContent(entries[i+2]);
    var loc = getContent(entries[i+3]);
    
    html.push(getScheduleListItem(startTime, endTime, title, loc));
  }
  
  html.push("</table>");
  
  _WW_Callback(html.join(''));
};

var getTimeContent = function(o) {
  var s = getContent(o);
  var split = s.split(":");
  if(split.length > 1) {
    return split[0] + ":"+split[1];
  }
  return "&nbsp;";
}

var getContent = function(o) {
  var s = o.content.$t;
  return s != '-' ? s : "&nbsp;";
}

var getScheduleListItem = function(startTime, endTime, title, loc) {
  var html = [];
  html.push("<tr>");
  html.push("<td class='starttime'>" + startTime + "</td>");
  html.push("<td class='endtime'>" + endTime + "</td>");
  html.push("<td class='title'>" + title + "</td>");
  html.push("<td class='loc'>" + loc + "</td>");
  html.push("</tr>");
  return html.join('');
}

var getScheduleTitle = function(key) {
  switch(key) {
    case "thu": return "Thursday";
    case "fri": return "Friday";
    case "sat": return "Saturday";
    case "sun": return "Sunday";
  }
};


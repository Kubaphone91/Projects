
$(document).ready(function() {

  function contentUpdate() {
    var prefix = "<html><head><style type='text/css'>";
    var inter = "</style></head><body>";
    var suffix = "</body></html>";

    $("iframe").contents().find("html").html(prefix + $("#cssPanel").val() + inter + $("#htmlPanel").val() + suffix);

    var jsContent = document.getElementById("outputPanel").contentWindow;
    jsContent.eval($("#javascriptPanel").val());
  }

  contentUpdate();

  $(".toggleButton").hover(function() {
    $(this).addClass("highlightedButton");
  }, function() {
    $(this).removeClass("highlightedButton");
  });

  $(".toggleButton").click(function() {
    $(this).toggleClass("active");
    $(this).removeClass("highlightedButton");

    var panelId = $(this).attr("id") + "Panel";
    $("#" + panelId).toggleClass("hidden");

    var activePanels = 4 - $(".hidden").length;
    $(".panel").width(($(window).width() / activePanels) - 10);
  });

  $("iframe").height($(window).height() - $(".header").height() - 15);
  $("textarea").height($(window).height() - $(".header").height() - 15);

  $(".panel").width(($(window).width() / 2) - 10);

  $("textarea").on('change keyup paste', function() {
    contentUpdate();
  })
});
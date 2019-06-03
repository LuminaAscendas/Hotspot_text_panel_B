var begin_entered=false;
var count = 0;
var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	/* if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
	}
	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}
	if (/android/i.test(userAgent)) {
		return "Android";
	} */
$(document).ready(function(){
	if(!begin_entered){
		$('#pageTitle').html(data.beginPageTitle);
		$('#pageTitle').attr("aria-label",data.beginPageTitle);				
		// $('#pageImage').attr("aria-label","Climate factors that shape terrestrial biomes");				
		$('#begin_btn').attr("aria-label","Begin");
		set_tab();
		$('#begin_dummy').on('focus', function() {
			$('#pageTitle').focus();
		});		
		$('#begin_reverse_dummy').on('focus', function() {
			$('#pageTitle').focus();
		});
		$("#pageImage").hover(function(event) {
			$('#pageImage').attr("title","Climate factors that shape terrestrial biomes");
			$(this).focus(function(){
				$('#pageImage').removeAttr("title");
			});
		},function(event) {
			$('#pageImage').removeAttr("title");
		});
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			$('a').remove();
			$('#direction_text').attr('role','text').attr('aria-label',data.directText_AriaLable);
		}
	}
	$('#begin_btn').off('click').on('click',function(){
		$('#begin_page').remove();
		begin_entered=true;
		$('#whole_container').css("width","666px");
		var setTime = setTimeout(function(){
			$('<div id="secondScrn_dummy1" role="none"></div>').appendTo('#whole_container');
			$('<a href="#direction_text" id="anchorId" style="position: absolute;top: -200px;">Skip to Direction</a>').appendTo('#whole_container');
			$('<h1 id="direction_text" role="heading" aria-level="1"></h1>').appendTo('#whole_container');
			$('<div id="responsive_container" role="none"><img role="img" id="responsiveImg" src="assets/images/secondScrPage.png" aria-label="Climate factors that shape terrestrial biomes" alt="Climate factors that shape terrestrial biomes"></div>').appendTo('#whole_container');
			for(let i=0;i<(data.popUp_Tiles.length-1);i++){
				$('<button type="button" id="popUpBtn_'+i+'" class="popUpBtnCls" aria-label="Hotspot '+(i+1)+' of 3">&#x3f;</button>').appendTo('#responsive_container');
			}
			$('<div id="popUp_container"></div>').appendTo('#whole_container');
			$('<div id="popUp_Title" role="none"></div>').appendTo('#popUp_container');
			$('<div id="popUp_Content" role="none"></div>').appendTo('#popUp_container');
			$('<div id="popUp_Close" role="button" aria-label="Close"></div>').appendTo('#popUp_container');
			$('<div role="button" id="reset_btn" aria-label="Reset">Reset</div>').appendTo('#responsive_container');
			$('<div id="secondScrn_dummy2" role="none"></div>').appendTo('#whole_container');
			$('#direction_text').html(data.direction_text);
			$('#direction_text').attr('aria-label',data.directText_AriaLable);
			$('#popUp_Title').html(data.popUp_Tiles[0].popUp_Heading);
			$('#popUp_Title').attr('aria-label',$('#popUp_Title').text());
			$('#popUp_Content').html(data.popUp_Tiles[0].popUp_Content);
			$('#popUp_Content').attr('aria-label',$('#popUp_Content').text());
			$('#popUp_Close').addClass('popUp_Close_hide');			
			$("#responsiveImg").hover(function(event) {
				$('#responsiveImg').attr("title","Climate factors that shape terrestrial biomes");
				$(this).focus(function(){
					$('#responsiveImg').removeAttr("title");
				});
			},function (event) {
				$('#responsiveImg').removeAttr("title");
			});
			$('#secondScrn_dummy1').on('focus', function() {			
				$('#direction_text').blur();
				$('#direction_text').focus();
			});		
			$('#secondScrn_dummy2').on('focus', function() {
				$('#direction_text').focus();
			});
			$('.popUpBtnCls').off('click').on('click',popUpBtn_ClickFun);
			$('#reset_btn').off('click').on('click',pageReload);
			setTabindex('notClicked');
			resizeApp();
		},100);
	});
	document.body.onkeyup = function(e){
		if(e.keyCode == 32 || e.keyCode == 13){
			e.preventDefault();
			$('#'+document.activeElement.id).trigger('click');
		}
	}
	resizeApp();
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		$('a').remove();
		$('#direction_text').attr('role','text').attr('aria-label',data.directText_AriaLable);
	}
});
window.onresize = function(){
	resizeApp(); 
}
var pageReload = function(){
	location.reload();
}
var currentId;
var popUpBtn_ClickFun = function(){
	$('.popUpBtnCls').removeClass('popUpBtn_Clicked');
	$(this).addClass('popUpBtn_Clicked');
	currentId = $(this).attr('id').slice(9);
	$('#popUp_Title').html(data.popUp_Tiles[Number(currentId)+1].popUp_Heading);
	$('#popUp_Title').attr('aria-label',$('#popUp_Title').text());
	$('#popUp_Content').html(data.popUp_Tiles[Number(currentId)+1].popUp_Content);
	$('#popUp_Content').attr('aria-label',$('#popUp_Content').text());
	$('#popUp_Close').removeClass('popUp_Close_hide').addClass('popUp_Close_show');
	$('.popUp_Close_show').off('click').on('click',popUp_closeFun);
	setTabindex(currentId);
}
var popUp_closeFun = function(e){
	$('.tab_index').removeAttr('tabindex').removeClass('tab_index');
	e.stopImmediatePropagation();
	$('.popUp_Close_show').off('click');
	$('.popUpBtnCls').removeClass('popUpBtn_Clicked');
	$('#popUp_Close').removeClass('popUp_Close_show').addClass('popUp_Close_hide');
	$('#popUp_Title').html(data.popUp_Tiles[0].popUp_Heading);
	$('#popUp_Title').attr('aria-label',$('#popUp_Title').text());
	$('#popUp_Content').html(data.popUp_Tiles[0].popUp_Content);
	$('#popUp_Content').attr('aria-label',$('#popUp_Content').text());
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		
	}else{
		setTabindex('notClicked');
		$('#secondScrn_dummy1').focus();
	}
}
var set_tab = function(){
	if(!begin_entered){
		$('#begin_dummy').addClass('tab_index');
		$('#pageTitle').addClass('tab_index');
		$('.beginPageImage').addClass('tab_index');
		$('#begin_btn').addClass('tab_index');
		$('#begin_reverse_dummy').addClass('tab_index');
		$('.tab_index').each(function( index ){		
			$('.tab_index').attr('tabindex',0);
		});
	}
}
var setTabindex = function(a){
	var objectName = 'popUpBtn_'+a;
	$('.tab_index').removeAttr('tabindex').removeClass('tab_index');
	$.each(data.tabOrder[objectName],function(k,v){
		$('#'+data.tabOrder[objectName][k]).addClass('tab_index');
		$('#'+data.tabOrder[objectName][k]).attr('tabindex',k);
	});
}
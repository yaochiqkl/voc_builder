$(function(){
	var	curIndex = 1, // 当前题型
		// 题型的详细数据，包括图片、音频路径等
		data = null,
		typeHtml = {
		"typenw01": '<section class="typenw01" id="typenw01">' +
			            '<div class="typenw01-left">' +
			                '<div class="typenw01-sentence-info" id="typenw01SenInfo"><h2>%sentence%</h2><em></em><audio id="audio" autoplay="autoplay" src="%audio_sentence%"></audio></div>' +
			                '<div class="typenw01-wiki"><em></em><h2>%mean_sentence%</h2></div>' +
			            '</div>' +
			            '<div class="typenw01-right">' +
			                '<div class="typenw01-choose-area">' +
			                    '<ul><li><img src="%pic_option_1%"></li><li><img src="%pic_option_2%"></li><li><img src="%pic_option_3%"></li><li><img src="%pic_option_4%"></li></ul>' +
			                '</div>' +
			            '</div>' +
			        '</section>',
		"typenw02":  '<section class="typenw02" id="typenw02">' +
			            '<div class="typenw02-left">' +
			                '<div class="typenw02-sentence-info" id="typenw02SenInfo"><h2>%word%</h2><em></em><audio id="audio" autoplay="autoplay" src="%audio_word%"></audio></div>' +
			                '<div class="typenw02-wiki"><em></em><h2>%sentence%</h2></div>' +
			            '</div>' +
			            '<div class="typenw02-right">' +
			                '<div class="typenw02-choose-area">' +
			                    '<ul><li><img src="%pic_option_1%"></li><li><img src="%pic_option_2%"></li><li><img src="%pic_option_3%"></li><li><img src="%pic_option_4%"></li></ul>' +
			                '</div>' +
			            '</div>' +
			        '</section>',
		"typenw03": '<section class="typenw03" id="typenw03">' +
			            '<div class="typenw03-left">' +
			                '<div class="typenw03-sentence-info" id="typenw03SenInfo">' +
			                    '<h2>%word%</h2><em></em><audio id="audio" autoplay="autoplay" src="%audio_word%"></audio>' +
			                '</div>' +
			                '<div class="typenw03-wiki">' +
			                	'<em></em>' +
			                	'<div class="wiki-left"><img src="%picture%"></div>' +
			                	'<div class="wiki-right"><h3>%sentence%</h3><h3>%mean_sentence%</h3></div>' +
			                '</div>' +
			            '</div>' +
			            '<div class="typenw03-right">' +
			                '<div class="typenw03-choose-area">' +
			                    '<ul><li>%mean_option_1%</li><li>%mean_option_2%</li><li>%mean_option_3%</li><li>%mean_option_4%</li></ul>' +
			                '</div>' +
			            '</div>' +
			        '</section>'
	};

	function init() {
		skipToNext();
	}

	function skipToNext() {
		if(curIndex === (flag + 1)) {
			alert("当前已是最后一个题型！");
		} else {
			var appendHtml = '';

			data = eval("data" + curIndex);

			// 索引+1
			curIndex++;

			$("#typenw01").remove();
			$("#typenw02").remove();
			$("#typenw03").remove();

			appendHtml = replaceHtml();
			$("#zjnwMain").append(appendHtml);
			$("#" + data.testtype).show();

			$("#" + data.testtype + "SenInfo > em").on("click", function() {
				audioPlay();
			});
			$("." + data.testtype + "-choose-area li").on("click", function() {
				if(checkAnswer(this, data.testtype) === true) {
					$(this).css({
						"background-color": "#AAE1C9"
					});

					setTimeout(function() {
						skipToNext();
					}, 500);
				} else {
					var _this = this;
					$(_this).css({
						"background-color": "#F8BBCB"
					});

					setTimeout(function() {
						$(_this).css({
							"background-color": "#f5f5f5"
						});
					}, 600);
					$("." + data.testtype + "-wiki").fadeIn(200);
				}
			});
			$("." + data.testtype + "-wiki > em").on("click", function() {
				$("." + data.testtype + "-wiki").fadeOut(200);
			});
		}
	}

	function replaceHtml() {
		var newHtml = typeHtml[data.testtype],
			// 被替换项
			item = '',
			start = 0,
			end = 0,
			sentence = '',
			// 用于替换的正则表达式
			pattern = null;

		for(var i in data) {
			// 构建相应正则表达式
			pattern = new RegExp("%" + i + "%", "g");

			// 替换html
			if(i === "sentence") {
				// 高亮句子中的单词
				sentence = data[i];
				start = sentence.indexOf(data.word);
				end = sentence.indexOf(" ", start + 1);
				if(end === -1) {
					end = sentence.length;
				}
				sentence = sentence.substring(0, start) + '<span>' + sentence.substring(start, end) + '</span>' + sentence.substring(end);
				newHtml = newHtml.replace(pattern, sentence);
			} else {
				newHtml = newHtml.replace(pattern, data[i]);
			}
		}

		return newHtml;
	}

	function checkAnswer(element, testtype) {
		var answer = "";
		if(testtype === "typenw03") {
			answer = $(element).text().trim();
			return answer === data.mean_word ? true : false;
		} else if(testtype === "typenw01" || testtype === "typenw02"){
			answer = $(element).children("img").attr("src");
			return answer === data.picture ? true : false;
		} else {
			return false;
		}
	}

	function audioPlay() {
		document.getElementById("audio").play();
	}

	window.onload = init;
});
/**
 * [测试各种模式呈现效果的js代码]
 * @author Lesty(Zhengqiyu)
 * @code-date 2015.10.19
 */
$(function() {
	// 当前题型索引位置
	var curIndex = 1,
		// 被替换项的数组对象
		replaceArr = ["picture1", "sentence", "audio_sentence"];
		// 题型的html代码
		typeHtml = '<div class="top-pic">' +
			    		'<img src="%picture1%">' +
			    	'</div>' +
			    	'<div class="mid-info">' +
			    		'<h2>%sentence%</h2>' +
			    		'<img src="img/trumpet.png">' +
			    		'<audio id="audio" autoplay="autoplay" src="%audio_sentence%"></audio>' +
			    	'</div>';
	/**
	 * [init 初始化函数]
	 */
	function init() {
		skipToNext();
		regEvent();
	}

	function skipToNext() {
		if(curIndex === (flag + 1)) {
			alert("当前已是最后一个");
			addExp();
			window.location = "m_mission_fin.html?id="+list_id+"&m=2";
			$("#toNext").hide();
		} else {
			var appendHtml = '',
				// 题型的详细数据，包括图片、音频路径等
				data = eval("data" + curIndex);

			// 索引+1
			curIndex++;

			// 如果类型为typecheck，则跳过
			if(data.testtype === "typecheck") {
				skipToNext();
			} else {
				appendHtml = replaceHtml(data);
				$("#typesInfo").empty();
				$("#typesInfo").append(appendHtml);
				$(".mid-info > img").on("click", function() {
					audioPlay();
				});
			}
		}
	}

	function replaceHtml(data) {
		var newHtml = typeHtml,
			// 被替换项
			item = '',
			start = 0,
			end = 0,
			sentence = '',
			// 用于替换的正则表达式
			pattern = null;

		for(var i = replaceArr.length; i--;) {
			item = replaceArr[i];
			// 构建相应正则表达式
			pattern = new RegExp("%" + item + "%", "g");

			// 替换html
			if(data.testtype === "typeos01" && item === "picture1") {
				newHtml = newHtml.replace(pattern, data.picture);
			} else if(item === "sentence") {
				// 高亮句子中的单词
				sentence = data[item].replace(/\u00a0/g, " ");
				start = sentence.indexOf(data.word);
				end = sentence.indexOf(" ", start + 1);
				if(end === -1) {
					end = sentence.length;
				}
				sentence = sentence.substring(0, start) + '<span>' + sentence.substring(start, end) + '</span>' + sentence.substring(end);
				newHtml = newHtml.replace(pattern, sentence);
			} else {
				newHtml = newHtml.replace(pattern, data[item]);
			}
		}

		return newHtml;
	}

	function audioPlay() {
		document.getElementById("audio").play();
	}

	/**
	 * [regEvent 事件注册]
	 */
	function regEvent() {
		$("#toNext").on("click", function() {
			skipToNext();
		});
	}

	// 启动脚本
	init();
});
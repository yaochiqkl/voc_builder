/**
 * [新题型测试demo03的js文件]
 * @author Lesty
 * @code-date 2015.11.11
 */
$(function() {
	var curData = null,
		AUDIO_DEFAULT = "http://baicizhan.cdn.bj.xs3cnc.com/word_audios/Lesty.mp3",
		curIndex = 0,
		curType = 0, // 当前spellblock的data-type
		curBlockIndex = 0,
		typesList = [], // 题型列表
		previewDir = [
			// 预习题型字典
			{word: "art", typesName: ["pattern-1", "pattern-2", "pattern-3", "ntdemo01-1", "wordsSel"]},
			{word: "Chinese", typesName: ["pattern-1", "pattern-2", "pattern-3", "ntdemo01-1", "wordsSel"]},
			{word: "classroom", typesName: ["pattern-1", "pattern-2", "pattern-3", "ntdemo01-1", "wordsSel"]},
			{word: "English", typesName: ["pattern-1", "pattern-2", "pattern-3", "ntdemo01-1", "wordsSel"]},
			{word: "library", typesName: ["pattern-1", "pattern-2", "pattern-3", "ntdemo01-1", "wordsSel"]},
			{word: "math", typesName: ["pattern-1", "pattern-2", "pattern-3", "ntdemo01-1", "wordsSel"]},
			{word: "music", typesName: ["pattern-1", "pattern-2", "pattern-3", "ntdemo01-1", "wordsSel"]},
			{word: "playground", typesName: ["pattern-1", "pattern-2", "pattern-3", "ntdemo01-1", "wordsSel"]},
			{word: "science", typesName: ["pattern-1", "pattern-2", "pattern-3", "ntdemo01-1", "wordsSel"]}
		],
		reviewDir = [
			// 复习题型字典
			{word: "art", typesName: ["ntdemo01-2"]},
			{word: "Chinese", typesName: ["ntdemo01-2"]},
			{word: "classroom", typesName: ["ntdemo01-2"]},
			{word: "English", typesName: ["ntdemo01-2"]},
			{word: "library", typesName: ["ntdemo01-2"]},
			{word: "math", typesName: ["ntdemo01-2"]},
			{word: "music", typesName: ["ntdemo01-2"]},
			{word: "playground", typesName: ["ntdemo01-2"]},
			{word: "science", typesName: ["ntdemo01-2"]},

			{word: "art", typesName: ["ntdemo02", "wordsSel"]},
			{word: "Chinese", typesName: ["ntdemo02", "wordsSel"]},
			{word: "classroom", typesName: ["ntdemo02", "wordsSel"]},
			{word: "English", typesName: ["ntdemo02", "wordsSel"]},
			{word: "library", typesName: ["ntdemo02", "wordsSel"]},
			{word: "math", typesName: ["ntdemo02", "wordsSel"]},
			{word: "music", typesName: ["ntdemo02", "wordsSel"]},
			{word: "playground", typesName: ["ntdemo02", "wordsSel"]},
			{word: "science", typesName: ["ntdemo02", "wordsSel"]}
		],
		typesDir = [], // 最终的题型字典
		typesHtml = {
			pattern: '<section class="pattern" id="pattern">' +
			    '<header>' +
			        '<div class="pattern-img-info"><img src="%picture%"></div>' +
			    '</header>' +
			    '<article>' +
			        '<div class="pattern-sentence-info" id="patternSenInfo"><h2>%sentence%</h2><em></em><audio id="audio" preload autoplay="autoplay" src="%audio_sentence%"></audio>' +
			        	'<script>document.getElementById("audio").play()</script>' +
			        '</div>' +
			        '<em></em>' +
			    '</article>' +
			'</section>',
			ntdemo01: '<section class="ntdemo01" id="ntdemo01">' +
			            '<header>' +
			                '<div class="ntdemo01-img-info"><img src="%picture%"></div>' +
			                '<div class="ntdemo01-sentence-info" id="ntdemo01SenInfo"><h2>%sentence%</h2><em></em><audio id="audio" preload autoplay="autoplay" src="%audio_sentence%"></audio></div>' +
			            '</header>' +
			            '<article>' +
			                '<div class="ntdemo01-choose-area" id="ntdemo01ChooseArea">' +
			                    '<ul><li>%answer_option_1%</li><li>%answer_option_2%</li></ul>' +
			                '</div>' +
			            '</article>' +
			        '</section>',
			wordsSel: '<section class="wordsSel" id="wordsSel">' +
			            '<header id="wordsSelSenInfo"><h2>%word%</h2><em></em><audio id="audio" preload autoplay="autoplay" src="%audio_word%"></audio></header>' +
			            '<article>' +
			                '<div class="wordsSel-choose-area" id="wordsSelChooseArea"><ul><li>%mean_option_1%</li><li>%mean_option_2%</li><li>%mean_option_3%</li><li>%mean_option_4%</li></ul></div>' +
			            '</article>' +
			        '</section>',
			ntdemo02: '<section class="ntdemo02" id="ntdemo02">' +
						'<header id="ntdemo02SenInfo">' +
							'<div class="spell-answer"><ul></ul></div>' +
							'<em></em>' +
							'<audio id="audio" preload autoplay="autoplay" src="%audio_word%"></audio>' +
						'</header>' +
						'<article>' +
							'<div class="ntdemo02-img-info"><img src="%picture%"></div>' +
						'</article>' +
						'<div class="tip-area" id="tipArea">' +
							'<div class="tip-list"><h1>Tips:</h1><ul></ul></div>' +
							'<em></em>' +
						'</div>' +
					'</section>'
		};

	function init() {
		regList.regStuTypeChoose();
		regList.regBackToStart();

	}

	function skipToNext() {
		if(0 === typesList.length) {
			alert("当前已是最后一个题型！");
		} else {
			curData = typesList.shift();

			$("#ntdemo02").remove();
			$("#ntdemo01").remove();
			$("#pattern").remove();
			$("#wordsSel").remove();

			$("#ntdemoMain").append(replaceHtml());
			if(curData.testtype === "ntdemo02") {
				buildSpellBlock(curData.spell_block);
				regList.regSpellCheck();
				regList.regKeyDown();
				regList.regBackToSpell();
				$("#" + curData.testtype).show();
				$(".spell-answer input")[0].focus();
			} else if(curData.testtype === "pattern") {
				regList.regToNext();
			} else if(curData.testtype === "ntdemo01") {
				regList.regChooseItem(curData.testtype);
			} else if(curData.testtype === "wordsSel") {
				regList.regChooseItem(curData.testtype);
			}

			regList.regAudioPlay();
			$("#" + curData.testtype).show();
		}
	}

	function audioPlay() {
		document.getElementById("audio").play();
	}

	function replaceHtml() {
		var newHtml = typesHtml[curData.testtype],
			// 被替换项
			item = '',
			wordSplitArr = [],
			tip = '',
			start = 0,
			end = 0,
			sentence = '',
			// 用于替换的正则表达式
			pattern = null;

		for(var i in curData) {
			// 构建相应正则表达式
			pattern = new RegExp("%" + i + "%", "g");

			// 替换html
			if(i === "sentence") {
				// 高亮句子中的单词
				sentence = curData[i];
				wordSplitArr = curData.word.split(" ");
				for(var i = 0; i < wordSplitArr.length; i++) {
					start = sentence.indexOf(wordSplitArr[i]);
					end = sentence.indexOf(" ", start + 1);

					if(end === -1) {
						end = sentence.length;
					}
					sentence = sentence.substring(0, start) + '<span>' + sentence.substring(start, end) + '</span>' + sentence.substring(end);
				}

				newHtml = newHtml.replace(pattern, sentence);
			} else {
				newHtml = newHtml.replace(pattern, curData[i]);
			}
		}

		return newHtml;
	}

	function checkAnswer(element, testtype) {
		var answer = "";
		if(testtype === "ntdemo01") {
			answer = $(element).text().trim();
			return answer === curData.answer ? true : false;
		} else if(testtype === "wordsSel"){
			answer = $(element).text().trim();
			return answer === curData.mean_word ? true : false;
		} else {
			return false;
		}
	}

	function buildSpellBlock(spellBlock) {
		var splitArr = [], // 全部的选项块
			len = 0,
			dataType = 0, // 当前答案的类别
			answerBlock = []; // 正确答案的选项块

		splitArr = getSplitArr(spellBlock);
		len = splitArr.length;
		curBlockIndex = 0;
		for(var i = 0; i < len; i++) {
			if(splitArr[i][0] === "-") {
				$(".spell-answer > ul").append('<li class="know-block" style="width: ' + (splitArr[i].length - 1) * 20 + 'px">' + splitArr[i].substring(1) + '</li>');
			} else {
				for(var j = 0; j < splitArr[i].length - 1; j++) {
					$(".spell-answer > ul").append('<li><input type="text" maxlength="1" data-type=' + dataType + ' data-in-id=' + curBlockIndex + '></li>');
					curBlockIndex++;
				}
				dataType++;
			}
		}
	}

	function getSplitArr(spellBlock) {
		var splitArr = [], // 全部的选项块
			start = -1,
			end = -1,
			str = spellBlock;

			do {
				start = str.search(/[-_]/g);
				end = str.substring(start + 1).search(/[-_]/g);

				if(end === -1) {
					splitArr.push(str.substring(start));
				} else {
					splitArr.push(str.substring(start, start + end + 1));
				}

				str = str.substring(start + end + 1);
			} while(end !== -1)

			return splitArr;
	}

	function clearSpellBlock(curType) {
		var eles = $(".spell-answer > ul input");
		for(var i = 0; i< eles.length; i++) {
			if(~~eles[i].getAttribute("data-type") == curType) {
				eles[i].style.backgroundColor = "#fff";
				eles[i].value = "";
			}
		}
	}

	function addRandomMO(singleType) {
		var hasExsitSet = {},
			randomInteger = 0,
			rLen = resouceList.length;

			singleType["mean_option_" + getRandomInteger(1, 4).toString()] = singleType.mean_word;
			hasExsitSet[singleType.word] = true;
		for(var i = 4; i > 0; i--) {
			if(singleType["mean_option_" + i] == null) {
				randomInteger = getRandomInteger(0, rLen);
				while(hasExsitSet[resouceList[randomInteger].word] === true) {
					randomInteger = getRandomInteger(0, rLen);
				}

				singleType["mean_option_" + i] = resouceList[randomInteger].mean_word;
				hasExsitSet[resouceList[randomInteger].word] = true;
			}
		}
	}

	function addRandomPO(singleType) {
		var hasExsitSet = {},
			randomInteger = 0,
			rLen = resouceList.length;

			singleType["pic_option_" + getRandomInteger(1, 4).toString()] = singleType.picture;
			hasExsitSet[singleType.word] = true;
		for(var i = 4; i > 0; i--) {
			if(singleType["pic_option_" + i] == null) {
				randomInteger = getRandomInteger(0, rLen);
				while(hasExsitSet[resouceList[randomInteger].word] === true) {
					randomInteger = getRandomInteger(0, rLen);
				}

				singleType["pic_option_" + i] = resouceList[randomInteger].picture;
				hasExsitSet[resouceList[randomInteger].word] = true;
			}
		}
	}

	function copyObj(obj) {
		var newObj = {};
		for(var i in obj) {
			// 只复制共有部分
			if(obj.hasOwnProperty(i) && typeof obj[i] !== "object") {
				newObj[i] = obj[i];
			}
		}

		return newObj;
	}

	function cloneTypeInfo(singleType, typeObj) {
		for(var o in typeObj) {
			if(typeObj.hasOwnProperty(o)) {
				singleType[o] = typeObj[o];
			}
		}
	}

	function getRandomInteger(start, end) {
		return Math.floor(Math.random() * end + start);
	}

	function createTypesList() {
		var typesList = [], // 题型列表
			len = typesDir.length,
			tmpArr = [],
			priority = 0, // 题型顺序
			word = "", // 当前读取的单词
			typesName = []; // 单词对应的题型名称

		for(var i = 0; i < len; i++) {
			word = typesDir[i].word;
			typesName = typesDir[i].typesName;
			for(var j = 0; j < typesName.length; j++) {
				tmpArr = typesName[j].split("-");
				priority = parseInt(tmpArr.length > 1 ? tmpArr[tmpArr.length - 1] - 1 : 0, 10);
				typesList.push(createSingleType(word, tmpArr[0], priority));
			}
		}

		return typesList;
	}

	function createSingleType(curWord, typeName, priority) {
		var singleType = null,
			item = null,
			len = resouceList.length;

		for(var i = 0; i < len; i++) {
			item = resouceList[i];
			if(item.word === curWord) {
				singleType = copyObj(item);
				singleType.testtype = typeName;
				singleType.audio_word = AUDIO_DEFAULT.replace("Lesty", singleType.word);
				if(typeName === "pattern") {
					cloneTypeInfo(singleType, item[typeName][priority]);
				} else if(typeName === "ntdemo01") {
					cloneTypeInfo(singleType, item[typeName][priority]);
				} else if(typeName === "wordsSel") {
					addRandomMO(singleType);
				} else if(typeName === "ntdemo02") {
					cloneTypeInfo(singleType, item[typeName][priority]);
				}
				break;
			}
		}

		return singleType;
	}

	function checkInputOver() {
		var elements = $(".spell-answer input");
		for(var i = elements.length; i--; ) {
			if(elements[i].readOnly === false) {
				return false;
			}
		}

		return true;
	}

	function showTips(tips) {
		var element = $("#tipArea ul"),
			tip = "",
			start = 0,
			end = 0,
			audio = "",
			len = tips.length;

		for(var i = 0; i < len; i++) {
			tip = tips[i];
			start = tip.indexOf("*");
			end = tip.indexOf("*", start + 1);
			audio = AUDIO_DEFAULT.replace("Lesty", tip.substring(0, start) + tip.substring(start + 1, end) + tip.substring(end + 1));
			tip = tip.substring(0, start) + '<span>' + tip.substring(start + 1, end) + '</span>' + tip.substring(end + 1);
			element.append('<li>' + tip + '<audio preload src="' + audio + '"></audio></li>');
		}

		regList.regAudioEnd();

		$("#tipArea").fadeIn(300);
		$("#tipArea ul > li > audio")[0].play();
	}

	var regList = {
		regStuTypeChoose: function() {
			$("#startPage li").on("click", function() {
				var stuType = this.getAttribute("data-study-type");
				//document.getElementById("backToStart").style.display = "block";
				document.getElementById("startPage").style.display = "none";
					typesDir = reviewDir;
				typesList = createTypesList();
				skipToNext();
			}).click();
		},
		regAudioPlay: function() {
			$("#" + curData.testtype + "SenInfo > em").on("click", function() {
				audioPlay();
			});
		},
		// pattern题型下一题
		regToNext: function() {
			$("#pattern > article > em").on("click", function() {
				skipToNext();
			});
		},
		// 选项判断
		regChooseItem: function(testtype) {
			$("." + testtype + "-choose-area li").on("click", function() {
				if(checkAnswer(this, testtype) === true) {
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
					$("." + testtype + "-wiki").fadeIn(200);
				}
			});
		},
		// 小学生专用版拼写检查
		regSpellCheck: function() {
			$(".spell-answer > ul input").on("input", function(e) {
				var eles = $(".spell-answer > ul input"),
					curId = parseInt(this.getAttribute("data-in-id"), 10),
					nextNode = this.parentNode.nextSibling,
					item = null,
					splitAnswer = curData.split_answer.split("-"),
					remindCount = splitAnswer.length,
					resultList = [], // 本次分隔答案所包含的所有input节点
					result = "";
				curType = parseInt(this.getAttribute("data-type"), 10);

				// 获取本次结果集
				for(var i = 0; i < eles.length; i++) {
					if(~~eles[i].getAttribute("data-type") == curType) {
						resultList.push(eles[i]);
						result += eles[i].value;
					}
				}

				if(nextNode == null || (nextNode.getAttribute("data-type") !== curType && result.length === splitAnswer[curType].length)) { // 不含input的情况下
					if(result.toLowerCase() === splitAnswer[curType].toLowerCase()) { // 做对了
						for(var i = 0; i < resultList.length; i++) {
							resultList[i].style.backgroundColor = "#AAE1C9";
							resultList[i].readOnly = true;
						}
						remindCount--;

						if($(".spell-answer input")[curId + 1] != null) {
							$(".spell-answer input")[curId + 1].focus();
						}

						if(checkInputOver() === true) {
							setTimeout(function() {
								skipToNext();
							}, 500);
						}
					} else {
						var _this = this;
						_this.readOnly = true;
						for(var i = 0; i < resultList.length; i++) {
							resultList[i].style.backgroundColor = "#F8BBCB";
						}

						setTimeout(function() {
							_this.readOnly = false;
							clearSpellBlock(curType);
							$(".spell-answer input")[curId].blur();
							showTips(curData.tips[curType]);
						}, 700);
					}
				} else { // input
					if(this.value !== "") {
						$(".spell-answer input")[curId + 1].focus();
					}
				}
			});
		},
		regKeyDown: function() {
			$(".spell-answer > ul input").on("keydown", function(e) {
				if(e.which == 8) {
					var curId = ~~$(this).attr("data-in-id");
					if(this.value == "" && curId > 0) {
						if($(".spell-answer input")[curId - 1].readOnly !== true) {
							$(".spell-answer input")[curId - 1].focus();
						}
					}
				}
			});
		},
		regAudioEnd: function() {
			$("#tipArea ul > li > audio").on("ended", function() {
				var element = this.parentNode.nextSibling;
				if(element != null) {
					setTimeout(function() {
						element.style.display = "block";
						element.getElementsByTagName("audio")[0].play();
					}, 300);
				}
			});
		},
		regBackToSpell: function() {
			document.getElementById("tipArea").getElementsByTagName("em")[0].addEventListener("click", function() {
				$("#tipArea").fadeOut(300);
				$("#tipArea ul").empty();
				$(".spell-answer input[data-type=" + curType.toString() + "]")[0].focus();
			});
		}
	};

	window.onload = init;
});

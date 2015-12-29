    target_url = "http://172.16.3.6:3000/voc_builder/";
    function getUserData(){
        $.ajax({
            type: "GET",
            //timeout: 10000,
            //contentType:"application/json;charset=utf-8",
            url: target_url + "get_user_info",
            data: { "name": localStorage.vc_username },
            dataType: "json",
            success: function (data, textStatus){
                console.log(data);
                console.log(data.user_info);
                user_info = data.user_info;
                $("#user-rank").html(user_info.rank);
                $(".progress-bar").attr("style","width: "+ user_info.experience%5*20 +"%");
            },
            error: function (){
                console.warn("获取数据失败");
            }
        });
    }
    function getListData(param) {
        $.ajax({
            type: "GET",
            //timeout: 10000,
            url: target_url+"get_list",
            //dataType: "json",
            data: {"status": param},
            success: function (data, textStatus){
                console.log(data.list[0].id);
                preview_id = data.list[0].id;
                console.log(data.list[0].id);
            },
            error: function (){
                console.warn("获取数据失败");
            }
        });
    }
    function getWordData(id) {
        $.ajax({
            type: "GET",
            //timeout: 10000,
            url:  target_url + "get_word",
            //dataType: "json",
            data: {"list_id" : id },
            async : false,
            success: function (data, textStatus){
                console.log(data);
                word_data = data.words_data;
                initData();
            },
            error: function (){
                console.warn("获取数据失败");
            }
        });
    }
    function updateWordList(id,param) {
        $.ajax({
            type: "GET",
            timeout: 5000,
            url:  target_url + "update_user_list_status",
            //dataType: "json",
            data: {"list_id" : id , "status" : param},
            async : false,
            success: function (data, textStatus){
                console.log(data);
            },
            error: function (){
                console.warn("获取数据失败");
            }
        });
    }
    function addExp() {
        $.ajax({
            type: "GET",
            timeout: 5000,
            url: target_url + "update_experience",
            //dataType: "json",
            data: {"experience" : 1},
            async : false,
            success: function (data, textStatus){
                console.log(data);
            },
            error: function (){
                console.warn("获取数据失败");
            }
        });
    }
Page({
    data:{
        title:'',
        loading:true,
        list:[]
    },
    onLoad(params){
        // console.log(params);
        let sort=params.sort
        this.setData({title:sort});
        const __this=this; 
        wx.request({
            // `a${b}`=='a'+b
            url: `http://localhost:81/wechat/weapp-snack/pages/php/conn.php?sort=${sort}`, 
            data:{},
            header: {
                'content-type': 'json'
            },
            success(res){
                // console.log(res);
                __this.setData({ list:res.data,loading:false});
            },
            fail(res){
                // console.log(res);
                 __this.setData({loading:false});
            }
        });
    },
    // 页面准备完成
    onReady () {  
        // 动态设置当前页面的标题
        wx.setNavigationBarTitle({ title:this.data.title});
    }
})
//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        list:[],
        loading:false,
        num:0,
        total:0.00,
        hiddden:'',
        cart:[]
        
    },
    addNum(pramas){
        // console.log(pramas);
        let datas=pramas.target.dataset;
        const index=datas.id;
        let list=this.data.list;
        let number=list[index].number+1;
        // console.log(typeof(number));// string
        list[index].number=Number(number);
        this.setData({list:list});
        // float
        this.setData({total:(this.data.total*100+Number(datas.price)*100)/100});
        this.setData({num:this.data.num+1});

    },
    subNum(pramas){
        // console.log(pramas);
        let datas=pramas.target.dataset;
        const index=datas.id;
        let list=this.data.list;
        let number=list[index].number-1;
        list[index].number=Number(number);
        this.setData({list:list});
        this.setData({total:(this.data.total*100-Number(datas.price)*100)/100});
        this.setData({num:this.data.num-1});
    },
    
    onLoad(params){
        // console.log(params);
        const __this=this; 
        wx.getStorage({
            key:'cart',
            success:function(res){
                // console.log(res.data);

                // var list=new Array();
                // for(let i=0;i<res.data.length;i++){
                //     if(res.data[i]!==null){
                //         list[i]=res.data[i];
                //     }
                // }
                // var list=new Array();
                for(var i in res.data){
                    if(res.data[i]!==null){
                        // list[i]=res.data[i];
                       __this.setData({list:res.data[i]}); 
                    }
                }
                console.log(this.data.list);

                // __this.setData({list:list});
            }
        })
        
    },
    // 页面准备完成
    onReady () {  
        // 动态设置当前页面的标题
        wx.setNavigationBarTitle({ title:'购物车'});
    }
})

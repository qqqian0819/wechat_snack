//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        brand: '雅风零食铺',
        search: '快速搜索你想要的东西',
        sorts:[
            [
                {name:'牛奶',img:'./../../images/milk.png'},
                {name:'饼干',img:'./../../images/biscuit.png'},
                {name:'面包',img:'./../../images/bread.png'},
                {name:'饮料',img:'./../../images/drink.png'}
            ],
            [
                {name:'牛奶',img:'./../../images/fries.png'},
                {name:'泡面',img:'./../../images/noodle.png'},
                {name:'坚果',img:'./../../images/nut.png'},
                {name:'其它',img:'./../../images/others.png'}
            ]
        ],
        list:[],
        loading:false,
        num:0,
        total:0.00,
        hiddden:'',
        carts:[]
        
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
        this.setData({total:(this.data.total*100+Number(datas.price)*100)/100});// float
        this.setData({num:this.data.num+1});
        // carts[index]=list[index];
        this.data.carts[index]=list[index];
        wx.setStorage({
            key:'cart',
            data:this.data.carts
        });
        console.log(this.data.carts);

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
        wx.request({
            url: 'http://localhost:81/wechat/weapp-snack/pages/php/conn.php', 
            data:{},
            header: {
                'content-type': 'json'
            },
            success(res){
                // console.log(res);
                __this.setData({list:res.data});
            },
            fail(res){
                console.log(res);
            }
        });
        
    },
    onReady () {  

        // console.log(this.data.list[0]);
    }
})

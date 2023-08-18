$(function () {

    var jvue = $.App({
        created : function () {
            // alert(1);
        } , 
        data : {
            test : "Bujur sangkar"
        }
    });

    $.registerComponent({
        name : 'test-heading' , 
        templateName : 'test-heading-2', 
        data : {
            title : "Title - 1"
        },
        template : `
            <div>
                <h1>Test heading - a component</h1>
                <test-heading2></test-heading2>
            </div>
        `, 
        style : `
            .nganu {}
        `
    })

    $.registerComponent({
        name : 'order-2' , 
        data : {},
        template : `
            <h3>2. Order</h3>
        `, 
        style : `
            .nganu {}
        `
    })

    $.registerComponent({
        name : 'order-3' , 
        data : {},
        template : `
            <h3>3. Order</h3>
        `, 
        style : `
            .nganu {}
        `
    })

    $.registerComponent({
        name : 'order-1' , 
        data : {
            reactive : 1
        },
        created : function () {
            
        },
        mounted : function () {
            // console.log(this);
        },
        methods : function () {
            return {
                countPlus : function () {
                    this.reactive++;
                }
            }
        },
        template : `
            <h3>1. Order - {{reactive}}</h3>
            <button @click="countPlus">Plusone</button>
        `, 
        style : `
            .nganu {}
        `
    })


    

    // jvue.debug();


});
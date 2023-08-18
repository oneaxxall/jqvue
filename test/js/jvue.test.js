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
        name : 'combine-test' , 
        templateName : 'combine-test', 
        data : {
            status : "(Bind from component data)"
        }
    })
    
    $.registerComponent({
        name : 'order-2' , 
        data : {},
        template : `
            <h3>2. Component Order</h3>
        `, 
        style : `
            .nganu {}
        `
    })
    
    $.registerComponent({
        name : 'order-3' , 
        data : {},
        template : `
            <h3>3. Component Order</h3>
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
            <h3>1. Component Order with counter - <button @click="countPlus">Count</button> => {{reactive}} </h3>
        `
    })
    
    $.registerComponent({
        name : "slot-component" , 
        data : {},
        template : `
            <h4>This text component is between SLOT</h4>
        `
    });
    
    $.registerComponent({
        name : "implement-slot" , 
        data : {
            open : '<slot>',
            closed : '</slot>',
        },
        template : `
            <h3 v-text="open"></h3>
                <slot></slot>
            <h3 v-text="closed"></h3>
        `
    });
    
    
    });
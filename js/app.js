require.config({
    
    paths: {
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery',
        
    },
    shim: {
        'jquery': {
            exports: 'jQuery',
           
        }
    }
    
});


require(
    [
        
    'model',
    'view',
    'controller',
    'jquery' 
    
    ],
    function (model, view, controller,  $) {
         console.log('$', $);
        console.log('model', model);
        console.log('view', view);
        console.log('controller', controller);
        var firstToDoList = ['Learn JavaScript','Learn Angular.js','Make a Cup of Coffee'];
       
        var modelObj = new model.model(firstToDoList); 
        console.log('modelObj', modelObj);
        
      
        var viewObj = new view.view(modelObj);
        
        console.log('viewObj', viewObj);
        
        var controllerObj = new controller.controller(modelObj, viewObj);
        
        
       

    
     
     });
       

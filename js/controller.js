define(
       'controller',
    ['jquery'],function(){


    return {  controller: controller = function (model, view){//его задача все контролировать и распределять задачи
                    
                    var self = this;
                    
                    view.elements.input.keyup(function(event) {
                                if(event.keyCode==13) {
                                    addItem();
                                   }  
                           });//слушаем событие на Enter инпуте
                           
                    view.elements.listContainer.on('click', '.list-tmpl__item-delete', removeItem);//слушаем событие на крестик
                   
                    view.elements.listContainer.on('dblclick', '.list-tmpl__item-label', editItem);//слушаем событие на Label
                    
                    
                    function addItem(){ // новые значения в передаваемые в model
                        var newItem = view.elements.input.val();// получаем значение инпут
                        model.addItem(newItem);// добавляем model строку которая была записана в инпут
                        view.renderList(model.data);// изменяем список с новыми данными
                        view.elements.input.val(''); //очищаем поле после добавления элемента
                    }
                    
                    function removeItem(){
                        var item = $(this).attr('data-value');
                        model.removeItem(item);
                        view.renderList(model.data);
                    }
                    
                    function editItem () {
                         if(!$('.list-tmpl__item-edit').is( ":focus" )){ $('.list-tmpl__item').removeClass('editing'); }
                           var i;
                          document.addEventListener('dblclick', function(event){
                            if(event.target.tagName !== 'LABEL') return false;
                             i=event.target.id;
                          $('.list-tmpl__item[id='+i+']').addClass('editing'); 
                          
                          $('.list-tmpl__item-edit[id='+i+']').val( $('.list-tmpl__item-label[id='+i+']').text()).focus();
                          
                          $('.list-tmpl__item-label[id='+i+']').hide();
                          $('.list-tmpl__item-label:not([id='+i+'])').show();
                       
                          
                          
                            $('.list-tmpl__item-edit[id='+i+']').keyup(function(event) {
                                if(event.keyCode==13) { 
                                  var renewItem = $('.list-tmpl__item-edit[id='+i+']').val();
                                 var empty =renewItem.replace(/\s+/g,'');
                                  
                                  if(empty == ''){
                                      $('.list-tmpl__item[id='+i+']').remove();
                                  }
                        
                            $('.list-tmpl__item-label[id='+i+']').text(renewItem);  
                             $('.list-tmpl__item-label[id='+i+']').show();
                             
                              $('.list-tmpl__item[id='+i+']').removeClass('editing'); 
                                   }  
                           });
                           
                                
                           
                           
                           });
                    }
                    
                }

};

});//end define






















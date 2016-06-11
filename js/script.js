//MVC
function Model(data){//хранение данных

var self = this; //сохраняем this поскольку это конструктор класса, 
//чтобы мы работали строго в контексте экземпляра класса Model, который потом создадим

self.data = data;

self.addItem = function(item) {
    
    if(item.length === 0){
        return;// т.е. если длинна item равна нулю символов, то мы ничего не делаем 
    }
   
 self.data.push(item);//добавляем новые данные
 
 
 return self.data; //возвращаем обновленные данные  
    
};

self.removeItem = function(item) {
    
    if(item.length === -1){
        return;// если мы не нашли совпадений -1 то ничего не делаем
    }
  
  var index = self.data.indexOf(item);// через indexOf будем искать совпадающий item 
  //и если найдем совпадение вермнем индекс этого элемента
  
  self.data.splice(index,1);
  // потом с помощью splice ищем элемент с заданным индексом удаляем его и сдвигаем массив на 1 элемент
  
  return self.data;
  
  
};
    
}

function View(model){// отображение данных
   
  var self = this;
  
 function init () {//вставка каркаса - это внутренний метод называем его function init() чтобы не экспортировать значения!!! И его нет смысла записывать в self
    
    var html = $('#frame-tmpl').html();
   
    var wrapper = tmpl(html);
    
    
     $('body').append(wrapper);//будем вставлять шаблон
     
     
    self.elements = {//ссылки на наши DOM элементы которые будут отвечать за 
      input: $('.frame-tmpl__header-item-values'),//инпут необходим для считывания информации чтобы знать какое значение надо добавить в список
      listContainer: $('.frame-tmpl__item-list'),  // это контейнер ul в который мы будем вставлять список наших задач
     
    };
    self.renderList(model.data);//и рендерим для старта страницу то что есть у model при старте
  };
  
  self.renderList = function(data){//доступный метод который будет доступен для вызова из вне
   
   var list  = tmpl($('#frame-tmpl__list-tmpl').html(), {data: data});
   self.elements.listContainer.html(list);// то что было скомпилировано с помощью шаблонизатора мы вставляем в наш listContainer
    
  };
     
     
      init();//вызывается всего лишь раз при инициализации
    
}

function Controller(model, view){//его задача все контролировать и распределять задачи
    
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

//////////////////////////////////////


$(function(){
  
  var firstToDoList = ['Learn JavaScript','Learn Angular.js','Make a Cup of Coffee'];
  var model = new Model(firstToDoList);
  var view = new View(model);
  var controller = new Controller(model, view);//
    
});

